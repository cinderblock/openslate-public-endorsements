import { describe, expect, test } from "bun:test";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { evidenceFiles, evidencePage } from "./evidence-page";

describe("evidenceFiles", () => {
  test("lists every file, NOTES.md first, nested paths with /", () => {
    const dir = mkdtempSync(join(tmpdir(), "evidence-"));
    writeFileSync(join(dir, "b-capture.md"), "bb");
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
    expect(html).toContain(
      "/commits/master/orgs/dsa-silicon-valley/2026-11-03/evidence/NOTES.md",
    );
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
});
