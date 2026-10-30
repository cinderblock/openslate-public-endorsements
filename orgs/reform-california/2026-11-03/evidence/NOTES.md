# NOTES: Reform California, November 3, 2026 general

Retrieved 2026-10-15 (UTC). Mode `scraped`.

## Sources

| Source | Used for |
| --- | --- |
| https://www.reformcalifornia.org/voter-guides/california | "CA Statewide Voter Guide" (CMS lastPublished 2026-09-24). Used for statewide offices, BOE, props, CA Supreme Court retention, US House, State Senate and Assembly. |
| https://www.reformcalifornia.org/voter-guides/san-diego | San Diego County guide (CMS lastPublished 2026-10-13). Used **only** for the county and city races and the two countywide measures listed below; its state and federal entries duplicate the statewide guide. |
| https://www.sdvote.com/content/dam/rov/en/election/nov-3-2026-gubernatorial-general-election/argument-deadline-measures.pdf | Registrar of Voters notice, used only to source the official wording for the countywide measure titles. |

The guide index is https://www.reformcalifornia.org/voter-guides-list. It is a client-rendered list: 59 guides, the statewide one plus one per county. The June bundle used KPBS as a secondhand source; this bundle uses Reform California's own pages.

## Extracted (157 positions)

- 7 statewide offices; BOE 1 (Grove) and BOE 4 (Bilodeau).
- 14 propositions:
  - No on 1, 2, 3, 4, 5, 37, 40 and 44.
  - Yes on 38, 39, 41, 42, 43 and 45.
  - `statement` is the guide's own headline for each proposition, quoted verbatim.
- CA Supreme Court retention: "Kelli Evans - DO NOT RETAIN" and "Joshua Groban - DO NOT RETAIN". These are encoded with the title convention other bundles already use ("California Supreme Court — Retain Justice Kelli M. Evans" / "... Joshua Groban"), kind `measure`, choice `No`.
- 40 US House, 18 State Senate and 64 State Assembly positions. AD 19 is an `oppose` (see flags).
- San Diego County guide (10 positions):
  - Board of Supervisors District 4: Kristine Alessio.
  - Board of Supervisors District 5: Rebecca Jones.
  - Treasurer-Tax Collector: Shirley Nakawatase.
  - San Diego City Council District 2: Richard Bailey; District 6: Mark Powell.
  - Chula Vista Mayor: John McCann; Council District 1: Greg Martinez; District 2: Angelica Martinez.
  - County Measure A: No. County Measure B: No.

## Omitted

- **"You're Doomed" / "You are Doomed"** marks a race where the guide backs nobody (Insurance Commissioner, BOE 2 and 3, CD 4/7/11/12/14/29/34/35/37/52, SD 24/26, many ADs, many local races). These are omitted. The guide's footnote says: "If we do not make a recommendation on a candidate or ballot measure, we either could not support the measure or candidates running in that race, or do not have enough information to make an informed recommendation."
- **"No endorsement"**: CD 42, CD 49, AD 31, San Diego County Clerk. Omitted.
- **4th District Court of Appeal retention** (27 justices in the San Diego guide, mostly "DO NOT RETAIN", 7 "RETAIN"). Omitted to keep scope to state, federal and countywide entries. This is a candidate follow-up if appellate retention gets a shared title convention.
- **Other San Diego local entries** were not transcribed:
  - Local measures C–BB.
  - All other city councils.
  - School, community-college, special-district and planning-group races.
  - "Strategic Voting" bullet-vote advice.
  - "Least bad option is Marcus Bush" (National City Mayor), which would be a `lean_for` if added.
- **The other 57 county guides** were not scraped. The June bundle only covered San Diego.

## Verification

Every state and federal candidate was checked against the SOS *Certified List of Candidates for the November 3, 2026, General Election* (8/27/2026). All are on the ballot in the named district. Local (San Diego County / city) candidates could **not** be checked against an official list here. They come from a November guide that lists ballot races, but are unverified.

