# NOTES — Riverside County Democratic Party, Nov 3 2026 general

## Sources

- https://www.riversidecountydemocrats.org/endorsements/ ("Endorsements —
  November 3, 2026 Midterm Election"). The page body is two embedded
  graphics; all positions were transcribed from them (mode `transcribed`):
  - `RCDP-Voter-Guide-Candidates.jpg` (the "Riverside County Democrats Voter
    Guide", with "2026 California Democratic Party Endorsed" badges).
  - `Propositions.png` (all 14 state propositions, Yes/No).
- The page's "Download printer-friendly pdf" button has no link, and the two
  Google Drive download buttons were not fetched.

## Extracted: 91 positions

- Statewide: 9 (Governor, Lt. Governor, SoS, Controller, AG, Insurance
  Commissioner, Treasurer, Superintendent, BOE District 4).
- Congress: 6 (CD 23, 25, 33, 35, 39, 48).
- Legislature: 6 (SD 32; AD 36, 47, 58, 60, 71).
- Superior Court of Riverside County, Office 10: 1 (Andrea Garcia).
- School boards: 18. Special districts: 8. City offices: 29.
- Propositions: 14 (Yes on 1, 2, 3, 4, 5, 37, 38, 40; No on 39, 41, 42, 43,
  44, 45).

## Top-two check

- Every statewide, congressional and legislative pick is on the SOS
  certified list of candidates (8/27/2026,
  https://elections.cdn.sos.ca.gov/statewide-elections/2026-general/cert-list-candidates.pdf).
- **Superior Court Office 10.** Andrea Garcia is not named with an office
  number on the graphic, only "Riverside County Superior Court Judge". NBC
  Palm Springs (Oct 6, 2026) reports that Michelle Paradise faces Andrea
  Garcia in the November runoff for this seat, and other coverage calls it
  Office No. 10. Title used: "Superior Court of Riverside County, Office 10".
- **Riverside City Council Ward 2.** Aram Ayra was second in the June 2
  primary (Raincross Gazette: Gracie Torres 38%, Aram Ayra 35%), so he is in
  the Nov 3 runoff.
- **Moreno Valley.** Ulises Cabrera (Mayor), Liza Arellano (D2) and
  Cheylynda Barnard (D4) are on the city clerk's qualified-candidate tracker
  (https://www.moreno-valley.ca.us/departments/city-clerk/pdfs/2026_Council_Candidate_Information_ElectionTracker.pdf).
- **Not verified against the county list.** The Riverside County Registrar
  (voteinfo.net) returns HTTP 403 to every fetch method tried (Python urllib,
  WebFetch, curl in WSL). The Wayback Machine has no snapshot. So the other
  city, school and special-district picks have not been checked against the
  Riverside County qualified-candidate list. They are November-only
  contests, so there is no top-two issue, but spellings and seat numbers are
  as printed on the RCDP graphic.

## Judgment calls / review flags

- **Invented titles.** No Riverside County local subjects existed. New titles
  follow the San Diego patterns: "<City> City Council, District N",
  "<City> Mayor", "<City> City Clerk", "<District> Board, Trustee Area N",
  "<Water/Health District> Board, Division/Zone N". City contests use city
  slugs (`us/ca/banning`, `us/ca/cathedral-city`, `us/ca/moreno-valley`,
  `us/ca/palm-springs`, `us/ca/riverside`, ...). School and special-district
  contests use `us/ca/riverside-county`.
- **Division vs. District.** The graphic says "Western Municipal Water
  District, District 2" and "Eastern Municipal Water District, District 5".
  Both agencies elect by division, so the titles use "Division 2" and
  "Division 5" (the IE Labor Council lists the EMWD seat as "Area 5").
- **District names normalized.** "Menifee USD" → Menifee Union School
  District; "Romoland USD" → Romoland School District; "Val Verde ISD" →
  Val Verde Unified School District; "Nuview USD" → Nuview Union School
  District; "Desert Health Care District" → Desert Healthcare District.
- **Two endorsees for one seat.** "Coachella Valley USD, TA1: VALERIE GARCIA
  & LORETTA PEREZ" names two people for a single trustee area. Both are
  encoded under TA1 as printed, but Inland Empire United endorses Loretta
  Perez for Coachella Valley USD Trustee Area 2, so the RCDP line is
  probably two seats run together (Garcia TA1, Perez TA2). Reviewer: move
  Perez to TA2 if confirmed. Palo Verde Health Care District is at-large, so two names
  there is expected.
- **Typo corrected.** "RAUL GUTIRREZ" (Eastvale D4) is encoded as "Raul
  Gutierrez". Confirm against the ballot.
- **Honorifics dropped** from choices ("Dr." for Raul Ruiz, Shirley Weber,
  Tiffanie Tate, Ida Obeso-Martinez, Corey Jackson, Keri Then, Serina
  Strange, Reshae Monique Crawford, Liza Arellano). Middle initials and
  names were dropped where the existing bundles use the short form (Tessa
  Hodge, Norma Torres).
- **Seat-less titles.** No district is printed for Beaumont City Council
  (Jim Mercado), Coachella City Council (Vicente Zamora) or La Quinta City
  Council (Julian Herrera), so they use seat-less titles.
- Christen Montero (WMWD Division 2) is the same person reported to have
  withdrawn from the Riverside Ward 2 council race after the primary; the
  water board pick is separate and was kept.
