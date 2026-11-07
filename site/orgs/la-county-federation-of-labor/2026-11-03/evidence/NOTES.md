# NOTES: Los Angeles County Federation of Labor, November 3, 2026 general

## Source and method

- This is a new org. In June, the LA Fed's endorsements were image-only and no bundle was made.
- The November guide is also image-only. It is embedded on https://thelafed.org/resource/lalaborvoterguide/ ("2026 Midterm Election: LA County Federation of Labor Endorsements").
- The page and all guide images were fetched 2026-10-15T01:14:26Z. Each image was downloaded at full resolution and transcribed by reading it, so mode is `transcribed`.
- Evidence:
  - `thelafed-lalaborvoterguide.md`: page text and image list.
  - `lafed-guide-*.md`: one verbatim transcription per image.
- Small-text names were read a second time from zoomed crops: Artesia, Burbank, Carson, Compton, La Verne, Lawndale, Little Lake, Pomona USD, Rio Hondo, WRD, West Basin, Whittier and WeHo.
- Each position's `source` is the specific image URL it was read from.
- The guide gives no per-race rationale, so there are no `statement`s.
- No alternate text source turned up. The site's news posts (most recent 09.23.26) do not restate the slate.

## Extracted (176 positions)

- **Statewide offices (8):**
  - Becerra (Gov), Fiona Ma (LG), Shirley Weber (SoS), Rob Bonta (AG), Malia Cohen (Controller).
  - Eleni Kounalakis (Treasurer), Jane Kim (Insurance), Richard Barrera (SPI).
- **BOE District 3:** Mike Gipson.
- **US House (16):** CA 26, 27, 28, 29, 30, 31, 32, 34, 35, 36, 37, 38, 41, 42, 43, 44.
- **State Senate (5):** SD 20, 24, 26, 28, 30.
- **Assembly (20):** AD 39, 40, 41, 42, 43, 44, 46, 49, 51, 52, 54, 55, 56, 57, 61, 62, 65, 66, 67, 69. AD 64 is printed as "No Recommendation" and omitted.
- **LA City and County:**
  - Mayor Karen Bass, Sheriff Robert Luna.
  - CD3 Barri Worth Girvan, City Attorney Marissa Roy.
  - LACCD Seats 2, 4, 6.
  - Measure A Yes, Measure PRK Yes.
- **100 other city, school, college and water district positions** across LA County, including four local measures: Culver City AA, Bellflower SM, Pasadena PFD, South Gate UUT (all Yes).
- **State props (13):**
  - Yes: 1, 2, 3, 4, 5, 37, 40, 44.
  - No: 39, 41, 42, 43, 45.
  - Prop 38 is printed as "No Recommendation" and omitted.

## Flags for review

- **Missing guide page 7.**
  - The embedded images are pages 1, 2, 3 ("3-1"), 4, 5, 6 ("6-1"), 8 and 9, plus a "CRITICAL UNION VOTES" summary card.
  - `...-GUIDE-7.jpg` and variants return 404. WP media IDs 4834 and 4837, likely the original pages 3 and 7, return 401 (unpublished).
  - Page 6 ends with "Three Valleys" and page 8 starts with "Water Replenishment". By the alphabetical layout, page 7 would hold races between those, e.g. Torrance or Walnut. Those endorsements, if any, are missing.
  - Re-check later. The org may re-upload the page.
- **"CRITICAL UNION VOTES" card** (`...GUIDE-1.png`, uploaded 2026-10-07). It repeats a subset of the full guide (Becerra, Bass, Girvan, Roy, Luna, Measure A, Props 3/39/40/43/45, SD24, SD26, AD65, AD66). Positions are sourced to the full-guide pages, so the card adds no positions.
- **Printed spellings kept as-is.** These are flagged here, not silently corrected:
  - "Cynthina Romo" (Cudahy). LA Forward spells it "Cynthia Romo"; probably an LA Fed typo.
  - "Chris Trunkey" (Saugus USD). LA Forward has "Chris Turnkey"; one of them is a typo.
  - "Gustavo Camaco" (Pico Rivera); possibly "Camacho".
  - "Juan Munoz Guevara" (Lynwood). LA Forward has "Juan Munoz-Guevara"; Sierra has "Juan Muñoz".
  - "Jonathon Cottrel" (WeHo).
  - "Estefany Castaneda" (LA Forward: "Castañeda").
  - Collation by `choice` string will not merge these variants automatically.
- **Normalized race titles.** Box headings were mapped to official district names and shared title conventions:
  - "ANTELOPE VALLEY- EAST KERN WATER DISTRICT" became Antelope Valley-East Kern Water Agency.
  - "COLLEGE OF THE CANYONS" became Santa Clarita Community College District.
  - "COMPTON COLLEGE" became Compton Community College District.
  - "LONG BEACH CITY COLLEGE" became Long Beach Community College District.
  - "PASADENA CITY COLLEGE" became Pasadena Area Community College District (and "Seat N" became "Trustee Area N").
  - "SAGUS" became Saugus.
  - "HART SCHOOL DISTRICT" became William S. Hart Union High School District.
  - "PALMDALE SCHOOL BOARD" became Palmdale School District.
  - "WATER REPLENISHMENT DISTRICT" became Water Replenishment District of Southern California.
  - "Board Area N" became "Trustee Area N" for Saugus, Hart, Newhall and Santa Clarita CCD.
