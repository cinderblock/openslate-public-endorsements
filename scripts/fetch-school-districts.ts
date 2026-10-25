#!/usr/bin/env bun
// Build scripts/data/ca-school-districts.json: every California school district in the Census
// Bureau's TIGER boundaries (unified, elementary, secondary), with its 5-digit LEA code, its name,
// and the county its Census interior point is in (a joint district reaches into others too). scripts/lib/districts.ts matches a ballot listing's school board to
// it, so the listing can say which school district votes on the race (`subject.district`,
// `us/ca/elsd-18030/ta-4`) and the app can find that district from the voter's address.
//
// The LEA codes are the ones the OpenSlate web app's boundary file uses (apps/web/scripts/
// build-geo.ts reads the same TIGERweb layers), so the two agree. Rerun when Census publishes a
// new vintage, and commit the output.
//
//   bun scripts/fetch-school-districts.ts

export {}; // a module: top-level await

const SERVICE =
  "https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/tigerWMS_Current/MapServer";
const STATE = "06";
const FAMILIES = { unsd: 14, elsd: 18, scsd: 16 } as const; // TIGERweb layer ids
const COUNTIES = 82;
const OUT = "scripts/data/ca-school-districts.json";

interface Feature {
  attributes: Record<string, string>;
  geometry?: { rings: number[][][] };
}

async function query(layer: number, params: Record<string, string>): Promise<Feature[]> {
  const body = new URLSearchParams({ where: `STATE='${STATE}'`, f: "json", ...params });
  const response = await fetch(`${SERVICE}/${layer}/query`, { method: "POST", body });
  if (!response.ok) throw new Error(`layer ${layer}: HTTP ${response.status}`);
  const json = (await response.json()) as {
    features?: Feature[];
    exceededTransferLimit?: boolean;
    error?: { message?: string };
  };
  if (json.error) throw new Error(`layer ${layer}: ${json.error.message}`);
  if (json.exceededTransferLimit) throw new Error(`layer ${layer}: result truncated`);
  return json.features ?? [];
}

// Counties, generalized to ~200 m: enough to place a district's interior point. (Intersecting
// districts with these outlines instead over-reports badly: half the districts came out in two
// or more counties, among them Oxnard's Ocean View in Los Angeles.)
const counties = await query(COUNTIES, {
  outFields: "BASENAME",
  returnGeometry: "true",
  outSR: "4326",
  maxAllowableOffset: "0.002",
  geometryPrecision: "4",
});
if (counties.length !== 58) throw new Error(`expected 58 counties, got ${counties.length}`);

/** Even-odd point in rings (Esri rings: outer and holes alike, any orientation). */
function inRings(rings: number[][][], x: number, y: number): boolean {
  let inside = false;
  for (const ring of rings) {
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [xi = 0, yi = 0] = ring[i] ?? [];
      const [xj = 0, yj = 0] = ring[j] ?? [];
      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
    }
  }
  return inside;
}

interface District {
  family: keyof typeof FAMILIES;
  lea: string;
  name: string;
  county: string;
}
const districts: District[] = [];
for (const [family, layer] of Object.entries(FAMILIES) as [keyof typeof FAMILIES, number][]) {
  const features = await query(layer, {
    outFields: "GEOID,NAME,INTPTLON,INTPTLAT",
    returnGeometry: "false",
  });
  for (const f of features) {
    const lea = f.attributes.GEOID?.slice(STATE.length) ?? "";
    const name = f.attributes.NAME ?? "";
    if (!/^\d{5}$/.test(lea) || !name) throw new Error(`odd feature ${JSON.stringify(f)}`);
    const x = Number(f.attributes.INTPTLON);
    const y = Number(f.attributes.INTPTLAT);
    const county = counties.find((c) => inRings(c.geometry?.rings ?? [], x, y));
    if (!county) throw new Error(`${family}-${lea} ${name}: interior point in no county`);
    districts.push({ family, lea, name, county: county.attributes.BASENAME ?? "" });
  }
}

const meta = (await (await fetch(`${SERVICE}?f=json`)).json()) as {
  documentInfo?: { Comments?: string };
};
const sorted = districts.sort(
  (a, b) =>
    a.name.localeCompare(b.name) || a.family.localeCompare(b.family) || a.lea.localeCompare(b.lea),
);
const out = {
  source: `${SERVICE} (layers ${Object.entries(FAMILIES)
    .map(([family, id]) => `${family}=${id}`)
    .join(", ")}; counties=${COUNTIES})`,
  vintage: meta.documentInfo?.Comments ?? "unknown",
  fetchedAt: new Date().toISOString().slice(0, 10),
  districts: sorted,
};
await Bun.write(OUT, `${JSON.stringify(out, null, 2)}\n`);
console.log(`wrote ${OUT}: ${sorted.length} districts`);
