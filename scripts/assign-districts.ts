#!/usr/bin/env bun
// Set `subject.district` on every election authority's ballot listing for an election: who votes
// on each contest, when only part of its jurisdiction does (a trustee area, a supervisorial
// district, a water district; scripts/lib/districts.ts). Run after rebuilding a listing
// (scripts/*-ballot.ts); verify-positions fails when a listing's districts don't match. Dry run
// by default.
//
//   bun scripts/assign-districts.ts 2026-11-03 [--apply]

import { existsSync, readdirSync } from "node:fs";
import { districtFor } from "./lib/districts";

const election = process.argv[2] ?? "";
if (!election) throw new Error("usage: assign-districts.ts <election> [--apply]");
const apply = process.argv.includes("--apply");

interface Subject {
  title: string;
  kind?: string;
  jurisdiction?: string;
  district?: string;
  [field: string]: unknown;
}
interface Listing {
  context?: { jurisdiction?: string };
  attribution?: { of?: { kind?: string } };
  positions: { subject: Subject }[];
}

/** The subject with `district` set (after `jurisdiction`, for a readable diff) or removed. */
function withDistrict(subject: Subject, district: string | undefined): Subject {
  const out: Subject = { title: subject.title };
  for (const [key, value] of Object.entries(subject)) {
    if (key === "district") continue;
    out[key] = value;
    if (key === "jurisdiction" && district) out.district = district;
  }
  if (district && !out.district) out.district = district;
  return out;
}

const warnings = new Set<string>();
for (const org of readdirSync("orgs").sort()) {
  const file = `orgs/${org}/${election}/positions.json`;
  if (!existsSync(file)) continue;
  const listing = (await Bun.file(file).json()) as Listing;
  if (listing.attribution?.of?.kind !== "election-authority") continue;
  const scope = listing.context?.jurisdiction;
  if (!scope) throw new Error(`${file}: no context.jurisdiction`);

  let changed = 0;
  const contests = new Map<string, string | undefined>();
  for (const position of listing.positions) {
    const result = districtFor(position.subject, scope);
    if (result.warning) warnings.add(`${org}: ${result.warning}`);
    contests.set(`${position.subject.title}|${position.subject.jurisdiction}`, result.district);
    if (position.subject.district === result.district) continue;
    position.subject = withDistrict(position.subject, result.district);
    changed++;
  }
  const placed = [...contests.values()].filter(Boolean).length;
  console.log(
    `${org}: ${placed} of ${contests.size} contests have a district; ${changed} positions change`,
  );
  if (apply && changed > 0) await Bun.write(file, `${JSON.stringify(listing, null, 2)}\n`);
}
for (const warning of warnings) console.warn(`warning: ${warning}`);
if (!apply) console.log("dry run; pass --apply to write positions.json");
