# NOTES — Westside Forward, Nov 3 2026 general

## Sources

- https://westsideforwardsf.org/voter-guide (HTML, scraped). "Westside
  Forward Voter Guide: 2026 General Election", with a "Recommendations at a
  glance" list and a section per measure ("Westside Forward recommends:
  YES/NO").
- The guide says: "We do not make recommendations on every measure
  appearing on the ballot." It has no candidate endorsements.

## Extracted: 24 positions (all measures)

- SF: A No, B Yes, C Yes, D No, E No, F No, G no position (`neutral`),
  H Yes, I Yes, J Yes.
- Regional: RTM "YES—RELUCTANTLY" (`lean_for`, choice Yes).
- State: 1 Yes, 2 Yes, 3 Yes, 4 Yes, 5 Yes, 37 no position (`neutral`),
  38 No, 39 No, 40 Yes, 41 No, 42 No, 43 No, 45 No.
- Not addressed by the guide: Prop 44.

## Judgment calls / review flags

- **"Recommends" encoded as `endorse`.** The guide's wording is "Westside
  Forward recommends: YES/NO". For ballot-measure voter guides, the existing
  SF bundles (e.g. sierra-club-sf-bay "recommends a No vote", LWV
  "recommendations") encode these as `endorse` Yes/No, and this bundle does
  the same. If the reviewer prefers the stricter brief rule
  ("recommended" → `lean_for`), switch every measure to `lean_for`.
- **RTM is `lean_for`.** It is explicitly "YES—RELUCTANTLY", so it is
  marked weaker than the other picks.
- Prop G and Prop 37 say "NO POSITION" explicitly, so they are `neutral`
  with no choice.
- Cross-checked against sfendorsements.com (fetched 2026-10-19): all Yes/No
  positions match.
