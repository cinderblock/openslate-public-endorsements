import { describe, expect, test } from "bun:test";
import { gzipSync } from "node:zlib";
import { anchorBundle, comparableText, responseBody } from "./anchor";
import type { CaptureRef, SlateProvenance, SourceProvenance } from "./provenance";

const http = (headers: string, body: Buffer | string) =>
  Buffer.concat([Buffer.from(`HTTP/1.1 200 OK\r\n${headers}\r\n\r\n`), Buffer.from(body)]);

const ref = (hash: string, status = 200): CaptureRef => ({
  run: "2026-10-30T1700Z",
  index: 0,
  captured_at: "2026-10-30T17:01:00Z",
  status,
  error: null,
  final_url: "https://example.org/page",
  response_sha256: hash,
  bytes: "public",
  claims: ["captured"],
});

const source = (url: string, latest: CaptureRef | null, last_ok: CaptureRef | null = null) =>
  ({
    url,
    positions: 1,
    host: { match: "exact", host: "example.org", org_host: "example.org" },
    latest,
    last_ok,
    archived: null,
    derivation: { kind: "anchored", exact: 0, quoted_parts: 0, unanchored: 0, no_statement: 0 },
  }) as SourceProvenance;

const slate = (sources: SourceProvenance[]) => ({ sources }) as unknown as SlateProvenance;

describe("responseBody", () => {
  test("undoes chunking and gzip, as they were on the wire", () => {
    const zipped = gzipSync("hello there");
    const chunked = Buffer.concat([
      Buffer.from(`${zipped.length.toString(16)}\r\n`),
      zipped,
      Buffer.from("\r\n0\r\n\r\n"),
    ]);
    const raw = http(
      "Content-Type: text/html\r\nTransfer-Encoding: chunked\r\nContent-Encoding: gzip",
      chunked,
    );
    const { body, contentType } = responseBody(raw);
    expect(body.toString()).toBe("hello there");
    expect(contentType).toBe("text/html");
  });

  test("bytes with no header block have no body", () => {
    expect(responseBody(Buffer.from("garbage")).body.length).toBe(0);
  });
});

describe("comparableText", () => {
  test("reads HTML's text and JSON's strings, and has none for an image", async () => {
    expect(await comparableText(Buffer.from("<p>Yes on A</p>"), "text/html")).toBe("yes on a");
    expect(await comparableText(Buffer.from('{"a":["Yes on <b>A</b>"]}'), "application/json")).toBe(
      "yes on a",
    );
    expect(await comparableText(Buffer.from([1, 2]), "image/png")).toBeNull();
  });
});

describe("anchorBundle", () => {
  const url = "https://example.org/page";
  const page = http("Content-Type: text/html", "<p>We say: Vote YES on Measure A!</p>");

  test("sorts statements into found, found by quotes, and not found", async () => {
    const result = await anchorBundle(
      [
        { source: url, statement: "vote yes on measure a" },
        { source: url, statement: 'Listed as "Vote YES on Measure A"' },
        { source: url, statement: "Vote no on Measure A" },
        { source: url },
      ],
      slate([source(url, ref("a"))]),
      () => page,
    );
    expect(result.exact).toBe(1);
    expect(result.quoted_parts).toBe(1);
    expect(result.no_statement).toBe(1);
    expect(result.unanchored).toEqual([
      { index: 2, url, run: "2026-10-30T1700Z", statement: "Vote no on Measure A" },
    ]);
  });

  test("uses the last good capture when the page has since gone", async () => {
    const result = await anchorBundle(
      [{ source: url, statement: "vote yes on measure a" }],
      slate([source(url, ref("gone", 404), ref("good"))]),
      (hash) => (hash === "good" ? page : null),
    );
    expect(result.exact).toBe(1);
  });

  test("a position with no source is checked against everything the slate cites", async () => {
    const result = await anchorBundle(
      [{ statement: "vote yes on measure a" }],
      slate([source(url, ref("a"))]),
      () => page,
    );
    expect(result.exact).toBe(1);
  });

  test("can't check is reported as that, never as not found", async () => {
    const result = await anchorBundle(
      [
        { source: url, statement: "one" },
        { source: "https://example.org/never", statement: "two" },
        { source: "https://example.org/404", statement: "three" },
      ],
      slate([source(url, ref("withheld")), source("https://example.org/404", ref("nope", 404))]),
      () => null,
    );
    expect(result.unanchored).toEqual([]);
    expect(result.not_checkable).toEqual({
      "bytes not available or no readable text": 1,
      "no successful capture": 2,
    });
  });

  test("reads each response once", async () => {
    let reads = 0;
    await anchorBundle(
      [
        { source: url, statement: "one" },
        { source: url, statement: "two" },
      ],
      slate([source(url, ref("a"))]),
      () => {
        reads++;
        return page;
      },
    );
    expect(reads).toBe(1);
  });
});
