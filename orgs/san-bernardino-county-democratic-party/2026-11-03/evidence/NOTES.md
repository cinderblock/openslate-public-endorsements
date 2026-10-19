# NOTES — San Bernardino County Democratic Party, Nov 3 2026 general

## Sources

- https://www.sanbernardinodemocrats.org/endorsements-nov-2026/
  ("Endorsements – Nov 2026", HTML, scraped). Local races and local
  measures only.
- Statewide races and propositions on that page are a link to the
  California Democratic Party's PDF. They are CADEM's picks, not the county
  party's own list, and are already in the ca-democratic-party bundle, so
  they were not copied.
- Ballot checks: San Bernardino County ROV Nov 3 candidate list
  (https://uploads.rov.sbcounty.gov/ROV/Elections/2026/1103/Report_CandidateList.pdf,
  updated 9/29/2026), measure letter notice
  (https://uploads.rov.sbcounty.gov/ROV/News/2026/1103/PublicNotice_AssignmentOfMeasureLetters.pdf)
  and measures page (https://elections.sbcounty.gov/elections/2026/1103/measures/).

## Extracted: 51 positions

- School and education boards: 16. City offices: 13. Water district: 2.
- Local measures: 20 (Support → Yes: A, C, D, F, I, J, K, M, O, Q, Y, Z;
  Oppose → No: E, G, H, L, N, P; "No Position" → `neutral`: B, R).

## Skipped

- **Not on the ballot** (no such contest on the ROV candidate list, which
  only lists contests that appear on the ballot; these seats were
  presumably uncontested and filled by appointment in lieu of election):
  - Joseph Williams — San Bernardino Community College, Area 2
  - Gwen Dowdy Rodgers — County Board of Education, Area D
  - Chris Cruz — Upland Unified, Area D
  - Clayton Moore — Victor Elementary, Area 4
- **"➖ Fontana Mayor — No Consensus"** was not encoded. "No consensus"
  describes the party's process, not a stated neutral position.

## Judgment calls / review flags

- **Maria Okpara: Area 5 vs. Area 4.** The post says "Apple Valley USD,
  Area 5", but the ROV list has her (incumbent) in the Apple Valley USD
  Area 4 contest; the Area 5 contest is Marc Lacey, Angela Rincon, Mike
  Ricotta Jr and Josh Justice. Encoded under Trustee Area 4.
- **Measure titles.** The ROV publishes no short titles beyond the measure
  type, so titles are "<Jurisdiction> — Measure X (<ROV measure type>)",
  e.g. "Ontario — Measure H (Transactions and Use Tax)". Measure I uses
  the ROV's "San Bernardino County Transportation Authority / Transactions
  and Use Tax". The southern-california-news-group bundle uses
  "Ontario — Measure H (Sales Tax)" for the same measure; the two need
  harmonizing.
- **Measure B (Beaumont Unified)** uses `us/ca/riverside-county`: the
  district is mostly in Riverside County. Check whether Riverside's ballot
  uses the same letter.
- **Invented local titles**, following the San Diego patterns:
  "<District> Board, Trustee Area N" (`us/ca/san-bernardino-county`),
  "San Bernardino County Board of Education, Area B",
  "<City> City Council, District N" / "<City> Mayor" / "<City> City Clerk"
  / "<City> City Treasurer" (city slugs). Rialto's two at-large seats use
  the seat-less "Rialto City Council". SBVMWD Division 1 is a short-term
  seat on the ballot, so its title is "San Bernardino Valley Municipal
  Water District Board, Division 1 (Short Term)".
- **Name forms.** "Dr." dropped (Malinda Hurley). "De Jonae Shaw" →
  "DeJonae Shaw" (ballot: DEJONAE MARIE SHAW). "Rosalio “Rosie” Hinojos" →
  "Rosalio Hinojos". Other names are as printed; the ballot forms differ
  only by middle names/initials (e.g. MALINDA LAURA HURLEY, MIKI R. INBODY,
  FRANCIS "FRAN" HERDLEIN, MICHAEL RIOS for "Mike Rios").
