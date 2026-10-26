#!/usr/bin/env bun
// Build the Los Angeles County Registrar-Recorder/County Clerk's *ballot source* bundle for one
// election: every local contest's candidates and every local measure as `neutral` positions, so
// a voter's ballot shows the whole field. Federal and state contests come from the Secretary of
// State's bundle and are skipped here.
//
// Two steps. `--fetch` reads LA's public data and saves slim, English-only copies under
// orgs/la-county-registrar/<election>/evidence/: the candidate statements API's contest list
// (every contest and candidate, with or without a statement) and each measure's sample-ballot
// record. LA's sample-ballot host sits behind a bot wall that blocks bursts, so requests go one
// at a time with a pause, and the fetch stops at the first challenge page. The build step reads
// only the evidence. Dry run by default.
//
// Titles and jurisdictions follow the catalog: a contest that some bundle already names (same
// body and number, or same measure letter) reuses that exact subject, so the field collates
// with the endorsements; anything new gets the catalog's usual form. Candidate names come in
// capitals, so a name some bundle already spells for that race keeps that spelling; otherwise
// it is title-cased with care.
//
//   bun scripts/la-rrcc-ballot.ts 2026-11-03 --fetch
//   bun scripts/la-rrcc-ballot.ts 2026-11-03 [--apply]

import { existsSync, mkdirSync } from "node:fs";
import type { BallotChoice, BallotContest } from "../.openslate/packages/core/src/index";
import {
  type Built,
  ORDINALS,
  knownSpelling,
  loadExisting,
  loadOwn,
  nameCase,
  slugify,
  subjectMatcher,
  titleCase,
} from "./lib/ballot-subjects";

const election = process.argv[2] ?? "";
if (!election) throw new Error("usage: la-rrcc-ballot.ts <election> [--fetch] [--apply]");
const fetchMode = process.argv.includes("--fetch");
const apply = process.argv.includes("--apply");
const dir = `orgs/la-county-registrar/${election}`;
const EVIDENCE = `${dir}/evidence`;

const STATEMENTS_API = "https://apps.lavote.gov/statements-api/oc";
const SAMPLE_BALLOT = "https://isb.lavote.gov/parsed";
const CANDIDATES_PAGE = "https://apps.lavote.gov/candidate-statements/";
const SAMPLE_BALLOT_PAGE = "https://isb.lavote.gov/";
const USER_AGENT = "Mozilla/5.0 (compatible; openslate-ballot-scraper; +https://openslate.us)";
const PAUSE_MS = 1500;

// ---------------------------------------------------------------- evidence: what LA publishes

interface Contest {
  contestId: number;
  title: string;
  title2: string;
  candidates: {
    candidateId: number;
    name: string;
    occupation: string;
    /** Has a published English statement. */
    statement: boolean;
  }[];
}
interface Measure {
  id: string;
  name: string;
  shortName: string;
  /** The ballot question, as plain text. */
  question: string;
  /** Every English field, flattened to plain text, for whoever builds on this later. */
  fields: Record<string, string>;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function get(url: string, method = "GET"): Promise<Response> {
  const response = await fetch(url, { method, headers: { "user-agent": USER_AGENT } });
  const type = response.headers.get("content-type") ?? "";
  // The bot wall answers 200 with a small HTML page, or 403.
  if (response.status === 403 || (response.ok && method === "GET" && type.includes("html"))) {
    throw new Error(`${url}: blocked by LA's bot wall (HTTP ${response.status}); try again later`);
  }
  return response;
}

function englishText(value: unknown): string {
  const en =
    value && typeof value === "object" && !Array.isArray(value) && "EN" in value
      ? (value as { EN: unknown }).EN
      : value;
  if (typeof en !== "string") return "";
  return en
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|h\d|li|div)>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n+/g, "\n")
    .trim();
}

