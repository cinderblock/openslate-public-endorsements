#!/usr/bin/env bun
// Build the Orange County Registrar of Voters' *ballot source* bundle for one election: every
// qualified local candidate and local measure as `neutral` positions, so a voter's ballot shows
// the whole field. Federal and state contests come from the Secretary of State's bundle.
//
// Two steps. `--fetch` saves under orgs/oc-registrar-of-voters/<election>/evidence/: OC's
// "Contests Qualified for the Ballot" page (full contest names), its candidate filing log (each
// contest's filers, whether each qualified, ballot designation, statement PDF), and its measures
// page. The build step reads only the evidence. Dry run by default.
//
// The filing log truncates and abbreviates names ("Rcho Santiago Coll Dist"), so each contest is
// matched to its full name on the qualified page by word prefixes in order, and must match
// exactly one. Titles and spellings then reuse the catalog's own (scripts/lib/ballot-subjects.ts).
//
//   bun scripts/oc-rov-ballot.ts 2026-11-03 --fetch
//   bun scripts/oc-rov-ballot.ts 2026-11-03 [--apply]

import { existsSync, mkdirSync } from "node:fs";
import {
  type Built,
  knownSpelling,
  loadExisting,
  loadOwn,
  nameCase,
  slugify,
  strip,
  subjectMatcher,
} from "./lib/ballot-subjects";

const election = process.argv[2] ?? "";
if (!election) throw new Error("usage: oc-rov-ballot.ts <election> [--fetch] [--apply]");
const fetchMode = process.argv.includes("--fetch");
const apply = process.argv.includes("--apply");
const dir = `orgs/oc-registrar-of-voters/${election}`;
const EVIDENCE = `${dir}/evidence`;

const ELECTION_CODE = `GEN${election.slice(0, 4)}`;
const BASE = "https://ocvote.gov";
const QUALIFIED_PAGE = `${BASE}/elections/contests-qualified-for-the-ballot-for-the-${election.slice(0, 4)}-general-election`;
const FILING_LOG_PAGE = `${BASE}/candidates/candidate-filing-log-with-statements`;
const MEASURES_PAGE = `${BASE}/elections/${election.slice(0, 4)}-general-election-measures-on-the-ballot`;
const USER_AGENT = "Mozilla/5.0 (compatible; openslate-ballot-scraper; +https://openslate.us)";
const PAUSE_MS = 600;

// ---------------------------------------------------------------- evidence

