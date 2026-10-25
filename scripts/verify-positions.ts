#!/usr/bin/env bun
// Schema-validate every orgs/<slug>/<election>/positions.json against the
// OpenSlate SlatePayload schema, then check each against the election authorities'
// ballot listings (scripts/ballot.ts): races must be on the ballot, and each choice
// must be a listed one, spelled as the ballot spells it and carrying its choice_id,
// or marked write_in. A listing's contests must also say who votes on them when only part of
// their jurisdiction does (`subject.district`, scripts/lib/districts.ts). PR-time and pre-sign
// check — no signing involved.

import { existsSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { slatePayloadSchema } from "../.openslate/packages/core/src/index";
import { type Bundle, ballotFrom, checkBundle, describe, describeWarning } from "./ballot";
import { districtFor } from "./lib/districts";

const ROOT = process.cwd();
const ORGS_DIR = join(ROOT, "orgs");

if (!existsSync(join(ROOT, ".openslate/packages/core/src/index.ts"))) {
  console.error(".openslate/ not found. Run: bun scripts/fetch-openslate.ts");
  process.exit(2);
}

/**
 * Sorted, as `loadBundles` sorts: when several listings name one race (a regional measure), the
 * first one read gives its choice_ids, so the order can't be the filesystem's.
 */
function listDirs(p: string): string[] {
  if (!existsSync(p)) return [];
  const names = readdirSync(p).sort((a, b) => a.localeCompare(b));
  return names.filter((n) => {
    try {
      return statSync(join(p, n)).isDirectory();
    } catch {
      return false;
    }
  });
}

interface Failure {
  path: string;
  errors: string[];
}

let ok = 0;
const failures: Failure[] = [];
const valid: { path: string; bundle: Bundle }[] = [];

for (const slug of listDirs(ORGS_DIR)) {
  for (const election of listDirs(join(ORGS_DIR, slug))) {
    const inputPath = join(ORGS_DIR, slug, election, "positions.json");
    if (!existsSync(inputPath)) continue;
    const rel = relative(ROOT, inputPath).replaceAll("\\", "/");

    let raw: unknown;
    try {
      raw = JSON.parse(await Bun.file(inputPath).text());
    } catch (err) {
      failures.push({
        path: rel,
        errors: [`JSON parse error: ${err instanceof Error ? err.message : String(err)}`],
      });
      continue;
    }

    let positions: unknown = [];
    let endorsedBy: unknown;
    let attribution: unknown;
    let context: unknown;
    if (Array.isArray(raw)) {
      positions = raw;
    } else if (raw && typeof raw === "object") {
      const obj = raw as Record<string, unknown>;
      positions = obj.positions ?? [];
      endorsedBy = obj.endorsed_by;
      attribution = obj.attribution;
      context = obj.context;
    }

    const placeholderPayload = {
      v: 1 as const,
      issuer: {
        key: "ed25519:11111111111111111111111111111111",
        name: "verify-positions placeholder",
        kind: "researcher",
      },
      issued_at: "2026-01-01T00:00:00Z",
      positions,
      ...(endorsedBy !== undefined ? { endorsed_by: endorsedBy } : {}),
      ...(attribution !== undefined ? { attribution } : {}),
      ...(context !== undefined ? { context } : {}),
    };

    const result = slatePayloadSchema.safeParse(placeholderPayload);
    if (result.success) {
      ok++;
      valid.push({ path: rel, bundle: result.data });
      const attrNote = result.data.attribution
        ? `, attribution: ${result.data.attribution.of.name} (${result.data.attribution.mode})`
        : "";
      console.log(`OK    ${rel}  (${result.data.positions.length} positions${attrNote})`);
    } else {
      failures.push({
        path: rel,
        errors: result.error.issues.map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`),
      });
    }
  }
}

const ballot = ballotFrom(valid.map((v) => v.bundle));
let checked = 0;
let unchecked = 0;
const kinds = new Set<string>();
const warnings: string[] = [];
for (const { path, bundle } of valid) {
  const check = checkBundle(bundle, ballot);
  checked += check.checked;
  unchecked += check.unchecked;
  for (const w of check.warnings) warnings.push(`${path} ${describeWarning(w)}`);
  if (!check.problems.length) continue;
  ok--;
  for (const p of check.problems) kinds.add(p.kind);
  failures.push({ path, errors: check.problems.map(describe) });
}

// Listings: each contest's district, as scripts/lib/districts.ts derives it.
let districtsWrong = false;
for (const { path, bundle } of valid) {
  const scope = bundle.context?.jurisdiction;
  if (bundle.attribution?.of?.kind !== "election-authority" || !scope) continue;
  const errors = new Set<string>();
  for (const { subject } of bundle.positions) {
    const want = districtFor(subject, scope).district;
    if (subject.district === want) continue;
    const have = subject.district ? `"${subject.district}"` : "missing";
    errors.add(`"${subject.title}": district ${have}, want ${want ? `"${want}"` : "none"}`);
  }
  if (!errors.size) continue;
  districtsWrong = true;
  const failed = failures.find((f) => f.path === path);
  if (failed) failed.errors.push(...errors);
  else {
    ok--;
    failures.push({ path, errors: [...errors] });
  }
}

console.log(
  `\nBallot: ${checked} positions checked against an election authority's list, ${unchecked} in jurisdictions no authority covers yet`,
);
if (warnings.length) console.log(`\nWarnings:\n  ${warnings.join("\n  ")}`);
if (kinds.has("listing-id"))
  console.log(
    "Give a listing's choices ids with: bun scripts/assign-choice-ids.ts <election> --apply",
  );
if (districtsWrong)
  console.log("Set listings' districts with: bun scripts/assign-districts.ts <election> --apply");
if (kinds.has("fix") || kinds.has("choice"))
  console.log("Fix names and ids with: bun scripts/normalize-choices.ts <election> --apply");

console.log(`\n${ok} OK, ${failures.length} failed`);

if (failures.length) {
  console.log("\nFailures:");
  for (const f of failures) {
    console.log(`\n  ${f.path}`);
    for (const e of f.errors) console.log(`    - ${e}`);
  }
  process.exit(1);
}
