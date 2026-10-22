// What the catalog says about each entry beyond its slate: the org's logo, and
// where its picks put it between the Democratic and Republican parties
// (OpenSlate core's `leanOf`). The OpenSlate app shows both next to the org.
//
// Lean is arithmetic on picks, not a rating: per election, the subjects where a
// `<place>-democratic-party` / `<place>-republican-party` pair of slates
// disagree, plus the Democrat-vs-Republican races on the ballot data
// (election-authority slates), and which side each org took on them. Positions
// an org adopts by reference count as its own.

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import {
  type Contrasts,
  type Position,
  type SlatePayload,
  contrastsFromBallot,
  contrastsFromPoles,
  leanOf,
  mergeContrasts,
  resolveAdoptions,
  verifySlate,
} from "../.openslate/packages/core/src/index";

export interface ExtrasInput {
  slug: string;
  election: string;
  token: string;
}

export interface Extras {
  /** Logo path relative to the site root, when the org has one. */
  logo?: string;
  /** Contrasted subjects where the org took the Democratic / Republican side. */
  lean?: { left: number; right: number };
}

const ELECTION_AUTHORITY = "election-authority";

/** `logo:` from an org's meta.yaml, as a site path (`orgs/<slug>/logo.png`). */
export function logoPath(root: string, slug: string): string | undefined {
  const meta = join(root, "orgs", slug, "meta.yaml");
  if (!existsSync(meta)) return undefined;
  const match = readFileSync(meta, "utf8").match(/^logo:\s*(\S+)\s*$/m);
  const file = match?.[1];
  if (!file || file.includes("/") || file.includes("..")) return undefined;
  return existsSync(join(root, "orgs", slug, file)) ? `orgs/${slug}/${file}` : undefined;
}

/** Party pairs by place: `ca`, `la-county`, … → their Democratic and Republican slugs. */
function partyPairs(
  slugs: Iterable<string>,
): Array<{ place: string; left: string; right: string }> {
  const all = new Set(slugs);
  const pairs = [];
  for (const slug of all) {
    const place = slug.match(/^(.*)-democratic-party$/)?.[1];
    if (place && all.has(`${place}-republican-party`)) {
      pairs.push({ place, left: slug, right: `${place}-republican-party` });
    }
  }
  // The statewide parties first, then the rest in a stable order: for a subject
  // two pairs both split on, the first pair's sides count.
  return pairs.sort((a, b) =>
    a.place === "ca" ? -1 : b.place === "ca" ? 1 : a.place.localeCompare(b.place),
  );
}

export function catalogExtras(root: string, entries: ExtrasInput[]): Map<string, Extras> {
  const decoded = entries.flatMap((entry) => {
    const result = verifySlate(entry.token);
    return result.valid && result.payload ? [{ ...entry, payload: result.payload }] : [];
  });

  // Every position each slate takes, its adoptions resolved against the catalog.
  const byOf = new Map<string, string[]>();
  for (const d of decoded) {
    const name = d.payload.attribution?.of.name;
    if (name) byOf.set(name, [...(byOf.get(name) ?? []), d.token]);
  }
  const allTokens = decoded.map((d) => d.token);
  const positionsOf = (payload: SlatePayload): Position[] => {
    if (!payload.adopts?.length) return payload.positions;
    const adopted = resolveAdoptions(payload, (adoption) =>
      adoption.of ? (byOf.get(adoption.of) ?? []) : allTokens,
    );
    return [...payload.positions, ...adopted.positions.map((a) => a.position)];
  };
  const positions = new Map(
    decoded.map((d) => [`${d.slug}/${d.election}`, positionsOf(d.payload)]),
  );

  // Contrasts per election.
  const contrastsByElection = new Map<string, Contrasts>();
  for (const election of new Set(decoded.map((d) => d.election))) {
    const inElection = decoded.filter((d) => d.election === election);
    const at = (slug: string) => positions.get(`${slug}/${election}`);
    const poles = partyPairs(inElection.map((d) => d.slug)).flatMap(({ left, right }) => {
      const l = at(left);
      const r = at(right);
      return l && r ? [contrastsFromPoles(l, r)] : [];
    });
    const ballot = inElection
      .filter((d) => d.payload.attribution?.of.kind === ELECTION_AUTHORITY)
      .flatMap((d) => d.payload.positions);
    contrastsByElection.set(election, mergeContrasts(...poles, contrastsFromBallot(ballot)));
  }

  const out = new Map<string, Extras>();
  for (const entry of entries) {
    const key = `${entry.slug}/${entry.election}`;
    const extras: Extras = {};
    const logo = logoPath(root, entry.slug);
    if (logo) extras.logo = logo;
    const d = decoded.find((x) => x.slug === entry.slug && x.election === entry.election);
    const contrasts = contrastsByElection.get(entry.election);
    const own = positions.get(key);
    if (d && contrasts && own && d.payload.attribution?.of.kind !== ELECTION_AUTHORITY) {
      const { left, right } = leanOf(own, contrasts);
      if (left + right > 0) extras.lean = { left, right };
    }
    out.set(key, extras);
  }
  return out;
}
