import { describe, expect, test } from "bun:test";
import { collegeDistrict, countyName, districtFor, schoolDistrict } from "./lib/districts";

const OC = "us/ca/orange-county";
const race = (title: string, jurisdiction = OC) => ({ title, kind: "race", jurisdiction });
const district = (title: string, jurisdiction = OC, listing = OC) =>
  districtFor(race(title, jurisdiction), listing).district;

describe("districtFor", () => {
  test("school boards: the Census district, and its trustee area", () => {
    expect(district("Huntington Beach City School District Board, Trustee Area 4")).toBe(
      "us/ca/elsd-18030/ta-4",
    );
    expect(district("Laguna Beach Unified School District Board")).toBe("us/ca/unsd-20370");
    expect(district("Cypress School District Board, Trustee Area B")).toBe("us/ca/elsd-10440/ta-b");
    // "Area" and "District" are trustee areas too; a seat is at large.
    const LA = "us/ca/los-angeles-county";
    expect(district("Pasadena Unified School District Board, District 3", LA, LA)).toBe(
      "us/ca/unsd-29940/ta-3",
    );
    const SD = "us/ca/san-diego-county";
    expect(district("Santee School District Board, Seat 1", SD, SD)).toBe("us/ca/elsd-35880");
  });

  test("a school district's measure", () => {
    const measure = {
      title: "Westminster School District — Measure B (Repairs)",
      jurisdiction: OC,
    };
    expect(districtFor(measure, OC).district).toBe("us/ca/elsd-42150");
  });

  test("other districts by name, with their sub-areas", () => {
    expect(district("Irvine Ranch Water District Board, Division 5")).toBe(
      "us/ca/irvine-ranch-water-district/div-5",
    );
    expect(district("Coast Community College District Board, Trustee Area 3 (Short Term)")).toBe(
      "us/ca/ccd-830/ta-3",
    );
    expect(district("Moulton Niguel Water District Board (Short Term)")).toBe(
      "us/ca/moulton-niguel-water-district",
    );
  });

  test("supervisors, city councils, county boards of education, BOE", () => {
    expect(district("Orange County Board of Supervisors, District 4")).toBe(`${OC}/sup-4`);
    expect(district("Santa Ana City Council, Ward 2", "us/ca/santa-ana")).toBe(
      "us/ca/santa-ana/council-2",
    );
    const SC = "us/ca/santa-clara-county";
    expect(district("Santa Clara County Board of Education, Trustee Area 7", SC, SC)).toBe(
      `${SC}/coe-7`,
    );
    expect(district("California State Board of Equalization, District 2", "us/ca", "us/ca")).toBe(
      "us/ca/boe-2",
    );
  });

  test("countywide and citywide contests have none", () => {
    expect(district("Orange County Assessor")).toBeUndefined();
    expect(districtFor({ title: "Orange County — Measure A", jurisdiction: OC }, OC).district).toBe(
      undefined,
    );
    expect(district("Huntington Beach City Council", "us/ca/huntington-beach")).toBeUndefined();
    // Newport Beach's council districts are where members live; the whole city votes.
    expect(district("Newport Beach City Council, District 3", "us/ca/newport-beach")).toBe(
      undefined,
    );
    // San Francisco's school and college boards are the city's own.
    const SF = "us/ca/sf";
    expect(district("San Francisco Unified School District Board of Education", SF, SF)).toBe(
      undefined,
    );
  });
});

describe("schoolDistrict", () => {
  test("a name two counties share is told apart by county", () => {
    expect(schoolDistrict("Ocean View School District", "Orange")?.lea).toBe("28140");
    expect(schoolDistrict("Ocean View School District", "Ventura")?.lea).toBe("28170");
    expect(schoolDistrict("Ocean View School District", "Alameda")).toBeUndefined();
  });

  test("listings' wording matches Census's", () => {
    // "Joint" moved, "High" missing, "City" added.
    expect(
      schoolDistrict("Antelope Valley Joint Union High School District", "Los Angeles")?.lea,
    ).toBe("02820");
    expect(
      schoolDistrict("Los Gatos-Saratoga Union High School District", "Santa Clara")?.lea,
    ).toBe("22800");
    expect(schoolDistrict("San Diego Unified School District", "San Diego")?.lea).toBe("34320");
  });
});

test("countyName", () => {
  expect(countyName("us/ca/orange-county")).toBe("Orange");
  expect(countyName("us/ca/san-diego")).toBe("San Diego");
  expect(countyName("us/ca/sf")).toBe("San Francisco");
});

test("collegeDistrict: listings' names match the Collaborative's", () => {
  expect(collegeDistrict("Coast Community College District")).toBe("830");
  expect(collegeDistrict("Foothill-De Anza Community College District")).toBe("420");
  expect(collegeDistrict("San José-Evergreen Community College District")).toBe("470");
  expect(collegeDistrict("Gavilan Joint Community College District")).toBe("440");
  expect(collegeDistrict("Nowhere Community College District")).toBeUndefined();
});
