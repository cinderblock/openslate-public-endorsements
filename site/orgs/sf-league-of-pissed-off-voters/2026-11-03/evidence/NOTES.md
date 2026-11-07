# NOTES: SF League of Pissed Off Voters, November 3, 2026 general

## Sources

Mode is `scraped`.

- **Primary: the Pissed Off Voter Guide for November 2026.** It is a blog post dated
  Sept 30, 2026, and lives on the homepage https://www.theleaguesf.org/, which is the
  page's canonical URL.
  - Fetched 2026-10-15T01:09:56Z.
  - Evidence: `theleaguesf-home-pissed-off-voter-guide-november-2026.md`.
- **Secondary: the earlier membership-vote list,**
  https://www.theleaguesf.org/november_2026_endorsements, dated Aug 25, 2026.
  - Fetched 2026-10-15T01:09:30Z.
  - Evidence: `theleaguesf-november-2026-endorsements.md`.

Every position cites the guide (homepage), because it is the latest and most complete.
**Caveat:** the homepage will change after the election. The evidence file preserves the
text.

## Extracted (51 positions)

- **Statewide:** Weber (SoS), Jane Kim (Insurance), Richard Barrera (SPI) and Sally Lieber
  (BOE D2).
- **CD-11:** Connie Chan.
- **SF offices:**
  - Public Defender: Mano Raju.
  - Assessor-Recorder: Joaquin Torres.
  - D8: Gary McCoy #1, Michael Nguyen #2.
  - D10: J.R. Eppler and D.J. Brookter.
  - SFUSD: Virginia Cheung, Reina Tello and Ryan Hazelton.
  - City College: Leah LaCroix and Bunny McFadden.
- **Judicial retention:** Yes on 2 Supreme Court justices and 11 First District Court of
  Appeal justices.
- **SF Props:** Yes on B, C, H, I and J. No on A, D, E and F.
- **Regional Measure RTM:** Yes.
- **State props:** Yes on 1, 3, 4, 5 and 40. No on 38, 39, 41, 42, 43, 44 and 45.

## Judgment calls (please review)

- **D8 is a "Ranked Endorsement: #1 Gary McCoy, #2 Michael Nguyen".** Following the June
  ranked convention, McCoy is `endorse` with weight 1 and Nguyen is `lean_for` with weight
  0.5. Note that the League ranks McCoy first. The Bay Guardian ranks Nguyen first.
- **D10 is a "Non-Ranked Dual Endorsement".** Both candidates are `endorse` with no weight.
- **Court of Appeal names: please review.** The guide line reads "First Court of Appeals:
  Retain all (Smiley, Banke, Wilson, Stewart, Fujisaki, Desautels, Petrou, Rodriguez,
  Brown, Chou, Simons, Burns)". That is 12 surnames.
  - The First District retention list on the SF ballot has 11 justices. Both GrowSF and
    the SF Chronicle list the same 11, and that list does not include anyone named
    Fujisaki.
  - I recorded "Yes" for the 11 justices who are on the ballot, and **omitted Fujisaki**
    as not on the ballot.
  - Surnames were mapped to full ballot names using the GrowSF and Chronicle lists.
    "Wilson" was mapped to Monique Langhorne Wilson (First District). Charles E. Wilson II
    is a Sixth District justice and is not on the SF ballot.
  - The Aug 25 list named only 10 justices: it had Fujisaki and lacked Rodriguez and Brown.
    The Sept 30 guide supersedes it.
- **Supreme Court:** "CA Supreme Court: Retain all (Groban, Evans)" was mapped to Joshua
  Groban and Kelli M. Evans.
- **Statements:** each measure `statement` is the guide's verbatim one-line label, e.g.
  "Prop B: Public bank: Hell Yes!". The "Hell Yes!" / "Hell No!" emphasis is not encoded
  in stance or weight.
- **Attorney General:** on the Aug 25 page, Rob Bonta is struck through
  (`<del>Rob Bonta</del><strong> No Endorsement</strong>`). The Sept 30 guide says "No
  Endorsement". No position is recorded.
- **Name spellings follow the guide:** "Joaquin Torres" (the Aug page has "Joaquín"),
  "J.R. Eppler" and "D.J. Brookter". The Aug page has "Dion-Jay "DJ" Brookter" and
  "JR Eppler".

## Skipped ("No Endorsement" / "No position" — scope rule: named picks only)

- **Offices:** Governor, Lt Governor, Controller, Treasurer, Attorney General, CD-15,
  AD-17, AD-19, Supervisor D2, D4 and D6, City College Partial Term, and BART Board D8.
- **SF Prop G:** "No Position".
- **State Prop 2 and Prop 37:** "No position".

## Not carried forward from June

- **Governor:** Tom Steyer did not advance. Now no endorsement.
- **Lt Governor:** Oliver Ma did not advance. Now no endorsement.
- **Controller:** Meghann Adams did not advance. Now no endorsement.
- **D2:** Lori Brooke did not advance.
- **D4:** Natalie Gee is not on the Nov ballot.
- **Superior Court Seat 16 (Alexandra Pray):** not in the Nov guide.
- **June SF Props A–D:** June-only measures.

## Title conventions

See `orgs/grow-sf/2026-11-03/evidence/NOTES.md`, which covers:

- the titles of the new offices,
- the retention-title format,
- RTM,
- the sf.gov prop titles,
- the SoS prop-title check, which found no discrepancies.

## Refresh 2026-10-30

Re-fetched https://www.theleaguesf.org/ on 2026-10-30 10:18 AM PDT (17:18Z). The guide's picks are unchanged, so the saved evidence still applies.

- Added 16 `abstain` positions for the lines the "Skipped" section above left out under its old
  named-picks-only rule: Governor, Lt Governor, Controller, Treasurer, Attorney General, CD-15, AD-17,
  AD-19, Supervisor D2, D4 and D6, City College Partial Term, BART D8, SF Prop G, and Props 2 and 37.
  Each `statement` is the guide's own line ("stablization" in Prop 2 is the guide's spelling).
- This replaces "No position is recorded" in the Attorney General entry above.
- The names flagged by the change sweep (Wiener, Dorsey, Ellington, Phil Kim, Tim Tung, Haney, Stefani,
  Pimentel, Ma) appear only in the guide's write-ups, as candidates it doesn't endorse.
