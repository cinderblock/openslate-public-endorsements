# NOTES: Reform California, November 3, 2026 general

Retrieved 2026-10-15 (UTC). Mode `scraped`.

## Sources

| Source | Used for |
| --- | --- |
| https://www.reformcalifornia.org/voter-guides/california | "CA Statewide Voter Guide" (CMS lastPublished 2026-09-24). Used for statewide offices, BOE, props, CA Supreme Court retention, US House, State Senate and Assembly. |
| https://www.reformcalifornia.org/voter-guides/san-diego | San Diego County guide (CMS lastPublished 2026-10-13). Used **only** for the county and city races and the two countywide measures listed below; its state and federal entries duplicate the statewide guide. |
| https://www.sdvote.com/content/dam/rov/en/election/nov-3-2026-gubernatorial-general-election/argument-deadline-measures.pdf | Registrar of Voters notice, used only to source the official wording for the countywide measure titles. |

The guide index is https://www.reformcalifornia.org/voter-guides-list. It is a client-rendered list: 59 guides, the statewide one plus one per county. The June bundle used KPBS as a secondhand source; this bundle uses Reform California's own pages.

## Extracted (157 positions)

- 7 statewide offices; BOE 1 (Grove) and BOE 4 (Bilodeau).
- 14 propositions:
  - No on 1, 2, 3, 4, 5, 37, 40 and 44.
  - Yes on 38, 39, 41, 42, 43 and 45.
  - `statement` is the guide's own headline for each proposition, quoted verbatim.
- CA Supreme Court retention: "Kelli Evans - DO NOT RETAIN" and "Joshua Groban - DO NOT RETAIN". These are encoded with the title convention other bundles already use ("California Supreme Court — Retain Justice Kelli M. Evans" / "... Joshua Groban"), kind `measure`, choice `No`.
- 40 US House, 18 State Senate and 64 State Assembly positions. AD 19 is an `oppose` (see flags).
- San Diego County guide (10 positions):
  - Board of Supervisors District 4: Kristine Alessio.
  - Board of Supervisors District 5: Rebecca Jones.
  - Treasurer-Tax Collector: Shirley Nakawatase.
  - San Diego City Council District 2: Richard Bailey; District 6: Mark Powell.
  - Chula Vista Mayor: John McCann; Council District 1: Greg Martinez; District 2: Angelica Martinez.
  - County Measure A: No. County Measure B: No.

## Omitted

- **"You're Doomed" / "You are Doomed"** marks a race where the guide backs nobody (Insurance Commissioner, BOE 2 and 3, CD 4/7/11/12/14/29/34/35/37/52, SD 24/26, many ADs, many local races). These are omitted. The guide's footnote says: "If we do not make a recommendation on a candidate or ballot measure, we either could not support the measure or candidates running in that race, or do not have enough information to make an informed recommendation."
- **"No endorsement"**: CD 42, CD 49, AD 31, San Diego County Clerk. Omitted.
- **4th District Court of Appeal retention** (27 justices in the San Diego guide, mostly "DO NOT RETAIN", 7 "RETAIN"). Omitted to keep scope to state, federal and countywide entries. This is a candidate follow-up if appellate retention gets a shared title convention.
- **Other San Diego local entries** were not transcribed:
  - Local measures C–BB.
  - All other city councils.
  - School, community-college, special-district and planning-group races.
  - "Strategic Voting" bullet-vote advice.
  - "Least bad option is Marcus Bush" (National City Mayor), which would be a `lean_for` if added.
- **The other 57 county guides** were not scraped. The June bundle only covered San Diego.

## Verification

Every state and federal candidate was checked against the SOS *Certified List of Candidates for the November 3, 2026, General Election* (8/27/2026). All are on the ballot in the named district. Local (San Diego County / city) candidates could **not** be checked against an official list here. They come from a November guide that lists ballot races, but are unverified.

## Flags for review

- **AD 19 "Not Catherine Stefani"**: encoded as `stance: "oppose"`, `choice: "Catherine Stefani"`, with the quote as `statement`. The ballot pair is Catherine Stefani (D, incumbent) vs Philip Louis Wing.
- **CD 51 name**: the statewide guide says "Ricardo Cabrera", which matches the ballot; the San Diego guide says "Ricardo Cabrero". I used Cabrera.
- **Measure titles (please harmonise with other San Diego bundles)**:
  - "San Diego County — Measure A (A Transparent, Accountable, Modern County Government)". The parenthetical is from the Registrar's file name for Measure A.
  - "San Diego County — Measure B (Measure to Fund San Diego County Health & Safety Services)". The parenthetical is the ballot-label heading in the Registrar's notice. Press calls it the "San Diego County Health & Safety Act".
  - The Registrar's notice doesn't print letters. A = charter amendment (term limits / ethics commission) and B = half-cent sales tax come from Reform California's descriptions ("Extends Term Limits for Current Politicians"; "San Diego County Sales Tax Increase"), matched to KPBS coverage of "Measure B".
- **Names**: the guide's fuller ballot-style names were kept ("David G. Valadao", "Chuong V. Vo", "Lydia A. Gutiérrez", ...). Collation that keys on `choice` may need fuzzy matching against other orgs' shorter forms.