interface Contest {
  contestId: number;
  /** The filing log's label, in its three parts: office, body (truncated), seat. */
  office: string;
  body: string;
  seat: string;
  voteFor: number;
  candidates: {
    name: string;
    designation: string;
    qualified: boolean;
    statementPdf?: string;
  }[];
}
interface MeasureEntry {
  letter: string;
  body: string;
  title: string;
  pdf: string;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
async function get(url: string, init: RequestInit = {}): Promise<string> {
  const response = await fetch(url, {
    ...init,
    headers: { "user-agent": USER_AGENT, ...init.headers },
  });
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  await sleep(PAUSE_MS);
  return await response.text();
}
function text(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<(br|\/p|\/h\d|\/li|\/tr|\/div)[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#0?39;|&rsquo;/g, "’")
    .replace(/&ndash;/g, "–")
    .replace(/[ \t]+/g, " ")
    .replace(/ ?\n ?/g, "\n")
    .replace(/\n+/g, "\n")
    .trim();
}
function main(html: string): string {
  const start = html.indexOf("<main");
  return start >= 0 ? html.slice(start, html.indexOf("</main>", start)) : html;
}

async function fetchEvidence(): Promise<void> {
  mkdirSync(EVIDENCE, { recursive: true });
  const qualified = text(main(await get(QUALIFIED_PAGE)));
  await Bun.write(`${EVIDENCE}/contests-qualified.txt`, `${qualified}\n`);

  const options = await get(`${BASE}/bin/voting/candidate_filing_log.php`, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: `election=${ELECTION_CODE}`,
  });
  const contests: Contest[] = [];
  for (const m of options.matchAll(/<option value=(\d+)>([\s\S]*?)<\/option>/g)) {
    const [office = "", body = "", seat = ""] = (m[2] ?? "")
      .split("&nbsp;")
      .map((s) => s.replace(/\s+/g, " ").trim());
    const contestId = Number(m[1]);
    const page = await get(
      `${BASE}/bin/voting/candidate_filing_log_submit.php?elecabbr=${ELECTION_CODE}&contest=${contestId}`,
    );
    const voteFor = Number(/Vote For:\s*(\d+)/.exec(page)?.[1] ?? 1);
    const candidates: Contest["candidates"] = [];
    // Each filer: an <h3> with the name and designation, then their filing table.
    const blocks = page.split(/<p>\s*<h3>/).slice(2);
    for (const block of blocks) {
      const head = /^([\s\S]*?)<\/h3>/.exec(block)?.[1] ?? "";
      const [name = "", designation = ""] = text(head.replace(/<br\s*\/?>\s*<br\s*\/?>/i, "\n"))
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
      const pdf = /href='([^']+\.pdf)'/.exec(block)?.[1];
      candidates.push({
        name,
        designation,
        qualified: /Qualified For The Ballot \(Yes\)/.test(block),
        ...(pdf ? { statementPdf: new URL(pdf, BASE).href } : {}),
      });
    }
    contests.push({ contestId, office, body, seat, voteFor, candidates });
    console.error(`${contestId} ${office} | ${body} | ${seat}: ${candidates.length}`);
  }
  await Bun.write(`${EVIDENCE}/filing-log.json`, `${JSON.stringify({ contests }, null, 2)}\n`);

  const measuresHtml = main(await get(MEASURES_PAGE));
  const measures: MeasureEntry[] = [];
  for (const m of measuresHtml.matchAll(/<a[^>]+href="([^"]+\.pdf)"[^>]*>([\s\S]*?)<\/a>/g)) {
    const label = text(m[2] ?? "");
    const parsed = /^([A-Z]{1,3})\s*[–-]\s*(.+?),\s*(.+)$/.exec(label);
    if (!parsed) continue;
    measures.push({
      letter: parsed[1] as string,
      body: parsed[2] as string,
      title: parsed[3] as string,
      pdf: new URL(m[1] as string, BASE).href,
    });
  }
  await Bun.write(`${EVIDENCE}/measures.json`, `${JSON.stringify({ measures }, null, 2)}\n`);
  await Bun.write(
    `${EVIDENCE}/retrieved.json`,
    `${JSON.stringify({ retrieved_at: new Date().toISOString().replace(/\.\d+Z$/, "Z") }, null, 2)}\n`,
  );
  console.error(`${contests.length} contests, ${measures.length} measures`);
}

if (fetchMode) {
  await fetchEvidence();
  process.exit(0);
}

// ---------------------------------------------------------------- full names from the qualified page

for (const file of [
  "contests-qualified.txt",
  "filing-log.json",
  "measures.json",
  "retrieved.json",
]) {
  if (!existsSync(`${EVIDENCE}/${file}`))
    throw new Error(`${EVIDENCE}/${file} is missing: run with --fetch`);
}
const qualifiedText = await Bun.file(`${EVIDENCE}/contests-qualified.txt`).text();
const { contests } = (await Bun.file(`${EVIDENCE}/filing-log.json`).json()) as {
  contests: Contest[];
};
const { measures } = (await Bun.file(`${EVIDENCE}/measures.json`).json()) as {
  measures: MeasureEntry[];
};
const { retrieved_at } = (await Bun.file(`${EVIDENCE}/retrieved.json`).json()) as {
  retrieved_at: string;
};

/** Bodies named on the qualified page: districts (a line of their own) and cities ("City of X, …"). */
const districts = new Set<string>();
const cities = new Set<string>();
{
  const lines = qualifiedText.split("\n").map((l) => l.trim());
  const from = lines.findIndex((l) => /^School District Contests$/.test(l));
  const to = lines.findIndex((l) => /^City Contests$/.test(l));
  for (const line of lines.slice(from + 1, to)) {
    if (/District|Agency|Authority/.test(line) && !/^(Trustee Area|Division|\d)/.test(line)) {
      districts.add(line.replace(/\s*Contests$/, ""));
    }
  }
  for (const line of lines.slice(to + 1)) {
    const city = /^City of ([^,]+)/.exec(line)?.[1];
    if (city) cities.add(city.trim());
    if (/^State Propositions$/.test(line)) break;
  }
}

