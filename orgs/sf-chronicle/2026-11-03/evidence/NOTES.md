# NOTES: San Francisco Chronicle editorial board, November 3, 2026 general

## Source

- **Refresh 2026-10-19:** the same page was re-fetched 2026-10-19T21:01:14Z with `curl`
  and a browser User-Agent (page header "Updated Oct. 19, 2026 5:48 a.m."). Evidence:
  `sfchronicle-california-sf-election-endorsements-2026-2026-10-19.md`. See "Refresh log"
  below for what changed.
- https://www.sfchronicle.com/projects/2026/california-sf-election-endorsements/ was
  first fetched 2026-10-15T01:10:12Z. Evidence:
  `sfchronicle-california-sf-election-endorsements-2026.md`.
  - The page says "Updated Oct. 14, 2026 4:31 p.m." and "Originally published on Oct. 5,
    2026".
  - The project page itself was publicly readable, unlike the June article, which was
    paywalled and needed Ballotpedia.
  - The page reports "Showing 65 of 65 available races".
  - Mode is `scraped`.
- Every `statement` quotes the page's "Why we're endorsing" blurb. The per-race "Read the
  full editorial" articles were not fetched.

## Extracted (53 positions; 48 on 10-14, plus 5 added 10-19)

- **Statewide:** Fiona Ma (Lt Gov), Shirley Weber (SoS), Malia Cohen (Controller), Eleni
  Kounalakis (Treasurer), Rob Bonta (AG), Ben Allen (Insurance) and Richard Barrera (SPI).
- **State props:** Yes on 1, 2, 3 and 37. No on 4, 5, 38, 39, 41, 42, 44 and 45.
- **US House:** Scott Wiener (CD-11) and Aisha Wahab (CD-14).
- **Judicial retention, all "Yes":**
  - Supreme Court: Evans and Groban.
  - 1st District Court of Appeal: 11 justices.
  - 6th District Court of Appeal: 5 justices.
- **Regional Measure RTM:** Yes.
- **SF Supervisors:** Stephen Sherrill (D2), Alan Wong (D4), Matt Dorsey (D6) and Gary
  McCoy (D8).
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

- **"Coming Soon" (no pick yet, as of the 10-19 fetch):**
  - Offices: Governor and SF Supervisor D10.
  - SF Board of Education and SF Community College Board.
  - Measures: Props 40 and 43, SF Prop J, and Oakland Measure EE.
  - Re-scrape later; the board is still publishing. A web search on 10-19 found no
    standalone Chronicle editorial for these that the project page had not yet picked up.
- **State Board of Equalization D1 and D2:** both read "It's complicated", and the board
  "writes that the Board of Equalization shouldn't exist." There is no named pick, so they
  were omitted. In June the board endorsed John Pimentel for D2.

## Not carried forward from June

- **Governor:** Katie Porter did not advance. Nov is "Coming Soon".
- **Lt Governor:** Michael Tubbs did not advance. Nov pick is Fiona Ma.
- **Insurance Commissioner:** Patrick Wolff did not advance. Nov pick is Ben Allen.
- **BOE D2:** John Pimentel. Nov is "It's complicated", with no pick.
- **Superior Court picks (Phoebe Maffei SF, Michael P. Johnson Alameda, Jesse J. Hsieh
  Contra Costa):** none appear on the Nov page.

## Title conventions

See `orgs/grow-sf/2026-11-03/evidence/NOTES.md`, which covers:

- the retention-title format,
- RTM,
- the sf.gov prop titles,
- the SoS prop-title check, which found no discrepancies.

## Refresh log

### 2026-10-19

- All 48 positions from the 10-14 capture are still on the page, with the same picks. No
  changes to existing positions. (The 1st and 6th District retention lists were re-ordered
  on the page; picks are unchanged.)
- **Added (5):**
  - Prop 2: Yes ("Voters should pass Prop 2 ...").
  - Prop 45: No.
  - SF Supervisor D2: Stephen Sherrill ("We endorse him for a full term."). This matches
    the board's June pick for D2.
  - SF Supervisor D6: Matt Dorsey.
  - SF Supervisor D8: Gary McCoy. The blurb opens "While we don't agree with all of
    McCoy's policy positions". It is listed under "The editorial board recommends", like
    every other pick, so it is recorded as `endorse`.
- SF supervisor races have no June primary (ranked-choice in November), so the top-two
  filter does not apply.
