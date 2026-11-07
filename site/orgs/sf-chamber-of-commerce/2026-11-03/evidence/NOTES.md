# NOTES — San Francisco Chamber of Commerce, Nov 3 2026 general

## Sources

- https://sfchamber.com/november-2026-voter-guide/ (HTML, scraped), "San
  Francisco Voter Guide: November 2026 General Election", October 8, 2026.
  The page also embeds the guide as three images ("Voter Guide Page 1",
  "Page 2", "State Measures"). Every position here comes from the HTML
  text, so `mode` is `scraped`; the images were not transcribed.

## Extracted: 16 positions (measures only)

- SF: Yes on A, C, D, E, F, H; No on B, I. G and J: "The Chamber has
  abstained from taking a position" → `abstain`.
- Regional Transit Measure: Yes ("The Chamber supports this measure").
- State: No on 40; Yes on 41, 42, 43, 45.

"supports" / "is in support of" → Yes, "opposes" → No (stance `endorse`).

## Not covered

- No candidates.
- State Props 1–5, 37–39 and 44 are not in the guide. I viewed the
  "State Measures" image
  (https://sfchamber.com/wp-content/uploads/2026/10/State-Measures-.png,
  fetched 2026-10-19T21:47:31Z) to confirm: it covers only 40 (✗), 41,
  42, 43 and 45 (✓), and its text matches the HTML.

## Review flags

- The Prop 43 paragraph reads "require 3 voter approval" in the HTML. The
  image version shows "⅔", so the glyph was lost from the HTML. The
  statement quotes only the part before that phrase.
