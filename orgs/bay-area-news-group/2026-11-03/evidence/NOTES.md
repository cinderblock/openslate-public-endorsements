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

## Refresh 2026-10-28

Fetched at 2026-10-28 9:04–9:05 AM PDT (16:04–16:05Z) with Windows `curl.exe`
and a browser User-Agent. Git Bash's `curl` failed on these hosts (exit 43, no
bytes), but `curl.exe` worked.

- Cheat sheet, East Bay Times copy:
  `eastbaytimes-endorsement-cheat-sheet-2026-10-28.md`. The page now reads
  "UPDATED: October 27, 2026 at 4:29 PM PDT".
- Cheat sheet, Mercury News copy:
  `mercurynews-endorsement-cheat-sheet-2026-10-28.md`. Its endorsement text is
  identical to the East Bay Times copy; only the share buttons, sidebar and
  one apostrophe in the subhead differ.
- The 10-26 editorial "Endorsement: Reject Props. 1 and 37: Californians
  can’t borrow their way out of our housing crisis."
  (`eastbaytimes-endorsement-props-1-37-2026-10-28.md`). It was fetched only
  to confirm the Prop 37 change, and is not a `source`.
- Index pages, used for discovery only: https://www.mercurynews.com/opinion/endorsements/
  and https://www.eastbaytimes.com/opinion/endorsements/. Every November
  editorial on them through 10-27 is reflected in the cheat sheet: Nagales,
  Prop 5, Props 40/41/42, Wahab, OUSD, Oakland EE, Props 1/37 and Prop 3.

The intro now says "Here are our recommendations, so far" and adds "per
company policy, we do not endorse in gubernatorial races". So Governor will
never be filled.

Positions: 28 → 35.

- **Changed (1):**
  - Prop 37: Yes → **No**. The cheat sheet now reads "Prop. 37 — No", with
    "This measure looks great on the surface. But all that glitters isn’t
    gold." The 10-26 editorial concludes "Reject Propositions 1 and 37."
  - The 10-19 cheat sheet had "Prop. 37 — Yes" with no blurb, and no
    standalone editorial on it. Either the board changed its pick, or the
    10-19 line was an error that the full editorial corrected.
  - `choice_id` was moved from `…/yes` to `…/no`.
- **Restated (1):** the RTM list line changed from "Measure RTM (aka Bay
  Area’s Regional Transit Measure) — No" to "Measure RTM — No". The pick is
  unchanged. The statement now quotes the current wording.
- **Added (7):**
  - San Jose Unified School District, Area 4: Michael Melillo (`San Jose
    Unified School District Board, Trustee Area 4`).
  - Gilroy Unified School District Measure M: Yes (`Gilroy Unified School
    District — Measure M (School Bonds)`).
  - San Mateo County Board of Supervisors, District 5: Mark Nagales. The
    ballot contest is `San Mateo County Board of Supervisors, District 5
    (Short Term)`, which is the only D5 contest on the San Mateo listing.
  - Oakland Measure EE: No.
  - Oakland Unified School District D2: Arielle Fleisher.
  - Oakland Unified School District D4: Kathryn Camp.
  - Oakland Unified School District D6: Alexandra Williams.
- **Removed:** none. Every other position's statement is still verbatim on
  the 10-27 page.
- **Still pending:** the page still says "so far" and "we will add new
  endorsements between now and Nov. 3". Re-scrape around 11-01 if there is
  time.
- **Marin IJ reruns:** after 10-19, the Marin IJ ran BANG's Prop 43
  (marinij.com 2026/10/21), Prop 5 and Prop 45 (both 2026/10/22) editorials,
  plus its own roundup on 10-23. Those belong to the
  `marin-independent-journal` bundle's owner. Nothing was copied here.
- All titles reuse existing subjects. Concord D1/D3/D5 still have no
  `choice_id`, because no Contra Costa listing is loaded.

## Refresh 2026-10-30

Re-fetched the Mercury News roundup with curl on 2026-10-30 9:33 AM PDT (16:33Z); header "UPDATED:
October 30, 2026 at 9:23 AM PDT". One addition: **San Mateo Community College District Measure V:
No** (editorial 10-29: https://www.mercurynews.com/2026/10/29/endorsement-reject-san-mateo-community-college-districts-848-million-measure-v/).
Everything else matches the bundle, including Michael Melillo and Gilroy Measure M. The page still
says "so far". No page text saved for this refresh; the record is this note and the quote in the
position.
