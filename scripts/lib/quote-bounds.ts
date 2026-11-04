// Does a statement quote its source whole? Anchoring (anchor.ts) asks whether a statement's words
// are in the source at all, which a quote cut off mid-sentence passes. This asks the other half:
// where the statement presents the source's words, does each quote start and end where the
// source's own passage does (a paragraph, line, list item or table cell), or does it mark the cut
// with an ellipsis? An unmarked cut puts words in a source's mouth by leaving the rest out, so it
// fails the build.
//
// Mechanical and model-free, like anchoring: the quote is found through the same comparable form
// (lower case, no punctuation), then the source's own characters on either side are read.

/** Text with its comparable form, and each comparable character's index in the text. */
export interface Indexed {
  text: string;
  norm: string;
  at: number[];
}

const ALNUM = /[a-z0-9]/;
const WORD = /[\p{L}\p{N}]/u;

/** `comparable()` from source-text.ts, keeping where each character came from. */
export function indexed(text: string): Indexed {
  let norm = "";
  const at: number[] = [];
  for (let i = 0; i < text.length; i++) {
    const folded = (text[i] as string)
      .toLowerCase()
      .normalize("NFKD")
      // biome-ignore lint/suspicious/noMisleadingCharacterClass: a range of combining marks, on purpose
      .replace(/[̀-ͯ]/g, "");
    for (const c of folded) {
      if (ALNUM.test(c)) {
        norm += c;
        at.push(i);
      } else if (norm && !norm.endsWith(" ")) {
        norm += " ";
        at.push(i);
      }
    }
  }
  if (norm.endsWith(" ")) {
    norm = norm.slice(0, -1);
    at.pop();
  }
  return { text, norm, at };
}

const fold = (s: string) => indexed(s).norm;

/** Ellipses, as quotes write them: "…", "...", "[…]", "[...]". */
const ELLIPSIS = /\s*\[?(?:…|\.\s?\.\s?\.)\]?\s*/;

/** A line no longer than this is a list entry: its separators (":", "—", "/") end an entry too. */
const SHORT_LINE = 200;

/** Past this many characters a widened quote stops at whole sentences and marks the rest "…". */
export const LONGEST_QUOTE = 1500;

/** What always ends a passage: a new line, or a table cell (a bar, a tab, spaces lining up columns). */
const HARD = /[\n\r|\t]| {2,}/;
/**
 * In a short, list-like line, a list's separators end an entry too ("Governor: Xavier Becerra",
 * "Mayor — David Kertes", "Xavier Becerra (D)"). Never a sentence's own punctuation: one sentence
 * lifted from a short line of two is still cut.
 */
