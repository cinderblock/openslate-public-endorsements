# NOTES — ConnectedSF, Nov 3 2026 general

## Sources

- https://www.connectedsf.com/2026-voter-guide (HTML, scraped). "November
  2026 Election — The Common Sense Guide": a cheat sheet, then a section per
  SF, regional and state measure ("Endorsement: YES/NO on Proposition X"),
  then the supervisor endorsements.

## Extracted: 32 positions

- 7 supervisor positions:
  - D2: Stephen Sherrill #1 (weight 1), Nicholas Berg #2 (weight 0.5).
  - D4: Alan Wong #1 (weight 1), Albert Chow #2 (weight 0.5).
  - D6: Matt Dorsey. D10: Theo Ellington.
  - D8: "No Endorsement", recorded as `abstain` with no choice.
- 25 measures:
  - SF: A Yes, B No, C No, D Yes (`lean_for`), E Yes, F Yes (`lean_for`),
    G Yes, H No, I No, J No.
  - Regional: RTM No.
  - State: 1 No, 2 No, 3 No, 4 No, 5 No, 37 No, 38 No, 39 Yes, 40 No,
    41 Yes, 42 Yes, 43 Yes, 44 No, 45 No.
- The guide has no statewide, federal or legislative candidates.

## Top-two check

All supervisor endorsees, including the #2 picks Nicholas Berg (D2) and
Albert Chow (D4), are on the SF qualified-candidate list
(https://www.sf.gov/candidates-november-3-2026-general-election).

## Judgment calls / review flags

- **Ranked-choice #2 picks** are `endorse` with weight 0.5, and the #1 pick
  gets weight 1, matching harvey-milk-club and
  chinese-american-democratic-club. The page labels them "Nod to Rank
  Choice Voting: Endorsement: Nick Berg #2" and "Albert Chow #2".
- **"Nick Berg"** is recorded under his ballot name, "Nicholas Berg".
- **Prop D "Reluctant YES"** and **Prop F "Really hesitant YES"** are
  `lean_for` Yes. The cheat sheet lists both as a plain "YES", but the
  detail sections hedge. Switch them to `endorse` if the reviewer prefers
  the cheat sheet.
- "HARD NO", "HECK YES" and "HECK NO" are treated as plain endorse No/Yes.
- The D10 section ends with "Where does Theo stand on this November's
  ballot measures?". Those are the candidate's stances, not ConnectedSF's,
  and were not extracted.
- Cross-checked against sfendorsements.com (fetched 2026-10-19): all
  positions match.

## Refresh 2026-10-30

Re-fetched https://www.connectedsf.com/2026-voter-guide on 2026-10-30 9:48 AM PDT (16:48Z). Evidence: `connectedsf-2026-voter-guide-2026-10-30.md`.

- Added: Insurance Commissioner Ben Allen. The cheat sheet has a new "State Candidates" heading, and the
  guide has a new section for him.
- All other picks match. This corrects the line above saying the guide has no statewide candidates.
