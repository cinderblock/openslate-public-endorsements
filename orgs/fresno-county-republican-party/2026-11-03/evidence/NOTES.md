# NOTES — Republican Party of Fresno County, Nov 3 2026 general

## Sources

- https://www.fresnogop.org/endorsements (HTML, Wix site, scraped). Heading
  "Official Republican Voter Guide for Fresno County / California Midterm
  Election, Nov. 3rd, 2026". Candidate cards marked "ENDORSED", then
  "Propositions:" / "Measures:" lists, then "RECOMMENDATIONS:" for Superior
  Court, then a repeat of the candidate list by office.
- Cross-check (not cited): the "Download Voter Guide" PDF,
  https://www.fresnogop.org/_files/ugd/222f2a_991da0a8ec8942399786bbd239874b10.pdf.
  Its text layer is garbled (doubled characters) but matches the HTML page,
  including Prop 41 No, Prop 42 No and Prop 45 No.
- Measure letters and titles: the Fresno County Registrar's November 3 2026
  election page (fetched with WebFetch; curl got 403):
  https://www.fresnocountyca.gov/Departments/County-ClerkRegistrar-of-Voters/Elections/Election-Information/2026/November-3-2026-Consolidated-Statewide-General-Election
  A Fresno County TOT, O Orange Cove parcel tax, J Coalinga sales tax,
  H Sierra Kings Health Care District hospital lease, F Firebaugh parcel tax,
  T Fowler sales tax, B Sanger TOT, D City of Fresno sales tax, S Fresno
  County Transportation Improvement Act.

## Extracted: 43 positions

- Statewide: 6 (Governor, Lt. Gov, SoS, AG, Controller, Treasurer). No
  SPI, Insurance Commissioner or BOE pick on the page.
- Federal: CD 5, 13, 18, 20, 21, 22 (6).
- Legislature: SD 12, 14, 16; AD 8, 27, 31, 33 (7).
- Propositions: all 14.
- Local measures: 9 (H Yes, the rest No).
- Superior Court Office No. 6: Ashley S. Paulson, as `lean_for`, because it
  is listed under "RECOMMENDATIONS:" rather than "ENDORSED".

## Review flags

- **Unusual prop picks.** The page says "Proposition 41: No", "Proposition
  42: No" and "Proposition 45: No", unlike most Republican groups (CAGOP and
  the Sacramento GOP say Yes on all three). The PDF guide says the same.
  Recorded as published. Possibly a page error; worth a second look.
- **Ballot names.** Choices use the SOS certified-list spelling (e.g. "David
  G. Valadao", "Darin S. DuPont", "Guillermo Asuncion Gonzalez", "David
  Jariustokaeutulelei Tangipa", "Alexandra (Ali) Macedo"); statements quote
  the page spelling.
- **Top-two.** All state and federal picks are on the SOS certified general
  list. Superior Court Office No. 6 (Paulson vs. Steven R. Ueltzen) is on
  the county's November contest list.
- **New titles** follow "<City> — Measure X (<official title>)" and
  "<District> — Measure X (...)". Jurisdictions: `us/ca/fresno-county` for
  county and special-district measures; city slugs for city measures.
  "Fresno County Superior Court Judge, Office No. 6" is new.
