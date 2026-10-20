# NOTES — ACT / Pasadena Arroyo Democratic Club (PADC), Nov 3 2026 general

## Sources

- https://www.actpasadena.org/endorsements (HTML, scraped). The home page
  links it as "ACT/PADC ENDORSEMENTS for candidates and ballot measures in
  the November 2026 election".
- https://www.actpasadena.org/about and /pacd: process context only.
  "All endorsements are voted on by our members via email and/or mail."
  The joint Steering Committee "makes endorsement recommendations to their
  general memberships". PADC says it is chartered by the LA County
  Democratic Party and has "more than 300 members".

## Extracted: 38 positions

- **`endorse` (11)**, from the block "ACT and Pasadena Arroyo Democratic
  Club (PADC) endorse these candidates for the November 2026 general
  election": Governor (Becerra), CD 28 (Chu), CD 30 (Friedman), AD 41
  (Harabedian), LA County Sheriff (Luna), Pasadena USD Districts 1, 3, 7,
  and PCC Trustee Areas 1, 3, 5.
- **`lean_for` (9)**, from "The ACT Steering Committee also recommends": Lt.
  Governor, Attorney General, Secretary of State, Controller, Treasurer,
  and Superior Court Offices 64, 65, 87, 131. The org separates
  member-voted endorsements from Steering Committee recommendations, so
  per the round-2b rule these are `lean_for`.
- **Measures (18)**: 14 state props (13 `endorse` Yes/No; Prop 40 "No
  Recommendation" is `abstain`), LA County Measures A and E, PCC Measure UP
  and Pasadena Measure PFD, all Yes.
- The page calls the state propositions "Measure 1", "Measure 37", etc.
  They map to Props 1–5 and 37–45 by number and description.

## Skipped

- **PCC Board of Trustees "District 7 – Alton Wang"**: there is no PCC
  Trustee Area 7 contest in the LA County RR/CC candidate list for Nov 3
  (only Areas 1, 3 and 5). It is probably uncontested and not on the
  ballot. Note that 3 other bundles already have a "Pasadena Area Community
  College District Board, Trustee Area 7" subject; a reviewer may want to
  check those.

## Flags for review

- **Tier of the proposition and local-measure picks.** They follow the
  Steering Committee "also recommends" list on the page, under their own
  headings ("State Propositions:", "County Ballot Measures:", "Local Ballot
  Measures:"), with no verb. They are encoded as `endorse` Yes/No. If the
  reviewer reads them as part of the Steering Committee recommendations,
  `lean_for` would be the alternative.
- **Choice spellings use the LA County ballot names**: "Steve Gibson"
  (another bundle uses "Dr. Steve Gibson"), "Kristine E. Kwong" (page:
  Kristine Kwong), "Anthony (A.J.) Bayne" (page: Anthony Bayne). The
  Superior Court Office 65 ballot name is "Justin Allen Clayton". The
  existing "Justin Clayton" choice is reused.
- **Invented titles (4)**: "Pasadena Unified School District Board,
  District 1" / "District 3" / "District 7" and "Pasadena Area Community
  College District Board, Trustee Area 5" (all `us/ca/los-angeles-county`).
  They follow the existing PCC and LA County school-board conventions.
- Every candidate was checked against the LA County candidate list for
  Nov 3 (`$TEMP/os-dl/N3/lavote-pdf/`).
