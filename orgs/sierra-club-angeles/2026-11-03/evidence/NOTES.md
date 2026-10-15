# NOTES: Sierra Club Angeles Chapter, November 3, 2026 general

## Source

- https://www.sierraclub.org/angeles/endorsements, read 2026-10-15T01:24:17Z. Evidence: `sierraclub-angeles-endorsements.md`.
- The page is behind an Incapsula bot wall. curl gets a 403 and WebFetch hits a redirect loop.
- It was read in the user's Chrome through Claude in Chrome (`get_page_text`). The text is plain HTML, so mode is `scraped`.
- No statements: the page is a bare list with no rationale.

## Combined June + November page

- The page is headed "June 2 primary and November 3, 2026 general elections", so it mixes both elections.
- It has been updated since June. The governor pick (Steyer, who did not advance) is gone, and November local races (OC cities and others) were added.
- Every entry was checked to be a live November contest:
  - **State and federal.** All 18 House, 6 Senate and 16 Assembly picks, plus the 5 statewide officers, appear in the SoS Certified List of Candidates for Nov 3, 2026 (8/27/2026). The district of each was confirmed.
  - **LA City and County.** Raman, Roy, Girvan and PRK also appear in the LA Forward and LA Fed November guides.
  - **LA-area cities.** Burbank, Culver City, Hermosa Beach, Lynwood, Santa Monica, West Hollywood, Santa Clarita and Alhambra D1 are November races per the LA Forward and LA Fed November guides.
    - Burbank: Polon and Takahashi are on the city's 8/13/2026 qualified-candidate list, per a search summary of that log. The PDF itself returned 403.
  - **Orange County supervisors.** D4 (Traut vs. Shaw) and D5 (Foley vs. Dixon) went to November runoffs, per Voice of OC, the Fullerton Observer and LAist's general-election guides.
  - **OC city councils and Tustin mayor.** These hold November-only elections. They are included, but a reviewer may want to confirm each candidate against the OC Registrar's list.

## Extracted (100 positions, all `endorse`)

- **US House (18):** CA 27, 28, 29, 30, 31, 32, 34, 36, 37, 38, 41, 42, 43, 44, 45, 46, 47, 49.
- **Props:**
  - Yes: 1, 4, 5.
  - No: 39, 43, 45.
  - "Support" maps to Yes and "Oppose" to No.
- **Statewide offices:** AG Bonta, SoS Weber, Treasurer Kounalakis, Controller Cohen, Insurance Commissioner Ben Allen.
- **State Senate:** SD 20, 24, 26, 28, 36, 38.
- **State Assembly:** AD 39, 40, 41, 42, 43, 44, 46, 51, 52, 54, 55, 66, 67, 68, 72, 74.
- **LA local:**
  - PRK Yes, Raman, Roy, Girvan (CD3).
  - Alhambra D1 Amy J. Wong.
  - Burbank: Perez, Polon, Takahashi.
  - Culver City: Puza, Small. Culver City USD: Ezidore, Loredo.
  - Hermosa Beach: Francois, Bove LaMonica, Raymond Jackson.
  - PCCD Trustee Area 1: Geoff Baum.
  - Lynwood: Juan Muñoz.
  - Santa Monica: Ivanov, Morrow, Torosis.
  - WeHo: Byers, Krieger, Post.
  - Santa Clarita: D2, D4, D5.
  - SCV Water Division 3: Plambeck, Gutzeit.
- **Orange County (21):**
  - Supervisors D4 and D5.
  - Brea (2), Buena Park D5, Costa Mesa D3/D4/D5, Fullerton D3 and D5 (two endorsees), Huntington Beach (4).
  - Irvine D1/D5/D6, Orange D1, Santa Ana Ward 4, Tustin Mayor.

## Judgment calls

- **Typos fixed in `choice`:**
  - "SD 20 Carolyn Menjivar" is encoded as "Caroline Menjivar", the certified ballot name.
  - "CA-29: Luz Rivas (1*)" is encoded as "Luz Rivas".
- **Fullerton District 5, "Jozef Maldonado & Oscar Valadez".** This is a dual endorsement in one race, encoded as two `endorse` positions.
- **"Pasadena City College Board of Trustees, District 1 - Geoff Baum"** is titled `Pasadena Area Community College District Board, Trustee Area 1`. That matches the LA Fed's "Seat 1" pick (Francis Pollara) for the same seat.
- **"Culver City Board of Education" and "Culver City Unified School District"** are the same board, so both use `Culver City Unified School District Board`.
- **Jurisdictions.**
  - OC supervisors use `us/ca/orange`, the June convention for Orange County.
  - The City of Orange uses `us/ca/city-of-orange` to avoid colliding with it.
  - Other cities use `us/ca/<city>`.
- **The 2025 section** of the page (Prop 50, Redondo Beach and Irvine specials) is out of scope and was skipped.
