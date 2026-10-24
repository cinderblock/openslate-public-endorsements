# NOTES: Courage California, November 3, 2026 general

## Sources (mode: `transcribed`, because the legislative and county-measure positions come from a PDF)

1. https://couragecalifornia.org/2026-midterm-election-resources/ (HTML,
   Chrome; WebFetch got HTTP 403). Used for the three city races.
2. https://www.progressivevotersguide.com/california (HTML, Chrome). Courage's
   own digital guide ("GUIDE POWERED BY Courage California"), linked from (1).
   Used for statewide offices, Board of Equalization, all 52 US House cards,
   and all 14 statewide propositions.
3. https://couragecalifornia.org/app/uploads/2026/10/V2C-Nov2026StatewideCVG.pdf
   (PDF, linked from (1); text extracted locally with pdftotext). Used for
   State Senate, State Assembly, and county/regional ballot measures, which
   the statewide view of (2) does not show.

4. (Added 2026-10-19, local pass.) The same PDF as (3), re-downloaded
   2026-10-19T21:01:43Z and extracted with `pdftotext -raw` instead of
   `-layout`. See `courage-nov2026-statewide-cvg-pdf-local-raw-2026-10-19.md`.
   Used for local candidate races in PDF pages 5–10 that the digital guide
   does not show.
5. (Added 2026-10-19.) Per-county and per-city views of the digital guide,
   `https://www.progressivevotersguide.com/california/2026/general/{county|city}/<slug>`
   (server-rendered HTML, curl; all 58 county + 149 city views fetched
   2026-10-19 ~21:02–21:16Z). One evidence file per cited view:
   `progressivevotersguide-{city|county}-<slug>-2026-10-19.md` (33 files).
   Used as the `source` for every local race the digital guide shows (its
   write-ups are cleaner and occasionally correct the PDF, e.g. Irvine D6).

Where (2) and (3) overlap (statewide, federal, props) they agree on every
pick. Spelling differences: the PDF has "Angela Gonzalez-Torres" (CD 34) and
"Salul Carbajal" (CD 24); the digital guide has "Angela Gonzales-Torres" and
"Salud Carbajal", which match the ballot listing. The digital guide's
spellings were used.

## Extracted: 329 positions (164 on 2026-10-15 + 165 local races added 2026-10-19)

See "Local races (2026-10-19 pass)" below for the 165 added positions.

- 7 statewide: Governor Xavier Becerra, Lt. Governor Fiona Ma, AG Rob Bonta,
  SoS Shirley Weber, Treasurer Eleni Kounalakis, Controller Malia Cohen,
  Superintendent Richard Barrera. Insurance Commissioner = "No
  recommendation" (omitted).
- 4 Board of Equalization (D1 Nelson Esparza, D2 Sally Lieber, D3 Sam
  Sukaton, D4 Tom Umberg).
- 49 US House (CD 4, 21, 40 = "No recommendation", omitted).
- 15 State Senate (SD 12, 16, 22, 30, 34 = "No recommendation", omitted).
- 67 State Assembly (AD 3, 6, 8, 10, 15, 22, 32, 45, 48, 53, 59, 64, 73 =
  "No recommendation", omitted).
- 14 statewide props: Yes 1, 2, 3, 4, 5, 40; No 38, 39, 41, 42, 43, 44, 45;
  Prop 37 = "NO POSITION" in the digital guide and "Neutral" in the PDF,
  recorded as `neutral` with no choice.
- 5 county/regional measures from the PDF, all Yes: LA County Measure E,
  Regional Transit Measure (RTM), SF Prop B, SF Prop I, Berkeley Measure Z.
  The PDF's one-line descriptions are quoted in `statement`.
- 3 city races from the HTML page: LA City Attorney Marissa Roy, LA City
  Council D9 Estuardo Mazariegos, Santa Ana City Council Ward 6 Isuri Ramos.

## Ballot check (top-two)

