# NOTES — San Mateo County Central Labor Council, Nov 3 2026 general

## Sources

- https://www.sanmateolaborcouncil.org/endorsements (HTML): "San Mateo Labor
  Council Endorsements — 2026 GENERAL Election", with three linked Word
  documents. The page says "*If a race or measure is not listed below, it is
  because the Labor Council took no position".
- The three .docx files (state & federal, slate card, ballot measures),
  downloaded and converted to text with pandoc. Each position's `source` is
  the .docx it came from. Because the positions come from documents rather
  than HTML, `attribution.mode` is `transcribed`.
- Contest names, ballot names and measure letters were checked against the
  San Mateo County ACRE roster of candidates
  (https://smcacre.gov/system/files/2026-09/52_candidateroster0903.pdf) and the
  ACRE measure list (https://smcacre.gov/elections/november-3-2026-statewide-general-election).

## Extracted: 80 positions

- State & federal (25): CD 15 Mullin; AD 19 Stefani; AD 21 Papan; Governor,
  Lt. Governor, SoS, AG, Controller, Treasurer, Insurance Commissioner,
  Superintendent, BOE District 2; 13 propositions (Yes on 1, 2, 3, 4, 5, 37,
  40, 44; No on 39, 41, 42, 43, 45). "OPPOSE" on a prop → `endorse` + "No".
- Local candidates (35): city councils 22, school/college boards 13.
- Local measures (20): 19 county/city/school measures plus the Regional
  Transit Measure (reusing `Bay Area — Regional Measure RTM (Regional Transit Measure)`), all "SUPPORT".

## Skipped / not present

- No position on Prop 38, AD 23, CD 16, Board of Supervisors D5, and the
  measures not listed (CC, DD, E, F, I, N, P, Q, Z). Per the page, unlisted =
  no position.

## Judgment calls for review

- `choice` uses ACRE ballot names where the slate card shortens them:
  "Steven Booker" → "Steven R. Booker"; "Robert Newsom Jr." → "Robert G.
  Newsom Jr.". Statewide names follow the spelling used by other bundles in
  this repo ("Shirley Weber", "Malia Cohen", "Sally Lieber").
- "Pacifica School District (Full Term)" and "(Short Term)" are separate ACRE
  contests and are recorded as `Pacifica School District Board` and
  `Pacifica School District Board (Short Term)`.
- "Millbrae City Council, District 4 (Full Term)" → `Millbrae City Council, District 4`
  (the only District 4 contest on the ballot).
