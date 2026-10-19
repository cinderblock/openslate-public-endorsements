# NOTES — Santa Clara County Democratic Party, Nov 3 2026 general

## Sources

- https://sccdp.org/index.php/voter-resources/endorsements/2026-endorsements/
  (HTML, scraped). Heading "November 3, 2026 General Election": "The Santa
  Clara County Democratic Party has made the following endorsements". This is
  the position source for every entry.
- https://sccdp.org/wp-content/uploads/2026/10/SCCDP-Local-Endorsements-November-3-2026.pdf
  (linked from the site menu as "All Local SCCDP 2026 Endorsements PDF").
  Used only as a cross-check: its table extracts with shifted columns, so it
  is not quoted. It lists the same names.
- SCCDP's own pages do not list state or federal picks; its menu links to the
  California Democratic Party for those ("Find Your Local CADEM 2026
  Endorsements"). Those picks belong to the `ca-democratic-party` bundle and
  are not copied here.
- Ballot check: Santa Clara County ROV "Final Qualified List of Local Eligible
  Candidates" (https://files.santaclaracounty.gov/exjcpb1296/2026-09/qualified-list-of-local-candidates-9-28-26.pdf)
  and "List of Local Measures" (https://vote.santaclaracounty.gov/list-local-measures-4).
  Measure letters and short titles, office names, and candidate ballot names
  come from these.

## Extracted: 79 positions

- Cities, 26: Campbell D3; Cupertino at-large (3); Gilroy D4, D5, D6; Los
  Altos D2; Los Gatos town council (3); Milpitas council (2); Morgan Hill
  mayor, D-B, D-D; Mountain View council (3); Palo Alto council (2); San Jose
  D5, D7, D9; Santa Clara D2; Saratoga council (1).
- Special districts, 3: Midpeninsula Regional Open Space Ward 1; Santa Clara
  Valley Water District 6 and 7.
- Measures, 11: No on Los Altos D; Yes on Mountain View E and F, Palo Alto J,
  Gilroy USD M, Los Gatos-Saratoga UHSD N, Alum Rock O and P, Cambrian Q,
  Orchard R; Yes on regional Measure RTM.
- Schools and community colleges, 39: County Board of Education TA 7;
  Foothill-De Anza TA 4; Gavilan TA 3; West Valley-Mission TA 3 and 7; East
  Side UHSD TA 1 (short term) and TA 4; Fremont UHSD TA 3 and 4; Mountain
  View-Los Altos UHSD TA 3; Alum Rock TA 5; Berryessa (3); Campbell Union SD
  TA 4 and TA 5 (dual); Evergreen (2); Franklin-McKinley (1); Gilroy USD TA 3
  and 4; Los Altos SD (3); Milpitas USD (1); Morgan Hill USD TA 1-4; Mountain
  View Whisman (1); Oak Grove TA 2 and 3; Orchard (1); Palo Alto USD (1);
  San Jose USD TA 2 (dual) and TA 4; Sunnyvale SD TA 3.

## Skipped

- The whole "June 2, 2026 Primary Election" section on the same page (Board
  of Supervisors D1/D4, San Jose D1/D3/D5/D7/D9 primary picks, June Measures
  A-D). Those contests were decided in June or were superseded. The November
  section re-endorses Ortiz (D5) and Chester (D9) and switches D7 to Bien
  Doan; the June D7 dual endorsement (Rafael Garcia / HG Nguyen) is dropped
  because neither advanced.
- Nothing else on the November list was dropped: every endorsed candidate is
  on the ROV qualified list, in a contest with more candidates than seats.

## Flags for review

- **Measure RTM**: SCCDP lists "Note: YES on Regional Measure RTM already
  endorsed by SCCDP" under Local Measures. Encoded as endorse Yes on the
  existing `Bay Area — Regional Measure RTM (Regional Transit Measure)` subject.
- **Los Altos Measure D** is "NO on Measure D – prohibits selling parking
  lots" in the HTML. The PDF's YES/NO column is garbled in extraction, so the
  HTML is relied on. The ROV short title is "Citizen-Sponsored Initiative".
- **Dual endorsements** ("dual endorsement" in the source) are encoded as two
  `endorse` positions in one vote-for-1 race: Campbell Union SD TA 5
  (Chandra, Krow-Lucal) and San Jose USD TA 2 (Hall, Magana). The PDF adds
  "*Dual endorsement, pick one".
- **Spellings**: `choice` uses the ROV ballot name where SCCDP differs:
  "J R Fruen" -> J.R. Fruen; "Rebeca G Armendariz" -> Rebeca G. Armendáriz;
  "Anky van Deurson" -> Anky van Deursen; "Mer Curry Nunez" -> Mer Curry
  Nuñez; "William (Bill) Wilson" -> William "Bill" Wilson; "Anne Jones
  Kepner" -> Anne J. Kepner; "Claudia Sandoval Ortiz" -> Claudia Ortiz;
  "Tomara Latreece Hall" -> Tomara Hall; "John Horner" -> John T. Horner;
  "Rudy Rodriguez" -> Rudy J. Rodriguez; "Thelma Boac" -> Thelma B. Boac.
  Statements quote SCCDP's own spelling.
- The page labels SCCDP's district areas as "Area N"; the ROV calls them
  "Trustee Area N", which is what the titles use.
- All local titles are new (no other bundle had Santa Clara County locals).
  They are logged in N1's titles-scc.tsv.
