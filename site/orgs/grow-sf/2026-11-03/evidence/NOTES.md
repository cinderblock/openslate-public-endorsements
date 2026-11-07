# NOTES: GrowSF, November 3, 2026 general

## Source

- https://growsf.org/voter-guide/san-francisco-voter-guide-november-2026-election/
  was fetched 2026-10-15T01:06:26Z. The page header says "Updated: October 14, 2026".
  Evidence: `growsf-voter-guide-november-2026.md`.
- Mode is `scraped`: everything came from HTML.

## Extracted (66 positions)

- **SF offices:** Board of Education (Phil Kim, Autumn Brown Garibay, Tim Tung),
  Community College Board (Elijah Ball, Monroe Lace, Erwin Tam), Community College Board
  Partial Term (Ruth Ferguson), BART Board District 8 (Sara Barz), Assessor-Recorder
  (Joaquín Torres), Public Defender (Mano Raju), and Supervisors D2 Sherrill, D4 Wong,
  D6 Dorsey, D8 Patel and D10 Ellington.
- **SF Props A–J:** Yes on A, C, D, E, F, H and J. No on B, G and I.
- **Regional Measure RTM:** Yes.
- **Statewide offices:** Becerra (Gov), Fiona Ma (Lt Gov), Weber (SoS), Cohen (Controller),
  Kounalakis (Treasurer), Bonta (AG), Ben Allen (Insurance), John Pimentel (BOE D2) and
  Richard Barrera (SPI).
- **Assembly:** Haney (AD-17) and Stefani (AD-19).
- **US House:** Wiener (CD-11) and Mullin (CD-15).
- **Judicial retention:** Yes on 2 Supreme Court justices and 11 First District Court of
  Appeal justices.
- **State props:** Yes on 1, 2, 3, 5, 37, 41, 42, 43 and 45. No on 4, 38, 39, 40 and 44.

## Judgment calls (please review)

- **`lean_for` instead of `endorse`:** two positions.
  - Public Defender Mano Raju: "we're giving him a weak endorsement".
  - Prop 2: "consider this endorsement a weak yes".
- **Preliminary endorsements:** Becerra (Gov), Weber (SoS) and Mullin (CD-15) are labelled
  "Preliminary endorsement — … has not returned our questionnaire." I kept them as
  `endorse` because the guide says "We recommend voting for …". The preliminary label is
  quoted in each `statement`.
- **D8:** Patel is recommended "as your #1 choice". GrowSF names no #2, so only Patel is
  recorded, with no weight.
- **Judicial retention:** GrowSF names the two Supreme Court justices and lists the 11
  First District justices under "Who's running?", saying "We recommend voting Yes to retain
  all eleven Court of Appeal justices on your ballot." Each justice became one `measure`
  position with choice "Yes".
- **Prop titles:** GrowSF's summary uses initiative short names, e.g. "The 2026
  Billionaire Tax Act" for Prop 40. Subject titles use the official SoS / sf.gov titles,
  matched by proposition number or letter.

## Not carried forward from June (pick not on the Nov ballot, or GrowSF changed it)

- **Governor:** GrowSF backed Matt Mahan in June. He did not advance; GrowSF now backs
  Becerra.
- **Lt Governor:** Josh Fryday. The guide says he "finished third and didn't advance". Now
  Fiona Ma.
- **Insurance Commissioner:** Patrick Wolff. The guide says he "lost". Now Ben Allen.
- **SPI:** Josh Newman. Now Richard Barrera.
- **BOE D2:** Sally Lieber. GrowSF says it "decided to change our endorsement to John
  Pimentel for the general election".
- **Superior Court Seat 16 (Phoebe Maffei):** the race is not in the November guide.
- **June SF Props A–D:** June-only measures.

## Title / jurisdiction conventions introduced here (new in Nov; no June precedent)

These are shared with the other SF bundles in this batch. Please normalize across
batches if another agent picked different strings.

- `San Francisco Community College Board`, and `San Francisco Community College Board, Partial Term`. The official sf.gov contest names are "Community College Board (3 seats)" and "Community College Board Partial Term".
- `San Francisco Assessor-Recorder`, `San Francisco Public Defender` (jurisdiction `us/ca/sf`).
- `BART Board of Directors, District 8`, jurisdiction `us/ca/bart-8`.
- `Bay Area — Regional Measure RTM (Regional Transit Measure)`, jurisdiction `us/ca/bay-area`. sf.gov lists it under "Regional Measures" as "RTM - Regional Transit Measure".
- Judicial retention uses kind `measure` and choice "Yes"/"No":
  - `California Supreme Court — Retain Justice <Full Name>` (`us/ca`).
  - `California Court of Appeal, First District — Retain Justice <Full Name>` (`us/ca/coa-1`).
- SF prop titles follow https://www.sf.gov/qualified-ballot-measures (fetched
  2026-10-15T01:10:52Z). The curly apostrophe in Prop E ("City Administrator's
  Authority…") was straightened.
- State prop titles were checked against the SoS qualified-measures page (fetched
  2026-10-15T01:11:51Z). They match the titles supplied, with no discrepancies.
