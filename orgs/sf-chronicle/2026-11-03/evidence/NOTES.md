# NOTES: San Francisco Chronicle editorial board, November 3, 2026 general

## Source

- https://www.sfchronicle.com/projects/2026/california-sf-election-endorsements/ was
  fetched 2026-10-15T01:10:12Z. Evidence:
  `sfchronicle-california-sf-election-endorsements-2026.md`.
  - The page says "Updated Oct. 14, 2026 4:31 p.m." and "Originally published on Oct. 5,
    2026".
  - The project page itself was publicly readable, unlike the June article, which was
    paywalled and needed Ballotpedia.
  - The page reports "Showing 65 of 65 available races".
  - Mode is `scraped`.
- Every `statement` quotes the page's "Why we're endorsing" blurb. The per-race "Read the
  full editorial" articles were not fetched.

## Extracted (48 positions)

- **Statewide:** Fiona Ma (Lt Gov), Shirley Weber (SoS), Malia Cohen (Controller), Eleni
  Kounalakis (Treasurer), Rob Bonta (AG), Ben Allen (Insurance) and Richard Barrera (SPI).
- **State props:** Yes on 1, 3 and 37. No on 4, 5, 38, 39, 41, 42 and 44.
- **US House:** Scott Wiener (CD-11) and Aisha Wahab (CD-14).
- **Judicial retention, all "Yes":**
  - Supreme Court: Evans and Groban.
  - 1st District Court of Appeal: 11 justices.
  - 6th District Court of Appeal: 5 justices.
- **Regional Measure RTM:** Yes.
- **SF Supervisor D4:** Alan Wong.
- **SF Props:** Yes on A, C, D, E, F and H. No on B, G and I.

## Judgment calls (please review)

- **Lt Governor (Fiona Ma)** is recorded as `endorse`. The board lists her under "The
  editorial board recommends", but the blurb says "we cautiously recommend Ma". Downgrade
  it to `lean_for` if you read "cautiously" as hedged.
- **6th District Court of Appeal justices** use the title `California Court of Appeal,
  Sixth District — Retain Justice <name>` with jurisdiction `us/ca/coa-6`. They are not on
  the SF ballot but are on ballots in the Chronicle's coverage area (South Bay).
- **CD-14:** the page labels Wahab "Member of Congress ▪ Incumbent". That is consistent
  with news reports that she won the Aug 18, 2026 special election for the seat Swalwell
  vacated. The Nov 3 race is Wahab vs. Melissa Hernandez, the June top two.

## Skipped

- **"Coming Soon" (no pick yet):**
  - Offices: Governor and SF Supervisor D2, D6, D8 and D10.
  - SF Board of Education and SF Community College Board.
  - Measures: Props 2, 40, 43 and 45, SF Prop J, and Oakland Measure EE.
  - Re-scrape later; the board is still publishing.
- **State Board of Equalization D1 and D2:** both read "It's complicated", and the board
  "writes that the Board of Equalization shouldn't exist." There is no named pick, so they
  were omitted. In June the board endorsed John Pimentel for D2.

## Not carried forward from June

- **Governor:** Katie Porter did not advance. Nov is "Coming Soon".
- **Lt Governor:** Michael Tubbs did not advance. Nov pick is Fiona Ma.
- **Insurance Commissioner:** Patrick Wolff did not advance. Nov pick is Ben Allen.
- **BOE D2:** John Pimentel. Nov is "It's complicated", with no pick.
- **SF Supervisor D2:** Stephen Sherrill. Nov is "Coming Soon".
- **Superior Court picks (Phoebe Maffei SF, Michael P. Johnson Alameda, Jesse J. Hsieh
  Contra Costa):** none appear on the Nov page.

## Title conventions

See `orgs/grow-sf/2026-11-03/evidence/NOTES.md`, which covers:

- the retention-title format,
- RTM,
- the sf.gov prop titles,
- the SoS prop-title check, which found no discrepancies.
