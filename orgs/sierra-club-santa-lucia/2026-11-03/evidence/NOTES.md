# NOTES: Sierra Club Santa Lucia Chapter, Nov 3 2026 general

## Source
- https://www.sierraclub.org/santa-lucia/november-2026-general-election-endorsements,
  read 2026-10-28 9:20 AM PDT (16:20Z) in a real browser (Claude in Chrome). Imperva
  blocks every other client, including T3's preview browser (Error 15, 2026-10-19).
  Saved as `sc-santa-lucia-november-2026.md`.

## Extracted: 8 positions
- US House: CD 19 Jimmy Panetta, CD 24 Salud Carbajal.
- Assembly: AD 30 Dawn Addis, AD 37 Gregg Hart. Kept as the chapter's own: Sierra
  Club chapters approve state candidates locally, and Sierra Club California reviews
  them (San Gorgonio's guide says so).
- Local: Pismo Beach Mayor Cynthia Replogle; San Luis Obispo Mayor Erica Stewart
  (written "Erica A. Stewart", the spelling the other bundle on that race uses); SLO
  City Council Emily Francis and Michelle Shoresman.
- `choice_id`s on the four state/federal picks come from `normalize-choices --apply`
  (the Secretary of State's listing). No listing covers San Luis Obispo County yet.

## Republished from Sierra Club California: adopted by reference
The "California State Offices", "Statewide Ballot Measures" and "Board of
Equalization" sections match `sierra-club-california` pick for pick: AG Bonta, SoS
Weber, Controller Cohen, Insurance Commissioner Allen, Treasurer Kounalakis, SPI
Barrera; Props 1/4/5 YES, 39/43/45 NO; BOE 2 Lieber. They are one `adopts` entry
(13 subjects, SPEC §3.10) pointing at Sierra Club California's published slate,
written with `bun scripts/adopt.ts`, which checks each pick against that bundle.