All legislative and congressional picks cross-checked against Wikipedia's
general-election matchups (retrieved 2026-10-15 ~01:35–01:45Z); every
endorsed candidate is on the Nov 3 ballot. BOE matchups (Esparza v. Grove,
Lieber v. Pimentel, Sukaton v. Gipson, Umberg v. Bilodeau) per a search
summary of the SOS certified list. LA City Attorney (Roy v. McKinney) and LA
CD 9 (Ugarte v. Mazariegos) runoffs confirmed by June coverage. Santa Ana
Ward 6 not independently verified.

## Primary picks that did not advance (not re-endorsed for these races, or replaced)

- Governor Tom Steyer and Lt. Governor Michael Tubbs did not advance; the
  general guide endorses Becerra and Ma.
- CD 6 Lauren Babb Tomlinson: general guide endorses Richard Pan.
- AD 31 Sandra Celedon: general guide endorses Annalisa Perea.
- AD 65 Fatima Iqbal-Zubair: general guide endorses Ayanna Davis.
- AD 67 Ada Briceño: general guide endorses Mark Pulido.
- SD 16 Manpreet Kaur: did not advance; SD 16 = "No recommendation".

## Judgment calls / flags for review

- **Honorifics dropped** from `choice` for cross-org matching: "Dr. Shirley
  Weber", "Dr. Richard Pan", "Dr. Aisha Wahab", "Dr. Raul Ruiz" became
  "Shirley Weber", "Richard Pan", "Aisha Wahab", "Raul Ruiz".
- **AD 75**: the PDF spells the candidate "Gerald Bourisquot"; Wikipedia's
  matchup lists "Gerald Boursiquot". Kept the source's spelling. Verify
  against the SOS certified list.
- **County measures layout**: on PDF page 5 the four "Yes" marks for LA
  County Measure E, RTM, SF Prop B and SF Prop I are printed in a column
  beside the four descriptions (see evidence). The mapping is one-to-one,
  but it was read off a two-column layout.
- **Unofficial measure titles**: "Los Angeles County — Measure E (Ethics
  Commission and Community Investment Charter Amendment)" uses the caption
  from the Board of Supervisors' ordinance per a news/search summary. The
  Registrar's ballot caption may differ. "Berkeley — Measure Z (Parcel Tax to
  Fund a Public Bank)" is Courage's description, title-cased; the official
  Alameda County title was not located. Collation may need these retitled.
- RTM uses the title already adopted by other bundles: "Bay Area — Regional
  Measure RTM (Regional Transit Measure)", jurisdiction `us/ca/bay-area`.

## Local races (2026-10-19 pass)

### How the garbling was fixed

`pdftotext -layout` interleaves the two table columns on pages 5–10.
`pdftotext -raw` emits content-stream order, where every race label is
immediately followed by its candidate(s), so the PDF reads cleanly. The
remaining oddities are in the PDF itself, not the extraction: several race
labels are printed twice, with the second copy belonging to a different seat
(see "Seat corrections" below).

The digital guide's county/city views show only about 65 of the PDF's ~150
local cards. Where a race appears there, its view is the `source` and the
statement is the first sentence of its write-up. Otherwise the PDF is the
`source` and the statement is the PDF list line, formatted
`"<label as printed>: <candidate(s) as printed>"`.

### Added: 165 positions, by county

