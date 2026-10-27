import { describe, expect, test } from "bun:test";
import { votedInFor, votedInProblem } from "./lib/regions";

const E = "2026-11-03";
const RTM = {
  title: "Bay Area — Regional Measure RTM (Regional Transit Measure)",
  jurisdiction: "us/ca/bay-area",
};
const COUNTIES = [
  "us/ca/alameda-county",
  "us/ca/contra-costa-county",
  "us/ca/san-mateo-county",
  "us/ca/santa-clara-county",
  "us/ca/sf",
];

describe("votedInFor", () => {
  test("RTM is voted in five counties", () => {
    expect(votedInFor(RTM, E)).toEqual(COUNTIES);
    expect(votedInFor({ ...RTM, election: E }, "2026-06-02")).toEqual(COUNTIES);
  });

  test("anything else has none", () => {
    expect(votedInFor({ ...RTM, election: "2026-06-02" }, E)).toBeUndefined();
    expect(votedInFor({ title: "San Francisco — Measure A", jurisdiction: "us/ca/sf" }, E)).toBe(
      undefined,
    );
  });
});

describe("votedInProblem", () => {
  test("a regional contest needs its voted_in, exactly", () => {
    expect(votedInProblem({ ...RTM, voted_in: COUNTIES }, E)).toBeUndefined();
    expect(votedInProblem(RTM, E)).toContain("voted_in none");
    expect(votedInProblem({ ...RTM, voted_in: ["us/ca/sf"] }, E)).toContain('["us/ca/sf"]');
  });

  test("a contest under a region the table doesn't name is a problem", () => {
    expect(
      votedInProblem({ title: "Bay Area — Measure Z", jurisdiction: "us/ca/bay-area" }, E),
    ).toBe(
      '"Bay Area — Measure Z": filed under the region us/ca/bay-area, which no regional contest in scripts/lib/regions.ts names',
    );
  });

  test("anything else mustn't carry one", () => {
    const measure = { title: "San Francisco — Measure A", jurisdiction: "us/ca/sf" };
    expect(votedInProblem(measure, E)).toBeUndefined();
    expect(votedInProblem({ ...measure, voted_in: ["us/ca/sf"] }, E)).toContain("want none");
  });
});