async function fetchEvidence(): Promise<void> {
  mkdirSync(EVIDENCE, { recursive: true });
  const elections = (await (
    await get(`${STATEMENTS_API}/read/election/year/${election.slice(0, 4)}`)
  ).json()) as { electionId: number; electionDate: string }[];
  const match = elections.find((e) => e.electionDate.startsWith(election));
  if (!match) throw new Error(`LA lists no election on ${election}`);
  const id = match.electionId;

  const raw = (await (await get(`${STATEMENTS_API}/read/election/${id}/contest`)).json()) as {
    contestId: number;
    title: string;
    title2: string;
    candidates: {
      candidateId: number;
      nameFirst: string;
      nameMiddle: string;
      nameLast: string;
      occupation: string;
      publishedStatements: { language: string }[];
    }[];
  }[];
  const contests: Contest[] = raw
    .map((c) => ({
      contestId: c.contestId,
      title: c.title.trim(),
      title2: c.title2.trim(),
      candidates: c.candidates.map((k) => ({
        candidateId: k.candidateId,
        name: [k.nameFirst, k.nameMiddle, k.nameLast]
          .map((s) => s.trim())
          .filter(Boolean)
          .join(" "),
        occupation: k.occupation.trim(),
        statement: k.publishedStatements.some((s) => s.language === "EN"),
      })),
    }))
    .sort((a, b) => a.contestId - b.contestId);
  await Bun.write(
    `${EVIDENCE}/contests.json`,
    `${JSON.stringify({ electionId: id, contests }, null, 2)}\n`,
  );
  console.error(`${contests.length} contests`);

  // Measures share the contests' numbering on the sample-ballot host ("bmc<id>"). Probe the
  // range around the candidate contests, one at a time.
  const ids = contests.map((c) => c.contestId);
  const lo = Math.min(...ids) - 20;
  const hi = Math.max(...ids) + 40;
  const measures: Measure[] = [];
  for (let n = lo; n <= hi; n++) {
    const url = `${SAMPLE_BALLOT}/${id}/contests/bmc${n}.json`;
    const head = await get(url, "HEAD");
    await sleep(PAUSE_MS / 2);
    if (head.status !== 200) continue;
    const record = (await (await get(url)).json()) as Record<string, unknown>;
    await sleep(PAUSE_MS);
    const fields: Record<string, string> = {};
    for (const [key, value] of Object.entries(record)) {
      if (key === "candidates") continue;
      // The documents themselves (full text, impartial analysis) belong to the voter guide;
      // here only what each one is.
      if (key === "statements" && Array.isArray(value)) {
        value.forEach((s: Record<string, unknown>, i) => {
          const text = englishText(s.FullHTML);
          if (text) fields[`statements.${i}`] = text.split("\n")[0] ?? "";
        });
        continue;
      }
      const text = englishText(value);
      if (text) fields[key] = text;
    }
    measures.push({
      id: `bmc${n}`,
      name: fields.name ?? "",
      shortName: fields.short_name ?? "",
      question: fields.long_description ?? fields.short_description ?? "",
      fields,
    });
    console.error(`bmc${n}: ${fields.name}`);
  }
  await Bun.write(
    `${EVIDENCE}/measures.json`,
    `${JSON.stringify({ electionId: id, measures }, null, 2)}\n`,
  );
  await Bun.write(
    `${EVIDENCE}/retrieved.json`,
    `${JSON.stringify({ retrieved_at: new Date().toISOString().replace(/\.\d+Z$/, "Z"), electionId: id }, null, 2)}\n`,
  );
  console.error(`${measures.length} measures`);
}

if (fetchMode) {
  await fetchEvidence();
  process.exit(0);
}

// ---------------------------------------------------------------- the catalog's existing subjects

const existing = await loadExisting(election, dir);
const own = await loadOwn(dir);

// ---------------------------------------------------------------- contests → subjects

const COUNTY = "us/ca/los-angeles-county";
const SKIP =
  /^(GOVERNOR|LIEUTENANT GOVERNOR|SECRETARY OF STATE|CONTROLLER|TREASURER|ATTORNEY GENERAL|INSURANCE COMMISSIONER|SUPERINTENDENT OF PUBLIC INSTRUCTION|UNITED STATES REPRESENTATIVE|STATE SENATOR|MEMBER OF THE STATE ASSEMBLY|MEMBER STATE BOARD OF EQUALIZATION|For (Associate|Presiding) Justice)/;
const ELECTION_KIND =
  /\s+(GENERAL MUNICIPAL|REGULAR MUNICIPAL|PRIMARY NOMINATING|SPECIAL MUNICIPAL|SPECIAL) ELECTION$/;

