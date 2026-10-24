#!/usr/bin/env bun
// Build the Santa Clara County Registrar of Voters' *ballot source* bundle for one election: every
// local candidate and local measure as `neutral` positions, so a voter's ballot shows the whole
// field. Federal and state contests come from the Secretary of State's bundle.
//
// Two steps. `--fetch` saves under orgs/santa-clara-registrar-of-voters/<election>/evidence/:
// the county's "Final Qualified List of Local Eligible Candidates" (every local contest, whether
// it's on the ballot, and each qualified candidate with ballot designation), read from its PDF;
// and the local measures listed by the county's online Voter Information Guide (Democracy Live's
// OmniBallot, whose published index needs no session). The build step reads only the evidence.
// Dry run by default.
//
// Titles reuse the catalog's own subjects where a bundle already names the contest
// (scripts/lib/ballot-subjects.ts).
//
//   bun scripts/scc-rov-ballot.ts 2026-11-03 --fetch [--pdf <saved qualified list> [--url <its URL>]]
//   bun scripts/scc-rov-ballot.ts 2026-11-03 [--apply]

import { existsSync, mkdirSync } from "node:fs";
import {
  type Built,
  knownSpelling,
  loadExisting,
  slugify,
  subjectMatcher,
  titleCase,
} from "./lib/ballot-subjects";
import { pdfPages } from "./lib/pdf-layout";
import { type QualifiedContest, readQualifiedList } from "./lib/qualified-list";

const election = process.argv[2] ?? "";
if (!election) throw new Error("usage: scc-rov-ballot.ts <election> [--fetch] [--apply]");
const fetchMode = process.argv.includes("--fetch");
const apply = process.argv.includes("--apply");
const argAfter = (flag: string) =>
  process.argv.includes(flag) ? process.argv[process.argv.indexOf(flag) + 1] : undefined;
const dir =`orgs/santa-clara-registrar-of-voters/${election}`;
const EVIDENCE = `${dir}/evidence`;

