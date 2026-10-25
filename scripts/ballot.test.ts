import { describe, expect, test } from "bun:test";
import { type Bundle, ballotFrom, checkBundle, describe as describeProblem } from "./ballot";

const race = (title: string, jurisdiction = "us/ca") => ({
  title,
  kind: "race",
  jurisdiction,
  election: "2026-11-03",
});
const SOS = race("California Secretary of State");
const AD44 = race("California State Assembly, District 44", "us/ca/ad-44");

const sos: Bundle = {
  attribution: { of: { kind: "election-authority" } },
  positions: [
    { subject: SOS, stance: "neutral", choice: "Shirley N. Weber", choice_id: "sos:weber" },
    { subject: SOS, stance: "neutral", choice: "Donald P. (Don) Wagner", choice_id: "sos:wagner" },
    {
      subject: SOS,
      stance: "neutral",
      choice: "Jane Q. Writein",
      choice_id: "sos:writein",
      write_in: true,
    },
    { subject: AD44, stance: "neutral", choice: "Carolyn Daniels", choice_id: "ad44:daniels" },
    {
      subject: AD44,
      stance: "neutral",
      choice: 'Nicholas "Nick" Schultz',
      choice_id: "ad44:schultz",
    },
  ],
};
const ballot = ballotFrom([sos]);
const org = (...positions: Bundle["positions"]): Bundle => ({
  attribution: { of: { kind: "organization" } },
  positions,
});

