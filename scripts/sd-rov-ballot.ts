#!/usr/bin/env bun
// Build the San Diego County Registrar of Voters' *ballot source* bundle for one election: every
// qualified local candidate and local measure as `neutral` positions, so a voter's ballot shows
// the whole field. Federal and state contests come from the Secretary of State's bundle.
//
// Two steps. `--fetch` saves under orgs/sd-registrar-of-voters/<election>/evidence/: the text of
// San Diego's Candidate List PDF (with each line's position, since its columns carry whether a
// contest is held, whether each candidate qualified and filed a statement), and the list of local
// measures found in the bookmarks of its Voter Information Pamphlets (indexed by the ballot
// repo's scripts/sd-index.ts), with the short title some print under a measure's letter
// (recorded by the ballot repo's scripts/scrape-sd.ts). The build step reads only the evidence.
// Dry run by default.
//
// The Candidate List abbreviates names ("GROSSMNT-CUY COM COLLEGE - TRUSTEE AREA 5"), so they're
// expanded, then matched to the catalog's own titles (scripts/lib/ballot-subjects.ts).
//
//   bun scripts/sd-rov-ballot.ts 2026-11-03 --fetch
//   bun scripts/sd-rov-ballot.ts 2026-11-03 [--apply]

import { existsSync, mkdirSync } from "node:fs";
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
if (!election) throw new Error("usage: sd-rov-ballot.ts <election> [--fetch] [--apply]");
const fetchMode = process.argv.includes("--fetch");
const apply = process.argv.includes("--apply");
const dir = `orgs/sd-registrar-of-voters/${election}`;
const EVIDENCE = `${dir}/evidence`;

const SITE = "https://www.sdvote.com";
const ELECTION_DIR = `${SITE}/content/dam/rov/en/election/nov-3-${election.slice(0, 4)}-gubernatorial-general-election`;
const CANDIDATE_LIST = `${ELECTION_DIR}/candidate-list.pdf`;
const PAMPHLETS_PAGE = `${SITE}/content/rov/en/sample-ballot-info-lookup.html`;
const BALLOT_INDEX = `https://raw.githubusercontent.com/cinderblock/openslate-ballot-ca-${election}/HEAD/evidence/county/sd/ballot-types.json`;
const MEASURE_TITLES = BALLOT_INDEX.replace("ballot-types.json", "measure-titles.json");
const USER_AGENT = "Mozilla/5.0 (compatible; openslate-ballot-scraper; +https://openslate.us)";

// ---------------------------------------------------------------- evidence

interface CandidateLine {
  page: number;
  x: number;
  y: number;
  size: number;
  bold: boolean;
  text: string;
}
interface Measure {
  /** As the pamphlet's bookmarks name it: "SAN DIEGO UNIFIED SCHOOL DISTRICT MEASURE M". */
  name: string;
  /** Ballot types it appears on (a sample, for finding its pages). */
  types: number[];
  /** The short title printed under the ballot's "MEASURE M", when there is one. */
  title?: string;
}