const SITE = "https://vote.santaclaracounty.gov";
/** The election's resources page, which links the qualified list. */
const RESOURCES = `${SITE}/november-3-2026-general-election-resources`;
/** OmniBallot: Santa Clara's account and this election's id there. */
const OMNI = "https://ca.omniballot.us";
const ACCOUNT = "06085";
const OMNI_ELECTION = "1968";
const LOOKUPS = `${OMNI}/published/${ACCOUNT}/${OMNI_ELECTION}/vg/lookups.json`;
// files.santaclaracounty.gov answers 403 to a client that doesn't look like a browser.
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36 openslate-ballot-scraper (+https://openslate.us)";

// ---------------------------------------------------------------- evidence

type Contest = QualifiedContest;
interface Measure {
  /** OmniBallot's contest id for the measure. */
  box: string;
  /** As the guide titles it: "CITY OF MORGAN HILL MEASURE A". */
  name: string;
  url: string;
}

async function get(url: string): Promise<Response> {
  const response = await fetch(url, { headers: { "user-agent": USER_AGENT } });
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  return response;
}

/** The qualified list's URL, from the resources page. */
async function qualifiedListUrl(): Promise<string> {
  const page = await (await get(RESOURCES)).text();
  const url = /href="(https:\/\/files\.santaclaracounty\.gov\/[^"]*qualified-list-of-local-candidates[^"]*)"/
    .exec(page)?.[1]
    ?.replace(/&amp;/g, "&");
  if (!url) throw new Error(`no qualified list linked from ${RESOURCES}`);
  return url;
}

async function fetchEvidence(): Promise<void> {
  mkdirSync(EVIDENCE, { recursive: true });
  // The county's Cloudflare sometimes refuses scripts outright (HTTP 403, even with a browser's
  // user agent). Then save the PDF from a browser and pass it: `--pdf <file> [--url <its URL>]`
  // (the URL defaults to the one the evidence already records).
  const pdfArg = argAfter("--pdf");
  const recorded = existsSync(`${EVIDENCE}/qualified-list.json`)
    ? ((await Bun.file(`${EVIDENCE}/qualified-list.json`).json()) as { url: string }).url
    : undefined;
  const url = pdfArg ? (argAfter("--url") ?? recorded) : await qualifiedListUrl();
  if (!url) throw new Error("--pdf needs --url (no qualified list recorded yet)");
  const bytes = new Uint8Array(
    pdfArg ? await Bun.file(pdfArg).arrayBuffer() : await (await get(url)).arrayBuffer(),
  );
  const contests = readQualifiedList(await pdfPages(bytes));
  await Bun.write(
    `${EVIDENCE}/qualified-list.json`,
    `${JSON.stringify(
      { url, sha256: new Bun.CryptoHasher("sha256").update(bytes).digest("hex"), contests },
      null,
      2,
    )}\n`,
  );

  const lookups = (await (await get(LOOKUPS)).json()) as {
    measure_details: Record<string, { url: string; title: { value: string }[] }>;
  };
  const measures: Measure[] = Object.entries(lookups.measure_details).map(([box, m]) => ({
    box,
    name: (m.title[0]?.value ?? "").replace(/\s+/g, " ").trim(),
    url: `${OMNI}${m.url}`,
  }));
  await Bun.write(
    `${EVIDENCE}/measures.json`,
    `${JSON.stringify({ url: LOOKUPS, measures }, null, 2)}\n`,
  );
  await Bun.write(
    `${EVIDENCE}/retrieved.json`,
    `${JSON.stringify({ retrieved_at: new Date().toISOString().replace(/\.\d+Z$/, "Z") }, null, 2)}\n`,
  );
  console.error(
    `${contests.length} contests (${contests.filter((c) => c.onBallot).length} on the ballot), ${measures.length} measures`,
  );
}

if (fetchMode) await fetchEvidence();

// ---------------------------------------------------------------- reading the evidence

for (const file of ["qualified-list.json", "measures.json", "retrieved.json"]) {
  if (!existsSync(`${EVIDENCE}/${file}`))
    throw new Error(`${EVIDENCE}/${file} is missing: run with --fetch`);
}
const qualified = (await Bun.file(`${EVIDENCE}/qualified-list.json`).json()) as {
  url: string;
  contests: Contest[];
};
const { measures } = (await Bun.file(`${EVIDENCE}/measures.json`).json()) as {
  measures: Measure[];
};
const { retrieved_at } = (await Bun.file(`${EVIDENCE}/retrieved.json`).json()) as {
  retrieved_at: string;
};

// ---------------------------------------------------------------- names

const COUNTY = "us/ca/santa-clara-county";
const problems: string[] = [];
const duplicates: string[] = [];

/** The list's abbreviations, spelled out. */
function expand(body: string): string {
  return body
    .replace(/\bBOE\b/, "Board of Education")
    .replace(/\bSCV\b/, "Santa Clara Valley")
    .replace(/\bHSD\b/, "High School District")
    .replace(/\bCCD\b/, "Community College District")
    .replace(/\bSD\b/, "School District")
    .replace(/^Santa Clara Valley Water$/, "Santa Clara Valley Water District")
    // Its legal name; the catalog's bundles use it.
    .replace(/^Alum Rock Union School District$/, "Alum Rock Union Elementary School District");
}

/** ", TA 3", ", Trustee Area 3", ", District 4", ", D2", " Ward 1", ", Short Term". */
function seatOf(rest: string): { seat?: string; short: boolean } {
  const short = /\bShort Term\b/i.test(rest);
  const m = /\b(TA|Trustee Area|District|D|Ward)\s*(\d+|[A-Z])\b/.exec(rest);
  if (!m) return { short };
  const label =
    m[1] === "TA" ? "Trustee Area" : m[1] === "D" ? "District" : (m[1] as string);
  return { seat: `${label} ${m[2]}`, short };
}
const suffixOf = ({ seat, short }: { seat?: string; short: boolean }) =>
  `${seat ? `, ${seat}` : ""}${short ? " (Short Term)" : ""}`;

const cityJurisdiction = (city: string) => `us/ca/${slugify(city)}`;

function contestSubject(contest: Contest): Built | undefined {
  const t = contest.title;
  const mayor = /^Mayor, (?:City|Town) of (.+)$/.exec(t);
  if (mayor) {
    const city = mayor[1] as string;
    return { title: `${city} Mayor`, jurisdiction: cityJurisdiction(city) };
  }
  const council = /^(City|Town) of (.+?) Council(.*)$/.exec(t);
  if (council) {
    const city = council[2] as string;
    return {
      title: `${city} ${council[1]} Council${suffixOf(seatOf(council[3] as string))}`,
      jurisdiction: cityJurisdiction(city),
    };
  }
  // Districts: "<Body>[, TA 3][, Short Term]", "Midpeninsula … District Ward 1".
  const m = /^(.+?)(?:,? ((?:TA|Trustee Area|District|D|Ward) ?\d+.*|Short Term))?$/.exec(t);
  if (!m) {
    problems.push(`can't read contest "${t}"`);
    return undefined;
  }
  const body = expand(m[1] as string);
  const suffix = suffixOf(seatOf(m[2] ?? ""));
  // The county board of education is a board already.
  if (/Board of Education$/.test(body)) return { title: `${body}${suffix}`, jurisdiction: COUNTY };
  return { title: `${body} Board${suffix}`, jurisdiction: COUNTY };
}

function measureSubject(m: Measure): Built | undefined {
  if (/REGIONAL TRANSIT MEASURE$/.test(m.name)) {
    return { title: "Bay Area — Regional Measure RTM", jurisdiction: "us/ca/bay-area" };
  }
  const parsed = /^(.+?) MEASURE ([A-Z]{1,3})$/.exec(m.name);
  if (!parsed) {
    problems.push(`can't read measure "${m.name}"`);
    return undefined;
  }
  const bodyText = (parsed[1] as string).trim();
  const city = /^(?:CITY|TOWN) OF (.+)$/.exec(bodyText)?.[1];
  return city
    ? {
        title: `${titleCase(city)} — Measure ${parsed[2]}`,
        jurisdiction: cityJurisdiction(titleCase(city)),
      }
    : { title: `${expand(titleCase(bodyText))} — Measure ${parsed[2]}`, jurisdiction: COUNTY };
}

// ---------------------------------------------------------------- build

const existing = await loadExisting(election, dir);
const built = qualified.contests
  .filter((c) => c.onBallot)
  .map((contest) => ({ contest, built: contestSubject(contest) }))
  .filter((c): c is { contest: Contest; built: Built } => c.built !== undefined);
const nearby = new Set([COUNTY, "us/ca/bay-area", ...built.map((b) => b.built.jurisdiction)]);
const reuse = subjectMatcher({
  existing,
  election,
  isLocal: (j, b) => j === b.jurisdiction || nearby.has(j),
  problems,
  duplicates,
});

interface Position {
  subject: { title: string; kind: string; jurisdiction: string; election: string };
  stance: "neutral";
  choice: string;
  statement?: string;
  source: string;
}
const positions: Position[] = [];
const contestSubjects: Record<string, Position["subject"]> = {};
const used = new Map<string, string>();
let reused = 0;
let spelled = 0;
for (const { contest, built: b } of built) {
  const subject = reuse(b, "race");
  if (existing.has(subject.title)) reused++;
  const clash = used.get(subject.title);
  if (clash) problems.push(`"${contest.title}" and "${clash}" both become "${subject.title}"`);
  used.set(subject.title, contest.title);
  contestSubjects[contest.title] = subject;
  const spellings = existing.get(subject.title)?.choices ?? [];
  if (contest.candidates.length === 0) problems.push(`${subject.title}: no candidates`);
  for (const candidate of contest.candidates) {
    const known = knownSpelling(candidate.name, spellings);
    if (known) spelled++;
    // Palo Alto's candidates have none; the list says "(No Ballot Designation)".
    const designation = /^\(No Ballot Designation\)$/i.test(candidate.designation)
      ? ""
      : candidate.designation;
    positions.push({
      subject,
      stance: "neutral",
      choice: known ?? candidate.name,
      ...(designation ? { statement: designation } : {}),
      source: qualified.url,
    });
  }
}
const measureSubjects: Record<string, Position["subject"]> = {};
for (const measure of measures) {
  const b = measureSubject(measure);
  if (!b) continue;
  const subject = reuse(b, "measure");
  if (existing.has(subject.title)) reused++;
  measureSubjects[measure.name] = subject;
  for (const choice of ["Yes", "No"]) {
    positions.push({ subject, stance: "neutral", choice, source: LOOKUPS });
  }
}

const produced = new Set(positions.map((p) => p.subject.title));
const orphans = [...existing.values()]
  .map((e) => e.subject)
  .filter((s) => nearby.has(s.jurisdiction) && s.kind !== "proposition" && !produced.has(s.title));

const out = {
  context: {
    title: `Santa Clara County Registrar of Voters — ${election} ballot: local candidates and measures`,
    jurisdiction: COUNTY,
    election,
  },
  attribution: {
    of: {
      name: "Santa Clara County Registrar of Voters",
      uri: `${SITE}/`,
      kind: "election-authority",
    },
    mode: "scraped",
    retrieved_at,
    sources: [qualified.url, LOOKUPS],
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
    `\n${orphans.length} Santa Clara-area subject(s) in the catalog that this list doesn't produce:`,
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
