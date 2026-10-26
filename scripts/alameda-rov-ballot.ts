#!/usr/bin/env bun
// Build the Alameda County Registrar of Voters' *ballot source* bundle for one election: every
// local candidate and local measure as `neutral` positions, so a voter's ballot shows the whole
// field. Federal and state contests come from the Secretary of State's bundle.
//
// Two steps. `--fetch` saves under orgs/alameda-registrar-of-voters/<election>/evidence/:
// Alameda's candidate list (its races, and for each race on the ballot every candidate whose
// filing is complete, with ballot designation and party), and the local measures named by the
// headings of its Voter Information Guide's measures section. The build step reads only the
// evidence. Dry run by default.
//
// Titles reuse the catalog's own subjects where a bundle already names the contest
// (scripts/lib/ballot-subjects.ts); the catalog names most of Alameda's.
//
//   bun scripts/alameda-rov-ballot.ts 2026-11-03 --fetch
//   bun scripts/alameda-rov-ballot.ts 2026-11-03 [--apply]

import { existsSync, mkdirSync } from "node:fs";
import type { BallotChoice, BallotContest } from "../.openslate/packages/core/src/index";
import {
  type Built,
  knownSpelling,
  loadExisting,
  loadOwn,
  nameCase,
  slugify,
  subjectMatcher,
  titleCase,
} from "./lib/ballot-subjects";
import { pdfPages } from "./lib/pdf-layout";

const election = process.argv[2] ?? "";
if (!election) throw new Error("usage: alameda-rov-ballot.ts <election> [--fetch] [--apply]");
const fetchMode = process.argv.includes("--fetch");
const apply = process.argv.includes("--apply");
const dir = `orgs/alameda-registrar-of-voters/${election}`;
const EVIDENCE = `${dir}/evidence`;

const SITE = "https://acvote.alamedacountyca.gov";
const APP = "https://alamedacountyca.gov/rov_app/candidatelist";
const ymd = election.replaceAll("-", "");
const GUIDE = `${SITE}/acvote-assets/02_election_information/PDFs/${ymd}/Voter%20Information%20Guide/vig_nov${election.slice(0, 4)}_eng.pdf`;
const USER_AGENT = "Mozilla/5.0 (compatible; openslate-ballot-scraper; +https://openslate.us)";

// ---------------------------------------------------------------- evidence

interface Candidate {
  name: string;
  party?: string;
  designation: string;
  status: string;
  incumbent: boolean;
}
interface Race {
  title: string;
  category: string;
  status: string;
  voteFor: number;
  candidates: Candidate[];
}
interface Measure {
  /** As the guide's heading names it: "CITY OF ALBANY MEASURE O". */
  name: string;
  page: number;
}

const text = (html: string) =>
  html
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();

async function get(url: string, init?: RequestInit): Promise<Response> {
  const response = await fetch(url, {
    ...init,
    headers: { "user-agent": USER_AGENT, ...init?.headers },
  });
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  return response;
}