| County | Added | Notes |
| --- | --- | --- |
| Alameda | 16 | Berkeley (auditor, 3 council, 5 Rent Board), Dublin USD, Hayward (council, USD), Oakland (mayor, 2 OUSD), Union City |
| Contra Costa | 8 | CCCCD Wards 1 and 3, Antioch (2 council, USD), Concord, Pinole, Richmond mayor |
| Fresno | 4 | Supervisor D1, Fresno council D1 and D7, Fresno USD Area 4 |
| Kern | 1 | Bakersfield Ward 1 |
| Los Angeles | 7 | Sheriff, Burbank (3), West Hollywood (3) |
| Marin | 1 | Larkspur |
| Orange | 27 | Supervisors D4 and D5, Aliso Viejo, Anaheim school boards, Costa Mesa, Fullerton, Garden Grove, Huntington Beach (3), Irvine, Moulton Niguel WD, Santa Ana (mayor, council, SAUSD), Stanton |
| Riverside | 9 | Superior Court Office 10, Banning D4 and D5, Desert Healthcare, EMWD, Jurupa Valley, Moreno Valley (mayor, MVUSD Area 3), Nuview USD |
| Sacramento | 1 | Supervisor D1 |
| San Bernardino | 11 | County Superintendent, Fontana (3), Rancho Cucamonga, Redlands (2), Rialto, San Bernardino Wards 2 and 4, Victorville |
| San Diego | 16 | Supervisor D4, El Cajon, Helix WD, Imperial Beach, Lemon Grove (2), National City (2), Oceanside (2), San Diego council D2 and D4, SDUSD C, Tri-City Healthcare, Vista (2) |
| San Francisco | 8 | Supervisors D8 and D10, SFUSD Board of Education (3), Community College Board (3) |
| San Mateo | 14 | Supervisor D5 (Short Term), County Board of Education, Daly City, East Palo Alto (2), Foster City, Pacifica (2), Redwood City, San Bruno, SMUHSD, South San Francisco (3) |
| Santa Barbara | 10 | Lompoc (3), Santa Barbara (mayor, 3 council), Santa Maria (2 council), SMJUHSD Area 4 |
| Santa Clara | 11 | Berryessa USD, ESUHSD Area 1, Foothill-De Anza, Gilroy, Milpitas, Mountain View (2), San Jose D5 and D9, SJUSD Area 4, Santa Clara mayor |
| Solano | 2 | Fairfield, Vallejo |
| Sonoma | 7 | Supervisors D2 and D4, County Board of Education, Healdsburg, Petaluma (council, PJUHSD), Santa Rosa |
| Stanislaus | 1 | Modesto D2 |
| Tulare | 1 | Visalia D4 |
| Ventura | 10 | County Superintendent, Oxnard D2 and D5, Port Hueneme, Rio SD (2), Santa Paula (2), Ventura D1 and D6 |

The 8 local positions from the 10-15 pass are unchanged: LA County Measure E,
RTM, SF Props B and I, Berkeley Measure Z, LA City Attorney, LA CD 9, Santa
Ana Ward 6. The digital guide agrees with all of them; its "Referral E" and
"Initiative Z" cards are LA County Measure E and Berkeley Measure Z.

### Ballot verification

Each local race was checked against the county registrar's list of
candidates on the Nov 3 ballot, or the city clerk's list where the registrar
blocked automated access. Lists used:

- Alameda: alamedacountyca.gov/rov_app/candidatelist (election 260)
- Contra Costa: contracostavote.gov 8-27-26 detail list and 8-14-26 summary list
- San Mateo: smcacre.gov 52_candidateroster0903.pdf; June results page
- Solano: county filing log as of 8/20/2026 (not a certified list)
- Larkspur: city clerk page (Marin registrar unreachable)
- Fresno: "Contests on Ballot with Qualified Candidates" (10/12/2026)
- Kern: kernvote.com candidate list (9/12/2026)
- Stanislaus: stanvote.gov candidate-list.pdf (8/31/2026)
- Santa Barbara: county CivicPlus files for cities on the ballot (9/4), schools on the ballot (9/9), and schools not on the ballot (8/17)
- Ventura: county Nov 3 translation guide (English names); off-ballot proof list (8/17); June district canvass
- Santa Clara cities: Milpitas, Mountain View, Gilroy, San José and Santa Clara city clerk lists
- Riverside: voteinfo.net "Final candidate list nov 2026" (printed 9/11/2026)
- San Bernardino: uploads.rov.sbcounty.gov Report_CandidateList.pdf (9/29/2026)
- Sacramento: elections.saccounty.gov Candidate-Report.pdf (7/21/2026)
- Sonoma: sonomacounty.gov "November 3, 2026 General Election: Candidates on the Ballot"
- Orange: ocvote.gov "Contests Qualified for the Ballot" (contest list only, no names)
- LA, SD, SF: matched against existing bundles' titles and names. The digital guide's write-ups also state the June results and November matchups for the county races.

**Not verified** (registrar blocked, no other official list found; kept as
printed): Berryessa USD (Jaria Jaug), Foothill-De Anza CCD Area 2 (Alexander
Gvatua), SJUSD Area 4 (Michael Melillo), Visalia D4 (Emmanuel Hernandez
Soto). Berryessa and SJUSD are already endorsed by other bundles under the
same names.

