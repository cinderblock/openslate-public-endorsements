# NOTES — Republican Party of Orange County, Nov 3 2026 general

## Sources

- https://ocgop.org/endorsements/ returns a 301 redirect to
  https://linkjar.to/voter-guide-2026/, a Linkjar PDF viewer titled "2026
  Voter Guide". The "CLICK HERE FOR COMPLETE ORANGE COUNTY VOTER GUIDE"
  link on https://ocgop.org/november-election/ goes to the same place.
- The viewer loads a 7-page PDF from
  https://linkjar.to/_/pdf/aa0dc48e-a2ea-40c8-8408-d58668b90d0b/ ("2026
  GENERAL ELECTION OFFICIAL REPUBLICAN VOTER GUIDE", "PAID FOR BY THE
  REPUBLICAN PARTY OF ORANGE COUNTY"). It was downloaded to
  `$TEMP/os-dl/N3b/linkjar/guide.pdf` and converted with `pdftotext -table`.
  The PDF has a text layer, so no OCR was needed. Mode is `transcribed`
  because the positions come from a PDF. Each position's `source` is the
  Linkjar page URL that ocgop.org links to.
- `pdftotext -layout` scrambles the two-column local pages. `-table` and
  `-raw` both give the same office→name pairing, and that pairing was used.

## Extracted: 118 positions

- Congress: CD 38, 41, 45, 46, 47, 49 (6).
- Statewide: 7 offices, plus Insurance Commissioner "NO ENDORSEMENT"
  (encoded as `neutral`, no choice), plus BOE District 4 = 9.
- Propositions: all 14. No on 1, 2, 3, 4, 5, 37, 38, 40, 44; Yes on 39, 41,
  42, 43, 45.
- State Senate: SD 30, 32, 34, 36, 38 (5). Assembly: AD 59, 64, 67, 70, 71,
  72, 73, 74 (8).
- Supervisors: D4 Tim Shaw, D5 Diane Dixon.
- Cities: 47 races. Local measures: Newport Beach H (No), Orange I (No).
- Schools: 23 races. Water: Mesa Water D5 and Moulton Niguel (2).

## Skipped

- **CD 40 and CD 42: "VOTE REPUBLICAN".** No candidate is named. CD 40 is
  R-vs-R (Ken Calvert vs. Young Kim), so it can't be resolved. In CD 42 the
  only Republican is Brian Burley, but the guide doesn't name him, so it was
  left out.
- **AD 68: "MAYRA RUIZ".** She is not a top-two finalist. AD 68 is Jessie
  Lopez (D) vs. David Penaloza (D) per the SOS certified list. Dropped.
- **Yorba Linda Water District, three directors** (Brett Barbre, Tom
  Lindsey, Wayne Scott). The district is on the registrar's June list of
  eligible contests, but not on its "Contests Qualified for the Ballot"
  page. It was probably uncontested and appointed in lieu of election.
  Dropped.

## Checks

- Every state and federal pick is a top-two finalist on the SOS certified
  list:
  https://elections.cdn.sos.ca.gov/statewide-elections/2026-general/cert-list-candidates.pdf
- Supervisor D4 is a Traut-vs-Shaw runoff (LAist and Voice of OC
  coverage). D5 is Foley vs. Dixon.
- Every local contest appears on
  https://ocvote.gov/elections/contests-qualified-for-the-ballot-for-the-2026-general-election
  Measure titles come from that page.

## Judgment calls / review flags

- **Name casing.** The guide prints names in ALL CAPS. Choices are
  title-cased by hand (e.g. `Casey McKeon`, `Brad McGirr`, `AJ Ricci`,
  `Shawn Dewane`, `Raul Ortiz Jr.`). The OC registrar's candidate list is
  JS-only, so ballot spellings were not checked against it. Known
  differences from the Lincoln Club of OC guide: "ANNE MALLARI" vs. "Anne
  Hertz-Mallari" (Cypress D1), "MICHAEL BULEY" vs. "Mike Buley" (Costa
  Mesa Mayor), "TRISH KELLY" vs. "Trish Kelley" (Moulton Niguel), "BRAD
  MCGIRR" vs. "Bradley McGir" (RSM D4).
- **Short-term seats.** Mission Viejo D2/D4, Aliso Viejo D3 and Coast CCD
  Trustee Area 3 are short-term seats on the registrar's list. The guide
  doesn't say so, but they are titled "(Short Term)" so they match the
  ballot (the "(Short Term)" suffix follows the existing "Lemon Grove City
  Council (Short Term)").
- **"HUNTINGTON BEACH SCHOOL DISTRICT"** became "Huntington Beach City
  School District Board, Trustee Area 4", and **"OCEANVIEW SCHOOL
  DISTRICT"** became "Ocean View School District Board, Trustee Area 5", as
  the registrar names them.
- **Mesa Water "District 5"** became "Division 5" (the registrar's term).
- **Supervisor jurisdiction.** The supervisor races reuse the existing
  `us/ca/orange` subject (sierra-club-angeles, ca-environmental-voters). That
  slug clashes with the City of Orange (also `us/ca/orange`). Other
  county-level contests use `us/ca/orange-county`.
- Insurance Commissioner "NO ENDORSEMENT" is encoded as `neutral` with no
  choice. Drop it if the coordinator prefers not to record non-endorsements.
- **Moulton Niguel Water District.** The registrar has two contests: "3
  Directors, Full Term" and "1 Director, Short Term". This guide doesn't
  say which one Trish Kelly/Kelley is running in. She is filed under the
  full-term title "Moulton Niguel Water District Board". If she is the
  short-term candidate, retitle her to "Moulton Niguel Water District Board
  (Short Term)". The DPOC city guides list Jennifer Engle (full term) and
  David Petty (short term).
