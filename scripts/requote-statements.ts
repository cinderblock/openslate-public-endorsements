#!/usr/bin/env bun
// Re-quote statements that cut their source short (scripts/lib/quote-bounds.ts): widen each cut
// quote to the whole passage it came from, verbatim from the bundle's evidence, or to whole
// sentences with "…" where a passage runs past LONGEST_QUOTE. Edits positions.json as text, so its
// formatting survives. Anything it can't widen (a quote with its own ellipses that's still cut) is
// listed for a person to fix.
//
//   bun scripts/requote-statements.ts [--apply] [--private <openslate-source-captures-private>] [<slug>...]

import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { evidenceText } from "./lib/evidence-text";
import { AmbiguousQuote, indexed, quoteBounds, widenStatement } from "./lib/quote-bounds";
import { positionSpan } from "./position-edit";

const args = process.argv.slice(2);
const apply = args.includes("--apply");
const privAt = args.indexOf("--private");
const privateDir =
  privAt >= 0 ? args[privAt + 1] : process.env.OPENSLATE_CAPTURES_PRIVATE_DIR || undefined;
const only = args.filter((a, i) => !a.startsWith("--") && i !== privAt + 1);

const ORGS = join(process.cwd(), "orgs");
const STATEMENT = /("statement"\s*:\s*)("(?:[^"\\]|\\.)*")/;

let widened = 0;
let files = 0;
const leftover: string[] = [];

for (const slug of readdirSync(ORGS).sort()) {
  if (slug.startsWith(".") || (only.length && !only.includes(slug))) continue;
  const orgDir = join(ORGS, slug);
  for (const election of readdirSync(orgDir).sort()) {
    const dir = join(orgDir, election);
    const path = join(dir, "positions.json");
    if (!existsSync(path)) continue;
    let text = readFileSync(path, "utf8");
    const bundle = JSON.parse(text) as { positions: { statement?: string }[] };
    const source = indexed(evidenceText(dir, slug, election, privateDir));
    let changed = 0;
    // Back to front, so earlier positions' spans still hold after an edit.
    for (let i = bundle.positions.length - 1; i >= 0; i--) {
      const statement = bundle.positions[i]?.statement;
      if (!statement || quoteBounds(statement, source).kind !== "cut") continue;
      let wide: string | null;
      try {
        wide = widenStatement(statement, source);
      } catch (err) {
        if (!(err instanceof AmbiguousQuote)) throw err;
        leftover.push(`${slug}/${election} positions[${i}] (in several passages): ${statement}`);
        continue;
      }
      const still = wide === null ? "cut" : quoteBounds(wide, source).kind;
      if (wide === null || still === "cut") {
        leftover.push(`${slug}/${election} positions[${i}]: ${statement}`);
        continue;
      }
      const span = positionSpan(text, i);
      if (!span) throw new Error(`${slug}/${election}: positions[${i}] not found in the file`);
      const body = text.slice(span[0], span[1]);
      const next = body.replace(STATEMENT, (_, key: string) => key + JSON.stringify(wide));
      if (!apply) console.log(`${slug}/${election} [${i}]\n  - ${statement}\n  + ${wide}\n`);
      text = text.slice(0, span[0]) + next + text.slice(span[1]);
      changed++;
    }
    if (!changed) continue;
    widened += changed;
    files++;
    if (apply) writeFileSync(path, text);
  }
}

console.log(
  `${apply ? "Widened" : "Would widen"} ${widened} statements in ${files} slates.${
    leftover.length ? ` ${leftover.length} need a person:` : ""
  }`,
);
for (const line of leftover) console.log(`  ${line}`);
