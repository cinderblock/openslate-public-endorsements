# NOTES — Marin County Democratic Party, Nov 3 2026 general

## Sources

- https://marindemocrats.org/2026-november-election-endorsements/ (HTML,
  scraped): "November 2026 Election Endorsements" with Congress/State Senate
  candidates, a list of Councils, School Boards, Additional Races, and
  Measures (each measure links to a detail page), then candidate statements.
- Measure pages (HTML, scraped), each saying "Vote YES"/"Yes on":
  measure-n-miller-creek-school-district/, measure-p/,
  measure-w-san-rafael-services/, measure-cc-critical-care-for-marin/.
- Statewide picks are not listed; the page says "Find Statewide Endorsements
  Here" and links to the CADEM endorsement tool. Nothing statewide extracted.
- Ballot names, seat counts and measure titles were checked against the
  Marin County Elections Department pages (not cited as position sources):
  - Local candidates ON ballot 11/03/26:
    https://www.marincounty.gov/departments/elections/november-3-2026-general-election/information-and-about-candidates-110326/local-candidates-ballot-110326
  - List of measures 11/03/26 and each measure's page:
    https://www.marincounty.gov/departments/elections/november-3-2026-general-election/information-about-measures-110326/list-measures-110326
  - SOS certified list for CD 2 / SD 2 finalists.

## Extracted: 37 positions

- Federal/legislative (2): CD 2 Huffman, SD 2 Connolly.
- Town/city councils (14): Corte Madera (2), Fairfax (1), Larkspur (2),
  Novato D2 and D4, San Anselmo (2), San Rafael D3, Sausalito (2), Tiburon (2).
- Schools (12): Marin County Board of Education Trustee Areas 5 and 6;
  Miller Creek SD (2); Reed Union SD (3); Sausalito Marin City SD (2);
  Tamalpais UHSD (3).
- Other (5): Fairfax Town Clerk; Marin City CSD full term and short term;
  North Marin Water District Division 5; Southern Marin Fire Protection
  District.
- Measures (4, Yes): Miller Creek SD N, Marin County P, San Rafael W,
  Marin Healthcare District CC.

`choice` uses the ROV ballot name (e.g. "Susan Denise Adams", "Joy Scully
Koo", "Megan Roberts Hutchinson", "Shelby Pasarell Tsai", "Curtis F.
Robinson", "Cristine Soto Deberry"); `statement` quotes the page.

## Skipped

- San Rafael City Council District 2 — Eli Hill: the county lists one seat,
  one candidate (Hill). Uncontested, so presumably not voted on; omitted.
  (An existing subject "San Rafael City Council, District 2" is used by
  another org; reviewer may re-add if the sample ballot shows the contest.)

## Flags for review

- The page says "Marin County Office of Education - Area 5/6"; the ballot
  contest is "Marin County Board of Education Board of Education Member,
  Trustee Area 5/6". Encoded as the Board of Education trustee areas.
- The page says "Tiburon City Council"; the ballot contest is "Town of
  Tiburon Member Town Council". Title "Tiburon Town Council".
- The page lists "Natassya Saad"; the candidate statement and the ROV list
  spell "Nastassya Saad".
- Measure titles: Marin's list gives only the jurisdiction as a heading; the
  parenthetical short titles come from the ballot label where it has one
  (N: "Miller Creek Elementary School District Classroom Repair/ Upgrade
  Measure"; W: "San Rafael Essential Services Protection Measure"; CC:
  "Marin Healthcare District Initiative Measure"; P: "County of Marin
  Childcare Initiative").
