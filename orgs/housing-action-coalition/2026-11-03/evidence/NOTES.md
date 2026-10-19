# NOTES — Housing Action Coalition (HAC), Nov 3 2026 general

## Sources

- https://housingactioncoalition.org/2026-endorsements (HTML, scraped),
  "2026 HAC Endorsements": "HAC's C4 Board is proud to announce our
  latest round of pro-housing endorsements ahead of the November
  election." This is the complete current list (state props, statewide,
  legislature, and local picks across the state).
- Also read (not cited): https://housingactioncoalition.org/news/nov-2026-endorsements
  (Aug 12 news post). It carries the June primary list plus the first
  November additions. Every November candidate it names is on the
  2026-endorsements page.

## Context jurisdiction

`context.jurisdiction` is `us/ca`, not `us/ca/sf`. HAC is headquartered in
SF but now endorses statewide (35 legislative seats and local races in LA,
Orange, Santa Clara, San Mateo, Alameda and Contra Costa counties). The
coordinator's assignment said `us/ca/sf`; switch it back if you prefer the
SF framing.

## Extracted: 105 positions

- 92 races:
  - Governor (Becerra) and Insurance Commissioner (Ben Allen).
  - CD 11 Wiener.
  - State Senate: SD 24 Erickson, SD 26 Hernandez, SD 28 Smallwood-Cuevas,
    SD 38 Blakespear.
  - State Assembly, 32 seats: AD 4, 5, 9, 11, 12, 14, 15, 17, 18, 19, 23,
    24, 25, 26, 28, 29, 40, 41, 43, 44, 46, 49, 50, 52, 54, 55, 57, 60, 61,
    71, 78, 80.
  - SF: Assessor-Recorder Torres; Supervisors D2 Sherrill, D6 Dorsey, D10
    Ellington; Board of Education Phil Kim, Autumn Brown Garibay, Tim Tung.
  - LA County: LA Mayor Raman, LA City Attorney Roy, LA CD 9 Ugarte, Culver
    City (2), Burbank (3), West Hollywood (3), Pomona D2, Monterey Park.
  - Orange: Huntington Beach (2).
  - Santa Clara: Los Gatos, Cupertino (3), Sunnyvale D5, Mountain View,
    Palo Alto.
  - San Mateo: County Supervisor D5 (short term) Nagales, San Mateo D3 and
    D5, Redwood City D2, Foster City D1, San Bruno D4, South SF D1.
  - Alameda: Oakland Mayor Lee, Oakland D2 and D4, Berkeley D1 (ranked
    Wrubel #1 weight 1, Bernet #2 weight 0.5), D4 and D8, Alameda Mayor and
    Council, Emeryville, Albany (ranked Tiedemann #1 weight 1, López #2
    weight 0.5), AC Transit Ward 3, BART D4.
  - Contra Costa: CCCD Ward 1, El Cerrito, Walnut Creek.
- 13 measures:
  - State: Yes on 1 and 45, No on 40 and 43.
  - Regional Transit Measure: Yes.
  - SF: Yes on C, No on I.
  - LA City: Yes on TE and PL.
  - Los Altos D: No. Menlo Park P: No. Half Moon Bay Q: Yes. Walnut Creek
    U: Yes.

"Support" → Yes and "Oppose" → No (stance `endorse`). Candidate listings
→ `endorse` ("We're proud to support their campaigns").

## Dropped (not on the November ballot)

- **Joaquin Arambula, "Assembly District 31".** He is not on the SOS
  Certified List of Candidates (8/27/2026,
  https://elections.cdn.sos.ca.gov/statewide-elections/2026-general/cert-list-candidates.pdf).
  AD 31's finalists are Annalisa Perea and Jim Polsgrove.
- **Anthony Tordillos, San Jose City Council D3.** The seat was decided in
  June: the Santa Clara County Democratic Party guide lists "District 3,
  unopposed" in its June 2 primary section, and no other bundle has a
  November D3 contest.
- **Rohan Marfatia, Alameda County Board of Supervisors D2.** He finished
  third in June; incumbent Elisa Marquez won outright with about 67%
  (Local News Matters, 2026-06-02,
  https://localnewsmatters.org/2026/06/02/elisa-marquez-cruising-to-another-term-on-alameda-county-board-of-supervisors/).

Every other state and federal endorsee was checked against the SOS
certified list. SF picks were checked against the SF Department of
Elections qualified list.

## Titles

Existing titles and jurisdictions were reused wherever possible, including
"San Mateo County Board of Supervisors, District 5 (Short Term)" for
Nagales (HAC writes "District 5"; the county's filing notice lists the seat
as "District 5 (Short Term)").

New titles (no existing match):
- `Alameda Mayor` and `Alameda City Council` (`us/ca/city-of-alameda`).
  These follow the existing `Alameda — Measure L` jurisdiction for the city.
- `BART Board of Directors, District 4` (`us/ca/bart-4`), following
  `us/ca/bart-8`.
- `Walnut Creek — Measure U (Walnut Creek Senior Housing Transit Village Initiative)`
  (`us/ca/walnut-creek`). The letter "U" comes from HAC's page; the name
  comes from city council coverage (contracosta.news, July 2026). Confirm
  it against the Contra Costa registrar's measure list.

## Review flags

- **Names.** Choices use HAC's spellings, except "Robert A. Rivas" →
  "Robert Rivas" and "Joaquín Torres" → "Joaquin Torres", to match other
  bundles. `normalize-choices.ts` should reconcile middle-name variants
  (e.g. "Seema Lindskog" vs "Seema Sharma Lindskog", "Phoebe Venkat" vs
  "Phoebe Shin Venkat", "Aysha Pamukcu", "Thomas Aujero Small", "Robin
  López").
- **Districts.** The June news post listed Harabedian as AD 39 and Celeste
  Rodriguez as AD 41. The 2026-endorsements page has AD 41 and AD 43,
  which match the SOS list; the page's numbers were used.
- **Pomona D2 and Monterey Park.** I did not check these November-only
  races against the LA County registrar's list.
