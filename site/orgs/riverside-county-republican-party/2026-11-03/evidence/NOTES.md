# NOTES — Republican Party of Riverside County, Nov 3 2026 general

## Sources

- https://www.riversidecountygop.com/2026-endorsed-candidates/ ("Official
  Republican Party of Riverside County 2026 Voter Guide — RPRC endorsed
  candidates and ballot measure positions"). The guide is published only as
  images (a 9-image gallery, and a 9-page image-only PDF). All positions
  were transcribed from the JPEGs (mode `transcribed`); each position cites
  the specific image.

### The files, by full URL

Read for the positions, pages 02 to 09 of the guide:

- https://www.riversidecountygop.com/wp-content/uploads/2026/10/RPRC_02_Statewide_Voter_Guide.jpg
- https://www.riversidecountygop.com/wp-content/uploads/2026/10/RPRC_03_Congress_and_State_Senate.jpg
- https://www.riversidecountygop.com/wp-content/uploads/2026/10/RPRC_04_AD36_Jeff_Gonzalez.jpg
- https://www.riversidecountygop.com/wp-content/uploads/2026/10/RPRC_05_AD47_Greg_Wallis.jpg
- https://www.riversidecountygop.com/wp-content/uploads/2026/10/RPRC_06_AD58_Leticia_Castillo.jpg
- https://www.riversidecountygop.com/wp-content/uploads/2026/10/RPRC_07_AD60_Ed_Delgado.jpg
- https://www.riversidecountygop.com/wp-content/uploads/2026/10/RPRC_08_AD63_Natasha_Johnson.jpg
- https://www.riversidecountygop.com/wp-content/uploads/2026/10/RPRC_09_AD71_Kate_Sanchez.jpg

The rest of the guide, which gave no position:

- https://www.riversidecountygop.com/wp-content/uploads/2026/10/RPRC_01_Cover.jpg
  (page 01, a title page with no endorsements)
- https://www.riversidecountygop.com/wp-content/uploads/2026/10/RPRC_2026_Voter_Guide.pdf
  (the whole guide as one file, opened but not transcribed)

Checked 2026-10-30, 5:44 PM PDT (2026-10-31 00:44Z), with one GET each of the
cover and the PDF and the other eight as saved in capture run
`2026-10-31T0003Z`. All ten are dated 2026-10-05 by the site, before this slate
was read on 2026-10-19. The PDF has nine pages, no text layer and one image a
page, each the size of the matching JPEG and under 1 of 255 grey levels from
it on average, so it holds the same pages. Pages 02 to 09, read again by eye,
match `rprc-voter-guide-images.md`.

## Extracted: 75 positions

- Statewide: 8 (Governor, Lt. Governor, SoS, Treasurer, Controller, AG,
  BOE District 4, Superintendent). No Insurance Commissioner pick.
- Superior Court of Riverside County, Office 10: 1 (Michelle Paradise).
- Propositions: 14 (Yes on 39, 41, 42, 43, 45; No on 1, 2, 3, 4, 5, 37, 38,
  40, 44).
- Congress: 4 (CD 25, 39, 40, 48). State Senate: 2 (SD 18, 32).
  Assembly: 6 (AD 36, 47, 58, 60, 63, 71).
- Local, from the Assembly-district pages: 40 (city councils and mayors,
  school boards, two water agencies).

## Top-two check

- All congressional, legislative and statewide picks are on the SOS
  certified list (8/27/2026). CD 40 is Calvert vs. Young Kim, both
  Republicans; the RPRC backs Calvert.
- **Jim Desmond is labeled "CA 49".** The certified list has Desmond in CD 48
  (vs. Marni von Wilpert); CD 49 is Mike Levin vs. Armen Kurdian. Desmond
  is only on the ballot in CD 48, so this is encoded as CD 48. Reviewer:
  confirm, or drop it if you would rather not correct the source's label.
- **Superior Court Office 10.** The guide says only "JUDGE (RIVERSIDE
  COUNTY)". Michelle Paradise is in the Nov 3 runoff for Office No. 10
  against Andrea Garcia (NBC Palm Springs, Oct 6, 2026).
- **Riverside Ward 4.** Chuck Conder (first, ~46–48%) and Rich Vandenberg
  (second) advanced from the June 2 primary to the Nov 3 runoff (Raincross
  Gazette; The Riverside Record).
- **Moreno Valley.** Vanessa Moore (Mayor) and David Zeitz (D2) are on the
  city clerk's qualified-candidate tracker.
- **San Gorgonio Pass Water Agency Division 4.** Della Condon is on the San
  Bernardino County ROV candidate list for this contest (the agency spans
  both counties).
- **Not verified against the county list.** voteinfo.net (Riverside County
  ROV) returns HTTP 403 to every fetch method tried, so the other local
  names and seats are as printed on the guide.

## Judgment calls / review flags

- **Invented titles** (no Riverside local subjects existed), shared with the
  riverside-county-democratic-party bundle where the contests overlap:
  "<City> City Council, District N", "<City> Mayor",
  "<District> Board, Trustee Area N", "<Water District> Board, Division N".
  At-large councils ("Indian Wells", "San Jacinto", "Canyon Lake", "Norco")
  and Indio (no district printed for Elaine Holmes) use seat-less titles.
- **"District" → "Division"** for Elsinore Valley MWD ("DISTRICT 1") and the
  San Gorgonio Pass Water Agency ("DISTRICT 4"); both elect by division (the
  SB ROV list says "Division 4" for SGPWA).
- **District names expanded**: "Hemet USD" → Hemet Unified School District,
  "Perris Union HSD" → Perris Union High School District, "Corona/Norco USD"
  → Corona-Norco Unified School District, "Menifee USD" → Menifee Union
  School District.
- **Name forms**: "DONALD WAGNER" is encoded as "Don Wagner" and "DR. YUAN
  HAWKES" as "Yuan Hawkes" to match existing bundles / drop honorifics.
- Jeremy Smith's line says only "CANYON LAKE CITY COUNCIL" while Paul
  Kakis's says "AT LARGE"; both are under the seat-less Canyon Lake title.
