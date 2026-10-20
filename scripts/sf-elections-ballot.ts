#!/usr/bin/env bun
// Build the San Francisco Department of Elections' *ballot source* bundle for one election:
// every qualified local candidate and measure as a `neutral` position. Reads the evidence
// transcriptions under orgs/sf-department-of-elections/<election>/evidence/ (candidates.md:
// "## Office" headings with "- Name" lines; qualified-ballot-measures.md: '- X: "Title" (Type)'
// lines) and writes positions.json with the catalog's subject titles. Dry run by default.
//
//   bun scripts/sf-elections-ballot.ts 2026-11-03 [--apply]

const election = process.argv[2];
if (!election) throw new Error("usage: sf-elections-ballot.ts <election> [--apply]");
const apply = process.argv[3] === "--apply";
const dir = `orgs/sf-department-of-elections/${election}`;
const CANDIDATES_URL = "https://www.sf.gov/reports--candidates-nov-3-2026-general-election";
const MEASURES_URL = "https://www.sf.gov/qualified-ballot-measures";

/** Page heading → catalog title and jurisdiction. Seats become the statement. */
function office(heading: string): { title: string; jurisdiction: string; seats?: number } {
  const seats = heading.match(/\((\d+) seats\)/)?.[1];
  const h = heading.replace(/\s*\(\d+ seats\)/, "").trim();
  const sf = (title: string) => ({
    title,
    jurisdiction: "us/ca/sf",
    ...(seats ? { seats: Number(seats) } : {}),
  });
  const supervisor = h.match(/^Board of Supervisors, District (\d+)$/);
  if (supervisor) return sf(`San Francisco Board of Supervisors, District ${supervisor[1]}`);
  const bart = h.match(/^BART Board, District (\d+)$/);
  if (bart)
    return {
      title: `BART Board of Directors, District ${bart[1]}`,
      jurisdiction: `us/ca/bart-${bart[1]}`,
    };
  switch (h) {
    case "Assessor-Recorder":
      return sf("San Francisco Assessor-Recorder");
    case "Public Defender":
      return sf("San Francisco Public Defender");
    case "Board of Education":
      return sf("San Francisco Unified School District Board of Education");
    case "Community College Board":
      return sf("San Francisco Community College Board");
    case "Community College Board Partial Term":
      return sf("San Francisco Community College Board, Partial Term");
  }
  throw new Error(`unknown office heading "${heading}"`);
}

interface Position {
  subject: { title: string; kind: string; jurisdiction: string; election: string };
  stance: "neutral";
  choice: string;
  statement?: string;
  source: string;
}
const positions: Position[] = [];

let current: ReturnType<typeof office> | null = null;
for (const line of (await Bun.file(`${dir}/evidence/candidates.md`).text()).split(/\r?\n/)) {
  if (line.startsWith("## ")) current = office(line.slice(3));
  else if (line.startsWith("- ") && current) {
    positions.push({
      subject: { title: current.title, kind: "race", jurisdiction: current.jurisdiction, election },
      stance: "neutral",
      choice: line.slice(2).trim(),
      ...(current.seats ? { statement: `${current.seats} seats` } : {}),
      source: CANDIDATES_URL,
    });
  }
}

const measures = await Bun.file(`${dir}/evidence/qualified-ballot-measures.md`).text();
for (const m of measures.matchAll(/^- (\w+): "(.+?)" \((.+?)\)\s*$/gm)) {
  const [, letter, rawTitle, type] = m;
  // The catalog writes straight apostrophes ("Administrator's"); the city page uses curly ones.
  const title = rawTitle?.replace(/[’‘]/g, "'");
  const regional = letter === "RTM";
  const subject = regional
    ? { title: `Bay Area — Regional Measure ${letter} (${title})`, jurisdiction: "us/ca/bay-area" }
    : { title: `San Francisco — Proposition ${letter} (${title})`, jurisdiction: "us/ca/sf" };
  for (const choice of ["Yes", "No"]) {
    positions.push({
      subject: { ...subject, kind: "measure", election },
      stance: "neutral",
      choice,
      statement: type,
      source: MEASURES_URL,
    });
  }
}

const out = {
  context: {
    title: `San Francisco Department of Elections — ${election} ballot: qualified local candidates and measures`,
    jurisdiction: "us/ca/sf",
    election,
  },
  attribution: {
    of: {
      name: "San Francisco Department of Elections",
      uri: "https://www.sf.gov/departments--department-elections",
      kind: "election-authority",
    },
    mode: "transcribed",
    retrieved_at: new Date().toISOString().replace(/\.\d+Z$/, "Z"),
    sources: [CANDIDATES_URL, MEASURES_URL],
  },
  positions,
};
const races = new Set(positions.map((p) => p.subject.title)).size;
console.log(`${positions.length} positions across ${races} races/measures`);
if (process.argv.includes("--print")) console.log(JSON.stringify(out, null, 2));
if (apply) {
  await Bun.write(`${dir}/positions.json`, `${JSON.stringify(out, null, 2)}\n`);
  console.log(`wrote ${dir}/positions.json`);
} else {
  console.log("dry run; pass --apply to write positions.json");
}
