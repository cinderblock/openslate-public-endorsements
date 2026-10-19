# NOTES — Everytown for Gun Safety Action Fund, Nov 3 2026 California general (California picks only)

Everytown is a national organization. This bundle holds only its
California endorsements for the November 3, 2026 general election.

## Sources

- https://www.gunsensevoter.org/candidates/ ("Your 2026 Gun Sense
  Candidates") is a JavaScript search app. It loads its data from
  https://gunsensevoter.org/wp-json/heliotrope/v1/candidates/search
  (queried with state=CA, year=2026, per office level). The API returned
  370 California 2026 records: 45 federal, 61 state, 264 local.
- https://www.gunsensevoter.org/faq/: "The Moms Demand Action Gun Sense
  Candidate distinction is not an endorsement from Everytown for Gun Safety
  Action Fund ... and it should not be represented as such."
  "Endorsements from Everytown for Gun Safety Action Fund are separate from
  the Moms Demand Action Gun Sense Candidate distinction."

## What was extracted: 33 positions

Only records flagged `everytown_endorsement__c: "1"` were used. The site
shows these with an "Everytown Endorsed" badge. There are 35 such
California records.

- US House (9): CD 4 Thompson, 14 Wahab, 16 Liccardo, 24 Carbajal, 27
  Whitesides, 33 Aguilar, 35 Torres, 36 Lieu, 49 Levin.
- State Senate (2): SD 24 Goldsmith, SD 40 Elliott.
- Assembly (5): AD 16 Bauer-Kahan, 19 Stefani, 28 Pellerin, 40 Schiavo,
  76 Darshana Patel.
- Local (17): Carlsbad D3, Culver City, Encinitas D3, Foster City D1,
  Goleta D1 and D2, Huntington Beach, Oceanside D1, OC Supervisor D5,
  Poway USD Area C, San Jose USD Area 4, San Ramon D4, Sonoma County
  Supervisor D2, Stockton USD Area 6, Walnut Creek, Westside Union SD,
  Hart UHSD Area 5.

## Skipped

- The 335 Gun Sense Candidate distinctions that carry no endorsement. The
  org says these are not endorsements, and several races have more than one
  holder.
- Laura Karolina Capps (Santa Barbara County Supervisor D2). She won
  outright in the June 2 primary (76%, per the Santa Barbara Independent's
  June results), so the seat is not on the November ballot.
- Lucas Frerichs (Yolo County Supervisor D2). I could not confirm that
  this seat is on the November ballot (it may have been settled in June).
  Omitted; a reviewer can add it if it is.

## Top-two check

- Every federal and legislative choice matches a November finalist in
  existing bundles.
- Sonoma County Supervisor D2: Joanna Paun led the June primary (38%) and
  heads to a November runoff against Sylvia Lemus (Norcal Public Media,
  June 6 2026).
- The other local races are November-only contests, or already appear
  with this candidate in existing bundles.

## Review flags

- **New titles** (no existing subject):
  - "Sonoma County Board of Supervisors, District 2" (`us/ca/sonoma-county`)
  - "Stockton Unified School District Board, Trustee Area 6" (`us/ca/san-joaquin-county`)
  - "Walnut Creek City Council" (`us/ca/walnut-creek`)
  - "Westside Union School District Board of Trustees" (`us/ca/los-angeles-county`)
- **Foster City.** Gun Sense says only "Foster City Council". Phoebe Shin
  Venkat is filed as District 1, matching existing bundles.
- **Names normalized:** "Norma J. Torres" -> "Norma Torres";
  "Luz Reyes-Martin" -> "Luz Reyes-Martín" (existing bundles).
- **Source.** Statements quote the API record fields, because the HTML
  page has no server-rendered candidate text.
