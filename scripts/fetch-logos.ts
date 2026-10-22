#!/usr/bin/env bun
// Fetch each org's site icon into orgs/<slug>/logo.<ext> so the published site can serve
// endorser logos without visitors' browsers ever contacting the orgs. Reads the homepage's
// <link rel> icons and web app manifest (never og:image), downloads every candidate, keeps
// the best one that is verifiably an image (square raster >= 96px or a safe SVG preferred),
// and records `logo:` + `logo_source:` in meta.yaml right after `kind:`. Results also land
// in review/fetch-logos.json, and review/logos.html is a contact sheet of every org's logo.
//
//   bun scripts/fetch-logos.ts [--force] [--only <slug> [--url <homepage override>]]
//   bun scripts/fetch-logos.ts --reject <slug> --reason "<why>"   # drop a bad pick
//   bun scripts/fetch-logos.ts --review                           # rebuild the sheet only

import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync } from "node:fs";
import { join } from "node:path";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36";
const TIMEOUT_MS = 15_000;
const CONCURRENCY = 6;
const MAX_BYTES = 200 * 1024;
const MAX_CANDIDATES = 10;
const REPORT = "review/fetch-logos.json";
const SHEET = "review/logos.html";
// Platform placeholder icons (and social hosts' own logos) that say nothing about the org.
const DEFAULT_ICONS = [
  /(^|\.)wix\.com\/favicon\.ico/,
  /parastorage\.com\/client\/pfavico/, // Wix
  /squarespace\.com\/universal\/default-favicon/,
  /\/wp-includes\/images\/w-logo/,
  /(^|\/\/)s\.w\.org\//,
  /wordpress\.com\/i\/(webclip|favicon)/,
  /initial-website\.com\/favicon/, // IONOS site builder
  /\/modules\/contrib\/pwa\/assets\//, // Drupal PWA module
  /\/default[-_]favicon/i,
  /^https?:\/\/([\w-]+\.)*(facebook\.com|fbcdn\.net|instagram\.com|linktr\.ee)\//,
];
// The same placeholders served from the org's own domain (e.g. Wix answers /favicon.ico).
const DEFAULT_ICON_SHA256 = new Set([
  "33c1436f8c40ca2582d091c449fccc34ed9bf73f02526c5fdef44f4f06c6321b", // Wix pfavico.ico
]);

const args = process.argv.slice(2);
const flag = (name: string) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const force = args.includes("--force");
const only = flag("--only");
const urlOverride = flag("--url");
if (urlOverride && !only) throw new Error("--url needs --only <slug>");

type Format = "png" | "jpg" | "gif" | "webp" | "ico" | "svg";
interface Org {
  slug: string;
  name: string;
  uri?: string;
  kind?: string;
  dir: string;
  meta: string;
}
interface Candidate {
  url: string;
  via: "apple-touch-icon" | "manifest" | "icon" | "fallback";
  declared?: number;
  maskable?: boolean;
}
interface Image {
  format: Format;
  width?: number;
  height?: number;
  bytes: Uint8Array;
}
interface Result {
  slug: string;
  status: "ok" | "failed" | "skipped" | "rejected";
  reason?: string;
  file?: string;
  source?: string;
  format?: Format;
  width?: number;
  height?: number;
  bytes?: number;
  at: string;
}

