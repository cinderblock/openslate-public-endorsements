# A listing rebuild must not rename its own contests

## Goal

Rebuilding a county's ballot listing (`bun scripts/la-rrcc-ballot.ts
2026-11-03 --apply`, and the five sibling scripts) must leave every contest it
already names with the same title, so its `choice_id`s and every voter's marks
(keyed `title|jurisdiction|election`) survive. On master `7623d18`–`43e31d6`
LA's rebuild renames four seats nobody decided to rename. Logged in
`ISSUES.md` ("Rebuilding LA's listing renames four seats"), claimed here.

## Environment / context

- Catalog repo: openslate-public-endorsements. Task worktree
  `C:\Users\camer\.t3\worktrees\openslate-public-endorsements\fix-la-renames`,
  branch `fix/la-listing-renames` from `origin/master` `43e31d6`. The main
  checkout (`~/git/Personal Projects/openslate-public-endorsements`) has
  another thread's three unpushed Logos commits and an untracked
  `orgs/sd-green-party/2026-11-03/`: leave both alone.
- Listing evidence is committed under each listing's `evidence/`, so
  `--apply` rebuilds offline (no `--fetch` needed).
- Checks: `bun test scripts`, `bunx biome check scripts`, `bun
  scripts/verify-positions.ts`. CRLF files; edit via Python with
  `newline=""`.

## Findings

- `loadExisting(election, dir)` skips the listing's own directory, so a
  rebuild only sees other bundles' titles. `subjectMatcher.reuse` then: (1)
  reuses another bundle's subject with the same `titleKey` (seat words
  stripped, so "Area 2" and "Trustee Area 2" are the same key); else (2)
  `sameStyle` copies the seat label from a sibling seat some bundle names;
  else (3) keeps the registrar's wording ("Trustee Area No. 2" → "Trustee
  Area 2").
- At the listing's first build (`47ee8d1`) the California Nurses Association
  and LA Fed bundles named sibling seats "Bellflower Unified School District
  Board, Area 1", "Long Beach Community College District Board, Area 1/3",
  "Paramount Unified School District Board, District 1/5", so (2) gave the
  four seats "Area"/"District". Those sibling seats have since left both
  bundles' positions.json (only their evidence NOTES.md still mention them),
  nobody else names the four seats, and the listing's own titles don't count,
  so a rebuild now falls to (3): "…, Trustee Area N", new ids.
- The other five listings rebuild unchanged today, but only by luck: the same
  gap applies to every seat only a listing names.

## Decisions already made (don't re-ask)

- Keep the committed titles ("Area 2" etc.), not the registrar's wording:
  changing them would change four races' identity for everyone who marked
  them, for no reason anyone chose.
- Fix the rule, not the data: the matcher consults the listing's own last
  build as a fallback after other bundles and before `sameStyle`. Other
  bundles still win, so the listing follows the catalog's consensus when
  there is one.
- Generic across all six listing scripts (`loadOwn(dir)` + `own` option), not
  an LA-only patch.

## Plan / steps

1. [x] Claim the issue in ISSUES.md (`3d3f096`).
2. [x] `scripts/lib/ballot-subjects.ts`: `loadOwn(dir)`; `subjectMatcher({
   own })`: reuse falls back to the listing's own subject with the same key;
   `sameStyle` also takes a sibling's label from own.
3. [x] All six listing scripts load `own` and pass it.
4. [x] Tests (`scripts/ballot-subjects.test.ts`, 44 pass); biome clean; verify
   376 OK.
5. [x] Rebuilt all six listings (`--apply`, then `assign-choice-ids --apply`
   and `assign-districts --apply`, the usual post-build steps): no position
   changes anywhere. Each listing's `contest-subjects.json` gains the
   `district` its subjects already carry in positions.json (137 lines over
   six files), because a reused own subject comes back whole, as a subject
   reused from another bundle always has.
6. [x] README (the LA row's "reuses an existing subject" sentence), ISSUES.md
   entry closed, committed and pushed as `0847c47` (3:18 PM PDT, 22:18Z);
   publish run green at 3:20 PM PDT (22:20Z).

## Progress log

- [x] 2026-10-25: cause found (above); worktree and plan created.
- [x] 2026-10-25: matcher fix, tests, six listings rebuilt unchanged; README
  and ISSUES.md updated.

## Open questions for the user

None.

## Things not to do

- Don't rebuild and commit LA's listing before the matcher fix lands: that
  ships the four renames.
- Don't `git checkout --` anything in the main checkout; the Logos commits
  and the sd-green-party directory there are another thread's.
