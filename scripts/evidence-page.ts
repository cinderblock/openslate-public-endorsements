// What a slate was built from, published beside it: each bundle's evidence/
// folder (the captured pages and NOTES.md) gets an index.html on Pages, so a
// reader can see what was captured, when and from where, and check a position
// against the text it came from. The catalog entry links it (`evidence`).

import { readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import {
  CAPTURES_REPO,
  type CaptureRef,
  type Claim,
  type Derivation,
  type HostFact,
  type SlateProvenance,
  type SourceProvenance,
} from "./lib/provenance";

const REPO = "https://github.com/cinderblock/openslate-public-endorsements";

export interface EvidenceFile {
  /** Path inside the evidence folder, `/`-separated. */
  path: string;
  bytes: number;
}

export interface EvidenceEntry {
  slug: string;
  election: string;
  attribution?: {
    of: { name: string; uri?: string };
    mode: string;
    retrieved_at: string;
    sources?: string[];
  };
}

/** Every file under an evidence folder: NOTES.md first, then by path. */
export function evidenceFiles(dir: string): EvidenceFile[] {
  const out: EvidenceFile[] = [];
  const walk = (at: string) => {
    for (const name of readdirSync(at)) {
      const full = join(at, name);
      const stat = statSync(full);
      if (stat.isDirectory()) walk(full);
      else out.push({ path: relative(dir, full).split(sep).join("/"), bytes: stat.size });
    }
  };
  walk(dir);
  const rank = (f: EvidenceFile) => (f.path === "NOTES.md" ? 0 : 1);
  return out.sort((a, b) => rank(a) - rank(b) || a.path.localeCompare(b.path));
}

function escape(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/** Only http(s) links reach the page: sources come from scraped data. */
function httpLink(url: string): string {
  return /^https?:\/\//i.test(url)
    ? `<a href="${escape(url)}">${escape(url)}</a>`
    : `<code>${escape(url)}</code>`;
}

function size(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

/** Weakest first. Says no more than each proof does: see openslate-source-captures' README. */
const CLAIMS: { claim: Claim; label: string; says: string }[] = [
  { claim: "captured", label: "Captured", says: "the exact bytes we used are kept, by hash" },
  {
    claim: "time-stamped",
    label: "Time-stamped",
    says: "two independent authorities show these bytes existed by this time, unchanged",
  },
  {
    claim: "witnessed-by-public-ci",
    label: "Witnessed by public CI",
    says: "public code, on GitHub's runner, fetched this and hashed it by this time",
  },
  {
    claim: "independently-archived",
    label: "Independently archived",
    says: "someone unconnected to us saw the same text",
  },
];

const HASH = /^[0-9a-f]{64}$/;

const isoTime = (iso: string) =>
  `<span class="iso-time" data-iso="${escape(iso)}">${escape(iso)}</span>`;

function hostFact(host: HostFact): string {
  const name = `<code>${escape(host.host)}</code>`;
  if (host.match === "exact") return `Matches the listed site: ${name}`;
  if (host.match === "subdomain") return `Subdomain of the listed site: ${name}`;
  if (host.match === "hosted-elsewhere") return `Hosted elsewhere: ${name}`;
  return `Host: ${name}`;
}

function derivationFact(derivation: Derivation, positions: number): string {
  if (derivation.kind === "not-checkable") {
    return `Not checkable${derivation.reason ? `: ${escape(derivation.reason)}` : ""}`;
  }
  const found = derivation.exact + derivation.quoted_parts;
  const checked = found + derivation.unanchored;
  const none = derivation.no_statement ? `, ${derivation.no_statement} with no statement` : "";
  return `${found} of ${checked} statements found in this capture (${positions} positions${none})`;
}

function bytesLink(ref: CaptureRef): string {
  const hash = HASH.test(ref.response_sha256) ? ref.response_sha256 : null;
  if (ref.bytes === "withheld" || !hash) {
    return `Bytes kept private; their hash is public: <code>${escape(ref.response_sha256)}</code>`;
  }
  const url =
    ref.bytes === "release"
      ? `${CAPTURES_REPO}/releases/download/large-blobs/${hash}`
      : `${CAPTURES_REPO}/blob/master/blobs/${hash.slice(0, 2)}/${hash}`;
  return `<a href="${url}">raw bytes</a>`;
}

/** One capture: what came back and when, with the proofs that cover it. */
function captureCell(ref: CaptureRef): string {
  const outcome = ref.status ? `HTTP ${ref.status}` : escape(ref.error ?? "no response");
  const manifest = `${CAPTURES_REPO}/blob/master/runs/${encodeURIComponent(ref.run)}/manifest.json`;
  const known = CLAIMS.filter(({ claim }) => ref.claims.includes(claim));
  const strongest = known.at(-1)?.label ?? "Reported";
  const browser = ref.rendered
    ? `
          <p class="meta">A plain request doesn't get this page, so it was also loaded in a headless browser (HTTP ${escape(String(ref.rendered.status ?? "no response"))}). That copy is the browser's view, not the bytes as sent.</p>`
    : "";
  return `<strong>${escape(strongest)}</strong>: ${outcome}, ${isoTime(ref.captured_at)}
          <ul class="claims">
${known.map(({ label, says }) => `            <li>${label}: ${says}</li>`).join("\n")}
          </ul>${browser}
          ${bytesLink(ref)} &middot; <a href="${manifest}">manifest</a>`;
}

function archivedLine(source: SourceProvenance): string {
  const archived = source.archived;
  if (!archived || !/^https?:\/\//i.test(archived.url)) return "";
  const found = archived.statements
    ? `: ${archived.statements.found} of ${archived.statements.of} statements found in it`
    : "";
  return `
          <p class="meta"><a href="${escape(archived.url)}">Internet Archive copy</a>${found}</p>`;
}

function sourceRow(source: SourceProvenance): string {
  const latest = source.latest;
  const earlier = latest && latest.status !== 200 ? source.last_ok : null;
  const capture = latest
    ? `${captureCell(latest)}${earlier ? `\n          <p class="meta">Last returned 200:</p>\n          ${captureCell(earlier)}` : ""}`
    : "<strong>Reported</strong>: no capture yet";
  return `      <tr>
        <td>${httpLink(source.url)}</td>
        <td>${capture}${archivedLine(source)}</td>
        <td>${hostFact(source.host)}</td>
        <td>${derivationFact(source.derivation, source.positions)}</td>
      </tr>`;
}

function provenanceSection(provenance: SlateProvenance): string {
  return `  <h2>Source captures</h2>
  <p>Each source as this project's capture tool received it. A capture shows what was fetched and
  when. It doesn't show that the site wasn't hacked or serving something else to a script, or that
  a site speaks for the organization: that link is this project's claim, so the host is shown for
  each source. <a href="${CAPTURES_REPO}">How captures work, and how to verify one</a>.</p>
  <table>
    <thead><tr><th>Source</th><th>Capture</th><th>Host</th><th>Statements</th></tr></thead>
    <tbody>
${provenance.sources.map(sourceRow).join("\n")}
    </tbody>
  </table>
`;
}

/** The evidence/index.html for one bundle. `provenance` adds its capture details, when there are any. */
export function evidencePage(
  entry: EvidenceEntry,
  files: EvidenceFile[],
  provenance: SlateProvenance | null = null,
): string {
  const folder = `orgs/${entry.slug}/${entry.election}/evidence`;
  const name = entry.attribution?.of.name ?? entry.slug;
  const a = entry.attribution;
  const fileUrl = (f: EvidenceFile) => f.path.split("/").map(encodeURIComponent).join("/");
  const rows = files
    .map(
      (f) => `      <tr>
        <td><a href="${escape(fileUrl(f))}">${escape(f.path)}</a></td>
        <td>${size(f.bytes)}</td>
        <td><a href="${REPO}/blob/master/${escape(folder)}/${escape(fileUrl(f))}">rendered</a> &middot; <a href="${REPO}/commits/master/${escape(folder)}/${escape(fileUrl(f))}">history</a></td>
      </tr>`,
    )
    .join("\n");
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Evidence: ${escape(name)}, ${escape(entry.election)}</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    body { font: 16px/1.5 system-ui, -apple-system, sans-serif; max-width: 60rem; margin: 2rem auto; padding: 0 1rem; color: #222; }
    h1 { font-size: 1.4rem; margin-bottom: .25rem; }
    h2 { font-size: 1.15rem; margin: 2rem 0 .25rem; }
    table { border-collapse: collapse; width: 100%; margin-top: 1rem; }
    th, td { text-align: left; padding: .5rem .75rem; border-bottom: 1px solid #ddd; vertical-align: top; }
    th { background: #f7f7f7; font-weight: 600; }
    code { background: #f3f3f3; padding: 0 .25rem; border-radius: 3px; font-size: .9em; }
    .meta { color: #666; font-size: .9rem; }
    .claims { margin: .25rem 0; padding-left: 1.25rem; font-size: .9rem; }
    .utc { color: #888; font-size: .85em; }
  </style>
</head>
<body>
  <p class="meta"><a href="../../../../">OpenSlate Public Endorsements</a></p>
  <h1>Evidence: ${a?.of.uri && /^https?:\/\//i.test(a.of.uri) ? `<a href="${escape(a.of.uri)}">${escape(name)}</a>` : escape(name)}, ${escape(entry.election)}</h1>
  <p>What the <a href="../signed.slate">signed slate</a> (<a href="../positions.json">positions.json</a>)
  was built from. It's a secondhand report: a researcher captured these pages; ${escape(name)} didn't sign it.</p>
${
  a
    ? `  <p>
    ${escape(a.mode)}, retrieved <span class="iso-time" data-iso="${escape(a.retrieved_at)}">${escape(a.retrieved_at)}</span>
  </p>
${
  a.sources?.length
    ? `  <p>Sources:</p>
  <ul>
${a.sources.map((s) => `    <li>${httpLink(s)}</li>`).join("\n")}
  </ul>
`
    : ""
}`
    : ""
}${provenance ? provenanceSection(provenance) : ""}  <table>
    <thead><tr><th>File</th><th>Size</th><th>On GitHub</th></tr></thead>
    <tbody>
${rows}
    </tbody>
  </table>
  <p class="meta">Every change to this folder is in its <a href="${REPO}/commits/master/${escape(folder)}">git history</a>.</p>
  <script>
    // Times in the reader's own zone, with UTC beside them.
    for (const el of document.querySelectorAll(".iso-time")) {
      const d = new Date(el.dataset.iso);
      if (isNaN(d.getTime())) continue;
      const local = d.toLocaleString(undefined, { year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZoneName: "short" });
      el.innerHTML = "";
      el.append(local, " ");
      const utc = document.createElement("span");
      utc.className = "utc";
      utc.textContent = "(" + el.dataset.iso + ")";
      el.append(utc);
    }
  </script>
</body>
</html>
`;
}
