# NOTES — Silicon Valley DSA, Nov 3 2026 general

## Sources

- The 2026 General Election Voter Guide, a published Google Doc:
  https://docs.google.com/document/d/e/2PACX-1vQAtAN3xtKSl7Pkx34nNpJyypPlm_Zga45PZHEYVk6jNpwxcp0GDBFrLsU9wjTjliya6ZP0OrMkljEt/pub
  (HTML, scraped). The chapter's site links to it from
  https://siliconvalleydsa.org/voters-guide/ ("View the 2026 General Election
  Voter Guide"). The doc says "Updated automatically every 5 minutes", so a
  later edit may differ from the captured text.
- The doc's stylesheet defines a strikethrough class, but no text in the doc
  uses it: nothing was crossed out at capture time.

## Two tiers: endorsements vs. recommendations

The foreword separates them: "recommendations are not endorsements;
endorsements are approved by a 75% vote by the Chapter and entail a
significant commitment of Chapter resources, time, and energy.
Recommendations are approved by a majority of the Chapter only".

- **Endorsements** ("Silicon Valley DSA endorses ..."): Prop 3 Yes, Prop 40
  Yes, Prop 41 No, Prop 42 No, Redwood City Measure E Yes. Recorded as
  `endorse`.
- **Recommendations** ("We recommend ...", "We urge a Yes vote ..."): recorded
  as `lean_for`, with the Yes/No `choice` for measures. Same rule as the DSA
  SF bundle.
- "No recommendation" / "We recommend no candidate" / "We do not recommend
  any candidate": `abstain`, no choice.
- Prop 5, "We are neutral on this measure": `neutral`.

## Extracted: 158 positions

- 5 `endorse` (above).
- 122 `lean_for`: candidates in statewide, congressional, legislative,
  special-district, city, college and school races; measure Yes/No calls;
  and 12 school bond / parcel tax measures (see below).
- 4 `lean_against`: Franklin-McKinley SD (Marc Cooper, Gilbert Borrayo);
  Orchard SD (Katherine Kasolas-Jacobson); Santa Clara USD TA 1 (Jim Canova).
- 26 `abstain`, 1 `neutral`.

Ballot names and `choice_id`s come from the Secretary of State, Santa Clara
and Alameda registrar bundles (`normalize-choices.ts --apply`; 0 respellings,
0 unresolved). San Mateo County items have no authority bundle. Their
titles reuse other orgs' subjects, and the candidate names were checked
against San Mateo County's Roster of Candidates (smcacre.gov,
`52_candidateroster0903.pdf`, as of 9/3).

## Review flags

1. **Oak Grove SD**: the guide says "Victor Ramirez for District 1", but the
   ballot lists Victor A. Ramirez in Trustee Area 2 (there's no Area 1 race).
   Recorded under Trustee Area 2.
2. **East Side UHSD TA 1 (Short Term)**: the guide's "Meredith 'Mer' Nunez" is
   "Mer Curry Nuñez" on the ballot.
3. **Joint recommendations** (both candidates, one seat): Midpeninsula Open
   Space Ward 1 (Gleason, To), West Valley-Mission CCD TA 3 (Kepner,
   Glaves), Fremont UHSD TA 4 (Nakano-Matsumoto, Eliaz). Recorded as
   `lean_for` on each.
4. **Soft or negative wording** recorded as positions:
   - Valley Water D7, "a cautious recommendation to Pete Dailey": `lean_for`.
   - Orchard SD, "gently recommend Jeff Tang and Molly Eslao": `lean_for`.
   - Santa Clara USD TA 1, "We do not recommend Jim Canova" (the guide adds
     that Yassin "is an improvement"): `lean_against` Canova. Nothing
     recorded for Yassin.
5. **"Preference" inside a no-recommendation**: Gilroy D4 (Diana Sanchez
   Bentz), Gilroy D5 (Joseph Garcia, "likely the safest choice") and Menlo
   Park D1 (Wonman Lee, "might be the slightly better choice") are all
   recorded as `abstain` with no choice, because each section opens with
   "We do not recommend any candidate in this race."
6. **"All school bond measures and parcel taxes"**: the guide recommends Yes
   on every school bond or parcel tax "in school districts across Santa
   Clara and San Mateo Counties", without naming them. Recorded `lean_for`
   Yes on the 12 such measures the catalog knows: Santa Clara M, N, O, P, Q,
   R (registrar list), and San Mateo's Burlingame SD R, Cabrillo USD Z,
   Jefferson UHSD M, Pacifica SD T, San Carlos SD K, San Mateo-Foster City
   SD W. Left out: San Mateo County Community College District Measure V (a
   college district, not clearly a "school district"), and any San Mateo
   school measure not yet in the catalog.
7. **East Palo Alto Measure O**: the catalog's existing title says "(Bond
   Measure)", but the guide describes a 1.5% tax on owners leasing 5+ units.
   The title was reused so the subject collates with other orgs' positions.
   The other title may be wrong.
8. **Menlo Park City School District Board** is a new subject (no other org
   names it). The ballot title is "Menlo Park City School District Member,
   Governing Board", vote for 3.

## Skipped

- Sequoia UHSD District D: informational only (Sathvik Nori withdrew; Michael
  Dekshenieks "unofficially unopposed"). No position.
- Valley Water D7: the guide calls Rebecca Eisenberg "unfit to continue to be
  an elected official", but its call is the Dailey recommendation, so no
  separate `lean_against` was recorded.
- Union City D3: Jeff Wang "should not be near any lever of power". This is
  covered by the Crocker-Root recommendation in a two-person race, so no
  separate position.