const SOFT = /[:—–·•/()[\]✅☑✓★]|\s-\s/;
/** Where a sentence ends, for quotes too long to widen to their whole passage. */
const SENTENCE = /[.!?]/;
const OPEN_QUOTE = /["“]\s*$/;
/** A closing quote, after the quotation's own closing punctuation ('revenue."'). */
const CLOSE_QUOTE = /^[\s.,;:!?…]*["”]/;

const lineLength = (text: string, i: number) => {
  const start = text.lastIndexOf("\n", i - 1) + 1;
  const end = text.indexOf("\n", i);
  return (end < 0 ? text.length : end) - start;
};

/** The run of non-word characters before `i`, and whether it reaches the text's start. */
function gapBefore(text: string, i: number): { gap: string; edge: boolean; at: number } {
  let j = i;
  while (j > 0 && !WORD.test(text[j - 1] as string)) j--;
  return { gap: text.slice(j, i), edge: j === 0, at: j };
}

function gapAfter(text: string, i: number): { gap: string; edge: boolean; at: number } {
  let j = i;
  while (j < text.length && !WORD.test(text[j] as string)) j++;
  return { gap: text.slice(i, j), edge: j === text.length, at: j };
}

type Level = "passage" | "sentence";

function startsHere(text: string, i: number, level: Level): boolean {
  const { gap, edge } = gapBefore(text, i);
  if (edge || HARD.test(gap)) return true;
  if (level === "sentence") return SENTENCE.test(gap);
  return lineLength(text, i) <= SHORT_LINE && SOFT.test(gap);
}

function endsHere(text: string, i: number, level: Level): boolean {
  const { gap, edge } = gapAfter(text, i);
  if (edge || HARD.test(gap)) return true;
  if (level === "sentence") return SENTENCE.test(gap);
  return lineLength(text, Math.max(0, i - 1)) <= SHORT_LINE && SOFT.test(gap);
}

/** Every place a segment's words sit in the source: [start, end) in the source's characters. */
function occurrences(source: Indexed, segment: string): [number, number][] {
  const needle = fold(segment);
  if (!needle) return [];
  const hay = ` ${source.norm} `;
  const found: [number, number][] = [];
  for (let from = 0; ; ) {
    const hit = hay.indexOf(` ${needle} `, from);
    if (hit < 0) break;
    from = hit + 1;
    const first = source.at[hit] as number;
    let end = (source.at[hit + needle.length - 1] as number) + 1;
    while (end < source.text.length && WORD.test(source.text[end] as string)) end++;
    found.push([first, end]);
  }
  return found;
}

/** The words exactly as the source writes them in quotation marks: a whole quotation. */
const quotedInSource = (text: string, [s, e]: [number, number]) =>
  OPEN_QUOTE.test(gapBefore(text, s).gap) && CLOSE_QUOTE.test(gapAfter(text, e).gap);

export type Bounds =
  /** Every quoted part is a whole passage, or marks its cuts. */
  | { kind: "whole" }
  /** A part is in the source but starts or ends inside a passage, unmarked. */
  | { kind: "cut"; part: string; start: boolean; end: boolean }
  /** No quoted part was found in the source: anchoring reports that, not this. */
  | { kind: "not-found" };

interface Part {
  /** The part as the statement writes it. */
  text: string;
  /** Where it sits in the statement, quotation marks excluded. */
  at: number;
}

/**
 * The parts of a statement that present the source's words: the whole statement when it opens
 * unquoted and the source has it as written (the quotation marks inside are the source's own),
 * else its quoted spans, else the whole thing.
 */
export function quotedParts(statement: string, source?: Indexed): Part[] {
  if (source && /^[^"“]+["“]/.test(statement) && occurrences(source, statement).length)
    return [{ text: statement, at: 0 }];
  // Straight quotes pair with straight ones, curly with curly, so a name the source prints with
  // curly quotes inside a straight-quoted part ("Donald P. “Don” Wagner") stays one part.
  const straight = [...statement.matchAll(/"([^"]+)"/g)];
  const inStraight = (i: number) =>
    straight.some((m) => i > (m.index ?? 0) && i < (m.index ?? 0) + m[0].length);
  const curly = [...statement.matchAll(/“([^”]+)”/g)].filter((m) => !inStraight(m.index ?? 0));
  const quoted = [...straight, ...curly]
    .sort((a, b) => (a.index ?? 0) - (b.index ?? 0))
    .map((m) => ({ text: m[1] ?? "", at: (m.index ?? 0) + 1 }));
  return (quoted.length ? quoted : [{ text: statement, at: 0 }]).filter((p) => fold(p.text));
}

interface Segment {
  text: string;
  /** False where an ellipsis marks a cut on that side. */
  needStart: boolean;
  needEnd: boolean;
}

const segmentsOf = (part: string): Segment[] => {
  const pieces = part.split(new RegExp(ELLIPSIS.source, "g"));
  return pieces
    .map((text, i) => ({ text, needStart: i === 0, needEnd: i === pieces.length - 1 }))
    .filter((s) => fold(s.text));
};

/** How one segment sits at its best place: whole, cut (on which sides), or nowhere. */
function placeSegment(
  source: Indexed,
  seg: Segment,
): { start: boolean; end: boolean; at: [number, number] } | null {
  let best: { start: boolean; end: boolean; at: [number, number] } | null = null;
  for (const at of occurrences(source, seg.text)) {
    const whole = quotedInSource(source.text, at);
    const start = whole || !seg.needStart || startsHere(source.text, at[0], "passage");
    const end = whole || !seg.needEnd || endsHere(source.text, at[1], "passage");
    if (start && end) return { start, end, at };
    if (!best || Number(start) + Number(end) > Number(best.start) + Number(best.end))
      best = { start, end, at };
  }
  return best;
}

/** Check one statement against the text of its source (all its evidence, joined by blank lines). */
export function quoteBounds(statement: string, source: Indexed): Bounds {
  let found = false;
  for (const part of quotedParts(statement, source)) {
    for (const seg of segmentsOf(part.text)) {
      const placed = placeSegment(source, seg);
      if (!placed) continue;
      found = true;
      if (!placed.start || !placed.end)
        return { kind: "cut", part: part.text, start: !placed.start, end: !placed.end };
    }
  }
  return found ? { kind: "whole" } : { kind: "not-found" };
}

/** Grow [s, e) word by word until both ends sit on `level` boundaries, or `limit` is passed. */
function grow(text: string, [s, e]: [number, number], level: Level, limit: number) {
  while (!startsHere(text, s, level) && e - s <= limit) {
    s = gapBefore(text, s).at;
    while (s > 0 && WORD.test(text[s - 1] as string)) s--;
  }
  while (!endsHere(text, e, level) && e - s <= limit) {
    e = gapAfter(text, e).at;
    while (e < text.length && WORD.test(text[e] as string)) e++;
  }
  return [s, e] as [number, number];
}

const count = (s: string, c: string) => s.split(c).length - 1;

/**
 * Keep a passage's own closing punctuation with it, and a closing quote or bracket only when the
 * passage opened it: a stray "”" would claim a quotation that starts outside the quote.
 */
function withClosing(text: string, s: number, from: number): number {
  let e = from + (/^[.!?…]*/.exec(text.slice(from))?.[0].length ?? 0);
  for (;;) {
    const c = text[e];
    const span = text.slice(s, e);
    const opens =
      (c === "”" && count(span, "“") > count(span, "”")) ||
      (c === "’" && count(span, "‘") > count(span, "’")) ||
      (c === '"' && count(span, '"') % 2 === 1) ||
      (c === ")" && count(span, "(") > count(span, ")")) ||
      (c === "]" && count(span, "[") > count(span, "]"));
    if (!opens) return e;
    e++;
  }
}

/** The source's own double quotes, inside a quotation of it, become single ones. */
const nestQuotes = (s: string) =>
  s
    .replace(/"([^"]*)"/g, "'$1'")
    .replace(/“/g, "‘")
    .replace(/”/g, "’");

/**
 * A cut part widened to the whole passage it came from, verbatim, or to whole sentences with "…"
 * marking what's left out when the passage is longer than `LONGEST_QUOTE`. Null when the part isn't
 * in the source, carries its own ellipses, or is already whole.
 */
function widenAt(source: Indexed, at: [number, number]): string {
  const { text } = source;
  let [s, e] = grow(text, at, "passage", LONGEST_QUOTE);
  let cutStart = false;
  let cutEnd = false;
  if (e - s > LONGEST_QUOTE) {
    [s, e] = grow(text, at, "sentence", Number.POSITIVE_INFINITY);
    cutStart = !startsHere(text, s, "passage");
    cutEnd = !endsHere(text, withClosing(text, s, e), "passage");
  }
  e = withClosing(text, s, e);
  const words = nestQuotes(text.slice(s, e).replace(/\s+/g, " ").trim());
  return `${cutStart ? "… " : ""}${words}${cutEnd ? " …" : ""}`;
}

/** A part that's one plain quote (no ellipses of its own), and isn't already whole. */
function cutSegment(part: string, source: Indexed): Segment | null {
  const segs = segmentsOf(part);
  const seg = segs[0];
  if (segs.length !== 1 || !seg || seg.text.trim() !== part.trim()) return null;
  const placed = placeSegment(source, seg);
  return placed && !(placed.start && placed.end) ? seg : null;
}

/** Thrown when a cut quote's words sit in several passages and nothing says which one it meant. */
export class AmbiguousQuote extends Error {}

/**
 * The statement with every cut part widened to the whole passage it came from, verbatim, or to
 * whole sentences with "…" marking what's left out when the passage is longer than
 * `LONGEST_QUOTE`. Null when nothing can be widened. A quote whose words appear in more than one
 * passage is placed by the statement's other quotes (the nearest one); with none to go by, it
 * throws `AmbiguousQuote` rather than guess.
 */
export function widenStatement(statement: string, source: Indexed): string | null {
  const parts = quotedParts(statement, source);
  const anchors = parts.flatMap((p) =>
    segmentsOf(p.text).flatMap((seg) => {
      const found = occurrences(source, seg.text);
      return found.length === 1 ? [(found[0] as [number, number])[0]] : [];
    }),
  );
  const wide = parts.map((part) => {
    const seg = cutSegment(part.text, source);
    if (!seg) return null;
    const found = occurrences(source, seg.text);
    const options = [...new Set(found.map((at) => widenAt(source, at)))];
    if (options.length === 1) return options[0] as string;
    const own = found.length === 1 ? [] : found.map((at) => at[0]);
    const others = anchors.filter((a) => !own.includes(a));
    if (!others.length) throw new AmbiguousQuote(part.text);
    const distance = (at: [number, number]) => Math.min(...others.map((a) => Math.abs(a - at[0])));
    const sorted = [...found].sort((a, b) => distance(a) - distance(b));
    const [best, next] = sorted;
    if (next && distance(next) === distance(best as [number, number]))
      throw new AmbiguousQuote(part.text);
    return widenAt(source, best as [number, number]);
  });
  if (wide.every((w) => w === null)) return null;
  const final = parts.map((part, i) => wide[i] ?? part.text);
  let out = statement;
  // Back to front, so earlier parts' offsets still hold.
  for (let i = parts.length - 1; i >= 0; i--) {
    const part = parts[i] as Part;
    const end = part.at + part.text.length;
    // Two quotes from one passage widen to the same words: keep the first, and drop the repeat
    // along with what joined it to the quote before ('"…"; "…"').
    const repeat =
      wide[i] !== null &&
      final
        .slice(0, i)
        .some((f, j) => wide[j] !== null && fold(f).includes(fold(final[i] as string)));
    if (repeat && i > 0) {
      const prev = parts[i - 1] as Part;
      const from = prev.at + prev.text.length + 1; // past the previous closing quote
      out = out.slice(0, from) + out.slice(end + 1);
      continue;
    }
    if (wide[i] === null) continue;
    out = out.slice(0, part.at) + final[i] + out.slice(end);
  }
  return out;
}
