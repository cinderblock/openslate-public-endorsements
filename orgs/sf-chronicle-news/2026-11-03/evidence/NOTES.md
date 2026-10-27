# NOTES: San Francisco Chronicle (newsroom) articles, November 3, 2026 general

## Source

- Index page: https://www.sfchronicle.com/projects/2026/california-sf-bay-area-voter-guide/
  (its coverage links), plus web searches restricted to sfchronicle.com.
- Fetched 2026-10-27 (UTC) with Bun `fetch`. Article pages served headline and date
  metadata despite the paywall. Per-article metadata is in `articles.md`.
- Mode is `scraped`.
- This is the newsroom. The editorial board is the separate org `sf-chronicle`, untouched.

## Statewide propositions (13 attachments, 11 URLs)

- Prop 37: explainer.
- Prop 38: news.
- Prop 39: two news stories and one analysis.
- Props 40/41/42: the "What does 'yes' or 'no' on Prop 40 really mean?…" explainer,
  attached to all three.
- Prop 40: the Stanford economists' estimate.
- Prop 43: Bay Area officials' concerns.
- Prop 45: news, Joe Garofoli's analysis, and Open Forum's "Two Takes" (`opinion`), which
  pairs one writer for and one against.

## Judgment calls to review

- **Headlines** are the page's `<h1>`, which sometimes differs from link text elsewhere on
  the site. The 40/41/42 piece's h1 now reads "What does 'yes' or 'no' on Prop 40 really
  mean? It depends on your votes on two other props".
- **Dates** are `article:published_time` (UTC `Z`).
- **Garofoli piece** is under `/politics/joegarofoli/`. It reads as reported analysis, so
  it's labelled `analysis`, not `opinion`.

## Left out

- Editorials and endorsements (already positions on `sf-chronicle`), letters, and
  single-sided Open Forum op-eds.
- Nothing found for Props 1–5 or 44 beyond editorials.
- "$45 million in a week: California's wealthy aren't holding back…" (2026-10-06): left out
  to keep Prop 40's list focused on substance. Other publishers already cover the spending.
- "Here's how Gavin Newsom is voting on California's propositions" and the early all-14
  roundup: not about one measure.
## San Francisco measures (3)

- From the voter guide's coverage links and web searches restricted to sfchronicle.com.
- Prop G: how voters feel about the Great Highway (2026-10-26).
- Prop F: two pieces.
  - "Daniel Lurie is asking S.F. voters for more power…" (2026-10-16). Its URL slug and
    headline are about Prop F. It mentions D, H and I in passing and isn't attached to
    them.
  - The fact-check of the mayor's message about Prop F and police oversight (2026-10-21),
    labelled `analysis`.
- Left out:
  - SF editorials and endorsements (positions on `sf-chronicle`).
  - The Prop C/G opinion column.
  - The Chakrabarti donation story, which spans several measures.
  - "Exclusive: Why the slowdown in S.F. housing construction is leading to a new tax
    battle", from before the measure took its final form.
