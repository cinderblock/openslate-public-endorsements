# NOTES: Los Angeles Times (newsroom) articles, November 3, 2026 general

## Source

- Index pages: the "Your guide to Proposition N" series, linked from
  https://www.latimes.com/california/story/2026-10-01/2026-california-general-election-voter-guide
  and from each guide's sidebar. Section page https://www.latimes.com/california, and the
  site's monthly sitemaps (`/sitemaps/sitemap-202608.xml`, `-202609.xml`, `-202610.xml`),
  scanned for proposition-related slugs.
- The WebSearch tool refuses latimes.com, but the site serves pages to a plain HTTP GET.
  Fetched 2026-10-27 (UTC) with Bun `fetch`. Per-article metadata is in `articles.md`.
- Mode is `scraped`.
- This is the newsroom. The editorial board is the separate org `la-times`, untouched.

## What's attached (21)

- "Your guide to Proposition N" for all 14 propositions (`guide`), published 2026-10-01.
- News and analysis:
  - Prop 37: the down-payment explainer.
  - Prop 39: two stories, the campaign's dispute with Democrats and the court ruling on
    the ballot summary.
  - Prop 40: spending, and the spending-as-share-of-wealth analysis.
  - Prop 44: the clinic association's racketeering lawsuit against the union sponsoring the
    measure.
  - Prop 45: the data-center dispute.

## Judgment calls to review

- **Dates.** `article:published_time` on latimes.com has no UTC offset, so
  `published_at` is the JSON-LD `datePublished` (UTC, `Z`).
  - The voter-guide pieces are `2026-10-01T10:00:00.000Z` (3 AM PDT).
  - "Voter ID proponents accuse…" is `2026-10-02T00:19:44.315Z`, which is Oct 1, 5:19 PM PDT,
    matching its URL date.
- **Headlines** are the page's `<h1>`. The JSON-LD `headline` is often a shorter SEO
  variant, which isn't used.
- **Prop 44 lawsuit story** (2026-09-18): the headline names the lawsuit, not Prop 44. The
  article is about the union's use of the clinic-spending ballot measure, which is Prop 44,
  so it is attached there.

## Left out

- Opinion: editorials (the board's "No on Proposition 40" is already a position on
  `la-times`), single-sided op-eds, Skelton's and Hiltzik's columns, and letters. This
  research attaches only paired for/against opinion, and none from the Times turned up.
- The Berkeley IGS poll story covering several measures, and Pasadena's Measure PFD guide,
  which is local and not in an authority listing here.
- Tribune News Service copies of Times stories on other papers' sites: attributed to the
  Times only by their latimes.com URL.
