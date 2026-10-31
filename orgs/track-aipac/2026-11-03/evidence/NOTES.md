# NOTES — Track AIPAC, Nov 3 2026 general (California picks only)

## Sources

All fetched 2026-10-30 8:05 PM PDT (2026-10-31T03:05:49Z).

- https://www.trackaipac.com/endorsements, "Candidates Endorsed By Citizens
  Against AIPAC Corruption" and "Our Endorsed Incumbents".
- https://www.trackaipac.com/candidates, headed "Pro-Israel candidates".
- https://www.trackaipac.com/congress, every sitting member, with a scorecard
  graphic for most of them.
- https://www.trackaipac.com/states/california, the same graphics by state.
- https://www.trackaipac.com/blog/updated-methodology, what the red and green
  graphics mean.

The site's footer reads "Track AIPAC / Citizens Against AIPAC Corruption", and
the endorsements are published in the second name. The bundle uses the name the
site goes by.

## Extracted: 53 positions in 46 US House races

| Label | Stance | Count | From |
| --- | --- | --- | --- |
| Endorsed | `endorse` | 8 | `/endorsements`: 6 challengers, plus Lateefah Simon and Ro Khanna |
| Pro-Israel | `lean_against` | 5 | `/candidates`: all 5 California entries |
| Pro-Israel | `lean_against` | 40 | `/congress`: red graphic, on the ballot |

Race titles, ballot names and `choice_id`s are copied from the Secretary of
State bundle.

`mode` is `transcribed` because the rating of sitting members comes from a
graphic (see below), not from page text.

## Review flags

- **`lean_against` is this bundle's reading.** The site never says to vote
  against anyone. Its statement is that "Red graphics are assigned when we
  evaluate a candidate's policy as pro-Israel", in a project that says "We
  support candidates who refuse support from the Israel lobby". `lean_against`
  with the label "Pro-Israel" is the nearest stance; `oppose` would claim more
  than the site says. Every one of these 45 could fairly be dropped, leaving
  the 8 endorsements.
- **"Pro-Israel" as a label.** `/candidates` uses the term as its heading, and
  the methodology uses it for red graphics. `/congress` never prints it beside
  a member, so for those 40 it comes from the graphic plus the methodology.
- **Red is read from images.** `/congress` shows no rating in text. Each
  California member's graphic was classified by mean colour, and a member
  counts as rated only with a red graphic on both `/congress` and
  `/states/california` and no note in the text. Doris Matsui's, Jared Huffman's
  and Connie Chan's were read by eye. Aisha Wahab's plain portrait came out
  red by colour alone; the text check excluded it.
- **The dollar figures are not the rating.** The methodology: "The finance
  record alone is not enough to land a member of Congress (or a candidate) with
  a red graphic." Each statement quotes the site's total, which is a career
  federal figure. Hilda Solis's $3,515 dates from 2000–2008.
- **Moved seats.** `/congress` lists the seat held now, and these four run in
  another district after Prop 50. They were matched by name, and their
  statements keep the site's seat:
  - Ami Bera: CA-06 on the site, CD 3 on the ballot
  - Kevin Kiley: CA-03 on the site, CD 6 on the ballot
  - Ken Calvert: CA-41 on the site, CD 40 on the ballot
  - Linda Sánchez: CA-38 on the site, CD 41 on the ballot
- **CD 40: both candidates rated.** Young Kim and Ken Calvert are both red.
- **CD 7, 11, 22, 23, 29 and 34** have an endorsement against a rated opponent.
  The rest of the rated races have no endorsement.
- **Graphics are older than the fetch.** The ones read carry the date 8/2/26,
  and `/congress` says "Data sourced via the United States Federal Election
  Commission 7/5/26".

## Skipped

- **Green graphics with no endorsement, and members under review.** "Green
  graphics on their own are not endorsements. They are simply scorecards
  representing Israel lobby influence."
  - "We encourage this representative to continue improving their legislative
    record on Israel-Palestine issues": Mark DeSaulnier, Mark Takano, Robert
    Garcia, Maxine Waters, Sara Jacobs. These five show plain portraits.
  - "This representative is newly elected. We are evaluating their legislative
    record": James Gallagher, Aisha Wahab.
- **Not on the ballot.** Nancy Pelosi and Julia Brownley ("Retiring 2026"), and
  Darrell Issa, who has no line on the Secretary of State's list.
- **Senators.** Alex Padilla (next election 2028) and Adam Schiff (2030).
- **Other states.** The bundle follows `aipac-pac`, California only.
  `trackaipac-endorsements.md` keeps the whole list.
- **PEACE Pledge.** https://pledge.trackaipac.com/ lists Ro Khanna from
  California. He is endorsed already, so it adds no position.

## Not captured here

`/endorsements` sends readers to https://voteforpeace.info/ (Organize for
Peace) for state and local candidates. That is another organization and would
be its own bundle.
