#!/usr/bin/env bun
// List every distinct subject already used for one election, with how many orgs use it, so
// new bundles can reuse the exact title + jurisdiction and collate with existing slates.
// Tab-separated: org count, kind, jurisdiction, title, orgs. Optional filter is a
// case-insensitive substring matched against title and jurisdiction.
//
//   bun scripts/list-subjects.ts 2026-11-03 [filter]

import { Glob } from "bun";
const election = process.argv[2];
if (!election) throw new Error("usage: list-subjects.ts <election> [filter]");
const filter = process.argv[3]?.toLowerCase();
const subjects = new Map<
  string,
  { kind: string; jurisdiction: string; title: string; orgs: Set<string> }
>();
for await (const file of new Glob(`orgs/*/${election}/positions.json`).scan(".")) {
  const org = file.split(/[\\/]/)[1];
  const { positions } = await Bun.file(file).json();
  for (const { subject } of positions) {
    const key = `${subject.kind}\t${subject.jurisdiction}\t${subject.title}`;
    const entry = subjects.get(key) ?? { ...subject, orgs: new Set<string>() };
    entry.orgs.add(org);
    subjects.set(key, entry);
  }
}
for (const [key, { orgs }] of [...subjects].sort(([a], [b]) => a.localeCompare(b))) {
  if (filter && !key.toLowerCase().includes(filter)) continue;
  console.log(`${orgs.size}\t${key}\t${[...orgs].sort().join(",")}`);
}
