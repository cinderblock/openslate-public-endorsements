# NOTES — Run for Something, Nov 3 2026 California general (California picks only)

Run for Something is a national organization. This bundle holds only its
California picks for the November 3, 2026 general election.

## Sources

- https://runforsomething.net/candidates/: the candidate directory. Its HTML
  shows only a few featured candidates. The "California" state filter loads
  JSON from
  https://directory.runforsomething.net/page-data/candidates/CA/page-data.json
  (289 California records, all classes since 2017). See
  `rfs-directory-california-2026.md`.
- That JSON has 48 records with a 2026 general date. 44 are for Nov 3 (one,
  Rachel Farac, is entered as 11/02/2026). 4 are June 2 municipal races
  and were dropped: Bri Sérráno (Covina), Natalie Gee (SF Supervisor D4),
  Scott Lau (Sacramento D7) and Elen Asatryan (Glendale).
- Each of the 44 Nov 3 candidate pages
  (`https://directory.runforsomething.net/candidate/<id>/<slug>/`) was
  fetched. Each shows the office and the tag "2026 Endorsement", which is
  quoted as the statement. There is one evidence file per page.

## Extracted: 38 positions

- Legislature (2): AD 9 Matthew Adams, AD 68 Jessie Lopez.
- Los Angeles city (2): City Attorney Marissa Roy; City Council D9 Estuardo
  Mazariegos.
- 34 other local races (city councils, mayors, school boards, a fire
  district) across 25+ cities and counties.

## Skipped (6)

- **Did not advance from June 2:**
  - Jon Rawlings, LA City Council D3: finalists are Barri Worth Girvan and
    Timothy K. Gaspar.
  - Henry Mantel, LA City Council D5: Katy Yaroslavsky won outright with
    more than 50% (Larchmont Buzz, "City CMs Yaroslavsky and Soto-Martinez
    avoid runoff").
  - Mayra Campa, Fresno City Council D1: the runoff is Rob Fuentes vs.
    Naindeep Singh (GV Wire).
  - Burcu Mousa, Monterey County Auditor-Controller: lost the June 2
    contest 45.01% to 54.99% (county final official report).
- **Runoff status unconfirmed:**
  - Aram Ayra, Riverside City Council Ward 2: Raincross Gazette partial
    counts had him second (32.9%) over Mike Vahl (26.0%), but no certified
    result was found.
  - Christian Shaughnessy, San Bernardino City Council Ward 2: IECN
    unofficial counts had him first (39.7%). No certified result was
    found, and the second-place margin was thin.
  - Add these two back if the reviewer confirms they are November finalists.

## Review flags

- **Titles invented (no existing subject):**
  - Chico City Council, District 2 (`us/ca/chico`).
  - Stanislaus Union School District Board, Trustee Area 5
    (`us/ca/stanislaus-county`).
  - Merced County Board of Education, Area 5 (`us/ca/merced-county`).
  - Marina City Council, District 4 (`us/ca/marina`).
  - Banning City Council, District 5 (`us/ca/banning`).
  - Lawndale Elementary School District Board, Trustee Area 1
    (`us/ca/los-angeles-county`).
  - Fontana City Council, District 4 (`us/ca/fontana`).
  - Redlands Unified School District Board, Trustee Area 2
    (`us/ca/san-bernardino-county`).
  - Montebello City Council, District 5 (`us/ca/montebello`).
  - Pittsburg Unified School District Board of Trustees
    (`us/ca/contra-costa-county`).
  - "Fontana Mayor" is shared with the our-revolution bundle.
- **Directory office strings were mapped to existing titles**, e.g. "San
  José Unified School District Governing Board, Area 2" → "San Jose Unified
  School District Board, Trustee Area 2"; "Santa Ana Unified School Board,
  Area 5" → "Santa Ana Unified School District Board, Trustee Area 5";
  "Robla School District Board of Education" → "Robla Elementary School
  District Board of Trustees"; "Rowland Unified School District Board of
  Education, Area 3" → "Rowland Unified School District Board, Area 3".
- **Choice names:** the existing-bundle spellings were used where they
  differ: "Isuri Ramos" (directory: "Isuri S. Ramos") and "Jose Magana"
  (directory: "José Magaña"; check the Santa Clara County ballot spelling).
  "Joz Sida" (Fontana Mayor) is the directory name; the ballot name wasn't
  verified.
- Most of these are November-only local contests with no June primary. The
  only primary-stage ones kept are AD 9 (Adams vs. Heath Flora), AD 68
  (Lopez vs. David Penaloza), LA City Attorney (Roy vs. John McKinney) and
  LA City Council D9 (Mazariegos vs. Jose Ugarte), all confirmed in existing
  bundles.
- The directory's "electionOutcome" field is mostly "No Election Result
  Yet", even for candidates who have already advanced, so it was not used
  as proof.
