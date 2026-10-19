# NOTES: Sierra Club SF Bay Chapter, November 3, 2026 general

## Sources

- https://www.sierraclub.org/sfbay/2026-endorsements: the main list.
- https://www.sierraclub.org/sfbay/november-2026-combined-endorsements-explanations:
  the explanation essays for the SF races and measures, CA-11 and BART D8.

sierraclub.org sits behind an Incapsula bot wall, which returns redirect
loops and 403s to curl and WebFetch. Both pages were read in a real browser
through Claude in Chrome, first around 2026-10-15T01:08Z. The main page was
re-checked unchanged at 2026-10-15T01:18:57Z, which is the recorded
`retrieved_at`. Mode is `scraped`, since the source is HTML text.

The main page says "This page will be updated as endorsements are
finalized". Re-check before the election.

## Extracted: 83 positions

- Federal (5): CD-2 Huffman, CD-10 DeSaulnier, CD-11 Wiener, CD-12 Simon,
  CD-14 Wahab.
- State props (6): Yes on 1, 4 and 5; No on 39, 43 and 45. The page's
  "YES!" or "NO!" is quoted.
- State candidates (13): AD-12 Elward, AD-16 Bauer-Kahan, AD-17 Haney, AD-18
  Mia Bonta, AD-19 Stefani, AD-24 Alex Lee, AG Bonta, Controller Cohen,
  Insurance Commissioner Ben Allen, SoS Weber, SD-2 Connolly, SPI Barrera,
  Treasurer Kounalakis.