function readOrgs(): Org[] {
  return readdirSync("orgs")
    .filter((slug) => existsSync(join("orgs", slug, "meta.yaml")))
    .map((slug) => {
      const dir = join("orgs", slug);
      const meta = join(dir, "meta.yaml");
      const text = readFileSync(meta, "utf8");
      const field = (key: string) =>
        text
          .match(new RegExp(`^${key}:[ \\t]*(.*?)\\r?$`, "m"))?.[1]
          ?.trim()
          .replace(/^(["'])(.*)\1$/, "$2") || undefined;
      return {
        slug,
        name: field("name") ?? slug,
        uri: field("uri"),
        kind: field("kind"),
        dir,
        meta,
      };
    });
}

const existingLogo = (dir: string) => readdirSync(dir).find((f) => /^logo\.[a-z]+$/.test(f));

async function get(url: string, accept: string): Promise<Response> {
  return fetch(url, {
    headers: { "User-Agent": UA, Accept: accept, "Accept-Language": "en-US,en;q=0.9" },
    redirect: "follow",
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
}

// Read at most `limit` bytes; undefined when the body is larger.
async function readCapped(res: Response, limit: number): Promise<Uint8Array | undefined> {
  const declared = Number(res.headers.get("content-length"));
  if (declared > limit) return undefined;
  const reader = res.body?.getReader();
  if (!reader) return new Uint8Array();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.length;
    if (total > limit) {
      await reader.cancel();
      return undefined;
    }
    chunks.push(value);
  }
  const out = new Uint8Array(total);
  let at = 0;
  for (const c of chunks) {
    out.set(c, at);
    at += c.length;
  }
  return out;
}

const decodeEntities = (s: string) =>
  s
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(Number.parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)));

function attrs(tag: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const m of tag.matchAll(/([^\s"'<>\/=]+)\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'>]+))/g)) {
    out[(m[1] as string).toLowerCase()] = decodeEntities(m[3] ?? m[4] ?? m[5] ?? "");
  }
  return out;
}

// Largest edge from a sizes attribute ("16x16 32x32", "180x180", "any").
function largest(sizes: string | undefined): number | undefined {
  if (!sizes) return undefined;
  const edges = [...sizes.matchAll(/(\d+)\s*[xX×]\s*(\d+)/g)].map((m) =>
    Math.min(Number(m[1]), Number(m[2])),
  );
  return edges.length ? Math.max(...edges) : undefined;
}

function resolve(href: string, base: string): string | undefined {
  if (!href || href.startsWith("data:")) return undefined;
  try {
    const u = new URL(href, base);
    return u.protocol === "http:" || u.protocol === "https:" ? u.href : undefined;
  } catch {
    return undefined;
  }
}

// Conventional root icons, tried when the page declares none (or none of them work).
const fallbacks = (page: string): Candidate[] => [
  { url: new URL("/apple-touch-icon.png", page).href, via: "fallback" },
  { url: new URL("/favicon.ico", page).href, via: "fallback" },
];

async function candidatesFrom(
  homepage: string,
): Promise<{ list: Candidate[]; page?: string; note?: string }> {
  let res: Response;
  try {
    res = await get(homepage, "text/html,application/xhtml+xml,*/*;q=0.8");
  } catch (e) {
    return {
      list: [],
      note: `homepage: ${(e as Error).name === "TimeoutError" ? "timeout" : (e as Error).message}`,
    };
  }
  const page = res.url || homepage;
  if (!res.ok) {
    await res.body?.cancel();
    return { list: fallbacks(page), page, note: `homepage: HTTP ${res.status}` };
  }
  const html = new TextDecoder().decode(
    (await readCapped(res, 3 * 1024 * 1024)) ?? new Uint8Array(),
  );
  const base = resolve(attrs(html.match(/<base\b[^>]*>/i)?.[0] ?? "").href ?? "", page) ?? page;
  const list: Candidate[] = [];
  let manifest: string | undefined;
  for (const [tag] of html.matchAll(/<link\b[^>]*>/gi)) {
    const a = attrs(tag);
    const rel = (a.rel ?? "").toLowerCase().split(/\s+/);
    const url = resolve(a.href ?? "", base);
    if (!url) continue;
    if (rel.includes("manifest")) manifest ??= url;
    else if (rel.includes("apple-touch-icon") || rel.includes("apple-touch-icon-precomposed"))
      list.push({ url, via: "apple-touch-icon", declared: largest(a.sizes) ?? 180 });
    else if (rel.includes("icon")) list.push({ url, via: "icon", declared: largest(a.sizes) });
  }
  if (manifest) {
    try {
      const mres = await get(manifest, "application/manifest+json,application/json,*/*");
      const body = mres.ok ? await readCapped(mres, 512 * 1024) : undefined;
      const json = body ? JSON.parse(new TextDecoder().decode(body)) : undefined;
      for (const icon of Array.isArray(json?.icons) ? json.icons : []) {
        const url = resolve(String(icon?.src ?? ""), mres.url || manifest);
        if (url)
          list.push({
            url,
            via: "manifest",
            declared: largest(icon.sizes),
            maskable:
              /maskable/.test(String(icon.purpose ?? "")) && !/any/.test(String(icon.purpose)),
          });
      }
    } catch {
      // A broken manifest just means no manifest icons.
    }
  }
  if (!list.length) list.push(...fallbacks(page));
  const seen = new Set<string>();
  const unique = list.filter((c) => !seen.has(c.url) && seen.add(c.url));
  // Biggest declared first so the download cap keeps the useful ones.
  unique.sort((x, y) => (y.declared ?? 0) - (x.declared ?? 0));
  return { list: unique.slice(0, MAX_CANDIDATES), page };
}

const u16le = (b: Uint8Array, i: number) => (b[i] as number) | ((b[i + 1] as number) << 8);
const u16be = (b: Uint8Array, i: number) => ((b[i] as number) << 8) | (b[i + 1] as number);
const u24le = (b: Uint8Array, i: number) => u16le(b, i) | ((b[i + 2] as number) << 16);
const u32be = (b: Uint8Array, i: number) => u16be(b, i) * 65536 + u16be(b, i + 2);
const ascii = (b: Uint8Array, i: number, n: number) => String.fromCharCode(...b.subarray(i, i + n));

function jpegSize(b: Uint8Array): { width: number; height: number } | undefined {
  let i = 2;
  while (i + 9 < b.length) {
    if (b[i] !== 0xff) return undefined;
    const marker = b[i + 1] as number;
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      i += 2;
      continue;
    }
    const len = u16be(b, i + 2);
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc)
      return { height: u16be(b, i + 5), width: u16be(b, i + 7) };
    i += 2 + len;
  }
  return undefined;
}

function webpSize(b: Uint8Array): { width: number; height: number } | undefined {
  const chunk = ascii(b, 12, 4);
  if (chunk === "VP8 ") return { width: u16le(b, 26) & 0x3fff, height: u16le(b, 28) & 0x3fff };
  if (chunk === "VP8L") {
    const bits =
      (b[21] as number) |
      ((b[22] as number) << 8) |
      ((b[23] as number) << 16) |
      ((b[24] as number) << 24);
    return { width: (bits & 0x3fff) + 1, height: ((bits >>> 14) & 0x3fff) + 1 };
  }
  if (chunk === "VP8X") return { width: u24le(b, 24) + 1, height: u24le(b, 27) + 1 };
  return undefined;
}

function icoSize(b: Uint8Array): { width: number; height: number } | undefined {
  const count = u16le(b, 4);
  let best: { width: number; height: number } | undefined;
  for (let n = 0; n < count && 6 + n * 16 + 16 <= b.length; n++) {
    const e = 6 + n * 16;
    let width = (b[e] as number) || 256;
    let height = (b[e + 1] as number) || 256;
    // PNG-compressed entries carry their real size in the embedded IHDR.
    const offset = u16le(b, e + 12) + u16le(b, e + 14) * 65536;
    if (offset + 24 <= b.length && b[offset] === 0x89 && ascii(b, offset + 1, 3) === "PNG") {
      width = u32be(b, offset + 16);
      height = u32be(b, offset + 20);
    }
    if (!best || Math.min(width, height) > Math.min(best.width, best.height))
      best = { width, height };
  }
  return best;
}

// Vector size from viewBox (or width/height) — informational, for aspect ratio.
function svgSize(text: string): { width?: number; height?: number } {
  const root = attrs(text.match(/<svg\b[^>]*>/i)?.[0] ?? "");
  const vb = root.viewbox
    ?.trim()
    .split(/[\s,]+/)
    .map(Number);
  if (vb && vb.length === 4 && vb.every(Number.isFinite)) return { width: vb[2], height: vb[3] };
  const w = Number.parseFloat(root.width ?? "");
  const h = Number.parseFloat(root.height ?? "");
  return Number.isFinite(w) && Number.isFinite(h) ? { width: w, height: h } : {};
}

// Unsafe or privacy-leaking SVG: scripts, event handlers, or anything fetched over the network.
function svgProblem(text: string): string | undefined {
  if (/<script\b/i.test(text)) return "svg contains <script>";
  if (/<foreignObject\b/i.test(text)) return "svg contains <foreignObject>";
  if (/\son[a-z]+\s*=/i.test(text)) return "svg has an on* event attribute";
  if (/href\s*=\s*["']?\s*(https?:)?\/\//i.test(text)) return "svg has an external href";
  if (/javascript:/i.test(text)) return "svg has a javascript: URL";
  if (/url\(\s*["']?\s*(https?:)?\/\//i.test(text) || /@import/i.test(text))
    return "svg loads an external stylesheet or url()";
  return undefined;
}

function sniff(bytes: Uint8Array): Image | string {
  const b = bytes;
  if (b.length < 12) return "too small to be an image";
  if (b[0] === 0x89 && ascii(b, 1, 3) === "PNG")
    return { format: "png", width: u32be(b, 16), height: u32be(b, 20), bytes };
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff)
    return { format: "jpg", ...jpegSize(b), bytes };
  if (ascii(b, 0, 4) === "GIF8")
    return { format: "gif", width: u16le(b, 6), height: u16le(b, 8), bytes };
  if (ascii(b, 0, 4) === "RIFF" && ascii(b, 8, 4) === "WEBP")
    return { format: "webp", ...webpSize(b), bytes };
  if (b[0] === 0 && b[1] === 0 && b[2] === 1 && b[3] === 0 && u16le(b, 4) > 0)
    return { format: "ico", ...icoSize(b), bytes };
  const text = new TextDecoder().decode(b).replace(/^\uFEFF/, "");
  const head = text.trimStart();
  if (/^<svg\b/i.test(head) || (/^<\?xml\b/i.test(head) && /<svg\b/i.test(text))) {
    const problem = svgProblem(text);
    return problem ?? { format: "svg", ...svgSize(text), bytes };
  }
  return /^\s*<(!doctype|html)/i.test(head)
    ? "got an HTML page, not an image"
    : "not a recognized image";
}

// Higher is better: safe SVG or square raster >= 96px, then mid-size, then tiny or oblong.
function score(img: Image, c: Candidate): number {
  const w = img.width ?? 0;
  const h = img.height ?? 0;
  const edge = Math.min(w, h);
  const aspect = edge ? Math.max(w, h) / edge : 1;
  let s: number;
  if (img.format === "svg") s = aspect > 1.5 ? 400 : 1000;
  else if (aspect > 1.3) s = 200 + Math.min(edge, 256) / 4;
  else if (edge >= 96) s = 800 + (Math.min(edge, 512) / 512) * 150;
  else if (edge >= 48) s = 500 + edge;
  else s = 100 + edge;
  if (c.maskable) s -= 60;
  if (c.via === "apple-touch-icon") s += 5;
  return s;
}

async function download(c: Candidate): Promise<{ img: Image; url: string } | string> {
  if (DEFAULT_ICONS.some((re) => re.test(c.url))) return "platform default icon";
  try {
    const res = await get(
      c.url,
      "image/png,image/svg+xml,image/webp,image/jpeg,image/gif,image/x-icon;q=0.9,*/*;q=0.5",
    );
    if (!res.ok) {
      await res.body?.cancel();
      return `HTTP ${res.status}`;
    }
    if (DEFAULT_ICONS.some((re) => re.test(res.url))) return "platform default icon";
    const bytes = await readCapped(res, MAX_BYTES);
    if (!bytes) return "larger than 200 KB";
    if (DEFAULT_ICON_SHA256.has(new Bun.CryptoHasher("sha256").update(bytes).digest("hex")))
      return "platform default icon";
    const img = sniff(bytes);
    return typeof img === "string" ? img : { img, url: res.url || c.url };
  } catch (e) {
    return (e as Error).name === "TimeoutError" ? "timeout" : (e as Error).message;
  }
}

// Insert/replace `logo:` and `logo_source:` right after `kind:`, keeping line endings.
function editMeta(text: string, logo?: { file: string; source: string }): string {
  const eol = text.includes("\r\n") ? "\r\n" : "\n";
  const lines = text.split(/\r?\n/).filter((l) => !/^logo(_source)?:/.test(l));
  if (logo) {
    const after = ["kind", "uri", "slug", "name"]
      .map((k) => lines.findIndex((l) => l.startsWith(`${k}:`)))
      .find((i) => i >= 0);
    const source = /^[\w:/.?&=%+~@!$,;#-]+$/.test(logo.source)
      ? logo.source
      : JSON.stringify(logo.source);
    lines.splice((after ?? -1) + 1, 0, `logo: ${logo.file}`, `logo_source: ${source}`);
  }
  return lines.join(eol);
}

async function writeMeta(org: Org, logo?: { file: string; source: string }) {
  const text = await Bun.file(org.meta).text();
  const next = editMeta(text, logo);
  if (next !== text) await Bun.write(org.meta, next);
}

function removeLogos(dir: string) {
  for (const f of readdirSync(dir)) if (/^logo\.[a-z]+$/.test(f)) rmSync(join(dir, f));
}

async function fetchLogo(org: Org): Promise<Result> {
  const at = new Date().toISOString();
  const fail = (reason: string): Result => ({ slug: org.slug, status: "failed", reason, at });
  const homepage = (only === org.slug && urlOverride) || org.uri;
  if (!homepage) return fail("no uri in meta.yaml");
  const { list, page, note } = await candidatesFrom(homepage);
  if (!list.length) return fail(note ?? "no icon candidates");
  const tryAll = (cs: Candidate[]) =>
    Promise.all(cs.map(async (c) => ({ c, got: await download(c) })));
  const tried = await tryAll(list);
  const pick = () => {
    let best: { img: Image; url: string; s: number } | undefined;
    for (const { c, got } of tried) {
      if (typeof got === "string") continue;
      const s = score(got.img, c);
      if (!best || s > best.s) best = { ...got, s };
    }
    return best;
  };
  let best = pick();
  if (!best && page && !list.some((c) => c.via === "fallback")) {
    tried.push(...(await tryAll(fallbacks(page))));
    best = pick();
  }
  if (!best) {
    const why = [...new Set(tried.map(({ got }) => got as string))].join("; ");
    return fail([note, `icons: ${why}`].filter(Boolean).join(" — "));
  }
  removeLogos(org.dir);
  const file = `logo.${best.img.format}`;
  await Bun.write(join(org.dir, file), best.img.bytes);
  await writeMeta(org, { file, source: best.url });
  return {
    slug: org.slug,
    status: "ok",
    file,
    source: best.url,
    format: best.img.format,
    width: best.img.width,
    height: best.img.height,
    bytes: best.img.bytes.length,
    at,
  };
}

async function loadReport(): Promise<Record<string, Result>> {
  return existsSync(REPORT) ? await Bun.file(REPORT).json() : {};
}

const esc = (s: unknown) =>
  String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

async function writeSheet(orgs: Org[], report: Record<string, Result>) {
  const cards: string[] = [];
  const missing: string[] = [];
  for (const org of orgs) {
    const file = existingLogo(org.dir);
    const r = report[org.slug];
    if (!file) {
      const why = r?.status === "ok" ? "logo file missing" : (r?.reason ?? "not attempted yet");
      missing.push(
        `<tr><td>${esc(org.name)}</td><td><code>${esc(org.slug)}</code></td><td>${esc(org.kind)}</td><td>${esc(r?.status ?? "—")}</td><td>${esc(why)}</td><td>${org.uri ? `<a href="${esc(org.uri)}">${esc(org.uri)}</a>` : "—"}</td></tr>`,
      );
      continue;
    }
    const src = `../orgs/${org.slug}/${file}`;
    const bytes = statSync(join(org.dir, file)).size;
    const ext = file.split(".")[1] as string;
    const fromReport = r?.file === file ? r : undefined;
    const dims =
      fromReport?.width && fromReport.height
        ? `${fromReport.width}×${fromReport.height}${ext === "svg" ? " (viewBox)" : ""}`
        : ext === "svg"
          ? "vector"
          : "?";
    const low = ext !== "svg" && Math.min(fromReport?.width ?? 0, fromReport?.height ?? 0) < 64;
    const source =
      (await Bun.file(org.meta).text()).match(/^logo_source:[ \t]*(.*?)\r?$/m)?.[1] ?? "";
    cards.push(`<div class="card${low ? " low" : ""}">
  <div class="tiles"><span class="tile light"><img src="${esc(src)}" alt=""></span><span class="tile dark"><img src="${esc(src)}" alt=""></span></div>
  <div class="name">${esc(org.name)}</div>
  <div class="meta"><code>${esc(org.slug)}</code> · ${esc(org.kind)}</div>
  <div class="meta">${esc(ext)} · ${esc(dims)} · ${(bytes / 1024).toFixed(1)} KB</div>
  <div class="src"><a href="${esc(source)}">${esc(source)}</a></div>
</div>`);
  }
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Org logos — review</title>
<style>
  body { font: 13px/1.4 system-ui, sans-serif; margin: 1.5rem; color: #222; }
  h1 { font-size: 1.3rem; } h2 { font-size: 1.1rem; margin-top: 2rem; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: .75rem; }
  .card { border: 1px solid #ddd; border-radius: 6px; padding: .6rem; overflow: hidden; }
  .card.low { border-color: #e0a800; background: #fffbea; }
  .tiles { display: flex; gap: .4rem; margin-bottom: .4rem; }
  .tile { width: 64px; height: 64px; display: flex; align-items: center; justify-content: center; border-radius: 4px; border: 1px solid #ccc; }
  .tile.light { background: #fff; } .tile.dark { background: #0f1115; border-color: #0f1115; }
  .tile img { width: 48px; height: 48px; object-fit: contain; }
  .name { font-weight: 600; } .meta { color: #555; }
  .src { word-break: break-all; font-size: 11px; } .src a { color: #36c; }
  table { border-collapse: collapse; } td, th { text-align: left; padding: .3rem .6rem; border-bottom: 1px solid #eee; vertical-align: top; }
</style>
</head>
<body>
<h1>Org logos — ${cards.length} with a logo, ${missing.length} without</h1>
<p class="meta">Each logo is drawn at 48px on white and on #0f1115. Amber cards are rasters under 64px. Regenerate with <code>bun scripts/fetch-logos.ts --review</code>.</p>
<div class="grid">
${cards.join("\n")}
</div>
<h2>No logo (${missing.length})</h2>
<table>
<tr><th>Org</th><th>Slug</th><th>Kind</th><th>Status</th><th>Why</th><th>URI</th></tr>
${missing.join("\n")}
</table>
</body>
</html>
`;
  mkdirSync("review", { recursive: true });
  await Bun.write(SHEET, html);
}

const orgs = readOrgs();
const report = await loadReport();
const saveReport = async () => {
  mkdirSync("review", { recursive: true });
  await Bun.write(REPORT, `${JSON.stringify(report, null, 2)}\n`);
};

const reject = flag("--reject");
if (reject) {
  const org = orgs.find((o) => o.slug === reject);
  if (!org) throw new Error(`no org ${reject}`);
  const reason = flag("--reason");
  if (!reason) throw new Error("--reject needs --reason <text>");
  removeLogos(org.dir);
  await writeMeta(org);
  report[org.slug] = { slug: org.slug, status: "rejected", reason, at: new Date().toISOString() };
  await saveReport();
  await writeSheet(orgs, report);
  console.log(`rejected ${org.slug}: ${reason}`);
  process.exit(0);
}

if (!args.includes("--review")) {
  const todo = orgs.filter((o) => {
    if (only) return o.slug === only;
    if (force) return true;
    // A rejected pick stays rejected until someone retries it explicitly.
    return !existingLogo(o.dir) && report[o.slug]?.status !== "rejected";
  });
  if (only && !todo.length) throw new Error(`no org ${only}`);
  const results: Result[] = [];
  let next = 0;
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (next < todo.length) {
        const org = todo[next++] as Org;
        if (!force && only !== org.slug && existingLogo(org.dir)) continue;
        const r = await fetchLogo(org).catch(
          (e): Result => ({
            slug: org.slug,
            status: "failed",
            reason: String(e),
            at: new Date().toISOString(),
          }),
        );
        results.push(r);
        report[org.slug] = r;
        console.error(
          `${r.status === "ok" ? "ok  " : "FAIL"} ${org.slug}${r.reason ? ` — ${r.reason}` : ""}`,
        );
      }
    }),
  );
  await saveReport();
  results.sort((a, b) => a.slug.localeCompare(b.slug));
  const pad = Math.max(4, ...results.map((r) => r.slug.length));
  console.log(`\n${"slug".padEnd(pad)}  status  detail`);
  for (const r of results) {
    const detail =
      r.status === "ok"
        ? `${r.file} ${r.width && r.height ? `${r.width}x${r.height}` : ""} ${r.bytes}B ${r.source}`
        : (r.reason ?? "");
    console.log(`${r.slug.padEnd(pad)}  ${r.status.padEnd(6)}  ${detail}`);
  }
  const ok = results.filter((r) => r.status === "ok").length;
  console.log(`\n${ok} ok, ${results.length - ok} failed`);
}
await writeSheet(orgs, report);
console.log(`contact sheet: ${SHEET}`);
