#!/usr/bin/env bun
// Re-file contests that sit under a county's bare name (scripts/lib/localities.ts) under the
// county's own path, `us/ca/<name>-county`, in every bundle and every election: the subject's
// jurisdiction, its district path when that's under the old one, San Diego bundles'
// context.jurisdiction, and a listing's contest-subjects.json. A re-filed subject is a new
// subject (its jurisdiction is part of its identity), so every bundle naming it moves together.
// Bundles are edited as text, so their formatting survives (scripts/position-edit.ts). Dry run
// by default; verify-positions fails while anything is left to re-file.
//
//   bun scripts/refile-localities.ts [--apply]

import { existsSync } from "node:fs";
import { belongsUnder } from "./lib/localities";
import { positionSpan, trackedBundles } from "./position-edit";

const apply = process.argv.includes("--apply");

/**
 * One-off moves the rules don't cover: a school board filed as a place of its own; a park
 * district ward filed under the park district, which no lookup finds, moved under its county
 * with the ward as its district (no listing covers Contra Costa yet to say so).
 */
const MOVES: Record<string, { to: string; district?: string }> = {
  "us/ca/san-dieguito-uhsd": { to: "us/ca/san-diego-county" },
  "us/ca/ebrpd": {
    to: "us/ca/contra-costa-county",
    district: "us/ca/east-bay-regional-park-district/ward-7",
  },
};

/**
 * Bundles scoped to a county's bare name that mean the county. San Diego's county was filed
 * under the city's name, so a bundle scoped there is the county's; elsewhere a bundle scoped to
 * a city's path is the city's (LA Forward, the Santa Barbara Independent) and stays.
 */
const CONTEXT_MOVES = new Set(["us/ca/san-diego"]);

interface Subject {
  title: string;
  jurisdiction?: string;
  district?: string;
}

/** Where a subject moves, or undefined when it stays. */
function destination(subject: Subject): { to: string; district?: string } | undefined {
  const from = subject.jurisdiction;
  if (!from) return undefined;
  const rule = belongsUnder(subject);
  return rule ? { to: rule } : MOVES[from];
}

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * `text` with the subject's jurisdiction, and its district under it, moved from `from` to
 * `to`; a `district` the move gives is added after the jurisdiction when there's none.
 */
function moveText(text: string, from: string, to: string, district?: string): string {
  let out = text
    .replace(
      new RegExp(`("jurisdiction"\\s*:\\s*)"${escapeRegExp(from)}"`),
      (_, key: string) => `${key}"${to}"`,
    )
    .replace(
      new RegExp(`("district"\\s*:\\s*)"${escapeRegExp(from)}/`),
      (_, key: string) => `${key}"${to}/`,
    );
  if (district && !/"district"\s*:/.test(out)) {
    const m = new RegExp(`"jurisdiction"\\s*:\\s*"${escapeRegExp(to)}"`).exec(out);
    if (m) {
      const lineStart = out.lastIndexOf("\n", m.index) + 1;
      const lead = out.slice(lineStart, m.index);
      const newline = out[lineStart - 2] === "\r" ? "\r\n" : "\n";
      const sep = /^\s*$/.test(lead) ? `,${newline}${lead}` : ", ";
      const at = m.index + m[0].length;
      out = `${out.slice(0, at)}${sep}"district": ${JSON.stringify(district)}${out.slice(at)}`;
    }
  }
  return out;
}

const moved = new Map<string, string>();
let files = 0;
let count = 0;
for (const file of [...(await trackedBundles())].sort()) {
  let text = await Bun.file(file).text();
  const bundle = JSON.parse(text) as { context?: Subject; positions: { subject: Subject }[] };
  const election = file.split("/")[2];
  let changed = 0;
  // Last first, so an edit can't shift the spans still to come.
  for (let index = bundle.positions.length - 1; index >= 0; index--) {
    const subject = bundle.positions[index]?.subject;
    const from = subject?.jurisdiction;
    const move = subject && destination(subject);
    if (!subject || !from || !move) continue;
    const span = positionSpan(text, index);
    if (!span) throw new Error(`${file}: no position ${index}`);
    const body = text.slice(span[0], span[1]);
    const edited = moveText(body, from, move.to, move.district);
    if (edited === body) throw new Error(`${file}: position ${index} has no "jurisdiction"`);
    text = text.slice(0, span[0]) + edited + text.slice(span[1]);
    moved.set(`${election}  ${subject.title}`, `${from} → ${move.to}`);
    changed++;
  }
  const scope = bundle.context?.jurisdiction;
  const contextTo =
    scope && CONTEXT_MOVES.has(scope) ? destination(bundle.context as Subject)?.to : undefined;
  if (scope && contextTo) {
    // The context comes before the positions, and nothing before it has a jurisdiction.
    const at = text.search(/"positions"\s*:/);
    text = moveText(text.slice(0, at), scope, contextTo) + text.slice(at);
    console.log(`${file}: context ${scope} → ${contextTo}`);
  }
  if (changed === 0 && !contextTo) continue;
  JSON.parse(text);
  files++;
  count += changed;
  if (apply) await Bun.write(file, text);

  // A listing's record of which subject each contest became, for its next rebuild.
  const contestsFile = file.replace(/positions\.json$/, "contest-subjects.json");
  if (!existsSync(contestsFile)) continue;
  const contests = (await Bun.file(contestsFile).json()) as Record<string, Record<string, Subject>>;
  let contestsChanged = 0;
  for (const group of Object.values(contests)) {
    for (const [key, subject] of Object.entries(group)) {
      const move = destination(subject);
      if (!move || !subject.jurisdiction) continue;
      group[key] = JSON.parse(moveText(JSON.stringify(subject), subject.jurisdiction, move.to));
      contestsChanged++;
    }
  }
  if (contestsChanged > 0) {
    console.log(`${contestsFile}: ${contestsChanged} contests`);
    if (apply) await Bun.write(contestsFile, `${JSON.stringify(contests, null, 2)}\n`);
  }
}

console.log(`${moved.size} subjects re-filed: ${count} positions in ${files} bundles`);
for (const [subject, move] of [...moved].sort()) console.log(`  ${move}  ${subject}`);
if (!apply) console.log("dry run; pass --apply to write");
