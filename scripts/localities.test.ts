import { describe, expect, test } from "bun:test";
import { homeCounty } from "./lib/districts";
import { countyPathFor, localityProblem } from "./lib/localities";

const race = (title: string, jurisdiction: string) => ({ title, jurisdiction });

describe("countyPathFor", () => {
  test("a county contest under a city's name moves to the county", () => {
    expect(countyPathFor(race("Alpine Union School District Board", "us/ca/san-diego"))).toBe(
      "us/ca/san-diego-county",
    );
    expect(
      countyPathFor(race("Orange County Board of Supervisors, District 5", "us/ca/orange")),
    ).toBe("us/ca/orange-county");
    expect(
      countyPathFor(
        race("Los Angeles Community College District Board, Seat 2", "us/ca/los-angeles"),
      ),
    ).toBe("us/ca/los-angeles-county");
  });

  test("the city's own contests stay", () => {
    for (const title of [
      "San Diego City Council, District 2",
      "San Diego — Measure A (Empty Homes Tax)",
      "Orange Mayor",
      "Los Angeles City — Proposition TC (Hotel Tax Expansion)",
      "Ventura City Council, District 1",
    ]) {
      const jurisdiction = `us/ca/${title
        .split(/ (City|Mayor|—)/)[0]
        ?.toLowerCase()
        .replace(/ /g, "-")}`;
      expect(countyPathFor(race(title, jurisdiction))).toBeUndefined();
    }
  });

  test("a county no city shares a name with has only its -county path", () => {
    expect(countyPathFor(race("Superior Court of Contra Costa County", "us/ca/contra-costa"))).toBe(
      "us/ca/contra-costa-county",
    );
  });

  test("other paths are left alone", () => {
    expect(
      countyPathFor(race("Berkeley Rent Stabilization Board", "us/ca/berkeley")),
    ).toBeUndefined();
    expect(
      countyPathFor(race("Alameda County Board of Supervisors", "us/ca/alameda-county")),
    ).toBeUndefined();
    expect(countyPathFor(race("Prop 1", "us/ca"))).toBeUndefined();
  });
});

test("localityProblem says where it belongs", () => {
  expect(
    localityProblem(race("Imperial County Board of Supervisors, District 5", "us/ca/imperial")),
  ).toBe(
    '"Imperial County Board of Supervisors, District 5" is a county contest under the City of Imperial\'s path us/ca/imperial; file it under us/ca/imperial-county',
  );
  expect(
    localityProblem(race("Marin County Board of Supervisors, District 1", "us/ca/marin")),
  ).toBe(
    '"Marin County Board of Supervisors, District 1": Marin County is us/ca/marin-county, not us/ca/marin',
  );
  expect(localityProblem(race("Orange City Council, District 1", "us/ca/orange"))).toBeUndefined();
});

describe("homeCounty", () => {
  test("a school district that crosses a county line is its home county's", () => {
    const fullerton = "Fullerton Joint Union High School District Board, Trustee Area 1";
    expect(homeCounty({ title: fullerton, jurisdiction: "us/ca/los-angeles-county" })).toBe(
      "us/ca/orange-county",
    );
    expect(homeCounty({ title: fullerton, jurisdiction: "us/ca/orange-county" })).toBeUndefined();
    expect(
      homeCounty({
        title: "Paso Robles Joint Unified School District — Measure G-26 (Bond)",
        jurisdiction: "us/ca/monterey-county",
      }),
    ).toBe("us/ca/san-luis-obispo-county");
  });

  test("the county of record wins over the one with most of the area", () => {
    expect(
      homeCounty({
        title: "Center Joint Unified School District Board, Area 1",
        jurisdiction: "us/ca/sacramento-county",
      }),
    ).toBeUndefined();
    expect(
      homeCounty({
        title: "Lowell Joint School District Board, Trustee Area 4",
        jurisdiction: "us/ca/orange-county",
      }),
    ).toBeUndefined();
  });

  test("other contests, and other paths, are left alone", () => {
    expect(
      homeCounty({ title: "Orange City Council, District 1", jurisdiction: "us/ca/orange" }),
    ).toBeUndefined();
    expect(
      homeCounty({
        title: "Irvine Ranch Water District Board, Division 5",
        jurisdiction: "us/ca/orange-county",
      }),
    ).toBeUndefined();
  });
});
