# NOTES — Republican Party of Los Angeles County (LAGOP), Nov 3 2026 general

## Sources

- https://www.lagop.org/ — home page. Its banner ("A Better LA Voter
  Guide", "CLICK HERE!") links to the lookup tool below. lagop.org has no
  other endorsement page (sitemap checked; /voterguide2026 is a 404,
  /candidates is a candidate-intake form).
- https://lagop-endorsement-lookup.vercel.app/ — "LAGOP Endorsement
  Lookup", "Paid for by the Republican Party of Los Angeles County". Static
  HTML holds the judicial-retention list, the 14 state propositions, the
  badge key, and the "About this tool" text. Scraped with curl.
- The candidate list is not in the HTML; it is a static array inside the
  tool's Next.js page chunk
  (`/_next/static/chunks/app/page-032807d61a977538.js?...`). I fetched
  that file and read it as text only (never executed), extracting every
  `{id, name, office, jurisdiction, ..., endorsementSource}` record (123
  records). They are reproduced in `lagop-endorsement-lookup-data.md`.
  Each position cites the tool URL as `source`, since that is what voters
  see. The statement quotes the record fields.

## Extracted: 139 positions

- Stance mapping, per the tool's own key:
  - `LAGOP` ("Officially endorsed by the Los Angeles County Republican
    Party") → `endorse`. 64 records.
  - `CAGOP` ("Officially endorsed by the California Republican Party
    (statewide offices)") → `endorse`. 7 statewide offices. These are
    CAGOP endorsements that LAGOP republishes as its picks; flagged
    below.
  - `Recommended` / `Recommended (Steve Cooley)` ("Recommended in races
    without a formal party endorsement") → `lean_for`. 22 records.
  - `Do not vote (DSA-LA recommended)` / `Do not vote (DSA-LA slate)`
    (key: "Do not vote for — Backed by the Democratic Socialists of
    America (DSA-LA)") → `oppose`. 12 records.
- Races: 7 statewide, 15 congressional, 7 state senate, 20 assembly,
  Sheriff, LA City (Attorney, CD 3, CD 9, Mayor), 12 other city councils,
  school / college / special-district boards, 3 Superior Court offices,
  plus the 12 "Do not vote for" opposes.
- 20 judicial retention, all "Vote NO on keeping every Supreme Court and
  Court of Appeal justice on your ballot": 2 Supreme Court, 18 Court of
  Appeal Second District (Divisions One–Eight). Encoded `endorse` / `No`.
- 14 state propositions: No on 1, 2, 3, 4, 5, 37, 40, 44; Yes on 38, 39,
  41, 42, 43, 45.

## Skipped

- 16 records badged `Reform CA` / `Endorsed by Reform CA` (key:
  "Endorsed by Reform California, an allied group"). These are another
  organization's endorsements shown in LAGOP's tool, not LAGOP's own
  endorsement, so they are omitted: Sharon Kwan (Arcadia D2), David
  Phillip Donahue (Burbank), Michael Allawos (Glendora D1), Raymond
  Vergara (Hawthorne Treasurer), Sergio Roberto Mortara (Hawthorne
  council), Kristina Irwin (LACCD Seat 2), David Cienfuegos and Judith
  Manouchehri (Beverly Hills USD), Joseph Manacmul (Downey USD 7), Marybel
  Micaela Lorenzo and Malaika Ware (Norwalk-La Mirada USD 2, 6), Soo Yoo
  (ABC USD 2), Barbara Gaines (AVCCD 5), James Cody Birkey (Cerritos CCD
  3), C.J. Cohick (Glendora USD 2), Tracy Burns (WRD Division 3).
- Superior Court Office 131: Donna Tryfman and David Ross are both badged
  "Either is acceptable". Ambiguous, so omitted.
- The tool has no picks for LA County local measures or city measures.

## Top-two check

All endorsed / recommended / opposed candidates were checked against the
SOS certified list (8/27/2026) and the LA County Registrar's "Final List
of Qualified Candidates to Appear on the Ballot". All are on the Nov 3
ballot. The tool already uses ballot names (e.g. "Charles Frederick
Hughes", "Donald P. (Don) Wagner"); `choice` keeps them, except "Angélica
Dueñas" → ballot name "Angélica María Dueñas".

## Flags for review

1. **CAGOP-badged statewide picks** are included as `endorse`. A
   reviewer could argue these are CAGOP's, not LAGOP's; the tool presents
   them as the party's endorsements under LAGOP's paid-for line.
2. **"Do not vote for" → `oppose`.** This is explicit voter guidance
   against named candidates (e.g. Nithya Raman for LA Mayor, Marissa Roy
   for City Attorney, Jane Kim for Insurance Commissioner). LAGOP gives
   no positive pick for LA Mayor or CD 9.
3. AD 66 "Paul Seo" (a Democrat) is badged `Recommended` → `lean_for`.
4. **New titles invented**: `California Court of Appeal, Second District —
   Retain Justice <Name>` (18, `us/ca/coa-2`), `Rancho Palos Verdes City
   Council`, `Antelope Valley Community College District Board, Trustee
   Area 2` / `4`, `Antelope Valley Joint Union High School District
   Board, Trustee Area 1`, `Palos Verdes Library District Board of
   Trustees`, `Antelope Valley-East Kern Water Agency Board, Division 3`.
5. Inglewood USD "Trustee Area 3" (tool) mapped to the existing title
   `Inglewood Unified School District Board, District 3`.
