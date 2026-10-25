#!/usr/bin/env bun
// Build scripts/data/ca-community-college-districts.json: California's 72 community college
// districts with their Chancellor's Office district codes (Coast = 830). scripts/lib/districts.ts
// matches a listing's college board to it, so the contest's `subject.district` is
// `us/ca/ccd-830/ta-1`, and the app can find the voter's district from the same boundaries (the
// CCC GIS Collaborative's, public domain; apps/web/scripts/build-geo.ts reads the same layer).
// Rerun when a district's boundary or code changes, and commit the output.
//
//   bun scripts/fetch-college-districts.ts

export {}; // a module: top-level await

const LAYER =
  "https://services3.arcgis.com/iUKM0a3Vouz02bg4/arcgis/rest/services/CCC_Boundaries/FeatureServer/0";
const OUT = "scripts/data/ca-community-college-districts.json";

const params = new URLSearchParams({
  where: "1=1",
  outFields: "DID,DistrictNa",
  returnGeometry: "false",
  f: "json",
});
const response = await fetch(`${LAYER}/query?${params}`);
if (!response.ok) throw new Error(`HTTP ${response.status}`);
const json = (await response.json()) as {
  features?: { attributes: { DID?: number; DistrictNa?: string } }[];
};
const districts = (json.features ?? [])
  .map(({ attributes: a }) => {
    if (!a.DID || !a.DistrictNa) throw new Error(`odd feature ${JSON.stringify(a)}`);
    return { code: String(a.DID), name: a.DistrictNa };
  })
  .sort((a, b) => a.name.localeCompare(b.name));
if (districts.length < 72) throw new Error(`only ${districts.length} districts`);

const out = { source: LAYER, fetchedAt: new Date().toISOString().slice(0, 10), districts };
await Bun.write(OUT, `${JSON.stringify(out, null, 2)}\n`);
console.log(`wrote ${OUT}: ${districts.length} districts`);
