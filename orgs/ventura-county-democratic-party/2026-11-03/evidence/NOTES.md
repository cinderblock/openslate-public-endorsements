# NOTES — Ventura County Democratic Party, Nov 3 2026 general

## Sources

- https://www.venturacountydemocrats.com/endorsements/ ("VOTER GUIDE",
  "Countdown to the Nov 3rd, 2026 Election"). HTML, scraped with curl.
  Sections: candidate cards (state/federal + County Superintendent),
  "Local Endorsements by the California Democratic Party & Ventura County
  Democratic Party" table, "State Ballot Propositions", "Local Ballot
  Measures", and "Judges Information (Not Endorsements)" (an image,
  explicitly not endorsements; skipped).
- The Ventura County Registrar (venturavote.org) could not be used: curl
  gets an HTTP 202 bot challenge, and WebFetch reports "certificate has
  expired". So local measure titles and local candidate names could not
  be checked against the registrar.

## Extracted: 81 positions

- 15 state/federal candidates → `lean_for` (see flag 1): Becerra, Ma,
  Kounalakis, Barrera, Weber, Bonta, Cohen, Allen; BOE Lieber (District
  2); Congress Irwin (CD 26), Carbajal (CD 24), Sherman (CD 32); Assembly
  Klein Lopez (AD 42), Bennett (AD 38), Gabriel (AD 46).
- Ventura County Superintendent of Schools: Karen Sher → `endorse`.
  Sher vs Maggie Marschner is a Nov 3 runoff (KCLU, 2026-06-03:
  https://www.kclu.org/2026-06-03/the-june-primary-brings-upsets-for-some-incumbents-in-ventura-and-santa-barbara-counties).
- 45 local candidates from the local table → `endorse` (the table lists
  Roger Bowerman, Debra McIntyre-Sciarrino and the three Oxnard Harbor
  District candidates under two areas each; deduplicated).
- 14 state propositions: Yes on 1, 2, 3, 4, 5, 37, 38, 40; No on 39, 41,
  42, 43, 44, 45.
- 6 local measures: Simi Valley A "Neutral" → `neutral`; Yes on Rio
  Elementary SD B, Santa Paula USD C, United Water Conservation District
  D, Oxnard E, Allan Hancock JCCD H.

## Flags for review

1. **State/federal picks as `lean_for`.** The page footnote says: "*
   These races are endorsed by the California Democratic Party, not by
   the Ventura County Democratic Party. Under California Democratic Party
   rules, county parties may only endorse at the County level and below."
   The starred cards are Weber, Bonta, Cohen, Lieber, Irwin, Carbajal,
   Sherman, Klein Lopez, Bennett and Gabriel. Becerra, Ma, Kounalakis,
   Barrera and Allen carry no star, but they are statewide, so under the
   same rule they cannot be county-party endorsements either. I treat all
   15 as recommendations in the party's voter guide (`lean_for`), not
   VCDP endorsements. Reviewer may prefer to drop them (they are already
   in the ca-democratic-party bundle).
2. District numbers for the Congress and Assembly cards are inferred from
   the card text and the candidates (Irwin CD 26, Carbajal CD 24,
   Sherman CD 32, Klein Lopez AD 42, Bennett AD 38, Gabriel AD 46). All
   are on the SOS certified list. BOE "Sally Lieber" → District 2 (she is
   the District 2 incumbent; ballot name "Sally J. Lieber").
3. **Local titles all invented** (no existing Ventura subjects), e.g.
   `Ventura City Council, District 1` (`us/ca/ventura`), `Oxnard City
   Council, District 1` (`us/ca/oxnard`), `Ventura County Board of
   Education, Area 2`, `Ventura County Community College District Board,
   District 2`, `Camarillo Health Care District Board, Zone 1`, `Oxnard
   Harbor District Board`, `Ventura County Superintendent of Schools`
   (`us/ca/ventura-county`). Local measure parentheticals use the party's
   descriptions, because the registrar site was unreachable. Measure
   letters are as printed by the party.
4. Local candidate spellings are as printed by the party; not checked
   against the registrar's candidate list (unreachable). City council
   and school races in Ventura County are November-only, so there is no
   primary elimination to check.
5. Allan Hancock JCCD Measure H reuses the existing title and
   jurisdiction `us/ca/santa-barbara`. That district is in northern Santa
   Barbara County, so it is odd for the Ventura party to list it; it is
   recorded as printed.

## Adopted by reference (2026-10-30)

The page footnote says these 15 state and federal races "are endorsed by the California Democratic Party, not by the Ventura County Democratic Party". They were stored here as `lean_for`; as adoptions they carry CADEM's own stance.

These were copies; they are now one `adopts` entry (SPEC §3.10, 15 from California Democratic Party) pointing at the adopted bundle's published slate, written with `scripts/adopt.ts`, which checks each pick against that bundle. Every pick matched it. The web app shows them under this source, marked "Adopted from ...".
