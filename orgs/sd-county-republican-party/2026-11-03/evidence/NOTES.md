# NOTES: Republican Party of San Diego County, Nov 3 2026 general

## Sources
- Primary: https://sandiegorepublicans.org/voter-guides/san-diego, the party's "San Diego County Voter Guide". It covers candidates, local measures, and judicial retention.
- **State propositions are not on the party's San Diego page.** Its "Statewide Ballot Measures" heading renders empty, and the linked https://sandiegorepublicans.org/voter-guides/california returned 404 at 2026-10-15T01:10:25Z. The 14 prop positions come from the KPBS roundup, which attributes them to "The Republican Party of San Diego County, California Republican Party". **Flag for review:** these are secondhand-of-secondhand. Props 1 and 37 are recorded as `neutral` because KPBS prints "NEUTRAL".
- Ballot verification: the SD ROV candidate list, plus the SOS certified list for judicial retention.

## Judgment calls
- "Insurance Commissioner: DEFINITELY NOT Jane Kim" is recorded as `oppose` Jane Kim. "Council District 2: DEFINITELY NOT Nicole Crosby" is recorded as `oppose` Nicole Crosby. Both quotes are in `statement`.
- Measure L "(NEUTRAL)" is recorded as `neutral` with the page's justification sentence. All other local measures use `endorse` with Yes/No, following the repo convention.
- **Chula Vista Elementary:** the page lists "District 3: Delia Dominguez Cervantes" and "Board: Norma Toothman". On the ROV, Dominguez Cervantes runs in **Seat 5** and Toothman in **Seat 3**, so the positions use the ROV seats. Reviewer may want to confirm.
- Palomar Health "Board: Hon. Laurie Edwards-Tate" and "Board: John Clark" map to the ROV's Division 3 and Division 5, the only contests those candidates are in. Tri-City "District 2" maps to ROV Zone 2, and LMSV "Seat 2" to ROV Trustee Area 2.
- **Judicial retention:** the page lists 27 Fourth District names and 2 Supreme Court names. Only 2 Supreme Court and 15 Fourth District justices are on the 2026 ballot per the SOS certified list, and only those are recorded. The other 12 are omitted as not on this ballot: Marsha Amin, Martin N. Buchanan, Carol D. Codrington, Richard T. Fields, Judith McConnell, Art W. McKinster, Frank J. Menetrez, Douglas P. Miller, Eileen C. Moore, Terry B. O'Rourke, Manuel A. Ramirez, Maurice Sanchez. Lisa Rodriguez appears on the ballot as "San Diego County Superior Court Judge LISA RODRIGUEZ" for an Associate Justice seat. Her title still uses the shared "Retain Justice" form for consistency.
- Retention titles follow the existing grow-sf and reform-california convention: `California Supreme Court — Retain Justice <Name>` and `California Court of Appeal, Fourth District — Retain Justice <Name>`, with kind `measure` and choice Yes/No.

## Omitted because the race is not on the Nov 3 ballot (ROV `Election = NO`)
Lakeside Union School Areas 1/4/5 (Hayes, Bennett, Kasper); Santee School Seat 3 (Dustin Burns); South Bay Union Area 4 (Manuel Esparza); Lakeside Water Div 2/3 (Jenkins, Hilliker); Olivenhain MWD Div 1/4 (Lanfried, Hahn); Padre Dam Div 3 and Div 5 (Pommering; "Padre Dam Board Member Area 5: Rocky Qualin"); Alpine Fire Protection (Barron Willis); Fallbrook Community Planning Group (Jonathan Smith).

## Name normalization (choice = ROV ballot name)
Bishop Art Hodges → Art Hodges; William Lee Exeter → Bill Exeter; Michael A. Cline → Michael Cline; Christopher Ranglas → Chris Ranglas; Dr. Gary Woods → Gary Woods; Randolph S Lenac → Randy Lenac; Maggie T Watkins → Maggie T. Watkins.

## KPBS vs. own page
KPBS lists Imperial Beach D1 "Carol Seabury (Not listed as a candidate.)", but the party's page says Steve Berry, who is on the ballot. KPBS omits Rancho Santa Fe School's Paul Seitz, gives "Measure A — NO POSITION" (Measure A is not on the party's page, so it is omitted), and shows CD-52 "None endorsed". The own page governs everywhere except the state props.

## Conventions
City, district, and measure titles follow the conventions in the SD County Democratic Party Nov NOTES.md, shared across this batch.
