# NOTES — Sacramento County Republican Party, Nov 3 2026 general

## Sources

- https://www.saccountygop.com/endorsed-candidates/ (HTML, scraped).
  Heading "2026 Endorsed Candidates". Candidate cards: name, office, area.
- https://www.saccountygop.com/ballot-measures/ (HTML, scraped). Heading
  "November 2026 Ballot Measures & Propositions". It has a "Guide to Voting
  on the Ballot Measures" list for Sacramento County local measures, and a
  proposition grid. The grid's first column is "Sac County Republican Party";
  the other columns (Reform CA, HJTA, CRA, Republican Women Federated, Young
  Republicans, CAGOP) are other groups' picks, shown "in addition to the SCRP
  positions". Only the SCRP column was extracted.
- Cross-check (not cited as a source): the printable PDF guide linked from
  both pages,
  https://www.saccountygop.com/wp-content/uploads/2026/10/PAGES-Updated-10-09-26-November-2026-General-Election-Endorsements-SACGOP.pdf
  ("Updated 10-09-26"). It matches the HTML pages entry for entry.
- Measure letters and titles: Sacramento County VRE "Current Measure
  Information" page (see the sacramento-county-democratic-party bundle).
  Titles are shared with that bundle byte-for-byte.

## Extracted: 70 positions

- Statewide: 7 constitutional offices (no pick for Insurance Commissioner)
  plus BOE District 1 (8).
- Federal: CD 3 Tucker, CD 8 Recile (2).
- Legislature: SD 6 Niello, SD 8 Mason, AD 7 Hoover (3).
- City councils: 8 positions (Citrus Heights D2, D4 x2; Elk Grove D4;
  Folsom D1, D5; Galt D5; Rancho Cordova D5).
- School / college boards: 13.
- Water, fire, park districts: 13.
- State propositions: all 14 (SCRP column).
- Local measures: 9 (H No, M No, I/J/K/L Yes; D, E, G `neutral` from
  "No Position").

## Review flags

- **Dual / multi endorsements.** Citrus Heights D4 is labeled "DUAL
  ENDORSEMENT ... (VOTE FOR ONE)", so both are `endorse`. Wilton Fire
  Protection District lists three endorsed candidates for "2 at large seats
  VOTE FOR 2 ONLY"; all three are recorded as `endorse`. Drop them if you
  read that as non-committal.
- **"No Position"** on Measures D, E and G is recorded as `neutral`.
- **Ballot names.** State and federal choices use the SOS certified-list
  spelling (e.g. "Michael E. Gates", "Donald P. (Don) Wagner", "Herb W
  Morgan", "Susan A Mason"); the statements quote the page spelling. Local
  names are as printed by the party.
- **Top-two.** All state and federal picks appear on the SOS certified
  general list. Local races are November-only contests.
- **New titles** (shared with the SacDems bundle): Citrus Heights, Galt,
  Carmichael Water District, San Juan Water District, Wilton Fire District,
  Cordova and Southgate Recreation and Park District titles are new. District
  numbers for Sacramento Suburban Water ("Water District 1") are recorded as
  "Division N" to match SacDems' wording; check against the county ballot.