async function fetchEvidence(): Promise<void> {
  mkdirSync(EVIDENCE, { recursive: true });
  const response = await fetch(CANDIDATE_LIST, { headers: { "user-agent": USER_AGENT } });
  if (!response.ok) throw new Error(`${CANDIDATE_LIST}: HTTP ${response.status}`);
  const bytes = new Uint8Array(await response.arrayBuffer());
  const lines: CandidateLine[] = [];
  for (const page of await pdfPages(bytes)) {
    for (const l of page.lines) {
      lines.push({
        page: page.number,
        x: Math.round(l.x0),
        y: Math.round(l.y),
        size: Math.round(l.size),
        bold: l.bold,
        text: l.text,
      });
    }
  }
  const sha256 = new Bun.CryptoHasher("sha256").update(bytes).digest("hex");
  await Bun.write(
    `${EVIDENCE}/candidate-list.json`,
    `${JSON.stringify({ url: CANDIDATE_LIST, sha256, bytes: bytes.length, lines }, null, 1)}\n`,
  );

  // Local measures: every bookmark naming one, across all ballot types.
  // The ballot repo's index; a local copy (`--index <path>`) before it's pushed.
  const at = process.argv.indexOf("--index");
  const indexPath = at >= 0 ? process.argv[at + 1] : undefined;
  const index = (
    indexPath ? await Bun.file(indexPath).json() : await (await fetch(BALLOT_INDEX)).json()
  ) as Record<string, { type: number; outline: string[] }>;
  // Each measure's short title, recorded beside the index by the ballot repo's scrape-sd.ts.
  const titlesPath = indexPath?.replace(/ballot-types\.json$/, "measure-titles.json");
  const titles = (
    titlesPath && existsSync(titlesPath)
      ? await Bun.file(titlesPath).json()
      : await fetch(MEASURE_TITLES).then((r) => (r.ok ? r.json() : {}))
  ) as Record<string, string>;
  const measures = new Map<string, Measure>();
  for (const { type, outline } of Object.values(index)) {
    for (const title of outline) {
      const name = title.replace(/\s+/g, " ").trim();
      // A measure's own bookmark ("CITY OF OCEANSIDE MEASURE R"), not its sections'.
      if (!/^\S.* MEASURE [A-Z]{1,3}$/.test(name)) continue;
      if (
        /^(MEASURES? SUBMITTED|ARGUMENT|REBUTTAL|FULL TEXT|TAX RATE|NO )|IMPARTIAL|ANALYSIS/.test(
          name,
        )
      ) {
        continue;
      }
      const m = measures.get(name) ?? {
        name,
        types: [],
        ...(titles[name] ? { title: titles[name] } : {}),
      };
      if (m.types.length < 5) m.types.push(type);
      measures.set(name, m);
    }
  }
  await Bun.write(
    `${EVIDENCE}/measures.json`,
    `${JSON.stringify({ source: BALLOT_INDEX, measures: [...measures.values()].sort((a, b) => a.name.localeCompare(b.name)) }, null, 2)}\n`,
  );
  await Bun.write(
    `${EVIDENCE}/retrieved.json`,
    `${JSON.stringify({ retrieved_at: new Date().toISOString().replace(/\.\d+Z$/, "Z") }, null, 2)}\n`,
  );
  console.error(`${lines.length} candidate-list lines, ${measures.size} local measures`);
}

if (fetchMode) {
  await fetchEvidence();
  process.exit(0);
}

// ---------------------------------------------------------------- the candidate list

for (const file of ["candidate-list.json", "measures.json", "retrieved.json"]) {
  if (!existsSync(`${EVIDENCE}/${file}`))
    throw new Error(`${EVIDENCE}/${file} is missing: run with --fetch`);
}
const { lines } = (await Bun.file(`${EVIDENCE}/candidate-list.json`).json()) as {
  lines: CandidateLine[];
};
const { measures } = (await Bun.file(`${EVIDENCE}/measures.json`).json()) as {
  measures: Measure[];
};
const { retrieved_at } = (await Bun.file(`${EVIDENCE}/retrieved.json`).json()) as {
  retrieved_at: string;
};

interface Contest {
  heading: string;
  held: boolean;
  candidates: { name: string; designation: string; qualified: boolean; statement: boolean }[];
}

