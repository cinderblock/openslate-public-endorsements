#!/usr/bin/env bun
// An organization's own signed slate: `orgs/<slug>/<election>/firsthand.slate`, beside (or
// instead of) the researcher's report of it in `positions.json`. The organization signs it with
// its own key in the OpenSlate app; this repo never re-signs it. SUBMIT.md says how it gets here.
//
// The key must be one `orgs/<slug>/meta.yaml` lists under `keys:`, where a maintainer adds it
// once they've confirmed out of band that it's the organization's. That listing is the whole of
// the trust: it's why the app may show the slate as the organization's, "signed by them", and
// let it speak for the organization over the report (SPEC §7.1).
//
//   bun scripts/firsthand.ts            check every firsthand.slate (both workflows run this)
//   bun scripts/firsthand.ts --index    after `sign --batch`: list each in ./index.json, and mark
//                                       the report of that organization and election superseded
//
// A check fails on what would make the slate wrong to list: a bad signature, a key meta.yaml
// doesn't list, a secondhand report, the wrong election, or an expired slate. Races and names the
// ballot doesn't have are only warnings: the slate is the organization's own words, signed, so
// nobody here can correct it; the warnings are for the maintainer to pass back. On a pull request
// the check also looks for the key at the organization's own /.well-known/openslate.json
// (SPEC §7), and writes everything a reviewer needs to the job summary.

import { appendFileSync, existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import {
  type CatalogIndexEntry,
  catalogEntry,
  type SlatePayload,
  verifySlate,
} from "../.openslate/packages/core/src/index";
import { ballotFrom, checkBundle, describe, describeWarning, loadBundles } from "./ballot";

export const FIRSTHAND = "firsthand.slate";

/** A key an organization signs with, as `meta.yaml` lists it. */
export interface OrgKey {
  key: string;
  /** When a maintainer added it (YYYY-MM-DD). */
  added?: string;
  /** How the maintainer confirmed it's the organization's. */
  confirmed?: string;
}

/** What `meta.yaml` says about an organization. */
export interface OrgMeta {
  name?: string;
  uri?: string;
  kind?: string;
  keys: OrgKey[];
}

export function parseMeta(text: string): OrgMeta {
  const raw = (Bun.YAML.parse(text) ?? {}) as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : undefined);
  const keys = Array.isArray(raw.keys)
    ? raw.keys.flatMap((k): OrgKey[] => {
        const entry = (typeof k === "string" ? { key: k } : k) as Record<string, unknown>;
        const key = str(entry?.key);
        if (!key) return [];
        const added =
          entry.added instanceof Date ? entry.added.toISOString().slice(0, 10) : str(entry.added);
        const confirmed = str(entry.confirmed);
        return [{ key, ...(added ? { added } : {}), ...(confirmed ? { confirmed } : {}) }];
      })
    : [];
  const name = str(raw.name);
  const uri = str(raw.uri);
  const kind = str(raw.kind);
  return { ...(name ? { name } : {}), ...(uri ? { uri } : {}), ...(kind ? { kind } : {}), keys };
}

export interface Checked {
  /** Repo-relative path of the slate. */
  path: string;
  slug: string;
  election: string;
  payload?: SlatePayload;
  /** Reasons not to list it. */
  problems: string[];
  /** Worth telling the organization; listed anyway. */
  warnings: string[];
}

/** The elections a slate's positions and articles are for. */
function electionsOf(payload: SlatePayload): Set<string> {
  const out = new Set<string>();
  for (const { subject } of [...payload.positions, ...(payload.articles ?? [])]) {
    const election = subject.election ?? payload.context?.election;
    if (election) out.add(election);
  }
  if (payload.context?.election) out.add(payload.context.election);
  return out;
}

/**
 * Check one organization's own slate: signed by a key its meta.yaml lists, firsthand, for the
 * election its folder names, and not expired.
 */
