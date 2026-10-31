#!/usr/bin/env bun
// Build the San Francisco Department of Elections' *ballot source* bundle for one election:
// every qualified local candidate and measure as a `neutral` position. Reads the evidence
// transcriptions under orgs/sf-department-of-elections/<election>/evidence/ (candidates.md:
// "## Office" headings with "- Name" lines; qualified-ballot-measures.md: '- X: "Title" (Type)'
// lines) and writes positions.json with the catalog's subject titles. Dry run by default.
//
//   bun scripts/sf-elections-ballot.ts 2026-11-03 [--apply]
//
// How the ballot prints each contest goes in `subject.ballot` (OpenSlate SPEC §3.14): the
// heading, how many to vote for (a board's seats), or for a ranked-choice office how many
// choices a voter may rank; a measure's letter, title and type.

import type { BallotContest } from "../.openslate/packages/core/src/index";

const election = process.argv[2];
if (!election) throw new Error("usage: sf-elections-ballot.ts <election> [--apply]");
const apply = process.argv[3] === "--apply";
const dir = `orgs/sf-department-of-elections/${election}`;
const CANDIDATES_URL = "https://www.sf.gov/reports--candidates-nov-3-2026-general-election";
const MEASURES_URL = "https://www.sf.gov/qualified-ballot-measures";
const RANKED_CHOICE_URL = "https://www.sf.gov/ranked-choice-voting";

/**
 * San Francisco elects its city officers (Mayor, City Attorney, District Attorney, Sheriff,
 * Assessor-Recorder, Public Defender, Treasurer) and Supervisors by ranked choice, up to ten
 * rankings (RANKED_CHOICE_URL). Its school and college boards and BART's
 * board are elected by plurality.
 */
const RANKS = 10;

/** Page heading → catalog title and jurisdiction, and how the ballot prints the contest. */
function office(heading: string): { title: string; jurisdiction: string; ballot: BallotContest } {
  const seats = Number(heading.match(/\((\d+) seats\)/)?.[1] ?? 1);
  const h = heading.replace(/\s*\(\d+ seats\)/, "").trim();
  const sf = (title: string, ranked = false) => ({
    title,
    jurisdiction: "us/ca/sf",
    ballot: ranked ? { heading: h, ranks: RANKS } : { heading: h, vote_for: seats },
  });
  const supervisor = h.match(/^Board of Supervisors, District (\d+)$/);
  if (supervisor) return sf(`San Francisco Board of Supervisors, District ${supervisor[1]}`, true);
  const bart = h.match(/^BART Board, District (\d+)$/);
  if (bart)
    return {
      title: `BART Board of Directors, District ${bart[1]}`,
      jurisdiction: `us/ca/bart-${bart[1]}`,
      ballot: { heading: h, vote_for: seats },
    };
  switch (h) {
    case "Assessor-Recorder":
      return sf("San Francisco Assessor-Recorder", true);
    case "Public Defender":
      return sf("San Francisco Public Defender", true);
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
  subject: {
    title: string;
    kind: string;
    jurisdiction: string;
    election: string;
    ballot: BallotContest;
  };
  stance: "neutral";
  choice: string;
  source: string;
}
const positions: Position[] = [];

let current: ReturnType<typeof office> | null = null;
for (const line of (await Bun.file(`${dir}/evidence/candidates.md`).text()).split(/\r?\n/)) {
  if (line.startsWith("## ")) current = office(line.slice(3));
  else if (line.startsWith("- ") && current) {
    positions.push({
      subject: {
        title: current.title,
        kind: "race",
        jurisdiction: current.jurisdiction,
        election,
        ballot: current.ballot,
      },
      stance: "neutral",
      choice: line.slice(2).trim(),
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
  const ballot: BallotContest = {
    heading: regional ? `Regional Measure ${letter}` : `Proposition ${letter}`,
    ...(letter ? { number: letter } : {}),
    ...(title ? { label: title } : {}),
    ...(type ? { measure_type: type } : {}),
  };
  for (const choice of ["Yes", "No"]) {
    positions.push({
      subject: { ...subject, kind: "measure", election, ballot },
      stance: "neutral",
      choice,
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
    mode: "scraped",
    retrieved_at: new Date().toISOString().replace(/\.\d+Z$/, "Z"),
    sources: [CANDIDATES_URL, MEASURES_URL, RANKED_CHOICE_URL],
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
