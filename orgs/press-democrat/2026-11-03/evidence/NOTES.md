# NOTES — The Press Democrat (Santa Rosa), Nov 3 2026 general

## Sources

- https://www.pressdemocrat.com/2026/10/12/endorsements-press-democrat-recommendations-for-nov-3-election/
  ("Endorsements: Press Democrat recommendations for Nov. 3 election", By
  Editorial Board, published Oct 12, updated Oct 13). The roundup is marked
  SUBSCRIBER ONLY but the full text was in the HTML. It ends with "Still to
  come", so it does not yet include every editorial.
- Individual editorials that the roundup did not (yet) include:
  - Healdsburg (Sept 22): "Herrod, López are best choices for Healdsburg’s future".
  - Windsor Town Council and mayor (Oct 13).
  - Windsor Unified Measure J (Oct 13).
  - Props 1 and 38 (Oct 14).
- Editorial index used to find them: https://www.pressdemocrat.com/opinion/editorials/
- Spelling checked against the Sonoma County ROV "Candidates on the Ballot"
  page (saved at `$TEMP/os-dl/G2/rov-sonoma/cands.txt`) and the SOS certified list.

## Extracted: 42 positions

- Federal: CD 1 McGuire, CD 4 Thompson.
- Statewide: Lt. Gov. Ma, Treasurer Kounalakis, Insurance Commissioner Allen,
  Superintendent Barrera.
- Legislature: SD 2 Connolly, AD 12 Lucan.
- Props: 1 No, 3 Yes, 4 No, 38 No, 40 Yes, 41 No, 42 No, 43 No, 44 No.
- Sonoma County: Supervisor D2 Lemus, D4 Schwedhelm; Measure H Yes; SRJC
  Measure AB Yes; Windsor Unified Measure J Yes.
- Cities: Santa Rosa D4 Jones-Carter and Measure L Yes; Healdsburg D2 Lopez
  and D4 Herrod; Petaluma D1/D2/D3 and mayor; Rohnert Park D2/D5 and Measure
  K Yes; Cloverdale council (3: Marquez, Parker, Carter); Sonoma D1 Mackie;
  Windsor D1 Fortino Dickson, mayor Potter, Measure I Yes.
- Napa County: Measure B Yes; American Canyon Measure P No.

## Republished from Mercury News / East Bay Times (Bay Area News Group)

- https://www.pressdemocrat.com/2026/10/16/endorsement-reject-proposition-39-voter-id-fraud-ballot-measure/
  is bylined "By Mercury News East Bay Times Editorial Boards" and its text
  matches the bay-area-news-group Prop 39 statement ("This initiative is an
  expensive solution to a phantom problem."). Subject: California —
  Proposition 39 (No). Not copied into positions.json; evidence saved as
  `pd-p39.md`.

## Skipped

- Two "Close to Home" guest commentaries on Props 3 and 45 (Oct 17 and 19):
  not editorial-board positions.
- The roundup's "Still to come" list was empty in the fetched HTML; re-check
  before the election for later editorials (e.g. Prop 2, 5, 37, 45, AG,
  governor).

## Flags for review

- Herrod (Healdsburg D4) is unopposed on the ballot. The editorial's headline
  names him as a "best choice", and the body notes he is the only candidate.
  Kept as `endorse`; drop it if headline-only support is too thin.
- Healdsburg D2: the ROV lists "MATHEW LOPEZ" (no accent); the editorial
  writes "López". Choice uses the ballot spelling, matching existing bundles.
- Rohnert Park D2: the ballot name is "LINDA (KHOURY) TAMS". Choice
  "Linda Khoury Tams" matches the existing subject's other bundles.
- Napa: Measure B reuses the existing title from sierra-club-redwood,
  `Napa County — Measure B (Wildfire Preparedness, Watershed Protection and
  Open Space Preservation Act of 2026)` (us/ca/napa-county). `American Canyon
  — Measure P (City Services Sales Tax)` (us/ca/american-canyon) is INVENTED
  and provisional: https://www.napacounty.gov/2319/Local-Measures returned
  403 to curl and WebFetch (needs browser).
- The Press Democrat now runs some Bay Area News Group editorials (see
  above). Props 1/38 and the roundup are bylined "Editorial Board" (the PD's
  own), and the PD's Prop 43 pick (No) differs from BANG's (Yes), so the
  rest is treated as the PD's own.

**Adopted by reference (2026-10-19):** these republished picks are now in `positions.json` as an `adopts` entry (SPEC §3.10) pointing at the adopted bundle's published slate: 1 from Bay Area News Group editorial board (The Mercury News & East Bay Times). Created with `bun scripts/adopt.ts`, which checks every pick against the adopted bundle.
