# NOTES — AIPAC PAC, Nov 3 2026 general (California picks only)

## Sources

- https://candidates.aipacpac.org/page/featured, the "AIPAC Political
  Portal" (https://aipacpac.org/ redirects here). Without JavaScript the
  page shows only its menu. The page loads its candidate list from
  `GET https://candidates.aipacpac.org/api/v2/donation-page/featured`,
  which returns JSON when sent the page's `RequestVerificationToken` meta
  value as a header (a plain GET returns HTTP 500). That JSON was fetched
  with curl and the 28 entries with `"state": "CA"` were transcribed into
  the evidence file.
- Page title in the JSON: "Thank You for Supporting Pro-Israel Incumbent
  Members of Congress". https://www.aipac.org/politics: "The AIPAC
  Political Portal helps individual Americans donate to pro-Israel
  candidates of their choice", and "AIPAC is a grassroots membership
  organization with a PAC that supports pro-Israel Democratic and
  Republican candidates for Congress."

## Extracted: 25 positions (all US House, `endorse`)

The portal lists 330 recipients, 28 in California. Dropped 3 who are not
on the Nov 3 2026 ballot per the SOS Certified List of Candidates
(8/27/2026): Julia Brownley (D-CA-26), Darrell Issa (R-CA-48) and Nancy
Pelosi (D-CA-11).

## Review flags

- **Portal listing as endorsement.** AIPAC PAC has no page titled
  "endorsements". The portal is its list of candidates it "supports" and
  invites donations to. Recorded as `endorse`. A reviewer may prefer `lean_for`.
- **CD 40: two picks.** Both Ken Calvert (R-CA-40) and Young Kim (R-CA-40)
  are listed, and they face each other in the CD 40 general. Both recorded.
- The JSON's `district` field already uses the 2026 (post-Prop 50) district
  numbers. Each one matched the certified list.
- Name spelling: "Gilbert Cisneros" → Gil Cisneros (ballot name). Others
  use the short names already used across the repo (e.g. Ted Lieu, Norma
  Torres, David Valadao, Luz Rivas).
- **United Democracy Project** (the AIPAC-backed super PAC) has no
  endorsement list. It only spends independently. Not included.
