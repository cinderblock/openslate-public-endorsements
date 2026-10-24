#!/usr/bin/env bun
// Organizations that signed an official ballot argument in a county's voter guide, as sources:
// each signature becomes the organization's position on that measure (Yes or No), with who
// signed and which argument named in the statement and the guide page as source. The state
// guide's propositions are scripts/ca-ballot-arguments.ts's.
//
// Reads every county guide listed in guides.json, checking each item against the guide
// manifest's hashes. An organization signs in one of three ways:
//   - as itself: the signature is its name (San Francisco's "San Francisco Labor Council");
//   - through an officer who speaks for it, "President, San Diego Deputy Sheriffs Association"
//     (speaksFor); a title marked "*" is printed for identification only and doesn't count;
//   - Alameda's "s/ League of Women Voters Bay Area" with "by NAME, Title" beneath.
// Every organization named is reviewed by hand in scripts/lib/argument-signers.ts (SIGNERS),
// shared with the state script; an unreviewed one stops the run. Organizations already in the
// catalog gain a position only where they have none on that measure; a conflict is reported,
// never overwritten. New organizations get a bundle of their own, attributed as `inferred`.
// Dry run by default.
//
//   bun scripts/county-ballot-arguments.ts 2026-11-03 [--apply]

import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { SIGNERS, type Target, speaksFor } from "./lib/argument-signers";

const election = process.argv[2];
if (!election) throw new Error("usage: county-ballot-arguments.ts <election> [--apply]");
const apply = process.argv.includes("--apply");
const GUIDES = "https://cinderblock.github.io/openslate-public-endorsements/guides.json";

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
  paid?: boolean;
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
interface Guide {
  election: string;
  jurisdiction: string;
  title: string;
  url: string;
  repo?: string;
}

// ---------------------------------------------------------------- who signed for whom

/** Titles that lead an organization, printed before its name or after it. */
const ROLE =
  "(?:co-?president|president(?: (?:and|&) ceo)?|pres\\.|president/ceo|ceo|chief executive officer|executive director|chair(?:man|person|woman)?|co-?chair|commander|secretary-treasurer|business manager)";
const space = String.raw`\s+`;
// "President, X", "President of X", and in Santa Clara "President: X" and "President─X".
const ROLE_FIRST = new RegExp(
  `^(${ROLE})(?:,?${space}|\\s*[:─—–]\\s*)(?:of${space})?(?:the${space})?(.+)$`,
  "i",
);
const ROLE_LAST = new RegExp(`^(.+?),?${space}(${ROLE})$`, "i");
/** A signature that may be an organization's own name: worth a review if it isn't listed. */
const ORGISH =
  /\b(council|party|union|association|coalition|club|foundation|alliance|committee|action|network|inc\.?|chamber|federation|league|society|democrats|republicans|center|project|forward|bank|voters|educators|workers|caucus|organization|organizations|trust|fund|institute|collective|yimby|spur|todco|indivisible|church|congregation|cooperative|clinic|services|district)\b/i;
/** Officeholders sign as people ("Mayor Daniel Lurie", "Supervisor Alan Wong"). */
const OFFICEHOLDER =
  /^(mayor|supervisor|assemblymember|former|president|senator|board of supervisors|district \d+|speaker|controller|treasurer|assessor|state|california)\b/i;

interface Signature {
  printed: string;
  /** The organization's own signature, or an officer's who speaks for it. */
  counts: boolean;
  who: string;
}
/** The organization a signature is for, as printed, and whether it's the organization's position. */
function signatureOf(s: Signer): Signature | undefined {
  const title = s.title?.trim();
  if (s.organization) {
    return {
      printed: s.organization,
      counts: speaksFor(title),
      who: `${s.name}${title ? ` (${title})` : ""} for ${s.organization}`,
    };
  }
  if (!title) {
    if (s.name in SIGNERS || (ORGISH.test(s.name) && !OFFICEHOLDER.test(s.name))) {
      return { printed: s.name, counts: true, who: s.name };
    }
    return undefined;
  }
  // "*": the title is for identification only.
  if (/\*\s*$/.test(title)) return undefined;
  const first = ROLE_FIRST.exec(title);
  const last = first ? undefined : ROLE_LAST.exec(title);
  const role = first?.[1] ?? last?.[2];
  const printed = (first?.[2] ?? last?.[1])?.trim();
  if (!role || !printed) return undefined;
  return { printed, counts: speaksFor(role), who: `${s.name} (${title})` };
}

// ---------------------------------------------------------------- the guides

