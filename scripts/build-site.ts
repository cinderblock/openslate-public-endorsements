#!/usr/bin/env bun
// Assemble dist/ for GitHub Pages from the source tree plus the artifacts
// produced by `openslate sign --batch` (signed.slate + orgs/index.json).

import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const DIST = join(ROOT, "dist");
// `openslate sign --batch <dir>` writes its catalog to <dir>/index.json.
// Since we run the batch from the repo root, the catalog lands at ./index.json.
const BATCH_INDEX = join(ROOT, "index.json");

if (existsSync(DIST)) rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });

cpSync(join(ROOT, "orgs"), join(DIST, "orgs"), { recursive: true });
cpSync(join(ROOT, "keys"), join(DIST, "keys"), { recursive: true });
cpSync(join(ROOT, "well-known"), join(DIST, "well-known"), { recursive: true });

interface IndexEntry {
  slug: string;
  election: string;
  path: string;
  issuer: { key: string; name?: string; kind?: string };
  attribution?: {
    of: { name: string; uri?: string; kind?: string };
    mode: string;
    retrieved_at: string;
    sources?: string[];
  };
  positions: number;
  issued_at: string;
}

interface Catalog {
  version: number;
  generated_at: string;
  entries: IndexEntry[];
}

let catalog: Catalog = { version: 1, generated_at: new Date().toISOString(), entries: [] };
if (existsSync(BATCH_INDEX)) {
  catalog = JSON.parse(await Bun.file(BATCH_INDEX).text()) as Catalog;
  cpSync(BATCH_INDEX, join(DIST, "index.json"));
} else {
  await Bun.write(join(DIST, "index.json"), `${JSON.stringify(catalog, null, 2)}\n`);
}

const publicKey = JSON.parse(await Bun.file(join(ROOT, "keys/project-public.json")).text()) as {
  publicKey: string;
};

function escape(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

const rows = catalog.entries
  .map((e) => {
    const slateUrl = `orgs/${e.slug}/${e.election}/signed.slate`;
    const posUrl = `orgs/${e.slug}/${e.election}/positions.json`;
    const orgName = e.attribution?.of.name ?? e.slug;
    const orgLink = e.attribution?.of.uri
      ? `<a href="${escape(e.attribution.of.uri)}">${escape(orgName)}</a>`
      : escape(orgName);
    const attrCell = e.attribution
      ? `<code>${escape(e.attribution.mode)}</code> · retrieved ${escape(e.attribution.retrieved_at.slice(0, 10))}`
      : "&mdash;";
    return `      <tr>
        <td>${orgLink}</td>
        <td>${escape(e.election)}</td>
        <td>${e.positions}</td>
        <td>${attrCell}</td>
        <td><a href="${slateUrl}">slate</a> &middot; <a href="${posUrl}">positions.json</a></td>
      </tr>`;
  })
  .join("\n");

const tableBody =
  catalog.entries.length > 0
    ? rows
    : `      <tr><td colspan="5" class="meta">No slates published yet.</td></tr>`;

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>OpenSlate Public Endorsements</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    body { font: 16px/1.5 system-ui, -apple-system, sans-serif; max-width: 60rem; margin: 2rem auto; padding: 0 1rem; color: #222; }
    h1 { font-size: 1.5rem; margin-bottom: .25rem; }
    h2 { font-size: 1.1rem; margin-top: 2rem; }
    table { border-collapse: collapse; width: 100%; margin-top: 1rem; }
    th, td { text-align: left; padding: .5rem .75rem; border-bottom: 1px solid #ddd; vertical-align: top; }
    th { background: #f7f7f7; font-weight: 600; }
    code { background: #f3f3f3; padding: 0 .25rem; border-radius: 3px; font-size: .9em; }
    .meta { color: #666; font-size: .9rem; }
    .meta a { color: #555; }
    .note { background: #fffae6; border: 1px solid #e8d97a; padding: .75rem 1rem; border-radius: 4px; margin: 1rem 0; }
  </style>
</head>
<body>
  <h1>OpenSlate Public Endorsements</h1>
  <p class="meta">A directory of publicly-attributed endorsement slates in the <a href="https://github.com/cinderblock/openslate">OpenSlate</a> format.</p>

  <div class="note">
    Every slate here is a <strong>secondhand report</strong> &mdash; signed by
    the project's researcher key, not by the named organization. Prefer a
    firsthand slate from an organization if one exists.
  </div>

  <p class="meta">
    Project key: <code>${escape(publicKey.publicKey)}</code><br>
    Catalog: <a href="index.json">index.json</a> &middot;
    Public key file: <a href="keys/project-public.json">keys/project-public.json</a> &middot;
    Well-known: <a href="well-known/openslate.json">well-known/openslate.json</a> &middot;
    Source: <a href="https://github.com/cinderblock/openslate-public-endorsements">github.com/cinderblock/openslate-public-endorsements</a>
  </p>

  <h2>Slates (${catalog.entries.length})</h2>
  <table>
    <thead>
      <tr>
        <th>Organization</th>
        <th>Election / period</th>
        <th>Positions</th>
        <th>Attribution</th>
        <th>Files</th>
      </tr>
    </thead>
    <tbody>
${tableBody}
    </tbody>
  </table>

  <p class="meta">Generated ${escape(catalog.generated_at)}</p>
</body>
</html>
`;

await Bun.write(join(DIST, "index.html"), html);

console.log(`built dist/ — ${catalog.entries.length} slate(s)`);
