# NOTES: Peace and Freedom Party, November 3, 2026 general

First built 2026-10-15; refreshed 2026-10-19 (latest fetch 2026-10-19T21:03:36Z UTC). Mode `scraped`.

## Sources

| Source | Used for |
| --- | --- |
| https://www.peaceandfreedom.us/index.php/news/elections-campaigns/november-2026-voting-guide | **All 22 positions** (since the 2026-10-19 refresh). The party's own "November 2026 Voting Guide", dated 17 October 2026. Evidence: `pfp-november-2026-voting-guide.md`. |
| https://www.peaceandfreedom.us/index.php/news/elections-campaigns/june-2026-california-primary-results-growing-vote-for-peace-and-freedom-and-left-unity | The original source for the 3 Assembly positions (post dated 10 July 2026). Kept as evidence and as corroboration; the positions now cite the November guide instead. |
| https://www.peaceandfreedom.us/index.php/news/november-2026-election-part-2-a-suds-snacks-and-socialism-forum-at-the-starry-plough | Checked 2026-10-15, no positions taken (see below). |

`https://www.peaceandfreedom.org/` (the domain named in the refresh task) returns a 301 redirect to `http://www.peaceandfreedom.us`. It is the same site, so `meta.yaml`'s `uri` is unchanged.

## Extracted (22 positions)

### Candidates (8)

- **AD 14: Mark Rendon.** The guide spells it "Mark Rendón" and the statement quotes that; `choice` uses the ballot name "Mark Rendon".
- **AD 59: Victor Hernandez.**
- **AD 63: Kevin Akin.**
- **South San Francisco Unified School District Board, Trustee Area E: Frank Lara** (`us/ca/san-mateo-county`, new title).
- **Berkeley City Council, District 7: Aidan Hill** (existing title).
- **Palo Alto City Council: Raymond Lee Goins** (`us/ca/palo-alto`, new title).
- **Montebello Unified School District Board, Trustee Area 2: Aaron Reveles** (`us/ca/los-angeles-county`, new title).
- **El Cajon Mayor: Alexander Kraft** (existing title).

The guide lists each candidate under the heading "Voting in Northern California" / "Voting in Southern California", as "<Name> for <Office>:". That is a party voting guide, so all are recorded as `endorse`.

### State propositions (14)

- Yes: 2, 3, 4, 5, 40, 44.
- No: 37, 38, 39, 41, 42, 43, 45.
- **Prop 1: `neutral`.** The guide says "Prop 1 - No Recommendation - … We leave it up to you to decide." That is an explicit statement of no position, so it is recorded as `neutral` with no `choice`. (The LA Fed bundle omits its "No Recommendation" entries instead; a reviewer may prefer to omit this one for consistency.)

## Changes in the 2026-10-19 refresh

- **3 → 22 positions.** Added 14 proposition positions and 5 local candidates from the new guide.
- The 3 Assembly positions were kept, but their `statement` and `source` now point at the November guide. This resolves the earlier flag that they were carried over from a post-primary results article.
- `attribution.retrieved_at` is now 2026-10-19T21:03:36Z. `attribution.sources` is now the guide only, since every position cites it.
- New evidence file: `pfp-november-2026-voting-guide.md`. The two 2026-10-15 evidence files are unchanged.

## Ballot verification

- AD 14, 59 and 63 are on the SOS certified list for November 3: AD 14 Buffy Wicks / Mark Rendon; AD 59 Phillip Chen / Victor Hernandez; AD 63 Natasha Johnson / Kevin Akin.
- **El Cajon Mayor:** the SD ROV candidate list has "CITY OF EL CAJON - MAYOR (1) : KRAFT, ALEXANDER; WELLS, BILL" (see `orgs/dsa-san-diego/2026-11-03/evidence/sdvote-candidate-list.md`).
- **Berkeley D7:** the City of Berkeley's "Notice of Candidates Nov 3 2026" (https://berkeleyca.gov/sites/default/files/Notice%20of%20Candidates%20Nov%203%202026%20-%20WEB%20Version.pdf) lists Aidan Hill and Syrak Micael. This was seen through a web-search summary; the PDF itself was not saved.
- **Palo Alto:** the City Clerk's City Council Election page (https://www.paloalto.gov/Departments/City-Clerk/Municipal-Elections/City-Council-Election) lists "Raymond Lee Goins" among eight candidates for three seats. That name is used as `choice`; the guide says "Raymond Goins".

## Flags for review

- **Not verified against an official candidate list:**
  - **Frank Lara, SSFUSD Trustee Area E.** The San Mateo County Elections Office's filing notice confirms that SSFUSD Trustee Areas C, D and E are on the Nov 3 ballot, but no qualified-candidate list was found. Frank Lara was also PFP's June candidate for Superintendent of Public Instruction.
  - **Aaron Reveles, Montebello USD Trustee Area 2.** No LA County qualified-candidate list was found. The RR/CC's tentative list of canceled November elections names Montebello USD Trustee Areas 1 and 3 only, so Area 2 is presumably contested. The title follows the RR/CC's "Trustee Area" wording; the guide says "Area #2".
  - Both are kept because the party's own November guide endorses them for named seats. A reviewer may want to check the county lists for ballot spelling.
- **New titles (for collation):**
  - "South San Francisco Unified School District Board, Trustee Area E" (`us/ca/san-mateo-county`).
  - "Palo Alto City Council" (`us/ca/palo-alto`).
  - "Montebello Unified School District Board, Trustee Area 2" (`us/ca/los-angeles-county`).
- **AD 63 caveat (from the July post):** Akin "is not yet on the Left Unity Slate". He is PFP's own candidate and is listed in the November guide.

## Omitted

- The June statewide endorsees did not advance: Stek (Lt. Gov.), Blenner (SoS), Adams (Controller), Turner (Treasurer), Mikels (AG), Vargas (Insurance), Lara (SPI). Ramsey Robinson (Governor) also did not advance. The November guide endorses nobody in those races.
- Congress 24 and 37, State Senate 8, AD 17 (Wiedmaier, write-in) and AD 18: none of these candidates advanced, and none is in the November guide.
- **The October 3 forum notice** lists Bay Area candidates and a "No on Prop. 45" speaker, co-sponsored with other groups, with the note "Organizations listed for identification purposes only". It is not a party endorsement, so no position came from it. The guide now gives No on 45 directly. Forum speakers Claudia Jimenez (Richmond Mayor), Mari Mendonca (Berkeley D8) and Majdi Gaith (Berkeley D4) are **not** in the November guide, so no positions for them.
- The guide's "Register to vote" text and the Gann-limit explainer are not positions.
