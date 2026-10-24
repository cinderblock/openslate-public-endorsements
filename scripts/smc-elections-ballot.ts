#!/usr/bin/env bun
// Build San Mateo County Elections' *ballot source* bundle for one election: every local
// candidate and local measure as `neutral` positions, so a voter's ballot shows the whole field.
// Federal and state contests come from the Secretary of State's bundle.
//
// Two steps. `--fetch` saves under orgs/san-mateo-county-elections/<election>/evidence/: the
// county's "Roster of Candidates" (every contest, whether it's on the ballot, each qualified
// candidate with ballot designation, and whether they filed a statement), read from its PDF;
// and the measure documents its current-election page links (each measure's resolution,
// impartial analysis, arguments and rebuttals, by title). The build step reads only the
// evidence. Dry run by default.
//
// San Mateo doesn't publish its measures as a list. MEASURES below is the list, reviewed by
// hand from the documents' titles; the build stops if a measure's impartial analysis isn't among
// the documents, or the documents have one for a letter the list doesn't.
//
// Titles reuse the catalog's own subjects where a bundle already names the contest
// (scripts/lib/ballot-subjects.ts).
//
//   bun scripts/smc-elections-ballot.ts 2026-11-03 --fetch [--pdf <saved roster>]
//   bun scripts/smc-elections-ballot.ts 2026-11-03 [--apply]

import { existsSync, mkdirSync } from "node:fs";
import {
  type Built,
  knownSpelling,
  loadExisting,
  nameCase,
  slugify,
  subjectMatcher,
} from "./lib/ballot-subjects";
import { pdfPages } from "./lib/pdf-layout";
import { type QualifiedContest, readQualifiedList } from "./lib/qualified-list";

const election = process.argv[2] ?? "";
if (!election) throw new Error("usage: smc-elections-ballot.ts <election> [--fetch] [--apply]");
const fetchMode = process.argv.includes("--fetch");
const apply = process.argv.includes("--apply");
const argAfter = (flag: string) =>
  process.argv.includes(flag) ? process.argv[process.argv.indexOf(flag) + 1] : undefined;
const dir = `orgs/san-mateo-county-elections/${election}`;
const EVIDENCE = `${dir}/evidence`;

