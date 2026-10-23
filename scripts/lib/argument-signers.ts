// Organizations that sign official ballot arguments, as printed under a signer, and where their
// positions go: reviewed by hand, shared by scripts/ca-ballot-arguments.ts (the state guide) and
// scripts/county-ballot-arguments.ts (the county guides), so one organization is one source
// whichever guide it signs in.

/** An organization as printed under a signer → where its positions go (null: not an organization's position). */
export interface Target {
  slug: string;
  name: string;
  kind?: string;
}
export const org = (slug: string, name: string, kind = "organization"): Target => ({
  slug,
  name,
  kind,
});
export const SIGNERS: Record<string, Target | null> = {
  // ---------------------------------------------------------------- the state guide
  "ACLU California Action": org("aclu-california-action", "ACLU California Action"),
  "AMVETS, Department of California": org("amvets-california", "AMVETS, Department of California"),
  "American Academy of Pediatrics, California": org(
    "aap-california",
    "American Academy of Pediatrics, California",
  ),
  "American College of Emergency Physicians, California Chapter": org(
    "california-acep",
    "American College of Emergency Physicians, California Chapter",
  ),
  "American Nurses Association, CA": org(
    "ana-california",
    "American Nurses Association\\California",
  ),
  "American Nurses Association\\California": org(
    "ana-california",
    "American Nurses Association\\California",
  ),
  "California Asian Pacific Chamber of Commerce (CalAsian Chamber)": org(
    "calasian-chamber",
    "California Asian Pacific Chamber of Commerce (CalAsian Chamber)",
  ),
  "California Children’s Hospital Association": org(
    "california-childrens-hospital-association",
    "California Children’s Hospital Association",
  ),
  "California Common Cause": org("california-common-cause", "California Common Cause"),
  // Signed as Common Cause's California State Director: the same organization.
  "Common Cause": org("california-common-cause", "California Common Cause"),
  "California Conference of Carpenters": org(
    "california-conference-of-carpenters",
    "California Conference of Carpenters",
  ),
  // The guide breaks the name over two lines.
  "California Consumer Advocates for Affordability and, Safety": org(
    "california-consumer-advocates-for-affordability-and-safety",
    "California Consumer Advocates for Affordability and Safety",
  ),
  "California Council on Affordable Housing": org(
    "california-council-on-affordable-housing",
    "California Council on Affordable Housing",
  ),
  "California Environmental Voters": org(
    "ca-environmental-voters",
    "California Environmental Voters (EnviroVoters)",
  ),
  "California Federation of Teachers": org(
    "california-federation-of-teachers",
    "California Federation of Teachers",
  ),
  "California Hispanic Chambers of Commerce": org(
    "california-hispanic-chambers-of-commerce",
    "California Hispanic Chambers of Commerce",
  ),
  "California Hospital Association": org(
    "california-hospital-association",
    "California Hospital Association",
  ),
  "California Medical Association": org(
    "california-medical-association",
    "California Medical Association",
  ),
  "California National Organization for Women": org(
    "california-now",
    "California National Organization for Women",
  ),
  "California Nurses Association": org(
    "california-nurses-association",
    "California Nurses Association",
  ),
  "California Primary Care Association": org(
    "california-primary-care-association",
    "California Primary Care Association",
  ),
  "California Professional Firefighters": org(
    "california-professional-firefighters",
    "California Professional Firefighters",
  ),
  "California School Boards Association": org(
    "california-school-boards-association",
    "California School Boards Association",
  ),
  "California School Employees Association": org("csea", "California School Employees Association"),
  "California School Nurses Organization": org(
    "california-school-nurses-organization",
    "California School Nurses Organization",
  ),
  "California Small Business Association": org(
    "california-small-business-association",
    "California Small Business Association",
  ),
  "California Society of Certified Public Accountants (CalCPAs)": org(
    "calcpas",
    "California Society of Certified Public Accountants (CalCPAs)",
  ),
  "California State Commanders Veterans Council": org(
    "california-state-commanders-veterans-council",
    "California State Commanders Veterans Council",
  ),
  "California Taxpayers Association": org("caltax", "California Taxpayers Association (CalTax)"),
  "California Taxpayers Association (CalTax)": org(
    "caltax",
    "California Taxpayers Association (CalTax)",
  ),
  "California Teachers Association": org("cta", "California Teachers Association"),
  "California Water Association": org(
    "california-water-association",
    "California Water Association",
  ),
  "California Women’s Leadership Association": org(
    "california-womens-leadership-association",
    "California Women’s Leadership Association",
  ),
  "Californians Against Waste": org("californians-against-waste", "Californians Against Waste"),
  "Californians for Voter ID": org(
    "californians-for-voter-id",
    "Californians for Voter ID",
    "campaign",
  ),
  "Central Valley Business Federation": org(
    "central-valley-business-federation",
    "Central Valley Business Federation",
  ),
  "Clean Water Action": org("clean-water-action-california", "Clean Water Action"),
  "Coalition for Clean Air": org("coalition-for-clean-air", "Coalition for Clean Air"),
  "Consumer Watchdog": org("consumer-watchdog", "Consumer Watchdog"),
  "Family Business Association of California": org(
    "family-business-association-of-california",
    "Family Business Association of California",
  ),
  "Hispanic Chambers of Commerce of San Francisco": org(
    "hispanic-chambers-of-commerce-sf",
    "Hispanic Chambers of Commerce of San Francisco",
  ),
  "Howard Jarvis Taxpayers Association": org("hjta", "Howard Jarvis Taxpayers Association"),
  "Latino American Political Association": org(
    "latino-american-political-association",
    "Latino American Political Association",
  ),
  "League of Women Voters of California": org(
    "lwv-california",
    "League of Women Voters of California",
  ),
  "Los Angeles Area Chamber of Commerce": org(
    "la-area-chamber-of-commerce",
    "Los Angeles Area Chamber of Commerce",
  ),
  "Non-Profit Housing Association of Northern California": org(
    "nph-northern-california",
    "Non-Profit Housing Association of Northern California",
  ),
  "Nurse Alliance of SEIU California": org(
    "nurse-alliance-seiu-california",
    "Nurse Alliance of SEIU California",
  ),
  "Peace Officers Research Association of California": org(
    "porac",
    "Peace Officers Research Association of California",
  ),
  "Physicians for Social Responsibility, LA": org(
    "psr-los-angeles",
    "Physicians for Social Responsibility, Los Angeles",
  ),
  "Planned Parenthood Affiliates of California": org(
    "planned-parenthood-california",
    "Planned Parenthood Affiliates of California",
  ),
  "Reform California": org("reform-california", "Reform California"),
  "SEIU-United Healthcare Workers West": org("seiu-uhw", "SEIU-United Healthcare Workers West"),
  "Self-Help for the Elderly": org("self-help-for-the-elderly", "Self-Help for the Elderly"),
  "Sierra Business Council": org("sierra-business-council", "Sierra Business Council"),
  "State Building and Construction Trades Council of California": org(
    "ca-building-trades",
    "State Building and Construction Trades Council of California",
  ),
  "The Transparency Foundation": org("the-transparency-foundation", "The Transparency Foundation"),
  "US Vets": org("us-vets", "US Vets"),
  // Not an organization's position: a place, government bodies (their officials sign as individuals).
  "Santa Monica": null,
  "Assembly Budget Committee": null,
  "California State Assembly Budget Committee": null,
  "Senate Elections and Constitutional Amendment Committee": null,
  "Senate Elections and Constitutional Amendments Committee": null,
  "California Fair Political Practices Commission": null,
  "Fair Political Practices Commission": null,
  "California Housing Finance Agency (CalHFA)": null,
  "California State Board of Education": null,
  "CAL FIRE": null,
  // Organizations whose signers here don't speak for them (see speaksFor), so they add nothing.
  "ALS Association": org("als-association", "ALS Association"),
  "Alzheimer’s Los Angeles": org("alzheimers-los-angeles", "Alzheimer’s Los Angeles"),
  "American College of Obstetricians & Gynecologists District IX": org(
    "acog-district-ix",
    "American College of Obstetricians & Gynecologists District IX",
  ),
  "California Academy of Family Physicians": org("cafp", "California Academy of Family Physicians"),
  "California Nurses for Environmental Health and Justice": org(
    "california-nurses-for-environmental-health-and-justice",
    "California Nurses for Environmental Health and Justice",
  ),
  "California Senior Alliance": org("california-senior-alliance", "California Senior Alliance"),
  "Kidney Cancer Association": org("kidney-cancer-association", "Kidney Cancer Association"),
  "Local 1521, Los Angeles College Faculty Guild": org(
    "aft-local-1521",
    "Los Angeles College Faculty Guild, AFT Local 1521",
  ),
  "Planned Parenthood of Pacific Southwest": org(
    "planned-parenthood-pacific-southwest",
    "Planned Parenthood of Pacific Southwest",
  ),
  "The Michael J. Fox Foundation for Parkinson’s Research": org(
    "michael-j-fox-foundation",
    "The Michael J. Fox Foundation for Parkinson’s Research",
  ),
};

/** Whether a signer's title makes them the organization's voice (not a board member, past officer, member or staff). */
export function speaksFor(title: string | undefined): boolean {
  if (!title) return false;
  if (
    /\b(former|fmr\.?|past|elect|board member|boardmember|board of|member of|specialist|teacher)\b/i.test(
      title,
    )
  ) {
    return false;
  }
  return /\b(president|co-president|ceo|chief|executive director|director|chair|chairman|commander)\b/i.test(
    title,
  );
}