describe("checkBundle", () => {
  test("ballot spellings with their ids pass", () => {
    const check = checkBundle(
      org(
        {
          subject: SOS,
          stance: "endorse",
          choice: "Donald P. (Don) Wagner",
          choice_id: "sos:wagner",
        },
        {
          subject: AD44,
          stance: "endorse",
          choice: 'Nicholas "Nick" Schultz',
          choice_id: "ad44:schultz",
        },
      ),
      ballot,
    );
    expect(check).toEqual({ problems: [], warnings: [], checked: 2, unchecked: 0 });
  });

  test("the two-spellings bug: a nickname spelling fails, as a fix to the listed choice", () => {
    const { problems } = checkBundle(
      org({ subject: SOS, stance: "endorse", choice: "Don Wagner" }),
      ballot,
    );
    expect(problems).toEqual([
      {
        index: 0,
        kind: "fix",
        title: "California Secretary of State",
        choice: "Don Wagner",
        listed: {
          name: "Donald P. (Don) Wagner",
          id: "sos:wagner",
          writeIn: false,
        },
      },
    ]);
    expect(describeProblem(problems[0] as (typeof problems)[number])).toContain(
      'is the ballot\'s "Donald P. (Don) Wagner" (sos:wagner)',
    );
  });

  test("the right spelling without the listing's id fails, as a fix", () => {
    const { problems } = checkBundle(
      org({ subject: SOS, stance: "endorse", choice: "Shirley N. Weber" }),
      ballot,
    );
    expect(problems.map((p) => p.kind)).toEqual(["fix"]);
  });

  test("a certified write-in has to say it's a write-in", () => {
    const missing = checkBundle(
      org({ subject: SOS, stance: "endorse", choice: "Jane Q. Writein", choice_id: "sos:writein" }),
      ballot,
    );
    expect(missing.problems.map((p) => p.kind)).toEqual(["fix"]);
    const marked = checkBundle(
      org({
        subject: SOS,
        stance: "endorse",
        choice: "Jane Q. Writein",
        choice_id: "sos:writein",
        write_in: true,
      }),
      ballot,
    );
    expect(marked.problems).toEqual([]);
  });

  test("an uncertified write-in passes with a warning", () => {
    const check = checkBundle(
      org({ subject: SOS, stance: "endorse", choice: "Mickey Mouse", write_in: true }),
      ballot,
    );
    expect(check.problems).toEqual([]);
    expect(check.warnings).toEqual([
      { index: 0, title: "California Secretary of State", choice: "Mickey Mouse" },
    ]);
  });

  test("an unknown name fails and lists the race's ballot names", () => {
    const { problems } = checkBundle(
      org({ subject: AD44, stance: "endorse", choice: "Jane Doe" }),
      ballot,
    );
    expect(problems).toEqual([
      {
        index: 0,
        kind: "choice",
        title: "California State Assembly, District 44",
        choice: "Jane Doe",
        ballot: ["Carolyn Daniels", 'Nicholas "Nick" Schultz'],
      },
    ]);
    expect(describeProblem(problems[0] as (typeof problems)[number])).toContain(
      'a write-in needs "write_in": true',
    );
  });

  test("a resemblance fails, with the suggestion", () => {
    const { problems } = checkBundle(
      org({ subject: SOS, stance: "endorse", choice: "Shirley Webber" }),
      ballot,
    );
    expect(problems[0]).toMatchObject({ kind: "choice", suggestion: { name: "Shirley N. Weber" } });
  });

  test("a race title the authority doesn't list fails", () => {
    const { problems } = checkBundle(
      org({ subject: race("Secretary of State"), stance: "endorse", choice: "Yes" }),
      ballot,
    );
    expect(problems).toEqual([
      { index: 0, kind: "race", title: "Secretary of State", jurisdiction: "us/ca" },
    ]);
  });

  test("a listed candidate on the wrong race fails, naming the race they're on", () => {
    const wrongTitle = checkBundle(
      org({ subject: race("Secretary of State"), stance: "endorse", choice: "Shirley N. Weber" }),
      ballot,
    ).problems;
    expect(wrongTitle).toEqual([
      {
        index: 0,
        kind: "race",
        title: "Secretary of State",
        jurisdiction: "us/ca",
        moveTo: {
          title: "California Secretary of State",
          jurisdiction: "us/ca",
          listed: { name: "Shirley N. Weber", id: "sos:weber", writeIn: false },
        },
      },
    ]);
    expect(describeProblem(wrongTitle[0] as (typeof wrongTitle)[number])).toContain(
      'is on the ballot for "California Secretary of State" (us/ca): the wrong race?',
    );
    // Another jurisdiction only when the titles name the same place: AD-44's names don't
    // move to a statewide race.
    expect(
      checkBundle(org({ subject: SOS, stance: "endorse", choice: "Carolyn Daniels" }), ballot)
        .problems[0],
    ).not.toHaveProperty("moveTo");
  });

  test("a race filed under another jurisdiction moves when its title names the same place", () => {
    const county: Bundle = {
      attribution: { of: { kind: "election-authority" } },
      positions: [
        {
          subject: race(
            "Carlsbad Unified School District Board, Trustee Area 5",
            "us/ca/san-diego-county",
          ),
          stance: "neutral",
          choice: "Chris Waidelich",
          choice_id: "sd:cusd5/waidelich",
        },
        {
          subject: race("Carlsbad City Council, District 1", "us/ca/carlsbad"),
          stance: "neutral",
          choice: "Nate Larson",
          choice_id: "sd:ccc1/larson",
        },
      ],
    };
    const { problems } = checkBundle(
      org({
        subject: race("Carlsbad Unified School District Board, Area 5", "us/ca/carlsbad"),
        stance: "endorse",
        choice: "Chris Waidelich",
      }),
      ballotFrom([county]),
    );
    expect(problems[0]).toMatchObject({
      kind: "race",
      moveTo: {
        title: "Carlsbad Unified School District Board, Trustee Area 5",
        jurisdiction: "us/ca/san-diego-county",
      },
    });
  });

  test("a jurisdiction no authority covers is unchecked, not failed", () => {
    expect(
      checkBundle(
        org({ subject: race("Mayor", "us/ca/la"), stance: "endorse", choice: "Anyone" }),
        ballot,
      ),
    ).toEqual({ problems: [], warnings: [], checked: 0, unchecked: 1 });
  });

  test("a position with no choice passes", () => {
    expect(checkBundle(org({ subject: SOS, stance: "endorse" }), ballot).problems).toEqual([]);
  });

  test("the election falls back to the bundle's context", () => {
    const { election: _, ...noElection } = SOS;
    const bundle: Bundle = {
      ...org({ subject: noElection, stance: "endorse", choice: "Don Wagner" }),
      context: { election: "2026-11-03" },
    };
    expect(checkBundle(bundle, ballot).problems.map((p) => p.kind)).toEqual(["fix"]);
  });

  test("a listing's choices need ids", () => {
    const listing: Bundle = {
      ...sos,
      positions: [{ subject: SOS, stance: "neutral", choice: "No Id Yet" }],
    };
    expect(checkBundle(listing, ballot).problems).toEqual([
      { index: 0, kind: "listing-id", title: "California Secretary of State", choice: "No Id Yet" },
    ]);
  });
});
