// Which locality path a city's or a county's contest is filed under. A county is
// `<state>/<name>-county` (San Francisco, one city and county, `us/ca/sf`); a city is
// `<state>/<name>`, or `<state>/city-of-<name>`. A county's bare name is a city's path when a
// city shares the name (`us/ca/orange` is the City of Orange), and no one's when none does. The
// app looks counties up as `<name>-county` (OpenSlate's apps/web/src/lib/geo.ts), so a county
// contest under a bare name reaches the wrong voters, or none.

const CA_COUNTIES =
  "Alameda, Alpine, Amador, Butte, Calaveras, Colusa, Contra Costa, Del Norte, El Dorado, Fresno, Glenn, Humboldt, Imperial, Inyo, Kern, Kings, Lake, Lassen, Los Angeles, Madera, Marin, Mariposa, Mendocino, Merced, Modoc, Mono, Monterey, Napa, Nevada, Orange, Placer, Plumas, Riverside, Sacramento, San Benito, San Bernardino, San Diego, San Joaquin, San Luis Obispo, San Mateo, Santa Barbara, Santa Clara, Santa Cruz, Shasta, Sierra, Siskiyou, Solano, Sonoma, Stanislaus, Sutter, Tehama, Trinity, Tulare, Tuolumne, Ventura, Yolo, Yuba".split(
    ", ",
  );

/**
 * Counties a California city shares a name with (the Census's places, 2024). Ventura is the
 * City of San Buenaventura's everyday name. San Francisco is both, filed as `us/ca/sf`.
 */
const NAMED_LIKE_A_CITY = new Set(
  "Alameda, Colusa, Fresno, Imperial, Los Angeles, Madera, Merced, Monterey, Napa, Orange, Riverside, Sacramento, San Bernardino, San Diego, San Joaquin, San Luis Obispo, San Mateo, Santa Barbara, Santa Clara, Santa Cruz, Sonoma, Tehama, Tulare, Ventura".split(
    ", ",
  ),
);

const slug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
const COUNTY_BY_SLUG = new Map(CA_COUNTIES.map((name) => [`us/ca/${slug(name)}`, name]));

/** A city's own contests: its council, mayor and other officers, its measures, its rent board. */
function isCityTitle(title: string, city: string): boolean {
  return (
    title.startsWith(`${city} `) && /^(City|Town|Mayor|— |Rent )/.test(title.slice(city.length + 1))
  );
}

/**
 * Where a subject filed under a county's bare name belongs, when that isn't where it is:
 * `us/ca/<name>-county`. Undefined for any other jurisdiction, and for a city's own contest
 * under its city's path.
 */
export function countyPathFor(subject: { title: string; jurisdiction?: string }):
  | string
  | undefined {
  const jurisdiction = subject.jurisdiction ?? "";
  const county = COUNTY_BY_SLUG.get(jurisdiction);
  if (!county) return undefined;
  if (NAMED_LIKE_A_CITY.has(county) && isCityTitle(subject.title.trim(), county)) return undefined;
  return `${jurisdiction}-county`;
}

/** What's wrong with where a subject is filed, if anything. */
export function localityProblem(subject: { title: string; jurisdiction?: string }):
  | string
  | undefined {
  const want = countyPathFor(subject);
  if (!want) return undefined;
  const county = COUNTY_BY_SLUG.get(subject.jurisdiction ?? "");
  return county && NAMED_LIKE_A_CITY.has(county)
    ? `"${subject.title}" is a county contest under the City of ${county}'s path ${subject.jurisdiction}; file it under ${want}`
    : `"${subject.title}": ${county} County is ${want}, not ${subject.jurisdiction}`;
}
