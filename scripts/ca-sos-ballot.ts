#!/usr/bin/env bun
// Build the California Secretary of State's *ballot source* bundle for one general election:
// every certified candidate and qualified statewide measure as a `neutral` position, so a
// voter's ballot shows the whole field, not only the names some organization endorsed.
// Reads the evidence files saved under orgs/ca-secretary-of-state/<election>/evidence/
// (the certified list PDF's extracted text, and the qualified-measures page) and writes
// positions.json. Subject titles follow the catalog's conventions so the field lines up
// with the endorsement bundles. Dry run by default.
//
//   bun scripts/ca-sos-ballot.ts 2026-11-03 [--apply]
//
// How the ballot prints each contest and candidate goes in `ballot` (OpenSlate SPEC §3.14):
// heading, measure number, label and type, how many to vote for, a judge's retention question;
// party, designation, incumbent.

import type { BallotChoice, BallotContest } from "../.openslate/packages/core/src/index";

const election = process.argv[2];
if (!election) throw new Error("usage: ca-sos-ballot.ts <election> [--apply]");
const apply = process.argv[3] === "--apply";
const dir = `orgs/ca-secretary-of-state/${election}`;
const CERT_URL = `https://elections.cdn.sos.ca.gov/statewide-elections/${election.slice(0, 4)}-general/cert-list-candidates.pdf`;
const MEASURES_URL = "https://www.sos.ca.gov/elections/ballot-measures/qualified-ballot-measures";

const PARTIES = [
  "Democratic",
  "Republican",
  "Green",
  "Libertarian",
  "Peace and Freedom",
  "American Independent",
  "No Party Preference",
  "Non-Partisan",
];
const candidateLine = new RegExp(`^(.+?)(\\*)?\\s+(${PARTIES.join("|")})\\s*$`);
const noise =
  /^(General Election - |Official Certified List|\d+\/\d+\/\d+\s*$|Page \d+ of \d+|\* Incumbent|=====PAGE=====)/;

// Catalog spelling of each statewide office; everything else is a numbered district.
const STATEWIDE: Record<string, string> = {
  Governor: "Governor of California",
  "Lieutenant Governor": "Lieutenant Governor of California",
  "Secretary of State": "California Secretary of State",
  Controller: "California Controller",
  Treasurer: "California Treasurer",
  "Attorney General": "Attorney General of California",
  "Insurance Commissioner": "California Insurance Commissioner",
  "Superintendent of Public Instruction": "California Superintendent of Public Instruction",
};
const DISTRICTS: Array<[RegExp, (n: string) => { title: string; jurisdiction: string }]> = [
  [
    /^Board of Equalization Member District (\d+)$/,
    (n) => ({
      title: `California State Board of Equalization, District ${n}`,
      jurisdiction: "us/ca",
    }),
  ],
  [
    /^United States Representative District (\d+)$/,
    (n) => ({
      title: `US House of Representatives, California District ${n}`,
      jurisdiction: `us/ca/cd-${n}`,
    }),
  ],
  [
    /^State Senate District (\d+)$/,
    (n) => ({ title: `California State Senate, District ${n}`, jurisdiction: `us/ca/sd-${n}` }),
  ],
  [
    /^State Assembly Member District (\d+)$/,
    (n) => ({ title: `California State Assembly, District ${n}`, jurisdiction: `us/ca/ad-${n}` }),
  ],
];
const ORDINALS: Record<string, string> = {
  First: "1",
  Second: "2",
  Third: "3",
  Fourth: "4",
  Fifth: "5",
  Sixth: "6",
};

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
  ballot?: BallotChoice;
  source: string;
}
const positions: Position[] = [];
/** One choice, with how the ballot prints its contest and it (OpenSlate SPEC §3.14). */
const push = (
  title: string,
  kind: string,
  jurisdiction: string,
  contest: BallotContest,
  choice: string,
  printed: BallotChoice | undefined,
  source: string,
) =>
  positions.push({
    subject: { title, kind, jurisdiction, election, ballot: contest },
    stance: "neutral",
    choice,
    ...(printed ? { ballot: printed } : {}),
    source,
  });

/** "TARI L. CODY" → "Tari L. Cody"; keeps II/III and particles like "de la" sensible. */
function titleCase(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => {
      if (/^(II|III|IV)$/.test(w)) return w;
      return w
        .split("-")
        .map((part) => part.charAt(0) + part.slice(1).toLowerCase())
        .join("-");
    })
    .join(" ");
}

// --- Candidates: office heading, then (candidate line, ballot designation) pairs. ---
const text = await Bun.file(`${dir}/evidence/cert-list-candidates.txt`).text();
const lines = text
  .split(/\r?\n/)
  .map((l) => l.trim())
  .filter((l) => l && !noise.test(l));
const start = lines.findIndex((l) => l === "Governor");
const judicialAt = lines.findIndex((l) => l.startsWith("Supreme Court"));
if (start < 0 || judicialAt < 0)
  throw new Error("certified list text: can't find Governor / Supreme Court sections");