const SITE = "https://www.smcacre.gov";
/** The current election's page: the roster and every measure document. */
const CURRENT = `${SITE}/elections/current-election`;
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36 openslate-ballot-scraper (+https://openslate.us)";

// ---------------------------------------------------------------- the measures

const COUNTY = "us/ca/san-mateo-county";
const city = (name: string): Built => ({ title: name, jurisdiction: `us/ca/${slugify(name)}` });
const county = (name: string): Built => ({ title: name, jurisdiction: COUNTY });
/** Each measure's letter → whose it is, from the titles of its documents. */
const MEASURES: Record<string, Built> = {
  D: city("Burlingame"),
  E: city("Redwood City"),
  F: city("San Mateo"),
  G: city("San Carlos"),
  H: city("San Mateo"),
  I: city("Half Moon Bay"),
  J: county("San Mateo County"),
  K: county("San Carlos School District"),
  L: county("San Mateo County"),
  M: county("Jefferson Union High School District"),
  N: city("Portola Valley"),
  O: city("East Palo Alto"),
  P: city("Menlo Park"),
  Q: city("Half Moon Bay"),
  R: county("Burlingame School District"),
  S: city("San Bruno"),
  T: county("Pacifica School District"),
  U: county("San Mateo County"),
  V: county("San Mateo County Community College District"),
  W: county("San Mateo-Foster City School District"),
  X: city("Brisbane"),
  Y: city("Belmont"),
  Z: county("Cabrillo Unified School District"),
  AA: county("San Mateo County"),
  BB: city("Pacifica"),
  CC: city("East Palo Alto"),
  DD: city("San Bruno"),
  EE: city("San Bruno"),
};

// ---------------------------------------------------------------- evidence

interface Document {
  title: string;
  url: string;
}

async function get(url: string): Promise<Response> {
  const response = await fetch(url, { headers: { "user-agent": USER_AGENT } });
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  return response;
}

async function fetchEvidence(): Promise<void> {
  mkdirSync(EVIDENCE, { recursive: true });
  const page = await (await get(CURRENT)).text();
  // Documents are linked through the site's "archival document" page, which names them.
  const documents: Document[] = [];
  for (const m of page.matchAll(/archival-document\?document=([^"&]+)&amp;title=([^"]+)"/g)) {
    const url = decodeURIComponent(m[1] as string);
    const title = decodeURIComponent((m[2] as string).replace(/\+/g, " "));
    if (!documents.some((d) => d.url === url)) documents.push({ title, url });
  }
  const roster = documents.find((d) => /^Roster of Candidates$/i.test(d.title));
  if (!roster) throw new Error(`no Roster of Candidates linked from ${CURRENT}`);
  const pdfArg = argAfter("--pdf");
  const bytes = new Uint8Array(
    pdfArg ? await Bun.file(pdfArg).arrayBuffer() : await (await get(roster.url)).arrayBuffer(),
  );
  const contests = readQualifiedList(await pdfPages(bytes));
  await Bun.write(
    `${EVIDENCE}/roster.json`,
    `${JSON.stringify(
      {
        url: roster.url,
        sha256: new Bun.CryptoHasher("sha256").update(bytes).digest("hex"),
        contests,
      },
      null,
      2,
    )}\n`,
  );
  await Bun.write(
    `${EVIDENCE}/documents.json`,
    `${JSON.stringify({ url: CURRENT, documents }, null, 2)}\n`,
  );
  await Bun.write(
    `${EVIDENCE}/retrieved.json`,
    `${JSON.stringify({ retrieved_at: new Date().toISOString().replace(/\.\d+Z$/, "Z") }, null, 2)}\n`,
  );
  console.error(
    `${contests.length} contests (${contests.filter((c) => c.onBallot).length} on the ballot), ${documents.length} documents`,
  );
}

if (fetchMode) await fetchEvidence();

// ---------------------------------------------------------------- reading the evidence

for (const file of ["roster.json", "documents.json", "retrieved.json"]) {
  if (!existsSync(`${EVIDENCE}/${file}`))
    throw new Error(`${EVIDENCE}/${file} is missing: run with --fetch`);
}
const roster = (await Bun.file(`${EVIDENCE}/roster.json`).json()) as {
  url: string;
  contests: QualifiedContest[];
};
const { documents } = (await Bun.file(`${EVIDENCE}/documents.json`).json()) as {
  documents: Document[];
};
const { retrieved_at } = (await Bun.file(`${EVIDENCE}/retrieved.json`).json()) as {
  retrieved_at: string;
};

// ---------------------------------------------------------------- names

const problems: string[] = [];
const duplicates: string[] = [];

/** Contests the Secretary of State's bundle has. */
const STATE =
  /^(Governor|Lieutenant Governor|Secretary of State|Controller|Treasurer|Attorney General|Insurance Commissioner|Superintendent of Public Instruction)$|^Member, State Board of Equalization|^U\.S\. Representative|^Member of the State Assembly|^State Senator/;

/** ", Trustee Area 2", ", District 1", ", Zone 5", ", Division 3", " (Short Term)"; a full term says nothing. */
function seatOf(rest: string): string {
  const seat = /\b(Trustee Area|District|Zone|Division|Ward) ([0-9A-Z]+)\b/.exec(rest);
  const short = /\(Short Term\)/i.test(rest);
  return `${seat ? `, ${seat[1]} ${seat[2]}` : ""}${short ? " (Short Term)" : ""}`;
}

function contestSubject(contest: QualifiedContest): Built | undefined {
  const t = contest.title;
  if (STATE.test(t)) return undefined;
  if (/^County Board of Education Member/.test(t)) {
    return county(`San Mateo County Board of Education${seatOf(t)}`);
  }
  if (/^Member, Board of Supervisors/.test(t)) {
    return county(`San Mateo County Board of Supervisors${seatOf(t)}`);
  }
  // Cities and towns: "City of Belmont Mayor", "Town of Portola Valley Member, Town Council",
  // "City of Millbrae Member, City Council, District 3 (Short Term)", "… City Clerk".
  const place = /^(?:City|Town) of (.+?) (Mayor|Member, (?:City|Town) Council|City Clerk|City Treasurer)(.*)$/.exec(
    t,
  );
  if (place) {
    const name = place[1] as string;
    const office = (place[2] as string).replace(/^Member, /, "");
    return { title: `${name} ${office}${seatOf(place[3] as string)}`, jurisdiction: city(name).jurisdiction };
  }
  // Districts: "<District> Member, Governing Board, Trustee Area C", "<District> Member, Board
  // of Directors, Zone 5", "Midcoast Community Council Councilmember".
  const district = /^(.+?) (?:Member, (?:Governing Board|Board of Directors|Board of Commissioners)|Councilmember)(.*)$/.exec(
    t,
  );
  if (district) return county(`${district[1]} Board${seatOf(district[2] as string)}`);
  problems.push(`can't read contest "${t}"`);
  return undefined;
}

// ---------------------------------------------------------------- build

/** Each measure's impartial analysis names its letter: "Measure R - Impartial Analysis". */
const analysed = new Set(
  documents.flatMap((d) => /^Measure ([A-Z]{1,2}) - Impartial Analysis$/.exec(d.title)?.[1] ?? []),
);
for (const letter of Object.keys(MEASURES))
  if (!analysed.has(letter)) problems.push(`Measure ${letter}: no impartial analysis among the documents`);
for (const letter of analysed)
  if (!(letter in MEASURES)) problems.push(`Measure ${letter} has documents but isn't in MEASURES`);
const transit = documents.find((d) => /^Regional Transit Measure - Impartial Analysis$/.test(d.title));
if (!transit) problems.push("no impartial analysis of the Regional Transit Measure");

const existing = await loadExisting(election, dir);
const built = roster.contests
  .filter((c) => c.onBallot)
  .map((contest) => ({ contest, built: contestSubject(contest) }))
  .filter((c): c is { contest: QualifiedContest; built: Built } => c.built !== undefined);
const nearby = new Set([
  COUNTY,
  "us/ca/bay-area",
  ...built.map((b) => b.built.jurisdiction),
  ...Object.values(MEASURES).map((m) => m.jurisdiction),
]);
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
    const printed = nameCase(candidate.name);
    const known = knownSpelling(printed, spellings);
    if (known) spelled++;
    // A candidate without one is listed "(No Ballot Designation)".
    const designation = /^\(No Ballot Designation\)$/i.test(candidate.designation)
      ? ""
      : candidate.designation;
    positions.push({
      subject,
      stance: "neutral",
      choice: known ?? printed,
      ...(designation ? { statement: designation } : {}),
      source: roster.url,
    });
  }
}
const measureSubjects: Record<string, Position["subject"]> = {};
const measures: [string, Built, string][] = [
  ...Object.entries(MEASURES).map(([letter, body]): [string, Built, string] => [
    `Measure ${letter}`,
    { title: `${body.title} — Measure ${letter}`, jurisdiction: body.jurisdiction },
    documents.find((d) => d.title === `Measure ${letter} - Impartial Analysis`)?.url ?? CURRENT,
  ]),
  [
    "Regional Transit Measure",
    { title: "Bay Area — Regional Measure RTM", jurisdiction: "us/ca/bay-area" },
    transit?.url ?? CURRENT,
  ],
];
for (const [name, b, source] of measures) {
  const subject = reuse(b, "measure");
  if (existing.has(subject.title)) reused++;
  measureSubjects[name] = subject;
  for (const choice of ["Yes", "No"]) positions.push({ subject, stance: "neutral", choice, source });
}

const produced = new Set(positions.map((p) => p.subject.title));
const orphans = [...existing.values()]
  .map((e) => e.subject)
  .filter((s) => nearby.has(s.jurisdiction) && s.kind !== "proposition" && !produced.has(s.title));

const out = {
  context: {
    title: `San Mateo County Elections — ${election} ballot: local candidates and measures`,
    jurisdiction: COUNTY,
    election,
  },
  attribution: {
    of: { name: "San Mateo County Elections", uri: `${SITE}/elections`, kind: "election-authority" },
    mode: "scraped",
    retrieved_at,
    sources: [roster.url, CURRENT],
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
    `\n${orphans.length} San Mateo-area subject(s) in the catalog that this list doesn't produce:`,
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