const EXPAND: Record<string, string> = {
  sch: "school",
  dist: "district",
  distric: "district",
  comm: "community",
  coll: "college",
  rcho: "rancho",
  muni: "municipal",
  usd: "unified school district",
  us: "unified school",
  sd: "school district",
  hs: "high school",
  oc: "orange county",
  o: "orange",
  c: "county",
};
/**
 * How many words of the full name a truncated, abbreviated label skips, if each of its words
 * starts a word of the full name, in order ("North OC College Dist" skips "Community"); else
 * undefined.
 */
function skipped(label: string, full: string): number | undefined {
  const want = strip(label)
    .split(" ")
    .flatMap((w) => (EXPAND[w] ?? w).split(" "))
    .filter(Boolean);
  const have = strip(full).split(" ");
  let j = 0;
  let skips = 0;
  for (const w of want) {
    while (j < have.length && !(have[j] as string).startsWith(w)) {
      j++;
      skips++;
    }
    if (j === have.length) return undefined;
    j++;
  }
  return skips;
}

const problems: string[] = [];
/** The one full name a label abbreviates; of several, the one it skips fewest words of. */
function fullName(label: string, names: Set<string>): string | undefined {
  const found = [...names]
    .map((name) => ({ name, skips: skipped(label, name) }))
    .filter((f): f is { name: string; skips: number } => f.skips !== undefined)
    .sort((a, b) => a.skips - b.skips);
  if (found.length === 1 || (found.length > 1 && (found[0]?.skips ?? 0) < (found[1]?.skips ?? 0))) {
    return found[0]?.name;
  }
  problems.push(
    `"${label}" matches ${found.length ? found.map((f) => f.name).join(", ") : "nothing"} on the qualified page`,
  );
  return undefined;
}

// ---------------------------------------------------------------- contests → subjects

const COUNTY = "us/ca/orange-county";

/** "Dist, Trustee Area 2" → "Trustee Area 2"; "Div. 5" → "Division 5"; "Ward 4", "Dist 1"… */
function seatOf(text: string): { seat?: string; short: boolean } {
  const short = /short te/i.test(text);
  const t = text
    .replace(/\b(Dist|HS Dist|District)\s*,\s*/i, "")
    .replace(/,?\s*Short Te\w*/i, "")
    .replace(/\bTrust Area\b/i, "Trustee Area")
    .replace(/\bDiv\.\s*/i, "Division ")
    .replace(/\bDist (\d+)/i, "District $1")
    .trim();
  const m = /(Trustee Area|Division|District|Ward)\s+([0-9A-Z]+)/i.exec(t);
  return { ...(m ? { seat: `${m[1]} ${m[2]}` } : {}), short };
}

function candidateSubject(c: Contest): Built | undefined {
  // Federal, state and statewide-school contests are the Secretary of State's.
  if (c.contestId < 3000 || c.contestId === 3001) return undefined;
  const supervisor = /^County Supervisor (\d+)/.exec(c.office);
  if (supervisor) {
    return {
      title: `Orange County Board of Supervisors, District ${supervisor[1]}`,
      jurisdiction: COUNTY,
    };
  }
  const isCity = c.contestId >= 4900 && c.contestId < 6000;
  if (isCity) {
    const city = fullName(c.body.replace(/^City of /, ""), cities);
    if (!city) return undefined;
    const jurisdiction = `us/ca/${slugify(city)}`;
    if (/^Mayor$/.test(c.office)) return { title: `${city} Mayor`, jurisdiction };
    if (/^City (Attorney|Clerk|Treasurer)$/.test(c.office))
      return { title: `${city} ${c.office}`, jurisdiction };
    if (/City Council/.test(c.office)) {
      const { seat, short } = seatOf(
        `${c.office} ${c.seat}`.replace(/Member, City Council,? ?/g, ""),
      );
      return {
        title: `${city} City Council${seat ? `, ${seat}` : ""}${short ? " (Short Term)" : ""}`,
        jurisdiction,
      };
    }
    problems.push(`unknown city office "${c.office}" (${c.contestId})`);
    return undefined;
  }
  // A district board: the body may run on into the seat part ("Rossmoor Community | Services Dist").
  const body = fullName(c.body, districts) ?? undefined;
  if (!body) return undefined;
  const { seat, short } = seatOf(c.seat);
  return {
    title: `${body} Board${seat ? `, ${seat}` : ""}${short ? " (Short Term)" : ""}`,
    jurisdiction: COUNTY,
  };
}

