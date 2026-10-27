// Who votes on a ballot listing's contest, when only part of its jurisdiction does: the OpenSlate
// `subject.district` (SPEC §3.3). A county files its school boards, water districts and
// supervisorial districts under the county, but a voter has only their own; the app uses
// `district` to show each race to the voters who have it, and lists the ones it can't place
// (no boundaries for a water district's divisions) as "might be on your ballot".
//
// Paths, as the app reads them (apps/web/src/lib/jurisdictions.ts, `placeRace`):
//
//   us/ca/boe-2                         Board of Equalization district 2
//   us/ca/orange-county/sup-4           a county's supervisorial district
//   us/ca/anaheim/council-3             a city council district
//   us/ca/orange-county/coe-2           a county board of education's trustee area
//   us/ca/elsd-18030/ta-4               a school district (Census LEA code) and trustee area
//   us/ca/ccd-830/ta-1                  a community college district (Chancellor's Office code)
//   us/ca/irvine-ranch-water-district/div-5   any other district, by name, and its division
//
// School and college districts are matched to the boundaries the app finds from a voter's
// address: the Census Bureau's school districts (scripts/data/ca-school-districts.json, by
// scripts/fetch-school-districts.ts) and the CCC GIS Collaborative's college districts
// (scripts/data/ca-community-college-districts.json, by scripts/fetch-college-districts.ts).
// The rest are named, which the app can't find, so they're listed as might-be.

import collegeData from "../data/ca-community-college-districts.json";
import schoolData from "../data/ca-school-districts.json";
import { slugify, strip } from "./ballot-subjects";

interface SchoolDistrict {
  family: "unsd" | "elsd" | "scsd";
  lea: string;
  name: string;
  /** The county the district's Census interior point is in. */
  county: string;
}
const SCHOOLS = schoolData.districts as SchoolDistrict[];

/**
 * Words that don't tell two school districts apart, or that listings and Census spell
 * differently: "Huntington Beach City School District" is Census's "Huntington Beach City
 * Elementary School District", "Antelope Valley Joint Union High" its "Antelope Valley Union
 * Joint High". The family (`familiesFor`) still separates Escondido Union from Escondido Union
 * High.
 */
const SCHOOL_FILLER = new Set([
  "elementary",
  "city",
  "joint",
  "high",
  "unified",
  "school",
  "district",
]);
function schoolKey(name: string): string {
  return strip(name)
    .split(" ")
    .filter((w) => !SCHOOL_FILLER.has(w))
    .join(" ");
}
const SCHOOLS_BY_KEY = new Map<string, SchoolDistrict[]>();
for (const d of SCHOOLS) {
  const key = schoolKey(d.name);
  SCHOOLS_BY_KEY.set(key, [...(SCHOOLS_BY_KEY.get(key) ?? []), d]);
}

/** Which Census families a listing's name can be: "High" is secondary, "Unified" unified. */
function familiesFor(name: string): SchoolDistrict["family"][] {
  if (/\bHigh\b/i.test(name)) return ["scsd"];
  if (/\bUnified\b/i.test(name)) return ["unsd"];
  return ["elsd", "unsd"];
}

/**
 * The Census school district a listing names, in its county. Undefined when none matches, or
 * more than one does even within the county.
 */
export function schoolDistrict(name: string, county: string): SchoolDistrict | undefined {
  const families = familiesFor(name);
  const named = (SCHOOLS_BY_KEY.get(schoolKey(name)) ?? []).filter((d) =>
    families.includes(d.family),
  );
  if (named.length === 1) return named[0];
  const here = named.filter((d) => d.county === county);
  return here.length === 1 ? here[0] : undefined;
}

/** Words college district names drop or spell differently ("Gavilan Joint" is "Gavilan"). */
const COLLEGE_FILLER = new Set(["community", "college", "district", "joint"]);
function collegeKey(name: string): string {
  // Spaces go too: a listing's "Foothill-De Anza" is the Collaborative's "Foothill-DeAnza".
  return strip(name)
    .split(" ")
    .filter((w) => !COLLEGE_FILLER.has(w))
    .join("");
}
const COLLEGES = new Map(collegeData.districts.map((d) => [collegeKey(d.name), d.code]));