- **Monterey Park council** (Thomas Wong, Vinh T. Ngo). The guide gives no districts, so these are at-large `Monterey Park City Council` positions. Monterey Park may elect by district, and LA Forward's pick is "District 5". A reviewer may want to add districts.
- **Bellflower Measure SM and South Gate Measure UUT** have no description in the guide, so the titles carry just the letter. LA Forward's South Gate measure is a different letter (SG).
- **Burbank council.** Mike Van Gorder is listed here and by LA Forward, but he was not on a search summary of the city's 8/13/2026 qualified-candidate log. See la-forward NOTES.
- **Verification.**
  - All state and federal picks match the SoS Certified List of Candidates for Nov 3, 2026 (8/27/2026).
  - The guide is explicitly for November ("VOTE UNION STRONG ON OR BEFORE NOVEMBER 3RD!"), so local races are taken as on the November ballot.

## Refresh 2026-10-19

- **Result: no new positions (176 → 176). Guide page 7 is still missing.**
- Re-fetched https://thelafed.org/resource/lalaborvoterguide/ at 2026-10-19T21:05:03Z. New evidence file: `thelafed-lalaborvoterguide-2026-10-19.md`.
  - The page embeds the same nine guide images as on 2026-10-15.
  - Every image's `Last-Modified` header is from Oct 2 to Oct 8, so the existing transcriptions are current.
  - The WP page record was last modified 2026-10-13, also before the first capture.
- **Page 7 probes:**
  - `...-GUIDE-7.jpg`, `-7-1.jpg` and `-7-2.jpg` still return 404.
  - WP media IDs 4834 and 4837 still return 401.
  - The public media list has no other guide image. The newest uploads are event photos.
  - `/resource/la-county-federation-of-labor-endorsements/` is a 404.
- **Gap stands.** Page 6 ends at "Three Valleys" and page 8 starts at "Water Replenishment", but the guide's ordering is only loosely alphabetical (e.g. "SAGUS" follows "Santa Monica"). So it can't be confirmed that a page is actually missing rather than misnumbered. If a page 7 exists, it would likely cover races between T and W (e.g. Torrance, Walnut, Walnut Valley USD, Upper San Gabriel Valley MWD).
- `attribution.retrieved_at` updated to 2026-10-19T21:05:03Z. `attribution.sources` is unchanged.

## Not on the Nov 3 ballot: removed 2026-10-23

The catalog's ballot check found these positions on seats no ballot carries: each was uncontested and is filled by appointment in lieu of election. They were removed, since a position here has to map to a ballot entry.