## Flags for review

- **AD 19 "Not Catherine Stefani"**: encoded as `stance: "oppose"`, `choice: "Catherine Stefani"`, with the quote as `statement`. The ballot pair is Catherine Stefani (D, incumbent) vs Philip Louis Wing.
- **CD 51 name**: the statewide guide says "Ricardo Cabrera", which matches the ballot; the San Diego guide says "Ricardo Cabrero". I used Cabrera.
- **Measure titles (please harmonise with other San Diego bundles)**:
  - "San Diego County — Measure A (A Transparent, Accountable, Modern County Government)". The parenthetical is from the Registrar's file name for Measure A.
  - "San Diego County — Measure B (Measure to Fund San Diego County Health & Safety Services)". The parenthetical is the ballot-label heading in the Registrar's notice. Press calls it the "San Diego County Health & Safety Act".
  - The Registrar's notice doesn't print letters. A = charter amendment (term limits / ethics commission) and B = half-cent sales tax come from Reform California's descriptions ("Extends Term Limits for Current Politicians"; "San Diego County Sales Tax Increase"), matched to KPBS coverage of "Measure B".
- **Names**: the guide's fuller ballot-style names were kept ("David G. Valadao", "Chuong V. Vo", "Lydia A. Gutiérrez", ...). Collation that keys on `choice` may need fuzzy matching against other orgs' shorter forms.

## Refresh 2026-10-30

Re-fetched https://www.reformcalifornia.org/voter-guides/san-diego on 2026-10-30 9:48 AM PDT (16:48Z). Evidence: `reform-california-san-diego-county-voter-guide-2026-10-30.md`. The sweep's
lead was Encinitas Mayor Bruce Ehlers, a line the 10-15 pass left out on purpose. The same section held the whole
San Diego local list, so it's all in now, checked against the SD Registrar's listing:
- 122 local candidates (cities, school boards, college boards, special districts, planning groups).
- 18 local measures (C through BB). Measure L is printed "NEUTRAL", so `neutral` with no choice.
- 15 4th District Court of Appeal justices on the SoS list ("RETAIN" Yes, "DO NOT RETAIN" No).
- 7 races printed "No Endorsement", as `abstain`, including CD 42, CD 49, CD 52 and AD 31, which the
  10-15 pass omitted.
"Least bad option is Marcus Bush" (National City Mayor) is `lean_for`. Lines under "Strategic Voting: Only vote for
these candidates - leave others blank" are plain `endorse`. "You are Doomed" stays omitted.

