#!/usr/bin/env bun
// Move saved news pages out of evidence/ into the private store, leaving each one's URL, size and
// hash in evidence/withheld.json. The rule is in scripts/lib/withheld-evidence.ts. Lists what it
// would move unless given --apply. Run it after any scrape: verify-positions fails on what it finds.
//
//   bun scripts/withhold-evidence.ts [--skip <slug>]...
//   bun scripts/withhold-evidence.ts --apply --private <openslate-source-captures-private> [--skip <slug>]...

import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import {
  findWithheld,
  lfBytes,
  MANIFEST,
  MANIFEST_NOTE,
  readManifest,
  sha256,
  sourceUrl,
  type WithheldFile,
} from "./lib/withheld-evidence";

const args = process.argv.slice(2);
const apply = args.includes("--apply");
const privateAt = args.indexOf("--private");
const privateRoot = privateAt >= 0 ? resolve(args[privateAt + 1] as string) : undefined;
const skip = new Set(args.flatMap((arg, i) => (args[i - 1] === "--skip" ? [arg] : [])));
if (apply && !privateRoot) throw new Error("--apply needs --private <dir>");

const found = findWithheld(join(process.cwd(), "orgs")).filter(
  ({ id }) => !skip.has(id.split("/")[0] as string),
);

let moved = 0;
for (const { id, dir, files } of found) {
  console.log(`${id}: ${files.join(", ")}`);
  moved += files.length;
  if (!apply) continue;

  const entries: WithheldFile[] = files.map((path) => {
    const source = join(dir, path);
    const bytes = lfBytes(readFileSync(source));
    const url = sourceUrl(bytes.toString("utf8"));
    const target = join(privateRoot as string, "evidence", id, path);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, bytes);
    return { path, ...(url ? { url } : {}), bytes: bytes.length, sha256: sha256(bytes) };
  });

  const kept = (readManifest(dir)?.files ?? []).filter(
    (old) => !entries.some(({ path }) => path === old.path),
  );
  const list = [...kept, ...entries].sort((a, b) => a.path.localeCompare(b.path));
  writeFileSync(
    join(dir, MANIFEST),
    `${JSON.stringify({ note: MANIFEST_NOTE, files: list }, null, 2)}\n`,
  );

  // The manifest and the private copy exist before anything is removed.
  for (const path of files) {
    if (
      sha256(lfBytes(readFileSync(join(privateRoot as string, "evidence", id, path)))) !==
      list.find((entry) => entry.path === path)?.sha256
    ) {
      throw new Error(`private copy of ${id}/${path} doesn't match`);
    }
    rmSync(join(dir, path));
  }
}
console.log(`${moved} file(s) in ${found.length} bundle(s) ${apply ? "moved" : "would move"}`);