- Alhambra Unified School District Board, Seat 4: Jennifer Tang. Not on the ballot: the LA County Registrar's tentative list of canceled elections for Nov 3, 2026 ("APPOINTMENT IN LIEU OF ELECTION DUE TO INSUFFICIENCY OF CANDIDATES", https://content.lavote.gov/docs/rrcc/documents/canceled-elections-november-2026-tentative.pdf) lists the seat, and it isn't in the county's contest list.
- Bellflower Unified School District Board, Area 1: Amie Stewart. Not on the ballot: the LA County Registrar's tentative list of canceled elections for Nov 3, 2026 ("APPOINTMENT IN LIEU OF ELECTION DUE TO INSUFFICIENCY OF CANDIDATES", https://content.lavote.gov/docs/rrcc/documents/canceled-elections-november-2026-tentative.pdf) lists the seat, and it isn't in the county's contest list.
- Centinela Valley Union High School District Board, Trustee Area 5: Estefany Castañeda. Not on the ballot: the LA County Registrar's tentative list of canceled elections for Nov 3, 2026 ("APPOINTMENT IN LIEU OF ELECTION DUE TO INSUFFICIENCY OF CANDIDATES", https://content.lavote.gov/docs/rrcc/documents/canceled-elections-november-2026-tentative.pdf) lists the seat, and it isn't in the county's contest list.
- Long Beach Community College District Board, Area 1: Uduak Ntuk. Not on the ballot: the LA County Registrar's tentative list of canceled elections for Nov 3, 2026 ("APPOINTMENT IN LIEU OF ELECTION DUE TO INSUFFICIENCY OF CANDIDATES", https://content.lavote.gov/docs/rrcc/documents/canceled-elections-november-2026-tentative.pdf) lists the seat, and it isn't in the county's contest list.
- Long Beach Community College District Board, Area 3: Sunny Zia. Not on the ballot: the LA County Registrar's tentative list of canceled elections for Nov 3, 2026 ("APPOINTMENT IN LIEU OF ELECTION DUE TO INSUFFICIENCY OF CANDIDATES", https://content.lavote.gov/docs/rrcc/documents/canceled-elections-november-2026-tentative.pdf) lists the seat, and it isn't in the county's contest list.
- Newhall School District Board, Trustee Area 1: Michelle Kampbell. Not on the ballot: the LA County Registrar's tentative list of canceled elections for Nov 3, 2026 ("APPOINTMENT IN LIEU OF ELECTION DUE TO INSUFFICIENCY OF CANDIDATES", https://content.lavote.gov/docs/rrcc/documents/canceled-elections-november-2026-tentative.pdf) lists the seat, and it isn't in the county's contest list.
- Paramount Unified School District Board, District 1: Sonia Olmos. Not on the ballot: the LA County Registrar's tentative list of canceled elections for Nov 3, 2026 ("APPOINTMENT IN LIEU OF ELECTION DUE TO INSUFFICIENCY OF CANDIDATES", https://content.lavote.gov/docs/rrcc/documents/canceled-elections-november-2026-tentative.pdf) lists the seat, and it isn't in the county's contest list.
- Paramount Unified School District Board, District 5: Tricia Bass-Riedel. Not on the ballot: the LA County Registrar's tentative list of canceled elections for Nov 3, 2026 ("APPOINTMENT IN LIEU OF ELECTION DUE TO INSUFFICIENCY OF CANDIDATES", https://content.lavote.gov/docs/rrcc/documents/canceled-elections-november-2026-tentative.pdf) lists the seat, and it isn't in the county's contest list.
- Pasadena Area Community College District Board, Trustee Area 7: Alton Wang. Not on the ballot: the LA County Registrar's tentative list of canceled elections for Nov 3, 2026 ("APPOINTMENT IN LIEU OF ELECTION DUE TO INSUFFICIENCY OF CANDIDATES", https://content.lavote.gov/docs/rrcc/documents/canceled-elections-november-2026-tentative.pdf) lists the seat, and it isn't in the county's contest list.

"South Gate — Measure UUT" is the ballot's Measure SG ("SOUTH GATE FISCAL EMERGENCY STREET MAINTENANCE, YOUTH PROGRAMS, PARKS FUNDING PROTECTION MEASURE", an 8% utility users tax; https://content.lavote.gov/docs/rrcc/documents/measures-appearing-on-the-ballot-7-31-2026-lira.pdf), South Gate's only measure on the county's list. Retitled to the ballot source's subject.

## Refresh 2026-10-28

- **Result: no change to positions (167 → 167). The "missing page 7" gap is closed: no page 7 exists.**
- Re-fetched https://thelafed.org/resource/lalaborvoterguide/ at 2026-10-28 9:08 AM PDT (16:08Z): `thelafed-lalaborvoterguide-2026-10-28.md`. The page was edited 2026-10-22 1:49 PM PDT (20:49Z). The edit added a Google Drive link to an English PDF of the guide and a Spanish one ("BAJA LA GUÍA DE VOTACIONES EN ESPAÑOL AQUÍ"). The embedded images are the same nine files with the same `Last-Modified` dates as before.
- **The PDFs settle page 7.** Both downloaded 9:10–9:11 AM PDT (16:10–16:11Z): `lafed-voter-guide-pdf-2026-10-28.md`.
  - The English file is `LA Fed Midterm Election Voter Guide 2026_10.13.pdf`: 9 pages, image-only. Its pages match the nine embedded images one for one, with no differing region in a pixel comparison: the "CRITICAL UNION VOTES" card, then the guide pages 1, 2, 3-1, 4, 5, 6-1, 8 and 9.
  - The upload names skip from 6 to 8, but the guide itself has no page between "Three Valleys" (6-1) and "Water Replenishment" (8). So nothing was untranscribed, and the T–W races guessed at on 10-19 (Torrance, Walnut and so on) aren't in the guide.
  - The Spanish file is `[SPANISH] LA Fed Midterm Election Voter Guide 2026_10.22.pdf`, a translation in the same nine-page layout. The pages read in full (the federal and legislative page, and the statewide measures) carry the same picks. A transcribed excerpt is in the evidence file.
- The English PDF's Drive URL was added to `attribution.sources`. No position cites it: positions keep their image-URL sources, and `mode` stays `transcribed`.
- **Other probes:** `...-GUIDE-7*.jpg` variants and `-10.jpg` return 404, and WP media 4834/4837 still return 401. The two newest uploads (2026-10-22) are an MLK Day 2027 flyer and a "No Robo Bosses" rally photo, with no endorsements. HEAD requests to the uploads now return 404 even for files that exist, so use GET.
- `attribution.retrieved_at` set to 2026-10-28T16:11:03Z.
- **Still pending:** nothing. The printed-spelling flags above (Cynthina Romo, Chris Trunkey, Gustavo Camaco and the rest) still stand; the PDF prints the same names.
