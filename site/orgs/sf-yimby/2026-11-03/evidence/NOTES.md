# NOTES: SF YIMBY, November 3, 2026 general

## Source

- **Refresh 2026-10-19 (current source):** https://yimbyaction.org/chapters/san-francisco-yimby,
  fetched 2026-10-19T21:03:20Z with `curl` and a browser User-Agent. Evidence:
  `yimbyaction-chapters-san-francisco-yimby-2026-10-19.md`.
  - **The old source URL is gone.** https://sfyimby.org/endorsements/sf-2026-general-election/
    (and the sfyimby.org root) now return `308 Permanent Redirect` to the YIMBY Action
    chapter page above. SF YIMBY's site has been folded into yimbyaction.org.
  - The chapter page's "Who we're endorsing" list shows 12 items per page ("Page 1 of 2").
    The full list (24 current items) comes from the page's embedded endorsement data, which
    names "San Francisco YIMBY" among the endorsing chapters for every item. The evidence
    file renders that data one entry per endorsement, with the `rationale` text verbatim.
  - All positions now cite the chapter page as `source`.
- **Original capture:** https://sfyimby.org/endorsements/sf-2026-general-election/ was fetched
  2026-10-15T01:09:32Z. Evidence: `sfyimby-sf-2026-general-election.md`.
- The page is titled "2026 General Election" and is described as "SF YIMBY's voter guide
  for the November 2026 General".
- Mode is `scraped`.
- Plain HTTP clients failed TLS against sfyimby.org from this machine (curl/schannel
  error). The page was fetched with Bun `fetch` instead.

## Extracted (24 positions; 20 on 10-14, plus 4 added 10-19)

- **Governor:** Xavier Becerra (added 10-19).
- **AG:** Rob Bonta.
- **State props (added 10-19):** Yes on 1 and 37. No on 43.
- **CD-11:** Scott Wiener.
- **Assembly:** Matt Haney (AD-17) and Catherine Stefani (AD-19).
- **Supervisors:** D2 Sherrill, D4 Wong, D6 Dorsey, D8 Gary McCoy and D10 Theo Ellington.
- **Assessor-Recorder:** Joaquin Torres.
- **BART Board D8:** Sara Barz.
- **SF Props:** Yes on A, C, D, E, F and H. No on G and I.
- **Regional Measure RTM:** Yes.

## Judgment calls

- **Measure labels:** SF YIMBY uses its own labels, e.g. "Prop C: Housing Trust Fund",
  "Prop D: Changes To Ballot Measure Thresholds", "Prop H: Stronger Muni for All" and
  "Prop E: Changes to City Administrator/Contracting". These were mapped by letter to the
  official sf.gov titles.
- **List-line statements:** Haney, Stefani, Sherrill and Wong have no rationale text on the
  10-19 page, and the state props' rationales describe the measure without stating the
  position. For these, `statement` quotes the endorsement entry as rendered in the evidence
  file (`Name · Office · District · Endorsed`, or `Prop N: <label> · California · Vote
  yes|no`). The page shows the same fields; the ` · ` separators are the evidence file's
  rendering, matching how yimbyaction.org's statewide guide prints `Office · District`.
- **D8 ranking:** the 10-19 rationale says "SF YIMBY is endorsing Gary McCoy in the top
  slot". The chapter feed also says SF YIMBY "has withdrawn its #2 endorsement" of Manny
  Yekutiel (Oct 1, 2026). Only the McCoy pick is recorded, as a plain `endorse`; the bundle
  never had Yekutiel.
- **Statewide picks are YIMBY Action-wide.** Becerra, Bonta and Props 1/37/43 list roughly
  20 endorsing chapters each (SF YIMBY among them). They are included because the SF
  chapter page lists them as its own endorsements. YIMBY Action's statewide guide
  (https://yimbyaction.org/endorsements/november-2026-california-general, fetched 10-19,
  not saved as evidence) also endorses Fiona Ma (Lt Gov) and Ben Allen (Insurance
  Commissioner), but the SF chapter page does not list them, so they are NOT included.

## Not covered / incomplete

- The 10-14 page said "Further endorsements pending. Please check back for updates." The
  10-19 chapter page has no such note.
- Still no position on Props 2-5, 38-42, 44 or 45 (the chapter feed mentions hosting a
  Prop 45 debate, but takes no position), and none on SF Prop B or J.
- No Lt Gov, Insurance Commissioner or other statewide office picks on the SF chapter page.

## Not carried forward from June

- **Governor:** Tom Steyer did not advance. Nov pick (added 10-19) is Xavier Becerra.
- **Lt Governor:** Michael Tubbs did not advance. No Nov pick.
- **Insurance Commissioner:** Patrick Wolff did not advance. No Nov pick.
- **June SF Prop A:** June-only measure.

## Title conventions

See `orgs/grow-sf/2026-11-03/evidence/NOTES.md`, which covers:

- the titles of the new offices (Assessor-Recorder, BART D8),
- RTM,
- the sf.gov prop titles.

## Refresh log

### 2026-10-19

- **Source moved** (see "Source"). All 20 positions from 10-14 are still listed on the new
  chapter page with the same picks, so all were kept. Their `source` was changed from the
  dead sfyimby.org URL to https://yimbyaction.org/chapters/san-francisco-yimby.
- **Statements changed** so each one is quotable from the new page:
  - Bonta (AG): was empty; now quotes the new rationale ("YIMBY Action endorses Rob Bonta
    ...").
  - Wiener (CD-11): the long rationale was replaced by a one-line blurb, which is quoted
    now.
  - Haney (AD-17) and Stefani (AD-19): were empty; now quote the list line.
  - Sherrill (D2) and Wong (D4): the rationale text was removed from the page, so the
    statements now quote the list line.
  - McCoy (D8): the wording changed to "in the top slot", which is quoted now.
  - The other 13 statements still appear verbatim and are unchanged.
- **Added (4):** Governor: Xavier Becerra. Prop 1: Yes. Prop 37: Yes. Prop 43: No.
- No stance or choice changes.
