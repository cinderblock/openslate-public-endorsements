# NOTES — Ventura County Republican Party (Ventura GOP), Nov 3 2026 general

## Sources

- https://www.venturagop.org/2026-general-election-voter-guides (site nav
  label "ENDORSEMENTS"): "2026 GENERAL ELECTION — Voter Guides — View the
  Ventura GOP Voter Guides for Each District". It shows five flyer images,
  one per Board of Supervisors district, each linked to Google Drive.
- The five flyers were downloaded at full size from static.wixstatic.com
  (2250x3000 and 2550x3300 JPEGs) and **transcribed by reading the
  images**. One evidence file per image:
  `venturagop-voter-guide-district-1.md` … `-5.md`. Hence
  `attribution.mode: transcribed`.
- Positions cite the voter-guides page as `source` (the page that shows
  the images). The image URLs are in each evidence file.
- (The domain vcgop.org redirects to a Facebook page for a different
  group, the "VC Republican Club"; not used.)

## Extracted: 78 positions (deduplicated across the five flyers)

- 7 statewide: Hilton, Romero, Wagner, Morgan, Hawks, Gates, Shaw →
  `endorse` (ballot names from the SOS list, e.g. "Donald P. (Don)
  Wagner", "Herb W Morgan", "Michael E. Gates").
- BOE District 2: John Pimentel → `lean_for` (flag 1).
- Congress: CD 24 Bob Smith, CD 26 Sam Gallucci, CD 32 Larry Thompson.
  Assembly: AD 42 Ted Nordblum, AD 46 Tracey Schroeder. → `endorse`.
- AD 38: "“don’t vote”" → `abstain`, no choice (flag 2).
- 43 local candidates → `endorse`: County Superintendent of Schools
  (Maggie Marschner), County Board of Education Areas 2 and 4, VCCCD
  Districts 2 and 5, city councils/mayors of Ventura, Thousand Oaks,
  Camarillo, Santa Paula, Simi Valley, Moorpark, Oxnard; school boards
  (Ventura USD, Pleasant Valley SD, Moorpark USD, Simi Valley USD, Las
  Virgenes USD), park districts (Conejo, Pleasant Valley, Rancho Simi),
  Fillmore-Piru Memorial District, United Water Conservation District
  Division 1, Camarillo Health Care District Zone 5.
- 14 state propositions: No on 1, 2, 3, 4, 5, 37, 38, 40, 44; Yes on 39,
  41, 42, 43, 45.
- 7 local measures: Yes on Simi Valley A and United Water D; No on Rio
  Elementary B, Santa Paula USD C, Oxnard E, Allan Hancock JCCD H, Las
  Virgenes USD LV.

## Top-two check

- State/federal: all on the SOS certified list (CD 24 Carbajal vs Bob
  Smith; CD 26 Irwin vs Gallucci; CD 32 Sherman vs Thompson; AD 42 Klein
  Lopez vs Nordblum; AD 46 Gabriel vs Schroeder; AD 38 is Bennett vs
  MacDonald, both Democrats).
- County Superintendent of Schools is a Nov runoff, Sher vs Marschner
  (KCLU 2026-06-03).
- Local races in Ventura County are November-only. The Ventura County
  registrar (venturavote.org) was unreachable (HTTP 202 bot challenge to
  curl; WebFetch: "certificate has expired"), so local names are as
  printed on the flyers and **not registrar-verified**.

## Flags for review

1. **"Endorsed & Best Choice".** The flyer does not mark which names are
   endorsements and which are "Best Choice" ("the preferred choice when
   no Republican is running and an Independent candidate is running
   against a Democrat"). I used `endorse` for every name except John
   Pimentel (BOE 2), a Democrat running against Democrat Sally Lieber, so
   he can only be a "Best Choice" pick → `lean_for`. Some nonpartisan
   local picks may also be "Best Choice"; can't tell from the flyer.
2. AD 38 "don’t vote" is an explicit instruction to skip the race →
   `abstain`.
3. Titles are shared with the Ventura County Democratic Party bundle so
   they collate (e.g. `Ventura County Board of Education, Area 2` for the
   flyer's "BOARD OF EDUCATION - DISTRICT 2"; `Pleasant Valley School
   District Board, Area 1` for "TRUSTEE AREA 1"; `Simi Valley Unified
   School District Board, Area E` for "SIMI VALLEY SCHOOL DISTRICT —
   TRUSTEE AREA E"). New ones: `Moorpark Mayor`, `Moorpark City Council,
   District 1/3`, `Simi Valley City Council, District 1`, `Pleasant Valley
   Recreation and Park District Board, District 4`, `Rancho Simi
   Recreation and Park District Board, Division 2`, `United Water
   Conservation District Board, Division 1`, `Las Virgenes Unified School
   District Board` (`us/ca/los-angeles-county`), and others listed in the
   positions file.
4. Measure titles reuse the VCDP bundle's (party descriptions; registrar
   unreachable). Las Virgenes LV and Allan Hancock H reuse existing titles.
   Allan Hancock JCCD H appears on the District 3 flyer, even though that
   district is in northern Santa Barbara County; recorded as printed.
