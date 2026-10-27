#!/usr/bin/env bun
// Schema-validate every orgs/<slug>/<election>/positions.json against what `openslate sign`
// takes (core's closed `signInputSchema`, so `adopts`, `labels` and a misspelt key are checked
// too), then check each against the election authorities' ballot listings (scripts/ballot.ts):
// races must be on the ballot, and each choice must be a listed one, spelled as the ballot spells it and carrying its choice_id,
// or marked write_in. Articles (SPEC §3.15) attach to ballot items the same way, so their races
// and choices are checked like positions'. A listing's contests must also say who votes on them when only part of
// their jurisdiction does (`subject.district`, scripts/lib/districts.ts). No county contest may
// sit under a county's bare name, which is a city's or no one's (scripts/lib/localities.ts). A
// regional contest must say which jurisdictions vote on it (`subject.voted_in`,
// scripts/lib/regions.ts), in every bundle.
// PR-time and pre-sign check — no signing involved.

import { existsSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { type Article, signInputSchema } from "../.openslate/packages/core/src/index";
import { type Bundle, ballotFrom, checkBundle, describe, describeWarning } from "./ballot";
import { districtFor } from "./lib/districts";
import { localityProblem } from "./lib/localities";
import { votedInProblem } from "./lib/regions";

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
const valid: { path: string; bundle: Bundle; articles: Article[] }[] = [];

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

    const result = signInputSchema.safeParse(raw);
    if (result.success) {
      ok++;
      valid.push({ path: rel, bundle: result.data, articles: result.data.articles ?? [] });
      const attrNote = result.data.attribution
        ? `, attribution: ${result.data.attribution.of.name} (${result.data.attribution.mode})`
        : "";
      const articleNote = result.data.articles?.length
        ? `, ${result.data.articles.length} articles`
        : "";
      console.log(
        `OK    ${rel}  (${result.data.positions.length} positions${articleNote}${attrNote})`,
      );
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

// Articles: on the ballot like positions, or the app can't put them with the race they're about.
let articlesChecked = 0;
for (const { path, bundle, articles } of valid) {
  if (!articles.length) continue;
  const asPositions: Bundle = {
    ...bundle,
    positions: articles.map((a) => ({
      subject: a.subject,
      stance: "neutral" as const,
      ...(a.choice !== undefined ? { choice: a.choice } : {}),
      ...(a.choice_id !== undefined ? { choice_id: a.choice_id } : {}),
    })),
  };
  const check = checkBundle(asPositions, ballot);
  articlesChecked += check.checked;
  for (const w of check.warnings)
    warnings.push(`${path} ${describeWarning(w).replace(/^positions\[/, "articles[")}`);
  if (!check.problems.length) continue;
  for (const p of check.problems) kinds.add(p.kind);
  const errors = check.problems.map((p) => describe(p).replace(/^positions\[/, "articles["));
  const failed = failures.find((f) => f.path === path);
  if (failed) failed.errors.push(...errors);
  else {
    ok--;
    failures.push({ path, errors });
  }
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

// Every bundle: county contests under the county's own path.
let localitiesWrong = false;
for (const { path, bundle } of valid) {
  const errors = new Set<string>();
  for (const { subject } of bundle.positions) {
    const problem = localityProblem(subject);
    if (problem) errors.add(problem);
  }
  if (!errors.size) continue;
  localitiesWrong = true;
  const failed = failures.find((f) => f.path === path);
  if (failed) failed.errors.push(...errors);
  else {
    ok--;
    failures.push({ path, errors: [...errors] });
  }
}

// Every bundle: regional contests carry the jurisdictions that vote on them.
let votedInWrong = false;
for (const { path, bundle, articles } of valid) {
  const election = path.split("/")[2] ?? "";
  const errors = new Set<string>();
  for (const { subject } of [...bundle.positions, ...articles]) {
    const problem = votedInProblem(subject, election);
    if (problem) errors.add(problem);
  }
  if (!errors.size) continue;
  votedInWrong = true;
  const failed = failures.find((f) => f.path === path);
  if (failed) failed.errors.push(...errors);
  else {
    ok--;
    failures.push({ path, errors: [...errors] });
  }
}

console.log(
  `\nBallot: ${checked} positions and ${articlesChecked} articles checked against an election authority's list, ${unchecked} positions in jurisdictions no authority covers yet`,
);
if (warnings.length) console.log(`\nWarnings:\n  ${warnings.join("\n  ")}`);
if (kinds.has("listing-id"))
  console.log(
    "Give a listing's choices ids with: bun scripts/assign-choice-ids.ts <election> --apply",
  );
if (districtsWrong)
  console.log("Set listings' districts with: bun scripts/assign-districts.ts <election> --apply");
if (localitiesWrong)
  console.log("Re-file county contests with: bun scripts/refile-localities.ts --apply");
if (votedInWrong)
  console.log(
    "Set regional contests' voted_in with: bun scripts/assign-voted-in.ts <election> --apply",
  );
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
