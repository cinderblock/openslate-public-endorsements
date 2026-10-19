# NOTES — South Bay AFL-CIO Labor Council, Nov 3 2026 general

## Sources

- https://www.southbaylabor.org/2026_endorsements ("2026 November
  Endorsements", "November 2026 General Election Endorsements"; HTML,
  scraped). This is the only source. Each local pick is marked "Sole
  Endorsement", "Dual Endorsement" or "Open Endorsement".
- Ballot check: Santa Clara County ROV qualified lists of state and local
  candidates (https://files.santaclaracounty.gov/exjcpb1296/2026-08/qualified-state-8.28.2026-qualified-state-v2.pdf,
  https://files.santaclaracounty.gov/exjcpb1296/2026-09/qualified-list-of-local-candidates-9-28-26.pdf),
  the ROV List of Local Measures (https://vote.santaclaracounty.gov/list-local-measures-4),
  and the SOS certified list for the statewide/legislative finalists.

## Extracted: 88 positions

- Statewide, federal and legislative, 18: Governor, Lt. Governor, SoS, AG,
  Controller, Treasurer, Insurance Commissioner, SPI, BOE 2; CD 17, 18, 19;
  SD 10; AD 24, 25, 26, 28, 29.
- Cities and Valley Water, 33: Cupertino (3), Gilroy D4-D6, Los Gatos (2),
  Milpitas council (2) and mayor, Morgan Hill D-B (dual) and D-D, Mountain
  View (3), Palo Alto (2), Santa Clara D2 (dual), D3 and mayor, Valley Water
  D1, D6, D7, San Jose D5, D7, D9, Saratoga, Sunnyvale D1, D3, D5.
- Schools and community colleges, 33 (sole and dual picks only).
- Measures, 4: Yes on Mountain View E and F, Palo Alto J, and "2026 Regional
  Transportation Measure" (encoded as the existing regional Measure RTM
  subject).

## Skipped (and why)

- **"Open Endorsement" entries (omitted as ambiguous)**: San Jose D7 Van Le
  (the same race lists Bien Doan as "Sole Endorsement"), Alum Rock TA 3
  Andres Quintero, Campbell Union SD TA 4 Mohit Vora, Evergreen SD Johnny Ray
  Reyna, Morgan Hill USD TA 3 Sarah Northrup Gadus, County Board of Education
  TA 7 Raeena Lari, Santa Clara USD TA 3 Vickie Fairchild, West
  Valley-Mission TA 7 Susan Fish. The page doesn't define "open", and a race
  that has both a "sole" and an "open" pick shows it isn't a plain endorsement.
  A reviewer who knows the council's usage may want to add these as
  `lean_for` or leave them out.
- **Not on the ballot** (ROV marks the contest "On Ballot: No", i.e. the
  seat was uncontested and is filled by appointment in lieu of election):
  Alum Rock TA 1 Darcie Green, Campbell Union HSD TA 1 James S. Kim and TA 2
  Elisabeth Halliday, Cupertino Union SD Ava Chiao, Gavilan TA 1 Kathy Chavez
  Napoli, Mountain View-Los Altos UHSD TA 2 Ellen Kamei, San Jose-Evergreen
  CCD TA 4 Maria Fuentes, County Board of Education TA 2 Yan Zhao, West
  Valley-Mission TA 5 Diane Lamkin.
- **Santa Clara USD "Trustee Area 3" Kamal Yassin — Sole Endorsement**:
  the ROV has Yassin running in Trustee Area 1 (vs. Jim Canova); TA 3 is
  uncontested (Vickie Fairchild, not on ballot). This looks like a heading
  error on the page, so it was omitted rather than guessed.
- **San Benito County entries**: Hollister City Council D2 (Brian Chavez),
  D3 (Dolores Morales), San Benito County Board of Supervisors D5 short term
  (John Williams), and Gavilan Joint CCD TA 5 (Jeanie Wallace) and TA 7
  (Irma Gonzalez), whose trustee areas are outside the Santa Clara County
  list. I couldn't get the San Benito County candidate list to confirm these
  are on the ballot, so they were left out. A follow-up could add them with
  jurisdiction `us/ca/hollister` / `us/ca/san-benito-county`.

## Flags for review

- **Dual endorsements** are encoded as two `endorse` positions in the same
  vote-for-1 race: Morgan Hill D-B (Hayes, Martinez Beltran), Santa Clara D2
  (Williams, Inciarte), East Side UHSD TA 4 (Chavez, Lam), San Jose USD TA 4
  (Grunthaner, Melillo), West Valley-Mission TA 3 (Kepner, Glaves).
- **Sunnyvale D1, D3, D5** each have a single qualified candidate. The ROV
  list marks D1 and D3 "On Ballot: Yes"; the D5 flag didn't extract from
  the PDF, so D5 (Richard Mehlinger) is included by analogy. Worth a check.
- **Spellings**: `choice` uses the ROV/SOS ballot name: Seema Lindskog ->
  Seema Sharma Lindskog; Rebeca Armendariz -> Rebeca G. Armendáriz; Jeffrey
  Suzuki -> Jeff Suzuki; Gary Ferraris -> Armando "Gary" Ferraris; John
  Varela -> John L. Varela; Yudy Deng -> Yu "Yudy" Deng; Meredith "Mer"
  Curry Nunez -> Mer Curry Nuñez; Jennifer "Jenny" Ludwig -> Jenny Ludwig;
  Magaly Fernandez -> Magaly Fernández; Nancy Altman -> Nancy Altman-Palm;
  Glen Webb -> Glen R. Webb; Victor Ramirez -> Victor A. Ramirez; Lyseria
  Phillips -> Lyseria Evelyn Phillips; José Magaña -> Jose Magana (ROV
  spelling); Mary Grunthaner -> Mary J. Grunthaner; Anne Kepner -> Anne J.
  Kepner; Colin Glaves -> Colin Lee Elliott Glaves; statewide Shirley Weber
  -> Shirley N. Weber, Malia Cohen -> Malia M. Cohen, Sally Lieber -> Sally
  J. Lieber.
- The Evergreen SD at-large race lists three "Sole Endorsement" picks
  (Wright, Diener, Fernandez) for a 3-seat race; all three kept.
