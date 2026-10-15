#!/usr/bin/env bun
// Canonicalize candidate spellings within each race across every org's bundle for one
// election, so cross-org collation groups the same person together. Variants count as the
// same person when they differ only in punctuation/accents/hyphens, middle names or
// initials, a Jr. suffix, or a common nickname. The canonical form is the spelling most
// orgs use, then the accented one, then the shortest. Dry run by default.
//
//   bun scripts/normalize-choices.ts 2026-11-03 [--apply]

import { Glob } from "bun";
const root = ".";
const election = process.argv[2];
if (!election) throw new Error("usage: normalize-choices.ts <election> [--apply]");
const apply = process.argv[3] === "--apply";
const strip = (s: string) =>
  s
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
const nick: Record<string, string> = {
  sam: "samuel",
  steve: "steven",
  sue: "susan",
  joe: "joseph",
  ray: "raymond",
  dan: "daniel",
  mike: "michael",
  bob: "robert",
  bill: "william",
  jim: "james",
  tom: "thomas",
  chris: "christopher",
  dave: "david",
  tony: "anthony",
};
const toks = (s: string) =>
  strip(s)
    .replace(/\b(jr|sr|dr|ii|iii)\b/g, "")
    .split(" ")
    .filter((t) => t.length > 1)
    .map((t) => nick[t] ?? t);
const sub = (a: string[], b: string[]) => a.every((t) => b.includes(t));
const samePerson = (a: string, b: string) => {
  if (strip(a).replace(/ /g, "") === strip(b).replace(/ /g, "")) return true; // DJ/D.J., hyphens, accents
  const ta = toks(a);
  const tb = toks(b);
  return ta[0] === tb[0] && (sub(ta, tb) || sub(tb, ta)) && Math.min(ta.length, tb.length) >= 2;
};
type Pos = { file: string; org: string; title: string; choice: string };
const all: Pos[] = [];
for await (const f of new Glob(`orgs/*/${election}/positions.json`).scan(root)) {
  const j = JSON.parse(await Bun.file(`${root}/${f}`).text());
  for (const p of j.positions)
    if (p.choice && !/^(yes|no)$/i.test(p.choice))
      all.push({ file: f, org: f.split(/[\\/]/)[1], title: p.subject.title, choice: p.choice });
}
const byTitle = Map.groupBy(all, (p) => p.title);
const changes: { file: string; title: string; from: string; to: string }[] = [];
for (const [title, ps] of byTitle) {
  const names = [...new Set(ps.map((p) => p.choice))];
  const clusters: string[][] = [];
  for (const n of names) {
    const c = clusters.find((c) => c.some((m) => samePerson(m, n)));
    c ? c.push(n) : clusters.push([n]);
  }
  for (const c of clusters.filter((c) => c.length > 1)) {
    const count = (n: string) => new Set(ps.filter((p) => p.choice === n).map((p) => p.org)).size;
    const hasDiacritic = (n: string) => (n !== n.normalize("NFD").replace(/\p{M}/gu, "") ? 1 : 0);
    const canon = [...c].sort(
      (a, b) => count(b) - count(a) || hasDiacritic(b) - hasDiacritic(a) || a.length - b.length,
    )[0];
    console.log(`${title}\n   → ${canon}   (${c.map((n) => `${n}×${count(n)}`).join(", ")})`);
    for (const p of ps)
      if (p.choice !== canon && c.includes(p.choice))
        changes.push({ file: p.file, title, from: p.choice, to: canon });
  }
}
console.log(`\n${changes.length} position edits`);
if (apply) {
  const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  for (const ch of changes) {
    const path = `${root}/${ch.file}`;
    let t = await Bun.file(path).text();
    const titleLit = JSON.stringify(ch.title);
    let from = t.indexOf(titleLit);
    let done = false;
    while (from >= 0 && !done) {
      const re = new RegExp(`"choice":(\\s*)${esc(JSON.stringify(ch.from))}`, "g");
      re.lastIndex = from;
      const m = re.exec(t);
      if (!m) break;
      const nextTitle = t.indexOf('"title"', from + titleLit.length);
      if (nextTitle !== -1 && nextTitle < m.index) {
        from = t.indexOf(titleLit, from + titleLit.length);
        continue;
      }
      t = `${t.slice(0, m.index)}"choice":${m[1]}${JSON.stringify(ch.to)}${t.slice(m.index + m[0].length)}`;
      done = true;
    }
    if (!done) console.error("FAILED", ch);
    else await Bun.write(path, t);
  }
}
