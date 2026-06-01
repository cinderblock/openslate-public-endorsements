#!/usr/bin/env bun
// Verify every signed .slate produced by `openslate sign --batch`. Confirms the
// signature is valid AND that the issuer matches the project's published
// public key in keys/project-public.json. Runs in CI after signing, before
// the static site is built.

import { existsSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { verifySlate } from "../.openslate/packages/core/src/index";

const ROOT = process.cwd();
const ORGS_DIR = join(ROOT, "orgs");

if (!existsSync(join(ROOT, ".openslate/packages/core/src/index.ts"))) {
  console.error(".openslate/ not found. Run: bun scripts/fetch-openslate.ts");
  process.exit(2);
}

const projectKey = JSON.parse(await Bun.file(join(ROOT, "keys/project-public.json")).text()) as {
  publicKey: string;
};

function listDirs(p: string): string[] {
  if (!existsSync(p)) return [];
  return readdirSync(p).filter((n) => {
    try {
      return statSync(join(p, n)).isDirectory();
    } catch {
      return false;
    }
  });
}

let ok = 0;
let bad = 0;

for (const slug of listDirs(ORGS_DIR)) {
  for (const election of listDirs(join(ORGS_DIR, slug))) {
    const slatePath = join(ORGS_DIR, slug, election, "signed.slate");
    if (!existsSync(slatePath)) continue;
    const rel = relative(ROOT, slatePath).replaceAll("\\", "/");

    const token = (await Bun.file(slatePath).text()).trim();
    const result = verifySlate(token);

    if (!result.valid) {
      bad++;
      console.error(`FAIL  ${rel}`);
      for (const e of result.errors) console.error(`      ${e}`);
      continue;
    }

    if (result.issuerKey !== projectKey.publicKey) {
      bad++;
      console.error(
        `FAIL  ${rel} — wrong issuer ${result.issuerKey}, expected ${projectKey.publicKey}`,
      );
      continue;
    }

    ok++;
    const attr = result.payload?.attribution;
    const note = attr ? ` (secondhand for ${attr.of.name})` : "";
    console.log(`OK    ${rel}${note}`);
  }
}

console.log(`\n${ok} verified, ${bad} failed`);
if (bad) process.exit(1);
