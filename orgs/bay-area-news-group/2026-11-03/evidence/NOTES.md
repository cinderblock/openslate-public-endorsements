# NOTES — Bay Area News Group editorial board (Mercury News & East Bay Times), Nov 3 2026 general

## Sources

- https://www.eastbaytimes.com/2026/10/13/bay-area-news-group-california-election-endorsements-november-2026/
  (HTML, scraped). "Endorsement Cheat Sheet: Mercury News and East Bay Times
  Editorial Boards' top picks for California's Nov. 3 general election", by
  "Mercury News & East Bay Times Editorial Boards". Published October 13, 2026
  and updated October 19, 2026 at 10:26 AM PDT. This is the primary source and
  the `source` of every position.
- https://www.mercurynews.com/2026/10/13/bay-area-news-group-california-election-endorsements-november-2026/
  is the same article on the Mercury News site. Its body text matches the East
  Bay Times copy apart from one apostrophe in the subhead, so BANG publishes a
  single shared list and this is one org, not two.
- Discovery only, not cited: the endorsement index pages
  https://www.mercurynews.com/opinion/endorsements/ and
  https://www.eastbaytimes.com/opinion/endorsements/, reached through the link
  on the Marin IJ roundup ("Click here for Bay Area News Group editorial board
  endorsements"). Every November editorial on the index (Ma, Allen,
  Kounalakis, Barrera, RTM, Props 38/39/43/44/45, Palo Alto J, Concord) also
  appears in the cheat sheet, so the cheat sheet is enough on its own.

## Extracted: 28 positions

- Statewide offices (4): Lt. Governor Fiona Ma, Treasurer Eleni Kounalakis,
  Insurance Commissioner Ben Allen, Superintendent of Public Instruction
  Richard Barrera.
- State propositions (14): No on 1, 4, 5, 38, 39, 40, 41, 42 and 44; Yes on 2,
  3, 37, 43 and 45.
- Regional: Measure RTM — No.
- Federal and legislative (2): CD 14 Aisha Wahab and SD 10 Scott Sakakihara.
  Both are top-two finalists on the SOS certified list (CD 14 is Hernandez vs.
  Wahab; SD 10 is Sakakihara vs. Linda R. Price).
- San Jose City Council (3): D5 Peter Ortiz, D7 Bien Doan, D9 Genny Altwer.
  All are on the Santa Clara ROV list as finalists.
- Palo Alto Measure J — No.
- Concord City Council (3): D1 Laura Hoffmeister, D3 Dena Acosta Beere, D5
  Laura Nakamura.

All titles and jurisdictions reuse existing subjects byte-for-byte, including
the props, the statewide offices, `Bay Area — Regional Measure RTM (Regional
Transit Measure)` and the San Jose, Palo Alto and Concord subjects that other
N1 bundles created. No titles were invented.

## Judgment calls / flags for review

- Stance: the article calls these "our endorsements", so every pick is
  `endorse`. "No" on a measure is encoded as `endorse` with `choice: "No"`.
- Choice spelling follows the ballot. The editorial writes "Dena Acosta-Beere";
  the Contra Costa ROV certified list has "DENA ACOSTA BEERE", so `choice` is
  "Dena Acosta Beere". The statement quotes the editorial's spelling.
- Some statements join two verbatim fragments with " … ": the list line and a
  sentence from the paragraph under it. Each fragment is checked verbatim
  against the page text. List-only entries (most props, SD 10, SJ D5/D7,
  Concord) quote only the list line.
- The page says "Here are our endorsements, so far" and "we will add new
  endorsements between now and Nov. 3". Re-scrape closer to Nov 3 for more
  races (e.g. Alameda/Contra Costa locals).
- Primary-season picks are left out unless the November cheat sheet repeats
  them. Examples: David Cohen for SD 10 (he did not advance), and the San
  Mateo County superintendent and assessor and Contra Costa assessor and
  superintendent picks from May. Those were June contests and the November
  list does not mention them.
- Marin IJ, a BANG paper, reruns these statewide editorials under its own
  masthead. Its bundle (`marin-independent-journal`) deliberately does not
  include them.
