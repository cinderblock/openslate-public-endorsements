# NOTES — Los Angeles Area Chamber of Commerce (L.A. Jobs PAC), Nov 3 2026 general

## Sources

- https://lachamber.com/2026-voter-guide (HTML, scraped). Headed "L.A. Jobs
  PAC 2026 Voter Guide", "General Election: Tuesday, November 3, 2026",
  "Sponsored by Los Angeles Area Chamber of Commerce". Every position cites
  this page.
- https://lachamber.com/clientuploads/pdf/2026/26_Voter-Guide.pdf, the PDF
  edition, linked from the Oct 8 2026 blog post below (through a
  marketing.lachamber.com tracking redirect). Same picks as the HTML. Kept
  as a cross-check only, so `mode` stays `scraped`.
- https://lachamber.com/blog/2026/10/08/the-business-voice/los-angeles-let-s-turn-out-in-numbers/
  (CEO Maria S. Salinas): the guide "lays out where the Chamber stands on key
  measures ... It also provides endorsements on key races taken by the L.A.
  Jobs PAC."
- https://lachamber.com/center-for-business-advocacy/l.a.-jobs-pac-2026-endorsements/
  is an OLDER, primary-era page. It is still live and undated, and it lists
  June-only measures (LA City Props TT and TC, LA County Measure ER) and
  primary candidates. It was saved as evidence but **not used** for any
  position, because the November guide supersedes it.

## Extracted: 25 positions

- 9 races, all `endorse` (all are certified Nov finalists):
  - LA Mayor: Karen Bass. City Attorney: John McKinney. CD 3: Timothy K.
    Gaspar (the guide says "Tim Gaspar"; the ballot name is used). CD 9: Jose
    Ugarte.
  - LA County Sheriff: Robert Luna.
  - SD 24: Brian Goldsmith. SD 26: Sara Hernandez. AD 65: Ayanna Davis
    ("Dr. Ayanna Davis"). AD 66: Paul Seo.
- 7 LA City measures: EE No, LA No, PL Yes, PRT No, PRK Yes, FD No, TE Yes.
- 9 state propositions: 1 Yes, 2 Yes, 3 No, 37 Yes, 40 No, 41 Yes,
  42 `neutral` (the guide literally says "NEUTRAL"), 43 Yes, 45 Yes.
  Props 4, 5, 38, 39 and 44 are not in the guide, so there are no positions
  for them.
- "SUPPORT" / "OPPOSE" on a measure are encoded as `endorse` with choice
  Yes / No.

## Flags for review

- **Prop TE description error.** On the HTML page the TE card repeats the PL
  description ("City Planning Department Reform ..."). The PDF gives the
  right TE title ("Property Transfer Tax Exemption for Victims of January
  2025 Fire Disaster") and "SUPPORT". The TE statement notes this.
- **The PDF's stance column is garbled** by `pdftotext -layout`: labels drift
  between rows, and PL/PRK show both "SUPPORT" and "OPPOSE". Read in order,
  the labels match the HTML exactly (city: O, O, S, O, S, O, S; state: S, S,
  O, S, O, S, NEUTRAL, S, S). The HTML is authoritative here.
- **The primary-era picks dropped from the old page** are not on the November
  guide: City Controller (Zach Sokoloff), CD 7 (Monica Rodriguez), CD 11
  (Traci Park), CD 15 (Tim McOsker), Supervisor D1 (Durazo), Supervisor D3
  (Horvath) and Assessor (Prang). City Attorney changed from Hydee
  Feldstein-Soto (June) to John McKinney (Nov). Feldstein-Soto did not
  advance.
