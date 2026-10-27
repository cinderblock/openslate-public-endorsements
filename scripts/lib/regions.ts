// Where a regional contest is on the ballot: the OpenSlate `subject.voted_in` (SPEC §3.3). A
// regional measure is filed under its region's path (`us/ca/bay-area`), which says nothing about
// whose ballot it's on: the app only knows a voter's city and county. `voted_in` names the
// jurisdictions that vote on it, so the app shows it to their voters, and the catalog's
// per-slate summary counts it there.
//
// Which counties vote on a measure is a fact about the measure, not the region's name: Regional
// Measure 3 (2018) went to all nine Bay Area counties, RTM (2026) to five. So the table is per
// contest. Every subject under a region's path needs an entry (verify-positions checks it), and
// `scripts/assign-voted-in.ts` writes it into every bundle, listings and orgs alike, positions and
// articles.

/** Paths that name a region rather than a place the app can put a voter in. */
export const REGIONS = new Set(["us/ca/bay-area"]);

interface RegionalContest {
  election: string;
  jurisdiction: string;
  title: string;
  /** Sorted. */
  voted_in: string[];
  /** Where the list of jurisdictions comes from. */
  source: string;
}

const CONTESTS: RegionalContest[] = [
  {
    election: "2026-11-03",
    jurisdiction: "us/ca/bay-area",
    title: "Bay Area — Regional Measure RTM (Regional Transit Measure)",
    // SB 63 (2025), the Connect Bay Area Act: Alameda, Contra Costa, San Francisco, San Mateo and
    // Santa Clara counties. Four of the five counties' listings carry it here; Contra Costa has
    // no listing yet.
    voted_in: [
      "us/ca/alameda-county",
      "us/ca/contra-costa-county",
      "us/ca/san-mateo-county",
      "us/ca/santa-clara-county",
      "us/ca/sf",
    ],
    source: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB63",
  },
];

interface Subject {
  title: string;
  jurisdiction?: string;
  election?: string;
  voted_in?: string[];
}

/** The jurisdictions that vote on a subject, when it's a regional contest this table knows. */
export function votedInFor(subject: Subject, election: string): string[] | undefined {
  const contest = CONTESTS.find(
    (c) =>
      c.election === (subject.election ?? election) &&
      c.jurisdiction === subject.jurisdiction &&
      c.title === subject.title,
  );
  return contest?.voted_in;
}

/** What's wrong with a subject's `voted_in`, if anything. */
export function votedInProblem(subject: Subject, election: string): string | undefined {
  const want = votedInFor(subject, election);
  if (!want && subject.jurisdiction && REGIONS.has(subject.jurisdiction))
    return `"${subject.title}": filed under the region ${subject.jurisdiction}, which no regional contest in scripts/lib/regions.ts names`;
  const have = subject.voted_in;
  if (JSON.stringify(have) === JSON.stringify(want)) return undefined;
  const show = (list?: string[]) => (list ? JSON.stringify(list) : "none");
  return `"${subject.title}": voted_in ${show(have)}, want ${show(want)}`;
}
