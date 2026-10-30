# NOTES — The Sacramento Bee Editorial Board, Nov 3 2026 general

## Sources and how they were fetched

- sacbee.com (and fresnobee.com) do not answer automated clients. curl hangs
  or fails (exit 28/43); WebFetch says "unable to fetch from www.sacbee.com".
  Every article was therefore fetched from **Internet Archive Wayback Machine
  captures** of the original sacbee.com URLs. Each evidence file names the
  exact capture URL. `source` on each position is the canonical sacbee.com
  article URL. The text is the Bee's own; the Wayback copy is only the
  transport.
- Index: the Bee's "Election Endorsements" section page
  (https://www.sacbee.com/opinion/election-endorsements/), Wayback capture of
  2026-09-30, used to find article IDs. The CDX index of
  sacbee.com/opinion/election-endorsements/* from August 2026 on supplied
  the rest.
- Only articles published after the June 2 primary (September–October 2026)
  were used. April–May 2026 primary endorsements were skipped, including AD 7,
  CD 4, CD 6, CD 22, Lt. Governor, SD 4, Sacramento City Council D7, the
  Placer judge race, and the "McClatchy endorses Eleni Kounalakis for
  treasurer" and "Richard Barrera for state superintendent" pieces (both
  May). The Bee did not re-endorse those after June in any article that
  could be retrieved.

## Extracted: 23 positions (from 19 articles)

- Statewide: Governor (Becerra), Controller (Herb Morgan, a Republican).
- Federal: CD 3 (Bera).
- Legislature: AD 1 (Hadwick), AD 6 (Krell).
- Propositions (9): 3 Yes, 4 Yes, 5 Yes, 37 Yes, 40 Yes, 42 No, 43 No,
  44 No, 45 Yes.
- Local: Sacramento County Supervisor D1 (Cofer); Folsom council D1
  Kozlowski, D3 Aquino, D5 Rohrbough; Folsom Measures I, J, K Yes;
  Sacramento City USD Measure M No; Roseville Joint UHSD Area 2 (Jeresia
  Ewell).

## Known gaps (the articles exist but no copy could be fetched)

These appear on the Bee's Sept. 30 index page, but they have no Wayback
capture and the live site cannot be reached:

- "California voters should know what Proposition 41 is about. Here is the
  truth" (article317122476)
- "Doris Matsui vs. Mai Vang: The Bee's choice in Sacramento's hottest
  election" (article317131383, CD 7)
- "Prop. 2 seeks to help California weather the next economic downturn. How
  we voted" (article317091637)
- "Should California require voter and citizenship ID? Our Prop. 39
  endorsement" (article317017898)
- "Read McClatchy Media's endorsement on California's Proposition 1"
  (article317326136)
- Prop. 38, "Proposition 38 is a sleeper on the ballot. California voters
  should beware" (article317166634, cited by a californiatoday.com guide as
  a No). Not encoded, because only a secondhand source was available.

Add these when someone can open sacbee.com in a browser.

## Review flags

- **"Recommends a 'Yes' vote" = `endorse`.** Each prop article's headline
  frames it as "our endorsement" and they sit in the "Election
  Endorsements" section, so they are recorded as `endorse`, not
  `lean_for`.
- **Shared board.** Prop and statewide picks are by McClatchy's combined
  California board ("The Sacramento Bee, Modesto Bee, Merced Sun-Star, Fresno
  Bee and San Luis Obispo Tribune"). Separate Fresno Bee / Modesto Bee
  bundles were NOT created, to avoid counting the same board decision three
  times. Decide whether to alias them.
- Ballot names: "Herb W Morgan" (SOS list), "Flo Cofer" (Sacramento County
  candidate report; the Bee writes "Flojaune Cofer").
- Local titles reuse the Sacramento County Democratic/Republican Party
  bundles byte-for-byte. "Roseville Joint Union High School District Board,
  Area 2" (`us/ca/placer-county`) is new.

## Refresh 2026-10-30

Read in Chrome on 2026-10-30 about 9:45 AM PDT (16:45Z). Added CD 7: the Oct 2 editorial restates
the spring endorsement of Mai Vang over Doris Matsui for November. No page text saved for this
refresh.
