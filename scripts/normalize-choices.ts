#!/usr/bin/env bun
// Canonicalize candidate names within each race across every org's bundle for one election,
// so cross-org collation groups the same person together.
//
// On a race an election authority lists (scripts/ballot.ts), the listing is canonical: a
// choice that is a listed one (by id, by name, or as the same person by OpenSlate core's
// rules) gets the listing's spelling, its `choice_id`, and its `write_in`. A choice that only
// resembles a listed name (a typo, an unusual short form) is listed as a suggestion, and
// rewritten only with --suggested once a human has checked each against its source.
//
// On races no authority covers, variants of the same person are clustered across orgs and
// rewritten to the spelling most orgs use, then the accented one, then the shortest.
// Dry run by default.
//
//   bun scripts/normalize-choices.ts 2026-11-03 [--apply [--suggested]]

import { samePerson } from "../.openslate/packages/core/src/index";
import { ballotFrom, checkBundle, isAuthority, loadBundles } from "./ballot";
import { type ChoiceEdit, editPositions, trackedBundles } from "./position-edit";

const root = ".";
const election = process.argv[2];
if (!election) throw new Error("usage: normalize-choices.ts <election> [--apply [--suggested]]");
const apply = process.argv.includes("--apply");
const suggested = process.argv.includes("--suggested");

const bundles = await loadBundles(root, election);
const ballot = ballotFrom(bundles.map((b) => b.bundle));

type Change = { file: string; index: number; title: string; from: string; edit: ChoiceEdit };
const changes: Change[] = [];
const suggestions: Change[] = [];
const unresolved: string[] = [];
const toListed = (c: { name: string; id?: string; writeIn: boolean }): ChoiceEdit => ({
  choice: c.name,
  choiceId: c.id ?? null,
  writeIn: c.writeIn,
});

// 1. Races a listing lists: snap to the listing's spelling and id.
for (const { path, bundle } of bundles) {
  if (isAuthority(bundle)) continue;
  for (const p of checkBundle(bundle, ballot).problems) {
    if (p.kind === "fix") {
      changes.push({
        file: path,
        index: p.index,
        title: p.title,
        from: p.choice,
        edit: toListed(p.listed),
      });
    } else if ((p.kind === "race" || p.kind === "choice") && p.moveTo) {
      suggestions.push({
        file: path,
        index: p.index,
        title: p.title,
        from: bundle.positions[p.index]?.choice ?? "",
        edit: { title: p.moveTo.title, ...toListed(p.moveTo.listed) },
      });
    } else if (p.kind === "race") {
      unresolved.push(`${path} positions[${p.index}]: race "${p.title}" isn't on the ballot`);
    } else if (p.kind === "choice" && p.suggestion) {
      suggestions.push({
        file: path,
        index: p.index,
        title: p.title,
        from: p.choice,
        edit: toListed(p.suggestion),
      });
    } else if (p.kind === "choice") {
      unresolved.push(`${path} positions[${p.index}]: "${p.choice}" in "${p.title}"`);
    }
  }
}

// 2. Races no listing covers: cluster across orgs.
type Pos = { file: string; index: number; org: string; title: string; choice: string };
const uncovered: Pos[] = [];
for (const { path, bundle } of bundles) {
  if (isAuthority(bundle)) continue;
  const org = path.split("/")[1] as string;
  bundle.positions.forEach((p, index) => {
    const scope = `${p.subject.election ?? bundle.context?.election ?? ""}|${p.subject.jurisdiction ?? bundle.context?.jurisdiction ?? ""}`;
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
        changes.push({
          file: p.file,
          index: p.index,
          title,
          from: p.choice,
          edit: { choice: canon },
        });
  }
}

const show = (ch: Change) =>
  `${ch.file} [${ch.index}] ${ch.title}: "${ch.from}" → ${ch.edit.title ? `"${ch.edit.title}": ` : ""}"${ch.edit.choice}"${ch.edit.choiceId ? ` (${ch.edit.choiceId})` : ""}`;
const respelled = changes.filter((ch) => ch.edit.choice !== ch.from);
const idOnly = changes.length - respelled.length;
if (respelled.length)
  console.log(`\nSame person, rewritten with --apply:\n  ${respelled.map(show).join("\n  ")}`);
if (idOnly) console.log(`\n${idOnly} listed choices get the listing's choice_id with --apply`);
if (suggestions.length)
  console.log(
    `\nLooks like a ballot name; check each against its source, then add --suggested:\n  ${suggestions.map(show).join("\n  ")}`,
  );
if (unresolved.length)
  console.log(`\nNo ballot name fits; fix by hand:\n  ${unresolved.join("\n  ")}`);
const todo = apply ? [...changes, ...(suggested ? suggestions : [])] : [];
console.log(
  `\n${respelled.length} same-person respellings, ${idOnly} id-only, ${suggestions.length} suggestions, ${unresolved.length} unresolved${apply ? `; applied ${todo.length}` : " (dry run)"}`,
);

const tracked = apply ? await trackedBundles() : new Set<string>();
for (const [file, edits] of Map.groupBy(todo, (ch) => ch.file)) {
  if (!tracked.has(file)) {
    console.log(`skipped ${file}: not tracked by git (someone's work in progress)`);
    continue;
  }
  const path = `${root}/${file}`;
  const { text, failed } = editPositions(
    await Bun.file(path).text(),
    edits.map((ch) => ({ index: ch.index, ...ch.edit })),
  );
  for (const index of failed) console.error(`FAILED ${file} positions[${index}]`);
  await Bun.write(path, text);
}