let office: { title: string; jurisdiction: string; heading: string } | null = null;
let pending: { name: string; party: string; incumbent: boolean } | null = null;
let designation: string[] = [];
const flush = () => {
  if (!pending || !office) return;
  const note = designation.join(" ");
  // Every office on the certified list fills one seat.
  push(
    office.title,
    "race",
    office.jurisdiction,
    { heading: office.heading, vote_for: 1 },
    pending.name,
    {
      party: pending.party,
      ...(note && note !== "No Ballot Designation" ? { designation: note } : {}),
      ...(pending.incumbent ? { incumbent: true as const } : {}),
    },
    CERT_URL,
  );
  pending = null;
  designation = [];
};
/** An office heading on the certified list: the catalog's subject, and the heading itself. */
const asOffice = (
  line: string,
): { title: string; jurisdiction: string; heading: string } | null => {
  if (STATEWIDE[line]) return { title: STATEWIDE[line], jurisdiction: "us/ca", heading: line };
  for (const [re, make] of DISTRICTS) {
    const m = line.match(re);
    if (m?.[1]) return { ...make(m[1]), heading: line };
  }
  return null;
};
for (const line of lines.slice(start, judicialAt)) {
  const m = line.match(candidateLine);
  const heading = asOffice(line);
  if (heading) {
    flush();
    office = heading;
  } else if (m?.[1] && m[3]) {
    flush();
    pending = { name: m[1].trim(), party: m[3], incumbent: Boolean(m[2]) };
  } else if (pending) {
    // A designation wraps to a second line at most; more means an office heading we don't know.
    if (designation.length >= 2) throw new Error(`certified list text: unexpected line "${line}"`);
    designation.push(line);
  } else {
    throw new Error(`certified list text: unexpected line "${line}"`);
  }
}
flush();

// --- Judicial retention: "• For <office>" then "Shall [role] NAME be elected…". ---
const judicial = lines.slice(judicialAt).join(" ");
let court = { title: "California Supreme Court", jurisdiction: "us/ca" };
for (const chunk of judicial.split("•").slice(1)) {
  const m = chunk.match(/^\s*For (.+?)\s+Shall (.+?) be elected/);
  if (!m?.[1] || !m[2])
    throw new Error(`certified list text: unexpected judicial entry "${chunk.slice(0, 80)}"`);
  const officeText = m[1].trim();
  const district = officeText.match(/Court of Appeal, (\w+) District/)?.[1];
  if (district) {
    const n = ORDINALS[district];
    if (!n) throw new Error(`unknown appellate district "${district}"`);
    court = {
      title: `California Court of Appeal, ${district} District`,
      jurisdiction: `us/ca/coa-${n}`,
    };
  }
  // The name is the trailing run of ALL-CAPS words; what precedes it is the current role.
  const words = m[2].trim().split(/\s+/);
  let i = words.length;
  while (i > 0 && /^[A-Z][A-Z.'’-]*$|^(II|III|IV)$/.test(words[i - 1] ?? "")) i--;
  const name = titleCase(words.slice(i).join(" "));
  if (!name) throw new Error(`certified list text: no name in "${m[2]}"`);
  const title = `${court.title} — Retain Justice ${name}`;
  const question = chunk
    .match(/Shall .+?\?/)?.[0]
    .replace(/\s+/g, " ")
    .trim();
  if (!question) throw new Error(`certified list text: no question in "${chunk.slice(0, 80)}"`);
  // A retention question: the ballot prints it with the offices, not the measures.
  const contest: BallotContest = { heading: `For ${officeText}`, label: question, retention: true };
  for (const choice of ["Yes", "No"])
    push(title, "measure", court.jurisdiction, contest, choice, undefined, CERT_URL);
}

// --- Statewide measures from the qualified-measures page evidence. ---
const measures = await Bun.file(`${dir}/evidence/qualified-ballot-measures.md`).text();
const TYPE = /\s*(Legislative|Initiative) (Constitutional Amendment( and Statute)?|Statute)\.?$/;
for (const m of measures.matchAll(/^Proposition (\d+): "(.+?)"\s*(?:"(.+?)")?\s*$/gm)) {
  const [, number, titleText, typeOnly] = m;
  const type =
    typeOnly?.replace(/\.$/, "") ?? titleText?.match(TYPE)?.[0].trim().replace(/\.$/, "");
  // The catalog writes straight apostrophes ("Voters' Ability"), whatever the page uses.
  const title = (titleText ?? "").replace(TYPE, "").replace(/\.$/, "").replace(/[’‘]/g, "'");
  const contest = {
    heading: `Proposition ${number}`,
    ...(number ? { number } : {}),
    ...(title ? { label: title } : {}),
    ...(type ? { measure_type: type } : {}),
  };
  for (const choice of ["Yes", "No"]) {
    push(
      `California — Proposition ${number} (${title})`,
      "measure",
      "us/ca",
      contest,
      choice,
      undefined,
      MEASURES_URL,
    );
  }
}

const out = {
  context: {
    title: `California Secretary of State — ${election} general election ballot: certified candidates and qualified measures`,
    jurisdiction: "us/ca",
    election,
  },
  attribution: {
    of: {
      name: "California Secretary of State",
      uri: "https://www.sos.ca.gov/",
      kind: "election-authority",
    },
    mode: "transcribed",
    retrieved_at: new Date().toISOString().replace(/\.\d+Z$/, "Z"),
    sources: [CERT_URL, MEASURES_URL],
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
