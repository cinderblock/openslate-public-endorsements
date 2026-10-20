# NOTES — Central Coast Labor Council, Nov 3 2026 general

## Sources

- https://www.centralcoastlabor.org/2026-endorsements (HTML, scraped). The
  page heading is "2026 Central Coast Labor Council Midterm Election
  Endorsements", and it says "The following endorsements listed are for the
  November 3, 2026 Midterm General Election."
- This council is the former **Tri-Counties Central Labor Council**. The
  AFL-CIO page https://unionhall.aflcio.org/tricountiesclc (which redirects to
  /tricountiesclc/news/welcome-central-coast-labor-council) is titled "Central
  Coast Labor Council". The old domains tricountieslabor.org (DNS failure) and
  tricountiesclc.org (connection timeout) don't respond. The slug follows the
  current name.
- Ballot-status checks:
  - San Luis Obispo County: the Nov 3 zero report (lists every contest and
    candidate on the ballot), https://www.slocounty.ca.gov/departments/clerk-recorder/forms-documents/elections-and-voting/current-elections/2026-11-03/reports-and-results/2026-general-zero-report
  - Santa Barbara County: the CivicPlus contest/candidate lists for cities on
    the ballot (9/4), schools on the ballot, and schools and special districts
    off the ballot (8/17), plus the "Measures List_Website" document
    (https://content.civicplus.com/api/assets/f42bb310-dc5a-4c3b-a2c6-e1f3bc8ab648).
  - Ventura County: only the off-ballot list could be fetched,
    https://clerkrecorder.venturacounty.gov/wp-content/uploads/2026/06/cfmcfmr001_contcanddataproof_08-17-2026-off-ballot.pdf,
    plus https://clerkrecorder.venturacounty.gov/2026-measures/. The on-ballot
    candidate list was not found.

## Extracted: 77 positions (all `endorse`)

- San Luis Obispo County: 19 candidates and Measure G-26 (Paso Robles JUSD
  bond), Yes.
- Santa Barbara County: 15 candidates, plus Santa Maria Measure C2026 and
  Allan Hancock Measure H, both Yes.
- Ventura County: 37 candidates, plus Santa Paula USD Measure C, United Water
  Measure D and Oxnard Measure E, all Yes.

## Republished from California Labor Federation

The page says "Statewide endorsements are determined by a statewide council of
labor leaders." These match the `ca-labor-federation` bundle and are not
copied into positions.json. Source: https://www.centralcoastlabor.org/2026-endorsements

- Governor: Xavier Becerra. Lt. Governor: Fiona Ma. Secretary of State:
  Shirley Weber. Attorney General: Rob Bonta. Controller: Malia Cohen.
  Treasurer: Eleni Kounalakis. Insurance Commissioner: Jane Kim.
  Superintendent of Public Instruction: Richard Barrera. Board of
  Equalization D2: Sally Lieber.
- US House: CD 19 Jimmy Panetta, CD 24 Salud Carbajal, CD 26 Jacqui Irwin,
  CD 32 Brad Sherman.
- Assembly: AD 30 Dawn Addis, AD 37 Gregg Hart, AD 38 Steve Bennett, AD 42
  Deborah Klein Lopez, AD 46 Jesse Gabriel.
- "Statewide Ballot Measures" (SUPPORT/OPPOSE): Yes on 1, 2, 3, 4, 5, 37, 40
  and 44, No on 39, 41, 42, 43 and 45. Prop 38 isn't listed. These are the
  Labor Fed's positions exactly, Prop 38 gap included, so they are treated as
  republished too, even though they sit under a separate heading.

## Skipped: listed, but the contest is not on the ballot

All of these are on the county "Contests Not on Ballot" lists, meaning they
were uncontested and appointed in lieu of election:
- Ventura County CCD Trustee Area 1, Josh Chancer.
- Ojai USD Trustee Area 3, Atticus Reyes.
- Oxnard Union HSD: Trustee Area 2, Linda Baker Torres; Armando Piña (the
  page says "Trustee Area 4", but the county lists him in Trustee Area 3);
  Trustee Area 4, Genevieve Flores-Haro.
- Ventura USD Area 1, James Forsythe.
- Santa Maria Public Airport District, Patrick Youngern (Division 2, not on
  the ballot).

## Review flags

- **San Luis Obispo City Council is vote-for-1** on the zero report, but the
  council lists two candidates, Emily Francis and Michelle Shoresman. Both
  are encoded as `endorse`, like a dual endorsement.
- **Ventura names weren't checked against the registrar**, since the on-ballot
  list is unavailable. Spellings reuse the existing choices in other bundles
  where the person matches: "Jeannette Sanchez-Palacios" (page says "Jeanette
  Sanchez-Palacio"), "Jenny Crosswhite" (page: "Jenny Marie Crosswhite"),
  "Pedro A. Chavez" (page: "Pedro Chavez"), "Gabe Teran" and "Gabriela
  Basua". Ventura County Superintendent of Schools: Sher vs. Marschner is the
  November runoff, per June results coverage (EdSource, KCLU).
- **SLO and SB choices use the ballot name**: Glenn T. Martin, Colleen Martin
  (page: "Coleen"), Robert Simoni (page: "Bob"), Erica A. Stewart, Jacqueline
  "Inda" Karlsen (page: "Jacqueline Inda"), and Ricardo "Richard" Batalla.
  "Luz Reyes-Martín" and "Ian Baucke" reuse the existing choices.
- **Existing titles reused**: Ventura VCCCD seats are "District 2" and
  "District 5" (the page says "Area 2" and "Trustee District 5"). Measure H
  reuses the existing `us/ca/santa-barbara` title.
- **New titles** (SLO County; all November-only contests): "Arroyo Grande
  Mayor", "Atascadero City Council", "Grover Beach Mayor", "Grover Beach City
  Council, District 2", "Paso Robles City Council, District 1/2" (the
  official city name is El Paso de Robles; slug `us/ca/paso-robles`),
  "Pismo Beach Mayor", "San Luis Obispo Mayor", "San Luis Obispo City
  Council", "San Luis Obispo County Community College District Board, Trustee
  Area 4" (Cuesta College), "Lucia Mar Unified School District Board, Trustee
  Area 3/5/6/7", "Paso Robles Joint Unified School District Board, Trustee
  Area 1/4", "San Luis Coastal Unified School District Board, Trustee Area 2",
  and "Paso Robles Joint Unified School District — Measure G-26 (Paso Robles
  Joint Unified School District Bond Measure)". New SB County titles:
  "Buellton City Council, District 1/4" and "Santa Maria — Measure C2026
  (City Of Santa Maria General Services)", which uses the county list's
  letter "C2026" and title.
- `context.jurisdiction` is `us/ca` because the council covers three counties.
