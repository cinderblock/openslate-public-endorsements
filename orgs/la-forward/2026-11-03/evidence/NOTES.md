# NOTES: LA Forward, November 3, 2026 general

## Source

- https://www.laforward.org/voterguide now 302-redirects to https://laforwardguide.org/, the "November 2026 LA Progressive Voter Guide".
- The guide is split across 57 sub-pages:
  - `/guide/<jurisdiction>`: statewide measures, statewide offices, state senate, state assembly, LA County measures, LA County candidates, Los Angeles, and 32 other cities.
  - `/districts/<district>`: 20 school, college and water districts.
- Every sub-page was crawled by HTTP GET between 2026-10-15T01:08:41Z and 01:11:43Z.
  - Each page is server-rendered HTML. Every race or measure row (label, rating badge, reasoning paragraphs) was parsed straight from the markup.
  - Mode is `scraped`.
  - Evidence is one file per URL (`laforwardguide-*.md`) plus `laforwardguide-home.md`.
- City pages repeat some district rows (e.g. `/guide/burbank` repeats Burbank USD). Each race is emitted once, with `source` set to the first page it was parsed from.

## Rating, stance and choice mapping

| LA Forward badge | stance | choice |
| --- | --- | --- |
| Endorsed ("We've vetted this candidate closely and back them without reservation.") | `endorse` | candidate |
| Recommended ("Lines up with our values and priorities. Worth your vote.") | `lean_for` | candidate |
| Support (measure) | `endorse` | "Yes" |
| Oppose (measure) | `endorse` | "No" |
| No recommendation / Write-up coming soon | omitted | |

- **Judgment call.** LA Forward runs two explicit candidate tiers. "Recommended" is a real vote recommendation, but it is weaker than "Endorsed", so `lean_for` keeps that distinction.
  - If the catalog should treat every voter-guide pick as `endorse`, the June bundle did that. Flipping it is a one-line change: every `lean_for` in this file is a "Recommended" badge.

## Extracted (189 positions)

- 14 state props:
  - Yes: 1, 2, 3, 4, 5, 40.
  - No: 37, 38, 39, 41, 42, 43, 44, 45.
- 9 statewide offices (all Recommended). Governor is Becerra and Insurance Commissioner is Jane Kim. BOE District 3 is Samuel Sukaton.
- 5 State Senate and 19 Assembly picks.
- LA County:
  - Measures: No on A, Yes on E.
  - Sheriff: Luna (Recommended, "to block right-winger Alex Villanueva").
  - Superior Court: Offices 64 (Ghobadi), 65 (Justin Clayton) and 131 (David Ross).
- LA City:
  - Endorsed candidates: Raman (mayor), Roy (city attorney), Girvan (CD3), Mazariegos (CD9).
  - Measures, Yes: FD, LA, PL, PRK, PRT, SC.
  - Measures, No: EE, TE.
- LACCD Seats 2, 4, 6 (Recommended).
- 32 other cities' council, mayor, treasurer and rent-board races and local measures, plus 20 school, college and water districts.

## Skipped

- "No recommendation":
  - Superior Court Office 87.
  - AD 48, 51, 53, 56, 64.
  - SD 22, 30, 34.
- Redondo Beach Measure ART: "Write-up coming soon", no rating yet.

## Judgment calls and flags for review

- **Statements.** Each `statement` is the first verbatim sentence in the write-up that states the recommendation. A few were hand-picked where the first matching sentence was misleading:
  - Raman, Ghobadi, Clayton, Luna, Becerra, Sukaton, Rascón, Driscoll, Pulido, Davis, and Props 40, 41, 42.
  - Rosemead Armenta/Ly and Hermosa Jackson/Horne quote a sibling entry's sentence that names them.
  - The generator asserted every statement against the fetched text. Rows with no stated rationale have no `statement`.
  - Two statements keep typos from the source verbatim: AD52 Caloza ("voting forher") and AD40 Schiavo ("She far better").
  - The West Hollywood statement ("We recommend you vote for her, along with Helen Krieger, and Stephen Post.") is attached to all three picks. "Her" is Chelsea Byers.
