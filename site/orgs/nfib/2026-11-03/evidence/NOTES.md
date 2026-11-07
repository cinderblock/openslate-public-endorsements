# NOTES — NFIB, Nov 3 2026 general (California picks only)

## Sources

- NFIB press release "NFIB Announces California Ballot Proposition
  Choices" (Oct. 8, 2026; "Small business PAC endorses or opposes six of
  the 14 initiatives in November's election"), speaking for NFIB CA PAC.
  Original: https://www.nfib.com/news/press-release/nfib-announces-california-ballot-proposition-choices/
  **nfib.com returns a Cloudflare 403 "Just a moment..." challenge** to curl
  and WebFetch. The text was taken from the Internet Archive snapshot
  https://web.archive.org/web/20261010195617/https://www.nfib.com/news/press-release/nfib-announces-california-ballot-proposition-choices/
  (captured 2026-10-10T19:56:17Z). Positions cite the snapshot URL;
  attribution.sources lists both.

## Extracted: 6 positions

- "SUPPORT" → Yes on 41, 42, 43, 45. "OPPOSE" → No on 3, 40.
- NFIB says it took no position on the other 8 measures ("recommendations
  on six of the 14 initiatives"); nothing recorded for them.

## Not captured — needs a browser

- **NFIB CA PAC legislative endorsements**: "Small Business PAC Endorses 30
  Candidates for the California Legislature",
  https://www.nfib.com/news/press-release/small-business-pac-endorses-30-candidates-for-the-california-legislature/
  (search snippets: 7 Senate, 23 Assembly, released October 2026). Behind
  the Cloudflare wall; no Internet Archive snapshot.
- **NFIB FedPAC California House endorsements**: no 2026 California release
  was found (NFIB published other states' congressional slates in Sept–Oct
  2026). Check https://www.nfib.com/state-news/california in a browser.
- Once fetched, add those positions here (same bundle; NFIB CA PAC and
  NFIB FedPAC are both NFIB).

## Refresh 2026-10-28 (coordinator, Chrome): legislative + congressional picks

nfib.com sits behind a Cloudflare check that blocked every client on 2026-10-19. In a
real browser (Claude in Chrome) on 2026-10-28 9:30 AM PDT (16:30Z) it cleared by itself
after a few seconds, with no interaction. Two releases were found from the California
news index (https://www.nfib.com/state-news/california/):

- **NFIB CA PAC, Oct 15:** 7 State Senate + 23 Assembly endorsements
  (`nfib-ca-pac-legislature-2026-10-28.md`).
- **NFIB FedPAC, Sep 29:** 8 California US House endorsements
  (`nfib-fedpac-california-congress-2026-10-28.md`).

6 → 44 positions. The statements quote each list line as printed. `normalize-choices
--apply` wrote the ballot spellings and `choice_id`s (e.g. "Ali Macedo" →
"Alexandra (Ali) Macedo", "David Valadao" → "David G. Valadao"). Two were checked by hand
before `--suggested`: the release's "Kristi Bruce-Lane" is the ballot's "Kristie
Bruce-Lane" (the only Bruce-Lane in SD 40, a typo in the release), and "Joshua Hoover" is
the AD 7 incumbent "Josh Hoover".