export function checkFirsthand(
  token: string,
  where: { slug: string; election: string; path: string },
  meta: OrgMeta | undefined,
  now: Date = new Date(),
): Checked {
  const out: Checked = { ...where, problems: [], warnings: [] };
  if (token.split(/\s+/).filter(Boolean).length !== 1) {
    out.problems.push("the file must hold exactly one slate token, on one line");
    return out;
  }
  const result = verifySlate(token.trim());
  if (!result.valid || !result.payload) {
    out.problems.push(`not a valid signed slate: ${result.errors.join("; ")}`);
    return out;
  }
  const payload = result.payload;
  out.payload = payload;
  if (payload.attribution) {
    out.problems.push(
      `it's a secondhand report (attribution: ${payload.attribution.of.name}); only an organization's own slate goes in ${FIRSTHAND}`,
    );
  }
  if (!meta) {
    out.problems.push(`orgs/${where.slug}/meta.yaml is missing`);
  } else if (!meta.keys.some((k) => k.key === payload.issuer.key)) {
    out.problems.push(
      `signed by ${payload.issuer.key}, which orgs/${where.slug}/meta.yaml doesn't list under keys: (a maintainer adds it once it's confirmed to be the organization's; see SUBMIT.md)`,
    );
  }
  const elections = electionsOf(payload);
  if (elections.size === 0) {
    out.problems.push(
      `it doesn't say what election it's for (context.election "${where.election}")`,
    );
  } else if ([...elections].some((e) => e !== where.election)) {
    out.problems.push(
      `it's for ${[...elections].sort().join(", ")}, but sits in the folder for ${where.election}`,
    );
  }
  if (payload.expires_at && new Date(payload.expires_at) < now) {
    out.problems.push(`it expired ${payload.expires_at}`);
  }
  if (payload.positions.length === 0 && !payload.adopts?.length) {
    out.problems.push("it has no positions");
  }
  return out;
}

function listDirs(p: string): string[] {
  if (!existsSync(p)) return [];
  return readdirSync(p)
    .sort((a, b) => a.localeCompare(b))
    .filter((n) => {
      try {
        return statSync(join(p, n)).isDirectory();
      } catch {
        return false;
      }
    });
}

export function readMeta(root: string, slug: string): OrgMeta | undefined {
  const file = join(root, "orgs", slug, "meta.yaml");
  return existsSync(file) ? parseMeta(readFileSync(file, "utf8")) : undefined;
}

/** Every `orgs/<slug>/<election>/firsthand.slate`, checked. */
export function checkAll(root: string, now?: Date): Checked[] {
  const out: Checked[] = [];
  for (const slug of listDirs(join(root, "orgs"))) {
    for (const election of listDirs(join(root, "orgs", slug))) {
      const file = join(root, "orgs", slug, election, FIRSTHAND);
      if (!existsSync(file)) continue;
      const path = `orgs/${slug}/${election}/${FIRSTHAND}`;
      out.push(
        checkFirsthand(
          readFileSync(file, "utf8"),
          { slug, election, path },
          readMeta(root, slug),
          now,
        ),
      );
    }
  }
  return out;
}

/**
 * The catalog with each organization's own slate listed: after the reports of that organization,
 * saying who it is as those reports name it (`reported_as`), and each report for the same election
 * pointing at it (`superseded_by`). An organization with no report yet is named from its meta.yaml.
 */
export function withFirsthand(
  entries: CatalogIndexEntry[],
  slates: Array<Checked & { payload: SlatePayload }>,
  metaOf: (slug: string) => OrgMeta | undefined,
): CatalogIndexEntry[] {
  const out = entries.map((entry) => {
    const own = slates.find((s) => s.slug === entry.slug && s.election === entry.election);
    return own && entry.attribution ? { ...entry, superseded_by: own.path } : entry;
  });
  for (const slate of slates) {
    const reports = entries.filter((e) => e.slug === slate.slug && e.attribution);
    const report = reports.find((e) => e.election === slate.election) ?? reports.at(-1);
    const meta = metaOf(slate.slug);
    const of =
      report?.attribution?.of ??
      (meta?.name
        ? {
            name: meta.name,
            ...(meta.uri ? { uri: meta.uri } : {}),
            ...(meta.kind ? { kind: meta.kind } : {}),
          }
        : undefined);
    const entry: CatalogIndexEntry = {
      ...catalogEntry(slate.payload, slate),
      ...(of ? { reported_as: of } : {}),
    };
    // Beside its report: `sign --batch` sorts by slug, then election.
    const at = out.findLastIndex(
      (e) =>
        e.slug.localeCompare(slate.slug) < 0 ||
        (e.slug === slate.slug && e.election.localeCompare(slate.election) <= 0),
    );
    out.splice(at + 1, 0, entry);
  }
  return out;
}

