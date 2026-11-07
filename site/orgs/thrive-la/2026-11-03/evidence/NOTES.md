# NOTES: Thrive LA, November 3, 2026 general

## Source

- https://www.thrivelosangeles.org/voter-guide, fetched 2026-10-15T01:07:03Z. The evidence file is `thrive-la-voter-guide.md`.
  - The page is now the general-election guide: "Tuesday, November 3, 2026 General Election" and "Endorsements for every race on your general ballot".
  - The page is server-rendered HTML, so the full guide (all 13 sections) was in the response. Mode is `scraped`.
  - The "Download full guide (PDF)" link was not fetched.
- Every `statement` is a verbatim sentence from the race's "Why we endorse" text or the measure's write-up. The generator asserted each one against the fetched text.

## Extracted (50 positions)

| Section | Count | Notes |
| --- | --- | --- |
| LA Mayor | 1 | Karen Ruth Bass, as printed. In June the guide gave a joint Pratt/Bass endorsement. |
| LA City Council | 2 | CD3 Timothy K. Gaspar, CD9 Jose Ugarte |
| LA Community College District Board | 6 | Three "Either One: joint endorsement" seats. Each seat is modeled as two `endorse` positions on the same subject. |
| LA City Attorney | 1 | John McKinney |
| State Senate | 2 | SD24 Brian Goldsmith, SD26 Sara Hernandez |
| State Assembly | 5 | AD51 Zbur, AD55 Ashley M. Brown, AD57 Constance Jewel Menzies, AD61 Brian Lockwood, AD66 Paul Seo |
| US House | 3 | CD23 Obernolte, CD29 Luz Maria Rivas, CD34 Jimmy Gomez |
| LA City measures | 8 | Yes: TE, PRK, PRT, FD, SC. No: LA, PL, EE. |
| LA County | 1 | Sheriff Robert G. Luna |
| Superior Court | 4 | Offices 64, 65, 87, 131 |
| LA County measures | 2 | Yes on A, Yes on E |
| Statewide office | 1 | Insurance Commissioner Ben Allen. This is the only constitutional office the guide lists. |
| State props | 14 | Yes: 1, 2, 4, 37, 39, 41, 42, 43, 45. No: 3, 5, 38, 40, 44. |

## Judgment calls

- **AD57 Menzies.** The guide endorses Menzies explicitly ("We are endorsing her anyway"). It also says it is a protest vote against the DSA-endorsed incumbent, so the `statement` quotes that framing. The stance stays `endorse` because the guide uses the endorsement badge.
- **Joint endorsements (LACCD Seats 2, 4, 6).** These follow the June convention: two `endorse` positions per seat, and the statement quotes the "either one" sentence.
- **Scope note from the guide.** Thrive LA says it only lists races where it "identified a DSA-backed or affiliated candidate". Missing races (e.g. Governor) are deliberate omissions by the org, not scrape gaps.
- **Every race verified on the Nov 3 ballot.**
  - State and federal candidates were checked against the SoS Certified List of Candidates (8/27/2026): https://elections.cdn.sos.ca.gov/statewide-elections/2026-general/cert-list-candidates.pdf
  - LA City, County and judicial races were cross-checked against the LA Forward and LA Fed November guides.
  - June picks that are absent from the November guide are not carried over. Examples: Pratt (mayor), Feldstein Soto (city attorney; LA Forward says she "came in third"), Sokoloff (controller, no November race in the guide), and Mahan (governor; the certified Nov ballot is Becerra vs Hilton).

## Titles

- LA City measures use `Los Angeles City — Measure <X> (<official ballot label, title-cased>)`. The labels come from the guide's reproduction of the ballot label, e.g. "CHARTER AMENDMENT PRK" becomes "City Department of Recreation and Parks Budget".
  - The June bundle used "Proposition CB". November uses "Measure" because both LA guides refer to these as "Measure X", and the ballot labels mix "Proposition", "Charter Amendment" and "Initiative Ordinance".
  - The same titles are used in the la-forward, sierra-club-angeles and la-county-federation-of-labor bundles.
- Superior Court races now carry the office number (`Superior Court of Los Angeles County, Office 64`). This matches LA Forward. Thrive's June bundle had no office numbers.
- LACCD: `Los Angeles Community College District Board, Seat N`. This follows the `<District> Board, <area>` convention used by the June LAUSD and SD bundles.
