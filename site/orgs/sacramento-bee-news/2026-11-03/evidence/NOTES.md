# NOTES: The Sacramento Bee (newsroom) articles, November 3, 2026 general

## Source

- sacbee.com refuses scripted requests from this machine (the connection is closed during
  the TLS handshake), so this pass used a real browser: the T3 preview browser, in an
  incognito-profile tab. No log-in. No cookie or consent banner was accepted. No bot check
  appeared.
- Discovery:
  - Section pages https://www.sacbee.com/news/politics-government/election/ and
    `/capitol-alert/`.
  - The site's own search (`/search/?q=…`) for each proposition.
- Verification: each article's HTML was fetched from inside the sacbee.com tab (same
  origin) and parsed for `<h1>`, JSON-LD `headline`/`datePublished`/`author`, and
  `<link rel=canonical>`. After building, every recorded headline, date and canonical URL
  was compared with the live page again, and all matched.
- Fetched 2026-10-27 (UTC). Per-article metadata, with my one-line notes, is in
  `articles.md`. Mode is `scraped`.
- This is the newsroom. The editorial board (McClatchy's California board) is the separate
  org `sacramento-bee`, untouched.

## What's attached (25 attachments, 24 URLs)

- The Bee's voter-guide explainer for every proposition except 3. For Prop 3, the
  explainer is a piece comparing Props 3 and 40, attached to both.
- News and analysis, up to 3 per proposition: 3, 5, 38, 39, 40, 44 and 45.

## Judgment calls to review

- **Dates** are the JSON-LD `datePublished`, which carries a Pacific offset (e.g.
  `2026-09-22T04:30:00-07:00`). The served HTML's `article:published_time` is empty; it is
  filled in client-side.
- **Prop 5's July story** ("How would Prop. 5 overhaul how California conducts recall
  elections?", 2026-07-24) is older than the rest, but it names Prop. 5.
- **Prop 39 ruling story** (2026-08-07) is about the measure's ballot wording, so it's
  attached to Prop 39.

## Left out

- **Reprints on sacbee.com.** Each was identified by its headline matching another
  publisher's story (bylines not checked):
  - CalMatters, e.g. "There's a $11.25 billion housing bond…", "Billionaire tax explained…"
    and "Prop 45 explained…".
  - L.A. Times / Tribune News Service, e.g. "Prop. 37 offers $25 billion…", "The millions
    spent by California billionaires…" and Skelton.
  - S.F. Chronicle, e.g. "Prop 45 would make major changes to CEQA…", "What does 'yes' or
    'no' on Prop 40 really mean?…" and "A California proposition to fund medical
    research…".
  - Bay Area News Group and Southern California News Group editorials.
  - A Capital & Main story via Reuters ("Who are the billionaires behind $304M effort…",
    canonical on reuters.com).
- **"Faster building or thorough environmental permitting? California's Prop. 45
  explained"** (2026-10-26): a video explainer whose byline says the script was "produced
  using AI assistance". Left out in favour of the written Prop 45 guide.
- **Editorials and endorsements.** These are positions on `sacramento-bee`, including the
  "| Opinion" endorsement pieces under `/opinion/election-endorsements/` and the board's
  interviews with each side of Props 43 and 44. They aren't for/against opinion pairs.
- **Extra stories,** to keep to 2–3 per proposition: the Airbnb donor story (39), "California
  billionaires opposing Prop. 40 saw their wealth soar…" (40), two more data-center
  stories, and the CEQA veto and donations stories (45).
- **"Updated: How do Proposition 50 results compare…"**: a 2025 measure.