- **Superior Court Office 65.** In June LA Forward recommended Anna S. Reitano. Now Reitano and Justin Clayton are both in the runoff, and LA Forward "give[s] the edge to Clayton". Only Clayton is encoded.
- **Office 87** has no recommendation. The June pick, Bayne, lost La Defensa's support.
- **Santa Clarita Valley Water Agency, Gutzeit.** LA Forward labels Gutzeit "Division 4 Director". SCV Water has only Divisions 1–3, and Division 3 elects two directors in 2026 (SCV Water Resolution SCV-520). The Sierra Club and LA Fed both list Gutzeit in Division 3. The title was normalized to `Santa Clarita Valley Water Agency Board, Division 3`. The evidence keeps the original label.
- **Hawthorne transient occupancy tax.** The guide gives no measure letter. The title is `Hawthorne — Transient Occupancy Tax measure`. Rename it if the county's letter is found.
- **Burbank council.** LA Forward endorses Perez, Van Gorder and Southerland.
  - A search summary of Burbank's 8/13/2026 qualified-candidate log listed Perez, Polon, Southerland, Takahashi, Brody, Donahue, Ontiveros and Parr, but not Van Gorder.
  - The PDF itself returned 403, so this could not be checked.
  - Van Gorder is kept because both LA Forward and the LA Fed list him in their November guides. A reviewer should confirm he is on the ballot.
- **Small-city measure titles** use LA Forward's short labels (e.g. `Burbank — Measure CR (City Services)`), not the official county labels. They were not looked up.
- **Area labels.** Districts shared with other orgs use normalized area labels: Burbank USD "Trustee Area 3", PCCD "Trustee Area 7", SCV Water "Division N". Others keep LA Forward's label ("Area 2", "District 1", "Area D").
- **Jurisdictions.**
  - Cities use `us/ca/<city>`.
  - Multi-city districts use `us/ca/los-angeles-county`.
  - LACCD and the LA City measures use `us/ca/los-angeles`, following the June LAUSD convention.
- **State and federal candidates** were all checked against the SoS Certified List of Candidates (8/27/2026). Local races come from a November-only guide, so they are on the November ballot by construction, apart from the Burbank caveat above.

## Not on the Nov 3 ballot: removed 2026-10-23

The catalog's ballot check found these positions on seats no ballot carries: each was uncontested and is filled by appointment in lieu of election. They were removed, since a position here has to map to a ballot entry.

- Centinela Valley Union High School District Board, Trustee Area 5: Estefany Castañeda. Not on the ballot: the LA County Registrar's tentative list of canceled elections for Nov 3, 2026 ("APPOINTMENT IN LIEU OF ELECTION DUE TO INSUFFICIENCY OF CANDIDATES", https://content.lavote.gov/docs/rrcc/documents/canceled-elections-november-2026-tentative.pdf) lists the seat, and it isn't in the county's contest list.
- Garvey School District Board, Trustee Area 1: Andy Yam. Not on the ballot: the LA County Registrar's tentative list of canceled elections for Nov 3, 2026 ("APPOINTMENT IN LIEU OF ELECTION DUE TO INSUFFICIENCY OF CANDIDATES", https://content.lavote.gov/docs/rrcc/documents/canceled-elections-november-2026-tentative.pdf) lists the seat, and it isn't in the county's contest list.
- Pasadena Area Community College District Board, Trustee Area 7: Alton Wang. Not on the ballot: the LA County Registrar's tentative list of canceled elections for Nov 3, 2026 ("APPOINTMENT IN LIEU OF ELECTION DUE TO INSUFFICIENCY OF CANDIDATES", https://content.lavote.gov/docs/rrcc/documents/canceled-elections-november-2026-tentative.pdf) lists the seat, and it isn't in the county's contest list.
