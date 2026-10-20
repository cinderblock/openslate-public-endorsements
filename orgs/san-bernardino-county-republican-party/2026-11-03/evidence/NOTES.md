# NOTES — San Bernardino County Republican Party, Nov 3 2026 general

## Sources

- https://sbgop.com/2026-general ("General Election voter guide"), HTML.
  The county party's real site is **sbgop.com** (listed on
  https://cagop.org/counties/san-bernardino/). The domains tried earlier
  (sbcgop.org, sbcrp, sbcountygop) belong to other counties: sbcgop.org is
  the San Benito County GOP.
- The page links a 4-page PDF, "SBGOP_2026_Complete_Updated_Voter_Guide",
  headed "2026 ENDORSED CANDIDATES & VOTER GUIDE / SAN BERNARDINO COUNTY
  REPUBLICAN PARTY". Every position cites the PDF, so `mode` is
  `transcribed`. The HTML page's card layout scrambles its headings when
  converted to text, and it covers only the statewide, federal and
  legislative picks. The PDF is the complete, unambiguous source.

## Extracted: 97 positions, all `endorse`

- Board of Equalization: 2 (D1 Grove, D4 Bilodeau).
- US House: 6 (CD 23, 25, 28, 31, 33, 35).
- State Senate: 3 (SD 18, 22, 32). Assembly: 10 (AD 34, 36, 39, 41, 45,
  47, 50, 53, 58, 59).
- County: Superintendent of Schools (Binks), Board of Education Area B.
- Cities and towns: 36 positions across Adelanto, Apple Valley, Big Bear
  Lake, Chino, Chino Hills, Colton, Fontana, Grand Terrace, Hesperia,
  Needles, Ontario, Rancho Cucamonga, Redlands, Rialto, San Bernardino,
  Twentynine Palms, Victorville, Yucaipa and Yucca Valley.
- School, college and special districts: 38 positions.
- Every candidate was checked against the San Bernardino ROV candidate list
  for Nov 3 2026 (last updated 9/29/2026; downloaded by an earlier agent to
  `$TEMP/os-dl/N3b-ie/sbrov/`). `choice` uses the ROV ballot name, or the
  spelling already used in this repo for the same subject (e.g. "Stephanie
  Vargas", "Art Hodges", "Phillip Chen").

## Republished from California Republican Party

The guide's "Statewide Candidate Races" block and its proposition page are
identical, pick for pick, to the California Republican Party's statewide
endorsements (`orgs/ca-republican-party`). Per the round-2b rule they are
NOT in positions.json. Source: the PDF above (pages 1 and 4).

- Governor: Steve Hilton. Lieutenant Governor: Gloria Romero. Attorney
  General: Michael Gates. Secretary of State: Don Wagner. Treasurer:
  Jennifer Hawks. Controller: Herb Morgan. Superintendent of Public
  Instruction: Sonja Shaw.
- Props: 1 NEUTRAL, 2 NO, 3 NO, 4 NO, 5 NO, 37 NEUTRAL, 38 YES, 39 YES,
  40 NO, 41 YES, 42 YES, 43 YES, 44 NO, 45 YES.

The guide itself does not attribute these to CAGOP. If the co-signer
mechanism lands, this county party is a co-signer of those 21 CAGOP picks.

## Skipped

- **Not on the Nov 3 ballot** (no such contest or candidate in the ROV
  list; probably uncontested and appointed in lieu of election):
  Board of Education Area A (Ryan McEachron); Barstow CCD Area D (Julie
  Hackbarth-McIntyre); Victor Valley CCD Area 4 (Brandon Arthur Wood);
  Lucerne Valley USD at-large (Jessica Nicole Risler); Alta Loma SD Area 1
  (Eric Chung); Etiwanda SD Area 4 (Matt Gordon).

## Flags for review

- **District numbers corrected to the ROV list.** The PDF lists Eric
  Chappell under Lake Arrowhead CSD "Division 4", but the ROV has him in the
  Division 5 contest (vs. Ben Naraghi). It lists Nyles O'Harra as Yucaipa
  Valley Water District "Districtwide", but the ROV contest is Division 2
  (vs. Robert Cruse). Both are encoded under the ROV division; statements
  quote the PDF as printed.
- **Phelan Pinon Hills CSD names are clipped in the PDF** ("Matt Coving",
  "Idilio Sanch", "Andrew \"An"). Each prefix matches exactly one candidate
  in the 7-candidate ROV contest (Matt Covington, Idilio Sanchez, Andrew
  "Andy" Minnala), so they are included with the ROV names.
- **Name spellings that differ from the ballot:** "Kevin Kizzie" (ballot
  Kevin Kizzee), "Rita Loof" (Rita Fernandez-Loof), "Douglas Gonzales" (Doug
  Gonzales), "Ed Montoya" (Edward Montoya Jr), "Phillip Cothran, Jr."
  (ballot Phillip Cothran), "Victoria Mageno" (Victoria Viveros Mageno),
  "Phil Chen" (Phillip Chen).
- **Statewide vs. own picks.** Congress, legislature and BOE are kept as
  the county party's own picks: they are district races inside the county.
  They likely also match CAGOP endorsements; a reviewer may decide those
  belong under "Republished" too.
- 43 new subject titles were invented, following the existing San
  Bernardino County conventions (e.g. "Hesperia City Council, District 2",
  "Apple Valley Town Council, District 3", "Lake Arrowhead Community
  Services District Board, Division 2"). All other titles were reused.
