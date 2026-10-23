#!/usr/bin/env bun
// Organizations whose leaders signed an official ballot argument in California's voter guide,
// as sources: each signature becomes the organization's position on that proposition (Yes or
// No), with the signer and the argument named in the statement and the guide page as source.
//
// Reads the propositions from the published voter guide (guides.json → the CA guide), checking
// each item against the guide manifest's hashes. Only signers who speak for their organization
// count (president, CEO, executive director, chair, or another senior officer); board members,
// past or incoming officers, rank-and-file members and staff, "former" titles, government bodies
// and places are left out (SIGNERS below, reviewed by hand). Organizations already in the catalog
// gain a position only where they have none on that proposition; a conflict is reported, never
// overwritten. New organizations get a bundle of their own, attributed as `inferred`.
// Dry run by default.
//
//   bun scripts/ca-ballot-arguments.ts 2026-11-03 [--apply]

import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { SIGNERS, type Target, speaksFor } from "./lib/argument-signers";

const election = process.argv[2];
if (!election) throw new Error("usage: ca-ballot-arguments.ts <election> [--apply]");
const apply = process.argv.includes("--apply");
const GUIDES = "https://cinderblock.github.io/openslate-public-endorsements/guides.json";
// The guide pages as saved by the ballot repo, pinned to the commit the guide was built from.
const SAVED_PAGES = "https://github.com/cinderblock/openslate-ballot-ca-2026-11-03/blob/5f20bcbcd58b577bdb76fa71f0afead9d36e2f21/evidence";

interface Subject {
  title: string;
  kind?: string;
  jurisdiction?: string;
  election?: string;
}
interface Signer {
  name: string;
  title?: string;
  organization?: string;
}
interface Argument {
  side: string;
  rebuttal: boolean;
  signers: Signer[];
  source: string;
}
interface Item {
  subject: Subject;
  retrieved_at: string;
  arguments?: Argument[];
}
interface Position {
  subject: Subject;
  stance: string;
  choice?: string;
  statement?: string;
  source?: string;
}
interface Bundle {
  context?: { title?: string; jurisdiction?: string; election?: string };
  attribution?: {
    of: { name: string; uri?: string; kind?: string };
    mode: string;
    retrieved_at: string;
    sources?: string[];
  };
  positions: Position[];
}

// ---------------------------------------------------------------- the guide

async function json<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  return (await response.json()) as T;
}
async function sha256(bytes: Uint8Array): Promise<string> {
  const digest = new Uint8Array(await crypto.subtle.digest("SHA-256", new Uint8Array(bytes)));
  return Array.from(digest, (b) => b.toString(16).padStart(2, "0")).join("");
}

const list = await json<{ guides: { election: string; jurisdiction: string; url: string }[] }>(GUIDES);
const guide = list.guides.find((g) => g.election === election && g.jurisdiction === "us/ca");
if (!guide) throw new Error(`no CA guide for ${election} in ${GUIDES}`);
const token = (await (await fetch(guide.url)).text()).trim();
const manifest = JSON.parse(Buffer.from(token.split(".")[1] as string, "base64url").toString("utf8")) as {
  items: { subject: Subject; file: string }[];
  files: Record<string, string>;
};

const items: Item[] = [];
for (const listed of manifest.items.filter((i) => /Proposition \d+/.test(i.subject.title))) {
  const bytes = new Uint8Array(await (await fetch(new URL(listed.file, guide.url))).arrayBuffer());
  if ((await sha256(bytes)) !== manifest.files[listed.file]) throw new Error(`${listed.file} doesn't match the guide`);
  items.push(JSON.parse(new TextDecoder().decode(bytes)) as Item);
}

// ---------------------------------------------------------------- signatures → positions

/** "the argument in favor of", "the rebuttal to the argument against", … (followed by the proposition). */
const LABEL = (a: Argument) => {
  const argument = a.side === "Yes" ? "the argument in favor of" : "the argument against";
  if (!a.rebuttal) return argument;
  return a.side === "Yes" ? "the rebuttal to the argument against" : "the rebuttal to the argument in favor of";
};

interface Signed {
  target: Target;
  item: Item;
  side: string;
  pieces: { argument: Argument; signer: Signer }[];
}
const signed = new Map<string, Signed>();
const unknown = new Set<string>();
const left: string[] = [];
for (const item of items) {
  for (const argument of item.arguments ?? []) {
    for (const signer of argument.signers) {
      if (!signer.organization) continue;
      if (!(signer.organization in SIGNERS)) {
        unknown.add(signer.organization);
        continue;
      }
      const target = SIGNERS[signer.organization];
      if (!target || !speaksFor(signer.title)) {
        left.push(`${signer.name}, ${signer.title ?? "?"}, ${signer.organization}`);
        continue;
      }
      const key = `${target.slug}|${item.subject.title}`;
      const entry = signed.get(key) ?? { target, item, side: argument.side, pieces: [] };
      if (entry.side !== argument.side) throw new Error(`${target.name} signed both sides of ${item.subject.title}`);
      entry.pieces.push({ argument, signer });
      signed.set(key, entry);
    }
  }
}
if (unknown.size > 0) {
  throw new Error(`organizations not reviewed yet (add them to SIGNERS):\n  ${[...unknown].join("\n  ")}`);
}