/** A community college district's Chancellor's Office code, from a listing's name for it. */
export function collegeDistrict(name: string): string | undefined {
  return COLLEGES.get(collegeKey(name));
}

/** The county a listing covers, as Census names it, from its jurisdiction path. */
export function countyName(jurisdiction: string): string {
  if (jurisdiction === "us/ca/sf") return "San Francisco";
  return (jurisdiction.split("/").pop() ?? "")
    .replace(/-county$/, "")
    .split("-")
    .map((w) => (w ? w[0]?.toUpperCase() + w.slice(1) : w))
    .join(" ");
}

/** A district family per word a title uses for a body's sub-areas. */
const SUB_AREAS: Record<string, string> = {
  "trustee area": "ta",
  area: "area",
  district: "dist",
  division: "div",
  ward: "ward",
  zone: "zone",
};
/** In a school or college district, every sub-area is a trustee area, whatever it's called. */
const SCHOOL_SUB_AREAS = new Set(["trustee area", "area", "district"]);

/** A `<family>-<id>` segment, as the app parses one (a place's slug mustn't look like it). */
const DISTRICT_SEGMENT = /^[a-z]+-(\d+|[a-z])$/;

function idOf(id: string): string {
  return /^\d+$/.test(id) ? String(Number(id)) : id.toLowerCase();
}

function placePath(state: string, body: string): string {
  const slug = slugify(body);
  if (!slug || DISTRICT_SEGMENT.test(slug)) throw new Error(`can't name "${body}" as a place`);
  return `${state}/${slug}`;
}

/** The body a board or measure title names ("Fullerton Joint Union High School District"). */
function bodyOf(title: string): string | undefined {
  const measure = /^(.+?) — Measure \S+/.exec(title);
  const board =
    /^(.+?) Board(?: of (?:Trustees|Directors|Education))?(?:, (?:Trustee Area|Area|District|Division|Ward|Zone|Seat) \w+)?$/.exec(
      title,
    );
  return (measure?.[1] ?? board?.[1])?.trim();
}

/**
 * Straddling districts whose county of record (the CDE's, the CDS code's county) isn't the
 * one with most of their area, which is what the Census data's `county` is.
 */
const COUNTY_OF_RECORD: Record<string, string> = {
  "07900": "Sacramento", // Center Joint Unified (34-73973): Antelope, with land in Placer
  "23010": "Orange", // Lowell Joint (30-64766): Whittier and La Habra
};

/**
 * The county a school district contest belongs under when it's filed under another: a
 * district that crosses a county line is on both counties' ballots, and each county's
 * registrar lists it, but it's one race, filed once, under the county the Census puts it in.
 * Undefined when the contest is where it belongs, or isn't a school district's.
 */
export function homeCounty(subject: { title: string; jurisdiction?: string }): string | undefined {
  const jurisdiction = subject.jurisdiction ?? "";
  const match = /^((?:[a-z]+\/)+?[a-z]+)\/([a-z-]+)-county$/.exec(jurisdiction);
  if (!match?.[1]) return undefined;
  const body = bodyOf(withoutTerm(subject.title.trim()));
  if (!body || !/School District$/.test(body)) return undefined;
  const school = schoolDistrict(body, countyName(jurisdiction));
  const home = school && (COUNTY_OF_RECORD[school.lea] ?? school.county);
  if (!home || home === countyName(jurisdiction)) return undefined;
  return `${match[1]}/${slugify(home)}-county`;
}

/**
 * Cities whose council members live in districts but are elected by the whole city. A
 * registrar titles such a seat "City Council, District N" all the same, so the title can't tell
 * it from a seat voted by district; a district tag would hide the race from every voter outside
 * that district once the app knows the city's districts.
 *
 * Checked for 2026-11-03 (OpenSlate's plans/council-districts-lookup.md says how):
 *   - Newport Beach: its council page says members are "elected by the voters at large to
 *     represent their respective districts"; the 2026 ballot has no measure changing that.
 * Seats that looked like this but are voted by district: Huntington Park's District 2 (LA's
 * sample ballot data gives each ballot type in the city one of districts 2, 4 and 5) and San
 * Leandro's District 2 (the City Clerk: Measure F moved districts 1, 2, 3 and 5 to district
 * elections).
 */
const CITYWIDE_COUNCILS = new Set(["us/ca/newport-beach"]);

