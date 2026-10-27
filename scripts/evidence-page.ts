// What a slate was built from, published beside it: each bundle's evidence/
// folder (the captured pages and NOTES.md) gets an index.html on Pages, so a
// reader can see what was captured, when and from where, and check a position
// against the text it came from. The catalog entry links it (`evidence`).

import { readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

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

/** The evidence/index.html for one bundle. */
export function evidencePage(entry: EvidenceEntry, files: EvidenceFile[]): string {
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
    table { border-collapse: collapse; width: 100%; margin-top: 1rem; }
    th, td { text-align: left; padding: .5rem .75rem; border-bottom: 1px solid #ddd; vertical-align: top; }
    th { background: #f7f7f7; font-weight: 600; }
    code { background: #f3f3f3; padding: 0 .25rem; border-radius: 3px; font-size: .9em; }
    .meta { color: #666; font-size: .9rem; }
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
}  <table>
    <thead><tr><th>File</th><th>Size</th><th>On GitHub</th></tr></thead>
    <tbody>
${rows}
    </tbody>
  </table>
  <p class="meta">Every change to this folder is in its <a href="${REPO}/commits/master/${escape(folder)}">git history</a>.</p>
  <script>
    // The retrieval time in the reader's own zone, with UTC beside it.
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
