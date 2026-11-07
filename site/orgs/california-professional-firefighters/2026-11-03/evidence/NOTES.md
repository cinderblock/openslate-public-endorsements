# NOTES — California Professional Firefighters, Nov 3 2026 general

## Sources

- https://cpfelectionguide.org/ ("Digital Election Guide — CPF
  Recommendations: 2026 General Election"; HTML, scraped with curl; linked
  from https://www.cpf.org/). Each list item pairs an office label with a
  name or position.

## Extracted: 177 positions

- 14 propositions:
  - "YES (CPF Supports)" / "YES (CPF Strongly Supports)" → Yes: 1, 2, 3, 42.
  - "NO (CPF Opposes)" / "NO (CPF Strongly Opposes)" → No: 40, 43, 45.
  - "No CPF recommendation" → `abstain`: 4, 5, 37, 38, 39, 41, 44.
- 8 statewide and 4 BOE (BOE 1 "No Recommendation" → `abstain`).
- 51 US House (46 names, 5 "No Recommendation": CD 5, 14, 22, 40, 48).
  CD 23 says "Pending" and is omitted.
- 20 State Senate (SD 26 "NO CPF ENDORSEMENT" → `abstain`).
- 80 Assembly (AD 75 "NO CPF ENDORSEMENT" → `abstain`).

## Stance choice

The guide says "California Professional Firefighters recommends candidates
based on where they stand on firefighter issues" and labels everything
"Recommendations". Per the shared brief, candidate picks are `lean_for`.
Measures carry explicit "CPF Supports"/"CPF Opposes", so they are
`endorse` Yes/No.

## Top-two check

All candidates were checked against the SOS Certified List of Candidates
for Nov 3 2026 (8/27/2026,
https://elections.cdn.sos.ca.gov/statewide-elections/2026-general/cert-list-candidates.pdf).
All are on the general ballot in the listed district.

## Review flags

- **Federal picks are the IAFF's.** The page says "NOTE: Federal
  recommendations provided by IAFF." and the section is headed "IAFF
  Federal Office Recommendations". They are kept because CPF publishes them
  as part of its guide, and each statement names the section. A reviewer
  may prefer to drop the 51 CD positions or move them to an IAFF bundle.
- **Name spellings corrected to the ballot** (the original is in each
  statement): "Mike Mcguire" → Mike McGuire, "Mark Desaulnier" → Mark
  DeSaulnier, "Jaqui Irwin" → Jacqui Irwin, "Nanette Baragan" → Nanette
  Barragán, "Anamarie Farias" → Anamarie Avila Farias, "Andrae Gonzalez" →
  Andrae Gonzales (AD 35), "LaShae Collins-Sharp" → LaShae Sharp-Collins,
  "Jose Solache" → José Luis Solache, "Christopher Ward" → Chris Ward.
- Local endorsements are per IAFF local, behind a "Please enter your IAFF
  local number" gate. Not used.

## Republished from IAFF (not copied; in `iaff`)

The guide's "IAFF Federal Office Recommendations" section is the International
Association of Fire Fighters' US House list, republished by CPF. Per the catalog's
no-duplicates rule these 51 positions moved out of this bundle on 2026-10-19 and
now live in `orgs/iaff/` (attributed to IAFF, sourced from this same page). Once
adopt-by-reference ships (SPEC §3.10), this bundle should `adopts` the IAFF slate.
Source: https://cpfelectionguide.org/

- CD 1: Mike McGuire
- CD 2: Jared Huffman
- CD 3: Ami Bera
- CD 4: Mike Thompson
- CD 5: no recommendation
- CD 6: Richard Pan
- CD 7: Doris Matsui
- CD 8: John Garamendi
- CD 9: Josh Harder
- CD 10: Mark DeSaulnier
- CD 11: Connie Chan
- CD 12: Lateefah Simon
- CD 13: Adam Gray
- CD 14: no recommendation
- CD 15: Kevin Mullin
- CD 16: Sam Liccardo
- CD 17: Ro Khanna
- CD 18: Zoe Lofgren
- CD 19: Jimmy Panetta
- CD 20: Vince Fong
- CD 21: Jim Costa
- CD 22: no recommendation
- CD 24: Salud Carbajal
- CD 25: Raul Ruiz
- CD 26: Jacqui Irwin
- CD 27: George Whitesides
- CD 28: Judy Chu
- CD 29: Luz Rivas
- CD 30: Laura Friedman
- CD 31: Gil Cisneros
- CD 32: Brad Sherman
- CD 33: Pete Aguilar
- CD 34: Jimmy Gomez
- CD 35: Norma Torres
- CD 36: Ted Lieu
- CD 37: Sydney Kamlager-Dove
- CD 38: Hilda Solis
- CD 39: Mark Takano
- CD 40: no recommendation
- CD 41: Linda Sanchez
- CD 42: Robert Garcia
- CD 43: Maxine Waters
- CD 44: Nanette Barragán
- CD 45: Derek Tran
- CD 46: Lou Correa
- CD 47: Dave Min
- CD 48: no recommendation
- CD 49: Mike Levin
- CD 50: Scott Peters
- CD 51: Sara Jacobs
- CD 52: Juan Vargas

**Adopted by reference (2026-10-19):** these republished picks are now in `positions.json` as an `adopts` entry (SPEC §3.10) pointing at the adopted bundle's published slate: 51 from International Association of Fire Fighters (IAFF). Created with `bun scripts/adopt.ts`, which checks every pick against the adopted bundle.
