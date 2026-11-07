# NOTES: The Associated Press articles, November 3, 2026 general

## Source

- apnews.com answers scripted requests with a Cloudflare challenge (403), so this pass used
  a real browser: the T3 preview browser, in an incognito-profile tab. No log-in. No cookie
  or consent banner was accepted. No bot check appeared in the browser.
- Discovery:
  - https://apnews.com/hub/california.
  - AP's search (`/search?q=…`) for each proposition.
  - AP's monthly sitemaps (`/ap-sitemap-2026MM.xml`, May–October), scanned for
    California ballot-measure slugs.
- Verification: each article's HTML was fetched from inside the apnews.com tab (same
  origin) and parsed for `<h1>`, JSON-LD `headline`/`datePublished`/`author`/publisher,
  and `<link rel=canonical>`. After building, every recorded headline, date and canonical
  URL was compared with the live page again, and all matched.
- Fetched 2026-10-27 (UTC). Per-article metadata is in `articles.md`. Mode is `scraped`.

## What's attached (3, all Prop 40)

- "California voters will consider a measure in November to raise taxes on billionaires"
  (2026-06-26).
- "Top Democrats and allies join the wealthiest to fight a California billionaire tax"
  (2026-10-09).
- "Zuckerberg makes deal with Meta to help him pay billionaire tax if it passes"
  (2026-10-22).

## Judgment calls to review

- **No "Prop 40" by number** in the June 26 and Zuckerberg stories. They speak of "the
  billionaire tax" ballot measure. They're attached to Prop 40 because it is the only
  billionaire-tax measure on the ballot.
- **Dates** are the JSON-LD `datePublished` (UTC, `Z`). `article:published_time` on
  apnews.com has no offset.

## Left out

- **AP's own coverage of other propositions.** None was found on apnews.com. The other
  2026 California proposition pieces AP carries are CalMatters stories it redistributes:
  - "Why are out-of-state billionaires funding a California voter ID measure?" (byline
    Nadia Lathan/CalMatters).
  - "Why are pro-housing groups split on Proposition 45?" (Ben Christopher/CalMatters).

  Both are already attached under `calmatters` at CalMatters' own URLs.
- "California labor union offers to scale back billionaire tax proposal after pushback"
  (2026-06-18): before the measure qualified.
- "Union leader behind California billionaires' tax proposal accused of threatening,
  harassing women" (2026-09-11): about the sponsor rather than the measure.
- "Voting-related measures on November ballots include a voter ID push targeting mail-in
  ballots" (2026-10-22): a multi-state roundup that mentions Prop 39 only in passing.
- AP stories on 2024 propositions (36, the mental-health bond) and the 2025 special
  election, which turned up in search.
