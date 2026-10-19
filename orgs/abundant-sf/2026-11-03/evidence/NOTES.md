# NOTES — Abundant San Francisco, Nov 3 2026 general

## Sources

- https://www.abundantsanfrancisco.org/vote (HTML, scraped). The voter guide
  overview, "Your guide to the November elections". It lists every
  endorsed candidate by office. Ballot measures are listed with only an SVG
  checkbox icon (Yes / No / No-Position). The icon ids are recorded at the
  end of the evidence file.
- https://www.abundantsanfrancisco.org/vote/ballot-measures (HTML, scraped).
  The measure detail page, with explicit text ("Yes on Prop A: ...", "No
  position on Prop B: ...", "No on Prop G: ..."). Measure positions are
  sourced from this page.
- Abundant San Francisco is the SF chapter of the Abundance Network
  (sfendorsements.com lists it as "Abundance Network"). The guide is "Paid
  for by Families for a Vibrant SF Sponsored by Abundance Network".

## Extracted: 28 positions

- 17 candidates:
  - Congress: CD 11 Wiener.
  - Legislature: AD 17 Haney, AD 19 Stefani.
  - Board of Equalization D2: Pimentel.
  - Supervisors: D2 Sherrill, D4 Wong, D6 Dorsey, D8 McCoy, D10 Ellington.
  - Board of Education: Phil Kim, Autumn Brown Garibay, Tim Tung.
  - Community College Board (full term): Elijah Ball, Erwin Tam, Monroe Lace.
  - Community College Board, partial term: Ruth Ferguson.
  - BART D8: Sara Barz.
- 11 measures: RTM Yes; SF A Yes, B no position (`neutral`), C Yes, D Yes,
  E Yes, F Yes, G No, H Yes, I no position (`neutral`), J Yes.
- No statewide candidates or state propositions appear in the guide.

## Top-two check

All endorsees are on the SF Department of Elections qualified-candidate
list for Nov 3 2026 (https://www.sf.gov/candidates-november-3-2026-general-election).
CD 11, AD 17, AD 19 and BOE D2 are November finalists.

## Judgment calls / review flags

- Candidate statements quote the list line (office label + name). The page
  has no per-candidate endorsement text beyond that.
- Prop B and Prop I say "No position" explicitly, so they are `neutral`
  with no choice.
- The page calls Prop G "Closing Sunset Dunes park". It is mapped to the
  official title (Allowing Private Vehicles on the Great Highway in Sunset
  Dunes Park). "No" on Prop G means against reopening the road to cars.
- Cross-checked against sfendorsements.com (fetched 2026-10-19): all
  positions match.
