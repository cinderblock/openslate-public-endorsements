# NOTES — Contra Costa Republican Party, Nov 3 2026 general

## Sources

- https://www.cocorepublicans.com/endorsements (HTML, scraped): "November
  2026 general election / Endorsements Recommendations & Positions". Lists
  statewide, Assembly and Congress candidates as text.
- Three images embedded on that page, transcribed by hand (hence
  `mode: transcribed`): the voter guide (IMG_2317), the ballot
  measure/propositions positions table (positions), and "Local
  Recommendations". See `cocorepublicans-images-transcription.md`.
- Ballot names and on-ballot status checked against the Contra Costa
  Elections Division 8/27/2026 "Contests On Ballot" proof list and 8/14/2026
  candidate list, and the SOS certified list (justices on the ballot).

## Extracted: 56 positions

- Statewide (8 lean_for + 1 oppose): Hilton, Romero, Gates, Morgan, Wagner,
  Hawks, Shaw, Ben Allen (lean_for); Jane Kim (oppose; "*Official CoCo GOP
  Committee Position: Vote AGAINST Jane Kim.").
- Assembly (2) and Congress (3), lean_for: AD 15 Webb, AD 16 Rubay; CD 8
  Recile, CD 9 McBride, CD 10 Frese.
- Local (14 lean_for, 1 endorse, 1 oppose): CCCD Ward 3, County BOE Area 2,
  Danville, Acalanes Area 1, Diablo CSD (2), Antioch D1, Brentwood D2 and D4,
  Brentwood Union SD (2), Liberty UHSD Area 4, Knightsen ESD (2); Antioch D4
  Matty Mathews Alappat marked "(Endorsed)" -> endorse; Mt. Diablo USD Area 4
  "DO NOT VOTE FOR Brian Thomas Lawrence" -> oppose.
- Judicial retention (11, No): Supreme Court Groban, Evans; First District
  Brown, Burns, Chou, Desautels, Petrou, Rodriguez, Smiley, Stewart,
  Langhorne Wilson.
- Measures (15): RTM No; Props 39, 41, 42, 43, 45 Yes; Props 1, 2, 3, 4, 5,
  37, 38, 40, 44 No ("OPPOSE" encoded as `endorse` + `choice: "No"`).

## Stance choices

- The page frames its lists as "Endorsements Recommendations & Positions" and
  the local graphic as "Local Recommendations"; the asterisk on Ben Allen
  distinguishes an "Official CoCo GOP Committee Position" (against Jane Kim)
  from the listed picks, and one local pick is singled out as "(Endorsed)".
  So list picks are encoded `lean_for` and only the explicitly endorsed one
  as `endorse`. Reviewer may prefer `endorse` for the voter-guide candidates
  (checkmarks on a party "Voter Guide").

## Skipped

- Not on the ballot per the ROV on-ballot list (uncontested or absent from
  the 8/27 list): Oakley City Council D2 (Hugh Henderson, sole filer);
  Discovery Bay CSD (Mayer, Graves, Porter; three filers, absent from the
  on-ballot list); Liberty UHSD Area 5 (Joseph Magana); Oakley UESD Areas 3
  and 5 (Ann Corridon, Paul Didonato); East Contra Costa Irrigation District
  1 (Michael Casey, sole filer).
- First District justices on the graphic but not on the Nov 3 ballot (per
  the SOS certified list): Carin T. Fujisaki, Jeremy M. Goldman, Jim Humes,
  Teri L. Jackson, Marla J. Miller, Jon B. Streeter, Alison M. Tucher. The
  two First District justices on the ballot but not on the graphic
  (Kathleen M. Banke, Mark Simons) get no position.

## Flags for review

- "County Measure RTM" mapped to the existing regional subject "Bay Area —
  Regional Measure RTM (Regional Transit Measure)".
- "Charles A. Smiley III" and "Gordon B. Burns" mapped to the existing
  retention subjects "Charles A. Smiley" and "Gordon Burns".
