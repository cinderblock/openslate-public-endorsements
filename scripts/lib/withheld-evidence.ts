// Which evidence files stay out of this public repo: saved copies of news pages, their publishers'
// copyrighted work. The rule is the one openslate-source-captures/src/sources.ts applies to its raw
// bytes, which is the canonical copy: a host is withheld if a news organization or editorial board
// cites it, or it's in scripts/data/withheld-hosts.json. It's by host because many papers here are
// `kind: organization`, and a party or union can cite a paper's page.

import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import extra from "../data/withheld-hosts.json";

/** Beside the other evidence: what's kept private, and how to check a copy of it. */
export const MANIFEST = "withheld.json";

/** Ours, not a copy of a page: NOTES.md is the researcher's, articles.md holds no article text. */
const OUR_OWN = new Set(["NOTES.md", "articles.md", MANIFEST]);

const NEWS_KINDS = new Set(["news_organization", "editorial_board"]);

export interface WithheldFile {
  /** Path inside the evidence folder, `/`-separated. */
  path: string;
  /** Where the page came from, when the saved file says. */
  url?: string;
  bytes: number;
  /** Of `lfBytes`, so a checkout on any platform gives the same answer. */
  sha256: string;
}

export interface Manifest {
  note: string;
  files: WithheldFile[];
}

export const MANIFEST_NOTE =
  "Saved copies of these pages are kept private: they're their publishers' copyrighted work. The hashes let a copy shared on request be checked.";

interface Bundle {
  attribution?: { sources?: string[]; of?: { kind?: string } };
  positions?: { source?: string }[];
}

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return url;
  }
}

export const isNewsBundle = (bundle: Bundle) => NEWS_KINDS.has(bundle.attribution?.of?.kind ?? "");

/** Pure: every host a news bundle cites, and the ones listed by hand. */
export function newsHosts(bundles: Bundle[], listed: string[] = extra.news): Set<string> {
  const hosts = new Set(listed);
  for (const bundle of bundles.filter(isNewsBundle)) {
    for (const url of bundle.attribution?.sources ?? []) hosts.add(hostOf(url));
    for (const { source } of bundle.positions ?? []) if (source) hosts.add(hostOf(source));
  }
  return hosts;
}

/** The URL a saved page names at its top: its `**URL**:` line, else the first link. */
export function sourceUrl(text: string): string | undefined {
  const head = text.slice(0, 2000);
  return (
    head.match(/\*\*(?:Source )?URL\*\*:\s*(https?:\/\/\S+)/i)?.[1] ??
    head.match(/https?:\/\/[^\s)>"'\]]+/)?.[0]
  );
}

/** Pure: does this evidence file stay private? */
export function isWithheld(
  path: string,
  text: string,
  bundle: Bundle,
  hosts: Set<string>,
): boolean {
  if (OUR_OWN.has(path)) return false;
  if (isNewsBundle(bundle)) return true;
  const url = sourceUrl(text);
  return Boolean(url && hosts.has(hostOf(url)));
}

/** A checkout's bytes as git stores them: CRLF working copies on Windows hash like LF ones. */
export function lfBytes(bytes: Buffer): Buffer {
  if (bytes.includes(0)) return bytes;
  return Buffer.from(bytes.toString("latin1").replaceAll("\r\n", "\n"), "latin1");
}

export const sha256 = (bytes: Buffer) => createHash("sha256").update(bytes).digest("hex");

function filesIn(dir: string, root = dir): string[] {
  const items = readdirSync(dir, { withFileTypes: true });
  items.sort((x, y) => x.name.localeCompare(y.name));
  return items.flatMap((item) => {
    const full = join(dir, item.name);
    return item.isDirectory() ? filesIn(full, root) : [relative(root, full).split(sep).join("/")];
  });
}

export interface Found {
  /** "<slug>/<election>" */
  id: string;
  dir: string;
  files: string[];
}

/** Every bundle's parsed positions.json, by "<slug>/<election>", sorted: file order varies by OS. */
function readBundles(orgs: string): Map<string, Bundle> {
  const bundles = new Map<string, Bundle>();
  for (const slug of readdirSync(orgs).sort()) {
    if (!existsSync(join(orgs, slug, "meta.yaml"))) continue;
    for (const election of readdirSync(join(orgs, slug)).sort()) {
      const path = join(orgs, slug, election, "positions.json");
      if (existsSync(path)) {
        bundles.set(`${slug}/${election}`, JSON.parse(readFileSync(path, "utf8")) as Bundle);
      }
    }
  }
  return bundles;
}

/** Every bundle's evidence files that should be private but are sitting in this repo. */
export function findWithheld(orgs: string): Found[] {
  const bundles = readBundles(orgs);
  const hosts = newsHosts([...bundles.values()]);
  const found: Found[] = [];
  for (const [id, bundle] of bundles) {
    const dir = join(orgs, id, "evidence");
    if (!existsSync(dir)) continue;
    const files = filesIn(dir).filter((path) =>
      isWithheld(path, readFileSync(join(dir, path), "latin1"), bundle, hosts),
    );
    if (files.length) found.push({ id, dir, files });
  }
  return found;
}

export function readManifest(dir: string): Manifest | null {
  const path = join(dir, MANIFEST);
  return existsSync(path) ? (JSON.parse(readFileSync(path, "utf8")) as Manifest) : null;
}