/** The body a contest belongs to: a city (with its jurisdiction) or a district. */
function body(org: string): { name: string; city?: string; jurisdiction: string } {
  const plain = org.replace(ELECTION_KIND, "").trim();
  const city = /^CITY OF (.+)$/.exec(plain)?.[1] ?? /^(.+) CITY$/.exec(plain)?.[1];
  if (city) {
    const name = titleCase(city);
    return { name, city: name, jurisdiction: `us/ca/${slugify(name)}` };
  }
  if (/^(COUNTY OF LOS ANGELES|LOS ANGELES COUNTY)$/.test(plain)) {
    return { name: "Los Angeles County", jurisdiction: COUNTY };
  }
  return { name: titleCase(plain), jurisdiction: COUNTY };
}

/** "Trustee Area No. 2" → "Trustee Area 2"; "Fifth District" or "3rd District" → "District 5". */
function seat(qualifier: string): string {
  const q = qualifier.replace(/\bNo\.\s*/g, "").trim();
  const ordinal = /^(\w+) District$/i.exec(q);
  if (ordinal) {
    const word = ordinal[1] ?? "";
    return `District ${ORDINALS[word.toLowerCase()] ?? word.replace(/(st|nd|rd|th)$/i, "")}`;
  }
  return q;
}

const problems: string[] = [];
const notes: string[] = [];

function candidateSubject(contest: Contest): Built | undefined {
  const t = contest.title;
  if (SKIP.test(t)) return undefined;
  if (t === "SHERIFF") return { title: "Los Angeles County Sheriff", jurisdiction: COUNTY };
  const judge = /^JUDGE OF THE SUPERIOR COURT Office No\. (\d+)$/.exec(t);
  if (judge) {
    return {
      title: `Superior Court of Los Angeles County, Office ${judge[1]}`,
      jurisdiction: COUNTY,
    };
  }
  const split = /^([^a-z]+?)\s+([A-Z][a-z].*)$/.exec(t);
  if (!split) {
    problems.push(`can't split "${t}"`);
    return undefined;
  }
  const org = split[1] as string;
  let office = split[2] as string;
  const partial = /\s*\(Unexpired term[^)]*\)\s*$/i.exec(office);
  if (partial) office = office.slice(0, partial.index);
  const suffix = partial ? ", Partial Term" : "";
  const b = body(org);
  const [role, ...rest] = office.split(/,\s*/);
  // "Member, Board of Directors, Division 4": the seat is whatever follows the board's name.
  const seatParts = rest.filter((p) => !/^Board of (Directors|Trustees|Education)$/.test(p));
  const qualifier = seatParts.length ? `, ${seat(seatParts.join(", "))}` : "";

  if (b.city) {
    const city = b.city;
    const titles: Record<string, string> = {
      "Member of the City Council": `${city} City Council`,
      Mayor: `${city} Mayor`,
      "City Attorney": `${city} City Attorney`,
      "City Clerk": `${city} City Clerk`,
      "City Treasurer": `${city} City Treasurer`,
      "Member of the Rent Control Board": `${city} Rent Control Board`,
    };
    const base = titles[role ?? ""];
    if (!base) {
      problems.push(`unknown city office "${office}" in "${t}"`);
      return undefined;
    }
    return { title: `${base}${qualifier}${suffix}`, jurisdiction: b.jurisdiction };
  }
  return { title: `${b.name} Board${qualifier}${suffix}`, jurisdiction: b.jurisdiction };
}

/** A measure's body, letter and short title, from its name and its question's bold lead-in. */
function measureSubject(m: Measure): Built | undefined {
  // State propositions are on the sample ballot too ("STATE MEASURE 1"); they belong to the
  // Secretary of State. The county's own are "COUNTY MEASURE A".
  if (/^STATE MEASURE\b/.test(m.name)) return undefined;
  const name =
    /^(.+?)\s*-\s*MEASURE\s+([A-Z0-9]+)$/.exec(m.name) ??
    /^(COUNTY) MEASURE ([A-Z0-9]+)$/
      .exec(m.name)
      ?.map((s) => (s === "COUNTY" ? "LOS ANGELES COUNTY" : s));
  if (!name) {
    problems.push(`can't read measure name "${m.name}"`);
    return undefined;
  }
  const org = (name[1] as string).replace(ELECTION_KIND, "").trim();
  const letter = name[2] as string;
  const b = body(org);
  const isLA = b.city === "Los Angeles";
  const label = isLA ? "Los Angeles City" : b.name;
  // "CITY OF BURBANK CITY SERVICES MEASURE: MEASURE C: To maintain…" → "City Services".
  // Or a short opening phrase that names it: "Good Government Cannabis Reform Measure To fund…".
  const lead = (
    /^(.*?):\s*MEASURE\s+[A-Z0-9]+\s*:/.exec(m.question)?.[1] ??
    /^([^.:;]{3,90}?)\s+MEASURE\b/i.exec(m.question)?.[1] ??
    ""
  ).toUpperCase();
  const orgName = org.replace(/^CITY OF /, "").replace(/ CITY$/, "");
  const short = lead
    .replace(/^CITY OF /, "")
    .replace(new RegExp(`^${orgName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*`), "")
    .replace(/\s*MEASURE$/, "")
    .trim();
  return {
    title: `${label} — Measure ${letter}${short ? ` (${titleCase(short)})` : ""}`,
    jurisdiction: isLA ? "us/ca/los-angeles" : b.jurisdiction,
  };
}

