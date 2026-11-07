# NOTES — Sierra Club San Diego Chapter, Nov 3 2026 general

## Sources

- https://sandiegosierraclub.org/news/endorsed-candidates (HTML, scraped).
  It has one profile per endorsed candidate, each with a "Position:" line
  naming the office. The chapter home page says "The Sierra Club has
  endorsed 31 candidates in San Diego County this election season" under
  the heading "Election Day is November 3rd". The profiles page lists
  exactly 31 candidates.
- https://sandiegosierraclub.org/no-on-45 ("Help us Defeat Prop 45",
  signed by the Chapter Executive Committee): "Together, we say NO ON PROP
  45."
- The chapter's pages on sierraclub.org (/san-diego/...) loop on a bot
  redirect, so they were not usable. The chapter publishes on its own
  domain instead.

## Extracted: 32 positions

- 31 candidates:
  - Congress: CD 49 Levin, CD 48 von Wilpert.
  - Legislature: SD 38 Blakespear, AD 77 Boerner.
  - County Supervisor D5: Krahel.
  - San Diego City Council: D2 Crosby, D4 Abraham, D8 Antonio Martinez.
  - Del Mar council: two seats.
  - Encinitas: mayor, council D3 and D4, and three Union School District
    trustees.
  - San Dieguito Union High School District: Areas 3 and 5.
  - Solana Beach council: D3 and D4.
  - Carlsbad Unified School District: two trustees.
  - Oceanside: council D1 and D2, and Unified School District Area 3.
  - Vista: council D1, council (district not stated), and mayor.
  - Poway: mayor and council D3.
  - Helix Water District: Division 2.
- 1 measure: Prop 45, No.

## Top-two check for the races that had a June 2 primary

- **SD City Council D4.** Martha Abraham advanced. The City Clerk's
  election history (updated 6/21/2026) shows Foster 40.73% and Abraham
  40.67%, with Dang third at 18.6%:
  https://www.sandiego.gov/sites/default/files/2026-07/city-of-san-diego-election-history-district-4.pdf
- **SD City Council D2.** Nicole Crosby was second, 33.72% vs. Bailey's
  34.84%.
- **SD City Council D8.** Antonio Martinez was first at 28.07%.
- **County Supervisor D5.** Kyle Krahel was second, behind Rebecca Jones,
  per KPBS, Times of San Diego and Axios coverage of the Nov runoff.
- **CD 48** (von Wilpert vs. Desmond), **CD 49** (Levin), **SD 38**
  (Blakespear) and **AD 77** (Boerner) are all in the November general. The
  CA Labor Federation's post-primary list also endorses all four.
- The other city, school and water races are November-only elections.

## Judgment calls / review flags

- **New titles.** No existing bundle had titles for most of these local
  races, so I made them up following the June patterns: "<City> City
  Council, District N", "<City> Mayor", "<District> Board, Area N".
  Jurisdictions use city slugs (`us/ca/encinitas`, `us/ca/oceanside`, ...)
  plus `us/ca/san-dieguito-uhsd` and `us/ca/helix-water-district`.
  San Diego city and county races use `us/ca/san-diego`, per the June
  convention.
- **Seats not stated.** No trustee area is given for the three Encinitas
  Union School District candidates (Cocayne, Shen, Hargrave) or for Michele
  Tsutagawa Ward (Carlsbad USD). No district is given for Dan O'Donnell
  (Vista City Council). These use the seat-less titles "Encinitas Union
  School District Board of Trustees", "Carlsbad Unified School District
  Board of Trustees" and "Vista City Council". If any of them are actually
  area-based seats, retitle them.
- **Name normalization.** Honorifics and credentials were dropped from
  choices: "Senator Catherine Blakespear", "Dr. Joey Pearson" and "Andrea
  Beth Damsky, L.Ac.". The original listing is in each statement.
- No other state propositions appear on the chapter's site. For the
  statewide Sierra Club positions, see the sierra-club-california bundle.
