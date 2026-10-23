// Shared by the county ballot-source scripts: the catalog's existing subjects, and the rules for
// naming a county's contests so they line up with them. A contest some bundle already names
// (same body and seat, or same measure letter) reuses that exact subject; a new seat of a body
// the catalog already names takes that body's seat label; candidate names printed in capitals
// keep a spelling some bundle already uses, or are title-cased with care.

import { Glob } from "bun";

export interface Subject {
  title: string;
  kind: string;
  jurisdiction: string;
  election: string;
}

export interface Built {
  title: string;
  jurisdiction: string;
}

export type Existing = Map<string, { subject: Subject; choices: Set<string> }>;

/** Every subject the catalog's bundles use for an election, with the names they give each. */
export async function loadExisting(election: string, skipDir: string): Promise<Existing> {
  const existing: Existing = new Map();
  for await (const file of new Glob(`orgs/*/${election}/positions.json`).scan(".")) {
    if (file.replaceAll("\\", "/").startsWith(`${skipDir}/`)) continue;
    const { positions } = (await Bun.file(file).json()) as {
      positions: { subject: Subject; choice?: string }[];
    };
    for (const { subject, choice } of positions) {
      const entry = existing.get(subject.title) ?? { subject, choices: new Set<string>() };
      if (choice && !/^(yes|no)$/i.test(choice)) entry.choices.add(choice);
      existing.set(subject.title, entry);
    }
  }
  return existing;
}

// ---------------------------------------------------------------- names and titles

export const ORDINALS: Record<string, string> = {
  first: "1",
  second: "2",
  third: "3",
  fourth: "4",
  fifth: "5",
  sixth: "6",
  seventh: "7",
  eighth: "8",
  ninth: "9",
  tenth: "10",
};
const SMALL = new Set(["of", "the", "and", "for", "on", "in", "at", "to", "a"]);
const ACRONYMS = new Set(["ABC", "II", "III", "IV"]);

/** "ABC UNIFIED SCHOOL DISTRICT" → "ABC Unified School District"; "LA CAÑADA" → "La Cañada". */
export function titleCase(text: string): string {
  return text
    .toLowerCase()
    .split(/(\s+|-|\/)/)
    .map((word, i) => {
      if (ACRONYMS.has(word.toUpperCase())) return word.toUpperCase();
      if (i > 0 && SMALL.has(word)) return word;
      return word
        .replace(/^(\p{L})/u, (c) => c.toUpperCase())
        .replace(/\.(\p{L})/gu, (m) => m.toUpperCase());
    })
    .join("");
}

