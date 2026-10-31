#!/usr/bin/env bun
// Point each slate at the capture run holding its sources: `attribution.capture`, which its
// signature then covers (OpenSlate SPEC §3.9.1). Run after a capture.
//
//   bun scripts/pin-capture.ts <openslate-source-captures checkout>
//
// Mechanical, so no slate is treated differently from another. A slate takes the newest witnessed
// run holding every source it cites and every document the capture repo lists for it, and a failed
// fetch counts: a 404 is part of the record. It keeps its pointer while that run still holds them
// all, because a pointer is signed content and moving one reissues the slate: without this, each
// daily capture would make every voter's app download every slate. A slate citing something no run
// holds yet waits for the next capture.
//
// The pointer says which record to look at, not what the record shows. Verifiers recompute that.

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { CAPTURES_REPO } from "./lib/provenance";

export interface Capture {
  run: string;
  manifest_sha256: string;
  provenance: string;
}

export interface Run {
  id: string;
  manifestSha256: string;
  holds: Set<string>;
}

/**
 * The run a slate should carry: the one it has while that still holds all its sources, otherwise
 * the newest that does, otherwise none yet. `runs` is newest first.
 */
export function runToPin(
  sources: string[],
  current: string | undefined,
  runs: Run[],
): Run | undefined {
  const holdsAll = ({ holds }: Run) => sources.every((url) => holds.has(url));
  const pinned = runs.find(({ id }) => id === current);
  return pinned && holdsAll(pinned) ? pinned : runs.find(holdsAll);
}

/** Where the object opening at `open` closes. */
function objectEnd(text: string, open: number): number {
  let depth = 0;
  let inString = false;
  for (let at = open; at < text.length; at++) {
    const character = text[at];
    if (inString) {
      if (character === "\\") at++;
      else if (character === '"') inString = false;
    } else if (character === '"') inString = true;
    else if (character === "{") depth++;
    else if (character === "}" && --depth === 0) return at;
  }
  throw new Error("unbalanced braces");
}

/**
 * `text` with `attribution.capture` set and every other byte as it was. Bundles aren't all formatted
 * the way JSON.stringify would, and a pin mustn't reformat a file a person is reading diffs of.
 */
export function withCapture(text: string, capture: Capture): string {
  const eol = text.includes("\r\n") ? "\r\n" : "\n";
  const open = /^\s*"attribution"\s*:\s*\{/m.exec(text);
  if (!open) throw new Error("no attribution");
  const start = open.index + open[0].length - 1;
  const end = objectEnd(text, start) + 1;
  let block = text.slice(start, end);

  const existing = /,?\s*"capture"\s*:\s*\{/.exec(block);
  if (existing) {
    const opening = existing.index + existing[0].length - 1;
    block = block.slice(0, existing.index) + block.slice(objectEnd(block, opening) + 1);
  }

  const closing = block.lastIndexOf("}");
  const indent = /([ \t]*)$/.exec(block.slice(0, closing))?.[1] ?? "";
  const member = `${indent}  `;
  const field = JSON.stringify(capture, null, 2)
    .split("\n")
    .map((line, index) => (index === 0 ? line : `${member}${line}`))
    .join(eol);
  const body = block.slice(0, closing).trimEnd();
  const updated = `${body},${eol}${member}"capture": ${field}${eol}${indent}}`;
  const result = text.slice(0, start) + updated + text.slice(end);

  // The one thing this must not get wrong, so it's checked rather than assumed.
  const before = JSON.parse(text);
  const after = JSON.parse(result);
  before.attribution.capture = capture;
  if (JSON.stringify(sorted(before)) !== JSON.stringify(sorted(after))) {
    throw new Error("pinning changed more than attribution.capture");
  }
  return result;
}

const sorted = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(sorted);
  if (value === null || typeof value !== "object") return value;
  const entries = Object.entries(value).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
  return Object.fromEntries(entries.map(([key, inner]) => [key, sorted(inner)]));
};

interface Bundle {
  attribution?: { sources?: string[]; capture?: Capture };
  positions?: { source?: string }[];
}

/** Every URL the slate cites, as the capture repo's source list reads them. */
export const citedBy = ({ attribution, positions }: Bundle): string[] => [
  ...new Set([
    ...(attribution?.sources ?? []),
    ...(positions ?? []).flatMap(({ source }) => (source ? [source] : [])),
  ]),
];

/**
 * What the capture list holds for each slate beyond its citations: the documents it was read from,
 * and data found behind its pages. Those are its sources too, so its run has to hold them.
 */
export function listedFor(sources: { url: string; cited_by: string[]; origin: string }[]) {
  const listed = new Map<string, string[]>();
  for (const { url, cited_by, origin } of sources) {
    if (origin === "cited") continue;
    for (const id of cited_by) listed.set(id, [...(listed.get(id) ?? []), url]);
  }
  return listed;
}

/** Witnessed runs, newest first. A run's id sorts by time; only a CI run has an attestation. */
function loadRuns(captures: string): Run[] {
  const root = join(captures, "runs");
  return readdirSync(root)
    .filter((id) => existsSync(join(root, id, "manifest.sigstore.json")))
    .sort()
    .reverse()
    .map((id) => {
      const bytes = readFileSync(join(root, id, "manifest.json"));
      const manifest = JSON.parse(bytes.toString("utf8")) as { captures: { intended: string }[] };
      return {
        id,
        manifestSha256: createHash("sha256").update(bytes).digest("hex"),
        holds: new Set(manifest.captures.map(({ intended }) => intended)),
      };
    });
}

if (import.meta.main) {
  const captures = process.argv[2];
  if (!captures) throw new Error("usage: pin-capture.ts <openslate-source-captures checkout>");
  const runs = loadRuns(captures);
  const listed = listedFor(JSON.parse(readFileSync(join(captures, "sources.json"), "utf8")).sources);
  const commit = execFileSync("git", ["-C", captures, "rev-parse", "HEAD"]).toString().trim();
  const raw = CAPTURES_REPO.replace("github.com", "raw.githubusercontent.com");

  const counts = { pinned: 0, kept: 0, waiting: 0, no_sources: 0 };
  for (const org of readdirSync("orgs")) {
    if (!statSync(join("orgs", org)).isDirectory()) continue;
    for (const election of readdirSync(join("orgs", org))) {
      const file = join("orgs", org, election, "positions.json");
      if (!existsSync(file)) continue;
      const text = readFileSync(file, "utf8");
      const bundle = JSON.parse(text) as Bundle;
      const sources = citedBy(bundle);
      if (!bundle.attribution || sources.length === 0) {
        counts.no_sources++;
        continue;
      }
      const current = bundle.attribution.capture?.run;
      const target = runToPin([...sources, ...(listed.get(`${org}/${election}`) ?? [])], current, runs);
      if (target && target.id === current) {
        counts.kept++;
        continue;
      }
      if (!target || !existsSync(join(captures, "provenance", org, `${election}.json`))) {
        counts.waiting++;
        console.log(`waiting: ${org}/${election} cites a source no run holds yet`);
        continue;
      }
      const capture: Capture = {
        run: target.id,
        manifest_sha256: target.manifestSha256,
        provenance: `${raw}/${commit}/provenance/${org}/${election}.json`,
      };
      writeFileSync(file, withCapture(text, capture));
      counts.pinned++;
    }
  }
  console.log(`pin-capture: ${JSON.stringify(counts)}, newest witnessed run ${runs[0]?.id}`);
}
