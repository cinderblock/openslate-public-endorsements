# NOTES — El Dorado County Democratic Party, Nov 3 2026 general

## Sources

- https://edcdems.org/elections/ : "2026 Endorsed Candidates" and a separate
  "2026 Supported Candidates" tier (HTML). Each office label is followed by
  the candidate's name.
- https://edcdems.org/ : home page block "EDC Democrats Endorse Prop 3 —
  Protect Our Schools and Healthcare! [Yes on Prop 3]".
- State and federal spelling comes from the SOS certified list.

## Extracted: 20 positions

- Endorsed (17): CD 3 Bera, CD 5 Masuda, CD 7 Matsui, SD 4 Brandon, AD 1
  James, AD 5 Parker; EID Division 4 Anzini; El Dorado County Board of
  Education TA 1 Hensill; Mother Lode USD Carlson; South Lake Tahoe City
  Council (Gonzalez, Miller, Friedrich) and City Clerk Davis; Lake Tahoe USD
  Area 5 Kemper; South Tahoe PUD (Exline, Haven, Romsos).
- Supported (2, `lean_for`): Board of Supervisors D4 Gina Posey (NPP) and
  EDCOE Trustee Area 2 Adam Clark (NPP).
- Prop 3: Yes (home page).

## Skipped

- "See All CADEM Endorsements" is a link to the state party list. Its picks
  are not printed on this page, so nothing was copied.

## Flags for review

- **Tiering:** the party separates "Endorsed" (Democrats) from "Supported"
  (NPP candidates). The supported tier is encoded as `lean_for` to keep the
  distinction. Change it to `endorse` if "supported" should count fully.
- **Local names, seats and titles were NOT verified against the registrar.**
  El Dorado County Elections (eldoradocounty.ca.gov / elections.edcgov.us)
  returned 403 or refused the connection (needs browser). In particular,
  check that BOS D4 (Gina Posey) and EDCOE TA 2 are on the Nov 3 ballot.
- AD 1: the SOS ballot name is "Dianna Margaret James". `choice` uses "Dianna
  James" to match the existing AD 1 subject in other bundles.
- INVENTED titles (us/ca/el-dorado-county unless noted): El Dorado Irrigation
  District Board, Division 4; El Dorado County Board of Education, Trustee
  Area 1 / Trustee Area 2; Mother Lode Union School District Board of
  Trustees; Lake Tahoe Unified School District Board, Area 5; South Tahoe
  Public Utility District Board; El Dorado County Board of Supervisors,
  District 4; South Lake Tahoe City Council and South Lake Tahoe City Clerk
  (us/ca/south-lake-tahoe).

## Refresh 2026-10-28: local races checked against the county's list

El Dorado County Elections' "Candidates on Ballot Report" (read through Chrome; saved as
`eldorado-candidates-on-ballot-2026-10-28.md`) confirms every local race and candidate
here is on the Nov 3 ballot, including BOS D4 (Gina Posey vs. Ted Gaines) and EDCOE
Trustee Area 2 (Adam Clark), which NOTES flagged as unverified, with one exception:
**Lake Tahoe Unified School District, Area 5 (Lauri Kemper) is not on the ballot** (the
district isn't in the report; the seat was probably uncontested), so that position was
removed. 20 → 19 positions. Spellings stay as the other bundles write them (no listing
covers El Dorado County yet): the ballot prints "LORI GODSEY ANZINI", "JOHN G HENSILL",
"GANTT W MILLER", "MICHELLE ELAINE DAVIS".
