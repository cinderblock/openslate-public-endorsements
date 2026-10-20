# NOTES — Monterey County Democratic Party, Nov 3 2026 general

## Sources

- https://montereycountydems.org/endorsements/ : "2026 Endorsements" (HTML).
  The MCDCC full committee approved them; the home page says the vote was on
  August 25, 2026.
- https://montereycountydems.org/ : home-page announcement block.
- Ballot names come from the Monterey County Elections candidate list,
  https://www.countyofmonterey.gov/government/departments-a-h/elections/elections/candidate-list
  (parsed copy at `$TEMP/os-dl/G2/rov-monterey/parsed.txt`). Measure letters
  and ballot questions come from
  https://www.countyofmonterey.gov/government/departments-a-h/elections/list-of-local-measures
  (`$TEMP/os-dl/G2/rov-monterey/meas.txt`).

## Extracted: 48 positions

- Congress CD 18 Lofgren, CD 19 Panetta; Assembly AD 29 Rivas, AD 30 Addis.
- Cities: Carmel mayor; Gonzales D1; Greenfield D3; Marina mayor, D1, D4;
  Monterey D1, D2; Pacific Grove mayor, short-term at-large seat, D1; Salinas
  mayor, D2, D3, D5; Seaside mayor and council (2).
- Schools and special districts: Alisal USD TA 2; Salinas UHSD TA 3, 7;
  Hartnell CCD TA 5, 6; MPC TA 1; Monterey County Board of Education TA 1;
  Marina Coast Water District (2).
- Measures (17): Yes on Carmel M and N, J (SMCJUHSD reorganization; listed
  under both Greenfield and King City, entered once), Greenfield O, King City
  P, Monterey S, Pacific Grove R, Salinas G, Soledad-Mission U, Carmel USD I,
  NMCUSD L, PGUSD K, Paso Robles JUSD G-26, County E, North County Rec V. No
  on Salinas H. Marina Q: "Neutral" (`neutral`).

## Skipped

- "We welcome you to also review the California Democratic Party
  endorsements here" links to CADEM's list. Nothing from it is printed on this
  page, so nothing was copied.

## Flags for review

- Names normalised to the ROV ballot names: "Dr. Kim Barber" → "Kim Barber",
  "Alec Manas" → "Alec M Manas", "David Godoy" → "David H. Godoy", "Daniel
  Munoz" → "Daniel Muñoz", "Ian Oglesby" → "Ian N. Oglesby", "Rosalie
  Sanchez" → "Rosalie C. Sanchez", "Lori McDonell" → "Lori McDonnell",
  "Athena Burciaga" → "Athena Rita Burciaga". The existing run-for-something
  bundle uses "Athena Burciaga" for Marina D4; reconcile when collating.
- Pacific Grove "City Council, at large: Lori McDonell": the ROV lists Lori
  McDonnell under "CITY OF PACIFIC GROVE Member, City Council, 2 Year". It is
  titled `Pacific Grove City Council (Short Term)`.
- Measure short titles are INVENTED from the ROV ballot-question lead phrase
  (the county list has no separate short titles). These titles are shared
  with monterey-bay-central-labor-council via the same generator. Check them:
  `Carmel Unified School District — Measure I (Carmel Unified School District Bond)`,
  `North Monterey County Unified School District — Measure L (North Monterey County Unified School District Bond)`,
  `Pacific Grove Unified School District — Measure K (Pacific Grove Unified School District Parcel Tax)`,
  `Paso Robles Joint Unified School District — Measure G-26 (Paso Robles Joint Unified School District Bond)`,
  `South Monterey County Joint Union High School District — Measure J (Reorganization of School Districts)`,
  `Monterey County — Measure E (Transient Occupancy Tax Increase)`,
  `Carmel-by-the-Sea — Measure N (Transactions and Use Tax Increase)`,
  `Carmel-by-the-Sea — Measure M (Transient Occupancy Tax)`,
  `Greenfield — Measure O (Continuing the City of Greenfield Transactions and Use Tax)`,
  `King City — Measure P (King City Public Safety, Local Services Measure)`,
  `Marina — Measure Q (Marina 911 Emergency, Public Safety, and Community Services Measure)`,
  `Monterey — Measure S (Continuation of Street Infrastructure Rehabilitation Tax)`,
  `Pacific Grove — Measure R (Preserving General Services Measure)`,
  `Salinas — Measure H (Ordinance No. 2687, Repealing Rental Registration, Rent Stabilization, Tenant Protection and Tenant Anti-Harassment Ordinances)`,
  `Salinas — Measure G (Renewal of Measure G Sales Tax)`,
  `North County Recreation and Park District — Measure V (Parcel Tax)`,
  `Soledad-Mission Recreation District — Measure U (Soledad Rec Affordable Recreation Measure)`.
  County-level, school and special-district measures use us/ca/monterey-county.
- All race titles are INVENTED except `Marina City Council, District 4`. City
  jurisdictions used: us/ca/carmel-by-the-sea, gonzales, greenfield, marina,
  monterey, pacific-grove, salinas, seaside, king-city. Note that us/ca/monterey
  (the city) is not us/ca/monterey-county.