/** A name in capitals, cased with care: McCoy, O'Brien, Smith-Jones, J.R., III, "PJ". */
export function nameCase(name: string): string {
  return name
    .split(/(\s+)/)
    .map((word) => {
      if (/^\s+$/.test(word)) return word;
      if (/^(II|III|IV|V)$/.test(word)) return word;
      if (/^(JR|SR)\.?$/.test(word)) return `${word[0]}${word.slice(1).toLowerCase()}`;
      // Initials and quoted nicknames in capitals ("J.R.", "(DJ)", "“PJ”") stay as printed.
      if (/^([A-Z]\.)+,?$/.test(word) || /^[("“'][A-Z]{1,3}[)"”']$/.test(word)) return word;
      return word
        .toLowerCase()
        .replace(/(^|[-'’("“])(\p{L})/gu, (_m, p: string, c: string) => p + c.toUpperCase())
        .replace(/^Mc(\p{L})/u, (_m, c: string) => `Mc${c.toUpperCase()}`);
    })
    .join("");
}

export function strip(text: string): string {
  return text
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** Words that name the seat rather than the body, dropped when comparing titles. */
const SEAT_WORDS = new Set(
  "board of the trustees trustee directors director education governing member members area division seat no number office".split(
    " ",
  ),
);
export function titleKey(title: string): string {
  return (
    strip(title)
      // A seat's number is what matters, whether a bundle calls it "District 1" or "Area 1";
      // and a partial term is still the same seat.
      .replace(/\s*\b(partial|unexpired) term\b/g, "")
      .replace(/\bdistrict (\d+|[a-z])$/, "$1")
      // LA prints "Lawndale School District" for the Lawndale Elementary School District.
      .replace(/\belementary school\b/g, "school")
      .split(" ")
      .map((w) => ORDINALS[w] ?? w.replace(/^(\d+)(st|nd|rd|th)$/, "$1"))
      .filter((w) => !SEAT_WORDS.has(w))
      .join(" ")
  );
}

/** "Burbank — Measure C (City Services)" → "burbank measure c": body and letter only. */
export function measureKey(title: string): string {
  return strip(title.replace(/\s*\(.*\)\s*$/, "").replace(/\bCity\b/g, ""));
}

export function slugify(text: string): string {
  return strip(text).replace(/ /g, "-");
}

/** The spelling some bundle already uses for this person in this race, if any. */
export function knownSpelling(printed: string, spellings: Iterable<string>): string | undefined {
  const want = strip(printed);
  const ends = (s: string) => {
    const words = strip(s)
      .split(" ")
      .filter((w) => !/^(jr|sr|ii|iii|iv)$/.test(w));
    return `${words[0]} ${words.at(-1)}`;
  };
  const list = [...spellings];
  return (
    list.find((s) => strip(s) === want) ??
    list.find((s) => strip(s).replace(/ /g, "") === want.replace(/ /g, "")) ??
    (list.filter((s) => ends(s) === ends(printed)).length === 1
      ? list.find((s) => ends(s) === ends(printed))
      : undefined)
  );
}

// ---------------------------------------------------------------- matching the catalog

const SEAT_LABEL =
  /, (Trustee Area|Area|Seat|District|Division|Ward) ([0-9A-Z]+)(, Partial Term| \(Short Term\))?$/;

/**
 * Finds the catalog's own subject for a contest. `isLocal` says which jurisdictions can hold the
 * same contest (the county, its cities, and the contest's own); problems collect ambiguities.
 */
export function subjectMatcher(options: {
  existing: Existing;
  election: string;
  isLocal: (jurisdiction: string, built: Built) => boolean;
  problems: string[];
}) {
  const { existing, election, isLocal, problems } = options;

  /**
   * A new seat of a body the catalog already names takes that body's seat label, so one board
   * isn't "Area 4" in one title and "Trustee Area 1" in the next.
   */
  function sameStyle(built: Built): string {
    const seatMatch = SEAT_LABEL.exec(built.title);
    if (!seatMatch) return built.title;
    const bodyTitle = built.title.slice(0, seatMatch.index);
    const sibling = [...existing.values()]
      .map((e) => e.subject)
      .find(
        (s) =>
          isLocal(s.jurisdiction, built) &&
          s.title.startsWith(`${bodyTitle}, `) &&
          SEAT_LABEL.test(s.title),
      );
    const label = sibling ? SEAT_LABEL.exec(sibling.title)?.[1] : undefined;
    return label ? `${bodyTitle}, ${label} ${seatMatch[2]}${seatMatch[3] ?? ""}` : built.title;
  }

  return function reuse(built: Built, kind: "race" | "measure"): Subject {
    const keyOf = kind === "measure" ? measureKey : titleKey;
    const key = keyOf(built.title);
    const matches = [...existing.values()].filter(
      ({ subject }) =>
        subject.kind === kind &&
        isLocal(subject.jurisdiction, built) &&
        keyOf(subject.title) === key,
    );
    if (matches.length > 1) {
      problems.push(
        `"${built.title}" matches ${matches.map((m) => `"${m.subject.title}"`).join(", ")}`,
      );
    }
    const found = matches[0]?.subject;
    if (found) return { ...found };
    return { title: sameStyle(built), kind, jurisdiction: built.jurisdiction, election };
  };
}
