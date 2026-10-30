#!/usr/bin/env bun
// Assemble dist/ for GitHub Pages from the source tree plus the artifacts
// produced by `openslate sign --batch` (signed.slate + ./index.json). Each
// catalog entry also gets the org's logo and lean (scripts/catalog-extras.ts),
// and a page for what it was built from (scripts/evidence-page.ts), with capture details when
// the capture repo is reachable (scripts/lib/provenance.ts).

import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { catalogExtras } from "./catalog-extras";
import { evidenceFiles, evidencePage, TAKEDOWN } from "./evidence-page";
import { provenanceRoot, readProvenance } from "./lib/provenance";
import { readManifest } from "./lib/withheld-evidence";

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
// Voter guides (official ballot material, one repo per state and election) the app can load.
cpSync(join(ROOT, "guides.json"), join(DIST, "guides.json"));

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
  /** The slate's `context.jurisdiction` (written by `sign --batch`). */
  scope?: string;
  /** Races per position jurisdiction, so the app can match an org to a voter's area unfetched. */
  jurisdictions?: Record<string, number>;
  issued_at: string;
  /** Site path of the org's logo. */
  logo?: string;
  /** `"dark"` when the logo is white-only and needs a dark tile. */
  logo_background?: "dark";
  /** Subjects where the org took the Democratic / Republican side. */
  lean?: { left: number; right: number };
  /** Site path of the page listing what the slate was built from (its evidence/ folder). */
  evidence?: string;
}

interface Catalog {
  version: number;
  generated_at: string;
  entries: IndexEntry[];
  /**
   * bundle.json, advertised so the app can offer "download everything" in one
   * request. `bytes` is its uncompressed size: Pages gzips it, so the browser's
   * Content-Length can't drive a progress bar.
   */
  bundle?: { path: string; bytes: number };
}

let catalog: Catalog = { version: 1, generated_at: new Date().toISOString(), entries: [] };
if (existsSync(BATCH_INDEX)) {
  catalog = JSON.parse(await Bun.file(BATCH_INDEX).text()) as Catalog;
}

// Bundle: same metadata as index.json plus the signed slate token inline,
// so a consumer can fetch every endorsement in this catalog with a single HTTP
// request rather than N+1 fetches.
type BundleEntry = IndexEntry & { token: string };
const bundleEntries: BundleEntry[] = [];
for (const entry of catalog.entries) {
  const slatePath = join(ROOT, entry.path);
  if (!existsSync(slatePath)) {
    console.error(
      `bundle: skip ${entry.slug}/${entry.election} — signed slate missing at ${entry.path}`,
    );
    continue;
  }
  const token = (await Bun.file(slatePath).text()).trim();
  bundleEntries.push({ ...entry, token });
}