### Seat corrections (the PDF label was wrong; the registrar's seat was used)

| Candidate | PDF label | Seat used |
| --- | --- | --- |
| Becca Barrett ("Rebecca Barrett") | CCCCD Ward 1 (printed twice) | Ward 3 |
| Dion-Jay (DJ) Brookter | SF Supervisors D8 (printed twice) | District 10 |
| Mark Nagales | San Mateo Supervisor D2 (printed twice) | District 5 (Short Term) |
| Melanie Bagby | Sonoma Supervisors D2 (printed twice) | District 4 |
| Chris Castorena | Banning D4 (printed twice) | District 5 |
| Alex Jauregui ("Alexander Jauregi") | SMJUHSD Area 2 (printed twice) | Trustee Area 4 |
| Luz Perez | Fontana D2 | District 4 |
| Gabe Teran | Oxnard D1 | District 2 |
| Gabriela Basua | Oxnard D2 | District 5 |
| Sarah Seitchik Sebastian | "Petaluma City Schools Area 4" | Petaluma Joint Union HSD Trustee Area 5 |
| Khaled Omar / Inez Spates | Rio SD Board (one line) | Area 1 / Area 4 |
| Mer Currey Nuñez | ESUHSD "At-Large" | Trustee Area 1 (Short Term), as in the existing bundles' title |
| Seema Kanani | Milpitas "District 2" | Milpitas City Council (at-large, 2 seats) |
| Celest Mendoza | Santa Maria D1 | District 1 (Short Term) |

### Dropped: not on the Nov 3 ballot (or not placeable)

- Noelia Corzo (San Mateo Supervisor D2): won outright in June (87.45%).
- Doria Robinson (Richmond D3): won outright in June (~69%; news report, Richmondside).
- Destiny Briscoe (Pittsburg USD), Allyson Chan (San Mateo-Foster City SD
  Area 1), Brenda Villa (Lompoc USD Area 4), Feliciano Aguilar (SMJUHSD Area
  2), Genevieve Flores-Haro (Oxnard Union HSD Area 4), James Forsythe
  (Ventura USD Area 1), and Sammie Luna (Moreno Valley USD Area 1): the
  registrar doesn't list the seat as contested (the candidates were unopposed
  or appointed in lieu), so it isn't on the ballot.
- Tiffany Ackley ("Aliso Viejo City Council At-Large"): Aliso Viejo has no
  at-large seat on the ballot. OC's qualified contests are District 2 and
  District 3 (Short Term) only.
- Anthony Montes (ESUHSD "At-Large"): ESUHSD elects by trustee area for the
  first time in Nov 2026, and his area couldn't be determined.
- Los Angeles Mayor: "No recommendation" (not a position).

### Name spellings (`choice` uses the ballot name, or the spelling other bundles already use for the same race)

PDF → used: Igor Trebug → Igor Tregub; Avery Arbough → Avery Arbaugh; Michell
Fernelius → Michelle Fernelius; Valerie Bachelor → Valarie Bachelor; Victor
Daniel Lopez Pulido → Victor Lopez Pulido; Aysha Dominguez Pamucku → Aysha
Dominguez Pamukcu; Phoebe Shin-Venkat → Phoebe Shin Venkat; Eric Vasquez
(Petaluma) → Eric Vazquez; Sarah Anne Reed → Sarah Anne Read; Eric Poicon →
Erik Poicon; Christy Lam Julian → Truc "Christy" Lam-Julian; Rebecca Barrett
→ Becca Barrett; Liliana Soriano → Liliana Soriano Garista (as in other
bundles); Dr. Kathleen Turner (Irvine D6) → Kathleen Treseder (the digital
guide and other bundles; Treseder is the D6 incumbent); Monica Wilson →
Monica E. Wilson; Marty Medina → Marty P. Medina; Rebeca Armendariz → Rebeca
G. Armendáriz; Joz Sida → Jocelyn "Joz" Sida; Alex Vara → Alejandro "Alex"
Vara; Veva Islas → Genoveva "Veva" Islas; DeJonaé Shaw → Dejonae Marie Shaw;
Nathan Urena → Nathan A. Urena; Gabe Teran → Gabriel "Gabe" Teran; Pedro
Chavez → Pedro A. Chavez; Nancy Grass → Nancy L. Grass; Kristen Sneddon →
Kristen W. Sneddon; Dr. Flojaune Cofer → Flo Cofer; Dion-Jay (DJ) Brookter →
DJ Brookter; Alva Álvarez and Juan Gabriel Álvarez → unaccented, matching the
existing Anaheim ESD bundle; Mer Currey Nuñez → Mer Curry Nuñez (other bundles).
Honorifics and "(Incumbent)" were dropped.