async function fetchEvidence(): Promise<void> {
  mkdirSync(EVIDENCE, { recursive: true });
  // The election's id in the candidate list app: the option labelled with this election's date.
  const form = await (await get(APP)).text();
  const mdy = `${election.slice(5, 7)}/${election.slice(8, 10)}/${election.slice(0, 4)}`;
  const electionId = [...form.matchAll(/<option\s+value="(\d+)">\s*([^<]*)/g)].find((m) =>
    (m[2] as string).includes(mdy),
  )?.[1];
  if (!electionId) throw new Error(`no election dated ${mdy} in ${APP}`);
  const { electionRaces } = (await (await get(`${APP}/${electionId}`)).json()) as {
    electionRaces: { raceId: string; raceTitle: string; categoryId: string }[];
  };
  const category = new Map(electionRaces.map((r) => [text(r.raceTitle), r.categoryId]));

  // Every race on the ballot, with every candidate whose filing is complete.
  const html = await (
    await get(`${APP}/`, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded", referer: `${APP}/` },
      body: `electionId=${electionId}&categoryId=&raceId=&lastName=&raceStatus=onballot&candidateStatus=COMPLETED`,
    })
  ).text();
  const races = new Map<string, Race>();
  for (const block of html.split(/<caption>/).slice(1)) {
    const header = /candidate-list-table-header">([\s\S]*?)<span[^>]*>([^<]*)<\/span>/.exec(block);
    if (!header) continue;
    const title = text(header[1] as string).replace(/\s*-$/, "");
    const race = races.get(title) ?? {
      title,
      category: category.get(title) ?? "",
      status: text(header[2] as string),
      voteFor: Number(/Vote For:\s*(\d+)/.exec(block)?.[1] ?? 1),
      candidates: [],
    };
    for (const row of block.split(/<tr>/).slice(2)) {
      const cells = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((m) => m[1] as string);
      const nameCell = cells[0] ?? "";
      const name = /class='candidateName'>([^<]*)/.exec(nameCell)?.[1];
      if (!name) continue;
      const party = text(nameCell.replace(/[\s\S]*?<br\s*\/?>/, ""));
      const candidate: Candidate = {
        name: text(name),
        ...(party ? { party } : {}),
        designation: text(cells[1] ?? ""),
        status: text(cells[3] ?? ""),
        incumbent: /Incumbent:<\/div>\s*<div[^>]*>\s*Y\b/.test(cells[4] ?? ""),
      };
      // The list repeats some races; a candidate counts once.
      if (!race.candidates.some((c) => c.name === candidate.name)) race.candidates.push(candidate);
    }
    races.set(title, race);
  }
  const sha256 = new Bun.CryptoHasher("sha256").update(html).digest("hex");
  await Bun.write(
    `${EVIDENCE}/candidate-list.json`,
    `${JSON.stringify({ url: `${APP}/`, electionId, sha256, races: [...races.values()] }, null, 2)}\n`,
  );

  // Local measures: the headings of the guide's measures section ("CITY OF ALBANY MEASURE O").
  const bytes = new Uint8Array(await (await get(GUIDE)).arrayBuffer());
  const measures: Measure[] = [];
  for (const page of await pdfPages(bytes)) {
    for (const l of page.lines) {
      if (l.column !== "full" || !l.bold || l.size < 13 || l.y < 700) continue;
      const name = l.text.replace(/\s+/g, " ").trim();
      if (/ MEASURE [A-Z]{1,3}$/.test(name) && !measures.some((m) => m.name === name)) {
        measures.push({ name, page: page.number });
      }
    }
  }
  await Bun.write(
    `${EVIDENCE}/measures.json`,
    `${JSON.stringify({ url: GUIDE, sha256: new Bun.CryptoHasher("sha256").update(bytes).digest("hex"), measures }, null, 2)}\n`,
  );
  await Bun.write(
    `${EVIDENCE}/retrieved.json`,
    `${JSON.stringify({ retrieved_at: new Date().toISOString().replace(/\.\d+Z$/, "Z") }, null, 2)}\n`,
  );
  console.error(`${races.size} races, ${measures.length} local measures`);
}

if (fetchMode) await fetchEvidence();

// ---------------------------------------------------------------- reading the evidence

for (const file of ["candidate-list.json", "measures.json", "retrieved.json"]) {
  if (!existsSync(`${EVIDENCE}/${file}`))
    throw new Error(`${EVIDENCE}/${file} is missing: run with --fetch`);
}
const { races } = (await Bun.file(`${EVIDENCE}/candidate-list.json`).json()) as { races: Race[] };
const { measures } = (await Bun.file(`${EVIDENCE}/measures.json`).json()) as {
  measures: Measure[];
};
const { retrieved_at } = (await Bun.file(`${EVIDENCE}/retrieved.json`).json()) as {
  retrieved_at: string;
};

// ---------------------------------------------------------------- names

const COUNTY = "us/ca/alameda-county";
/** The catalog's jurisdiction for a city: the City of Alameda is apart from the county. */
const cityJurisdiction = (city: string) =>
  city === "Alameda" ? "us/ca/city-of-alameda" : `us/ca/${slugify(city)}`;
/** Federal and state contests: the Secretary of State's. */
const STATE_CATEGORIES = new Set(["100", "200"]);
const problems: string[] = [];
const duplicates: string[] = [];

