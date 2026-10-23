import { describe, expect, test } from "bun:test";
import { type Bundle, ballotFrom, checkBundle, describe as describeProblem } from "./ballot";

const race = (title: string, jurisdiction = "us/ca") => ({
  title,
  kind: "race",
  jurisdiction,
  election: "2026-11-03",
});

const sos: Bundle = {
  attribution: { of: { kind: "election-authority" } },
  positions: [
    { subject: race("California Secretary of State"), choice: "Shirley N. Weber" },
    { subject: race("California Secretary of State"), choice: "Donald P. (Don) Wagner" },
    {
      subject: race("California State Assembly, District 44", "us/ca/ad-44"),
      choice: "Carolyn Daniels",
    },
    {
      subject: race("California State Assembly, District 44", "us/ca/ad-44"),
      choice: 'Nicholas "Nick" Schultz',
    },
  ],
};
const ballot = ballotFrom([sos]);
const org = (...positions: Bundle["positions"]): Bundle => ({
  attribution: { of: { kind: "organization" } },
  positions,
});

describe("checkBundle", () => {
  test("ballot spellings pass", () => {
    const check = checkBundle(
      org(
        { subject: race("California Secretary of State"), choice: "Donald P. (Don) Wagner" },
        {
          subject: race("California State Assembly, District 44", "us/ca/ad-44"),
          choice: 'Nicholas "Nick" Schultz',
        },
      ),
      ballot,
    );
    expect(check).toEqual({ problems: [], checked: 2, unchecked: 0 });
  });

  test("the two-spellings bug: a nickname spelling fails, naming the ballot spelling", () => {
    const { problems } = checkBundle(
      org({ subject: race("California Secretary of State"), choice: "Don Wagner" }),
      ballot,
    );
    expect(problems).toEqual([
      {
        index: 0,
        kind: "choice",
        title: "California Secretary of State",
        choice: "Don Wagner",
        ballot: ["Shirley N. Weber", "Donald P. (Don) Wagner"],
        suggestion: { name: "Donald P. (Don) Wagner", sure: true },
      },
    ]);
    expect(describeProblem(problems[0] as (typeof problems)[0])).toContain(
      'ballot spelling: "Donald P. (Don) Wagner"',
    );
  });

  test("someone not on the ballot fails, listing who is", () => {
    const [problem] = checkBundle(
      org({ subject: race("California Secretary of State"), choice: "Jane Doe" }),
      ballot,
    ).problems;
    expect(problem).toMatchObject({ kind: "choice", choice: "Jane Doe" });
    expect(problem && "suggestion" in problem).toBe(false);
    expect(describeProblem(problem as NonNullable<typeof problem>)).toContain(
      '"Shirley N. Weber", "Donald P. (Don) Wagner"',
    );
  });

  test("a race the authority doesn't list, in a jurisdiction it covers, fails", () => {
    const { problems } = checkBundle(
      org({ subject: race("Secretary of State"), choice: "Shirley N. Weber" }),
      ballot,
    );
    expect(problems).toEqual([
      { index: 0, kind: "race", title: "Secretary of State", jurisdiction: "us/ca" },
    ]);
  });

  test("a race in a jurisdiction no authority covers isn't checked", () => {
    const check = checkBundle(
      org({ subject: race("Fontana Mayor", "us/ca/fontana"), choice: "Joz Sida" }),
      ballot,
    );
    expect(check).toEqual({ problems: [], checked: 0, unchecked: 1 });
  });

  test("a position on the race as a whole, with no choice, passes", () => {
    expect(
      checkBundle(org({ subject: race("California Secretary of State") }), ballot).problems,
    ).toEqual([]);
  });

  test("the election comes from the bundle's context when the subject has none", () => {
    const bundle: Bundle = {
      context: { election: "2026-11-03" },
      positions: [
        {
          subject: { title: "California Secretary of State", jurisdiction: "us/ca" },
          choice: "Don Wagner",
        },
      ],
    };
    expect(checkBundle(bundle, ballot).problems).toHaveLength(1);
  });

  test("an authority's own bundle isn't checked against itself", () => {
    expect(checkBundle(sos, ballot)).toEqual({ problems: [], checked: 0, unchecked: 0 });
  });
});
