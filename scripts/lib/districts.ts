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
//   us/ca/irvine-ranch-water-district/div-5   any other district, by name, and its division
//
// School districts are matched to the Census Bureau's (scripts/data/ca-school-districts.json, by
// scripts/fetch-school-districts.ts), because the app finds those from a voter's address; the
// rest are named, which the app can't find, so they're listed as might-be.

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

export interface DistrictResult {
  district?: string;
  /** Why a school board got a named path instead of a Census one: worth a look. */
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
  if (council?.[1]) return { district: `${jurisdiction}/council-${idOf(council[1])}` };

  const education = /County Board of Education, (?:Trustee Area|Area|District) (\w+)$/.exec(title);
  if (education?.[1]) return { district: `${jurisdiction}/coe-${idOf(education[1])}` };

  // The rest: special districts a county files under itself. San Francisco's are the city's
  // own, citywide (its school and college boards); a city's are the city's.
  if (jurisdiction !== listingJurisdiction || jurisdiction === `${state}/sf`) return {};
  const county = countyName(listingJurisdiction);
  // An unincorporated community's planning group: only that community votes.
  if (/ Community Planning Group$/.test(title)) return { district: placePath(state, title) };
  const measure = /^(.+?) — Measure \S+/.exec(title);
  const board =
    /^(.+?) Board(?: of (?:Trustees|Directors|Education))?(?:, (Trustee Area|Area|District|Division|Ward|Zone|Seat) (\w+))?$/.exec(
      title,
    );
  const body = (measure?.[1] ?? board?.[1])?.trim();
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
  const base = placePath(state, body);
  if (!sub || sub === "seat" || !subId) return { district: base };
  const family =
    /Community College District$/.test(body) && SCHOOL_SUB_AREAS.has(sub) ? "ta" : SUB_AREAS[sub];
  return { district: `${base}/${family}-${idOf(subId)}` };
}
