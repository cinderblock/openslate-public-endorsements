#!/usr/bin/env bun
// Run after `openslate sign --batch --force`: put back the published token of every slate
// whose content hasn't changed since the last publish. Signing stamps a fresh `issued_at`
// on every slate, so without this each publish would look like a new version of all of
// them, and the web app (which updates an imported slate when its catalog entry is newer)
// would download every slate again. With it, `issued_at` only moves when a slate does.
//
//   bun scripts/keep-unchanged.ts [published catalog URL]
//
// Can't reach the published catalog (first publish, an outage): keeps the fresh
// signatures and says so. That costs downloads, not correctness.

import { existsSync } from "node:fs";
import { join } from "node:path";
import { canonicalize, verifySlate } from "../.openslate/packages/core/src/index";

const PUBLISHED = "https://cinderblock.github.io/openslate-public-endorsements/index.json";

/**
 * The token to publish: `published` when it's a valid slate from the same signer saying
 * exactly what `fresh` says apart from `issued_at`, otherwise `fresh`.
 */
export function keptToken(fresh: string, published: string | undefined): string {
  if (!published || published === fresh) return fresh;
  const now = verifySlate(fresh);
  const before = verifySlate(published);
  if (!now.valid || !now.payload || !before.valid || !before.payload) return fresh;
  if (now.issuerKey !== before.issuerKey) return fresh;
  return content(now.payload) === content(before.payload) ? published : fresh;
}

function content(payload: object): string {
  const { issued_at: _, ...rest } = payload as { issued_at?: string };
  return canonicalize(rest);
}

interface Entry {
  path: string;
  issued_at: string;
}

async function publishedTokens(catalogUrl: string): Promise<Map<string, string>> {
  const index = (await (await fetch(catalogUrl)).json()) as { bundle?: { path: string } };
  if (!index.bundle) throw new Error("the published catalog has no bundle");
  const response = await fetch(new URL(index.bundle.path, catalogUrl));
  if (!response.ok) throw new Error(`bundle fetch failed: ${response.status}`);
  const bundle = (await response.json()) as { entries: (Entry & { token: string })[] };
  return new Map(bundle.entries.map((entry) => [entry.path, entry.token.trim()]));
}

if (import.meta.main) {
  const root = process.cwd();
  let published: Map<string, string>;
  try {
    published = await publishedTokens(process.argv[2] ?? PUBLISHED);
  } catch (err) {
    console.warn(
      `keep-unchanged: published catalog unavailable, keeping fresh signatures (${err})`,
    );
    process.exit(0);
  }
  // `sign --batch` lists every slate, with its `issued_at`, in ./index.json.
  const indexFile = join(root, "index.json");
  const index = JSON.parse(await Bun.file(indexFile).text()) as { entries: Entry[] };
  let kept = 0;
  let changed = 0;
  for (const entry of index.entries) {
    const file = join(root, entry.path);
    if (!existsSync(file)) continue;
    const text = await Bun.file(file).text();
    const fresh = text.trim();
    const before = published.get(entry.path);
    const token = keptToken(fresh, before);
    if (token !== before) {
      changed++;
      continue;
    }
    kept++;
    if (token === fresh) continue;
    await Bun.write(file, text.replace(fresh, token));
    const issuedAt = verifySlate(token).payload?.issued_at;
    if (issuedAt) entry.issued_at = issuedAt;
  }
  await Bun.write(indexFile, `${JSON.stringify(index, null, 2)}\n`);
  console.log(
    `keep-unchanged: ${kept} slate(s) unchanged since the last publish, ${changed} new or changed`,
  );
}