function measureSubject(m: MeasureEntry): Built {
  const city = /^City of (.+)$/.exec(m.body)?.[1];
  return {
    title: `${city ?? m.body} — Measure ${m.letter} (${m.title.replace(/\s+/g, " ").trim()})`,
    jurisdiction: city ? `us/ca/${slugify(city)}` : COUNTY,
  };
}

// ---------------------------------------------------------------- build

const existing = await loadExisting(election, dir);
const own = await loadOwn(dir);
const cityJurisdictions = new Set([...cities].map((c) => `us/ca/${slugify(c)}`));
const reuse = subjectMatcher({
  existing,
  own,
  election,
  isLocal: (j, built) => j === COUNTY || j === built.jurisdiction || cityJurisdictions.has(j),
  problems,
});

interface Position {
  subject: { title: string; kind: string; jurisdiction: string; election: string };
  stance: "neutral";
  choice: string;
  statement?: string;
  source: string;
}
const positions: Position[] = [];
const used = new Map<string, string>();
const contestSubjects: Record<string, Position["subject"]> = {};
let reused = 0;
let spelled = 0;
for (const contest of contests) {
  const built = candidateSubject(contest);
  if (!built) continue;
  const subject = reuse(built, "race");
  if (existing.has(subject.title)) reused++;
  const label = `${contest.office} | ${contest.body} | ${contest.seat}`;
  const clash = used.get(subject.title);
  if (clash) problems.push(`"${label}" and "${clash}" both become "${subject.title}"`);
  used.set(subject.title, label);
  contestSubjects[String(contest.contestId)] = subject;
  const spellings = existing.get(subject.title)?.choices ?? [];
  const field = contest.candidates.filter((k) => k.qualified);
  if (field.length === 0) problems.push(`${subject.title}: no qualified candidates`);
  for (const candidate of field) {
    const known = knownSpelling(candidate.name, spellings);
    if (known) spelled++;
    positions.push({
      subject,
      stance: "neutral",
      choice: known ?? nameCase(candidate.name),
      ...(candidate.designation ? { statement: candidate.designation } : {}),
      source: FILING_LOG_PAGE,
    });
  }
}
const measureSubjects: Record<string, Position["subject"]> = {};
for (const measure of measures) {
  const subject = reuse(measureSubject(measure), "measure");
  if (existing.has(subject.title)) reused++;
  measureSubjects[measure.letter] = subject;
  for (const choice of ["Yes", "No"]) {
    positions.push({ subject, stance: "neutral", choice, source: MEASURES_PAGE });
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
    title: `Orange County Registrar of Voters — ${election} ballot: local candidates and measures`,
    jurisdiction: COUNTY,
    election,
  },
  attribution: {
    of: { name: "Orange County Registrar of Voters", uri: `${BASE}/`, kind: "election-authority" },
    mode: "scraped",
    retrieved_at,
    sources: [QUALIFIED_PAGE, FILING_LOG_PAGE, MEASURES_PAGE],
  },
  positions,
};

console.log(
  `${positions.length} positions: ${Object.keys(contestSubjects).length} races, ${measures.length} measures (${produced.size} subjects, ${reused} already in the catalog; ${spelled} names spelled as the catalog does)`,
);
if (process.argv.includes("--verbose")) {
  for (const [id, s] of Object.entries(contestSubjects)) {
    const c = contests.find((x) => String(x.contestId) === id);
    console.log(`  ${c?.office} | ${c?.body} | ${c?.seat}  →  ${s.title}`);
  }
}
if (orphans.length) {
  console.log(
    `\n${orphans.length} OC-area subject(s) in the catalog that this list doesn't produce:`,
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