Printed but not added (no matching race or name on the ballot listing, usually a seat that wasn't contested):
- Bonsall Unified School District: Trustee Area D: Roger Merchat [no ballot title: Bonsall Unified School District Board, Trustee Area D]
- Fallbrook Union Elementary School District: Trustee Area 5: Mary McBride [no ballot title: Fallbrook Union Elementary School District Board, Trustee Area 5]
- Fallbrook Union High School District: Trustee Area 2: Paul Christensen [no ballot title: Fallbrook Union High School District Board, Trustee Area 2]
- Julian Union High School District: Trustee At-Large: Katy Moretti [no ballot title: Julian Union High School District Board]
- Julian Union High School District: Trustee At-Large: Nori Chandler [no ballot title: Julian Union High School District Board]
- Santee School District: Trustee Seat 3: Dustin Burns [no ballot title: Santee School District Board, Seat 3]
- South Bay Union School District: Trustee Area 4: Manuel Esparza [no ballot title: South Bay Union School District Board, Trustee Area 4]
- Warner Unified School District: Trustee At-Large: Jeannean Rombal [no ballot title: Warner Unified School District Board]
- Alpine Fire Protection District: At-Large: Baron Willis [no ballot title: Alpine Fire Protection District Board]
- Olivenhain Municipal Water: District 1: Ebin Lanfried [no ballot title: Olivenhain Municipal Water Board, Trustee Area 1]
- Olivenhain Municipal Water: District 4: Matthew Hahn [no ballot title: Olivenhain Municipal Water Board, Trustee Area 4]
- Palomar Health: Division 1: Michael Pacheco [no ballot title: Palomar Health Board, Division 1]

Justices the guide names who aren't on the SoS list: Marsha Amin, Martin N. Buchanan, Carol D. Codrington, Richard T. Fields, Judith McConnell, Art W. McKinster, Frank J. Menetrez, Douglas P. Miller, Eileen C. Moore, Terry B. O'Rourke, Manuel A. Ramirez, Maurice Sanchez.
The other county guides on the site were not scraped.

## Refresh 2026-10-30 (county guides)

Fetched the guide index (https://www.reformcalifornia.org/voter-guides-list) and all 58 county guides on 2026-10-30 10:24 AM PDT (17:24Z), with curl.exe and a browser User-Agent. The index's data lists 59 guides: the statewide one and one per county, and the statewide guide links the same 59. Every slug is the plain county name (`/voter-guides/san-luis-obispo`, `/voter-guides/san-francisco`). The whole site was last published 2026-10-30 9:42 AM PDT (16:42Z).

Evidence: `reform-california-<county>-county-voter-guide-2026-10-30.md`, one per guide, from "Local Ballot Measures" through the end of the candidate lists. The statewide proposition text above that is the same on every guide and is left out. San Diego was done earlier today and isn't repeated. Plumas prints no local pick, so its URL isn't in `attribution.sources`; its evidence file is saved anyway.

One parser ran over every guide (`%TEMP%\os-round2\rc-county\`, not in this repo): 314 -> 2145 positions. The San Diego conventions hold: "No Endorsement" is `abstain`, "RETAIN"/"DO NOT RETAIN" is Yes/No, "Strategic Voting" lines are plain `endorse`, and "You are Doomed" is omitted (161 local lines). No guide but San Diego's prints "NEUTRAL" or "Least bad option". A position already in the bundle was left as it was.

Positions added per guide. A race or measure on several guides is filed once and counted under the first guide alphabetically, which is also its `source`.

| County | Added | Measures | Court of Appeal | Candidates | No Endorsement |
| --- | --- | --- | --- | --- | --- |
| Alameda | 48 | 28 | 11 | 9 | 0 |
| Alpine | 9 | 1 | 7 | 1 | 0 |
| Amador | 15 | 2 | 0 | 12 | 1 |
| Butte | 21 | 3 | 0 | 16 | 2 |
| Calaveras | 11 | 1 | 0 | 9 | 1 |
| Colusa | 7 | 3 | 0 | 2 | 2 |
| Contra Costa | 22 | 12 | 0 | 8 | 2 |
| Del Norte | 6 | 0 | 0 | 6 | 0 |
| El Dorado | 48 | 11 | 0 | 30 | 7 |
| Fresno | 66 | 9 | 6 | 41 | 10 |
| Glenn | 8 | 1 | 0 | 7 | 0 |
| Humboldt | 24 | 9 | 0 | 11 | 4 |
| Imperial | 13 | 7 | 0 | 6 | 0 |
| Inyo | 22 | 2 | 0 | 9 | 11 |
| Kern | 68 | 11 | 0 | 41 | 16 |
| Kings | 62 | 1 | 0 | 37 | 24 |
| Lake | 7 | 2 | 0 | 5 | 0 |
| Lassen | 8 | 2 | 0 | 6 | 0 |
| Los Angeles | 132 | 68 | 18 | 46 | 0 |
| Madera | 33 | 4 | 0 | 23 | 6 |
| Marin | 25 | 20 | 0 | 5 | 0 |
| Mariposa | 2 | 0 | 0 | 1 | 1 |
| Mendocino | 7 | 1 | 0 | 4 | 2 |
| Merced | 38 | 9 | 0 | 26 | 3 |
| Modoc | 3 | 3 | 0 | 0 | 0 |
| Mono | 9 | 2 | 0 | 7 | 0 |
| Monterey | 67 | 18 | 4 | 44 | 1 |
| Napa | 12 | 4 | 0 | 2 | 6 |
| Nevada | 22 | 2 | 0 | 19 | 1 |
| Orange | 145 | 15 | 0 | 125 | 5 |
| Placer | 53 | 9 | 0 | 41 | 3 |
| Plumas | 0 | 0 | 0 | 0 | 0 |
| Riverside | 110 | 7 | 0 | 90 | 13 |
| Sacramento | 64 | 8 | 0 | 44 | 12 |
| San Benito | 3 | 0 | 0 | 3 | 0 |
| San Bernardino | 144 | 19 | 0 | 117 | 8 |
| San Francisco | 11 | 0 | 0 | 11 | 0 |
| San Joaquin | 40 | 3 | 0 | 22 | 15 |
| San Luis Obispo | 20 | 6 | 0 | 14 | 0 |
| San Mateo | 31 | 28 | 0 | 3 | 0 |
| Santa Barbara | 39 | 7 | 0 | 31 | 1 |
| Santa Clara | 21 | 18 | 0 | 3 | 0 |
| Santa Cruz | 16 | 3 | 0 | 13 | 0 |
| Shasta | 44 | 3 | 0 | 38 | 3 |
| Sierra | 1 | 0 | 0 | 1 | 0 |
| Siskiyou | 19 | 5 | 0 | 13 | 1 |
| Solano | 23 | 11 | 0 | 11 | 1 |
| Sonoma | 33 | 11 | 0 | 10 | 12 |
| Stanislaus | 43 | 6 | 0 | 30 | 7 |
| Sutter | 5 | 2 | 0 | 2 | 1 |
| Tehama | 15 | 4 | 0 | 7 | 4 |
| Trinity | 6 | 1 | 0 | 5 | 0 |
| Tulare | 53 | 9 | 0 | 28 | 16 |
| Tuolumne | 10 | 1 | 0 | 8 | 1 |
| Ventura | 41 | 5 | 0 | 36 | 0 |
| Yolo | 13 | 4 | 0 | 6 | 3 |
| Yuba | 13 | 1 | 0 | 12 | 0 |

### Titles

Races in the SoS, San Francisco, LA, Orange, Alameda, Santa Clara and San Mateo listings use the listing's title, spelling and `choice_id`. Elsewhere a title already in the catalog was reused, and 584 races and 144 measures got new titles on the catalog's pattern, with names as printed. School boards in those new titles use the Census district name from `scripts/data/ca-school-districts.json` (the guide's "Alview-Dairyland School District" is "Alview-Dairyland Union Elementary School District"), filed under the district's county of record. Special districts on several guides are filed under the county the catalog already uses, else the district's own.

New measure titles have no parenthetical ("Clayton — Measure M"). The parenthetical is the ballot's short title elsewhere in the catalog, the guide doesn't print one, and the guide's own head ("City of Clayton Sales Tax Increase") is its opinion, so that stays in `statement`. A county listing, when one arrives, can replace them.

Guide typos in a body's name were corrected in the title, not in `statement` ("Brett Harte" is Bret Harte, "Saint Lucia" is Santa Lucia, "Town of Corte Madre" is Corte Madera, "San Bernadino" is San Bernardino). Merced's guide shortens its school districts ("Atwater School"), which are spelled out the same way. Zone measures the guide names only by place (El Dorado's road zones, Inyo's Mesa and Lone Pine, Marin's Paradise Cay) are titled with that place and filed under the county.

Printed under one county but filed by what the race is: the Alameda guide lists Milpitas, Alum Rock, Franklin-McKinley and Oak Grove races, all on the Santa Clara listing. "San Gabriel Valley: City Council: Eric Chan" is the San Gabriel City Council. "Town of Mammoth Lakes" under Special Districts is the Mammoth Lakes Town Council. "Petaluma City (Elementary) and Petaluma Joint Union High School District" is filed as Petaluma City Schools Board, the catalog's commoner title for that seat.

### Judgment calls to check

- **"NOT X" lines** are `oppose` with the name as the choice, as AD 19's "Not Catherine Stefani" already is. The guides print 15 of them:
  - Calaveras: Brett Harte Unified School District: Trustee At-Large: Not Fred Haubensak
  - Los Angeles: Superior Court Judges: Office 64: Definitely NOT Rhonda A. Haymon
  - Los Angeles: Superior Court Judges: Office 65: Definitely NOT Justin Clayton
  - Los Angeles: Superior Court Judges: Office 87: Definitely NOT A.J. Bayne
  - Mono: County Board of Education: District 3: Definity not Dem (Lara Kaylor)
  - Orange: Anaheim: Council District 3: Definitely NOT Elia Renteria-Garcia
  - Santa Barbara: County Board of Supervisors: District 5: NOT Ricardo Valencia
  - Santa Barbara: Carpinteria: City Council District 1: NOT Monica Solorzano
  - Santa Barbara: Carpinteria: City Council District 5: NOT Alexandra "Xy" VanAntwerp
  - Santa Barbara: Guadalupe: Mayor: NOT Christina Hernandez
  - Santa Barbara: Santa Maria: City Council District 1 Short-Term: NOT Celeste Mendoza
  - Santa Barbara: Santa Maria: City Council District 4: NOT Tyler Barksdale
  - Santa Barbara: Guadalupe Union School District: Trustee Area 3: NOT Raul Rodriguez Jr
  - Santa Barbara: Santa Maria Joint Union High School District: Trustee Area 4: NOT Alex Jauregui
  - Siskiyou: Dunsmuir: Council (At-Large): NOT Brian Wilson or Michael W Clarno
- **"X or Y"** on a one-seat race is both, `endorse`:
  - Madera: Chowchilla: Mayor: Kelly Smith or Waseem Ahmed
  - San Bernardino: Chino Basin Water Conservation District: Division 7: Randy Lee or David Warren
- **"Dual Endorsement"** (Beverly Hills Unified) is two plain `endorse` lines.
- **Printed seat differs from the listing**, placed where the listing has the person:
  - Los Angeles: "Glendora: City Council: Michael Allawos" is on Glendora City Council, District 1
  - Los Angeles: "Santa Clarita Valley Water Agency: Division 2: Kenneth Petersen" is on Santa Clarita Valley Water Agency Board, Division 3
  - Orange: "Aliso Viejo: Council District 3: Garrett Dwyer" is on Aliso Viejo City Council, District 3 (Short Term)
  - Orange: "Mission Viejo: Council District 2: Saga Conroy" is on Mission Viejo City Council, District 2 (Short Term)
  - Orange: "Mission Viejo: Council District 4: James Morrison" is on Mission Viejo City Council, District 4 (Short Term)
  - Orange: "Coast Community College District: Trustee Area 3: Conrad Mazeika" is on Coast Community College District Board, Trustee Area 3 (Short Term)
  - Riverside: "Indio: Council District 3: Elaine Holmes" is on Indio City Council, where the catalog has the person
  - San Bernardino: "Morongo Unified School District: Governing Board Area 1: Melissa “Missy” Bond" is on Morongo Unified School District Board, Trustee Area 1 (Short Term), where the catalog has the person
  - San Bernardino: "San Bernardino Valley Municipal Water District: Division 1: Jose Velasquez" is on San Bernardino Valley Municipal Water District Board, Division 1 (Short Term), where the catalog has the person
  - San Mateo: "Foster City: City Council: Art Kiesel" is on Foster City City Council, District 1
  - Santa Clara: "Alum Rock School Board: Trustee: Linda Chavez" is on Alum Rock Union Elementary School District Board, Trustee Area 5
  - Santa Clara: "Los Gatos-Saratoga High School District: Trustee: Ishaan Prasad" is on Los Gatos-Saratoga Union High School District Board, Trustee Area 2
- **Names the core matcher wouldn't call the same person**, checked by hand against the race's field and spelled as the ballot does:
  - Alameda: "Jennie Ha Pham" is "Jennie Ha Phan"
  - Alameda: "Pardeep Kumar" is "Pradeep Kumar"
  - Los Angeles: "Tanya Tsikanovsky" is "Tatyana Tsikanovsky"
  - Orange: "Elia Renteria-Garcia" is "Elia Rentaría García"
  - Orange: "Quan Vong" is "Quan Vuong"
  - Orange: "Craig Holliday" is "Craig Holiday"
  - Orange: "Koyna Vivanti" is "Konya Vivanti"
- **Measure letters**: Stanislaus prints Measure L for both Patterson's sales tax and Riverbank's farmland initiative; the catalog's other bundles have the initiative as Riverbank's Measure M, so it's there. Solano prints Measure H for both a county TOT and Rio Vista's sales tax, so one letter is probably wrong; both are as printed. San Luis Obispo's letters keep their "-26", except Allan Hancock's H-26, which is the catalog's Measure H. Santa Barbara's letters are the catalog's "2026" forms (Measure I is Carpinteria's I2026). Ventura's Measure LV, printed with no district, is Las Virgenes Unified's.
- **The same race on two guides, differing.** A named pick is kept over "No Endorsement" on the same race, and two names on one seat are both kept:
  - Yosemite Community College District Board, Area 1: Stanislaus names Don Davis; Calaveras, San Joaquin, Tuolumne prints No Endorsement
  - Contra Costa County Board of Education, Area 2: Contra Costa names Pamela West; Contra Costa prints No Endorsement
  - Tahoe Truckee Unified School District Board, Trustee Area 1: El Dorado names Patrick Mooney; Nevada, Placer prints No Endorsement
  - El Dorado Irrigation District Board, Division 4: El Dorado names Eric Mettler; Sacramento prints No Endorsement
  - Laguna Irrigation District Board, Division 3: Fresno names Reid Potter; Kings prints No Endorsement
  - Bishop Unified School District Board: Mono names Claudia Moya-Tanner, Joshua R. Nicholson, Scott Gadea; Inyo prints No Endorsement
  - Kern Community College District Board, Area 2: Kern, Mono, San Bernardino names Christina Scrivner; Inyo prints No Endorsement
  - Trona Joint Unified School District Board: Inyo names Cathy Heseman; San Bernardino names Skylar Wayne Mccular, Ahmed Abdel Elhawary (both kept)
  - Kern County Board of Education, Area 3: Kern names Mary Little; Tulare prints No Endorsement
  - Kern County Board of Education, Area 7: Kern names Lori Cisneros; San Bernardino names Ernie Bell Jr. (both kept)
  - Antelope Valley Community College District Board, Trustee Area 2: Los Angeles names Newton Chelette; Kern prints No Endorsement
  - Antelope Valley Joint Union High School District Board, Trustee Area 1: Los Angeles names Ben Berk; Kern prints No Endorsement
  - Kern Community College District Board, Area 5: Kern names Juan Figueroa, Jr.; Tulare prints No Endorsement
  - Tulare County Board of Education, Trustee Area 1: Tulare names Sandra R. Burnitzki; Kings prints No Endorsement
  - Waukena Joint Union Elementary School District Board: Tulare names Mitchell Dawes; Kings prints No Endorsement
  - Truckee Fire Protection District Board: Nevada names Joey McThorn; Placer prints No Endorsement
  - Los Rios Community College District Board, Area 1: Placer names Devon Graves; Sacramento prints No Endorsement
  - San Juan Water District Board, Division 1: Sacramento names George Machado; Placer prints No Endorsement

### Statewide list

Statewide offices, BOE, propositions and the Supreme Court match on every guide. These state and federal lines don't match the statewide list. Nothing was changed for them:
- Statewide: US House of Representatives, California District 52: printed "You're Doomed", bundle abstain
- Fresno: California State Assembly, District 31: printed "Jim Polsgrove", bundle abstain
- Orange: US House of Representatives, California District 42: printed "You are Doomed", bundle abstain
- Sacramento: California State Senate, District 8: printed "No endorsement", bundle endorse Susan A Mason
- San Francisco: US House of Representatives, California District 15: printed "You are Doomed", bundle endorse Charles Hoelter
- San Francisco: California State Assembly, District 19: printed "You are Doomed", bundle oppose Catherine Stefani
- San Mateo: California State Assembly, District 19: printed "Phillip Louis Wing", bundle oppose Catherine Stefani
- Solano: California State Assembly, District 7: printed "You're Doomed", bundle endorse Josh Hoover
- Los Angeles: AD 54: Alexandra Briseno, where the statewide guide prints "You're Doomed". Left out of the bundle.

### Printed but not added
- Alameda: County Board of Education: Trustee Area 2: Rohan Marfatia [no ballot title: Alameda County Board of Education, Trustee Area 2]
- Alameda: County Board of Education: Trustee Area 4: Mark Harvey [no ballot title: Alameda County Board of Education, Trustee Area 4]
- Alameda: Flood & Water Board: District 7: Sean Roberts [no such race on the Alameda listing]
- Los Angeles: Cerritos Community College District: Trustee Area 7: Zurich Z. Lewis [no ballot title: Cerritos Community College District Board, Trustee Area 7]
- Riverside: La Quinta: Council District 4: Frank Sandoval [printed after La Quinta's at-large lines; the same two lines are under Menifee, the next heading, so it looks like a paste slip. Menifee's is in the bundle]
- Riverside: Riverside Community College District: No Endorsements [printed with no seat, and the body elects by seat]
- Riverside: San Gorgonio Pass Water Agency: At-Large 2: Ashley Pippenger [looks like the San Bernardino guide's "Division 1: Ashleigh Pippenger", which is what's in the bundle]
- Santa Clara: Fremont Union High School District: Member: No endorsement [printed with no seat, and the listing has several]
- Solano: Fairfield: City Council: Bob Marin [no district printed, and Fairfield's council is elected by district, so the seat can't be told]

Justices the guides name who aren't on the SoS list:
- First District: Carin T. Fujisaki, Jeremy M. Goldman, Jim Humes, Teri L. Jackson, Marla J. Miller, James A. Richman, Jon B. Streeter, Alison M. Tucher
- Second District: Lamar W. Baker, Hernaldo J. Baltodano, Helen I. Bendix, Victoria M. Chavez, Anne H. Egerton, Gail Ruderman Feuer, Denise Hippach, Dorothy C. Kim, Elwood Lui, Carl H. Moor, Frances Rothschild, John L. Segal, Maria E. Stratton
- Third District: Harry E. Hull Jr., Peter A. Krause, Louis Mauro, Ronald B. Robie
- Fourth District: Marsha Amin, Martin N. Buchanan, Carol D. Codrington, Richard T. Fields, Judith McConnell, Art W. McKinster, Frank J. Menetrez, Douglas P. Miller, Eileen C. Moore, Terry B. O'Rourke, Manuel A. Ramirez, Maurice Sanchez
- Fifth District: Jennifer R.S. Detjen, Donald R. Franson Jr., Brad R. Hill, Bert Levy
- Sixth District: Mary J. Greenwood, Adrienne M. Grover, Cynthia C. Lie
