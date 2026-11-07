# NOTES — Contra Costa Labor Council, AFL-CIO, Nov 3 2026 general

## Sources

- https://www.cclabor.net/2026 : "2026 Labor Endorsements" (HTML). This is
  the council's own page and the `source` for every position. (Earlier agents
  tried cclabor.org, which does not resolve; the council's domain is
  cclabor.net, per the California Labor Federation's CLC directory at
  https://calaborfed.org/central-labor-councils/.)
- Cross-check: the California Labor Federation's local-endorsements CSV
  behind its "Search by Labor Council" widget,
  https://calaborfed.org/wp-content/uploads/2026/10/2026G-CLC-web-endorsements-2.csv
  (64 rows for "Contra Costa"). Every local pick on the council page matches
  a CSV row.
- Ballot names come from the Contra Costa Elections candidate list (8/14/26
  summary, copy at `$TEMP/os-dl/r3-verify-bay/cc_summary.txt`) and from the
  choices already used for the same people in existing bundles.

## Extracted: 60 positions

- City races (22): Antioch D1/D4, El Cerrito (2), Concord D3/D5, Hercules,
  Martinez mayor/D1/D4, Oakley D4, Orinda, Pinole (2), Pittsburg (2), Richmond
  mayor, San Pablo (2), San Ramon D4, Walnut Creek (2).
- School boards and special districts (31): CCCCD Wards 1 and 3; County Board
  of Education Areas 2 and 5; Antioch USD 5; Brentwood Union ESD; John Swett
  USD (2); Liberty Union HSD 4; Martinez USD 3 and 5; Mt. Diablo USD 2 and 4;
  Pittsburg USD (3); WCCUSD 4 and 5; AC Transit Ward 1; Ambrose Parks; BART
  District 2; CCWD Ward 2 (dual, see below); EBRPD Ward 7; EBMUD Wards 2, 3, 4,
  7; Moraga-Orinda Fire 3 and 4; West County Wastewater 5.
- Local measures (7), all Yes: RTM, Concord O, Richmond Q, San Pablo S,
  WCCUSD V, Acalanes W, Liberty Union X.

## Republished from California Labor Federation (ca-labor-federation)

These were NOT copied into positions.json. They match the ca-labor-federation
bundle exactly:

- Props (cclabor.net, "Statewide Ballot Propositions"): Yes on 1, 2, 3, 4, 5,
  37, 40, 44; No on 39, 41, 42, 43, 45; Prop 38 "No Position". This is the same
  as the state fed (which lists 38 as "No Recommendation").
- Federal and legislative (CSV rows with no county): CD 8 Garamendi, CD 9
  Harder, CD 10 DeSaulnier, AD 11 Wilson, AD 16 Bauer-Kahan.
- "Statewide Candidates": images on the council page (the state fed's
  statewide slate); not transcribed.

URLs: https://www.cclabor.net/2026 and the CSV above.

## Flags for review

- **Dual endorsement:** "Contra Costa Water District, Ward 2: Dual
  Endorsement (Pick 1) — Dan Fitzpatrick OR Allison Picard". Both are
  recorded as `endorse` (Daniel T. Fitzpatrick, Allison Picard).
- The council writes "Ward" for several bodies whose registrar contests use
  "Area" or "Division". Existing titles were reused: CC County Board of
  Education "Area", Antioch/Martinez/WCCUSD "Area", CCWD "Division 2",
  Moraga-Orinda Fire "Division 3/4". "Liberty Union HSD: Hillary Pedrotti" has
  no area on the page; the CSV and the existing subject give Area 4.
- Name normalisation to the ROV or existing choices, e.g. "Monica Wilson" →
  "Monica E. Wilson", "Rebecca Barrett" → "Becca Barrett", "Dr. Clyde Lewis" →
  "Clyde Henry Lewis, Jr", "Brianne Zorn" → "Brianne E. Zorn", "Christy
  Lam-Julian" → `Truc "Christy" Lam-Julian`, "Demetrio Gonzales-Hoy" →
  "Demetrio Gonzalez Hoy" (ROV), "Luz Gomez" → "Luz María Gómez", "Harpreet
  Sandhu" → "Harpreet S. Sandhu".
- INVENTED titles: `Martinez Mayor`, `Martinez City Council, District 1/4`
  (us/ca/martinez); `Oakley City Council, District 4` (us/ca/oakley); `Contra
  Costa County Board of Education, Area 5`, `John Swett Unified School District
  Board`, `Martinez Unified School District Board, Area 3/5`, `West Contra Costa
  Unified School District Board, Area 4/5`, `Ambrose Recreation and Park
  District Board`, `West County Wastewater District Board, Division 5`
  (us/ca/contra-costa-county); `AC Transit Board, Ward 1` (us/ca/alameda,
  following the existing AC Transit family); `BART Board of Directors,
  District 2` (us/ca/bart-2); `EBMUD Board of Directors, Ward 2/4`
  (us/ca/ebmud).

**Adopted by reference (2026-10-19):** these republished picks are now in `positions.json` as an `adopts` entry (SPEC §3.10) pointing at the adopted bundle's published slate: 18 from California Federation of Labor Unions, AFL-CIO. Created with `bun scripts/adopt.ts`, which checks every pick against the adopted bundle.
- Contra Costa: Prop 38 ('No Position') is not adopted because `ca-labor-federation` records no Prop 38 position; the statewide-candidate images were never transcribed, so they are not adopted either.

## Not on the Nov 3 ballot: removed 2026-10-23

The catalog's ballot check found these positions on seats no ballot carries: each was uncontested and is filled by appointment in lieu of election. They were removed, since a position here has to map to a ballot entry.

- AC Transit Board, Ward 1: Harpreet S. Sandhu. Not on the ballot: Alameda County's candidate list (election 260, https://alamedacountyca.gov/rov_app/candidatelist/) shows "AC Transit District Director, Ward 1, Short Term - Not On Ballot", one filer (Harpreet Sandhu, incumbent; filing agency Contra Costa County).
- EBMUD Board of Directors, Ward 2: Luz María Gómez. Not on the ballot: EBMUD's board "appointed the incumbents, Luz Gómez and Andy Katz, to represent Wards 2 and 4, respectively, through 2030" as they were "uncontested at the close of the California election candidacy period" (https://www.ebmud.com/about-us/news/press-releases/ebmud-board-directors-appoint-uncontested-incumbents-wards-2-and-4, Aug 18, 2026).
- EBMUD Board of Directors, Ward 4: Andy Katz. Not on the ballot: EBMUD's board "appointed the incumbents, Luz Gómez and Andy Katz, to represent Wards 2 and 4, respectively, through 2030" as they were "uncontested at the close of the California election candidacy period" (https://www.ebmud.com/about-us/news/press-releases/ebmud-board-directors-appoint-uncontested-incumbents-wards-2-and-4, Aug 18, 2026).
