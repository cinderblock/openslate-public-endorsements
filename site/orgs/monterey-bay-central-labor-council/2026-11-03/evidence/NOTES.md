# NOTES — Monterey Bay Central Labor Council, AFL-CIO, Nov 3 2026 general

## Sources

- https://mbclc.org/endorsements : "November 2026 General Election -
  Endorsements" table (HTML, AFL-CIO union hall site). Every position cites
  this page.
- The table's "(linked here)" points to a Google Doc memorandum (Sept 3,
  2026, from Executive Director Francisco Rodriguez). It says the delegates
  endorsed these candidates at the September 2 Delegates' Meeting by the
  required three-fourths vote. It was fetched through the plain-text export
  and is saved as supporting evidence.
- Ballot names come from the Monterey County candidate list
  (`$TEMP/os-dl/G2/rov-monterey/parsed.txt`) and the Santa Cruz County "Contact
  Candidates" page
  (https://votescount.santacruzcountyca.gov/Home/Elections/November3,2026CaliforniaGeneralElection/ContactCandidates.aspx).
  State and federal names come from the SOS list.

## Extracted: 32 positions (all "Sole Endorsement" → `endorse`)

- Congress CD 18 Lofgren, CD 19 Panetta; Assembly AD 28 Pellerin, AD 29
  Rivas, AD 30 Addis.
- Monterey County cities: Monterey mayor Williamson, Monterey D1 Barber;
  Seaside mayor Miller and council (Raak, Burks); Marina mayor Moeller and D4
  Burciaga; Salinas D2 Barrera.
- Santa Cruz County: Santa Cruz mayor Chen Mills; Watsonville D5 Clark and D7
  Acosta; Cabrillo CCD TA 6 Finke; Pajaro Valley USD TA 1 Obinata, TA 4
  Estrada, TA 5 Jiménez, TA 7 Realmuto.
- Schools (Monterey): Alisal Union SD TA 2, 3, 5; Salinas UHSD TA 7; King City
  Joint USD Gaboni.
- Measures: Salinas G Yes, Salinas H No ("Oppose - VOTE NO!"), King City P
  Yes, Greenfield O Yes, Santa Cruz County E Yes, Monterey County E Yes.

## Skipped

- "Greenfield USD — David Kong" and (memo only) "Greenfield USD Trustee Area
  1 — Sonia Quiroz": ambiguous. David Kong is a candidate both for the new
  Greenfield Unified School District board (vote for 5) and for Greenfield
  Union School District TA 1. Sonia Valerio Quiroz is not a candidate for
  either Greenfield board; she is on the King City Joint USD, King City Union
  SD and South Monterey County JUHSD ballots. Both omitted.
- "Link to California Federation of Labor Unions Statewide Endorsements"
  points to the California Labor Federation list (https://calaborfed.org/...).
  Nothing from it is printed here, so nothing was copied.

## Flags for review

- Name normalisation to the ballot names: "Tyler Williamson" → "Tyller
  Williamson", "Dr. Kim Barber" → "Kim Barber", "Athena Burciaga" → "Athena
  Rita Burciaga", "Ben Fiinke" → "Benjamin Finke", "Mads Realmuto" → "Mads
  Stockwell Realmuto", "Ulises Gonzalez" → "Ulises Gonzalez Reyes", "Jesus
  Velazquez" → "Jesús R. Velásquez", "Merissa Decpano" → "Merissa Dacpano",
  "Alicia Jimenez" → "Alicia G Jiménez".
- "City of Monterey City Council — Dr. Kim Barber" gives no district. The ROV
  lists Kim Barber for Monterey City Council District 1.
- "King City Joint Unified School Board — David Gaboni" (HTML). The earlier
  memo says "South Monterey County JUHSD". The ROV lists Gaboni only for King
  City Joint USD, so the HTML is used.
- `context.jurisdiction` is us/ca/monterey-county, though the council also
  covers Santa Cruz and San Benito counties.
- Titles are shared with monterey-county-democratic-party (see that
  bundle's NOTES for the measure-title list). INVENTED here: `Santa Cruz
  County — Measure E (Transactions and Use Tax)` (us/ca/santa-cruz-county),
  `Santa Cruz Mayor` (us/ca/santa-cruz), `Watsonville City Council, District
  5/7` (us/ca/watsonville), `Cabrillo Community College District Board, Trustee
  Area 6`, `Pajaro Valley Unified School District Board, Trustee Area 1/4/5/7`
  (us/ca/santa-cruz-county), `Alisal Union School District Board, Trustee Area
  3/5`, `King City Joint Unified School District Board` (us/ca/monterey-county),
  and `Monterey Mayor` (us/ca/monterey).
