# NOTES — DSA San Francisco, Nov 3 2026 general

## Sources

- https://dsasf.org/dsa-sf-november-2026-voter-guide/ (HTML, scraped;
  https://dsasf.org/vote redirects here). The home page links to it as
  "November 2026 voter guide is here!"

## Two tiers: endorsements vs. recommendations

The guide separates the two explicitly:

- **Endorsements** (chapter-meeting votes): "For the November 2026
  election, we have endorsed 3 ballot campaigns: Yes on Propositions B and
  I, and No on Proposition D. We have also endorsed opposition to the rest
  of the Mayor's Charter Power Grab, Propositions D, E, and F. In addition,
  we endorsed 2 candidates running for office: Bunny McFadden and Reina
  Tello." Recorded as `endorse`.
- **Recommendations**: each other measure section ends "DSA SF's
  Recommendation: Vote Yes/No on X". The guide says "Recommending a
  campaign does not mean we believe it directly advances socialism ...".
  Recorded as `lean_for` with the Yes/No `choice`, per the brief's
  "Recommended" → `lean_for` rule.
- "DSA SF's Recommendation: No Recommendation" → `abstain` (no choice).

## Extracted: 27 positions

- 2 races, `endorse`: SF Board of Education, Reina Tello; City College
  Board, Bunny McFadden.
- 5 measures, `endorse`: SF B Yes, D No, E No, F No, I Yes.
- 17 measures, `lean_for`:
  - SF: A No, C Yes, H Yes, J Yes, RTM Yes.
  - State: 1 Yes, 3 Yes, 4 Yes, 5 Yes, 37 No, 38 No, 39 No, 40 Yes,
    41 No, 42 No, 43 No, 45 No.
- 3 measures, `abstain`: SF G, state 2 and 44.

## Skipped

- The guide's candidate write-ups (Supervisor D2/D4/D6/D8/D10,
  Assessor-Recorder, Assembly, BOE, other school and college board
  candidates, BART) are analysis only. They have no endorsement or
  "Recommendation" line, so no positions were recorded for them.

## Review flags

- `lean_for` vs `endorse` for the recommendation tier: the coordinator
  may prefer `endorse` for all "Vote Yes/No" recommendations. The source
  makes the distinction itself, so I kept it.
- The evidence file is long (the full guide text from "Our endorsements"
  to the Prop 45 recommendation), because the recommendation lines sit at
  the end of each section.
- sfendorsements.com does not list DSA SF, so there is no aggregator
  cross-check.
