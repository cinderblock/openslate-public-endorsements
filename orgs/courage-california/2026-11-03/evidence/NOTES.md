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

Where (2) and (3) overlap (statewide, federal, props) they agree on every
pick. Spelling differences: the PDF has "Angela Gonzalez-Torres" (CD 34) and
"Salul Carbajal" (CD 24); the digital guide has "Angela Gonzales-Torres" and
"Salud Carbajal", which match the ballot listing. The digital guide's
spellings were used.

## Extracted: 164 positions

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

## Skipped

- **Local candidate races in PDF pages 5–10** (roughly 150 city council,
  school board, special district, county supervisor, sheriff and judicial
  endorsements). The PDF's two-column layout comes out of text extraction
  with race names and candidate names misaligned (e.g. two different
  candidates listed under "San Francisco County Board of Supervisors District
  8", county race names separated from their candidates). Too error-prone to
  transcribe reliably. The digital guide has per-county views (county
  selector on progressivevotersguide.com/california) that would be a clean
  source for a follow-up pass.
- Statements: the digital guide has long per-race blurbs. Only the Prop 40
  card's one-line tagline was captured and quoted.
