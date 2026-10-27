#!/usr/bin/env bun
// Set `subject.voted_in` on every regional contest in every bundle for an election, positions
// and articles alike: the jurisdictions that vote on it (scripts/lib/regions.ts). Run after
// rebuilding a listing (scripts/*-ballot.ts) or adding a bundle that names a regional contest;
// verify-positions fails when one is missing or wrong. Bundles are edited as text, so their
// formatting survives (scripts/position-edit.ts). Dry run by default.
//
//   bun scripts/assign-voted-in.ts 2026-11-03 [--apply]

import { existsSync, readdirSync } from "node:fs";
import { votedInFor } from "./lib/regions";
import { positionSpan, setVotedInText, trackedBundles } from "./position-edit";

const election = process.argv[2] ?? "";
if (!election) throw new Error("usage: assign-voted-in.ts <election> [--apply]");
const apply = process.argv.includes("--apply");

interface Subject {
  title: string;
  jurisdiction?: string;
  election?: string;
  voted_in?: string[];
}
interface Bundle {
  positions: { subject: Subject }[];
  articles?: { subject: Subject }[];
}

const tracked = await trackedBundles();
let total = 0;
for (const org of readdirSync("orgs").sort()) {
  const file = `orgs/${org}/${election}/positions.json`;
  if (!existsSync(file)) continue;
  let text = await Bun.file(file).text();
  const bundle = JSON.parse(text) as Bundle;
  let changed = 0;
  for (const array of ["positions", "articles"] as const) {
    for (const [index, { subject }] of (bundle[array] ?? []).entries()) {
      const want = votedInFor(subject, election);
      if (JSON.stringify(subject.voted_in) === JSON.stringify(want)) continue;
      const span = positionSpan(text, index, array);
      const edited = span && setVotedInText(text.slice(span[0], span[1]), want);
      if (!span || edited === undefined) throw new Error(`${file}: can't edit ${array}[${index}]`);
      text = text.slice(0, span[0]) + edited + text.slice(span[1]);
      // Bun.deepEquals (below) takes an undefined property as absent.
      subject.voted_in = want;
      changed++;
    }
  }
  if (!changed) continue;
  total += changed;
  const untracked = !tracked.has(file);
  console.log(`${org}: ${changed} subjects change${untracked ? " (untracked: left alone)" : ""}`);
  if (apply && !untracked) {
    // Edited as text, so it must still parse, and say what it said plus voted_in.
    if (!Bun.deepEquals(JSON.parse(text), bundle)) throw new Error(`${file}: edit went wrong`);
    await Bun.write(file, text);
  }
}
console.log(`${total} subjects ${apply ? "changed" : "would change"}`);
if (!apply) console.log("dry run; pass --apply to write positions.json");