/** Whether the organization's own site lists the key (SPEC §7), for the reviewer: never a failure. */
async function attestedByDomain(uri: string | undefined, key: string): Promise<string> {
  if (!uri) return "meta.yaml has no uri to look for /.well-known/openslate.json at";
  let url: URL;
  try {
    url = new URL("/.well-known/openslate.json", uri);
  } catch {
    return `meta.yaml's uri ${uri} isn't a URL`;
  }
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(10_000) });
    if (!response.ok) return `${url} answered ${response.status}`;
    const doc = (await response.json()) as { keys?: Array<{ key?: string }> };
    return doc.keys?.some((k) => k.key === key) ? `**listed** at ${url}` : `${url} doesn't list it`;
  } catch (err) {
    return `couldn't read ${url} (${err instanceof Error ? err.message : String(err)})`;
  }
}

/** Ballot warnings for an organization's own slate: what to tell them, never a failure. */
async function ballotWarnings(root: string, checked: Checked[]): Promise<void> {
  const listings = ballotFrom((await loadBundles(root)).map((b) => b.bundle));
  for (const c of checked) {
    if (!c.payload) continue;
    const check = checkBundle(
      {
        positions: c.payload.positions,
        ...(c.payload.context ? { context: c.payload.context } : {}),
      },
      listings,
    );
    // "fix": a listed name, spelled another way or without its choice_id. The app places those.
    const misplaced = check.problems.filter((p) => p.kind === "race" || p.kind === "choice");
    c.warnings.push(...misplaced.map(describe), ...check.warnings.map(describeWarning));
  }
}

if (import.meta.main) {
  const root = process.cwd();
  const indexing = process.argv.includes("--index");
  const checked = checkAll(root);
  const failed = checked.filter((c) => c.problems.length > 0);

  if (indexing) {
    if (failed.length) {
      for (const c of failed)
        console.error(`FAIL  ${c.path}\n      ${c.problems.join("\n      ")}`);
      process.exit(1);
    }
    const indexFile = join(root, "index.json");
    const index = JSON.parse(readFileSync(indexFile, "utf8")) as { entries: CatalogIndexEntry[] };
    const good = checked.filter((c): c is Checked & { payload: SlatePayload } =>
      Boolean(c.payload),
    );
    index.entries = withFirsthand(index.entries, good, (slug) => readMeta(root, slug));
    await Bun.write(indexFile, `${JSON.stringify(index, null, 2)}\n`);
    const superseded = index.entries.filter((e) => e.superseded_by).length;
    console.log(
      `firsthand: listed ${good.length} organization-signed slate(s), ${superseded} report(s) superseded`,
    );
    process.exit(0);
  }

  await ballotWarnings(root, checked);
  const summary: string[] = [];
  for (const c of checked) {
    const meta = readMeta(root, c.slug);
    const key = c.payload?.issuer.key;
    const listed = meta?.keys.find((k) => k.key === key);
    const status = c.problems.length ? "FAIL" : "OK  ";
    console.log(
      `${status}  ${c.path}  (${c.payload?.positions.length ?? 0} positions, signed by ${c.payload?.issuer.name ?? "?"})`,
    );
    for (const p of c.problems) console.log(`      ${p}`);
    for (const w of c.warnings) console.log(`      warning: ${w}`);
    const domain = key ? await attestedByDomain(meta?.uri, key) : "no key";
    summary.push(
      `### ${c.problems.length ? "❌" : "✅"} \`${c.path}\``,
      "",
      `- Signed by **${c.payload?.issuer.name ?? "(no name)"}**, key \`${key ?? "?"}\``,
      `- meta.yaml: ${listed ? `lists this key${listed.confirmed ? `, confirmed: ${listed.confirmed}` : ", **with no note of how it was confirmed**"}` : "**doesn't list this key**"}`,
      `- The organization's site: ${domain}`,
      `- ${c.payload?.positions.length ?? 0} positions`,
      ...c.problems.map((p) => `- **Problem:** ${p}`),
      ...(c.warnings.length
        ? [
            `- ${c.warnings.length} not on the ballot as listed (tell the organization; still listed):`,
            ...c.warnings.slice(0, 50).map((w) => `  - ${w}`),
          ]
        : []),
      "",
    );
  }
  console.log(
    `\n${checked.length - failed.length} organization-signed slate(s) OK, ${failed.length} failed`,
  );
  const summaryFile = process.env.GITHUB_STEP_SUMMARY;
  if (summaryFile && checked.length) {
    appendFileSync(summaryFile, `## Organization-signed slates\n\n${summary.join("\n")}\n`);
  }
  if (failed.length) process.exit(1);
}
