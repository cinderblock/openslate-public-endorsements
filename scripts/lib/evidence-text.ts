// The text a bundle's statements were quoted from: its committed evidence pages, plus the saved
// news pages kept in the private captures repo when a checkout of it is given. NOTES.md is the
// researcher's own notes, not the source, so it's left out.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

/** Every evidence page's text for orgs/<slug>/<election>/, joined by blank lines. */
export function evidenceText(
  bundleDir: string,
  slug: string,
  election: string,
  privateDir?: string,
): string {
  const dirs = [join(bundleDir, "evidence")];
  if (privateDir) dirs.push(join(privateDir, "evidence", slug, election));
  const texts: string[] = [];
  for (const dir of dirs) {
    if (!existsSync(dir)) continue;
    for (const name of readdirSync(dir).sort()) {
      if (!name.endsWith(".md") || name === "NOTES.md") continue;
      texts.push(unwrapMarkdown(readFileSync(join(dir, name), "utf8").replace(/\r\n?/g, "\n")));
    }
  }
  return texts.join("\n\n");
}

/** A line that starts a markdown block of its own, so it never continues the line above. */
const BLOCK_START = /^\s*(?:#{1,6}\s|[-*+]\s|\d+[.)]\s|\||```|~~~|---|___|\*\*\*|<)/;
const FENCE = /^\s*(?:```|~~~)/;
const QUOTE = /^\s*>\s?/;
/** A line this long that stops without ending its sentence was wrapped, not ended. */
const WRAP_WIDTH = 60;
const ENDS = /[.!?:;…]["'”’)\]*_]*\s*$/;

/**
 * Wrapped lines joined back into the paragraph they belong to. Outside code fences a long line that
 * stops mid-sentence, followed by more text, is a soft wrap and not the end of a passage. Left as a
 * newline, a quote cut at the wrap would read as whole. Only a line going on in lower case joins
 * the one above, because pages saved as plain text put one list entry on each line ("Governor: No
 * Endorsement"). That misses a wrap just before a capitalised word. Fenced blocks are page text
 * kept line for line, so they stay as they are.
 */
export function unwrapMarkdown(md: string): string {
  const out: string[] = [];
  let fenced = false;
  // The line before, as written: the width test is on it, not on the paragraph joined so far.
  let prev = "";
  for (const line of md.split("\n")) {
    if (FENCE.test(line)) {
      fenced = !fenced;
      out.push(line);
      prev = "";
      continue;
    }
    const wrapped =
      !fenced &&
      prev.trimEnd().length >= WRAP_WIDTH &&
      !ENDS.test(prev) &&
      // A list saved as text puts one entry on each line, each starting with a capital: only a
      // line going on in lower case is the same sentence.
      /^\p{Ll}/u.test(line.replace(QUOTE, "").trim()) &&
      !BLOCK_START.test(line) &&
      // A blockquote goes on only with more of the same quote.
      QUOTE.test(prev) === QUOTE.test(line);
    if (wrapped) out.push(`${out.pop()} ${line.replace(QUOTE, "").trim()}`);
    else out.push(line);
    prev = line;
  }
  return out.join("\n");
}
