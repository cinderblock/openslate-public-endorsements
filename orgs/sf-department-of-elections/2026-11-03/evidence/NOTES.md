# NOTES — San Francisco Department of Elections, November 3 2026

## What this was read from

No image or PDF. All 65 positions come from the ordinary HTML text of the two
sf.gov pages the slate cites:

- https://www.sf.gov/reports--candidates-nov-3-2026-general-election: 43
  candidates in 11 contests, kept as `candidates.md`.
- https://www.sf.gov/qualified-ballot-measures: 11 measures, a Yes and a No
  each, 22 positions, kept as `qualified-ballot-measures.md`.

Those two files are rendered text from WebFetch, 2026-10-19, 10:05 and 10:25 PM
PDT (2026-10-20 05:05Z and 05:25Z). `scripts/sf-elections-ballot.ts` builds
`positions.json` from them. Both pages link PDFs (nomination documents, legal
text, ballot arguments), but every name, measure letter, title and type here is
in the page text, and nothing in the evidence or the script reads a PDF.

One value comes from neither page. `ballot.ranks` (10), and which offices are
ranked, are constants in the script, from
https://www.sf.gov/ranked-choice-voting. That page says "a voter can rank up to
10 candidates" (read 2026-10-30, 5:47 PM PDT, 2026-10-31 00:47Z). It's in
`attribution.sources` since 2026-10-30, so capture keeps it. Titles follow the
catalog's conventions, and `choice_id`, `subject.district` and `voted_in` were
added by later sweeps.

`attribution.mode` said `transcribed` until 2026-10-30, and now says `scraped`,
as the script does. SPEC §3.9 defines `transcribed` by a non-machine-readable
source (PDF, video, in-person notes), and the web app shows voters "transcribed
from a non-machine-readable source". These are web pages, and a script built
the slate, which is what `scraped` means and what the county registrars' ballot
sources say. No position changed.

Checked 2026-10-30, about 5:45 PM PDT (2026-10-31 00:45Z). All 65 values are in
CI's Chrome capture of both pages (`2026-10-31T0003Z`) and in the home GET
(`2026-10-31T0024Z`). In the home copy, every name sits under the office shown
in `candidates.md`, each measure has its letter and type, and write-ins are
0. CI's plain GET gets a 202 challenge, so it doesn't hold the page. The saved
copies start on 2026-10-30, so the pages as read on 2026-10-19 aren't held
anywhere.
