# NOTES — Santa Barbara County Democratic Party, Nov 3 2026 general

## Sources

- https://www.sbdems.org/endorsements (HTML, scraped).
  https://www.sbdems.org/vote, the URL the party's social posts point to,
  serves the same page. The page is headed "November 3, 2026 / Midterm
  Election". It has three tabs: "Candidates" (cards with name and office),
  "Measures/Props", and "Federal/State". The "Federal/State" tab is only a
  link to the California Democratic Party's PDF.
- Ballot status was checked against the Santa Barbara County Elections lists:
  cities on the ballot (9/4/2026), schools and special districts on the
  ballot, schools and special districts off the ballot (8/17/2026), and the
  local measures list "Measures List_Website"
  (https://content.civicplus.com/api/assets/f42bb310-dc5a-4c3b-a2c6-e1f3bc8ab648).
  Supervisor D5 is a November runoff, Valencia vs. Aguilera, per certified
  June results coverage (Santa Barbara News-Press, 6/30/2026). CD 24 and AD 37
  are on the SoS certified list.

## Extracted: 49 positions (all `endorse`)

- 31 candidates:
  - Federal and state: CD 24 Carbajal and AD 37 Hart. Both are on the party's
    own candidate cards, not just the linked CDP PDF.
  - County: Supervisor D5 Valencia; County Board of Education TA 5 Frost.
  - Cities: Buellton (mayor, D1, D4), Carpinteria (D1, D3), Goleta (D1, D2),
    Guadalupe mayor, Lompoc (mayor, D2, D3), Santa Barbara (mayor, D4, D5,
    D6), Santa Maria (D1 short term, D3).
  - Schools and districts: Goleta Water D2; Isla Vista Recreation and Park
    District (two candidates); Montecito Union SD; SBCC Areas 5 and 7; SBUSD
    Areas 1 and 4; Santa Maria Public Airport Division 4; Santa Maria-Bonita
    SD Area 1.
- 4 local measures, all Yes: Santa Maria C2026, Allan Hancock H, Santa Ynez
  Valley UHSD D2026, and Isla Vista CSD E2026.
- 14 state propositions: Yes on 1, 2, 3, 4, 5, 37, 38 and 40; No on 39, 41,
  42, 43, 44 and 45.

## Republished from California Democratic Party

- The "Federal/State" tab links to
  https://cadem.org/wp-content/uploads/2026/08/8.5.26-FINAL-2026-General-Election-Endorsements.pdf
  (the CDP's 2026 general election endorsements: statewide offices, Congress,
  Legislature). Those picks are in the `ca-democratic-party` bundle and are
  not copied here.
- Note: the party's proposition positions match the CDP's exactly. They are
  presented on the party's own page with its own descriptions, though, so
  they are kept as this party's positions. A reviewer may prefer to treat
  them as republished.

## Skipped: endorsed, but the contest is not on the ballot

All of these are on the county "Contests Not on Ballot" list (uncontested,
appointed in lieu of election):
- Buellton Union SD Area 3, Elaine Alvarado.
- Goleta Union SD Areas 1, 3 and 5: Eric Bowers, Emily Zacarias, Ethan
  Bertrand.
- Lompoc USD Area 4, Brenda Villa.
- SBCC Area 1, Charlotte Gullap-Moore; SBCC Area 6, Jonathan Abboud.
- Santa Maria Joint Union HSD Area 2, Feliciano Aguilar.
- Solvang SD Area 2, MaryEllen Rehse.

## Review flags

- **Choices use ballot names.** "William Silvola" is on the ballot as Billy
  Silvola, "Judith A. Frost" as Judy Frost, "Amy Miller" as Amy Marie Miller,
  "Jacqui Inda" as Jacqueline "Inda" Karlsen, "Danny Mogg" as Danny K. Mogg,
  and "Dominique Lujan" as Dominique Luján. Existing choices are reused for
  "Kristen W. Sneddon", "Luz Reyes-Martín" and "Ian Baucke".
- **Isla Vista Recreation and Park District.** Two candidates are endorsed
  for the at-large board. The county list doesn't give a vote-for number for
  this contest.
- **Jurisdictions.** Existing Santa Barbara titles are reused byte for byte.
  Supervisor D5, SBCC and SBUSD use `us/ca/santa-barbara`, as the existing
  bundles do. New county-level and district titles use
  `us/ca/santa-barbara-county`.
- **New titles:** "Buellton City Council, District 1/4", "Carpinteria City
  Council, District 1/3", "Santa Barbara County Board of Education, Trustee
  Area 5", "Goleta Water District Board, District 2", "Guadalupe Mayor",
  "Isla Vista Recreation and Park District Board", "Montecito Union School
  District Board", "Santa Barbara Community College District Board, Area 5"
  (matches the existing Area 7 title), "Santa Maria Public Airport District
  Board, Division 4", and "Santa Maria-Bonita School District Board, Trustee
  Area 1".
- **New measure titles** use the county list's letters (with the "2026"
  suffix) and titles: "Santa Maria — Measure C2026 (City Of Santa Maria
  General Services)", "Santa Ynez Valley Union High School District — Measure
  D2026 (Santa Ynez Valley Union High School Quality Education/Career Training
  Measure)", and "Isla Vista Community Services District — Measure E2026
  (Increased Isla Vista Municipal Infrastructure and Services)". Measure H
  reuses the existing title "Allan Hancock Joint Community College District —
  Measure H (Education and Economic Development Bond)" (`us/ca/santa-barbara`).
  The county's title for it is "Allan Hancock Joint Community College District
  Affordable Higher Education". On 2026-10-27 the catalog title became
  "Allan Hancock Joint Community College District — Measure H (Affordable
  Higher Education Bond)", after the county's, in every bundle that names it.
