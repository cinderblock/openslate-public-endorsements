# NOTES — Sacramento Central Labor Council, Nov 3 2026 general

## Sources (aggregator)

- saclabor.org has no 2026 endorsement list (an earlier agent and this pass
  both checked). The home page says only that "The CLC also organizes
  pro-labor political slates for ADEMS and endorses candidates for local
  political races from school board to assembly."
- The council's local picks are published by the **California Labor
  Federation** through the "Search by Labor Council" widget on
  https://calaborfed.org/labor-2026-primary-election-endorsements/ (the general
  election page despite the slug). The widget loads
  https://calaborfed.org/wp-content/uploads/2026/10/2026G-CLC-web-endorsements-2.csv
  (the `endorsementCSVURL` variable in the page HTML). All 33 rows with Labor
  Council = "Sacramento" are saved verbatim in
  `calaborfed-clc-csv-sacramento.md`. Every position cites the CSV and quotes
  its row.

## Extracted: 18 positions (local picks)

- Placer: Rocklin USD Area 4 (Steve Makis).
- Sacramento County: American River Flood Control D2; Elk Grove USD Area 5
  (two names, see below); Folsom council D1, D3, D5; Fulton-El Camino Rec &
  Park; Los Rios CCD Areas 1, 2, 6; Natomas USD Areas 1, 4; Sacramento
  Suburban Water D2; San Juan USD Areas 3, 7.
- Yolo: Davis City Council D1 (Judith Ennis); Yolo BOS D3 (Mayra Vega).

## Republished from California Labor Federation (ca-labor-federation)

The CSV rows with no county are the state fed's federal and legislative
picks. They are identical to the ca-labor-federation bundle and were NOT
copied: CD 3 Bera, CD 4 Thompson, CD 5 Masuda, CD 6 Pan, SD 4 Brandon, SD 6
Frame, SD 8 Ashby, AD 4 Aguiar-Curry, AD 6 Krell, AD 7 Slavensky, AD 9 Flora,
AD 11 Wilson.

## Skipped

- "No Recommendations" rows for El Dorado, Amador and Nevada counties: not
  tied to a specific contest.

## Flags for review

- **Elk Grove USD Area 5 has two endorsed names** (Rachelle Reinwald and
  Varinder Singh) in one vote-for-one contest. Both are recorded as
  `endorse`. This may be a dual endorsement or a data error in the state
  fed's CSV.
- Name normalisation: "Chad Vanderveen" → "Chad Vander Veen", "Jag
  Nagendra" → "Jagadish “Jag” Nagendra", "Moe Sarama" → "Murad “Moe”
  Sarama", "Devon Graveas" → "Devon Graves" (all matching existing bundles);
  "Rachelle Reinwald" → "Rachell Renee Owen-Reinwald", "Deborah Ortiz" →
  "Deborah Venise Ortiz", "Andrew Consiglio" → "Andrew Paul Consiglio" (from
  the Sacramento ROV list at `$TEMP/os-dl/N2/sacco/cand.txt`); "Dr Jeremy
  Green" → "Jeremy Green".
- The Yolo and Placer names (Ennis, Makis) were not checked against a
  registrar list.
- INVENTED titles: `Sacramento Suburban Water District Board, Division 2`
  (us/ca/sacramento-county) and `Davis City Council, District 1`
  (us/ca/davis). `Rocklin Unified School District Board, Area 4` is shared
  with placer-county-republican-party.
- The slug is new (no existing sacramento-*-labor bundle). `context.jurisdiction`
  is us/ca/sacramento-county.

**Adopted by reference (2026-10-19):** these republished picks are now in `positions.json` as an `adopts` entry (SPEC §3.10) pointing at the adopted bundle's published slate: 12 from California Federation of Labor Unions, AFL-CIO. Created with `bun scripts/adopt.ts`, which checks every pick against the adopted bundle.
