# NOTES — Inland Empire Labor Council, AFL-CIO, Nov 3 2026 general

## Sources

- https://ielabor.org/cope/2026generalendorsements/ ("November 2026 Union
  Voter Guide"; HTML, scraped). The one embedded image
  (`2026-Vote-with-IE-Labor-24.png`) is a decorative "The Official Labor
  Voter Guide" title card with no endorsements.
- `context.jurisdiction` is `us/ca/san-bernardino-county`. The council
  covers both Riverside and San Bernardino counties; San Bernardino was
  picked as the primary county. Its Riverside County picks use Riverside
  jurisdictions.

## Extracted: 74 positions

- Statewide: 11 (Governor, Lt. Governor, SoS, AG, Controller, Treasurer,
  Superintendent, BOE Districts 1–4). No Insurance Commissioner pick.
- Congress: 5 (CD 25, 33, 35, 39, 48). State Senate: 1 (SD 32).
  Assembly: 9 (AD 36, 45, 47, 50, 53, 58, 60, 63, 71). AD 63 is Kevin
  Akin (Peace and Freedom), against Republican incumbent Natasha Johnson.
- Riverside County local: 23. San Bernardino County local: 11.
- Propositions: 14. Support 1, 2, 3, 4, 5, 37, 40, 44; Oppose 39, 41, 42,
  43, 45 (encoded `endorse` + "No"); Prop 38 "No Recommendation" (encoded
  `neutral`, no choice).

## Skipped

- **Kelvin Moore, "West Valley Water District Board of Directors Area 2".**
  The San Bernardino County ROV's Nov 3 candidate list (Report_CandidateList.pdf,
  updated 9/29/2026) has no West Valley Water District contest, and the ROV
  lists West Valley Water District under "Change of Election Dates". Not on
  this ballot, so omitted.

## Top-two / ballot checks

- State and federal picks are all on the SOS certified list (8/27/2026).
- Riverside Ward 2 (Gracie Torres) and Ward 4 (Rich Vandenberg) are both in
  the Nov 3 runoffs (Raincross Gazette June results: Ward 2 Torres 38% /
  Ayra 35%; Ward 4 Conder ~46–48% / Vandenberg ~29%).
- Every San Bernardino County local pick was found on the SB ROV candidate
  list: https://uploads.rov.sbcounty.gov/ROV/Elections/2026/1103/Report_CandidateList.pdf
- Moreno Valley picks are on the city clerk's qualified-candidate tracker.
- Other Riverside County local picks could not be checked: voteinfo.net
  (Riverside ROV) returns HTTP 403.

## Judgment calls / review flags

- **Ward vs. District.** The page says "San Bernardino ... City Council
  District 2/4"; San Bernardino elects by ward, and the ROV list has
  "Member, City Council Ward 2/4". Titles use Ward.
- **Seat added from the ballot list.** "Victorville City Council" (Derek
  Marshall) → District 4, and "Chino Valley School Board District 3"
  (Frank Gerdine) → Trustee Area 3, per the SB ROV list. "Nuview Union
  School District Board of Education" (Abel Chavez) → Trustee Area 3, per
  the Riverside County Democratic Party's guide (Riverside list not
  reachable). "Eastern Municipal Water District ... Area 5" → Division 5.
- **Spellings normalized to the ballot / other sources:** "Liza Arrellano"
  → Liza Arellano (Moreno Valley clerk list); "Jose Luiz Godinez" → Jose
  Luis Godinez (as on the RCDP guide; unverified); "Joseph Salas" → Joe Salas
  (SB ROV ballot name); "Dejonaé Shaw" → DeJonae Shaw (ballot: DEJONAE
  MARIE SHAW); "Luz Pérez" → Luz Perez (ballot); "Marni Von Wilpert" →
  Marni von Wilpert; "Ida Obeso Martinez" → Ida Obeso-Martinez; "Dr."
  dropped from Tiffanie Tate.
- **Kept as printed:** "Jonathan Polly" (Palm Desert D4). The RCDP guide
  spells it "Jonathon Polly"; one of them is wrong.
- "David Starr Rabb" (Perris D3) is the same person RCDP lists as "David
  Rabb".
- Invented local titles are shared with the riverside-county-democratic-party
  and san-bernardino-county-democratic-party bundles.

## Refresh 2026-10-30

Re-fetched https://ielabor.org/cope/2026generalendorsements/ on 2026-10-30 9:48 AM PDT (16:48Z). Evidence: `ielabor-2026-general-endorsements-2026-10-30.md`. One addition:
**Insurance Commissioner: Jane Kim** (the 10-19 page had no pick). Everything else matches; Kelvin Moore
(West Valley Water) stays skipped.
