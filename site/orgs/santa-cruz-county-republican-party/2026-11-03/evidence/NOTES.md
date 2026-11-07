# NOTES — Santa Cruz County Republican Central Committee, Nov 3 2026 general

## Sources

The site's "2026 Election" menu has three pages:

- https://santacruzrepublicans.com/candidates/ : "November 2026 Election —
  Santa Cruz County Republican Central Committee Endorsed Candidates". These
  are photo cards; each shows only "For more information, visit: <Name>".
- https://santacruzrepublicans.com/santa-cruz-gop-voter-guide-2-2/ : "Nov. 3,
  2026 Statewide Propositions", with "Proposition N – Vote NO / Vote YES /
  NEUTRAL".
- https://santacruzrepublicans.com/santa-cruz-gop-voter-guide-2/ :
  "Recommended Local Candidates and Measures".
- Home page (context): "Republicans Must Show Up in 2026" … "Prop 39 must pass."

Windows curl.exe got a 403 from this host; mingw curl worked. Local names
were checked against the Santa Cruz County Elections "Contact Candidates"
page; state and federal names against the SOS list.

## Extracted: 41 positions

- Endorsed candidates (12): Governor Hilton, Superintendent Shaw, Controller
  Morgan, SoS Wagner, Lt. Gov. Romero, Treasurer Hawks, AG Gates; AD 30
  Kessler, AD 28 Pefley, AD 29 Sanchez; CD 19 Verbica, CD 18 Lewis.
- Props (14): No on 1, 2, 3, 4, 5, 37, 40, 44; Yes on 39, 41, 42, 43, 45;
  Prop 38 "NEUTRAL" (`neutral`).
- Recommended local candidates (12, `lean_for`): Capitola council (Welch Jr,
  Clarke, Del Favero), Watsonville D5 Clark, D7 Acosta, PVUSD TA 1 Sukow, TA 4
  Dodge, TA 5 Jiménez, TA 7 Navarro, Soquel Union ESD TA 4 Locke, Scotts
  Valley council Wimp, SLVUSD TA 4 Hopkins.
- Recommended local measures (3, `lean_for`): Santa Cruz County D No and E No;
  Scotts Valley G Yes.

## Skipped

- "Measure M — NO": the Santa Cruz County Local Measures page lists only D, E,
  G and N for Nov 3, 2026, so there is no Measure M to attach this to. It may
  be a measure from a neighbouring county, or a mistake. Omitted.

## Flags for review

- **Tiering:** the party separates "Endorsed" (the statewide and legislative
  candidates page) from "Recommended" (the local page title). Local picks are
  `lean_for` under the round-2b rule. Make them `endorse` if the tiers are
  judged equivalent.
- **Offices on the endorsed-candidates page are inferred.** The cards name
  only the candidate. Each office was assigned from the SOS certified list,
  where each person is a general-election finalist for exactly one office
  covering Santa Cruz County: Kessler AD 30, Pefley AD 28, Sanchez AD 29,
  Verbica CD 19, Lewis CD 18, plus the statewide offices.
- No Insurance Commissioner or BOE pick is shown.
- "Capitol City Council" is read as Capitola City Council: all three names
  are Capitola candidates.
- Name normalisation to the ballot names: "Troy TJ Welsh" → `Troy "TJ" Welch
  Jr`, "Misty Navaro" → "Misty Navarro", "Daniel Dodge Jr." → "Daniel Dodge,
  Jr", "Alicia Jimenez" → "Alicia G Jiménez", "Peter Verbica" → "Peter Coe
  Verbica", "Dennis Sanchez" → "Dennis P. Sanchez".
- INVENTED titles here (beyond those shared with the Santa Cruz Dems and
  MBCLC): `Pajaro Valley Unified School District Board, Trustee Area 4/5`,
  `Soquel Union Elementary School District Board, Trustee Area 4`, `San Lorenzo
  Valley Unified School District Board, Trustee Area 4` (us/ca/santa-cruz-county).
