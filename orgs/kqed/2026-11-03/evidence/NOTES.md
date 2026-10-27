# NOTES: KQED articles, November 3, 2026 general

## Source

- Index pages: https://www.kqed.org/propfest (KQED's "Prop Fest" series, which links its
  explainers for Props 5 and 37–45) and https://www.kqed.org/news/tag/election-2026. Web
  searches restricted to kqed.org found the Prop 1–4 explainers, which Prop Fest's page
  didn't link in its HTML.
- Fetched 2026-10-27 (UTC) with Bun `fetch`. Per-article metadata, with my one-line notes,
  is in `articles.md`.
- Mode is `scraped`.

## Statewide propositions (18)

- The Prop Fest explainer for each of the 14 propositions (`explainer`).
- News: Prop 4 (Oakland's public-financing program), Prop 40 (Newsom's opposition), and two
  on Prop 45 (the data-center dispute and the housing arguments).

## San Francisco measures (3)

- Found by web search restricted to kqed.org.
- Prop B: "San Francisco Supervisors Put Public Bank Measure on November Ballot"
  (2026-07-07).
- Prop H: "San Francisco Will Vote on Muni's Future in November" (2026-06-17). It reports
  the Muni parcel tax measure qualifying.
- Prop G: street-safety groups disputing the Yes on G campaign's data (2026-09-16).
- The B and H stories came before letters were assigned. They're attached because each
  names the one November measure of that kind: the public bank, and the Muni parcel tax.
- Left out: KQED's SF voter-guide pages (`/voterguide/sanfrancisco/proposition-X`, no
  publish date), the RTM voter-guide page (same), and Forum radio segments.

## Judgment calls to review

- **Dates.** KQED pages have no `article:published_time`. `published_at` is the JSON-LD
  `datePublished`, which carries a Pacific offset (e.g. `2026-09-28T03:00:00-07:00`). It
  matches the on-page date.
- **Headlines** are the page's `<h1>`. Several differ from the URL slug, e.g. Prop 5's
  slug says "would change…" but the headline is "Prop 5: Changes to the State Recall
  Election Process".

## Left out

- KQED's voter-guide pages (`/voterguide/california/proposition-N`). They are useful
  references, but the page gives no publish date, only "Updated …". They also overlap the
  Prop Fest explainers. They could be added as `guide` with no `published_at`.
- KQED Forum segments (radio shows) on Props 40 and 45: audio programmes, not articles.
- "California Billionaire Tax Has a Slim Lead in New Poll…" (2026-09-16): left out to keep
  Prop 40's list focused. It reports a single poll, and later coverage supersedes it.
- "California Billionaire Tax Will Be on November's Ballot, Along With These 13 Measures":
  an all-measures roundup.