const cityJurisdictions = new Set<string>();

/** The catalog's own subject for this contest, when some bundle already names it. */
const reuse = subjectMatcher({
  existing,
  own,
  election,
  isLocal: (j, built) =>
    j === COUNTY ||
    j === "us/ca/los-angeles" ||
    j === built.jurisdiction ||
    cityJurisdictions.has(j),
  problems,
});

// ---------------------------------------------------------------- build

for (const file of ["contests.json", "measures.json", "retrieved.json"]) {
  if (!existsSync(`${EVIDENCE}/${file}`)) {
    throw new Error(`${EVIDENCE}/${file} is missing: run with --fetch first`);
  }
}
const { contests } = (await Bun.file(`${EVIDENCE}/contests.json`).json()) as {
  contests: Contest[];
};
const { measures } = (await Bun.file(`${EVIDENCE}/measures.json`).json()) as {
  measures: Measure[];
};
const { retrieved_at } = (await Bun.file(`${EVIDENCE}/retrieved.json`).json()) as {
  retrieved_at: string;
};

const races = contests
  .map((contest) => ({ contest, built: candidateSubject(contest) }))
  .filter((r): r is { contest: Contest; built: Built } => r.built !== undefined);
const props = measures
  .map((measure) => ({ measure, built: measureSubject(measure) }))
  .filter((r): r is { measure: Measure; built: Built } => r.built !== undefined);
for (const { built } of [...races, ...props]) {
  if (built.jurisdiction !== COUNTY) cityJurisdictions.add(built.jurisdiction);
}

interface Position {
  /** With how the ballot prints the contest (OpenSlate SPEC §3.14). */
  subject: Subject & { ballot: BallotContest };
  stance: "neutral";
  choice: string;
  ballot?: BallotChoice;
  source: string;
}

/**
 * How the ballot prints a contest: LA's own title for it. LA's data doesn't say how many to
 * vote for, so that's left out rather than guessed.
 */
function contestBallot(contest: Contest): BallotContest {
  return { heading: [contest.title, contest.title2].filter(Boolean).join(" — ") };
}

/** A measure's letter, and its question as the ballot asks it. */
function measureBallot(m: Measure): BallotContest {
  const letter = /MEASURE\s+([A-Z0-9]+)$/.exec(m.name)?.[1];
  // LA's text runs on into who signed the arguments: "… adopted? Supporters: … Opponents: …".
  const question = m.question.replace(/\s*Supporters:[\s\S]*$/, "").trim();
  return {
    heading: letter ? `Measure ${letter}` : m.name,
    ...(letter ? { number: letter } : {}),
    ...(question ? { label: question } : {}),
  };
}
const positions: Position[] = [];
const used = new Map<string, string>();
let reused = 0;
let renamed = 0;
for (const { contest, built } of races) {
  const subject = reuse(built, "race");
  if (subject.title !== built.title) notes.push(`"${contest.title}" → existing "${subject.title}"`);
  if (existing.has(subject.title)) reused++;
  const clash = used.get(subject.title);
  if (clash) problems.push(`"${contest.title}" and "${clash}" both become "${subject.title}"`);
  used.set(subject.title, contest.title);
  const spellings = existing.get(subject.title)?.choices ?? [];
  for (const candidate of contest.candidates) {
    const known = knownSpelling(candidate.name, spellings);
    if (known) renamed++;
    positions.push({
      subject: { ...subject, ballot: contestBallot(contest) },
      stance: "neutral",
      // LA's data drops the period from a middle initial ("STEPHANIE A CAPPS"); its printed
      // statements keep it.
      choice: known ?? nameCase(candidate.name.replace(/(?<=\s)([A-Z])(?=\s)/g, "$1.")),
      ...(candidate.occupation ? { ballot: { designation: candidate.occupation } } : {}),
      source: CANDIDATES_PAGE,
    });
  }
}
for (const { measure, built } of props) {
  const subject = reuse(built, "measure");
  if (subject.title !== built.title) notes.push(`"${measure.name}" → existing "${subject.title}"`);
  if (existing.has(subject.title)) reused++;
  const clash = used.get(subject.title);
  if (clash) problems.push(`"${measure.name}" and "${clash}" both become "${subject.title}"`);
  used.set(subject.title, measure.name);
  for (const choice of ["Yes", "No"]) {
    positions.push({
      subject: { ...subject, ballot: measureBallot(measure) },
      stance: "neutral",
      choice,
      source: SAMPLE_BALLOT_PAGE,
    });
  }
}

