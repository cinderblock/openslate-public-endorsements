# NOTES: DSA Los Angeles (DSA-LA), Nov 3 2026 general

## Sources

- https://voterguide.dsa-la.org/ is the "2026 DSA-LA General Voter Guide" ("Voting ends
  Nov 3"). https://dsa-la.org/voter-guide/ redirects to it. The page was scraped as HTML
  (English version) on 2026-10-19T22:44:31Z. Each race is an `<article id="...">`, so
  every position's `source` is `https://voterguide.dsa-la.org/#<race-id>`.
- The guide also has a print PDF (https://dsa-la.org/2026-general-voter-guide). It was not
  used, because the HTML has every race.
- The guide explains its labels in its own words:
  - "🌹 Endorsed": "Requires a membership vote. The chapter commits time and resources
    to the campaign."
  - "👍 Recommended": "An editorial pick."
  - "Opposed": "An active opposition."
  - "Vote YES" / "Vote NO": "The chapter's yes-or-no position on a ballot measure."
  - "No recommendation": "we explain why we didn't take a side".

## Stance mapping

- "🌹 Endorsed" → `endorse`.
- "👍 Recommended" → `lean_for`. The org itself separates the endorsed and recommended
  tiers, which is exactly the round-2b case for `lean_for`.
- "Opposed" (Alex Villanueva, Sheriff) → `oppose`.
- "Vote YES" / "Vote NO" → `endorse` with `choice` "Yes" / "No".
- "No recommendation" → `abstain` with no choice (SPEC §3.6, round-2b rule).

## Extracted: 107 positions

By stance: 18 endorse, 47 lean_for, 1 oppose, 41 abstain. By kind: 93 races, 14 measures.

- **Endorsed (9 candidates, the guide's "nine candidates"):**
  - LA City: Mayor Nithya Raman, City Attorney Marissa Roy, CD 9 Estuardo Mazariegos.
  - Local: West Hollywood City Council Stephen Post; Centinela Valley UHSD TA 5 Estefany
    Castañeda; Inglewood USD TA 3 Yaritza Gonzalez; Burbank City Council Nolan
    Southerland and Mike Van Gorder.
  - Congress: CD 34 Angela Gonzales-Torres.
- **Measures (10 endorse Yes/No, 4 abstain):**
  - LA County: A No, E Yes.
  - LA City: TE No; LA, PL, PRK and PRT Yes; EE, SC and FD abstain.
  - Inglewood: AT Yes; BB abstain. Inglewood USD: MM Yes.
- **Recommended (lean_for):**
  - LA City: CD 3 Girvan.
  - LACCD: Seat 2 Cabrera, Seat 4 Harris, Seat 6 Winston.
  - Superior Court: Office 64 Haymon, Office 131 Ross.
  - Board of Equalization 3: Sukaton.
  - Santa Clarita: City Council D2, D4 and D5; Hart UHSD TA 2 and TA 5; Saugus USD TA 1,
    TA 2 and TA 5; SCV Water Agency Div 1.
  - SELA: Lynwood (×3), Huntington Park D2, Cudahy (×2).
  - West Hollywood: Byers, Krieger.
  - San Gabriel Valley: Alhambra D1 and D5, Monterey Park D5, West Covina D2.
  - South Bay: Inglewood USD TA 2.
  - Burbank: Perez. Santa Monica: Torosis, Ivanov, Morrow.
  - Legislature: SD 20, 24, 26 and 28; AD 34, 40, 44, 51, 55, 61 and 66.
  - Congress: CD 29, CD 37.
  - Supreme Court: retain Kelli M. Evans (see flags).
- **No recommendation (abstain):**
  - Superior Court Offices 65 and 87.
  - Inglewood USD TA 1; West Covina D4 and D5.
  - SD 22 and 30.
  - AD 39, 41, 42, 43, 46, 48, 49, 52, 53, 54, 56, 57, 62, 64, 65, 67 and 69.
  - CD 26, 27, 28, 30, 31, 32, 35, 36, 38, 41, 42, 43 and 44.

## Republished from California DSA

The guide's "State of California" section says: "We partner with California DSA to provide
statewide recommendations ... we've integrated California DSA's recommendations and
endorsements right here", and it links "THEIR FULL VOTER GUIDE"
(https://www.californiadsa.org/voterguide). The section ends with: "Thanks, California
DSA! Now, back to the rest of our voter guide." So these are California DSA's picks
republished, and per the round-2b rule they are NOT in positions.json. Source for all of
them: https://voterguide.dsa-la.org/#ca-governor through #ballot-measure-ca-prop-45.

- Governor, Lieutenant Governor, Attorney General, Secretary of State, Treasurer,
  Controller: No recommendation.
- Superintendent of Public Instruction: Sonja Shaw, Opposed.
- Insurance Commissioner: Jane Kim, 👍 Recommended.
- Props 1, 2, 5, 44: Vote YES ("We recommend a Yes vote").
- Props 3, 4, 40: Vote YES ("🌹 Endorsed by California DSA").
- Props 38, 45: Vote NO ("We recommend a No vote").
- Props 39, 41, 42, 43: Vote NO ("🌹 Endorsed by California DSA").
- Prop 37: No recommendation.

The legislative and congressional sections come after that closing line, so they are
treated as DSA-LA's own. The intro does say volunteers statewide "develop
recommendations for state and federal races". A reviewer may decide those should move
under this heading too.

## Flags for review

- **Superior Court picks follow La Defensa.** The guide says "This year, we're going to rely
  on the guidance from La Defensa", the cards carry "Recommended by La Defensa", and the
  guide adds "Following our friends at La Defensa, we recommend voting for: Rhonda Haymon
  for Office No. 64 / No recommendation for Office No. 65 / No recommendation for Office
  No. 87 / David Ross for Office No. 131". They are kept because the recommendation is
  stated in DSA-LA's own voice ("we recommend"), and La Defensa has no bundle in this repo.
  If the co-signer mechanism should cover them, move all four to a "Republished from La
  Defensa" section.
- **Cudahy** says "Following UNITE HERE Local 11, we recommend you vote for the two
  Cynthias". This is the same situation in a single race. It is kept as DSA-LA's own
  recommendation.
- **Retention elections.** The Supreme Court & Appellate section gives no badges. Only
  Kelli Evans gets a clear call ("you should vote yes to retain her"), recorded as
  `lean_for` Yes. All other justices are hedged and were omitted:
  - Groban: "if you're looking for a reason to vote no, that's as good as any".
  - Four former prosecutors and six corporate lawyers: "You could vote no on these ...
    although ...".
  - The rest: "You should probably vote yes on them, unless you know something about them
    we don't".
- **"Do NOT support" without a badge.** West Hollywood says "Do NOT support: Joe
  Zalvidar ... Kody Christiansen ...", but those two have no "Opposed" badge. They were
  omitted as ambiguous. The ballot name is Joel Zaldivar.
- **Huntington Park D4 and D5:** "None of the candidates in Districts 4 or 5 are worth a
  recommendation; you can pick your own poison or leave it blank." This is not a formal
  "No recommendation" stamp, and there is no existing subject for those districts, so
  nothing was recorded. A note says an earlier version of the guide recommended
  Amezquita; the current guide recommends Nancy Martiz for D2.
- **LACCD Seat 2 (Cabrera)** has a "Recommended" badge, but the text is lukewarm: "Veres
  should win handily ... but you can defend a vote for Cabrera". Kept as `lean_for`,
  following the badge.
- **Choice spellings** follow the ballot or existing bundles, while statements keep the
  guide's text:
  - "Chris Turnkey" → `Chris Trunkey` (ballot: CHRISTOPHER TRUNKEY, Saugus TA 5).
  - "Juan Muñoz-Guevara" → `Juan Muñoz` (existing repo choice; ballot: JUAN MUNOZ-GUEVARA).
  - "Mike van Gorder" → `Mike Van Gorder`.
  - "Yaritza González" → `Yaritza Gonzalez`.
  - "Angelica Dueñas" → `Angélica María Dueñas`.
  - "Colin Hernandez" → `Colin D. Hernandez` (ballot name; new choice string).
  - "Danny Ivanov" kept, matching the repo majority (ballot: DANIEL IVANOV).
- **Inglewood USD titles.** The guide says "Trustee Area 1/2/3", but the existing titles
  "Inglewood Unified School District Board, District N" were reused.
- **Finalist check:** every named candidate appears on the SOS certified list (state and
  federal) or the LA County RR/CC candidate list (local). Villanueva and Luna are the
  Sheriff finalists.

## Invented titles

None. Every subject title and jurisdiction already existed in the repo.

## Not on the Nov 3 ballot: removed 2026-10-23

The catalog's ballot check found these positions on seats no ballot carries: each was uncontested and is filled by appointment in lieu of election. They were removed, since a position here has to map to a ballot entry.

- Centinela Valley Union High School District Board, Trustee Area 5: Estefany Castañeda. Not on the ballot: the LA County Registrar's tentative list of canceled elections for Nov 3, 2026 ("APPOINTMENT IN LIEU OF ELECTION DUE TO INSUFFICIENCY OF CANDIDATES", https://content.lavote.gov/docs/rrcc/documents/canceled-elections-november-2026-tentative.pdf) lists the seat, and it isn't in the county's contest list.
