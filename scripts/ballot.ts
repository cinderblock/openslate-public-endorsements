// The ballot gate (SPEC §3.11, §3.12, §8.2). An election authority's bundle
// (attribution.of.kind "election-authority") is a ballot listing: every race in its
// jurisdictions and every name on the ballot for each, each name with a `choice_id`. A
// position in a jurisdiction a listing covers must name one of its races, and its choice
// must be one of that race's names, spelled as the ballot spells it and carrying its
// `choice_id`, or be marked `write_in`. Matching is OpenSlate core's (`resolveChoice`), the
// same the web app uses to show endorsements under the ballot's names.

import { Glob } from "bun";
import {
  type BallotListing,
  type ListedChoice,
  type Position,
  ballotListing,
  isBallotListing,
  matchBallotName,
  resolveChoice,
  scopeOf,
} from "../.openslate/packages/core/src/index";

export interface Bundle {
  context?: { election?: string; jurisdiction?: string };
  attribution?: { of?: { kind?: string } };
  positions: Position[];
}

export const isAuthority = (b: Bundle) => isBallotListing(b);

/** The ballot listings among some bundles. */
export const ballotFrom = (bundles: Iterable<Bundle>): BallotListing => ballotListing(bundles);

/** The one listed race, in the same election and jurisdiction, whose field has this name. */
export interface Move {
  title: string;
  listed: ListedChoice;
}

export type Problem =
  /** A race the listing doesn't name, in a jurisdiction it covers. */
  | { index: number; kind: "race"; title: string; jurisdiction: string; moveTo?: Move }
  /** A name the race doesn't list. `suggestion`: the listed name it resembles, for a human. */
  | {
      index: number;
      kind: "choice";
      title: string;
      choice: string;
      ballot: string[];
      suggestion?: ListedChoice;
      moveTo?: Move;
    }
  /**
   * A listed choice, but not as the listing gives it: another spelling of the same person,
   * a missing or different `choice_id`, or `write_in` set the other way. `normalize-choices
   * --apply` fixes these.
   */
  | { index: number; kind: "fix"; title: string; choice: string; listed: ListedChoice }
  /** A listing's own choice without a `choice_id`. `assign-choice-ids.ts` fixes these. */
  | { index: number; kind: "listing-id"; title: string; choice: string };

/** Allowed, but worth a look: a write-in the listing doesn't certify. */
export interface Warning {
  index: number;
  title: string;
  choice: string;
  suggestion?: ListedChoice;
}

export interface Check {
  problems: Problem[];
  warnings: Warning[];
  /** Positions on a race a listing lists. */
  checked: number;
  /** Positions in a jurisdiction no listing covers yet. */
  unchecked: number;
}

/**
 * A name on the wrong race (Area 2 for Area 7, a council seat without its district): the one
 * other listed race, same election and jurisdiction, that has the same person. Yes / No never
 * moves.
 */
function moveFor(ballot: BallotListing, p: Position, bundle: Bundle): Move | undefined {
  if (!p.choice || /^(yes|no)$/i.test(p.choice)) return undefined;
  const { election, jurisdiction } = scopeOf(p.subject, bundle);
  const moves: Move[] = [];
  for (const race of ballot.races.values()) {
    if (race.election !== election || race.jurisdiction !== jurisdiction) continue;
    if (race.subject.title === p.subject.title) continue;
    const match = matchBallotName(
      p.choice,
      race.choices.map((c) => c.name),
    );
    const listed = match?.sure && race.choices.find((c) => c.name === match.name);
    if (listed) moves.push({ title: race.subject.title, listed });
  }
  return moves.length === 1 ? moves[0] : undefined;
}

/** Check one bundle against the listings. A listing is checked for ids on its own choices. */
export function checkBundle(bundle: Bundle, ballot: BallotListing): Check {
  const check: Check = { problems: [], warnings: [], checked: 0, unchecked: 0 };
  if (isAuthority(bundle)) {
    bundle.positions.forEach((p, index) => {
      if (p.choice !== undefined && !p.choice_id)
        check.problems.push({
          index,
          kind: "listing-id",
          title: p.subject.title,
          choice: p.choice,
        });
    });
    return check;
  }
  bundle.positions.forEach((p, index) => {
    const r = resolveChoice(ballot, p, bundle);
    const title = p.subject.title;
    switch (r.status) {
      case "uncovered":
        check.unchecked++;
        return;
      case "race-unlisted": {
        const moveTo = moveFor(ballot, p, bundle);
        check.problems.push({
          index,
          kind: "race",
          title,
          jurisdiction: p.subject.jurisdiction ?? bundle.context?.jurisdiction ?? "",
          ...(moveTo ? { moveTo } : {}),
        });
        return;
      }
      case "no-choice":
        // A position on the race as a whole (e.g. a dual endorsement noted in the
        // statement): nothing to match.
        check.checked++;
        return;
      case "listed": {
        check.checked++;
        const { choice } = r;
        if (
          p.choice !== choice.name ||
          (choice.id !== undefined && p.choice_id !== choice.id) ||
          choice.writeIn !== (p.write_in === true)
        )
          check.problems.push({
            index,
            kind: "fix",
            title,
            choice: p.choice ?? "",
            listed: choice,
          });
        return;
      }
      case "write-in":
        check.checked++;
        check.warnings.push({
          index,
          title,
          choice: p.choice ?? "",
          ...(r.suggestion ? { suggestion: r.suggestion } : {}),
        });
        return;
      case "unlisted": {
        check.checked++;
        const moveTo = r.suggestion ? undefined : moveFor(ballot, p, bundle);
        check.problems.push({
          index,
          kind: "choice",
          title,
          choice: p.choice ?? "",
          ballot: r.race.choices.map((c) => c.name),
          ...(r.suggestion ? { suggestion: r.suggestion } : {}),
          ...(moveTo ? { moveTo } : {}),
        });
        return;
      }
    }
  });
  return check;
}

export function describe(problem: Problem): string {
  const at = `positions[${problem.index}]`;
  switch (problem.kind) {
    case "race":
      return `${at}: race "${problem.title}" isn't on the ballot for ${problem.jurisdiction}${moveHint(problem.moveTo)}`;
    case "listing-id":
      return `${at}: "${problem.choice}" in "${problem.title}" has no choice_id (run: bun scripts/assign-choice-ids.ts)`;
    case "fix":
      return `${at}: "${problem.choice}" in "${problem.title}" is the ballot's "${problem.listed.name}" (${problem.listed.id ?? "no id"}${problem.listed.writeIn ? ", write-in" : ""}); fix with normalize-choices --apply`;
    case "choice": {
      const hint = problem.suggestion
        ? ` (did you mean "${problem.suggestion.name}"? check the source)`
        : problem.moveTo
          ? moveHint(problem.moveTo)
          : ` (ballot: ${problem.ballot.map((n) => `"${n}"`).join(", ")}; a write-in needs "write_in": true)`;
      return `${at}: "${problem.choice}" isn't on the ballot for "${problem.title}"${hint}`;
    }
  }
}

function moveHint(move: Move | undefined): string {
  return move
    ? ` ("${move.listed.name}" is on the ballot for "${move.title}": the wrong race? check the source)`
    : "";
}

export function describeWarning(warning: Warning): string {
  const hint = warning.suggestion ? ` (did you mean "${warning.suggestion.name}"?)` : "";
  return `positions[${warning.index}]: write-in "${warning.choice}" in "${warning.title}" isn't a certified write-in candidate${hint}`;
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