async function json<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  return (await response.json()) as T;
}
async function sha256(bytes: Uint8Array): Promise<string> {
  const digest = new Uint8Array(await crypto.subtle.digest("SHA-256", new Uint8Array(bytes)));
  return Array.from(digest, (b) => b.toString(16).padStart(2, "0")).join("");
}

const list = await json<{ guides: Guide[] }>(GUIDES);
const guides = list.guides.filter((g) => g.election === election && g.jurisdiction !== "us/ca");
const items: { guide: Guide; item: Item }[] = [];
for (const guide of guides) {
  const token = (await (await fetch(guide.url)).text()).trim();
  const manifest = JSON.parse(
    Buffer.from(token.split(".")[1] as string, "base64url").toString("utf8"),
  ) as { items: { subject: Subject; file: string }[]; files: Record<string, string> };
  for (const listed of manifest.items.filter((i) => i.subject.kind === "measure")) {
    const bytes = new Uint8Array(
      await (await fetch(new URL(listed.file, guide.url))).arrayBuffer(),
    );
    if ((await sha256(bytes)) !== manifest.files[listed.file]) {
      throw new Error(`${guide.url} ${listed.file} doesn't match the guide`);
    }
    const item = JSON.parse(new TextDecoder().decode(bytes)) as Item;
    if (item.arguments?.length) items.push({ guide, item });
  }
}

// ---------------------------------------------------------------- signatures → positions

/** "the argument in favor of", "the paid argument against", … (followed by the measure). */
function label(a: Argument): string {
  const kind = a.paid ? "paid argument" : "argument";
  if (!a.rebuttal) return `the ${kind} ${a.side === "Yes" ? "in favor of" : "against"}`;
  return `the rebuttal to the ${kind} ${a.side === "Yes" ? "against" : "in favor of"}`;
}
/** "Oakland — Measure EE (Governance Structure)" → "Oakland Measure EE". */
const measureName = (title: string) => title.replace(/\s*\(.*\)\s*$/, "").replace(/\s+—\s+/, " ");

interface Signed {
  target: Target;
  guide: Guide;
  item: Item;
  side: string;
  /** Each signature, with the guide it's in: one measure can be in two counties' guides (RTM). */
  pieces: { argument: Argument; who: string; guide: Guide }[];
}
const signed = new Map<string, Signed>();
const unknown = new Set<string>();
const left: string[] = [];
const bothSides: string[] = [];
for (const { guide, item } of items) {
  for (const argument of item.arguments ?? []) {
    for (const signer of argument.signers) {
      const signature = signatureOf(signer);
      if (!signature) continue;
      if (!(signature.printed in SIGNERS)) {
        unknown.add(`${signature.printed}   (${guide.jurisdiction}: ${signature.who})`);
        continue;
      }
      const target = SIGNERS[signature.printed];
      if (!target || !signature.counts) {
        left.push(`${guide.jurisdiction}: ${signature.who}`);
        continue;
      }
      const key = `${target.slug}|${item.subject.title}`;
      const entry = signed.get(key) ?? { target, guide, item, side: argument.side, pieces: [] };
      if (entry.side !== argument.side) {
        bothSides.push(`${target.name}: ${item.subject.title}`);
        continue;
      }
      entry.pieces.push({ argument, who: signature.who, guide });
      signed.set(key, entry);
    }
  }
}
if (unknown.size > 0) {
  throw new Error(
    `organizations not reviewed yet (add them to SIGNERS in scripts/lib/argument-signers.ts):\n  ${[...unknown].join("\n  ")}`,
  );
}
// An organization on both sides of one measure has no position to take from it.
for (const both of bothSides) {
  for (const [key, entry] of signed) {
    if (`${entry.target.name}: ${entry.item.subject.title}` === both) signed.delete(key);
  }
}

/** "San Francisco Voter Information Pamphlet"; "Orange County" → "Orange County voter guide". */
function guideName(guide: Guide): string {
  const name = guide.title.replace(/: .*$/, "");
  return /guide|pamphlet/i.test(name) ? name : `${name} voter guide`;
}

