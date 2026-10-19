# NOTES — PORAC, Nov 3 2026 general

## Sources

- https://porac.org/advocacy/2026-voting-guide/ ("2026 Voter Guide";
  HTML, curl). "The below interactive guide allows you to view PORAC's
  endorsed candidates representing your community at the local, state and
  federal level." The guide is an iframe pointing to
  https://maps.cartifact.com/porac/.
- https://maps.cartifact.com/porac/ ("PORAC 2026 Voting Guide",
  interactive map). Its script https://maps.cartifact.com/porac/index.js
  (112 MB) embeds GeoJSON district polygons. Each feature's `properties`
  has `District`, `Label` and `Endorsed`. The 121 records with a non-null
  `Endorsed` are copied verbatim into porac-interactive-guide-data.md. Each
  statement quotes the record. Position `source` is the guide URL.
- `mode` is `scraped`: the data is machine-readable text in the page's
  script, not a PDF or image.
- The guide includes Nov 2026 proposition numbers (40, 42–45), so it is
  the general-election guide.

## Extracted: 103 positions

- 5 propositions: Support → Yes on 42, 45; Oppose → No on 40, 43, 44.
- 1 judicial retention: "NO on the Retention of Justice Kelli Evans" →
  "California Supreme Court — Retain Justice Kelli M. Evans", choice No.
- 4 statewide: Governor Becerra, Lt. Governor Ma, Insurance Commissioner
  Ben Allen, Superintendent Barrera. AG, Controller, Secretary of State
  and Treasurer records are null (no endorsement).
- 48 Assembly, 15 State Senate, 22 US House (bipartisan: e.g. Hadwick,
  Patterson, Hoover, Wicks, Bauer-Kahan; CD 6 Kiley, CD 22 Valadao, CD 48
  Desmond; CD 49 Levin).
- 8 local candidates with existing titles: El Cajon Council D1 (Chuck
  Kaye), Fresno County Superior Court Office No. 6 (Ashley Paulson), Fresno
  County Supervisor D1 (Mike Karbassi), LA Superior Court Office 87
  (Anthony Bayne), LA County Sheriff (Robert Luna), Oakland Council D6
  (Kevin Jenkins), Santa Clara Council D2 (Yvonne Inciarte) and D3 (Kyle
  Madej). Each appears as a choice in other bundles' Nov lists.

## Top-two check

All statewide, legislative and congressional candidates were checked
against the SOS Certified List of Candidates for Nov 3 2026 (8/27/2026).
All are on the general ballot in the listed district except the CD 27
record below.

## Omitted / review flags

- **CD 27 "Judy Chu" omitted.** The data has `"District": "CD 27"` →
  "Judy Chu", and CD 28 is null. Per the SOS list, Judy Chu is running in
  CD 28 (vs. April A. Verlato), and CD 27 is Whitesides vs. Gibbs. This
  looks like a data error in the map, so it is left out. If PORAC endorsed
  Chu, the intended race is probably CD 28.
- **CD 46 "Jose Correa"** → choice "Lou Correa" (ballot name; José Luis
  "Lou" Correa is the CD 46 incumbent).
- **Local records not added** (no existing title, or ballot status not
  confirmed): Capitola City Council (Joe Clarke), Clovis City Council
  (Matthew Basgall; no district given), Fairfield City Council D3 (Robert
  Marin), Hanford City Council (Victor Chavarin, Jr.), Hollister City
  Council (Delores Morales), Kern High School District Area 1 (Derek
  Tisinger; other bundles list only David Wescott for that seat), Morgan
  Hill City Council (Steven Hayes; no district given), Pico Rivera City
  Council "District 38" (Genaro Moreno; the district number looks wrong),
  Pinole City Council (Matthew Avery), Sanger City Council (Michael
  Montelongo), Santa Clara Mayor (two records, David Kertes and Kathy
  Watanabe), Santa Cruz Mayor (Ryan Coonerty), Santa Monica City Council
  (Lana Negrete), Southern Kern USD D2 (Joel McKay), Vacaville Mayor (Roy
  Stockton) and Council D2 (Thomas Chalk).
