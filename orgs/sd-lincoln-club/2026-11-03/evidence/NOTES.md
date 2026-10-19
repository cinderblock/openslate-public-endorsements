# NOTES: San Diego Lincoln Club, Nov 3 2026 general

## Sources
- Primary: https://sdlincolnclub.com/endorsement-committee/ ("2026 Endorsements"), the club's own page.
- **The `meta.yaml` uri `https://lincolnclubsd.org/` no longer resolves (DNS failure on 2026-10-14).** The club now operates as "The Lincoln Club Business League" at sdlincolnclub.com. `attribution.of.uri` is left matching `meta.yaml`. Reviewer may want to update both; this batch was told not to edit existing `meta.yaml` files.
- The page also links an "Official Lincoln Club Voter Guide" PDF on Google Drive. It was downloaded and matches the HTML list, and it labels Santee as "District 2 co-endorsement". No position cites it.
- KPBS was a cross-check only. It wrongly lists **John Franklin** for Supervisor D5. The club's page and PDF say Rebecca Jones, and Franklin is not on the Nov ballot.

## Judgment calls
- **Santee Council D2:** "Eddie Vandiver" and "Ronn Hall" are both listed. Per the PDF, this is a co-endorsement, recorded as two `endorse` positions with no paraphrased statement.
- **Prop 39:** the page says "YES on the California Voter Identification and Voter List Maintenance Requirements Initiative (#25-0007)". That is the voter-ID initiative now numbered Prop 39, and KPBS also reports the Lincoln Club as YES on 39. The quote is kept in `statement`.
- **Not yet final (as of 2026-10-15):** the club's homepage announced a final members-only endorsement hearing on **Oct 14, 2026** about "state and local ballot initiatives under consideration". More measure positions may follow, so re-scrape later. *Re-checked 2026-10-19: nothing new published; see "Refresh 2026-10-19" below.*
- Chula Vista Elementary "Area 1/3/5" is "Seat 1/3/5" on the ROV. Palomar Health "Zone 3" is ROV "Division 3". Palomar College "Frank Xu" has no area on the page, and the ROV places him in Trustee Area 1.
- Name normalization: "Rick Robinson" → Richard Robinson (ballot name). Frank Nuñez is kept as written (ROV: NUNEZ, FRANK).

## Ballot verification
Every candidate is in an ROV contest with `Election = YES`. Jordan Marks (Assessor/Recorder/Clerk) is the only candidate for that office, but the ROV marks it `Election = YES`.

## Conventions
Shared with the batch; see the SD County Democratic Party Nov NOTES.md.

## Refresh 2026-10-19

- **Result: no new positions (58 → 58).** The Oct 14 measures hearing has not yet produced any published ballot-measure positions.
- Re-fetched https://sdlincolnclub.com/endorsement-committee/ at 2026-10-19T21:01:40Z. New evidence file: `sdlincolnclub-endorsement-committee-2026-10-19.md`. The list is identical to the 2026-10-15 capture apart from whitespace, and Prop 39 is still the only measure.
- Also checked, all with nothing new:
  - the homepage (events only);
  - the re-downloaded Google Drive voter-guide PDF (candidates only);
  - the WordPress posts feed (newest post 2026-05-05);
  - the KPBS guide (updated Oct 14), whose Lincoln Club section still has only "Proposition 39 — YES".
- The WordPress API shows the endorsement page was last modified 2026-10-14T17:37:47 (site time). That is before the 2026-10-15 capture, so the post-hearing results may simply not be posted yet. **Re-check again closer to Nov 3.**
- `attribution.retrieved_at` updated to 2026-10-19T21:01:40Z. `attribution.sources` is unchanged.
- The `meta.yaml` uri was already `https://sdlincolnclub.com/`. The DNS note under Sources is historical.
