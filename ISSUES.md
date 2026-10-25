# Issues

Problems noticed while working on something else, for a fresh session to pick up.

## `tsc --noEmit` fails on five older scripts

`bunx tsc --noEmit -p .` reports 37 errors, all in `scripts/adopt.ts`,
`scripts/ca-sos-ballot.ts`, `scripts/catalog-extras.ts`,
`scripts/normalize-choices.ts` and `scripts/sf-elections-ballot.ts`. Example:
`scripts/adopt.ts(20,27): error TS2451: Cannot redeclare block-scoped variable
'election'` and `TS1375: 'await' expressions are only allowed at the top level
of a file when that file is a module`. These scripts have no imports or exports,
so TypeScript treats them as one shared global scope. Nothing runs `tsc` today
(CI only lints and verifies), so new type errors in any script go unnoticed.
Noticed 2026-10-23 while adding the San Diego and Alameda ballot sources.

## A regional measure gets a different `choice_id` from each county's listing

Regional Measure RTM ("Bay Area — Regional Measure RTM (Regional Transit
Measure)", `us/ca/bay-area`) is listed by four ballot sources: SF, Alameda,
Santa Clara and San Mateo. Each mints its own ids
(`alameda-registrar-of-voters:2026-11-03/bay-area-regional-measure-rtm-…/yes`,
`san-mateo-county-elections:…/yes`, and so on). Core's `ballotListing` keeps
the first listing it reads, so which id is "the ballot's" depends on read order.

- The scripts now sort (`3ffd028` fixed `verify-positions.ts`, whose unsorted
  `readdirSync` made CI expect San Mateo's ids and fail on 14 positions).
- The web app builds its listing in catalog order. That order comes from
  `openslate sign --batch` (OpenSlate CLI), which may be the filesystem's.
  There, the endorsements' Alameda ids can read as stale.

Worth deciding: should one listing own a measure that several counties put on
the ballot, with the others reusing its ids? Or should ids be the same across
listings, or should core treat a listed race's ids from every listing as
equivalent? Noticed 2026-10-24 while adding San Mateo.
