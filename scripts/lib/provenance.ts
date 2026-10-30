// Where a slate's sources were captured: one file per slate, provenance/<org>/<election>.json, in
// openslate-source-captures. The types are copied from that repo's src/provenance.ts, which is the
// canonical copy. The file lives there so a sweep that changes no position doesn't republish a
// slate, and everything here treats it as optional: a build or check without it still works.

import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

export const PROVENANCE_FORMAT = "openslate-source-provenance/1";
export const CAPTURES_REPO = "https://github.com/cinderblock/openslate-source-captures";

export type Claim =
  /** Raw bytes exist and their hash is sealed. */
  | "captured"
  /** Two independent authorities timestamped the run. */
  | "time-stamped"
  /** A pinned public workflow on a GitHub-hosted runner produced the run. */
  | "witnessed-by-public-ci"
  /** An Internet Archive snapshot's text agrees with what the slate used. */
  | "independently-archived";

/** Exact, or the source sits somewhere other than the organization's own domain. */
export interface HostFact {
  match: "exact" | "subdomain" | "hosted-elsewhere" | "unknown";
  host: string;
  /** Host of attribution.of.uri, when the bundle has one. */
  org_host: string | null;
}

export interface CaptureRef {
  run: string;
  /** Position in the manifest's captures array. */
  index: number;
  captured_at: string;
  status: number | null;
  error: string | null;
  final_url: string;
  response_sha256: string;
  /** Where the bytes are: the capture repo, the private store, or the large-blobs release. */
  bytes: "public" | "withheld" | "release";
  claims: Claim[];
}

export interface Archived {
  url: string;
  /** Wayback's 14-digit timestamp. */
  timestamp: string;
  /** Wayback's base32 SHA-1 of the page as it stored it. */
  digest: string;
}

/** How the slate's text relates to this source. Facts only: a failed anchor isn't a judgement. */
export interface Derivation {
  kind: "anchored" | "not-checkable";
  /** Why it couldn't be checked: no bytes, a PDF, an image, a non-200. */
  reason?: string;
  exact: number;
  quoted_parts: number;
  unanchored: number;
  /** Positions citing this source with no statement to check. */
  no_statement: number;
}

export interface SourceProvenance {
  url: string;
  positions: number;
  host: HostFact;
  /** The newest capture, whatever it was. A 404 here is the record that the page went away. */
  latest: CaptureRef | null;
  /** The newest capture that returned 200, if that isn't `latest`. */
  last_ok: CaptureRef | null;
  archived: Archived | null;
  derivation: Derivation;
}

export interface SlateProvenance {
  format: typeof PROVENANCE_FORMAT;
  org: string;
  election: string;
  /** "scraped", "transcribed", "inferred", as the bundle says. */
  mode: string | null;
  org_uri: string | null;
  generated_from: { endorsements_commit: string; runs: string[] };
  sources: SourceProvenance[];
}

/** One slate's file, or null if it's missing or isn't a format this code understands. */
export function readProvenance(
  root: string,
  org: string,
  election: string,
): SlateProvenance | null {
  const file = join(root, "provenance", org, `${election}.json`);
  if (!existsSync(file)) return null;
  try {
    const parsed = JSON.parse(readFileSync(file, "utf8")) as SlateProvenance;
    return parsed.format === PROVENANCE_FORMAT && Array.isArray(parsed.sources) ? parsed : null;
  } catch {
    return null;
  }
}

async function git(args: string[], cwd?: string) {
  const proc = Bun.spawn(["git", ...args], {
    cwd,
    stdout: "ignore",
    stderr: "ignore",
    timeout: 120_000,
  });
  if ((await proc.exited) !== 0) throw new Error(`git ${args[0]} failed`);
}

/**
 * The provenance files for a build: a local checkout if OPENSLATE_CAPTURES_DIR names one, otherwise
 * a shallow clone of only that directory, so the captured bytes never come down. Null if neither
 * works: evidence pages then render without capture details, and the build goes on.
 */
export async function provenanceRoot(): Promise<string | null> {
  const local = process.env.OPENSLATE_CAPTURES_DIR;
  if (local) return existsSync(join(local, "provenance")) ? local : null;
  const dir = mkdtempSync(join(tmpdir(), "openslate-provenance-"));
  try {
    await git([
      "clone",
      "--quiet",
      "--depth",
      "1",
      "--filter=blob:none",
      "--no-checkout",
      `${CAPTURES_REPO}.git`,
      dir,
    ]);
    await git(["sparse-checkout", "set", "provenance"], dir);
    await git(["checkout", "--quiet"], dir);
    if (existsSync(join(dir, "provenance"))) return dir;
  } catch {
    // Unreachable is the same as nothing there: fall through.
  }
  rmSync(dir, { recursive: true, force: true });
  return null;
}