/**
 * ", Area #2, Short Term" → seat "Area 2", short. A bare number is a council district ("City
 * Council #2"). "Full Term" says nothing.
 */
function seatOf(text: string): { seat?: string; short: boolean } {
  const short = /\bShort Term\b/i.test(text);
  const m = /\b(Area|Ward|District|Dist)\.?\s*(?:No\.\s*)?#?\s*(\d+)/i.exec(text);
  if (!m) {
    const bare = /#\s*(\d+)/.exec(text)?.[1];
    return { ...(bare ? { seat: `District ${bare}` } : {}), short };
  }
  const label = /^dist/i.test(m[1] as string) ? "District" : titleCase(m[1] as string);
  return { seat: `${label} ${m[2]}`, short };
}
const suffixOf = ({ seat, short }: { seat?: string; short: boolean }) =>
  `${seat ? `, ${seat}` : ""}${short ? " (Short Term)" : ""}`;

/** Districts whose name in the list isn't the name the catalog knows them by. */
const BODIES: [RegExp, string, string?][] = [
  [/^AC Transit District$/, "AC Transit"],
  [/^BART$/, "BART"],
  [/^EBMUD$/, "EBMUD"],
  [/^Dublin San Ramon$/, "Dublin San Ramon Services District"],
  [/^Oro Loma Sanitary Dist$/, "Oro Loma Sanitary District"],
  [/^Byron - Bethany Irrigation District$/, "Byron-Bethany Irrigation District"],
  [
    /^Chabot - Las Positas Community College District$/,
    "Chabot-Las Positas Community College District",
  ],
];
function bodyName(raw: string): string {
  const body = raw.replace(/\s+/g, " ").trim();
  for (const [re, name] of BODIES) if (re.test(body)) return name;
  return titleCase(body);
}

