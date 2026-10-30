# NOTES — Marin Independent Journal editorial board, Nov 3 2026 general

## Sources

- https://www.marinij.com/2026/10/16/marin-ij-editorial-board-endorsements-for-the-nov-3-election/
  (HTML, scraped): "Marin IJ editorial board endorsements for Nov. 3
  election", by Marin IJ Editorial Board, published October 16, 2026. A list
  of "Regional races", "Marin races" and "Marin measures". It says "The board
  did not write endorsements for every race on the ballot."
- Individual IJ editorials behind each pick are listed at
  https://www.marinij.com/opinion/editorials/ (not fetched individually; the
  roundup gives every pick).
- Ballot names checked against the Marin County Elections Department "Local
  candidates ON ballot 11/03/26" page and the SOS certified list.

## Extracted: 33 positions

- Regional (3): CD 2 Huffman, SD 2 Connolly, AD 12 Lucan.
- Marin races (26): Novato USD Trustee Area 4; San Rafael council D3; Novato
  council D2 and D4; Larkspur (3); San Anselmo (2); Tiburon (3); Sausalito
  (2); Ross (2); Marin Healthcare District Divisions 1 and 3; Fairfax (2);
  Tamalpais UHSD (3); Corte Madera (3).
- Measures (4): P Yes, X Yes, CC Yes, W No (encoded `endorse` + `choice: "No"`).

`choice` uses the ROV ballot name where it differs from the list ("Daniel
Christian" -> "Dan Christian", "Jill Hoffman" -> "Jill James Hoffman", "Bob
Herbst" -> "Robert Herbst", "Julie McMillan" -> "Julie A McMillan", "Leslie
Harlander" -> "Leslie J. Harlander", "Brian Sutherland" -> "Brian A.
Sutherland").

## Skipped

- Statewide races and propositions: the IJ site carries "BANG endorsement"
  editorials (Fiona Ma, Ben Allen, Richard Barrera, No on 38/39/40/44). These
  are Bay Area News Group editorial board positions, not the IJ board's own
  list; the roundup links to BANG separately ("Click here for Bay Area News
  Group editorial board endorsements"). They belong in the
  `bay-area-news-group` bundle, not here.

## Flags for review

- "Healthcare board" is read as the Marin Healthcare District board (the
  only healthcare district with Division 1 and 3 contests on the Marin
  ballot: Hess/Hoepper and Su/Goff).
- "Tiburon council" -> Town of Tiburon Town Council; "Ross council" -> Town of
  Ross Town Council; "Corte Madera council" -> existing "Corte Madera Town
  Council"; "Fairfax council" -> Fairfax Town Council.

## Refresh 2026-10-30

The board reposted its roundup on Oct 30, 2026 (6:45 AM PDT); checked 2026-10-30 9:38 AM PDT (16:38Z). Its
local picks match this bundle. The page points to Bay Area News Group for state picks, and the IJ ran 12 of
BANG's editorials under BANG's byline (Treasurer, Insurance Commissioner, Superintendent, Props 1, 3, 5, 37,
38, 39, 43, 44, 45), confirmed article by article, so those are adopted (SPEC §3.10). Two state editorials
ran under the SCNG board's byline (Prop 4, Prop 40). Neither is adopted: BANG's and SCNG's are different
boards, and the roundup points only to BANG. No page text saved for this refresh.
