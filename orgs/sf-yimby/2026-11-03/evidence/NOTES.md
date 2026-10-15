# NOTES: SF YIMBY, November 3, 2026 general

## Source

- https://sfyimby.org/endorsements/sf-2026-general-election/ was fetched
  2026-10-15T01:09:32Z. Evidence: `sfyimby-sf-2026-general-election.md`.
- The page is titled "2026 General Election" and is described as "SF YIMBY's voter guide
  for the November 2026 General".
- Mode is `scraped`.
- Plain HTTP clients failed TLS against sfyimby.org from this machine (curl/schannel
  error). The page was fetched with Bun `fetch` instead.

## Extracted (20 positions)

- **AG:** Rob Bonta.
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
- **Missing explanation text:** Bonta (AG), Haney and Stefani have no explanation text on
  the page, so those positions have no `statement`.
- **No ranking:** the D8 McCoy pick is a plain endorsement.

## Not covered / incomplete

- The page says "Further endorsements pending. Please check back for updates."
- It has no statewide proposition positions and no SF Prop B or J position.
- The only statewide office covered is AG.
- Re-scrape closer to Nov 3.

## Not carried forward from June

- **Governor:** Tom Steyer did not advance. No Nov pick has been listed yet.
- **Lt Governor:** Michael Tubbs did not advance. No Nov pick.
- **Insurance Commissioner:** Patrick Wolff did not advance. No Nov pick.
- **June SF Prop A:** June-only measure.

## Title conventions

See `orgs/grow-sf/2026-11-03/evidence/NOTES.md`, which covers:

- the titles of the new offices (Assessor-Recorder, BART D8),
- RTM,
- the sf.gov prop titles.