/** The list, contest by contest: a 14 pt heading, its flags, then each candidate's rows. */
function readCandidateList(): Contest[] {
  const contests: Contest[] = [];
  let contest: Contest | undefined;
  const byPage = new Map<number, CandidateLine[]>();
  for (const l of lines) byPage.set(l.page, [...(byPage.get(l.page) ?? []), l]);
  for (const pageLines of byPage.values()) {
    // Column positions, from this page's header cells.
    const statementX = pageLines.find((l) => l.text === "Statement")?.x ?? 447;
    const qualifiedX = pageLines.find((l) => l.text === "Qualified")?.x ?? 499;
    const cell = (y: number, x: number) =>
      pageLines.find(
        (l) => Math.abs(l.y - y) < 3 && Math.abs(l.x - x) < 25 && /^(YES|NO)$/.test(l.text),
      )?.text;
    const sorted = [...pageLines].sort((a, b) => b.y - a.y || a.x - b.x);
    for (const [i, l] of sorted.entries()) {
      if (l.y > 710) continue; // the running header
      if (l.size >= 13 && l.bold && l.x < 60) {
        contest = { heading: l.text, held: false, candidates: [] };
        contests.push(contest);
        continue;
      }
      if (!contest) continue;
      const held = /^Election = (YES|NO)$/.exec(l.text);
      if (held) {
        contest.held = held[1] === "YES";
        continue;
      }
      // A candidate: a bold name at the left margin ("WAGNER, DONALD P. (DON) - REP"); the line
      // below, indented, is the ballot designation.
      if (
        l.bold &&
        l.x < 30 &&
        l.size <= 11 &&
        /,/.test(l.text) &&
        !/^(Vote for|Election|Full Term)/.test(l.text)
      ) {
        const below = sorted
          .slice(i + 1)
          .find((d) => d.x > 30 && d.x < 60 && d.y < l.y && l.y - d.y < 16);
        contest.candidates.push({
          name: l.text,
          designation: below?.text ?? "",
          statement: cell(l.y, statementX) === "YES",
          qualified: cell(l.y, qualifiedX + 10) === "YES",
        });
      }
    }
  }
  return contests;
}

/** "WAGNER, DONALD P. (DON) - REP" → "Donald P. (Don) Wagner". */
function displayName(listed: string): string {
  const withoutParty = listed.replace(/\s+-\s+[A-Z]{2,4}$/, "");
  const [last = "", first = ""] = withoutParty.split(/,\s*/);
  return nameCase(`${first} ${last}`.trim());
}

// ---------------------------------------------------------------- names

const ABBREVIATIONS: [RegExp, string][] = [
  [/\bGROSSMNT-CUY COM COLLEGE\b/, "GROSSMONT-CUYAMACA COMMUNITY COLLEGE"],
  [/\bCOMM? COLLEGE\b/, "COMMUNITY COLLEGE"],
  [/\bUNIF SCHL\b/, "UNIFIED SCHOOL"],
  [/\bSCHL\b/, "SCHOOL"],
  [/\bELEM\b/, "ELEMENTARY"],
  [/\bMUNI\b/, "MUNICIPAL"],
  [/\bSRVCS\b/, "SERVICES"],
  [/\bCOMM PLAN(NING)? (GRP|GROUP)\b/, "COMMUNITY PLANNING GROUP"],
  [/\bCOMMUNITY PLAN(NING)? (GRP|GROUP)\b/, "COMMUNITY PLANNING GROUP"],
  [/\bPLANNING GRP\b/, "PLANNING GROUP"],
  [/\bCONS FIRE PROT\b/, "CONSOLIDATED FIRE PROTECTION"],
  [/\bHEATLH\b/, "HEALTH"],
  [/\bCOUNTY BOARD OF ED\b/, "SAN DIEGO COUNTY BOARD OF EDUCATION"],
];
/** Bodies that are districts but whose name in the list leaves the word out. */
const DISTRICT =
  /(SCHOOL|UNIFIED|COLLEGE|WATER|FIRE PROTECTION|HEALTHCARE|REGIONAL HEALTH|IRRIGATION|UTILITY|SERVICES|WASTEWATER)$/;

function seatOf(text: string): { seat?: string; short: boolean } {
  const short = /\(Short Term\)/i.test(text);
  const t = text
    .replace(/\(Short Term\)/i, "")
    .replace(/\bT\.A\./, "TRUSTEE AREA")
    .replace(/\bDIV\./, "DIVISION")
    .replace(/\bNO\.\s*/, "")
    .trim();
  const ordinal = /^(\d+)(?:ST|ND|RD|TH) DISTRICT$/.exec(t);
  if (ordinal) return { seat: `District ${ordinal[1]}`, short };
  const m = /(TRUSTEE AREA|DIVISION|DISTRICT|SEAT|ZONE)\s+([0-9A-Z]+)/.exec(t);
  return { ...(m ? { seat: `${titleCase(m[1] as string)} ${m[2]}` } : {}), short };
}

