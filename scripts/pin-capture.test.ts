import { describe, expect, test } from "bun:test";
import { type Run, citedBy, runToPin, withCapture } from "./pin-capture";

const run = (id: string, ...urls: string[]): Run => ({
  id,
  manifestSha256: id.repeat(64).slice(0, 64),
  holds: new Set(urls),
});

describe("runToPin", () => {
  const newest = run("b", "https://a.example/", "https://b.example/");
  const older = run("a", "https://a.example/");
  const runs = [newest, older];

  test("an unpinned slate takes the newest run holding every source", () => {
    expect(runToPin(["https://a.example/"], undefined, runs)?.id).toBe("b");
  });

  test("a pointer stays while its run holds every source, so a new run reissues nothing", () => {
    expect(runToPin(["https://a.example/"], "a", runs)?.id).toBe("a");
  });

  test("a new source moves the pointer", () => {
    expect(runToPin(["https://a.example/", "https://b.example/"], "a", runs)?.id).toBe("b");
  });

  test("a source no run holds yet leaves the slate waiting", () => {
    expect(runToPin(["https://c.example/"], undefined, runs)).toBeUndefined();
    expect(runToPin(["https://c.example/"], "a", runs)).toBeUndefined();
  });

  test("a pointer at a run that's gone or wasn't witnessed moves", () => {
    expect(runToPin(["https://a.example/"], "local", runs)?.id).toBe("b");
  });
});

test("citedBy reads attribution.sources and each position's source, once each", () => {
  expect(
    citedBy({
      attribution: { sources: ["https://a.example/#page=2"] },
      positions: [{ source: "https://a.example/#page=2" }, { source: "https://b.example/" }, {}],
    }),
  ).toEqual(["https://a.example/#page=2", "https://b.example/"]);
});

describe("withCapture", () => {
  const capture = {
    run: "r",
    manifest_sha256: "a".repeat(64),
    provenance: "https://example.org/p",
  };
  // Not how JSON.stringify would lay it out, on purpose.
  const bundle = `{
  "context": { "election": "2026-11-03" },
  "attribution": {
    "of": { "name": "Brace } in \\"name\\"", "kind": "organization" },
    "sources": ["https://a.example/"]
  },
  "positions": [ { "stance": "endorse" } ]
}
`;

  test("adds the field and leaves every other byte alone", () => {
    const result = withCapture(bundle, capture);
    expect(JSON.parse(result).attribution.capture).toEqual(capture);
    const added = result.replace(/,\n {4}"capture": \{[^}]*\}/, "");
    expect(added).toBe(bundle);
  });

  test("replaces an existing pointer without adding a second", () => {
    const moved = { ...capture, run: "newer" };
    const result = withCapture(withCapture(bundle, capture), moved);
    expect(JSON.parse(result).attribution.capture).toEqual(moved);
    expect(result.match(/"capture"/g)).toHaveLength(1);
    expect(result).toBe(withCapture(bundle, moved));
  });

  test("keeps CRLF on a Windows checkout", () => {
    const crlf = bundle.replace(/\n/g, "\r\n");
    expect(withCapture(crlf, capture).replace(/\r\n/g, "")).not.toContain("\n");
  });

  test("a bundle with no attribution is an error, not a guess", () => {
    expect(() => withCapture(`{ "positions": [] }`, capture)).toThrow("no attribution");
  });
});
