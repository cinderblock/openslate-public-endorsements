import { describe, expect, test } from "bun:test";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { evidenceFiles, evidencePage } from "./evidence-page";
import type { CaptureRef, SlateProvenance, SourceProvenance } from "./lib/provenance";

describe("evidenceFiles", () => {
  test("lists every file, NOTES.md first, nested paths with /", () => {
    const dir = mkdtempSync(join(tmpdir(), "evidence-"));
    writeFileSync(join(dir, "b-capture.md"), "bb");
    writeFileSync(join(dir, "withheld.json"), "{}");
    writeFileSync(join(dir, "NOTES.md"), "n");
    mkdirSync(join(dir, "pages"));
    writeFileSync(join(dir, "pages", "a.html"), "aaa");
    expect(evidenceFiles(dir)).toEqual([
      { path: "NOTES.md", bytes: 1 },
      { path: "b-capture.md", bytes: 2 },
      { path: "pages/a.html", bytes: 3 },
    ]);
  });
});

describe("evidencePage", () => {
  const entry = {
    slug: "dsa-silicon-valley",
    election: "2026-11-03",
    attribution: {
      of: { name: "Silicon Valley DSA", uri: "https://siliconvalleydsa.org/" },
      mode: "scraped",
      retrieved_at: "2026-10-27T02:30:43Z",
      sources: ["https://docs.google.com/document/d/e/x/pub", "javascript:alert(1)"],
    },
  };

  test("says when and where it was captured, and links each file", () => {
    const html = evidencePage(entry, [{ path: "NOTES.md", bytes: 2048 }]);
    expect(html).toContain('data-iso="2026-10-27T02:30:43Z"');
    expect(html).toContain('<a href="https://docs.google.com/document/d/e/x/pub">');
    expect(html).toContain('<a href="NOTES.md">NOTES.md</a>');
    expect(html).toContain("2.0 KB");
    expect(html).toContain("/commits/master/orgs/dsa-silicon-valley/2026-11-03/evidence/NOTES.md");
    expect(html).toContain('<a href="../signed.slate">');
  });

  test("never links a non-http source, and escapes scraped text", () => {
    const html = evidencePage(
      { ...entry, attribution: { ...entry.attribution, of: { name: "<b>Org</b>" } } },
      [],
    );
    expect(html).not.toContain('href="javascript:');
    expect(html).toContain("<code>javascript:alert(1)</code>");
    expect(html).not.toContain("<b>Org</b>");
    expect(html).toContain("&lt;b&gt;Org&lt;/b&gt;");
  });

  test("lists a withheld page by link and hash, never a link to our copy", () => {
    const sha256 = "cd".repeat(32);
    const html = evidencePage(entry, [{ path: "NOTES.md", bytes: 1 }], null, [
      { path: "paper.md", url: "https://paper.example/endorsements", bytes: 2048, sha256 },
    ]);
    expect(html).toContain("Kept private");
    expect(html).toContain('<a href="https://paper.example/endorsements">');
    expect(html).toContain(sha256);
    expect(html).not.toContain('href="paper.md"');
  });

  test("always offers a takedown request", () => {
    expect(evidencePage(entry, [])).toContain("issues/new?template=takedown.yml");
  });

  describe("with capture details", () => {
    const hash = "ab".repeat(32);
    const capture = (over: Partial<CaptureRef> = {}): CaptureRef => ({
      run: "2026-10-30T1700Z",
      index: 3,
      captured_at: "2026-10-30T17:05:00Z",
      status: 200,
      error: null,
      final_url: "https://siliconvalleydsa.org/x",
      response_sha256: hash,
      bytes: "public",
      claims: ["captured", "time-stamped", "witnessed-by-public-ci"],
      ...over,
    });
    const source = (over: Partial<SourceProvenance> = {}): SourceProvenance => ({
      url: "https://docs.google.com/document/d/e/x/pub",
      positions: 12,
      host: {
        match: "hosted-elsewhere",
        host: "docs.google.com",
        org_host: "siliconvalleydsa.org",
      },
      latest: capture(),
      last_ok: null,
      archived: null,
      derivation: { kind: "anchored", exact: 9, quoted_parts: 1, unanchored: 2, no_statement: 0 },
      ...over,
    });
    const page = (...sources: SourceProvenance[]) =>
      evidencePage(entry, [], {
        format: "openslate-source-provenance/1",
        org: entry.slug,
        election: entry.election,
        mode: "scraped",
        org_uri: "https://siliconvalleydsa.org/",
        generated_from: { endorsements_commit: "abc", runs: ["2026-10-30T1700Z"] },
        sources,
      } as SlateProvenance);

    test("labels the strongest claim, and lists each one separately", () => {
      const html = page(source());
      expect(html).toContain("<strong>Witnessed by public CI</strong>: HTTP 200");
      expect(html).toContain("<li>Captured:");
      expect(html).toContain("<li>Time-stamped:");
      expect(html).not.toContain("<li>Independently archived:");
      expect(html).toContain('data-iso="2026-10-30T17:05:00Z"');
      expect(html).toContain(`/blob/master/blobs/ab/${hash}`);
      expect(html).toContain("/blob/master/runs/2026-10-30T1700Z/manifest.json");
    });

    test("keeps host and derivation as their own facts", () => {
      const html = page(source());
      expect(html).toContain("Hosted elsewhere: <code>docs.google.com</code>");
      expect(html).toContain("10 of 12 statements found in this capture");
    });

    test("says why a source couldn't be checked", () => {
      const derivation = {
        kind: "not-checkable" as const,
        reason: "an image",
        exact: 0,
        quoted_parts: 0,
        unanchored: 0,
        no_statement: 12,
      };
      expect(page(source({ derivation }))).toContain("Not checkable: an image");
    });

    test("shows a page that's gone beside its last good capture", () => {
      const older = capture({ captured_at: "2026-10-01T17:05:00Z" });
      const html = page(source({ latest: capture({ status: 404 }), last_ok: older }));
      expect(html).toContain("HTTP 404");
      expect(html).toContain("Last returned 200:");
      expect(html).toContain('data-iso="2026-10-01T17:05:00Z"');
    });

    test("a withheld page keeps its bytes private and shows its hash and manifest", () => {
      const html = page(source({ latest: capture({ bytes: "withheld" }) }));
      expect(html).toContain(`Bytes kept private; their hash is public: <code>${hash}</code>`);
      expect(html).not.toContain(`/blobs/ab/${hash}`);
      expect(html).toContain("manifest.json");
    });

    test("a large file links the release asset", () => {
      const html = page(source({ latest: capture({ bytes: "release" }) }));
      expect(html).toContain(`/releases/download/large-blobs/${hash}`);
    });

    test("no capture is neutral, and a failed fetch says what happened", () => {
      expect(page(source({ latest: null }))).toContain("<strong>Reported</strong>: no capture yet");
      const failed = capture({ status: null, error: "ECONNRESET <x>" });
      expect(page(source({ latest: failed }))).toContain("ECONNRESET &lt;x&gt;");
    });

    test("never links a non-http source", () => {
      const html = page(source({ url: "javascript:alert(1)" }));
      expect(html).not.toContain('href="javascript:');
    });
  });

  test("without capture details the page has no capture section", () => {
    const html = evidencePage(entry, []);
    expect(html).not.toContain("Source captures");
    expect(html).not.toContain("Reported");
  });
});