const COUNTY = "us/ca/san-diego-county";
const SKIP =
  /^(GOVERNOR|LIEUTENANT GOVERNOR|SECRETARY OF STATE|CONTROLLER|TREASURER$|ATTORNEY GENERAL|INSURANCE COMMISSIONER|STATE BOARD EQUALIZATION|U\.S\. REPRESENTATIVE|STATE SENATE|STATE ASSEMBLY|STATE SUPERINTENDENT)/;
const problems: string[] = [];
const duplicates: string[] = [];

function contestSubject(heading: string): Built | undefined {
  if (SKIP.test(heading)) return undefined;
  const [bodyPart = "", ...rest] = heading.split(/\s+-\s+/);
  const qualifier = rest.join(" - ");
  const { seat, short } = seatOf(
    `${qualifier} ${/\(Short Term\)/i.test(bodyPart) ? "(Short Term)" : ""}`,
  );
  const suffix = `${seat ? `, ${seat}` : ""}${short ? " (Short Term)" : ""}`;
  let body = bodyPart.replace(/\s*\(Short Term\)/i, "").trim();
  if (/^BOARD OF SUPERVISORS$/.test(body)) {
    return {
      title: `San Diego County Board of Supervisors${seat ? `, ${seat}` : ""}`,
      jurisdiction: COUNTY,
    };
  }
  if (/^ASSESSOR\/RECORDER\/COUNTY CLERK$/.test(body)) {
    return { title: "San Diego County Assessor/Recorder/Clerk", jurisdiction: COUNTY };
  }
  if (/^TREASURER\/TAX COLLECTOR$/.test(body)) {
    return { title: "San Diego County Treasurer-Tax Collector", jurisdiction: COUNTY };
  }
  const city = /^CITY OF (.+)$/.exec(body)?.[1];
  if (city) {
    const name = titleCase(city);
    const jurisdiction = `us/ca/${slugify(name)}`;
    const office = qualifier.replace(/\(Short Term\)/i, "").trim();
    const shortSuffix = /\(Short Term\)/i.test(qualifier) ? " (Short Term)" : "";
    if (/^MAYOR/.test(office)) return { title: `${name} Mayor${shortSuffix}`, jurisdiction };
    if (/^CITY (ATTORNEY|CLERK)$/.test(office))
      return { title: `${name} ${titleCase(office)}${shortSuffix}`, jurisdiction };
    if (/^TREASURER$/.test(office))
      return { title: `${name} City Treasurer${shortSuffix}`, jurisdiction };
    if (/^CITY COUNCIL/.test(office)) {
      const district = /DISTRICT(?: NO\.)?\s*(\d+)/.exec(office)?.[1];
      return {
        title: `${name} City Council${district ? `, District ${district}` : ""}${shortSuffix}`,
        jurisdiction,
      };
    }
    problems.push(`unknown city office "${heading}"`);
    return undefined;
  }
  for (const [from, to] of ABBREVIATIONS) body = body.replace(from, to);
  if (/ UNIFIED$/.test(body)) body = `${body} SCHOOL`;
  if (DISTRICT.test(body) && !/^PALOMAR HEALTH$/.test(body)) body = `${body} DISTRICT`;
  const name = titleCase(body);
  const board = /Planning Group$|Board of Education$/.test(name) ? name : `${name} Board`;
  if (/Board of Education$/.test(name)) {
    return { title: `${board}${seat ? `, ${seat}` : ""}`, jurisdiction: COUNTY };
  }
  return { title: `${board}${suffix}`, jurisdiction: COUNTY };
}

