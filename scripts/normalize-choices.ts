#!/usr/bin/env bun
// Canonicalize candidate spellings within each race across every org's bundle for one
// election, so cross-org collation groups the same person together.
//
// On a race an election authority lists (scripts/ballot.ts), the ballot's spelling is
// canonical: a choice that's the same person by the rules in scripts/names.ts is
// rewritten to it. A choice that only resembles a ballot name (a typo, an unusual short
// form) is listed as a suggestion, and rewritten only with --suggested once a human has
// checked each against its source.
//
// On races no authority covers, variants of the same person are clustered across orgs
// and rewritten to the spelling most orgs use, then the accented one, then the shortest.
// Dry run by default.
//
//   bun scripts/normalize-choices.ts 2026-11-03 [--apply [--suggested]]

import { ballotFrom, checkBundle, isAuthority, loadBundles } from "./ballot";
import { samePerson } from "./names";

const root = ".";
const election = process.argv[2];
if (!election) throw new Error("usage: normalize-choices.ts <election> [--apply [--suggested]]");
const apply = process.argv.includes("--apply");
const suggested = process.argv.includes("--suggested");

const bundles = await loadBundles(root, election);
const ballot = ballotFrom(bundles.map((b) => b.bundle));

type Change = { file: string; index: number; title: string; from: string; to: string };
const changes: Change[] = [];
const suggestions: Change[] = [];
const unresolved: string[] = [];

// 1. Races the ballot lists: snap to the ballot's spelling.
for (const { path, bundle } of bundles) {
  for (const p of checkBundle(bundle, ballot).problems) {
    if (p.kind === "race") {
      unresolved.push(`${path} positions[${p.index}]: race "${p.title}" isn't on the ballot`);
      continue;
    }
    if (!p.suggestion) {
      unresolved.push(`${path} positions[${p.index}]: "${p.choice}" in "${p.title}"`);
      continue;
    }
    const change = {
      file: path,
      index: p.index,
      title: p.title,
      from: p.choice,
      to: p.suggestion.name,
    };
    (p.suggestion.sure ? changes : suggestions).push(change);
  }
}

// 2. Races no authority covers: cluster across orgs.
type Pos = { file: string; index: number; org: string; title: string; choice: string };
const uncovered: Pos[] = [];
for (const { path, bundle } of bundles) {
  if (isAuthority(bundle)) continue;
  const org = path.split("/")[1] as string;
  bundle.positions.forEach((p, index) => {
    const scope = `${p.subject.election ?? bundle.context?.election ?? ""}|${p.subject.jurisdiction ?? ""}`;
    if (ballot.covered.has(scope)) return;
    if (p.choice && !/^(yes|no)$/i.test(p.choice))
      uncovered.push({ file: path, index, org, title: p.subject.title, choice: p.choice });
  });
}
for (const [title, ps] of Map.groupBy(uncovered, (p) => p.title)) {
  const names = [...new Set(ps.map((p) => p.choice))];
  const clusters: string[][] = [];
  for (const n of names) {
    const c = clusters.find((c) => c.some((m) => samePerson(m, n)));
    c ? c.push(n) : clusters.push([n]);
  }
  for (const c of clusters.filter((c) => c.length > 1)) {
    const count = (n: string) => new Set(ps.filter((p) => p.choice === n).map((p) => p.org)).size;
    const hasDiacritic = (n: string) => (n !== n.normalize("NFD").replace(/\p{M}/gu, "") ? 1 : 0);
    const canon = [...c].sort(
      (a, b) => count(b) - count(a) || hasDiacritic(b) - hasDiacritic(a) || a.length - b.length,
    )[0] as string;
    console.log(`${title}\n   → ${canon}   (${c.map((n) => `${n}×${count(n)}`).join(", ")})`);
    for (const p of ps)
      if (p.choice !== canon && c.includes(p.choice))
        changes.push({ file: p.file, index: p.index, title, from: p.choice, to: canon });
  }
}

const show = (ch: Change) => `${ch.file} [${ch.index}] ${ch.title}: "${ch.from}" → "${ch.to}"`;
if (changes.length)
  console.log(`\nSame person, rewritten with --apply:\n  ${changes.map(show).join("\n  ")}`);
if (suggestions.length)
  console.log(
    `\nLooks like a ballot name; check each against its source, then add --suggested:\n  ${suggestions.map(show).join("\n  ")}`,
  );
if (unresolved.length)
  console.log(`\nNo ballot name fits; fix by hand:\n  ${unresolved.join("\n  ")}`);
const todo = apply ? [...changes, ...(suggested ? suggestions : [])] : [];
console.log(
  `\n${changes.length} same-person edits, ${suggestions.length} suggestions, ${unresolved.length} unresolved${apply ? `; applied ${todo.length}` : " (dry run)"}`,
);

// Edit the files as text so their formatting survives: find the n-th position's
// "choice" by walking the positions array's top-level objects.
for (const [file, edits] of Map.groupBy(todo, (ch) => ch.file)) {
  const path = `${root}/${file}`;
  let t = await Bun.file(path).text();
  for (const ch of edits) {
    const span = positionSpan(t, ch.index);
    const re = new RegExp(`("choice":\\s*)${escapeRegExp(JSON.stringify(ch.from))}`);
    const body = span && t.slice(span[0], span[1]);
    if (!span || !body || !re.test(body)) {
      console.error("FAILED", show(ch));
      continue;
    }
    t =
      t.slice(0, span[0]) +
      body.replace(re, (_, k) => k + JSON.stringify(ch.to)) +
      t.slice(span[1]);
  }
  await Bun.write(path, t);
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** [start, end) of the index-th object in the file's top-level "positions" array. */
function positionSpan(text: string, index: number): [number, number] | undefined {
  const m = /"positions"\s*:\s*\[/.exec(text);
  let i = m ? m.index + m[0].length : text.indexOf("[") + 1;
  if (i <= 0) return undefined;
  let n = -1;
  let depth = 0;
  let start = 0;
  let inString = false;
  for (; i < text.length; i++) {
    const c = text[i];
    if (inString) {
      if (c === "\\") i++;
      else if (c === '"') inString = false;
      continue;
    }
    if (c === '"') inString = true;
    else if (c === "{" || c === "[") {
      if (depth === 0 && c === "{" && ++n === index) start = i;
      depth++;
    } else if (c === "}" || c === "]") {
      if (depth === 0) return undefined; // end of the positions array
      depth--;
      if (depth === 0 && n === index) return [start, i + 1];
    }
  }
  return undefined;
}
