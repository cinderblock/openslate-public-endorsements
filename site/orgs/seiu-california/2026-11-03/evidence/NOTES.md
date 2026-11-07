# NOTES — SEIU California, Nov 3 2026 general

## Sources

- https://seiuca.org/elections/ ("SEIU California | 2025 & 2026 Elections",
  section "2026 ELECTION ENDORSEMENTS"; HTML, scraped with curl). Tables
  with columns "Position / Issue | Endorsement" and "District | Candidate".
- Note: the older domain seiucalifornia.org has an expired TLS certificate
  and returns 403. The current site is seiuca.org.

## Extracted: 120 positions

- 13 propositions:
  - YES: 1, 2, 3, 4, 5, 37.
  - NO: 39, 43, 45.
  - "NEUTRAL on Prop N" → `neutral`: 40, 41, 42, 44.
  - Prop 38 is not listed.
- 8 statewide offices and 4 Board of Equalization seats (Becerra, Ma,
  Bonta, Weber, Cohen, Kim, Barrera, Kounalakis; BOE Esparza, Lieber,
  Gipson, Umberg).
- 58 Assembly, 17 State Senate (16 candidates plus "No Recommendation" in
  SD 26 → `abstain`), 20 US House.

## Top-two check

All named candidates were checked against the SOS Certified List of
Candidates for the Nov 3 2026 General (8/27/2026,
https://elections.cdn.sos.ca.gov/statewide-elections/2026-general/cert-list-candidates.pdf).
All are on the general ballot in the listed district.

## Review flags (name spellings)

Choices use ballot spellings where the page misspells a name. The original
row is kept in each statement:
- "Xavier Beccera" → Xavier Becerra (Governor).
- "Amy Salvensky" → Amy Slavensky (AD 7).
- "Celestee Rodriguez" → Celeste Rodriguez (AD 43).
- "Dr. Ayana Davis" → Ayanna Davis (AD 65).
- "Mara Elliot" → Mara Elliott (SD 40).
- Honorific "Dr." dropped (Shirley Weber, Ida Obeso-Martinez, Paula Swift,
  Darshana Patel, Richard Pan).

## Coordinator check (2026-10-19)

The saved page text was missing lines that positions.json relies on (Board of Equalization District 4: Tom Umberg). I re-fetched the source URL on 2026-10-19 (~22:19Z), confirmed the lines are live, and added them to the evidence file verbatim.
