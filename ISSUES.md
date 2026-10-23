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
