# NOTES — Los Angeles County Democratic Party, Nov 3 2026 general

## Sources

- https://www.lacdp.org/candidates ("Endorsed Candidates", heading
  "2026 General Election: Tuesday, November 3, 2026"). HTML, scraped with
  curl. One card per candidate: name, then office. Filter tabs on the page
  are "City of Los Angeles / County-Wide / Federal / Statewide"; all cards
  are in the static HTML, so the whole list was captured (60 cards).
- https://www.lacdp.org/ballotmeasures ("2026 Ballot Measure
  Endorsements"). HTML table with columns Locality / Proposition/Measure /
  Type / Recommendation.
- Reference only (not cited as `source`): LA County Registrar-Recorder
  "Final List of Measures Appearing on the Ballot" (9/22/2026),
  https://content.lavote.gov/docs/rrcc/documents/final-measures-appearing-on-the-ballot-9-22-2026.pdf,
  and "Final List of Qualified Candidates to Appear on the Ballot",
  https://content.lavote.gov/docs/rrcc/documents/final-list-of-qualified-candidates-to-appear-on-the-ballot9fcf3b64-1a33-4882-9e17-8cbc3b3c8d76.pdf,
  plus the SOS Certified List of Candidates (8/27/2026). Used for measure
  letters/titles and ballot-name spellings.
- www.lacdp.org/endorsements returns "page not found"; the party's
  "Endorsement Process" page is /endorsement (process only, no picks).

## Extracted: 137 positions

- 60 candidates:
  - Statewide: all 8 constitutional offices (Becerra, Ma, Bonta, Weber,
    Kounalakis, Cohen, Allen, Barrera) + Board of Equalization (Gipson;
    LA County is BOE District 3).
  - Congress (18): CD 23, 26–32, 34–38, 41–45.
  - State Senate (5): SD 20, 22, 28, 30, 36.
  - Assembly (23): AD 34, 39–44, 46, 48, 49, 51–56, 61, 62, 64–67, 69.
  - County/City: LA County Sheriff (Luna), LA Mayor (Bass), LA City
    Attorney (Roy), LA City Council CD 3 (Worth Girvan) and CD 9 (Ugarte).
- 77 measures: 14 state props, 2 county charter amendments (A, E), and
  61 city/school-district measures. 6 of these are recorded as
  `abstain` because the page says "NO ENDORSEMENT": Carson CU, Culver
  City YV, LA City PL and SC, Palmdale DE, Hacienda La Puente USD B.
  Every other row is Yes or No.

## Choice spellings

`choice` uses the ballot name from the SOS certified list / LA County
qualified-candidate list (e.g. "Shirley N. Weber", "Malia M. Cohen",
"Norma J. Torres", "Ted W. Lieu", "Nanette Diaz Barragan", "Luz Maria
Rivas", "Bob J. Archuleta", "Nicholas \"Nick\" Schultz", "Isaac G. Bryan",
"Tina Simone McKinnor", "José Luis Solache", "Robert G. Luna", "Karen Ruth
Bass"). The statement quotes the name as LACDP prints it.

## Top-two check

Every endorsed candidate is on the Nov 3 general ballot per the SOS
certified list and the LA County final qualified-candidate list. No
eliminated-primary candidates appear on the page. CD 9 (Ugarte vs
Mazariegos), CD 29 (Rivas vs Dueñas), CD 34 (Gomez vs Gonzales-Torres),
AD 66 (Seo vs Deen) are same-party or nonpartisan contests; LACDP picked
one side in each.

## Flags for review

1. **Measure letters that differ from LACDP's page.** LACDP's table uses
   letters that do not match the Registrar's final measure list. I used
   the Registrar's letters in the subject title and kept LACDP's letter
   in the quoted statement:
   - "City of Burbank | CR | City Services Measure" → Registrar: Burbank
     **Measure C** (hotel tax / city services). Title used:
     `Burbank — Measure C (City Services)`. NOTE: another bundle already
     uses `Burbank — Measure CR (City Services)`; that existing title
     looks wrong and should probably be renamed to Measure C.
   - "City of Cudahy | HT | Cudahy Rent Stabilization Protection Measure"
     → Registrar: Cudahy **Measure H**. Title used:
     `Cudahy — Measure H (Rent Stabilization)`. Existing bundle title
     `Cudahy — Measure HT (Rent Stabilization)` looks wrong the same way.
   - "Charter Oaks Unified School District | SM" → Registrar: Charter Oak
     Unified School District **Measure S**.
   - "City of San Marino | UP | San Marino Service Preservation Measure"
     → Registrar: City of San Marino **Measure U** (UP is the Pasadena
     Area CCD bond).
2. **Hawthorne Measure O.** An existing subject is titled
   `Hawthorne — Transient Occupancy Tax measure` (no letter). The
   Registrar calls it Measure O; I used `Hawthorne — Measure O (Hotel
   Tax)`. Coordinator may want to merge.
3. **Santa Monica Measure ES** is listed by LACDP under "Santa Monica
   School District", but the Registrar lists it under the City of Santa
   Monica ("a City of Santa Monica collected parcel tax"), so jurisdiction
   `us/ca/santa-monica`.
4. **Inglewood USD Measure MM** appears in the table with no
   Recommendation value; skipped.
5. "NO ENDORSEMENT" rows encoded as `abstain` with no choice (same
   convention as the Harvey Milk Club's "No Recommendation").
6. New local titles invented (no existing subject): Bell Gardens W,
   Carson CU, Charter Oak USD S, Diamond Bar Q, El Segundo CT, Hawaiian
   Gardens BL, Hawthorne O, Hawthorne SD HH, Palmdale DE, Palos Verdes
   Estates PVE, Rancho Palos Verdes RS, Redondo Beach ART, Rosemead RC,
   San Gabriel PS, San Marino U, San Marino USD SMS, Santa Monica ES,
   South El Monte CL and RM, South Pasadena SOS, El Rancho USD ED,
   Glendora USD G, Hacienda La Puente USD B, Keppel USD K, Las Virgenes
   USD LV, Temple City USD TCS, Valle Lindo SD R, Cudahy H, Burbank C.