- Regional Measure RTM (1): Yes.
- SF (11): BART D8 Barz; Props C, H and I Yes; Prop G No; BoS D2 Sherrill,
  D6 Dorsey, D8 McCoy; D10 Eppler (#1) and Ellington (#2); D4 recorded as
  `abstain` ("The Sierra Club makes no endorsement for District 4
  Supervisor." The explanation page publishes this as an explicit
  non-endorsement).
- East Bay and Marin special districts (9), city measures (4) and city
  candidates (34).

`statement`s on SF items quote the explanation page's opening sentence, and
those positions use the explanation page as `source`. Every other position
uses the main page.

## Ballot verification

- State and federal: every endorsee is a certified finalist on the SOS
  Certified List of Candidates, dated 8/27/2026
  (https://elections.cdn.sos.ca.gov/statewide-elections/2026-general/cert-list-candidates.pdf).
- SF: every endorsee is qualified on
  https://www.sf.gov/candidates-november-3-2026-general-election.
- East Bay and Marin: checked against the official county lists. Alameda:
  https://www.alamedacountyca.gov/rov_app/candidatelist (election 260) and
  the measure list at https://acvote.alamedacountyca.gov/election-information/elections?id=260.
  Contra Costa: https://www.contracostavote.gov/wp-content/uploads/8-27-26_candidatelist_detail_final.pdf
  and .../8-14-26_candidatelist_summary_final.pdf. Marin:
  https://www.marincounty.gov/departments/elections/november-3-2026-general-election/information-and-about-candidates-110326/local-candidates-ballot-110326
  and the Measure X page.

## Omitted: listed on the page but not on the Nov 3 ballot

- **Alameda County Board of Supervisors, District 3: Lena Tam.** She was
  the only qualified candidate in June and won outright, so there is no
  November contest.
- **Marin County Board of Supervisors, District 1: Mary Sackett.** She won
  outright in June with 85.05% (official Marin final results).
- **Richmond City Council: Doria Robinson (D3) and Cesar Zepeda (D2).**
  Both seats were decided in June. Zepeda was unopposed; Robinson won
  68.94%, per Contra Costa unofficial update 4 dated 6/17, and the margins
  are decisive. Only Richmond Mayor is on the Nov ballot.
- **EBMUD Ward 2: Luz Gomez** and **EBRPD Ward 6: John Mercurio.** Each was
  the only qualified candidate, and neither contest appears on Contra
  Costa's final on-ballot list dated 8/27. This is consistent with
  appointment in lieu of election, though not stated outright. Very likely
  not on the ballot.

These look like leftovers from the June page or like the chapter listing
uncontested allies. The positions are dropped per the top-two rule.

## Judgment calls

- **Name corrections, made so collation matches the ballot and other
  bundles.** The original spelling is noted in `statement` in each case.
  - "Shirley Webber" [sic] becomes Shirley Weber.
  - "Rebecca Bauer Kahan" becomes Rebecca Bauer-Kahan, the June title
    spelling.
  - "JR Eppler" becomes J.R. Eppler. The explanation page itself writes
    "J.R. Eppler".
  - "Murphy McCulley" becomes Murphy McCalley, the Alameda ballot spelling.
  - "Rebecca Barrett" becomes Becca Barrett, the Contra Costa ballot name.
  - "Orlo Loma Sanitary District" [sic] becomes Oro Loma Sanitary District.
  - "Juan Gonzalez" is kept; the ballot has JUAN GONZÁLEZ III.
- **Concord** lists "Council" without a district. The county list shows
  Kuslits in District 3 and Nakamura in District 5, so the district
  titles are used.
- **Ranked choice.** For Berkeley D1 (Bernet #1, Wrubel #2) and SF BoS D10
  (Eppler #1, Ellington #2), both candidates are recorded as `endorse`,
  with weight 1 for #1 and 0.5 for #2.
- **Two-seat or at-large councils** (Albany, El Cerrito, Larkspur): one
  `endorse` per endorsee on the same race title, as in June.
- **Measure titles.**
  - Berkeley U and AA use the Alameda County ROV labels, "Bond Measure" and
    "Soda Tax Measure". The ballot questions have no short title. The
    chapter's own labels, "Infrastructure Safety" and "Sugar Sweetened
    Beverage Special Tax", are quoted in `statement`.
  - Alameda (city) L uses the ballot question's own title, "SAFER Alameda
    Act". It uses jurisdiction `us/ca/city-of-alameda` so it does not clash
    with `us/ca/alameda`, which the June bundles use for Alameda County.
  - Sausalito X normalizes the official "Arts. Industrial & Maritime..."
    (the stray period is in the ballot text) to "Arts, Industrial &
    Maritime Preservation and Improvement Initiative".
- **New jurisdictions:** EBMUD uses `us/ca/ebmud` and EBRPD uses
  `us/ca/ebrpd`, because both span Alameda and Contra Costa. AC Transit
  keeps June's `us/ca/alameda`. The Contra Costa College District uses
  `us/ca/contra-costa`.
- **State props.** The chapter page links to Sierra Club California for its
  full state-ballot slate. Only the six props listed on the chapter page
  itself are recorded here.

## Refresh log

### 2026-10-19: refresh attempted, not possible

- The task was to re-fetch, since the main page says it "will be updated as endorsements
  are finalized". Claude in Chrome was off-limits for this pass because the browser is
  shared with other agents, and every non-browser route failed:
  - `curl -sL` with a browser User-Agent, cookies and Accept headers, on both pages:
    HTTP 200 with a 212-byte Incapsula JS-challenge stub (`/_Incapsula_Resource?...`).
  - WebFetch on https://www.sierraclub.org/sfbay/2026-endorsements returned empty content.
  - The `?_format=json` and `/sfbay/rss.xml` variants got the same Incapsula stub.
  - Wayback Machine: the newest snapshots are 2026-10-09 (main page) and 2026-10-02
    (explanations). Both are older than the 10-15 capture, so they are no use.
- **Positions are unchanged:** still 83, with the same picks and the same sources, and
  `retrieved_at` is still 2026-10-15T01:18:57Z.
- **Statements were filled in.** 50 positions had no `statement`. Each one now quotes its
  verbatim list line from the 10-15 capture (`sc-sfbay-2026-endorsements.md`), e.g.
  "Representative D2: Jared Huffman" or "Council: Robin Lopez". This meets the round-2
  rule that every position carries a verbatim quote. The 33 existing statements were
  left as they were, including the `Listed as "..."` ones that record name corrections.
- `positions.json` was re-serialized by a script (2-space JSON, UTF-8, LF), so the diff
  may show whitespace or escaping changes beyond the 50 new `statement` lines.
- Next refresh needs a real browser session, run by one agent at a time.

## Refresh 2026-10-19 (coordinator, Chrome)

Re-read the main page in a real browser at 2026-10-19T22:45Z; saved as
`sc-sfbay-2026-endorsements-2026-10-19.md`. Diff against the 10-15 capture:
one addition, **Senate D10: Scott Sakakihara** (SOS-certified finalist vs.
Linda R. Price). Senate D2 Damon Connolly only moved within the list. No other
changes. The page still says it "will be updated as endorsements are finalized".
83 → 84 positions.
