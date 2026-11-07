# NOTES: Bernal Heights Democratic Club, November 3, 2026 general

## Source

- https://bhdemocrats.org/index.php/endorsements-november-2026/ ("Endorsements
  – November 2026"). It was fetched 2026-10-28 9:06 AM PDT (16:06:51Z) with
  Windows `curl.exe` and a browser User-Agent. The club's homepage menu
  links to it.
- The page's only content is one image: the club's slate card, "November 3,
  2026 ELECTION ENDORSEMENTS". The full-size file is
  https://bhdemocrats.org/wp-content/uploads/2026/10/image.png (1250 × 3180),
  fetched 16:07:00Z.
- It was transcribed by eye into
  `evidence/bhdemocrats-endorsements-november-2026.md`, so `mode` is
  `transcribed`.
- Every `statement` is the transcribed line for its item: ☑ is the card's
  check box and ☒ its X box.
- Not used: the 10-19 pass found no November picks. Blue Voter Guide
  (https://bluevoterguide.org/endorser-org/Bernal_Heights_Democratic_Club/CA/2533)
  lists six picks under "General on November 3, 2026" and cites the club's
  June page (https://bhdemocrats.org/index.php/endorsements-june-2026). All
  six match the card.

## Extracted: 47 positions

- **Federal:** CD-11 Connie Chan.
- **Statewide:**
  - `endorse`: Rob Bonta (AG), Shirley N. Weber (SoS), Jane Kim (Insurance)
    and Richard Barrera (SPI).
  - `abstain`, because the card says "NO ENDORSEMENT": Governor, Lt Governor,
    Controller and Treasurer.
- **BOE D2:** Sally J. Lieber.
- **AD-17:** `abstain` ("NO ENDORSEMENT").
- **State props (14):**
  - Yes on 1, 2, 3, 4, 5, 38, 40 and 44.
  - No on 37, 39, 41, 42, 43 and 45.
- **SF offices:**
  - Assessor-Recorder Joaquin Torres and Public Defender Manohar Raju.
  - Supervisor D8: Gary McCoy `rank: 1` and Michael T. Nguyen `rank: 2`.
    The card prints "#1 GARY MCCOY #2 MICHAEL NGUYEN".
  - Community College Board (full term): Leah LaCroix, Jeremy Lee and Bunny
    McFadden.
  - Community College Board, Partial Term: `abstain` ("NO ENDORSEMENT").
  - Board of Education: Virginia Cheung, Ryan Hazelton and Reina Tello.
- **SF props:**
  - Yes on B, C, H, I and J. No on A, D, E and F.
  - Prop G is `abstain`: the card says "NO POSITION".
- **Regional Measure RTM:** Yes.
- **Totals:** 40 positions with a choice and 7 `abstain`. All are the club's
  own picks; none are republished from another org.
- **Ballot names:** `choice` uses the ballot spelling (Shirley N. Weber,
  Sally J. Lieber, Michael T. Nguyen), with the ballot `choice_id` from the
  SoS, SF Department of Elections and Alameda (RTM) listings.
  - `normalize-choices.ts` skips this bundle while it is untracked, so the
    ids were matched by hand, by exact title and choice.
  - Re-run `normalize-choices` once the bundle is committed to confirm.

## Skipped

- **Supreme Court and 1st District Court of Appeal:** the card says "SUPREME
  COURT OF THE STATE OF CALIFORNIA NO ENDORSEMENT" and "CA COURT OF APPEALS,
  1ST APPELLATE DISTRICT NO ENDORSEMENT". It covers the courts as a whole
  and names no justice. Recording it would mean inventing one `abstain` per
  retention subject, so it was left out.
- **Not on the card:** BART District 8 and AD-19.

## Flags for review

- **Slug:** renamed by the coordinator to `bernal-heights-democratic-club` (from `bernal-heights-dems`) to match the other SF clubs. Other
  SF clubs use the long form (for example `noe-valley-democratic-club`).
  Rename before the first commit if consistency matters.
- **"No Endorsement" lines** are `abstain` per SPEC §3.6 and the round-2b
  rule ("No Position", "No Endorsement" → `abstain`).
- **Prop 4 and Prop 38 are Yes.** Both were checked twice against the
  full-size crop: ☑ YES on both.
- **Transcription:** the image was read whole and in six crops. The small
  print is clear, but a second reader should spot-check the 25 measure
  lines.
