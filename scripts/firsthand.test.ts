import { describe, expect, test } from "bun:test";
import {
  type CatalogIndexEntry,
  createSlate,
  generateKeyPair,
  parseSlate,
} from "../.openslate/packages/core/src/index";
import { checkFirsthand, parseMeta, withFirsthand } from "./firsthand";

const E = "2026-11-03";
const where = { slug: "example-org", election: E, path: `orgs/example-org/${E}/firsthand.slate` };

function slate(more: Partial<Parameters<typeof createSlate>[0]> = {}) {
  return createSlate({
    keyPair: generateKeyPair(),
    issuer: { name: "Example Org", kind: "organization" },
    context: { election: E, jurisdiction: "us/ca" },
    positions: [
      {
        subject: { title: "Governor of California", jurisdiction: "us/ca", election: E },
        stance: "endorse",
        choice: "Alice",
      },
    ],
    ...more,
  }).token;
}

const keyOf = (token: string) => parseSlate(token).payload.issuer.key;
const metaWith = (key: string) =>
  parseMeta(`name: Example Org
uri: https://example.org/
kind: organization
keys:
  - key: ${key}
    added: 2026-11-14
    confirmed: Listed on example.org/about
`);

describe("parseMeta", () => {
  test("reads the keys a maintainer listed, with how each was confirmed", () => {
    expect(metaWith("ed25519:abc")).toEqual({
      name: "Example Org",
      uri: "https://example.org/",
      kind: "organization",
      keys: [{ key: "ed25519:abc", added: "2026-11-14", confirmed: "Listed on example.org/about" }],
    });
  });

  test("an org without keys has none", () => {
    expect(parseMeta("name: X\nslug: x\n").keys).toEqual([]);
  });
});

describe("checkFirsthand", () => {
  test("an organization's own slate, signed with its listed key, passes", () => {
    const token = slate();
    const checked = checkFirsthand(`${token}\n`, where, metaWith(keyOf(token)));
    expect(checked.problems).toEqual([]);
    expect(checked.payload?.issuer.name).toBe("Example Org");
  });

  test("a key meta.yaml doesn't list fails", () => {
    const checked = checkFirsthand(slate(), where, metaWith("ed25519:someone-else"));
    expect(checked.problems.join()).toContain("doesn't list under keys:");
  });

  test("no meta.yaml fails", () => {
    expect(checkFirsthand(slate(), where, undefined).problems.join()).toContain(
      "meta.yaml is missing",
    );
  });

  test("a researcher's report isn't an organization's own slate", () => {
    const token = slate({
      attribution: {
        of: { name: "Example Org" },
        mode: "scraped",
        retrieved_at: "2026-10-01T00:00:00Z",
      },
    });
    expect(checkFirsthand(token, where, metaWith(keyOf(token))).problems.join()).toContain(
      "secondhand report",
    );
  });

  test("a slate for another election fails", () => {
    const token = slate({ context: { election: "2028-11-07" } });
    expect(checkFirsthand(token, where, metaWith(keyOf(token))).problems.join()).toContain(
      "sits in the folder for 2026-11-03",
    );
  });

  test("an expired slate fails", () => {
    const token = slate({ expiresAt: "2026-11-01T00:00:00Z" });
    const checked = checkFirsthand(token, where, metaWith(keyOf(token)), new Date("2026-11-14"));
    expect(checked.problems.join()).toContain("expired");
  });

  test("a tampered slate fails", () => {
    const token = slate();
    const [h, p, sig] = token.split(".");
    const forged = `${h}.${p}.${sig?.startsWith("A") ? "B" : "A"}${sig?.slice(1)}`;
    expect(checkFirsthand(forged, where, metaWith(keyOf(token))).problems.join()).toContain(
      "not a valid signed slate",
    );
  });

  test("two tokens in one file fail", () => {
    const token = slate();
    expect(
      checkFirsthand(`${token}\n${token}`, where, metaWith(keyOf(token))).problems.join(),
    ).toContain("exactly one");
  });
});

describe("withFirsthand", () => {
  const report: CatalogIndexEntry = {
    slug: "example-org",
    election: E,
    path: `orgs/example-org/${E}/signed.slate`,
    issuer: { key: "ed25519:researcher", kind: "researcher" },
    attribution: {
      of: { name: "Example Org", uri: "https://example.org/" },
      mode: "scraped",
      retrieved_at: "2026-10-01T00:00:00Z",
    },
    positions: 3,
    jurisdictions: {},
    issued_at: "2026-10-01T00:00:00Z",
  };
  const other = { ...report, slug: "zeta", path: `orgs/zeta/${E}/signed.slate` };
  const token = slate();
  const own = { ...where, problems: [], warnings: [], payload: parseSlate(token).payload };

  test("lists the org's own slate after its report, naming the org as the report does", () => {
    const entries = withFirsthand([report, other], [own], () => undefined);
    expect(entries.map((e) => e.path)).toEqual([report.path, where.path, other.path]);
    expect(entries[1]?.reported_as).toEqual({ name: "Example Org", uri: "https://example.org/" });
    expect(entries[1]?.attribution).toBeUndefined();
    expect(entries[1]?.issuer.key).toBe(keyOf(token));
  });

  test("marks the report for the same election superseded, and only that one", () => {
    const earlier = {
      ...report,
      election: "2024-11-05",
      path: "orgs/example-org/2024-11-05/signed.slate",
    };
    const entries = withFirsthand([earlier, report], [own], () => undefined);
    expect(entries.find((e) => e.path === report.path)?.superseded_by).toBe(where.path);
    expect(entries.find((e) => e.path === earlier.path)?.superseded_by).toBeUndefined();
  });

  test("an org with no report is named from its meta.yaml", () => {
    const entries = withFirsthand([other], [own], () => metaWith("x"));
    expect(entries[0]?.reported_as).toEqual({
      name: "Example Org",
      uri: "https://example.org/",
      kind: "organization",
    });
    expect(entries.map((e) => e.path)).toEqual([where.path, other.path]);
  });
});
