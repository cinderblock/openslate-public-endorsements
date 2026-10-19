# NOTES — Democratic Party of Contra Costa County, Nov 3 2026 general

## Sources

- https://contracostadems.com/ (HTML, scraped). The home page is the "2026
  General Election Endorsements" page: "The Democratic Party of Contra Costa
  County has completed its endorsement process for the November 3, 2026
  General Election." It lists federal, state, countywide/regional, and
  supervisorial-district-grouped local endorsements, plus a "Ballot Measures"
  section where every entry is marked "Support".
- Note: www.cocodems.org is an unrelated Wisconsin (Columbia County) party.
- Ballot names, contest names and measure letters were checked against the
  Contra Costa County Elections Division lists (not org sources; not cited as
  position sources):
  - Contest/Candidate Proof List, contests on ballot, 8/27/2026:
    https://www.contracostavote.gov/wp-content/uploads/8-27-26_candidatelist_detail_final.pdf
  - Candidate List (all filers) 8/14/2026:
    https://www.contracostavote.gov/wp-content/uploads/8-14-26_candidatelist_summary_final.pdf
  - Local Ballot Measures, updated 8/10/26:
    https://www.contracostavote.gov/wp-content/uploads/26Nov03_Measure-Wording-List-1.pdf
  - Federal/state finalists: SOS certified list (8/27/2026).

## Extracted: 79 positions

- Federal (3): CD 8 Garamendi, CD 9 Harder, CD 10 DeSaulnier.
- Statewide (9): Governor Becerra (page spells "Beccera"), Lt Gov Ma, SoS
  Weber, AG Bonta, Controller Cohen, Treasurer Kounalakis, Insurance
  Commissioner Allen, SPI Barrera, BOE District 2 Lieber (page says "Area 2").
- Assembly (4): AD 11 Wilson, AD 14 Wicks, AD 15 Avila Farias, AD 16
  Bauer-Kahan.
- Countywide/regional and local races (55): County Board of Education Area 2;
  CCCD Wards 1 and 3; EBRPD Ward 7; EBMUD Wards 3 and 7; city councils /
  mayor / clerk in Richmond, El Cerrito, Pinole, San Pablo, Danville, Moraga,
  Orinda, San Ramon, Antioch, Brentwood, Walnut Creek, Clayton, Concord,
  Pleasant Hill, Hercules, Pittsburg; school boards (Acalanes UHSD, Orinda USD,
  SRVUSD, Liberty UHSD, Antioch USD, Oakley UESD, Walnut Creek SD, Mt. Diablo
  USD); special districts (Central Contra Costa Sanitary, Moraga-Orinda Fire,
  Ironhouse Sanitary, Contra Costa Water District).
- Measures (8, all "Support" -> endorse Yes): RTM ("Connect Bay Area"), Walnut
  Creek T, Acalanes UHSD W, Liberty UHSD X, San Pablo S, Richmond Q, WCCUSD V,
  Concord O.

`choice` uses the ROV ballot name (e.g. "Becca Barrett", "Brian Thomas
Lawrence", "Paschal Iwuh", "Truc \"Christy\" Lam-Julian", "Gabe Quinto"),
while `statement` quotes the name as the page shows it. For statewide/federal
choices the common short form already used across the repo is kept (e.g.
"Lori Wilson", "Malia Cohen").

## Skipped

- Not on the ballot (uncontested: only one candidate filed per the 8/14
  candidate list, and the contest is absent from the 8/27 "Contests On Ballot"
  proof list; presumably appointed in lieu of election):
  - AC Transit Ward 1 (short term) — Harpreet Sandhu
  - EBMUD Ward 2 — Luz Maria Gomez
  - WCCUSD Area 5 — Caitlin Garibaldi
  - West County Wastewater Division 5 — Cheryl Sudduth
  - Martinez Mayor — Brianne Zorn
- Stege Sanitary District — Ted Lam, Dwight Merrill: the 8/14 filer list
  shows three names for two seats, but the contest is absent from the 8/27
  on-ballot proof list. Could not confirm it is on the ballot; omitted.
  Reviewer may re-add if the sample ballot shows it.
- John Swett Unified School District — "Sam Alvarado": the ROV ballot list
  has "SAMANTHA WATSON-ALVARADO" (no other Alvarado). Probably the same
  person, but not certain; omitted.

## Flags for review

- CCCD Ward 3: the photo alt text says "[Rita Xavier]" but the displayed name
  is "Rebecca Faith Barrett" (the incumbent; ballot name "Becca Barrett").
  Encoded as Becca Barrett.
- Measure titles: the ROV list gives only "City of Concord", "City of
  Richmond", "City of Walnut Creek", "Acalanes Union High School District",
  "Liberty Union High School District", "West Contra Costa Unified School
  District" as headings for O, Q, T, W, X, V (no official short title). The
  parenthetical short titles used (Business License Tax Update; Fire
  Facilities and Emergency Response Bond; Appointive City Treasurer; Parcel
  Tax; School Facilities Bond; Parcel Tax Renewal) are descriptive summaries
  of the ballot question, invented here. San Pablo S uses the ROV heading
  "City of San Pablo Rent Control".
- "Connect Bay Area" is the campaign name of Regional Measure RTM (the ROV
  list's "MEASURE RTM Regional Transit Measure"); mapped to the existing RTM
  subject.
- Jurisdictions: county-level school/special-district races use
  `us/ca/contra-costa-county`; CCCD keeps the existing `us/ca/contra-costa`.
