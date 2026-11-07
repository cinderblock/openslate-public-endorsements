# NOTES — OCBC BIZPAC, Nov 3 2026 general

## Sources

- https://ocbc.org/government-affairs/bizpac/ ("Endorsed Candidates",
  HTML, scraped). It has one card per candidate (name, office, a short
  blurb), grouped as Federal, State, Supervisor and Local. The page also
  has leftover placeholder text ("Announced Soon", "To be written", "Check
  back soon for Endorsed Candidates"), so the list may still grow.
  Re-scrape before Election Day.
- The endorsing body is BIZPAC, OCBC's sponsored PAC, not OCBC itself.
  The attribution names it "OCBC BIZPAC (Orange County Business Council)".
- No press release for 2026 endorsements was found on
  https://ocbc.org/news-media/press-releases/ (only 2024 ones).
- The page takes no position on propositions or measures.

## Extracted: 24 positions

- Congress: CD 40 Young Kim, CD 45 Derek Tran.
- Legislature: AD 74 Davies, AD 71 Sanchez, AD 68 Penaloza, SD 36
  Strickland, SD 34 Valencia.
- Supervisor D5: Foley.
- Local: 16 (4 mayors, 11 council races, 1 school board).

## Skipped

- "John Park — Irvine City Council". No district is given, and Irvine D1,
  D5 and D6 are all on the ballot. The OCGOP and Lincoln Club guides both
  list John Park for Irvine District 1, so this is almost certainly D1,
  but it was left out because this source doesn't say. A reviewer may add
  it as `Irvine City Council, District 1`.

## Judgment calls / review flags

- **Wrong chamber on two cards.** "Tony Strickland — California State
  Assembly, 36th District" and "Avelino Valencia — California State
  Assembly, 34th District". Strickland's blurb calls him "Senator Tony
  Strickland", and Valencia's says he "is seeking to represent the 34th
  Senate District". Neither is on the AD 36 or AD 34 ballot (SOS certified
  list), but they are the SD 36 and SD 34 finalists. Both were encoded as
  State Senate, and each statement quotes the card plus the clarifying
  line.
- "Mission Viejo, 2nd District" and "Mission Viejo City Council, 4th
  District" map to the registrar's short-term seats: "Mission Viejo City
  Council, District 2 (Short Term)" and "District 4 (Short Term)".
- CD 40 is R-vs-R (Ken Calvert vs. Young Kim). BIZPAC backs Kim.
- AD 68 is D-vs-D (Jessie Lopez vs. David Penaloza). BIZPAC backs
  Penaloza.
- The supervisor race reuses the existing `us/ca/orange` subject; see the
  oc-democratic-party NOTES about the slug clash.

## Refresh 2026-10-30

Re-fetched https://ocbc.org/government-affairs/bizpac/ on 2026-10-30 9:48 AM PDT (16:48Z). Evidence: `ocbc-bizpac-2026-10-30.md`. Four new cards: CD 46 Lou Correa, Santa Ana
Ward 4 Phil Bacerra, Coast CCD Area 1 Austin Edsell, Anaheim D3 Natalie Rubalcava. The Strickland and Valencia
cards now say State Senate, so the "wrong chamber" flag above is resolved. Also added **John Park, Irvine
District 1**, skipped on 10-19: the card still gives no district, but the OC Registrar lists him only in
District 1. The page still has "Announced Soon" and "To be written" placeholders.
