// Is each position's statement really in the raw capture of its source? A mechanical yes or no,
// which is what can be checked for a slate a person or model read. A miss is a fact about the text
// and says nothing about why: pages change, and a statement can be a fair description.

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { brotliDecompressSync, gunzipSync, inflateSync } from "node:zlib";
import type { CaptureRef, SlateProvenance, SourceProvenance } from "./provenance";
import { anchorStatement, comparable, htmlText } from "./source-text";

/** A stored response is the raw socket bytes: split the headers, undo the framing and encoding. */
export function responseBody(raw: Buffer): { contentType: string; body: Buffer } {
  const split = raw.indexOf("\r\n\r\n");
  if (split < 0) return { contentType: "", body: Buffer.alloc(0) };
  const headers = new Map<string, string>();
  for (const line of raw.subarray(0, split).toString("latin1").split("\r\n").slice(1)) {
    const at = line.indexOf(":");
    headers.set(line.slice(0, at).trim().toLowerCase(), line.slice(at + 1).trim());
  }
  let body = raw.subarray(split + 4);
  if (headers.get("transfer-encoding")?.toLowerCase().includes("chunked")) {
    const parts: Buffer[] = [];
    let at = 0;
    while (at < body.length) {
      const end = body.indexOf("\r\n", at);
      if (end < 0) break;
      const size = Number.parseInt(body.subarray(at, end).toString("latin1"), 16);
      if (!size) break;
      parts.push(body.subarray(end + 2, end + 2 + size));
      at = end + 2 + size + 2;
    }
    body = Buffer.concat(parts);
  }
  const encoding = headers.get("content-encoding")?.toLowerCase();
  if (encoding === "gzip" || encoding === "x-gzip") body = gunzipSync(body);
  else if (encoding === "br") body = brotliDecompressSync(body);
  else if (encoding === "deflate") body = inflateSync(body);
  return { contentType: headers.get("content-type")?.toLowerCase() ?? "", body };
}

function jsonStrings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(jsonStrings);
  if (value && typeof value === "object") return Object.values(value).flatMap(jsonStrings);
  return [];
}

/** The text a statement is looked for in, or null if this kind of file has none we can read. */
export async function comparableText(body: Buffer, contentType: string): Promise<string | null> {
  if (contentType.includes("pdf") || body.subarray(0, 5).toString("latin1") === "%PDF-") {
    // pdf.js is slow to load, and most runs of the check never get here.
    const { pdfPages } = await import("./pdf-layout");
    const pages = await pdfPages(new Uint8Array(body));
    return comparable(pages.flatMap(({ lines }) => lines.map(({ text }) => text)).join(" "));
  }
  if (/^(image|audio|video)\//.test(contentType)) return null;
  const text = body.toString("utf8");
  if (contentType.includes("json")) {
    try {
      return comparable(htmlText(jsonStrings(JSON.parse(text)).join(" ")));
    } catch {
      // Not the JSON it claimed to be: read it as text.
    }
  }
  return comparable(htmlText(text));
}

/** Bytes by hash from a checkout of the capture repo, plus the private store if given. */
export function blobReader(capturesDir: string, privateDir?: string) {
  return (hash: string): Buffer | null => {
    const candidates = [
      join(capturesDir, "blobs", hash.slice(0, 2), hash),
      join(capturesDir, "large", hash),
      ...(privateDir ? [join(privateDir, "blobs", hash.slice(0, 2), hash)] : []),
    ];
    const found = candidates.find((path) => existsSync(path));
    return found ? readFileSync(found) : null;
  };
}

export interface AnchorMiss {
  index: number;
  url: string;
  run: string;
  statement: string;
}

export interface AnchorResult {
  exact: number;
  quoted_parts: number;
  no_statement: number;
  unanchored: AnchorMiss[];
  /** Statements that couldn't be checked, by reason. */
  not_checkable: Record<string, number>;
}

interface Position {
  statement?: string;
  source?: string;
}

const usable = (source: SourceProvenance): CaptureRef | null =>
  source.latest?.status === 200 ? source.latest : source.last_ok;

/** Check every statement in a bundle. Pure apart from `read`; texts are cached by hash. */
export async function anchorBundle(
  positions: Position[],
  provenance: SlateProvenance,
  read: (hash: string) => Buffer | null,
  cache = new Map<string, string | null>(),
): Promise<AnchorResult> {
  const result: AnchorResult = {
    exact: 0,
    quoted_parts: 0,
    no_statement: 0,
    unanchored: [],
    not_checkable: {},
  };
  const skip = (reason: string) => {
    result.not_checkable[reason] = (result.not_checkable[reason] ?? 0) + 1;
  };
  const textOf = async (ref: CaptureRef): Promise<string | null> => {
    const known = cache.get(ref.response_sha256);
    if (known !== undefined) return known;
    const raw = read(ref.response_sha256);
    if (!raw) return null;
    let text: string | null = null;
    try {
      const { body, contentType } = responseBody(raw);
      text = await comparableText(body, contentType);
    } catch {
      text = null;
    }
    cache.set(ref.response_sha256, text);
    return text;
  };

  const byUrl = new Map(provenance.sources.map((source) => [source.url, source]));
  for (const [index, position] of positions.entries()) {
    if (!position.statement) {
      result.no_statement++;
      continue;
    }
    // A position naming no source is checked against everything the slate cites.
    const sources = position.source
      ? [byUrl.get(position.source)].filter((source) => source !== undefined)
      : provenance.sources;
    const refs = sources.map(usable).filter((ref) => ref !== null);
    if (!refs.length) {
      skip("no successful capture");
      continue;
    }
    const texts = (await Promise.all(refs.map(textOf))).filter((text) => text !== null);
    if (!texts.length) {
      skip("bytes not available or no readable text");
      continue;
    }
    const anchor = anchorStatement(position.statement, texts.join(" "));
    if (anchor === "exact") result.exact++;
    else if (anchor === "quoted-parts") result.quoted_parts++;
    else {
      const ref = refs[0] as CaptureRef;
      result.unanchored.push({
        index,
        url: position.source ?? ref.final_url,
        run: ref.run,
        statement: position.statement,
      });
    }
  }
  return result;
}
