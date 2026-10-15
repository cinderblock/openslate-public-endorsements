# NOTES: Working Families Party (California), November 3, 2026 general

Retrieved 2026-10-15 (UTC). Mode `scraped`.

## Source

https://workingfamilies.org/states/california/. The page has two sections:

- **"Our Candidates"**: a table of Name | Office | Region. The page renders 10 rows; the remaining 211 load from the "View More" button. That button POSTs to `https://workingfamilies.org/wp-admin/admin-ajax.php` with `action=more_candidates&state=40&count=10`, and I fetched that response too. Total: 221 rows.
- **"Ballot measures"**: 13 statewide propositions with Yes/No.

The June bundle cited KPBS. This bundle uses WFP's own page.

## Extracted (44 positions)

- **13 propositions**: Yes on 1, 2, 3, 4, 5, 38 and 40; No on 39, 41, 42, 43, 44 and 45. `statement` is WFP's own label, e.g. "Prop 41: Billionaire Tax Poison Pill".
- **Statewide**:
  - Insurance Commissioner: Jane Kim.
  - BOE 2: Sally Lieber.
  - BOE 3: Samuel Sukaton.
- **US House**: CD 7 Mai Vang, CD 11 Connie Chan, CD 12 Lateefah Simon, CD 14 Aisha Wahab, CD 17 Ro Khanna, CD 22 Randy Villegas, CD 34 Angela Gonzales-Torres.
- **State Senate**: SD 2 Damon Connolly (see flag), SD 6 Sean Frame, SD 20 Caroline Menjivar, SD 24 John Erickson, SD 26 Sarah Rascón, SD 28 Lola Smallwood-Cuevas.
- **State Assembly**: AD 2, 12, 20, 24, 25, 44, 47, 55, 57, 58, 60, 61, 68, 72 and 79.

## Verification

The candidate table is headed "Our Candidates" ("Our 2026 Candidates" in the nav) and is **not dated**. It could mix primary-only and general races. So every state and federal entry was checked against the SOS *Certified List of Candidates for the November 3, 2026, General Election* (8/27/2026). All 31 are on the November ballot in the race named, after the SD fix below.

## Omitted

- **Prop 37**: not listed on the page (no WFP position).
- **About 186 local candidates** (city councils, mayors, county supervisors, school and college boards, special districts) and **4 judicial candidates**, whose rows do not say which county they're in. These could not be verified against an official November candidate list in this pass. Some are races that were decided in June or are June-only, e.g. "Los Angeles Mayor: Nithya Raman". Per the top-two rule ("only include races actually on the Nov 3 ballot") they are omitted rather than guessed at. The full table is in `evidence/wfp-california-state-page.md` for a follow-up that checks each county's November contest list.

## Flags for review

- **Damon Connolly** appears in the table as "State Senate, District 12". Connolly is on the November ballot in **Senate District 2** (Connolly vs Tief Gibbs). SD 12 is Nathan Magsig vs William Brown Jr. I treated "12" as a WFP typo and encoded **SD 2**, with no statement. Drop this position if that inference is unwanted.
- **Name fixes**: "Lashae Sharp-Collins" became "LaShae Sharp-Collins" (ballot spelling, AD 79). The table's "Sate Assembly, District 47" typo was read as State Assembly District 47 (Leila Namvar).
