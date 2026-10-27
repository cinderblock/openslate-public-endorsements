# NOTES: CalMatters articles, November 3, 2026 general

## Source

- Index pages: https://calmatters.org/california-voter-guide-2026/propositions/ (links every
  per-proposition guide page and recent coverage) and
  https://calmatters.org/category/politics/elections/. Each guide page's "news" links led to
  the per-proposition stories and the paired guest commentary.
- Fetched 2026-10-27 (UTC) with Bun `fetch`; `curl` on this machine fails the TLS handshake
  with these sites. Per-article metadata, with my one-line notes, is in `articles.md`.
- Mode is `scraped`.

## What's attached (51 attachments, 43 URLs)

- A voter-guide page for each of the 14 propositions (`guide`).
- One news story or explainer per proposition, more for 38, 40 and 45.
- Two roundups are attached to each measure they cover in substance:
  - "5 tax measures are on the California ballot…": Props 3, 40, 41, 42 and 43.
  - "Why are so many bonds on the California ballot?…": Props 1, 37 and 38.
- "The billionaire tax could be defeated by two other tax measures…" is attached to 40, 41
  and 42.
- Guest commentary, as `opinion`, only where CalMatters ran a for/against pair on the same
  day. Both halves are attached: Props 3, 39, 40, 43, 44 and 45.

## Judgment calls to review

- **Guide-page headlines.** The guide pages' on-page heading is just "Proposition N", with
  a subhead. The recorded title is the page's `og:title` ("Proposition 1: Housing bond"),
  CalMatters' own title for the page.
- **Guide-page dates.** The guide pages show no date on screen. `published_at` is their
  `article:published_time` (2026-10-01, 00:0x UTC, which is the evening of Sept. 30 PDT).
  Drop it if only on-screen dates should count.
- **Dates generally.** `published_at` is the page's `article:published_time`, kept as the
  full date-time. CalMatters stamps stories at 12:00 UTC (5 AM PDT).
- **Prop 38's July story** ("This CA proposition will send $4 billion to a single
  nonprofit…", 2026-07-31) is older than the rest. The page names "Prop. 38" or
  "Proposition 38" 25 times, so it's about this measure.

## Left out

- "A last-minute voter guide to all 14 propositions…": a roundup of every measure, so it
  isn't attached to each one.
- Spanish-language guide pages (`/es/guia-del-votantes-de-california-2026/…`): the same
  content in Spanish. They could be added as separate articles later.
- The Prop 40 news on Gen Z voters and the noncitizen-ballot lawsuit: not about one
  measure.