Some of these differ from another bundle's spelling only by a middle
initial or nickname (Gabe Teran, Nancy Grass, Nathan Urena, Joz Sida,
DeJonae Shaw, Gabby/Gabriela Basua). `scripts/normalize-choices.ts` should
merge most of them, but "Gabby" vs "Gabriela" Basua is not in its nickname
table.

### New titles (no existing subject matched)

`Petaluma Joint Union High School District Board, Trustee Area 5`
(sonoma-county), `Fairfield City Council, District 5` (fairfield), `Vallejo
City Council, District 4` (vallejo), `Fresno Unified School District Board,
Area 4` (fresno-county), `Foothill-De Anza Community College District Board,
Trustee Area 2` (santa-clara-county), `Santa Maria City Council, District 1
(Short Term)` and `District 3` (santa-maria), `Santa Maria Joint Union High
School District Board, Trustee Area 4` (santa-barbara-county), `Visalia City
Council, District 4` (visalia), `Santa Paula City Council, District 3`
(santa-paula), `San Bernardino County Superintendent of Schools`
(san-bernardino-county). Every other local title reuses an existing subject
byte-for-byte, including the Orange County supervisor seats, which use
`us/ca/orange-county` (16 positions) rather than `us/ca/orange` (2).

### Flags for review

- `us/ca/santa-barbara` is used by an existing bundle for both the city and
  the county. City races here reuse it. The two county-level school
  districts (SMJUHSD; Lompoc USD was dropped) use `us/ca/santa-barbara-county`.
- Desert Healthcare District Zone 5 is a **short-term** seat on the
  registrar's list. The existing title (no "(Short Term)") was reused.
- Port Hueneme (vote for 3), Rialto (2 seats), Daly City (3), East Palo Alto
  (2), Larkspur (3), Pinole (3), Milpitas (2), Mountain View (3), Berkeley
  Rent Board (5), Burbank, West Hollywood, Huntington Beach, Lemon Grove,
  SFUSD and SF CCB are multi-seat at-large races. Each endorsed candidate is
  a separate position under one title.
- Supervisor and countywide races are top-two runoffs from June. Each
  endorsed candidate is a confirmed finalist: Pacheco v. Karbassi (Fresno
  D1), Cofer v. Guerra (Sac D1), Vara v. Binks (SB Supt), Sher v. Marschner
  (Ventura Supt), Garcia v. Paradise (Riverside Office 10), Traut v. Shaw and
  Foley v. Dixon (OC), Montgomery Steppe v. Alessio (SD D4), Paun v. Lemus
  and Bagby v. Schwedhelm (Sonoma). City runoffs confirmed: Fresno D1 (Singh
  v. Fuentes), Fresno D7 (Martinez Lott v. Gurm), San José D5 and D9.

## Skipped

- Statements for the 10-15 statewide/federal/legislative positions: the
  digital guide has long per-race blurbs. Only the Prop 40 card's one-line
  tagline was captured and quoted. (Local positions added 10-19 all carry a
  statement.)

## Not on the Nov 3 ballot: removed 2026-10-24

The catalog's ballot check found this position on a seat no ballot carries: it was uncontested, so no election is held for it. It was removed, since a position here has to map to a ballot entry.

- Foothill-De Anza Community College District Board, Trustee Area 2: Alexander Gvatua. Not on the ballot: Santa Clara County's Final Qualified List of Local Eligible Candidates (contest 3214, https://files.santaclaracounty.gov/exjcpb1296/2026-09/qualified-list-of-local-candidates-9-28-26.pdf) lists him as the seat's only qualified candidate, marked "On Ballot: No".
