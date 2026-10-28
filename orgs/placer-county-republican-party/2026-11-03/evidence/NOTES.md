# NOTES — Placer County Republican Party, Nov 3 2026 general

## Sources

- https://placergop.org/endorsements/ : "OUR ENDORSEMENTS — November 3rd
  2026" (HTML). Primary source for every candidate, prop and measure position.
- https://placergop.org/wp-content/uploads/PlacerGOP2026-VoterGuide.pdf :
  "2026 OFFICIAL PLACER COUNTY REPUBLICAN PARTY ENDORSEMENTS" (2-page PDF). It
  matches the HTML except that it lacks the Center Joint TA2 pick, so it
  looks slightly older. Kept as evidence only.
- https://placergop.org/wp-content/uploads/Judges2026.jpeg : the image under
  the page's "Judges Recommendations" heading, "CONSERVATIVE JUDICIAL
  RECOMMENDATIONS NOVEMBER 3, 2026". Transcribed, so `mode` is `transcribed`.
- State and federal spelling comes from the SOS certified list. The judicial
  names come from the SOS list's Third Appellate District retention questions.

## Extracted: 93 positions

- Congress: CD 3 Tucker, CD 6 Kiley. Statewide (8): Hilton, Romero, Shaw,
  Grove (BOE), Wagner, Morgan, Hawks, Gates. Legislature: SD 4 Duarte, SD 6
  Niello, AD 1 Hadwick, AD 3 Belza, AD 5 Patterson.
- Local candidates (46) across school boards, city and town councils, and
  utility districts.
- Props (14): No on 1, 2, 3, 4, 5, 37, 38, 40, 44; Yes on 39, 41, 42, 43, 45.
- Local measures (10): "Oppose" (C, E, F, P) is encoded as `endorse` + "No".
  "Neutral" (A, B, D, G, H, I) is encoded as `neutral`.
- Judicial retention (9): Supreme Court Evans No, Groban No. Third District:
  Earl Yes, Damrell No, Sapp No, Boulware Eurie Yes, Renner Yes, Feinberg No,
  Mesiwala No.

## Flags for review

- **Local names and measure titles were NOT verified against the registrar.**
  Placer County Elections (placerelections.gov) refused the connection from
  curl. An earlier agent also got 403 there (needs browser). Local `choice`
  values are as printed by the party, e.g. "Mendi Chadwich" (possibly
  "Chadwick" on the ballot) and "Dereck Counter".
- Measure titles are letter-only placeholders (except the existing Rocklin C
  and South Placer Fire B titles): `Roseville — Measure A`, `Rocklin Unified
  School District — Measure D` (the party wrote "Rocklin School District"),
  `Lincoln — Measure F`,
  `Placer County — Measure G`, `Placer County — Measure H`, `Colfax — Measure I`,
  `Tahoe Truckee Unified School District — Measure P` (placed in
  us/ca/placer-county; the district also covers Nevada County). Add the
  registrar short titles.
- Center Joint Unified School District spans Sacramento and Placer counties.
  The existing sacramento-county titles are reused: `Center Joint Unified
  School District — Measure E (School Facilities Bond)` and `Center Joint
  Unified School District Board, Area 1` (us/ca/sacramento-county). `..., Area
  2` is INVENTED in the same jurisdiction.
- Other INVENTED titles (us/ca/placer-county unless noted): Colfax School District Board
  of Trustees; Dry Creek Joint Elementary School District Board, Area 5;
  Loomis Union School District Board, Area 3 / Area 4; Newcastle Elementary
  School District Board of Trustees; Placer Union High School District Board,
  Area 2 / Area 4; Rocklin Unified School District Board, Area 4; Roseville
  City School District Board, Area 2 / Area 3; Sierra Joint Community College
  District Board, Area 2; Foresthill Public Utility District Board; Nevada
  Irrigation District Board, Division 4; Placer County Water Agency Board,
  Division 1; Lincoln City Council, District 1 / District 2 (us/ca/lincoln);
  Loomis Town Council (us/ca/loomis); and the seven `California Court of
  Appeal, Third District — Retain Justice <Name>` titles (us/ca/coa-3).
- The judicial graphic carries no Placer GOP branding. It is headed
  "Conservative Judicial Recommendations" and may come from another group's
  slate. It sits under the party's own "Judges Recommendations" heading on the
  endorsements page, so it is included; drop or reattribute those 9 positions
  if it turns out to be a republished third-party list.
- The statewide slate matches the CAGOP's picks, but the page presents it as
  the county party's own endorsements, so it is kept.

## Refresh 2026-10-28: measure titles from the county's list

The seven letter-only placeholder titles now say what each measure does, written from
the questions in Placer County Elections' "Measures to Appear on Ballot" (saved as
`placer-measures-to-appear-on-ballot-2026-10-28.md`; the county publishes no short
titles): Roseville A (City Council Compensation Charter Amendment), Rocklin USD D (School
Facilities Bond, $288M), Lincoln F (One-Cent Sales Tax for City Services), Placer County
G (Charter Amendment: Board of Supervisors Vacancies), Placer County H (Charter
Amendment: County Executive Officer Removal), Colfax I (Streets and Infrastructure Sales
Tax), Tahoe Truckee USD P (School Parcel Tax Renewal). No other bundle used those
subjects. The party's picks are unchanged. placerelections.gov returned a browser error
page on 2026-10-28; the list is on placercountyelections.gov.
