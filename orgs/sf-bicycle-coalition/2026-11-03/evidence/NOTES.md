# NOTES — San Francisco Bicycle Coalition, Nov 3 2026 general

## Sources (first-party, as of the 2026-10-19 refresh)

- https://sfbike.org/our-work/bike-the-vote/ was fetched 2026-10-19T21:07:49Z with
  `curl -sL` and a browser User-Agent. This time it returned HTTP 200. Evidence:
  `sfbike-bike-the-vote-2026-10-19.md`.
- The three posts linked from that page were also fetched 2026-10-19 and saved as
  `sfbike-news-*-2026-10-19.md`:
  - https://sfbike.org/news/vote-no-on-prop-g-save-sunset-dunes-park/ ("By SF Bicycle
    Coalition Board on September 2, 2026").
  - https://sfbike.org/news/vote-yes-for-transit-funding-measures-h-and-rtm/ (September
    2, 2026).
  - https://sfbike.org/news/endorsing-scott-wiener-for-congress/ (May 29, 2026).
- Mode is `scraped`. Every position now cites the Bike the Vote page as `source` and
  quotes its list line as `statement`.
- **Fetch quirk:** curl through Schannel failed intermittently on this host with
  "(43) A libcurl function was given a bad argument" or a zero-byte result. Re-running
  the same request succeeded. Cloudflare served the page without a challenge.

## Extracted: 4 positions

- CD-11: Scott Wiener ("Congressional District 11: Scott Wiener").
- SF Prop G: No ("Prop G: NO").
- SF Prop H: Yes, and Regional Measure RTM: Yes ("Prop H and Regional Transit Measure
  (RTM): YES").

## Review flags

- **The page heading is stale.** The endorsement block sits under "# June 2, 2026
  Primary Election". It still covers November, because:
  - SF Props G and H and RTM are on the Nov 3 ballot only (sf.gov qualified-measures
    list; June's only SF measure was Prop A).
  - The linked G and H/RTM posts are dated September 2, 2026.
  - The page's `modified_gmt` is 2026-09-02.
- **CD-11 Wiener** comes from the May 29, 2026 post, written for the primary. It is
  still listed on the page (last updated Sep 2), and Wiener is a Nov finalist, so it is
  kept as a November endorsement. Confirm if strict about primary vs. general.
- **"No position" lines were omitted.** The page has "Congressional District 15: No
  position", "District 2 Board of Supervisor: No position" and "District 4 Board of
  Supervisor: No position". All three sit in the June-headed candidates block, and SF D2
  and D4 had June 2 special elections. It is ambiguous whether these non-endorsements
  were made for June or for Nov, so no `neutral` positions were recorded. Add them as
  `neutral` if you read them as Nov-applicable.
- **Prop G stance:** the post says the board "encourages voters to Vote No on Prop G".
  The Bike the Vote list gives the explicit "Prop G: NO" under "Here are our
  endorsements", so it is `endorse` with `choice` "No".
- The SF measure and RTM titles follow the alice-b-toklas-club bundle.

## Refresh log

### 2026-10-19

- **Rebuilt from the first-party page.** The 10-15 bundle had cited the sfendorsements.com
  aggregator because sfbike.org returned 403. Its evidence file
  (`sfendorsements-aggregator.md`) is kept for history.
- The same 4 positions are on the first-party page, with no picks changed, added or
  removed:
  - `source` was changed from https://sfendorsements.com/ to the Bike the Vote page.
  - Verbatim list-line `statement`s were added. The aggregator-based version had none.
  - `attribution.sources` now lists the Bike the Vote page and the three linked posts;
    sfendorsements.com was dropped, since no position cites it now.
  - `retrieved_at` was updated to 2026-10-19T21:09:26Z.
- The earlier question, whether there are more picks (e.g. D8 or D10) that the
  aggregator missed, is answered: no. The page has no other candidate endorsements.