export interface DistrictResult {
  district?: string;
  /** Why a school or college board got a named path instead of a mapped one: worth a look. */
  warning?: string;
}

/** Term notes that don't change who votes: "(Short Term)", ", Partial Term". */
function withoutTerm(title: string): string {
  return title
    .replace(/\s*\((?:Short|Full|Partial|Unexpired) Term\)$/i, "")
    .replace(/,\s*(?:Short|Full|Partial|Unexpired) Term$/i, "");
}

/**
 * `subject.district` for a contest in an election authority's listing that covers
 * `listingJurisdiction` (its `context.jurisdiction`, e.g. `us/ca/orange-county`). Undefined when
 * the whole of the contest's jurisdiction votes on it.
 */
export function districtFor(
  subject: { title: string; jurisdiction?: string; kind?: string },
  listingJurisdiction: string,
): DistrictResult {
  const state = listingJurisdiction.split("/").slice(0, 2).join("/");
  const jurisdiction = subject.jurisdiction ?? listingJurisdiction;
  const title = withoutTerm(subject.title.trim());

  const boe = /^California State Board of Equalization, District (\d+)$/.exec(title);
  if (boe?.[1]) return { district: `${state}/boe-${idOf(boe[1])}` };

  const supervisors = /Board of Supervisors, District (\w+)$/.exec(title);
  if (supervisors?.[1]) return { district: `${jurisdiction}/sup-${idOf(supervisors[1])}` };

  const council = /(?:City|Town) Council, (?:District|Ward) (\w+)$/.exec(title);
  if (council?.[1]) {
    if (CITYWIDE_COUNCILS.has(jurisdiction)) return {};
    return { district: `${jurisdiction}/council-${idOf(council[1])}` };
  }

  const education = /County Board of Education, (?:Trustee Area|Area|District) (\w+)$/.exec(title);
  if (education?.[1]) return { district: `${jurisdiction}/coe-${idOf(education[1])}` };

  // The rest: special districts a county files under itself, or under a school district's home
  // county when it crosses the line (`homeCounty`). San Francisco's are the city's own,
  // citywide (its school and college boards); a city's are the city's.
  const home = homeCounty({ title, jurisdiction: listingJurisdiction });
  if (jurisdiction !== (home ?? listingJurisdiction) || jurisdiction === `${state}/sf`) return {};
  const county = countyName(listingJurisdiction);
  // An unincorporated community's planning group: only that community votes.
  if (/ Community Planning Group$/.test(title)) return { district: placePath(state, title) };
  const measure = /^(.+?) — Measure \S+/.exec(title);
  const board =
    /^(.+?) Board(?: of (?:Trustees|Directors|Education))?(?:, (Trustee Area|Area|District|Division|Ward|Zone|Seat) (\w+))?$/.exec(
      title,
    );
  const body = bodyOf(title);
  if (!body) return {};
  // The county's own (its measures, "San Diego County Board of Education" at large).
  if (strip(body) === strip(county) || strip(body) === strip(`${county} County`)) return {};
  const sub = measure ? undefined : board?.[2]?.toLowerCase();
  const subId = board?.[3];

  if (/School District$/.test(body)) {
    const school = schoolDistrict(body, county);
    const base = school ? `${state}/${school.family}-${idOf(school.lea)}` : placePath(state, body);
    const warning = school ? undefined : `no Census school district matches "${body}" (${county})`;
    const path = sub && SCHOOL_SUB_AREAS.has(sub) && subId ? `${base}/ta-${idOf(subId)}` : base;
    return warning ? { district: path, warning } : { district: path };
  }
  if (/Community College District$/.test(body)) {
    const code = collegeDistrict(body);
    const base = code ? `${state}/ccd-${idOf(code)}` : placePath(state, body);
    const warning = code ? undefined : `no college district matches "${body}"`;
    const path = sub && SCHOOL_SUB_AREAS.has(sub) && subId ? `${base}/ta-${idOf(subId)}` : base;
    return warning ? { district: path, warning } : { district: path };
  }
  const base = placePath(state, body);
  if (!sub || sub === "seat" || !subId) return { district: base };
  return { district: `${base}/${SUB_AREAS[sub]}-${idOf(subId)}` };
}
