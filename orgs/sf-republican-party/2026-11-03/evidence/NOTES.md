# NOTES — San Francisco Republican Party (SFGOP), Nov 3 2026 general

## Sources

- https://sfgop.org/nov-2026-endorsements (HTML, scraped), "Official
  Endorsements and Recommendations for the November 3, 2026 Election".
  Footer: "Paid for by the San Francisco Republican County Central
  Committee, FPPC#890605".

## Extracted: 25 positions

- 14 races:
  - CD 11: explicit "Do NOT vote for Scott Wiener", recorded as `oppose`
    Scott Wiener (no endorsement of Connie Chan).
  - CD 15 Hoelter, AD 17 Noris-Barrera, AD 19 Wing, Supervisor D2 Berg
    ("Endorsed") → `endorse`.
  - Supervisor D4 Wong and D6 Dorsey, Board of Education (Laurance Lee,
    Phil Kim, Tim Tung), Community College Board (Elijah Ball), and BOE D2
    (John Pimentel) are "Recommended" → `lean_for`.
  - Supervisor D8 and D10: "we are making no endorsements" → `abstain`.
- 11 local measures: Yes on A, E, F, G; No on B, C, D, H, I, J and RTM.

## Skipped

- Statewide candidates and state propositions. The page says
  "Endorsements for the California statewide candidates and initiatives
  are on the California GOP website at https://cagop.org/endorsements/".
  Those are in the `ca-republican-party` bundle. (sfendorsements.com shows
  statewide picks for SFGOP, which appear to be copied from the CAGOP list.)
- Assessor-Recorder, Public Defender, Community College partial term, BART
  D8, judicial retentions: not mentioned.

## Ballot check / name normalization

All candidates checked against the SF Department of Elections qualified
list (https://www.sf.gov/candidates-november-3-2026-general-election,
fetched 2026-10-19) and are November finalists.

- "Philip Wing" → ballot name "Philip Louis Wing".
- "Laurence Lee" → ballot spelling "Laurance Lee".
- "Phillip Kim" → "Phil Kim" (ballot and other bundles).
- "Nick Berg" / "Nicholas Berg" → "Nicholas Berg".

## Review flags

- The CD 11 `oppose` is the only oppose stance; it is an explicit "Do NOT
  vote for" with no endorsed alternative.
- AD 17: the page says Noris-Barrera ran as a write-in in June; he is on
  the SF qualified list for November.
