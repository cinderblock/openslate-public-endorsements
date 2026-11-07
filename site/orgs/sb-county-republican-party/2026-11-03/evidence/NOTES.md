# NOTES — Santa Barbara County Republican Party, Nov 3 2026 general

## Sources

- https://www.santabarbaracountyrepublicanparty.com/2026-voter-guide (HTML)
  links the party's PDF voter guides. www.sbcrp.org, the URL printed on the
  PDFs, is a JavaScript-only Wix page. (sbcgop.org is the San Benito County
  GOP, not this party.)
- PDFs, all on irp.cdn-website.com/6880267d/files/uploaded/ and extracted with
  pdftotext (hence `mode: transcribed`):
  - `1.South_County_Voter_Guide_2_Page_Americana_QR.pdf`: federal, state,
    Carpinteria, Montecito, Santa Barbara, Goleta, Isla Vista.
  - `2.South_County_Voter_Guide_2_Page_Americana_QR.pdf`: state propositions
    with VOTE YES/NO. This is the `source` for the prop positions.
  - `2.SY.pdf.California_State_Ballot_Measures_Professional.pdf` and
    `2.JBSM.Clean.Back+SBCRP_Ballot_Measures_CLEAN_4x9.pdf`: the same prop
    recommendations (evidence only).
  - `1.Final+Front.cht.Lompoc_Voter_Guide_Clean_Colorful_No_Logo_QR.pdf`:
    Lompoc area.
  - `1.Santa_Ynez_2026_Voter_Guide_Professional.pdf`: Buellton, Solvang,
    special districts.
  - `9.Fed..SOS.FEDERAL.Santa_Barbara_Voter_Guide_With_Bob_Smith.pdf`: Santa
    Maria, Guadalupe, Orcutt, Cuyama, county offices. The `-layout`
    extraction garbles this one; the `-raw` extraction reads cleanly.
  - `3..Final.Local+Measures+.pdf`: local measures.
  - `1.Judges.pdf`: see "Republished" below.
- Ballot status was checked against the SB County Elections lists (cities on
  the ballot, schools and special districts on and off the ballot, and the
  local measures list) and the SoS certified list. Supervisor D5 is a November
  runoff, Valencia vs. Aguilera (certified June results).

## Extracted: 82 positions

- Federal and state: CD 24 Bob Smith; Governor through Superintendent;
  AD 37 Sari Domingues. Insurance Commissioner is `abstain`: "No
  Endorsement" in the South County and Lompoc guides, "Your Choice" in the
  Santa Ynez and Santa Maria guides.
- Local races: 32 endorse, 12 oppose, 6 abstain.
  - "No Vote for X" / "No Vote on X" / "No on X" are read as explicit
    opposition to that candidate and encoded as `oppose X`.
  - "No Endorsement" is encoded as `abstain`.
- Local measures: No on Santa Maria C2026, Santa Ynez Valley UHSD D2026, Isla
  Vista CSD E2026 and F2026, and Carpinteria I2026. Allan Hancock H and
  Guadalupe G2026 and J2026 are marked "(Neutral)", encoded as `neutral`.
- State props: Yes on 39, 41, 42, 43 and 45; No on 1, 2, 3, 4, 5, 37, 38, 40
  and 44. These differ from the CAGOP's statewide positions on 1, 37 and 38,
  so they are the county party's own.

## Republished from Craig Huey and Carl DeMaio (Reform California)

`1.Judges.pdf` gives retain / do-not-retain picks for the Supreme Court and
the 2nd District Court of Appeal. Its legend says "RED=Craig Huey" and
"Purple=Carl DeMaio & Craig Huey", meaning the picks are adopted from those
two guides. The colours are lost in text extraction. These picks are not in
positions.json. Source:
https://irp.cdn-website.com/6880267d/files/uploaded/1.Judges.pdf
- Do not retain: Groban, Evans (Supreme Court); Kim, Weingart, Richardson,
  Goorvitch, Adams, Hanasono, Zukin, Daum, Mori, Tamzarian, Martinez, Stone,
  and (page 2, inferred from layout order) Viramontes.
- Retain: Hoffstadt, Cody, Yegan, and (page 2, inferred from layout order)
  Wiley and Scherb.

## Skipped

- **Not on the ballot:** Isla Vista CSD Director ("No Vote Anoushka Gokhale")
  and Cuyama Joint USD ("Danielle Reynolds") are both on the county "Contests
  Not on Ballot" list.
- **Statewide officers.** The guides don't attribute these to the CAGOP, so
  they are kept as the county party's endorsements. They match the
  `ca-republican-party` candidate picks.

## Review flags

- **Candidates named in "No Vote" lines are encoded as `oppose`.** Carpinteria
  D1 Solorzano and D5 VanAntwerp; Montecito Sanitary (short term) Barrett;
  SBCC TA5 Luján; SBUSD TA1 Karlsen; Goleta Water D2 Werner and Wallach (both
  named in one line); Guadalupe mayor Christina Hernandez; Guadalupe USD TA3
  Rodriguez Jr; Santa Maria D1 Mendoza (page: "Celeste") and D4 Barksdale;
  SMJUHSD TA4 Jauregui.
- **Choices use ballot names:** "Alexander Logan Stoeber" → Alexander
  Stoeber; "Anthony Hernandez" → Anthony C. Hernandez; "Christopher
  Lumsdaine" → Christopher G. Lumsdaine; "Hans Holtz" → Hans J. Holtz; "Don
  Wagner", "Herb Morgan" and "Michael Gates" reuse the existing statewide
  choices.
- **Measure H** reuses the existing title (`us/ca/santa-barbara`).
- **New titles:** Carpinteria City Council D1/D3/D5; Montecito Union School
  District Board; Montecito Fire Protection District Board; Montecito
  Sanitary District Board, plus "(Short Term)"; SBCC Area 5; Goleta Water
  District Board, District 2; Isla Vista Recreation and Park District Board;
  Lompoc Valley Medical Center Board; Vandenberg Village Community Services
  District Board; Buellton City Council D1/D4; Solvang Mayor; Solvang City
  Council D3/D4; Santa Ynez Community Services District Board; Los Olivos
  Community Services District Board; Santa Barbara County Board of
  Education, Trustee Area 5/7; Guadalupe Mayor; Guadalupe City Council;
  Guadalupe City Treasurer; Guadalupe Union School District Board, Trustee
  Area 1/3; Santa Maria City Council, District 4; Santa Maria Joint Union High
  School District Board, Trustee Area 5; Santa Maria-Bonita School District
  Board, Trustee Area 1; Santa Maria Public Airport District Board, Division
  4; Orcutt Union School District Board, Trustee Area 5.
- **New measure titles** use the county list's letters (C2026, D2026, E2026,
  F2026, G2026, I2026, J2026) and its official titles. The two Guadalupe
  measures' official titles are just "City of Guadalupe Measure G2026/J2026".
