import { describe, expect, test } from "bun:test";
import { unwrapMarkdown } from "./evidence-text";
import { AmbiguousQuote, indexed, quoteBounds, widenStatement } from "./quote-bounds";

const PROP_44 =
  "No recommendation. The nonprofit federally qualified health centers this measure is directed at do need some more regulation and oversight, particularly in not meddling with unionization efforts. However, using the ballot initiative process as a negotiation tactic, which SEIU-UHW has done several times before, does not garner positive relations with the public and should not be condoned.";

const guide = indexed(
  [
    "Prop 43",
    'We will be recommending No on this measure. Evolve California warns "if this measure passes, it will make California the hardest place in the country to raise local revenue." We cannot let that happen.',
    "Prop 44",
    PROP_44,
    "Statewide Offices",
    "Governor: No Endorsement",
    "Treasurer | Fiona Ma | Endorsed",
    "PROPOSITION 1    SUPPORT",
  ].join("\n"),
);

describe("quoteBounds", () => {
  test("a quote cut mid-sentence fails, as SVDSA's Prop 44 statement did", () => {
    expect(
      quoteBounds('"No recommendation. The nonprofit federally qualified health centers"', guide),
    ).toEqual({
      kind: "cut",
      part: "No recommendation. The nonprofit federally qualified health centers",
      start: false,
      end: true,
    });
  });

  test("a whole sentence is still cut when its paragraph goes on", () => {
    expect(quoteBounds('"No recommendation."', guide).kind).toBe("cut");
  });

  test("the whole paragraph passes", () => {
    expect(quoteBounds(`"${PROP_44}"`, guide)).toEqual({ kind: "whole" });
  });

  test("an ellipsis marks a cut, at either end or inside", () => {
    expect(
      quoteBounds('"No recommendation. The nonprofit federally qualified health centers …"', guide),
    ).toEqual({ kind: "whole" });
    expect(
      quoteBounds(
        '"… does not garner positive relations with the public and should not be condoned."',
        guide,
      ),
    ).toEqual({ kind: "whole" });
    expect(quoteBounds('"No recommendation. … should not be condoned."', guide)).toEqual({
      kind: "whole",
    });
    expect(quoteBounds('"No recommendation. The nonprofit [...]"', guide)).toEqual({
      kind: "whole",
    });
  });

  test("a cut that stops just short of the source's own quotation still fails", () => {
    expect(
      quoteBounds('"We will be recommending No on this measure. Evolve California warns"', guide)
        .kind,
    ).toBe("cut");
  });

  test("the source's own quotation, quoted whole, passes", () => {
    expect(
      quoteBounds(
        '"if this measure passes, it will make California the hardest place in the country to raise local revenue."',
        guide,
      ),
    ).toEqual({ kind: "whole" });
  });

  test("list entries and table cells are whole passages", () => {
    expect(quoteBounds('"Governor: No Endorsement"', guide)).toEqual({ kind: "whole" });
    expect(quoteBounds('"Statewide Offices" / "Governor"', guide)).toEqual({ kind: "whole" });
    expect(quoteBounds('Listed as "Fiona Ma", marked "Endorsed"', guide)).toEqual({
      kind: "whole",
    });
    expect(quoteBounds('"PROPOSITION 1" — "SUPPORT"', guide)).toEqual({ kind: "whole" });
  });

  test("a statement not in the source is left to anchoring", () => {
    expect(quoteBounds("A fair description in the researcher's words.", guide)).toEqual({
      kind: "not-found",
    });
  });
});

describe("widenStatement", () => {
  test("widens a cut quote to its whole passage, verbatim", () => {
    expect(
      widenStatement(
        '"No recommendation. The nonprofit federally qualified health centers"',
        guide,
      ),
    ).toBe(`"${PROP_44}"`);
  });

  test("nests the source's own double quotes as single ones", () => {
    const wide = widenStatement('"We will be recommending No on this measure."', guide);
    expect(wide).toContain("Evolve California warns 'if this measure passes,");
    expect(quoteBounds(wide as string, guide)).toEqual({ kind: "whole" });
  });

  test("two quotes from one passage become one", () => {
    expect(
      widenStatement('"No recommendation."; "However, using the ballot initiative"', guide),
    ).toBe(`"${PROP_44}"`);
  });

  test("leaves whole statements alone", () => {
    expect(widenStatement('"Governor: No Endorsement"', guide)).toBeNull();
  });

  test("past the length limit, widens to whole sentences and marks the rest", () => {
    const long = indexed(
      `${"Filler sentence here. ".repeat(80)}We endorse Jane Doe. ${"More text. ".repeat(80)}`,
    );
    expect(widenStatement('"We endorse Jane"', long)).toBe('"… We endorse Jane Doe. …"');
  });

  test("won't guess between two passages that share the quoted words", () => {
    const twice = indexed(
      "ANN LEE\nAnn is great. We proudly support her candidacy.\nBEA ROE\nBea is great too. We proudly support her candidacy.",
    );
    expect(() => widenStatement('"We proudly support her candidacy."', twice)).toThrow(
      AmbiguousQuote,
    );
    // Another quote in the statement says which one it meant.
    expect(widenStatement('"ANN LEE" ... "We proudly support her candidacy."', twice)).toBe(
      '"ANN LEE" ... "Ann is great. We proudly support her candidacy."',
    );
  });
});

describe("unwrapMarkdown", () => {
  test("joins a hard-wrapped paragraph, so a quote cut at the wrap doesn't read as whole", () => {
    const md =
      "> We recommend Jane Doe because she has a record of real results on\n> housing and transit in this district.";
    const text = indexed(unwrapMarkdown(md));
    expect(
      quoteBounds('"We recommend Jane Doe because she has a record of real results on"', text).kind,
    ).toBe("cut");
  });

  test("leaves one-entry-per-line lists, short lines and fenced page text alone", () => {
    const list =
      "YES ON PROP 3: Protect Education Funding by Keeping Current Tax Rates\nYES ON PROP 4: Allows Communities";
    expect(unwrapMarkdown(list)).toBe(list);
    const fenced =
      "```text\nThis line is long enough to look like a wrapped line in prose\nand this one goes on\n```";
    expect(unwrapMarkdown(fenced)).toBe(fenced);
  });
});
