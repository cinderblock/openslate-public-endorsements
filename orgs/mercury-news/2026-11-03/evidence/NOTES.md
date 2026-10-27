# NOTES: The Mercury News (newsroom) articles, November 3, 2026 general

## Source

- The site's WordPress search API (`https://www.mercurynews.com/wp-json/wp/v2/posts?search=…`,
  posts after 2026-07-15), queried for each proposition number and for "billionaire tax",
  "CEQA", "voter ID" and "recall". Section pages didn't list election stories in their HTML.
- The WebSearch tool refuses mercurynews.com, but the site serves pages to a plain HTTP
  GET. Fetched 2026-10-27 (UTC). Per-article metadata is in `articles.md`.
- Mode is `scraped`. The `sources` entry is the homepage, since the API queries aren't
  pages.
- Slug `mercury-news`, not `bay-area-news-group-news`. The articles are on
  mercurynews.com, and the existing `bay-area-news-group` org is the group's joint
  editorial board, which is untouched.

## What's attached (5 attachments, 3 URLs)

- "Election 2026: California's Proposition 40 wealth tax faces double threat from
  competing measures 41 and 42" (Grace Hase, 2026-09-23), attached to 40, 41 and 42. The
  San Diego Union-Tribune reran it on 2026-10-13 with this URL as canonical.
- "Election 2026: Is Proposition 45 a housing solution or developer loophole?" (Paul Rogers).
- "Who's donating to the billionaire-backed group…" (Grace Hase), Prop 40.

## Left out

- Syndicated copies whose originals are elsewhere:
  - Tribune News Service (L.A. Times; Sacramento Bee for "Legislative attorneys say
    definition used by Prop. 45 likely excludes data centers", canonical
    sacbee.com/…/article317705781.html).
  - Politico ("'They've awakened him': How a wealth tax fight made Sergey Brin a
    political force").
  - Associated Press ("Top Democrats and allies join the wealthiest to fight a California
    billionaire tax").

  The originals' sites (sacbee.com, politico.com, apnews.com) refused this machine's
  requests, so they couldn't be opened and aren't attached anywhere.
- "Election 2026: What are California's 14 propositions on the November ballot?"
  (Woolfolk) and a September poll story covering several measures: roundups.
- Editorials and endorsements (positions on `bay-area-news-group`), op-eds, letters.