function raceSubject(race: Race): Built | undefined {
  const t = race.title.replace(/\s+/g, " ").trim();
  if (STATE_CATEGORIES.has(race.category) || /^State Superintendent/i.test(t)) return undefined;

  // City offices: "For Mayor, Oakland", "For Member Of City Council #2, San Leandro - Short Term",
  // "For Councilmember, District No. 2, Oakland", "Members Of The Board Of Education, Albany".
  if (race.category === "600") {
    const m = /^(?:For )?(.+), ([A-Za-z .]+?)(?: - (Short Term))?$/.exec(t);
    if (!m) {
      problems.push(`can't read city race "${t}"`);
      return undefined;
    }
    const office = m[1] as string;
    const city = titleCase(m[2] as string);
    const jurisdiction = cityJurisdiction(city);
    const seat = seatOf(`${office}${m[3] ? " Short Term" : ""}`);
    const suffix = suffixOf(seat);
    if (/^Mayor$/i.test(office)) return { title: `${city} Mayor${suffix}`, jurisdiction };
    if (/^Auditor$/i.test(office)) return { title: `${city} City Auditor${suffix}`, jurisdiction };
    if (/City Council|Councilmember/i.test(office))
      return { title: `${city} City Council${suffix}`, jurisdiction };
    if (/Rent Stabilization Board/i.test(office))
      return { title: `${city} Rent Stabilization Board${suffix}`, jurisdiction };
    // A city's school board: Berkeley's and Albany's are elected at the city's election.
    if (/School Director|Board Of Education/i.test(office))
      return { title: `${city} Unified School District Board${suffix}`, jurisdiction: COUNTY };
    problems.push(`unknown city office "${t}"`);
    return undefined;
  }

  // Districts: "<Body> Trustee, Area 3", "<Body> Governing Board Member(s), Area #2, Short Term",
  // "<Body> Director(s), Ward 1", "Member, Board Of Director(s), <Body>, Area 4".
  const m =
    /^Member, Board Of Directors?, (.+?)(?:\s*#\s*(\d+))?(?:, (.+))?$/i.exec(t) ??
    /^(.+?) (?:Trustee|Governing Board Members?|Directors?)(?:,(.*))?$/i.exec(t);
  if (!m) {
    problems.push(`can't read race "${t}"`);
    return undefined;
  }
  const body = bodyName(m[1] as string);
  const seat = seatOf(`${m[2] ? `District ${m[2]}` : ""} ${m[3] ?? ""}`);
  if (body === "BART") {
    return {
      title: `BART Board of Directors${suffixOf(seat)}`,
      jurisdiction: `us/ca/bart-${seat.seat?.replace(/\D/g, "")}`,
    };
  }
  if (body === "EBMUD") {
    return { title: `EBMUD Board of Directors${suffixOf(seat)}`, jurisdiction: "us/ca/ebmud" };
  }
  return { title: `${body} Board${suffixOf(seat)}`, jurisdiction: COUNTY };
}

function measureSubject(m: Measure): Built | undefined {
  if (m.name === "REGIONAL TRANSIT MEASURE RTM") {
    return { title: "Bay Area — Regional Measure RTM", jurisdiction: "us/ca/bay-area" };
  }
  const parsed = /^(.+?)(?: BOND)? MEASURE ([A-Z]{1,3})$/.exec(m.name);
  if (!parsed) {
    problems.push(`can't read measure "${m.name}"`);
    return undefined;
  }
  const bodyText = (parsed[1] as string).trim();
  const city = /^CITY OF (.+)$/.exec(bodyText)?.[1];
  return city
    ? {
        title: `${titleCase(city)} — Measure ${parsed[2]}`,
        jurisdiction: cityJurisdiction(titleCase(city)),
      }
    : { title: `${titleCase(bodyText)} — Measure ${parsed[2]}`, jurisdiction: COUNTY };
}

/** "BRENDA F.  GRISHAM" → "Brenda F. Grisham". */
const displayName = (listed: string) => nameCase(listed.replace(/\s+/g, " ").trim());

// ---------------------------------------------------------------- build

const existing = await loadExisting(election, dir);
const own = await loadOwn(dir);
const built = races
  .filter((r) => r.status === "On Ballot")
  .map((race) => ({ race, built: raceSubject(race) }))
  .filter((r): r is { race: Race; built: Built } => r.built !== undefined);
const nearby = new Set([
  COUNTY,
  "us/ca/ebmud",
  "us/ca/bay-area",
  ...built.map((b) => b.built.jurisdiction),
]);
const reuse = subjectMatcher({
  existing,
  own,
  election,
  isLocal: (j, b) => j === b.jurisdiction || nearby.has(j),
  problems,
  duplicates,
});

interface Subject {
  title: string;
  kind: string;
  jurisdiction: string;
  election: string;
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
 * Albany, Berkeley, Oakland and San Leandro elect most city offices by ranked choice, up to
 * five rankings (https://acvote.alamedacountyca.gov/voting/rcv): every Oakland contest
 * (its school directors too); Berkeley's Mayor, Council and Auditor, not its Rent Board or
 * school board; San Leandro's Mayor and Council; Albany's Council and Board of Education
 * (several winners each).
 */
const RANKS = 5;
function rankedChoice(listed: string): boolean {
  if (/, Oakland\b/i.test(listed)) return true;
  if (/, Berkeley$/i.test(listed))
    return /^For (Mayor|Member Of City Council|Auditor)\b/i.test(listed);
  if (/, San Leandro\b/i.test(listed)) return /^For (Mayor|Member Of City Council)\b/i.test(listed);
  if (/, Albany$/i.test(listed)) return /City Council|Board Of Education/i.test(listed);
  return false;
}

/** How the ballot prints a contest from the county's list. */
function contestBallot(race: Race): BallotContest {
  return rankedChoice(race.title)
    ? { heading: race.title, ranks: RANKS }
    : { heading: race.title, vote_for: race.voteFor };
}

/** How the ballot prints a candidate: party, ballot designation, incumbency. */
function choiceBallot(candidate: Candidate): BallotChoice | undefined {
  const printed: BallotChoice = {
    ...(candidate.party ? { party: candidate.party } : {}),
    ...(candidate.designation ? { designation: candidate.designation } : {}),
    ...(candidate.incumbent ? { incumbent: true as const } : {}),
  };
  return Object.keys(printed).length > 0 ? printed : undefined;
}

/** A measure's heading as printed ("Bond Measure L"), its letter and type. */
function measureBallot(m: Measure): BallotContest {
  const letter = / ([A-Z]{1,3})$/.exec(m.name)?.[1];
  const bond = / BOND MEASURE /.test(m.name);
  return {
    heading: letter ? `Measure ${letter}` : titleCase(m.name),
    ...(letter ? { number: letter } : {}),
    ...(bond ? { measure_type: "Bond Measure" } : {}),
  };
}
const positions: Position[] = [];
const contestSubjects: Record<string, Subject> = {};
const used = new Map<string, string>();
let reused = 0;
let spelled = 0;
for (const { race, built: b } of built) {
  const subject = reuse(b, "race");
  if (existing.has(subject.title)) reused++;
  const clash = used.get(subject.title);
  if (clash) problems.push(`"${race.title}" and "${clash}" both become "${subject.title}"`);
  used.set(subject.title, race.title);
  contestSubjects[race.title] = subject;
  const spellings = existing.get(subject.title)?.choices ?? [];
  if (race.candidates.length === 0) problems.push(`${subject.title}: no candidates`);
  for (const candidate of race.candidates) {
    const printed = displayName(candidate.name);
    const known = knownSpelling(printed, spellings);
    if (known) spelled++;
    const ballot = choiceBallot(candidate);
    positions.push({
      subject: { ...subject, ballot: contestBallot(race) },
      stance: "neutral",
      choice: known ?? printed,
      ...(ballot ? { ballot } : {}),
      source: `${APP}/`,
    });
  }
}
const measureSubjects: Record<string, Subject> = {};
for (const measure of measures) {
  const b = measureSubject(measure);
  if (!b) continue;
  const subject = reuse(b, "measure");
  if (existing.has(subject.title)) reused++;
  measureSubjects[measure.name] = subject;
  for (const choice of ["Yes", "No"]) {
    positions.push({
      subject: { ...subject, ballot: measureBallot(measure) },
      stance: "neutral",
      choice,
      source: GUIDE,
    });
  }
}

const produced = new Set(positions.map((p) => p.subject.title));
const orphans = [...existing.values()]
  .map((e) => e.subject)
  .filter((s) => nearby.has(s.jurisdiction) && s.kind !== "proposition" && !produced.has(s.title));

const out = {
  context: {
    title: `Alameda County Registrar of Voters — ${election} ballot: local candidates and measures`,
    jurisdiction: COUNTY,
    election,
  },
  attribution: {
    of: { name: "Alameda County Registrar of Voters", uri: `${SITE}/`, kind: "election-authority" },
    mode: "scraped",
    retrieved_at,
    sources: [`${APP}/`, GUIDE],
  },
  positions,
};

console.log(
  `${positions.length} positions: ${built.length} races, ${measures.length} measures (${produced.size} subjects, ${reused} already in the catalog; ${spelled} names spelled as the catalog does)`,
);
if (process.argv.includes("--verbose")) {
  for (const [title, s] of Object.entries(contestSubjects))
    console.log(`  ${title}  →  ${s.title}`);
  for (const [name, s] of Object.entries(measureSubjects)) console.log(`  ${name}  →  ${s.title}`);
}
if (duplicates.length) {
  console.log(
    `\n${duplicates.length} contest(s) the catalog already names more than one way (the most-used kept):`,
  );
  for (const d of duplicates) console.log(`  ${d}`);
}
if (orphans.length) {
  console.log(
    `\n${orphans.length} Alameda-area subject(s) in the catalog that this list doesn't produce:`,
  );
  for (const s of orphans) console.log(`  ${s.jurisdiction}  ${s.title}`);
}
if (problems.length) {
  console.error(`\n${problems.length} problem(s):\n  ${problems.join("\n  ")}`);
  process.exit(1);
}
if (apply) {
  await Bun.write(`${dir}/positions.json`, `${JSON.stringify(out, null, 2)}\n`);
  await Bun.write(
    `${dir}/contest-subjects.json`,
    `${JSON.stringify({ contests: contestSubjects, measures: measureSubjects }, null, 2)}\n`,
  );
  console.log(`wrote ${dir}/positions.json and contest-subjects.json`);
} else {
  console.log("dry run; pass --apply to write positions.json");
}
