# NOTES: San Diego County Democratic Party, Nov 3 2026 general

## Sources
- Candidates: https://www.sddemocrats.org/candidates.html ("Democratic Candidates in the 2026 General Election"), the party's own page.
- Measures: https://www.sddemocrats.org/propositions--ballot-measures.html. The page says "The CDP takes positions on statewide propositions and the SDCDP on local measures". Both sets are published there as "the Democratic Party's recommendations", so both are recorded.
- KPBS's Oct 14 general-election roundup was used **only as a cross-check**. It has errors for this party (see below), so no position cites it.
- Ballot verification: the SD County ROV candidate list (`sdvote-candidate-list.md`) and the ROV local-measure notice (`sdvote-measures-notice.md`).

## Endorsed vs. rated qualified (important)
The candidates page uses **colored checkmarks**. Dark blue `rgb(0, 51, 175)` means endorsed and light blue `#3a96b8` means "rated qualified". Names with no checkmark are, per the page key, not endorsed. The evidence capture decodes these as `[E]` and `[Q]`. A script confirmed that every included candidate carries `[E]`.
- **Rated qualified, omitted:** National City Council D1 (Cindy Lopez, Luz Molina); Sweetwater UHSD Area 1 (Maria Betancourt-Castaneda, Fermin Jiminez).
- **Listed with no checkmark, omitted:** Carlsbad Mayor Eric Nixon; Santee Council D1 Matthew Rascon; Chula Vista Elementary Seat 1 Debra McLaren; Del Mar Union Katherine Fitzpatrick; MiraCosta Areas 1/2 Anna Pedroza and Rick Cassar.
- **Insurance Commissioner:** the page shows one checkmark before "Ben Allen, Jane Kim". Only **Ben Allen** is recorded. This matches the California Democratic Party's Nov endorsement (Allen) in this repo. Reviewer: KPBS lists both names.

## Omitted because the race is not on the Nov 3 ballot
These are endorsed on the page, but the ROV list either marks the contest `Election = NO` (an uncontested seat appointed in lieu of election) or does not list the contest at all:
- **Not on the ROV list:** Grossmont-Cuyamaca CCD Areas 1/2 (Cindy Page, Debbie Justeson); SDCCD District E (Geysil Arroyo).
- **Election = NO:** MiraCosta Areas 6/7 (Joey Aszterbaum, Heather Conklin); Southwestern CCD Area 5 (Don Dumas); Bonsall Area A (Rachael Dombrowski); Borrego Springs USD (Esmeralda Lopez Garcia); Jamul-Dulzura Area 3 (Wadad Dubbelday); Julian Union School (Stacy Cosson); Lemon Grove School (Ayala, Smith, Tortoriello); San Marcos USD Area C (Andres Ramos Martin); Solana Beach School Areas 1/3/4 (Schade, Süel, Allbaugh); Sweetwater UHSD Areas 3/5 (Lopez-Zepeda, Emerald); Vallecitos School Area 3 (Kurland); Vista USD Area 2 (Marrocco); Borrego Water (Dice, Duncan, Moran); Otay Water Div 1 (Rivera); South Bay Water Div 1/4 (Castaneda, Martinez); Vallecitos Water Div 5 (Tanis Brown); Valley Center MWD Div 2 (Ardalan); North County Fire Div 5 short term (Reardon); Fallbrook Regional Health Zones 1/3/5 (Atkins, Acosta, Becket); the planning groups for Fallbrook, Harbison Canyon, Jacumba CSD, Jamul-Dulzura, Morro Hills CSD, Potrero, Rainbow, Spring Valley, and Valle de Oro.
- Some single-candidate contests **are** on the ballot (`Election = YES`) and are included: SDUSD B/C (Hazan, Gore), Chula Vista City Attorney (Verdugo), and Solana Beach Council D2/D4 (Becker, Wolfe-Dellamano).

## Measures
- Local measures marked "NO POSITION" are omitted: C, H, J, L, P, Q, Y, BB.
- Measure titles use the short titles printed on this page. They match the ROV notice wording where the notice has one, and use "&" for Measure B to match the ROV notice and reform-california's bundle. Prefix convention: city or county name, or the district name for district measures.

## Name normalization (choice = ROV ballot name)
Henry Foster → Henry Foster III; Marni Von Wilpert → Marni von Wilpert; Patricia Dillard → Patricia Normandy-Dillard; Amanda- Dawn Natalia → Amanda-Dawn Natalia; Jenna Dellamano → Jenna Wolfe-Dellamano; Michele Ward → Michele Tsutagawa Ward; Janette Gomez-Lamadrid → Janette Gomez; Christine Hargrave → Chris Hargrave; Joseph Allen Pearson → Joey Pearson; Raquel Alvarez → Raquel Riojas Alvarez; Michelle O'Connor Ratcliff → Michelle O'Connor-Ratcliff.

## Title / jurisdiction conventions (new for Nov)
- Cities: `<City> Mayor`, `<City> City Council, District N`, `<City> City Council` for at-large seats, plus `<City> City Treasurer` and `<City> City Attorney`. Jurisdiction is `us/ca/<city-slug>`. San Diego keeps the June form `San Diego City Council, District N` with `us/ca/san-diego`.
- "Encinitas Mayor" is the ROV's short-term mayor contest, the only Encinitas mayor race on the ballot. "Lemon Grove City Council (Short Term)" is kept separate from the regular at-large seats.
- School, college, and special districts use `<District full name> Board, Trustee Area N` (or `Seat N`, `District X`, `Division N`, `Zone N`), or just `<District> Board` when at-large, with jurisdiction `us/ca/san-diego`. This follows June's "San Diego Unified School District Board, District C".
- Grossmont Healthcare "Division 2/4" on the page is "Zone 2/4" on the ROV, and the ROV wording is used.

## KPBS discrepancies (for the record)
KPBS lists Nixon, Rascon, Pedroza, Cassar, McLaren, Fitzpatrick, Cindy Lopez, Luz Molina, Betancourt-Castaneda, and Jiminez as endorsed, and gives both names for Insurance Commissioner. It omits Treasurer (Eleni Kounalakis). The party's own page governs.
