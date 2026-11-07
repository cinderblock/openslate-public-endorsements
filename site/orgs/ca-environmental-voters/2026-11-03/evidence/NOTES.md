# NOTES: California Environmental Voters, November 3, 2026 general

## Source

- https://envirovoters.org/2026-endorsements/ (retrieved 2026-10-15T01:08Z,
  rendered in Chrome). The page says its list is "who to vote for in
  California’s November 3, 2026 General Election". The statewide, Senate,
  Assembly, Congressional, Board of Equalization, Local and Ballot Measures
  lists sit in collapsed tabs; the full article DOM text was extracted
  verbatim (see `envirovoters-2026-endorsements.md`). A WebFetch of the same
  URL at ~01:05Z returned an identical list.

## Extracted: 114 positions

- 7 statewide offices (Governor through Superintendent). No Lieutenant
  Governor endorsement on the page.
- 10 State Senate, 46 State Assembly, 40 US House.
- 2 Board of Equalization (D2 Sally Lieber, D3 Sam Sukaton).
- 4 local races: Los Angeles Mayor (Nithya Raman), Orange County Board of
  Supervisors D4 (Connor Traut) and D5 (Katrina Foley), LACCD Board of
  Trustees Seat 6 (Randall Winston).
- 5 statewide propositions (2 Yes, 4 Yes, 39 No, 43 No, 45 No). Each has a
  one-line tagline on the page, quoted verbatim in `statement`.

## Ballot check (top-two)

All state legislative and congressional picks were cross-checked against the
general-election matchups listed on Wikipedia's 2026 California State Senate,
State Assembly and US House (districts 1–26, 27–52) articles (retrieved
2026-10-15 ~01:35–01:45Z). Every endorsed candidate is on the Nov 3 ballot.
Statewide picks match the SOS certified list (Becerra v. Hilton, Allen v.
Kim, Barrera v. Shaw, etc.). LA Mayor runoff (Bass v. Raman) confirmed by
June news coverage. The OC supervisor and LACCD races were not independently
verified; they are taken as listed on the org's November page.

## Changes from the June bundle (primary picks that did not advance)

- Governor: June dual endorsement Katie Porter / Tom Steyer. Neither
  advanced; the November page endorses Xavier Becerra.
- Lieutenant Governor: June dual Josh Fryday / Michael Tubbs. Neither
  advanced (general is Fiona Ma v. Gloria Romero). No November endorsement;
  race omitted.
- Superintendent: June Anthony Rendon; November Richard Barrera.
- SD 10: June dual David Cohen / Anne Kepner; November Scott Sakakihara.
- SD 16: June Manpreet Kaur; not on the November page (did not advance).
- SD 24 Brian Goldsmith and SD 26 Sarah Rascón are both in same-party (D v. D)
  generals.

## Judgment calls / name normalization

- Honorifics dropped from `choice`: "Dr. Richard Pan" -> "Richard Pan" (CA 6),
  "Dr. Paula Swift" -> "Paula Swift" (AD 70), for cross-org matching. Page
  text is preserved verbatim in the evidence file.
- "Linda Sanchez" (CA 41) kept as spelled on the page (other sources write
  "Linda Sánchez").
- LACCD subject title "Los Angeles Community College District Board of
  Trustees, Seat 6" with jurisdiction `us/ca/laccd` is new (no June
  precedent). The page wrote "LACCD Board of Trustees, Seat 6".
- Board of Equalization subjects use jurisdiction `us/ca` (June convention).

## Skipped

- The "Election Cheat Sheet" PDFs and the four regional voter guides
  (Inland Empire, Los Angeles, Sierra Nevada, Central Valley, Oct 8, 2026)
  were not fetched; they may carry additional local endorsements. Candidate
  for a follow-up pass.

## Refresh 2026-10-30

Re-fetched https://envirovoters.org/2026-endorsements/ on 2026-10-30 9:48 AM PDT (16:48Z). Evidence: `envirovoters-2026-endorsements-2026-10-30.md`. Added 7 picks the
page didn't show on 10-15: Prop 1 Yes, Prop 5 Yes, Prop 41 No, Prop 42 No, CD 27 George Whitesides, LA City
Council D3 Barri Worth Girvan, LA City Measure PRK Yes. Everything else on the page matches the bundle. The
regional voter guides and cheat-sheet PDFs were still not read.