function propNumber(title: string): string {
  return /Proposition (\d+)/.exec(title)?.[1] ?? title;
}
function statementOf(entry: Signed): string {
  const prop = `Proposition ${propNumber(entry.item.subject.title)}`;
  const labels = [...new Set(entry.pieces.map((p) => LABEL(p.argument)))];
  const people = [...new Set(entry.pieces.map((p) => `${p.signer.name} (${p.signer.title})`))];
  return `${people.join(" and ")} signed ${labels.map((l) => `${l} ${prop}`).join(" and ")} in the official voter guide.`;
}

// ---------------------------------------------------------------- write

const bySlug = new Map<string, Signed[]>();
for (const entry of signed.values()) bySlug.set(entry.target.slug, [...(bySlug.get(entry.target.slug) ?? []), entry]);

let added = 0;
let created = 0;
const already: string[] = [];
const conflicts: string[] = [];
for (const [slug, entries] of [...bySlug].sort(([a], [b]) => a.localeCompare(b))) {
  const target = (entries[0] as Signed).target;
  const dir = join("orgs", slug, election);
  const path = join(dir, "positions.json");
  const exists = existsSync(path);
  const sources = [...new Set(entries.flatMap((e) => e.pieces.map((p) => p.argument.source)))].sort();
  const retrieved = entries.map((e) => e.item.retrieved_at).sort().at(-1) as string;
  const bundle: Bundle = exists
    ? ((await Bun.file(path).json()) as Bundle)
    : {
        context: {
          title: `${target.name}: positions from signed ballot arguments, ${election} California general election`,
          jurisdiction: "us/ca",
          election,
        },
        attribution: { of: { name: target.name, kind: target.kind }, mode: "inferred", retrieved_at: retrieved, sources: [] },
        positions: [],
      };
  let changed = !exists;
  for (const entry of entries.sort((a, b) => Number(propNumber(a.item.subject.title)) - Number(propNumber(b.item.subject.title)))) {
    const current = bundle.positions.find((p) => p.subject.title === entry.item.subject.title);
    if (current) {
      const agrees = current.choice === entry.side && ["endorse", "lean_for"].includes(current.stance);
      (agrees ? already : conflicts).push(
        `${slug}: Prop ${propNumber(entry.item.subject.title)} ${agrees ? "already" : `has ${current.stance} ${current.choice}, signed for`} ${entry.side}`,
      );
      continue;
    }
    bundle.positions.push({
      subject: entry.item.subject,
      stance: "endorse",
      choice: entry.side,
      statement: statementOf(entry),
      source: entry.pieces[0]?.argument.source,
    });
    if (bundle.attribution) {
      bundle.attribution.sources = [...new Set([...(bundle.attribution.sources ?? []), ...sources])];
    }
    added++;
    changed = true;
  }
  if (!changed) continue;
  console.log(`${exists ? "update" : "create"} ${path} (${bundle.positions.length} positions)`);
  if (!apply) continue;
  mkdirSync(dir, { recursive: true });
  await Bun.write(path, `${JSON.stringify(bundle, null, 2)}\n`);
  if (!exists) {
    created++;
    const pages = sources.map((url) => `- ${url}\n  saved: ${SAVED_PAGES}${new URL(url).pathname}`);
    await Bun.write(
      join(dir, "evidence", "NOTES.md"),
      [
        `# ${target.name}: evidence`,
        "",
        "Each position comes from an official ballot argument in California's voter guide",
        "that a leader of the organization signed; the signer and the argument are named in",
        "the position's statement. The guide's pages:",
        "",
        ...pages,
        "",
      ].join("\n"),
    );
    const metaPath = join("orgs", slug, "meta.yaml");
    if (!existsSync(metaPath)) {
      await Bun.write(
        metaPath,
        `name: ${JSON.stringify(target.name)}\nslug: ${slug}\nkind: ${target.kind}\nabout: |\n  Its positions here come only from official ballot arguments in California's\n  voter guide that its leaders signed (scripts/ca-ballot-arguments.ts). The\n  organization may not have published endorsements of its own.\n`,
      );
    }
  }
}

console.log(`\n${added} positions added, ${created} new bundles${apply ? "" : " (dry run; --apply to write)"}`);
if (already.length) console.log(`\nAlready recorded (${already.length}):\n  ${already.join("\n  ")}`);
if (conflicts.length) console.log(`\nCONFLICTS, left as they are (${conflicts.length}):\n  ${conflicts.join("\n  ")}`);
console.log(`\nSignatures that don't count as an organization's position (${left.length}):\n  ${left.join("\n  ")}`);
