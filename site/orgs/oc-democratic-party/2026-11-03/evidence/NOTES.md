# NOTES — Democratic Party of Orange County, Nov 3 2026 general

## Sources

- https://orangecountydemocrats.com/oc-endorsements-2 ("Orange County
  Endorsements", HTML, scraped). Board of Supervisors, mayors, city councils,
  education boards, special districts and local propositions. Candidate names
  are the link text under each photo card.
- https://orangecountydemocrats.com/statewide-endorsements ("Statewide
  Endorsements", HTML, scraped). Statewide offices, all 14 propositions,
  Congress, State Senate and Assembly districts that touch Orange County.
- The 34 per-city JPG voter guides linked from the OC page
  (`/wp-content/uploads/2026/10/Voter-Guide-<City>.jpg`). I viewed all of
  them and compared them with the HTML. They add five endorsements that are
  not on the HTML pages (SD 30 Archuleta, Coast CCD Area 5 Dorn Parker,
  Orange USD Area 4 Pelly, Mission Viejo D4 Lacko, Seal Beach D1 Terry).
  They also split Moulton Niguel into full-term and short-term seats, and
  confirm several letters and spellings. See
  `ocdemocrats-city-voter-guides.md`. Because of these five, mode is
  `transcribed`. Each of the five cites the specific JPG as its `source`.
- `/endorsements` now redirects to a 404 (`/june-primary-endorsements`), so
  it was not used.

## Extracted: 144 positions (139 from HTML + 5 from the city JPGs)

- Statewide: 8 offices + BOE District 4 = 9.
- Propositions: all 14 (Yes on 1, 2, 3, 4, 5, 37, 38, 40; No on 39, 41,
  42, 43, 44, 45). The page says "Support"/"Oppose"; encoded as Yes/No.
- Congress: CD 38, 41, 42, 45, 46, 47, 49 (7).
- State Senate: SD 30 (JPG only), 32, 34, 36, 38 (5). Assembly: AD 64, 67, 68, 70, 71, 72,
  73, 74 (8).
- County: Supervisor D4 (Traut), D5 (Foley).
- Mayors: 7. City councils: 46 (2 from JPGs). Education boards: 33 (2 from
  JPGs). Special districts: 6.
- Local measures: 7 (Irvine D, Laguna Beach USD A, Laguna Beach E, Orange
  I/J/K, San Clemente M).

## Top-two and ballot checks

- Every state and federal pick is a top-two finalist on the SOS certified
  list (8/27/2026):
  https://elections.cdn.sos.ca.gov/statewide-elections/2026-general/cert-list-candidates.pdf
  AD 68 is a D-vs-D race (Jessie Lopez vs. David Penaloza). DPOC backs
  Penaloza.
- Local contests were checked against the OC Registrar's "Contests Qualified
  for the Ballot" page:
  https://ocvote.gov/elections/contests-qualified-for-the-ballot-for-the-2026-general-election
  Measure letters and titles come from that page.

## Skipped (listed by DPOC, but the contest is not on the qualified list)

These seats were on the June "What's on the Ballot" list of eligible
contests, but not on the qualified list. That usually means the seat was
uncontested and will be filled by appointment in lieu of election.
- Laguna Niguel, District 4: Stephanie Oddo.
- Fullerton School Board, Area 1 (Miguel Alvarez) and Area 4 (Ruthi
  Hanchett). Only Trustee Area 3 qualified.
- Saddleback Valley Unified, Area 1: Dan Walsh. Only Trustee Area 5
  qualified.
- Costa Mesa Sanitary District, Division 5: Shayanne Wright. The district
  is not on the qualified list.
- Orange Unified School Board, Area 2: Sara Pelley (HTML). Area 2 is not
  on the ballot. Every city JPG that covers OUSD lists "TRUSTEE 4: SARA J.
  PELLY", so the HTML's "Area 2" is a typo. She is recorded once, as Trustee
  Area 4, from the JPG.

## Judgment calls / review flags

- **Supervisor jurisdiction.** The two Board of Supervisors races reuse the
  existing titles and the existing jurisdiction `us/ca/orange` (from
  sierra-club-angeles and ca-environmental-voters), so they collate. That slug
  clashes with the City of Orange (`us/ca/orange`, used here for Measures
  I/J/K). Other county-wide school and special-district contests use
  `us/ca/orange-county`, per the brief. The coordinator may want to move the
  supervisor races to `us/ca/orange-county` everywhere.
- **Spelling fixes** (the original spelling is kept in each statement):
  - "Angely Andrade Vallerta" → `Angely Andrade Vallarta`, which is how the
    OC Labor Federation and sierra-club-angeles spell it.
  - "Sergio Conteras" → `Sergio Contreras`, the OC Labor Federation spelling.
  - "Dr. Andy Gerken" → `Andy Gerken`. The OC Labor Fed lists him as
    "Andrew Paul Gerken", so check the ballot name.
  - "Dr. Edgar Montes" → `Edgar Montes`, "Dr. Paula Swift" → `Paula Swift`,
    "J.J Galvez" → `JJ Galvez` (SOS spelling).
  - Honorifics such as "Rep.", "Senator" and "Assemblyman" were dropped.
- **Labels mapped to ballot titles.** "San Clemente City Council, Area 1/2"
  became "District 1/2". "Ocean View School Board" became Trustee Area 5,
  the only Ocean View seat on the ballot. "Coast Community College Board,
  Area 3" became Trustee Area 3 (Short Term), and "Aliso Viejo City Council,
  District 3" became District 3 (Short Term), as the registrar lists them.
  "Midway Sanitary District" became Midway City Sanitary District Board.
  The Westminster JPG says "DIVISION 2", but the registrar lists the race
  as "3 Directors" at large, so no division is in the title.
- **Moulton Niguel Water District.** The registrar has two contests: "3
  Directors, Full Term" and "1 Director, Short Term". The JPGs say "FULL
  TERM: JENNIFER ENGLE / SHORT TERM: DAVID PETTY", so Petty is under
  "Moulton Niguel Water District Board (Short Term)" and Engle is under
  "Moulton Niguel Water District Board".
- **Laguna Beach measures.** The page says "School Bond Measure: Support",
  which maps to Measure A (Laguna Beach USD), and "Term Limits: Oppose",
  which maps to Measure E. Neither letter is printed on the page.
- **Orange Measure K.** DPOC calls it "Charter Amendment". The registrar's
  title is "Proposed Charter for the City of Orange". It is the only Orange
  charter measure, so the mapping is clear.
- **New titles invented** (no existing subject): every OC city race other
  than Irvine D1/5/6, Costa Mesa D3/4/5, Fullerton D3/5, Huntington Beach,
  Santa Ana Ward 4/6 and Tustin Mayor; all OC school and special-district
  races; and all OC measures. They follow existing patterns: "<City> City
  Council, District N", "<City> Mayor", "<District> Board, Trustee Area N",
  "<Body> — Measure X (<registrar title>)".

## Refresh 2026-10-30

Re-fetched https://orangecountydemocrats.com/oc-endorsements-2 and the statewide page on 2026-10-30 9:48 AM PDT (16:48Z). Evidence: `ocdemocrats-oc-endorsements-2026-10-30.md`. One
addition: **Laguna Beach City Council: Mark Orgill**. The HTML page now also prints the picks that were only in
the city JPGs on 10-19 (Dorn Parker, Lacko, Terry). Everything else matches.
