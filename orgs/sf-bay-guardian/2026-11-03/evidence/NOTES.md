# NOTES: SF Bay Guardian, November 3, 2026 general

## Sources

Both pages were fetched 2026-10-15T01:08:32Z. Mode is `scraped`.

- **Full endorsements article (primary):**
  https://www.sfbg.com/2026/10/06/endorsements-for-the-november-3-2026-election/
  by Tim Redmond, dated Oct 6, 2026. Evidence:
  `sfbg-endorsements-for-the-november-3-2026-election.md`.
- **Clean Slate clip-out summary:**
  https://www.sfbg.com/2026/10/07/guardian-clean-slate-guide-take-this-to-the-polls-on-nov-3-2026/
  dated Oct 7, 2026. Evidence: `sfbg-clean-slate-guide-nov-3-2026.md`. The HTML clip-out
  stops after the state propositions. The printable PDF it links to was not fetched.

Every position cites the full article, which covers everything recorded here.

## Extracted (42 positions)

- **Statewide:** Weber (SoS), Jane Kim (Insurance), Sally Lieber (BOE D2) and Richard
  Barrera (SPI).
- **State props:** Yes on 1, 2, 3, 4, 5, 37 and 40. No on 38, 39, 41, 42, 43, 44 and 45.
- **CD-11:** Connie Chan.
- **SF offices:**
  - Public Defender: Mano Raju.
  - Assessor-Recorder: Joaquin Torres.
  - D8: Michael Nguyen #1, Gary McCoy #2.
  - D10: DJ Brookter and JR Eppler.
  - Community College Board: Leah LaCroix, Jeremy Lee and Bunny McFadden.
  - School Board: Virginia Cheung, Reina Tello and Ryan Hazelton.
- **Regional Measure RTM:** Yes.
- **SF Props:** Yes on B, C, G, H, I and J. No on A, D, E and F.

## Judgment calls (please review)

- **D8 is ranked "1. Michel Nguyen / 2. Gary McCoy"**, with the text "We prefer Nguyen. We
  can live with McCoy."
  - I followed the June bundle's ranked-choice convention: Nguyen is `endorse` with
    weight 1, and McCoy is `lean_for` with weight 0.5.
  - The article spells the name "Michel Nguyen". The Clean Slate guide spells it "Michael
    Nguyen", and the official sf.gov name is "Michael T. Nguyen". I used "Michael Nguyen"
    and treated the article spelling as a typo.
- **D10:** Brookter and Eppler are both `endorse` with no weight ("Pick an order; both are
  great choices."). The Clean Slate lists them in the order Eppler, Brookter. The article
  lists Brookter, Eppler.
- **Community College Board:** the article spells "Leah Lacroix", while the Clean Slate and
  sf.gov spell "Leah LaCroix". I used LaCroix.
- **Emphasis:** "YES YES YES" and "NO NO NO" (Props 3, 39, 40, 42, 43, 45 and B) are
  recorded as plain `endorse`. Emphasis is not encoded.
- **Prop 37** is a lukewarm YES ("won't do any harm, and may help a few people"). The
  label is an explicit YES, so it is recorded as `endorse`.
- **Prop G** is YES. The board says "We are going out on a limb here". It is still an
  explicit YES.
- **Secretary of State:** the Clean Slate's "No Endorsement" line covers "Governor, Lt.
  Governor, Controller, Treasurer, Attorney General" and does not mention SoS. The full
  article endorses Shirley Weber, and that is what is recorded.

## Skipped

- **"No endorsement" races** were omitted per the scope rule (named picks only):
  - Governor, Lt Governor, Controller, Treasurer and Attorney General.
  - Supervisor D2, D4 and D6.
  - Community College Board single (partial-term) seat.
- **Judges:** the article says "We see no reason not to support all of these state judges
  for another term." The Clean Slate says "Judges — Approve all". No justices are named on
  either page.
  - Turning this into per-justice positions would mean importing names from another
    source, so I omitted it.
  - If you accept that mapping, it is the same 2 Supreme Court and 11 First District
    justices recorded in the grow-sf and sf-chronicle bundles.
- **CD-15, AD-17 and AD-19** are not mentioned.

## Not carried forward from June

- **Governor:** Tom Steyer did not advance. The November guide gives no endorsement.
- **D2:** Lori Brooke did not advance. The article says "Now Sherrill is in essence
  unopposed", and gives no endorsement.
- **D4:** Natalie Gee, David Lee and Albert Chow were the June ranked picks. The board now
  gives no endorsement; Chow is on the ballot but is not endorsed.
- **School board:** Brandee Marckmann is not on the Nov ballot.
- **Superior Court Seat 16 (Alexandra Pray):** not in the Nov guide.
- **June SF Props A–D:** June-only measures.

## Title conventions

These match the other batch-C SF bundles. See `orgs/grow-sf/2026-11-03/evidence/NOTES.md`
for:

- the titles of the new offices,
- RTM,
- the sf.gov prop titles,
- confirmation that the SoS prop titles were verified with no discrepancies.
