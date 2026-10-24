// The "Qualified Candidate List" report (CFMR009) that Santa Clara and San Mateo both print from
// their election system: a table per contest, read from the PDF's text. A contest's row has its
// number at the left margin, its name, "Vote For: N" and "On Ballot: Yes|No"; each candidate's
// row reads "Qualified <n> <name>" (San Mateo: "Qualified: <n> <NAME> <PARTY>"), with "Candidate
// Stmt Filed?" beside it and the ballot designation on the row below, indented. A contest runs
// across pages.

import type { Line } from "./pdf-layout";

export interface QualifiedCandidate {
  name: string;
  /** A partisan contest's party code, as printed ("DEM", "REP", "NPP"). */
  party?: string;
  designation: string;
  /** Whether the candidate filed a statement for the county's guide, where the list says. */
  statementFiled?: boolean;
}
export interface QualifiedContest {
  number: string;
  /** As the list prints it: "Alum Rock Union SD, TA 3", "Mayor, City of Milpitas". */
  title: string;
  onBallot: boolean;
  voteFor: number;
  candidates: QualifiedCandidate[];
}

/** Lines sharing a baseline, top to bottom, each row left to right. */
function rows(lines: Line[]): Line[][] {
  const sorted = [...lines].sort((a, b) => b.y - a.y || a.x0 - b.x0);
  const out: Line[][] = [];
  for (const line of sorted) {
    const row = out.at(-1);
    // Within a point of the row's lowest line so far: cells of one row sit up to a point apart,
    // and a candidate's website line can sit 1.4 pt above the next candidate's name.
    if (row && (row.at(-1) as Line).y - line.y < 1) row.push(line);
    else out.push([line]);
  }
  return out.map((r) => r.sort((a, b) => a.x0 - b.x0));
}

const PARTY = /\s+(DEM|REP|NPP|LIB|GRN|P&F|PF|AIP|AI)$/;
const QUALIFIED = /^Qualified:? \d+(?: (.+))?$/;

export function readQualifiedList(pages: { lines: Line[] }[]): QualifiedContest[] {
  const contests: QualifiedContest[] = [];
  let current: QualifiedContest | undefined;
  let awaitingDesignation: QualifiedCandidate | undefined;
  for (const page of pages) {
    for (const row of rows(page.lines)) {
      const text = row.map((l) => l.text).join(" | ");
      const number = row.find((l) => l.x0 < 30 && l.bold && /^\d{3,5}$/.test(l.text));
      if (number) {
        // A contest row's cells can sit a point and a half apart (San Mateo's).
        const cells = page.lines.filter((l) => Math.abs(l.y - number.y) < 2.5);
        const header = cells.map((l) => l.text).join(" | ");
        const title = cells.find((l) => l.x0 > 40 && l.x0 < 300 && l.bold)?.text;
        const onBallot = /On Ballot: (Yes|No)/.exec(header)?.[1];
        const voteFor = /Vote For:? (\d+)/i.exec(header)?.[1];
        if (!title || !onBallot || !voteFor) throw new Error(`can't read contest row "${header}"`);
        current = {
          number: number.text,
          title: title.replace(/\s+/g, " ").trim(),
          onBallot: onBallot === "Yes",
          voteFor: Number(voteFor),
          candidates: [],
        };
        contests.push(current);
        awaitingDesignation = undefined;
        continue;
      }
      const qualifiedLine = row.find((l) => QUALIFIED.test(l.text));
      if (qualifiedLine) {
        if (!current) throw new Error(`candidate row "${text}" before any contest`);
        // Usually one run, "Qualified 2 Jason Lin"; sometimes the name is set apart, in bold.
        const printed =
          QUALIFIED.exec(qualifiedLine.text)?.[1] ??
          row.find((l) => l.bold && l.x0 > 100 && l.x0 < 340)?.text;
        if (!printed) throw new Error(`can't read the candidate in "${text}"`);
        const name = printed.replace(/\s+/g, " ").trim();
        const party = PARTY.exec(name)?.[1];
        const filed = /Candidate Stmt Filed\?/.test(text)
          ? row.find((l) => l.bold && /^(Yes|No)\b/.test(l.text))?.text
          : undefined;
        awaitingDesignation = {
          name: party ? name.replace(PARTY, "") : name,
          ...(party ? { party } : {}),
          designation: "",
          ...(filed ? { statementFiled: filed.startsWith("Yes") } : {}),
        };
        current.candidates.push(awaitingDesignation);
        continue;
      }
      if (awaitingDesignation) {
        // The designation sits under the name, indented past the "Res:" and "Mail:" lines.
        const designation = row.find((l) => l.x0 > 110 && l.x0 < 140 && !l.bold);
        if (designation) {
          awaitingDesignation.designation = designation.text.replace(/\s+/g, " ").trim();
          awaitingDesignation = undefined;
        }
      }
    }
  }
  return contests;
}
