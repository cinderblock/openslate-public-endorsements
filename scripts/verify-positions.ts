#!/usr/bin/env bun
// Schema-validate every orgs/<slug>/<election>/positions.json against the
// OpenSlate SlatePayload schema. PR-time check — no signing involved.

import { existsSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { slatePayloadSchema } from "../.openslate/packages/core/src/index";

const ROOT = process.cwd();
const ORGS_DIR = join(ROOT, "orgs");

if (!existsSync(join(ROOT, ".openslate/packages/core/src/index.ts"))) {
  console.error(".openslate/ not found. Run: bun scripts/fetch-openslate.ts");
  process.exit(2);
}

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

interface Failure {
  path: string;
  errors: string[];
}

let ok = 0;
const failures: Failure[] = [];

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

console.log(`\n${ok} OK, ${failures.length} failed`);

if (failures.length) {
  console.log("\nFailures:");
  for (const f of failures) {
    console.log(`\n  ${f.path}`);
    for (const e of f.errors) console.log(`    - ${e}`);
  }
  process.exit(1);
}
