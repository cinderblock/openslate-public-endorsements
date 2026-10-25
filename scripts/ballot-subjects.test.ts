import { describe, expect, test } from "bun:test";
import { type Existing, type Subject, subjectMatcher, titleKey } from "./lib/ballot-subjects";

const COUNTY = "us/ca/los-angeles-county";
const election = "2026-11-03";

function named(titles: string[], org = "some-org"): Existing {
  return new Map(
    titles.map((title) => [
      title,
      {
        subject: { title, kind: "race", jurisdiction: COUNTY, election } satisfies Subject,
        choices: new Set<string>(),
        orgs: new Set([org]),
      },
    ]),
  );
}

function matcher(existing: Existing, own?: Existing) {
  const problems: string[] = [];
  const reuse = subjectMatcher({
    existing,
    own,
    election,
    isLocal: (j) => j === COUNTY,
    problems,
  });
  return { reuse, problems };
}

test("titleKey: the seat's number is what matters, not what the seat is called", () => {
  expect(titleKey("Bellflower Unified School District Board, Trustee Area 2")).toBe(
    titleKey("Bellflower Unified School District Board, Area 2"),
  );
  expect(titleKey("Paramount Unified School District Board, Trustee Area 4")).toBe(
    titleKey("Paramount Unified School District Board, District 4"),
  );
});

describe("subjectMatcher", () => {
  const registrar = { title: "Bellflower Unified School District Board, Trustee Area 2", jurisdiction: COUNTY };

  test("a contest only the listing names keeps its last build's title", () => {
    const own = named(["Bellflower Unified School District Board, Area 2"], "la-county-registrar");
    const { reuse, problems } = matcher(named([]), own);
    expect(reuse(registrar, "race").title).toBe("Bellflower Unified School District Board, Area 2");
    expect(problems).toEqual([]);
  });

  test("another bundle's title wins over the listing's own", () => {
    const existing = named(["Bellflower Unified School District Board, District 2"]);
    const own = named(["Bellflower Unified School District Board, Area 2"], "la-county-registrar");
    expect(reuseWith(existing, own).title).toBe(
      "Bellflower Unified School District Board, District 2",
    );
  });

  test("a new seat takes the label of the listing's own sibling seats", () => {
    const own = named(["Bellflower Unified School District Board, Area 2"], "la-county-registrar");
    const { reuse } = matcher(named([]), own);
    const seat4 = { title: "Bellflower Unified School District Board, Trustee Area 4", jurisdiction: COUNTY };
    expect(reuse(seat4, "race").title).toBe("Bellflower Unified School District Board, Area 4");
  });

  test("a first build keeps the registrar's wording", () => {
    const { reuse } = matcher(named([]));
    expect(reuse(registrar, "race")).toEqual({
      title: "Bellflower Unified School District Board, Trustee Area 2",
      kind: "race",
      jurisdiction: COUNTY,
      election,
    });
  });

  function reuseWith(existing: Existing, own: Existing) {
    return matcher(existing, own).reuse(registrar, "race");
  }
});
