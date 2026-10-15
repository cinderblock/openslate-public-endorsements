# NOTES: California Republican Party (CAGOP), November 3, 2026 general

**New org this cycle** (`orgs/ca-republican-party/meta.yaml` created). Retrieved 2026-10-15 (UTC). Mode `scraped`: positions cite the HTML endorsements page.

## Sources

| Source | Used for |
| --- | --- |
| https://cagop.org/endorsements/ | All positions ("2026 CRP ENDORSEMENTS": Statewide, Initiatives, U.S. House, State Senate, State Assembly, Board of Equalization) |
| https://cagop.org/wp-content/uploads/2026/10/CRP-2026G-Statewide-Voter-Guide.pdf | Cross-check for statewide offices and propositions. It matches the HTML exactly. |

## Extracted (139 positions)

- **7 statewide offices**: Hilton, Romero, Wagner, Morgan, Hawks, Gates, Shaw.
- **14 propositions**:
  - Support: 38, 39, 41, 42, 43 and 45.
  - Oppose: 2, 3, 4, 5, 40 and 44.
  - **Neutral**: 1 and 37. These are encoded as `stance: "neutral"` with no `choice`.
- 2 BOE (1, 4), 38 US House, 17 State Senate and 61 State Assembly districts.

## Omitted

- **Insurance Commissioner**: no CRP endorsement listed. The race is Democrat vs Democrat.
- **BOE 2 and 3**: not listed (no Republican on the ballot).
- **Local races**: the page carries none. County Republican parties endorse locally.

## Verification

Every candidate was checked against the SOS *Certified List of Candidates for the November 3, 2026, General Election* (8/27/2026). All 125 candidate endorsements are on the ballot in the district named.

## Judgment calls / flags

- **Capitalisation**: the HTML source uses odd mixed case such as "DOn Wagner", "MIchael Gates" and "Joe LIsuzzo". The live page shows these headings uppercased via CSS. I normalised capitalisation in `choice`; the evidence file keeps the raw text.
- **Corrected typos**, each checked against the ballot:
  - "Armen urdian" became "Armen Kurdian" (CD 49).
  - "Genevie Angel" became "Genevieve Angel" (CD 44).
  - "Tom Mclintock" became "Tom McClintock" (CD 5).
- **Kept as printed** where the page uses a short form of the ballot name:
  - "Peter Sundin Soule" (ballot: Soulé)
  - "Peter Verbica"
  - "Scott Meyers"
  - "Susan Mason"
  - "Joe Rubay"
  - "Raul Ortiz" (ballot: Raul Ortiz Jr.)
  - "Carrie Villanueva" (ballot: Carrie S. Espinoza Villanueva)
- **Proposition `statement`** is the page's own heading text, e.g. "Prop 39: support".
- A Fox 26 article seen in search results reports that the spring convention endorsed neither Hilton nor Bianco for governor. The current endorsements page (and the October PDF) now lists Steve Hilton for Governor, consistent with a post-primary endorsement.
