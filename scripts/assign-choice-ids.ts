#!/usr/bin/env bun
// Give every choice in an election authority's ballot listing a `choice_id` (SPEC §3.11, §8.2),
// so endorsements can name candidates by id rather than by spelling.
//
// An id is minted once and never changes: `<org slug>:<election>/<race slug>/<choice slug>`,
// e.g. `ca-secretary-of-state:2026-11-03/california-secretary-of-state/donald-p-don-wagner`.
// A listing regenerated from its source loses its ids; this carries them over from the last
// committed version (same race, and the same name, or the same person by core's rules), so a
// corrected spelling keeps the id it had. Only choices without one get a new id. Dry run by default.
//
//   bun scripts/assign-choice-ids.ts [<election>] [--apply]

import { $ } from "bun";
import { matchBallotName } from "../.openslate/packages/core/src/index";
import { type Bundle, isAuthority, loadBundles } from "./ballot";
import { editPositions, trackedBundles } from "./position-edit";

const election = process.argv.slice(2).find((a) => !a.startsWith("--")) ?? "*";
const apply = process.argv.includes("--apply");

export function slug(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const raceOf = (p: Bundle["positions"][number]) =>
  `${p.subject.jurisdiction ?? ""}|${p.subject.title}`;

/** The listing as last committed, if it was. */
async function committed(path: string): Promise<Bundle | undefined> {
  const shown = await $`git show HEAD:${path}`.quiet().nothrow();
  if (shown.exitCode !== 0) return undefined;
  try {
    return JSON.parse(shown.stdout.toString()) as Bundle;
  } catch {
    return undefined;
  }
}

const tracked = apply ? await trackedBundles() : new Set<string>();
let minted = 0;
let carried = 0;
for (const { path, bundle } of await loadBundles(".", election)) {
  if (!isAuthority(bundle)) continue;
  const [, org = "", dir = ""] = path.split("/");
  const used = new Set(bundle.positions.flatMap((p) => (p.choice_id ? [p.choice_id] : [])));

  // Ids from the committed version, by race: name → id.
  const before = new Map<string, Map<string, string>>();
  for (const p of (await committed(path))?.positions ?? []) {
    if (!p.choice || !p.choice_id) continue;
    const names = before.get(raceOf(p)) ?? new Map<string, string>();
    names.set(p.choice, p.choice_id);
    before.set(raceOf(p), names);
  }

  const edits: Array<{ index: number; choiceId: string }> = [];
  bundle.positions.forEach((p, index) => {
    if (p.choice === undefined || p.choice_id) return;
    const old = before.get(raceOf(p));
    const match = old && matchBallotName(p.choice, old.keys());
    const kept = match?.sure ? old?.get(match.name) : undefined;
    if (kept && !used.has(kept)) {
      used.add(kept);
      edits.push({ index, choiceId: kept });
      carried++;
      return;
    }
    const electionPart = p.subject.election ?? bundle.context?.election ?? dir;
    const base = `${org}:${electionPart}/${slug(p.subject.title)}/${slug(p.choice)}`;
    let id = base;
    for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
    used.add(id);
    edits.push({ index, choiceId: id });
    minted++;
  });
  if (!edits.length) continue;
  console.log(`${path}: ${edits.length} ids`);
  if (!apply) continue;
  if (!tracked.has(path)) {
    console.log(`skipped ${path}: not tracked by git (someone's work in progress)`);
    continue;
  }
  const { text, failed } = editPositions(await Bun.file(path).text(), edits);
  for (const index of failed) console.error(`FAILED ${path} positions[${index}]`);
  await Bun.write(path, text);
}
console.log(`\n${minted} minted, ${carried} carried over${apply ? "" : " (dry run)"}`);
