# NOTES — United Educators of San Francisco, Nov 3 2026 general

## Sources

- https://uesf.org/our-work/political-action/ (HTML): the "UESF Local &
  State Endorsements" list.
- https://uesf.org/wp-content/uploads/2026/10/UESF-Voter-Guide-PDF-FINAL.pdf
  ("UESF 2026 Voter Guide", one page). The HTML page links to it as
  "Download Voter Guide Here". It was downloaded and converted with
  `pdftotext -layout`. The PDF adds Prop H, RTM, and state Props 40–43,
  which the HTML list does not have. Because some positions come from a
  PDF, `mode` is `transcribed`.

## Extracted: 24 positions

- Races (14): Board of Education (Tello, Cheung, Hazelton), Community
  College Board (McFadden, LaCroix, Lee), CD-11 Chan, D8 (McCoy, Nguyen,
  Patel), D10 (Brookter #1, Eppler, Deandra Bryant), and SPI Barrera.
- Measures (10): SF Yes on B, H, I and RTM, and No on D. State Yes on 3 and
  40, and No on 41, 42 and 43.

## Review flags

- **D10 ranking.** The guide says "Dion-Jay (DJ) Brookter (#1), J.R.
  Eppler (unranked), and Deandra (unranked)". Brookter has weight 1.
  Eppler and Bryant are plain `endorse` with no weight. Check this
  encoding.
- **"Deandra".** Only the first name is given. The only D10 candidate
  named Deandra on the SF qualified list is Deandra Bryant, so the choice
  is "Deandra Bryant".
- **D8.** McCoy, Nguyen and Patel are listed together with no ranking, so
  all three are plain `endorse`.
- **PDF layout.** The PDF has two columns, so pdftotext interleaves lines.
  The quotes in statements were reassembled from one column at a time.
  For example, "YES on Prop 40: Billionaires tax to protect healthcare"
  spans two lines of the right column.
- All candidates are on the SF qualified list.