function measureSubject(m: Measure): Built | undefined {
  const parsed = /^(.+?) MEASURE ([A-Z]{1,3})$/.exec(m.name);
  if (!parsed) {
    problems.push(`can't read measure "${m.name}"`);
    return undefined;
  }
  const bodyText = (parsed[1] as string).trim();
  const city = /^CITY OF (.+)$/.exec(bodyText)?.[1];
  // "PERMANENT ROAD DIVISION ZONE NO. 9B - HARRIS ANNEX": a zone of the county's Permanent Road
  // Division No. 1000, as the catalog names it.
  const zone = /^PERMANENT ROAD DIVISION ZONE NO\. (\S+) - (.+)$/.exec(bodyText);
  const label = city
    ? titleCase(city)
    : zone
      ? `Permanent Road Division No. 1000, Zone No. ${zone[1]} (${titleCase(zone[2] as string)})`
      : bodyText === "SAN DIEGO COUNTY"
        ? "San Diego County"
        : titleCase(bodyText);
  // The catalog's titles carry a measure's short title in parentheses, when it has one.
  const short = m.title ? ` (${titleCase(m.title)})` : "";
  return {
    title: `${label} — Measure ${parsed[2]}${short}`,
    jurisdiction: city ? `us/ca/${slugify(titleCase(city))}` : COUNTY,
  };
}

// ---------------------------------------------------------------- build

const existing = await loadExisting(election, dir);
const own = await loadOwn(dir);
const contests = readCandidateList().filter((c) => c.held);
const built = contests
  .map((contest) => ({ contest, built: contestSubject(contest.heading) }))
  .filter((r): r is { contest: Contest; built: Built } => r.built !== undefined);
const cityJurisdictions = new Set(
  built.map((b) => b.built.jurisdiction).filter((j) => j !== COUNTY),
);
const reuse = subjectMatcher({
  existing,
  own,
  election,
  isLocal: (j, b) => j === COUNTY || j === b.jurisdiction || cityJurisdictions.has(j),
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
  if (clash) problems.push(`"${contest.heading}" and "${clash}" both become "${subject.title}"`);
  used.set(subject.title, contest.heading);
  contestSubjects[contest.heading] = subject;
  const spellings = existing.get(subject.title)?.choices ?? [];
  const field = contest.candidates.filter((k) => k.qualified);
  if (field.length === 0) problems.push(`${subject.title}: no qualified candidates`);
  for (const candidate of field) {
    const printed = displayName(candidate.name);
    const known = knownSpelling(printed, spellings);
    if (known) spelled++;
    positions.push({
      subject,
      stance: "neutral",
      choice: known ?? printed,
      ...(candidate.designation ? { statement: candidate.designation } : {}),
      source: CANDIDATE_LIST,
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
    positions.push({ subject, stance: "neutral", choice, source: PAMPHLETS_PAGE });
  }
}

const produced = new Set(positions.map((p) => p.subject.title));
const orphans = [...existing.values()]
  .map((e) => e.subject)
  .filter(
    (s) =>
      (s.jurisdiction === COUNTY || cityJurisdictions.has(s.jurisdiction)) &&
      !produced.has(s.title),
  );

const out = {
  context: {
    title: `San Diego County Registrar of Voters — ${election} ballot: local candidates and measures`,
    jurisdiction: COUNTY,
    election,
  },
  attribution: {
    of: {
      name: "San Diego County Registrar of Voters",
      uri: `${SITE}/`,
      kind: "election-authority",
    },
    mode: "scraped",
    retrieved_at,
    sources: [CANDIDATE_LIST, PAMPHLETS_PAGE],
  },
  positions,
};

console.log(
  `${positions.length} positions: ${built.length} races, ${measures.length} measures (${produced.size} subjects, ${reused} already in the catalog; ${spelled} names spelled as the catalog does)`,
);
if (process.argv.includes("--verbose")) {
  for (const { contest } of built)
    console.log(`  ${contest.heading}  →  ${contestSubjects[contest.heading]?.title}`);
  for (const m of measures) console.log(`  ${m.name}  →  ${measureSubjects[m.name]?.title}`);
}
if (duplicates.length) {
  console.log(
    `\n${duplicates.length} contest(s) the catalog already names more than one way (the most-used kept):`,
  );
  for (const d of duplicates) console.log(`  ${d}`);
}
if (orphans.length) {
  console.log(
    `\n${orphans.length} SD-area subject(s) in the catalog that this list doesn't produce:`,
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