// Logos and lean, added to both the catalog and the bundle.
const extras = catalogExtras(ROOT, bundleEntries);
// Each bundle's evidence/ (copied with orgs/ above) gets an index page.
const evidence = new Map<string, string>();
const captures = await provenanceRoot();
console.log(captures ? "capture details: found" : "capture details: not available, skipped");
for (const entry of catalog.entries) {
  const folder = join("orgs", entry.slug, entry.election, "evidence");
  if (!existsSync(join(ROOT, folder))) continue;
  const files = evidenceFiles(join(ROOT, folder));
  const withheld = readManifest(join(ROOT, folder))?.files ?? [];
  if (files.length + withheld.length === 0 || files.some((f) => f.path === "index.html")) continue;
  const provenance = captures ? readProvenance(captures, entry.slug, entry.election) : null;
  await Bun.write(
    join(DIST, folder, "index.html"),
    evidencePage(entry, files, provenance, withheld),
  );
  evidence.set(`${entry.slug}/${entry.election}`, `orgs/${entry.slug}/${entry.election}/evidence/`);
}
const withExtras = <T extends IndexEntry>(entry: T): T => {
  const key = `${entry.slug}/${entry.election}`;
  const page = evidence.get(key);
  return { ...entry, ...extras.get(key), ...(page ? { evidence: page } : {}) };
};
catalog = { ...catalog, entries: catalog.entries.map(withExtras) };
bundleEntries.splice(0, bundleEntries.length, ...bundleEntries.map(withExtras));
const withLogo = catalog.entries.filter((e) => e.logo).length;
const withLean = catalog.entries.filter((e) => e.lean).length;
const bundle = {
  version: catalog.version,
  generated_at: catalog.generated_at,
  entries: bundleEntries,
};
const bundleText = `${JSON.stringify(bundle, null, 2)}\n`;
await Bun.write(join(DIST, "bundle.json"), bundleText);
catalog = {
  ...catalog,
  bundle: { path: "bundle.json", bytes: new TextEncoder().encode(bundleText).byteLength },
};
await Bun.write(join(DIST, "index.json"), `${JSON.stringify(catalog, null, 2)}\n`);

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
    const logo = e.logo
      ? `<img class="logo${e.logo_background === "dark" ? " logo-dark" : ""}" src="${escape(e.logo)}" alt="" loading="lazy">`
      : "";
    const orgLink = e.attribution?.of.uri
      ? `<a href="${escape(e.attribution.of.uri)}">${escape(orgName)}</a>`
      : escape(orgName);
    const attrCell = e.attribution
      ? `<code>${escape(e.attribution.mode)}</code> · retrieved <span class="iso-date" data-iso="${escape(e.attribution.retrieved_at)}">${escape(e.attribution.retrieved_at.slice(0, 10))}</span>`
      : "&mdash;";
    return `      <tr>
        <td>${logo}</td>
        <td>${orgLink}</td>
        <td>${escape(e.election)}</td>
        <td>${e.positions}</td>
        <td>${attrCell}</td>
        <td><a href="${slateUrl}">slate</a> &middot; <a href="${posUrl}">positions.json</a>${e.evidence ? ` &middot; <a href="${escape(e.evidence)}">evidence</a>` : ""}</td>
      </tr>`;
  })
  .join("\n");

const tableBody =
  catalog.entries.length > 0
    ? rows
    : `      <tr><td colspan="6" class="meta">No slates published yet.</td></tr>`;

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
    .logo { width: 24px; height: 24px; object-fit: contain; display: block; }
    .logo-dark { background: #1b1f24; border-radius: 4px; padding: 2px; box-sizing: border-box; }
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
    Catalog (metadata only): <a href="index.json">index.json</a> &middot;
    <strong>Bundle (every signed slate inline, single fetch):</strong> <a href="bundle.json">bundle.json</a> &middot;
    Public key file: <a href="keys/project-public.json">keys/project-public.json</a> &middot;
    Well-known: <a href="well-known/openslate.json">well-known/openslate.json</a> &middot;
    Source: <a href="https://github.com/cinderblock/openslate-public-endorsements">github.com/cinderblock/openslate-public-endorsements</a> &middot;
    <a href="${escape(TAKEDOWN)}">Request a takedown</a>
  </p>

  <h2>Slates (${catalog.entries.length})</h2>
  <table>
    <thead>
      <tr>
        <th aria-label="Logo"></th>
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

  <p class="meta">Generated <span class="iso-date" data-iso="${escape(catalog.generated_at)}">${escape(catalog.generated_at)}</span></p>

  <script>
    // Progressive enhancement: convert UTC ISO timestamps to viewer-local
    // YYYY-MM-DD. Without JS the dates display in UTC.
    (function () {
      for (const el of document.querySelectorAll(".iso-date")) {
        const iso = el.dataset.iso;
        if (!iso) continue;
        const d = new Date(iso);
        if (isNaN(d.getTime())) continue;
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        el.textContent = y + "-" + m + "-" + day;
      }
    })();
  </script>
</body>
</html>
`;

await Bun.write(join(DIST, "index.html"), html);

console.log(
  `built dist/ — ${catalog.entries.length} slate(s), bundle.json with ${bundleEntries.length} tokens inline, ${withLogo} with a logo, ${withLean} with a lean, ${evidence.size} with evidence`,
);