// Existing LA-area subjects the registrar's list doesn't produce: a naming mismatch to fix, or a
// contest some bundle got wrong.
const produced = new Set(positions.map((p) => p.subject.title));
const orphans = [...existing.values()]
  .map((e) => e.subject)
  .filter(
    (s) =>
      (s.jurisdiction === COUNTY ||
        s.jurisdiction === "us/ca/los-angeles" ||
        cityJurisdictions.has(s.jurisdiction)) &&
      !produced.has(s.title),
  );

const out = {
  context: {
    title: `Los Angeles County Registrar-Recorder/County Clerk — ${election} ballot: local candidates and measures`,
    jurisdiction: COUNTY,
    election,
  },
  attribution: {
    of: {
      name: "Los Angeles County Registrar-Recorder/County Clerk",
      uri: "https://www.lavote.gov/",
      kind: "election-authority",
    },
    mode: "scraped",
    retrieved_at,
    sources: [CANDIDATES_PAGE, SAMPLE_BALLOT_PAGE],
  },
  positions,
};

const subjects = produced.size;
console.log(
  `${positions.length} positions: ${races.length} races, ${props.length} measures (${subjects} subjects, ${reused} already in the catalog; ${renamed} names spelled as the catalog does)`,
);
if (process.argv.includes("--verbose"))
  console.log(`\nreused or renamed:\n  ${notes.join("\n  ")}`);
if (orphans.length) {
  console.log(
    `\n${orphans.length} LA-area subject(s) in the catalog that this list doesn't produce:`,
  );
  for (const s of orphans) console.log(`  ${s.jurisdiction}  ${s.title}`);
}
if (problems.length) {
  console.error(`\n${problems.length} problem(s):\n  ${problems.join("\n  ")}`);
  process.exit(1);
}
if (apply) {
  await Bun.write(`${dir}/positions.json`, `${JSON.stringify(out, null, 2)}\n`);
  // Which subject each of LA's contest IDs became, so the voter guide (built elsewhere from the
  // same LA data) files each statement and measure under the same race without re-deriving titles.
  // The subject alone: how the ballot prints it is the listing's business, not the guide's.
  const bare = (subject: Position["subject"] | undefined): Subject | undefined => {
    if (!subject) return undefined;
    const { ballot: _, ...rest } = subject;
    return rest;
  };
  const contestSubjects = {
    electionId: (await Bun.file(`${EVIDENCE}/contests.json`).json()).electionId,
    contests: Object.fromEntries(
      races.map(({ contest }) => [
        `cc${contest.contestId}`,
        bare(
          positions.find(
            (p) => p.source === CANDIDATES_PAGE && used.get(p.subject.title) === contest.title,
          )?.subject,
        ),
      ]),
    ),
    measures: Object.fromEntries(
      props.map(({ measure }) => [
        measure.id,
        bare(positions.find((p) => used.get(p.subject.title) === measure.name)?.subject),
      ]),
    ),
  };
  await Bun.write(`${dir}/contest-subjects.json`, `${JSON.stringify(contestSubjects, null, 2)}\n`);
  console.log(`wrote ${dir}/positions.json and contest-subjects.json`);
} else {
  console.log("dry run; pass --apply to write positions.json");
}
