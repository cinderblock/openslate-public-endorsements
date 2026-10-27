# NOTES: Mission Local articles, November 3, 2026 general (San Francisco)

## Source

- The site's post sitemaps (https://missionlocal.org/sitemap_index.xml), scanned for
  2026 URLs naming a measure or its topic. The voter-guide page
  (`/2026/10/2026-san-francisco-voter-guide/`) is rendered client-side and lists no links
  in its HTML.
- Fetched 2026-10-27 (UTC) with Bun `fetch`. Per-article metadata is in `articles.md`.
- Mode is `scraped`.

## What's attached (9 attachments, 7 URLs)

- Prop B (public bank): supervisors placing it on the ballot (2026-07-07 PDT).
- Prop G (Great Highway): cost estimate, the court ruling keeping it on the ballot, and
  fundraising.
- Prop H (Muni parcel tax): the controller's economic warning.
- Prop I (transfer tax): the mayor's criticism.
- Props D, E, F: "Election ad fact-check: Will Props. D, E, and F really 'Clean up City
  Hall'?", attached to all three.

## Judgment calls to review

- **Prop B story predates the letter.** It names "the public-bank measure" for November,
  not "Prop B". It's attached to Prop B because that's the only public-bank measure on the
  ballot ("Establishing a Municipal Finance Corporation and a Public Bank").
- **Dates** are `article:published_time` (UTC). The Prop B story is
  `2026-07-08T01:29:55+00:00`, which is the evening of July 7 PDT.

## Left out

- June 2026 coverage of that election's Prop D ("overpaid CEO" tax) and the transfer-tax
  cut: a different election and different measures, despite similar letters.
- "S.F. mayor's office, unions tried to strip 'affordable housing' wording from ballot
  measure": it doesn't name the measure by letter, and both Prop C and Prop I are housing
  money measures.
- Campaign-money stories naming several measures in passing: "Mayor Lurie's charter
  measures raise stunning $11M…", "BigMoneySF…" and Chakrabarti's donations.
- Sunset Buzz and the congressional-race proxy pieces on Prop G: left out to keep Prop G's
  list short, with three Mission Local stories attached already.
- Spanish and Chinese translations (`-es`, `-zh-*` URLs).
- Nothing found specifically on Props A, C, E alone, or J.
