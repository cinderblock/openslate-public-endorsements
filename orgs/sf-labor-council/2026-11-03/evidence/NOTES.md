# NOTES — San Francisco Labor Council, Nov 3 2026 general

## Sources

- https://www.sflaborcouncil.org/en/news-details/news/our-endorsements/9251
  ("Our Endorsements" menu item; post titled "Endorsements for San
  Francisco's November 3, 2026 General Election"). The site is a
  LinkedUnion Next.js app. The home page renders nothing without
  JavaScript, and `/en/endorsements` is a 404. The route was derived from
  the site's menu data (submenu_id 9251, "Our Endorsements"). The post
  body was decoded from the React Server Components payload embedded in
  the HTML. It is the council's own published text, so `mode` is
  `scraped`.
- The post says "See the California Federation of Labor Union's full
  endorsement list HERE." and "Please check back for more endorsements!"

## Extracted: 23 positions

- Races (16): CD-11 Chan, CD-15 Mullin, AD-17 Haney, AD-19 Stefani,
  Assessor-Recorder Torres, Public Defender Raju, D2 Sherrill, D8 McCoy,
  Board of Education (Cheung, Hazelton, Tello), Community College Board
  (LaCroix, Lee, McFadden), and `abstain` for D4 and D6 ("No
  Recommendation").
- Measures (7): Yes on B, H, J and RTM. No on D. `neutral` on G ("No
  Position"). `abstain` on I ("No Recommendation").

## Skipped

- **Statewide offices and state propositions.** The council's page does
  not list them. It defers to the California Labor Federation (see the
  `ca-labor-federation` bundle). sfendorsements.com shows statewide picks
  and state props for "SF Labor Council", which presumably copy the Labor
  Fed's list. They were not carried here because the council's own page
  does not state them.
- Props A, C, E, F and the D10 race are not mentioned on the page.

## Review flags

- **"No Position" vs "No Recommendation".** G is "No Position", recorded
  as `neutral`. I, D4 and D6 are "No Recommendation", recorded as
  `abstain`. Check that this distinction is what you want.
- **Name normalization.** "Manuhar Raju" [sic] became "Mano Raju" (the
  ballot name is Manohar Raju; other bundles use "Mano Raju"). All-caps
  names were converted to normal case.
- All candidates are on the SF Department of Elections qualified list for
  Nov 3 2026 (https://www.sf.gov/candidates-november-3-2026-general-election).
