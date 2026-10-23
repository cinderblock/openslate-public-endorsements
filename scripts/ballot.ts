// The ballot gate: an election authority's bundle (attribution.of.kind
// "election-authority") lists every race in its jurisdictions and every name on the
// ballot for each. A position in a jurisdiction an authority covers must name one of
// its races, and its `choice` must be one of that race's ballot names, spelled as the
// ballot spells it. The web app groups choices on the exact string, so "Don Wagner" and
// "Donald P. (Don) Wagner" would otherwise show as two people.

import { Glob } from "bun";
import { type BallotMatch, matchBallotName } from "./names";

export interface Subject {
  title: string;
  jurisdiction?: string;
  election?: string;
}
export interface Position {
  subject: Subject;
  choice?: string;
}
export interface Bundle {
  context?: { election?: string; jurisdiction?: string };
  attribution?: { of?: { kind?: string } };
  positions: Position[];
}

export const isAuthority = (b: Bundle) => b.attribution?.of?.kind === "election-authority";

const scope = (s: Subject, b: Bundle) =>
  `${s.election ?? b.context?.election ?? ""}|${s.jurisdiction ?? ""}`;

export interface Ballot {
  /** `election|jurisdiction` pairs some authority lists every race for. */
  covered: Set<string>;
  /** `election|jurisdiction|title` → the names on the ballot, in ballot order. */
  races: Map<string, string[]>;
}

export function ballotFrom(bundles: Iterable<Bundle>): Ballot {
  const ballot: Ballot = { covered: new Set(), races: new Map() };
  for (const b of bundles) {
    if (!isAuthority(b)) continue;
    for (const p of b.positions) {
      const s = scope(p.subject, b);
      ballot.covered.add(s);
      const key = `${s}|${p.subject.title}`;
      const names = ballot.races.get(key) ?? [];
      if (p.choice && !names.includes(p.choice)) names.push(p.choice);
      ballot.races.set(key, names);
    }
  }
  return ballot;
}

export type Problem =
  | { index: number; kind: "race"; title: string; jurisdiction: string }
  | {
      index: number;
      kind: "choice";
      title: string;
      choice: string;
      ballot: string[];
      suggestion?: BallotMatch;
    };

export interface Check {
  problems: Problem[];
  /** Positions on a race an authority lists. */
  checked: number;
  /** Positions in a jurisdiction no authority covers yet. */
  unchecked: number;
}

/** Check one non-authority bundle against the ballot. */
export function checkBundle(bundle: Bundle, ballot: Ballot): Check {
  const check: Check = { problems: [], checked: 0, unchecked: 0 };
  if (isAuthority(bundle)) return check;
  bundle.positions.forEach((p, index) => {
    const s = scope(p.subject, bundle);
    if (!ballot.covered.has(s)) {
      check.unchecked++;
      return;
    }
    const names = ballot.races.get(`${s}|${p.subject.title}`);
    if (!names) {
      check.problems.push({
        index,
        kind: "race",
        title: p.subject.title,
        jurisdiction: p.subject.jurisdiction ?? "",
      });
      return;
    }
    check.checked++;
    // No choice: a position on the race as a whole (e.g. a dual endorsement noted in
    // the statement), nothing to match.
    if (p.choice === undefined || names.includes(p.choice)) return;
    const suggestion = matchBallotName(p.choice, names);
    check.problems.push({
      index,
      kind: "choice",
      title: p.subject.title,
      choice: p.choice,
      ballot: names,
      ...(suggestion ? { suggestion } : {}),
    });
  });
  return check;
}

export function describe(problem: Problem): string {
  if (problem.kind === "race")
    return `positions[${problem.index}]: race "${problem.title}" isn't on the ballot for ${problem.jurisdiction}`;
  const hint = problem.suggestion
    ? problem.suggestion.sure
      ? ` (ballot spelling: "${problem.suggestion.name}")`
      : ` (did you mean "${problem.suggestion.name}"? check the source)`
    : ` (ballot: ${problem.ballot.map((n) => `"${n}"`).join(", ")})`;
  return `positions[${problem.index}]: "${problem.choice}" isn't on the ballot for "${problem.title}"${hint}`;
}

export interface LoadedBundle {
  /** Repo-relative, forward slashes: `orgs/<slug>/<election>/positions.json`. */
  path: string;
  bundle: Bundle;
}

/** Every `orgs/<slug>/<election>/positions.json` that parses (others are skipped). */
export async function loadBundles(root: string, election = "*"): Promise<LoadedBundle[]> {
  const out: LoadedBundle[] = [];
  for await (const f of new Glob(`orgs/*/${election}/positions.json`).scan(root)) {
    try {
      const raw = JSON.parse(await Bun.file(`${root}/${f}`).text());
      const bundle: Bundle = Array.isArray(raw) ? { positions: raw } : raw;
      if (Array.isArray(bundle.positions)) out.push({ path: f.replaceAll("\\", "/"), bundle });
    } catch {}
  }
  return out.sort((a, b) => a.path.localeCompare(b.path));
}
