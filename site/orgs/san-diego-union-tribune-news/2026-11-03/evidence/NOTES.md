# NOTES: San Diego Union-Tribune (newsroom) articles, November 3, 2026 general

## Source

- Index pages: https://www.sandiegouniontribune.com/news/politics/, and the site's
  WordPress search API (`/wp-json/wp/v2/posts?search=…&after=2026-08-01`) for "Proposition",
  "Prop 45" and the like.
- Fetched 2026-10-27 (UTC) with Bun `fetch`. Per-article metadata is in `articles.md`.
- Mode is `scraped`.
- This is the newsroom. The editorial board is the separate org `san-diego-union-tribune`,
  untouched.

## What's attached (9)

- "What to know about Proposition N before California voters in the 2026 election" for
  Props 1–5 (`explainer`).
- News on:
  - Prop 1: San Diego angle.
  - Prop 38: San Diego research institutions.
  - Prop 39: final campaign push.
  - Prop 45: San Diego angle.

## Judgment calls to review

- **Bylines on the 1–5 series** are Linh Tat, Charlie Borla and Kaitlyn Schallhorn, who
  include Southern California News Group writers. The series' canonical URL is the U-T's
  own, so it's attributed to the U-T as the publisher.
- **Dates** are `article:published_time`, kept as full UTC date-times. The 1–5 series is
  2026-10-13 ~19:40 UTC (12:40 PM PDT).

## Left out

- "California's Proposition 40 wealth tax faces double threat…" (U-T, 2026-10-13): its
  canonical URL is the Mercury News original (2026-09-23), so it's attached under
  `mercury-news` instead.
- Tribune News Service (L.A. Times) and AP copies, such as "The millions spent by
  California billionaires against Prop. 40…" and "Voting-related measures on November
  ballots…": not the U-T's own reporting.
- Editorials and endorsements (positions on `san-diego-union-tribune`), single-sided op-eds,
  and Michael Smolens columns.
- No U-T newsroom pieces found for Props 37 or 40–44.
