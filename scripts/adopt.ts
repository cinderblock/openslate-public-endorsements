#!/usr/bin/env bun
// Make one org's bundle adopt positions from another org's bundle by reference (OpenSlate
// SPEC §3.10) instead of copying them. The adoption points at the adopted bundle's published
// signed.slate. Each pick must name a subject title and the choice the adopting org printed;
// it must match the adopted bundle exactly, so a bundle never adopts more (or other) picks
// than its source page shows.
//
//   bun scripts/adopt.ts <adopting-slug> <adopted-slug> <election> --source <url> \
//     --pick "Governor of California=Xavier Becerra" --pick "California — Proposition 1 (...)=Yes" \
//     [--picks picks.txt] [--apply]
//
// A picks file holds one "<title>=<choice>" per line ("<title>=" for a choice-less stance).

const PAGES = "https://cinderblock.github.io/openslate-public-endorsements";
const args = process.argv.slice(2);
const flag = (name: string) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const [adopting, adopted, election] = args.filter(
  (a, i) => !a.startsWith("--") && !args[i - 1]?.startsWith("--"),
);
const source = flag("--source");
if (!adopting || !adopted || !election || !source) {
  throw new Error("usage: adopt.ts <adopting> <adopted> <election> --source <url> --pick T=C ...");
}
const picks = args.flatMap((a, i) => (a === "--pick" ? [args[i + 1] as string] : []));
const picksFile = flag("--picks");
if (picksFile)
  picks.push(...(await Bun.file(picksFile).text()).split(/\r?\n/).filter((l) => l.trim()));
if (picks.length === 0) throw new Error("no --pick / --picks given");

const read = async (slug: string) => {
  const path = `orgs/${slug}/${election}/positions.json`;
  const raw = await Bun.file(path).text();
  return { path, raw, json: JSON.parse(raw) };
};
const target = await read(adopted);
const self = await read(adopting);
const key = (await Bun.file("keys/project-public.json").json()).publicKey as string;

type Subject = { title: string; kind?: string; jurisdiction?: string; election?: string };
const subjects: Subject[] = [];
for (const pick of picks) {
  const eq = pick.lastIndexOf("=");
  const title = pick.slice(0, eq).trim();
  const choice = pick.slice(eq + 1).trim() || undefined;
  const hits = target.json.positions.filter(
    (p: { subject: Subject; choice?: string }) => p.subject.title === title,
  );
  if (hits.length === 0) throw new Error(`${adopted} has no position titled "${title}"`);
  if (!hits.some((p: { choice?: string }) => p.choice === choice)) {
    const have = hits.map((p: { choice?: string }) => p.choice ?? "(none)").join(" / ");
    throw new Error(`${adopted} picks ${have} for "${title}", not ${choice ?? "(none)"}`);
  }
  if (hits.length > 1) {
    throw new Error(
      `${adopted} has ${hits.length} positions on "${title}"; adopting would take all`,
    );
  }
  if (self.json.positions.some((p: { subject: Subject }) => p.subject.title === title)) {
    throw new Error(`${adopting} already states "${title}" itself`);
  }
  subjects.push(hits[0].subject);
}

const adoption = {
  issuer: key,
  of: target.json.attribution.of.name as string,
  election,
  uri: `${PAGES}/orgs/${adopted}/${election}/signed.slate`,
  subjects,
  source,
};
const existing = (self.json.adopts ?? []).filter((a: { uri: string }) => a.uri !== adoption.uri);
self.json.adopts = [...existing, adoption];
console.log(`${adopting} adopts ${subjects.length} position(s) from ${adoption.of}`);
if (args.includes("--apply")) {
  const eol = self.raw.includes("\r\n") ? "\r\n" : "\n";
  // Append at the end of the object, keeping the file's existing layout for everything else.
  const body = JSON.stringify(self.json.adopts, null, 2).replace(/\n/g, `${eol}  `);
  const without = self.raw.replace(/,\s*"adopts":\s*\[[\s\S]*\]\s*(\}\s*)$/, "$1");
  const out = without.replace(/\s*\}\s*$/, `,${eol}  "adopts": ${body}${eol}}${eol}`);
  JSON.parse(out); // still valid JSON
  await Bun.write(self.path, out);
} else {
  console.log(JSON.stringify(adoption, null, 2));
}
