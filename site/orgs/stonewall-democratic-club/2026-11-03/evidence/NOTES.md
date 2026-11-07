# NOTES — Stonewall Democratic Club, Nov 3 2026 general

## Source

- https://www.stonewalldems.org/2026_stonewall_endorsed_candidates (HTML,
  scraped 2026-10-19T22:46:08Z). Headed "November 2026 Stonewall Democratic
  Club Endorsements" and "We will be supporting these candidates on the
  November ballot!". Markers: `+` LGBTQ+, `*` incumbent, `^` pick-up
  opportunity. The page HTML contains the whole list twice; it was
  de-duplicated. The duplicate lines (Pasadena CCD Area 1 Pollara, WeHo
  Byers) were counted once.
- The home page announces an October 26, 2026 general membership meeting
  that "may include endorsements". The list may grow after that date.

## Extracted: 116 positions (all `endorse`)

- Statewide (7): Becerra, Ma, Bonta, Weber, Cohen, Kounalakis, Barrera.
- LA County (5): Sheriff Luna. Superior Court Office 64 Ghobadi, 65 Slotky
  Reitano, 87 DeJute, 131 Tryfman.
- US House (18): CD 6, 22, 27, 28, 29, 30, 31, 32, 34, 36, 37, 38, 39, 41,
  42, 43, 44, 48.
- State Assembly (16): AD 40, 42, 43, 44, 49, 51, 52, 54, 55, 57, 60, 61,
  62, 65, 67, 72. State Senate (4): SD 20, 24, 28, 36.
- City of LA (4): Mayor Bass, City Attorney Roy, CD 3 Girvan, CD 9
  Mazariegos.
- Municipal, school and special district (47): Alhambra D5, Burbank council
  (3), Culver City council, Culver City USD (3), El Monte Mayor, El Segundo
  council, Hacienda La Puente USD Area 2, Lawndale ESD TA 1, Montebello D1,
  Mountain View SD, Pasadena CCD TA 1, Pasadena USD D1, Santa Clarita council
  D2/D4/D5, Santa Clarita CCD TA 1, SCV Water Div 1/3, Hart UHSD TA 2/5,
  Santa Monica council (3), SMCCD (4), SMMUSD (4), West Covina D2, West
  Hollywood council (3), Fontana Mayor, Monterey Park D1, Riverside Ward 2,
  San Bernardino Wards 2 and 4, LACCD Seats 2/4/6.
- Measures (15): Props 1, 3, 4, 5, 40 Yes; Props 39, 41, 42, 43, 44 No. LA
  County Measures A and E Yes. LA City PRK Yes. Santa Monica RR and VV Yes.
  Props 2, 37, 38 and 45 are not on the page.

## Skipped

- **"Under Consideration"** (no pick yet): Board of Equalization, AD 66,
  SD 26.
- **Outside California:** AZ-6 (JoAnna Mendoza), NH Senate (Chris Pappas).
- **Not on the Nov ballot:** Pasadena Area CCD Trustee Area 7 (Alton Wang).
  The LA County RR/CC candidate list for Nov 3 has PCCD contests only for
  Areas 1, 3 and 5. NOTE: four other bundles carry an "Area 7" subject; a
  reviewer may want to check it.
- **"PREVIOUS 2026 ENDORSEMENTS — Election Completed"** (primary-decided
  races, not carried): LA County Assessor Prang; Supervisor D1 Durazo, D3
  Horvath; Superior Court Offices 2, 14, 60, 66, 81, 181, 196; LA City
  Council CD 1, 5, 7, 13, 15; Covina Treasurer; Glendale Clerk, Treasurer
  and Council (3); Lancaster Council (2); Long Beach CD 5 Kerr; Pasadena
  CD 7 Lyon; San Dimas D2; San Fernando Council (2); LAUSD D2 Rivas;
  Glendale CCD TA 2/3.

## Flags for review

- **Page layout:** the "Proposition ..." and "Local Measures" blocks come
  *after* the "PREVIOUS 2026 ENDORSEMENTS — Election Completed" heading, both
  in the page text and in the HTML. They are clearly Nov 3 measures (Props
  1–44, LA County A/E, LA City PRK, Santa Monica RR/VV) and are included. The
  Santa Monica Measure VV line is cut off mid-sentence on the page ("Extends
  just-cause protections to renters of single-family").
- **`choice` spellings follow existing repo strings** for collation, which
  sometimes differ from the page or the ballot: "Gilbert R. Cisneros Jr." →
  Gil Cisneros; "Linda Sánchez" → Linda Sanchez (repo majority); "Isaac G.
  Bryan" → Isaac Bryan; "Corey A. Jackson" → Corey Jackson; "Mark González"
  → Mark Gonzalez; "Steven F. Veres" → Steve Veres; "Joseph Salas" → Joe
  Salas; "Jocelyn “Joz” Sida" → Joz Sida; "Christian Thomas Shaughnessy" →
  Christian Shaughnessy; "Stephen J. Post" → Stephen Post; "Chelsea Lee
  Byers" → Chelsea Byers; "Leslie H. Garcia" → Leslie Garcia; "Noah M. Ropp"
  → Noah Ropp; "Jennifer R. Bagley" → Jennifer Bagley; "Johnathon “Johnny”
  Yoder" → Johnny Yoder; "Daniel Ivanov" (the ballot name) → Danny Ivanov
  (repo majority; one other bundle uses "Daniel Ivanov"); "Luis Barrera
  Castañón" → Luis Barrera Castañon (existing string; the ballot is all
  caps, "CASTANON"). "Kera Blades-Snell" keeps the ballot hyphen, although
  one existing bundle has "Kera Blades Snell".
- **Riverside Ward 2:** the page says "Aram “Ayra” Ayrapetyan". The existing
  repo choice is "Aram Ayra", which is used here. The Riverside ballot name
  was not verified.
- **Monterey Park:** the page says "City Council, District 1". The LA County
  list confirms Thomas Wong is in the 1st District contest, but the existing
  repo title is "Monterey Park City Council" with no district. That title
  was reused; it may need a district suffix repo-wide.
- **Invented titles** (no existing subject): "El Monte Mayor"
  (`us/ca/el-monte`) and "Pasadena Unified School District Board, District 1"
  (`us/ca/los-angeles-county`).
- **Verification:** state and federal finalists were checked against the SoS
  Certified List (Aug 27 2026). LA County contests were checked against the
  LA County RR/CC Nov 3 candidate list. Fontana, Riverside and San Bernardino
  picks match subjects/choices already in the repo.
