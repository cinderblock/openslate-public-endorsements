import { describe, expect, test } from "bun:test";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  findWithheld,
  isWithheld,
  lfBytes,
  newsHosts,
  sha256,
  sourceUrl,
} from "./lib/withheld-evidence";

const paper = {
  attribution: {
    of: { kind: "editorial_board" },
    sources: ["https://www.paper.example/endorsements"],
  },
  positions: [{ source: "https://paper-news.example/a" }],
};
const union = { attribution: { of: { kind: "organization" } } };

describe("newsHosts", () => {
  test("every host a news bundle cites, and the listed ones", () => {
    expect([...newsHosts([paper, union], ["listed.example"])].sort()).toEqual([
      "listed.example",
      "paper-news.example",
      "paper.example",
    ]);
  });
});

describe("sourceUrl", () => {
  test("prefers the page's own URL line over an earlier link", () => {
    const text = "See https://first.example/\n- **Source URL**: https://paper.example/a\n";
    expect(sourceUrl(text)).toBe("https://paper.example/a");
  });

  test("falls back to the first link, and to nothing", () => {
    expect(sourceUrl("from https://paper.example/a, fetched")).toBe("https://paper.example/a,");
    expect(sourceUrl("no links")).toBeUndefined();
  });
});

describe("isWithheld", () => {
  const hosts = new Set(["paper.example"]);
  const page = "- **URL**: https://www.paper.example/endorsements\n";

  test("a news bundle's saved pages, with or without a URL", () => {
    expect(isWithheld("page.md", page, paper, hosts)).toBe(true);
    expect(isWithheld("page.md", "no link", paper, hosts)).toBe(true);
  });

  test("a news page cited by anyone else", () => {
    expect(isWithheld("page.md", page, union, hosts)).toBe(true);
  });

  test("an organization's own page stays public", () => {
    const own = "- **URL**: https://union.example/picks\n";
    expect(isWithheld("page.md", own, union, hosts)).toBe(false);
  });

  test("our own notes and article lists stay public", () => {
    for (const path of ["NOTES.md", "articles.md", "withheld.json"]) {
      expect(isWithheld(path, page, paper, hosts)).toBe(false);
    }
  });
});

describe("lfBytes", () => {
  test("a CRLF working copy hashes like git's LF", () => {
    const lf = sha256(lfBytes(Buffer.from("a\nb\n")));
    expect(sha256(lfBytes(Buffer.from("a\r\nb\r\n")))).toBe(lf);
  });

  test("leaves binary alone", () => {
    const binary = Buffer.from([0, 13, 10]);
    expect(lfBytes(binary)).toEqual(binary);
  });
});

describe("findWithheld", () => {
  test("finds saved news pages across bundles", () => {
    const orgs = mkdtempSync(join(tmpdir(), "orgs-"));
    const bundle = (slug: string, positions: unknown, files: Record<string, string>) => {
      const dir = join(orgs, slug, "2026-11-03", "evidence");
      mkdirSync(dir, { recursive: true });
      writeFileSync(join(orgs, slug, "meta.yaml"), "kind: x\n");
      writeFileSync(join(orgs, slug, "2026-11-03", "positions.json"), JSON.stringify(positions));
      for (const [name, text] of Object.entries(files)) writeFileSync(join(dir, name), text);
    };
    bundle("paper", paper, { "NOTES.md": "n", "page.md": "- **URL**: https://paper.example/a" });
    bundle("union", union, {
      "kept.md": "- **URL**: https://union.example/a",
      "cited.md": "- **URL**: https://paper.example/b",
    });
    expect(findWithheld(orgs).map(({ id, files }) => [id, files])).toEqual([
      ["paper/2026-11-03", ["page.md"]],
      ["union/2026-11-03", ["cited.md"]],
    ]);
  });
});
