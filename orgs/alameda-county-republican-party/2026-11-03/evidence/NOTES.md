# NOTES — Alameda County Republican Party, Nov 3 2026 general

## Sources

- https://www.alamedagop.org/candidates ("Republican Candidates on the
  Ballots in Alameda County"). This page uses two check marks:
  - a green ✓ means "Endorsed by the Alameda County Republican Party
    Central Committee";
  - a red ✓ means "Endorsed by the California Republican Party (CAGOP)".

  The colours were read from the HTML classes (`text-green-600` /
  `text-red-600`). The text conversion in the evidence file loses the
  colours; the evidence note lists who carries which mark. The table mixes
  June-primary candidates with November finalists.
- https://www.alamedagop.org/posts/2026-10-11-voter-guide-statewide
  ("Voter Guide - Statewide", October 11, 2026). The guide is a single image
  of the California Republican Party's "CountyName County VOTER GUIDE"
  template, transcribed by eye.
- https://www.alamedagop.org/posts/2026-10-11-county-voter-guide ("County
  Voter Guide"). An image titled "Alameda County Candidates", transcribed
  by eye.
- Mode is `transcribed` because some positions come from the images.

## Extracted: 29 positions

- `endorse` (8): green ✓ (ACGOP Central Committee) and a November finalist.
  - Secretary of State: Wagner
  - Treasurer: Hawks
  - Attorney General: Gates
  - SD 10: Linda R. Price
  - AD 16: Joseph A. Rubay
  - AD 24: Max Hsia
  - Union City City Council D2: Jaime Patino. The page doesn't name the
    district; the ROV has Patino only in D2.
  - Union City City Council D3: Jeff Wang (ROV: D3).
- State propositions (14), from the statewide voter guide image:
  - `endorse` Yes: 38, 39, 41, 42, 43, 45.
  - `endorse` No: 2, 3, 4, 5, 40, 44.
  - `neutral` ("Prop 1–Neutral", "Prop 37–Neutral"): 1, 37.
- `lean_for` (7): candidates who appear in a voter guide image but carry no
  ACGOP green ✓.
  - Governor: Steve Hilton
  - Lieutenant Governor: Gloria Romero
  - Controller: Herb W Morgan
  - Superintendent: Sonja Shaw
  - CD 10: Jeff Frese
  - CD 17: Ritesh Tandon
  - AD 20: Patricia Muga

## Skipped

- Green-✓ endorsees who didn't advance from the June primary:
  - Chad Bianco (Governor)
  - Mark McComas (BOE 2)
  - Borgar Solnordal (AD 14)
  - Dena Maldonado (CD 14, a special election that a Democrat won)
- Primary-era county entries (AC Board of Education, Flood and Water
  Board): those races aren't on the ROV's November on-ballot list.
- Red-✓-only (CAGOP-only) marks weren't counted as county-party
  endorsements, except where the county itself re-posted the statewide
  voter guide (see below).

## Flags for review

- The statewide voter guide is visibly the state party's template ("CountyName
  County"), re-posted by the county party as its "Voter Guide - Statewide".
  It's recorded as the county party's published recommendation, with
  candidates at `lean_for`. Drop it if the coordinator prefers only
  county-originated picks.
- The county voter-guide image lists candidates without an explicit
  "endorse" verb. Frese, Tandon and Muga are therefore `lean_for`. Price,
  Rubay and Hsia also appear there but are `endorse` on the strength of the
  green ✓.