/** Who signed what, guide by guide. */
function statementOf(entry: Signed): string {
  const measure = measureName(entry.item.subject.title);
  const byGuide = new Map<Guide, Signed["pieces"]>();
  for (const p of entry.pieces) byGuide.set(p.guide, [...(byGuide.get(p.guide) ?? []), p]);
  const sentences = [...byGuide].map(([guide, pieces]) => {
    const labels = [...new Set(pieces.map((p) => label(p.argument)))];
    // Each person once, though one title may be printed two ways ("President, X", "President: X").
    const person = (who: string) => who.replace(/ \(.*$/, "");
    const people = pieces
      .map((p) => p.who)
      .filter((who, i, all) => all.findIndex((w) => person(w) === person(who)) === i);
    return `${people.join(" and ")} signed ${labels.map((l) => `${l} ${measure}`).join(" and ")} in the ${guideName(guide)}.`;
  });
  return sentences.join(" ");
}

// ---------------------------------------------------------------- write

const bySlug = new Map<string, Signed[]>();
for (const entry of signed.values()) {
  bySlug.set(entry.target.slug, [...(bySlug.get(entry.target.slug) ?? []), entry]);
}

let added = 0;
let created = 0;
const already: string[] = [];
const conflicts: string[] = [];
for (const [slug, entries] of [...bySlug].sort(([a], [b]) => a.localeCompare(b))) {
  const target = (entries[0] as Signed).target;
  const dir = join("orgs", slug, election);
  const path = join(dir, "positions.json");
  const exists = existsSync(path);
  const sources = [
    ...new Set(entries.flatMap((e) => e.pieces.map((p) => p.argument.source))),
  ].sort();
  const retrieved = entries
    .map((e) => e.item.retrieved_at)
    .sort()
    .at(-1) as string;
  const guidesUsed = [...new Set(entries.flatMap((e) => e.pieces.map((p) => p.guide)))];
  const jurisdictions = [...new Set(guidesUsed.map((g) => g.jurisdiction))];
  const bundle: Bundle = exists
    ? ((await Bun.file(path).json()) as Bundle)
    : {
        context: {
          title: `${target.name}: positions from signed ballot arguments, ${election} California general election`,
          jurisdiction: jurisdictions.length === 1 ? (jurisdictions[0] as string) : "us/ca",
          election,
        },
        attribution: {
          of: { name: target.name, kind: target.kind },
          mode: "inferred",
          retrieved_at: retrieved,
          sources: [],
        },
        positions: [],
      };
  let changed = !exists;
  for (const entry of entries.sort((a, b) =>
    a.item.subject.title.localeCompare(b.item.subject.title),
  )) {
    const current = bundle.positions.find((p) => p.subject.title === entry.item.subject.title);
    const measure = measureName(entry.item.subject.title);
    if (current) {
      const agrees =
        current.choice === entry.side && ["endorse", "lean_for"].includes(current.stance);
      (agrees ? already : conflicts).push(
        `${slug}: ${measure} ${agrees ? "already" : `has ${current.stance} ${current.choice}, signed for`} ${entry.side}`,
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
      bundle.attribution.sources = [
        ...new Set([...(bundle.attribution.sources ?? []), ...sources]),
      ];
      if (retrieved > bundle.attribution.retrieved_at) bundle.attribution.retrieved_at = retrieved;
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
    const pages = guidesUsed.map(
      (g) => `- ${g.title}: ${g.url}${g.repo ? ` (mirrored in ${g.repo})` : ""}`,
    );
    await Bun.write(
      join(dir, "evidence", "NOTES.md"),
      [
        `# ${target.name}: evidence`,
        "",
        "Each position comes from an official ballot argument in a county's voter guide that",
        "the organization signed, or that one of its leaders signed for it; who signed and which",
        "argument are named in the position's statement, and its source is the guide's page.",
        "The guides, signed and mirrored with each item's hash:",
        "",
        ...pages,
        "",
      ].join("\n"),
    );
    const metaPath = join("orgs", slug, "meta.yaml");
    if (!existsSync(metaPath)) {
      await Bun.write(
        metaPath,
        `name: ${JSON.stringify(target.name)}\nslug: ${slug}\nkind: ${target.kind}\nabout: |\n  Its positions here come only from official ballot arguments in county voter\n  guides that it, or one of its leaders, signed\n  (scripts/county-ballot-arguments.ts). The organization may not have published\n  endorsements of its own.\n`,
      );
    }
  }
}

console.log(
  `\n${added} positions added, ${created} new bundles${apply ? "" : " (dry run; --apply to write)"}`,
);
if (already.length)
  console.log(`\nAlready recorded (${already.length}):\n  ${already.join("\n  ")}`);
if (conflicts.length) {
  console.log(`\nCONFLICTS, left as they are (${conflicts.length}):\n  ${conflicts.join("\n  ")}`);
}
if (bothSides.length) {
  console.log(
    `\nSigned on both sides, so no position (${bothSides.length}):\n  ${bothSides.join("\n  ")}`,
  );
}
console.log(
  `\nSignatures that don't count as an organization's position (${left.length}):\n  ${left.join("\n  ")}`,
);
