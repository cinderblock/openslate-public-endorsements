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

  // ---------------------------------------------------------------- the county guides
  // San Francisco: organizations sign as themselves, in official and paid arguments alike.
  "350 San Francisco Action": org("350-sf-action", "350 San Francisco Action"),
  "Affordable Housing Alliance": org(
    "sf-affordable-housing-alliance",
    "San Francisco Affordable Housing Alliance",
  ),
  "Alice B. Toklas LGBTQ Democratic Club": org(
    "alice-b-toklas-club",
    "Alice B. Toklas LGBTQ Democratic Club",
  ),
  "Anti Displacement Coalition": org(
    "sf-anti-displacement-coalition",
    "San Francisco Anti-Displacement Coalition",
  ),
  "SF Anti Displacement Coalition": org(
    "sf-anti-displacement-coalition",
    "San Francisco Anti-Displacement Coalition",
  ),
  "SF Anti-Displacement Coalition": org(
    "sf-anti-displacement-coalition",
    "San Francisco Anti-Displacement Coalition",
  ),
  "San Francisco Anti-Displacement Coalition": org(
    "sf-anti-displacement-coalition",
    "San Francisco Anti-Displacement Coalition",
  ),
  // Signed so, and paid for so ("The true source(s) of funds …: Business League.").
  "Business League": org("business-league-sf", "Business League"),
  "Castro LGBTQ Cultural District": org(
    "castro-lgbtq-cultural-district",
    "Castro LGBTQ Cultural District",
  ),
  "Chinatown Community Development Center": org(
    "chinatown-cdc",
    "Chinatown Community Development Center",
  ),
  // "Malcom Yeung, CEO, Chinatown Community" / "Development Center", broken over two lines.
  "Chinatown Community": org("chinatown-cdc", "Chinatown Community Development Center"),
  "Chinatown History and Culture Association": org(
    "chinatown-history-and-culture-association",
    "Chinatown History and Culture Association",
  ),
  "Chinatown Transportation Research and Improvement Project": org(
    "ctrip",
    "Chinatown Transportation Research and Improvement Project",
  ),
  "Chinese American Democratic Club": org(
    "chinese-american-democratic-club",
    "Chinese American Democratic Club",
  ),
  "Chinese for Affirmative Action": org(
    "chinese-for-affirmative-action",
    "Chinese for Affirmative Action",
  ),
  "Coalition on Homelessness": org("coalition-on-homelessness", "Coalition on Homelessness"),
  "Community Tenants Association": org(
    "community-tenants-association",
    "Community Tenants Association",
  ),
  "Council of Community Housing Organizations": org(
    "ccho",
    "Council of Community Housing Organizations",
  ),
  // As printed once.
  "Council of Community Housing Coalitions": org(
    "ccho",
    "Council of Community Housing Organizations",
  ),
  "Council of District Merchant Associations": org(
    "sf-council-of-district-merchants",
    "San Francisco Council of District Merchants Associations",
  ),
  "Council of District Merchants Associations": org(
    "sf-council-of-district-merchants",
    "San Francisco Council of District Merchants Associations",
  ),
  "SF Council of District Merchants": org(
    "sf-council-of-district-merchants",
    "San Francisco Council of District Merchants Associations",
  ),
  "Faith in Action": org("faith-in-action-bay-area", "Faith in Action Bay Area"),
  "Faith in Action Bay Area": org("faith-in-action-bay-area", "Faith in Action Bay Area"),
  "Golden Gate Bird Alliance": org("golden-gate-bird-alliance", "Golden Gate Bird Alliance"),
  "Haight Ashbury Neighborhood Council": org(
    "haight-ashbury-neighborhood-council",
    "Haight Ashbury Neighborhood Council",
  ),
  "Hotel Council": org("hotel-council-sf", "Hotel Council of San Francisco"),
  "Housing Rights Committee": org(
    "housing-rights-committee-sf",
    "Housing Rights Committee of San Francisco",
  ),
  "The Housing Rights Committee of San Francisco": org(
    "housing-rights-committee-sf",
    "Housing Rights Committee of San Francisco",
  ),
  // Not the national Indivisible (`indivisible`).
  "Indivisible SF": org("indivisible-sf", "Indivisible SF"),
  "International Brotherhood of Electrical Workers Local 6": org(
    "ibew-local-6",
    "International Brotherhood of Electrical Workers Local 6",
  ),
  "International Union of Elevator Constructors Local 8": org(
    "iuec-local-8",
    "International Union of Elevator Constructors Local 8",
  ),
  "Iron Workers Local 376": org("iron-workers-local-376", "Iron Workers Local 376"),
  "La Raza Community Resource Center": org(
    "la-raza-community-resource-center",
    "La Raza Community Resource Center",
  ),
  "League of Women Voters of the Bay Area": org("lwv-bay-area", "League of Women Voters Bay Area"),
  "Marie Harrison Community Foundation": org(
    "marie-harrison-community-foundation",
    "Marie Harrison Community Foundation",
  ),
  "Milkman Sound, Inc.": org("milkman-sound", "Milkman Sound, Inc."),
  "National Union of Healthcare Workers": org("nuhw", "National Union of Healthcare Workers"),
  "Noe Valley Merchants and Professionals Association": org(
    "noe-valley-merchants",
    "Noe Valley Merchants and Professionals Association",
  ),
  "Ocean Beach Institute": org("ocean-beach-institute", "Ocean Beach Institute"),
  "Race and Equity in All Planning Coalition (REP-SF)": org(
    "rep-sf",
    "Race and Equity in All Planning Coalition (REP-SF)",
  ),
  "Race and Equity in All Planning Coalition -": org(
    "rep-sf",
    "Race and Equity in All Planning Coalition (REP-SF)",
  ),
  "Race and Equity in All Planning Coalition - San Francisco": org(
    "rep-sf",
    "Race and Equity in All Planning Coalition (REP-SF)",
  ),
  "Richmond District Democratic Club": org(
    "richmond-district-democratic-club",
    "Richmond District Democratic Club",
  ),
  "Rose Pak Asian American Club": org(
    "rose-pak-asian-american-club",
    "Rose Pak Asian American Club",
  ),
  "SF Bicycle Coalition": org("sf-bicycle-coalition", "San Francisco Bicycle Coalition"),
  "San Francisco Bicycle Coalition": org("sf-bicycle-coalition", "San Francisco Bicycle Coalition"),
  "SF Chamber of Commerce": org("sf-chamber-of-commerce", "San Francisco Chamber of Commerce"),
  "San Francisco Chamber of Commerce": org(
    "sf-chamber-of-commerce",
    "San Francisco Chamber of Commerce",
  ),
  "SF Labor Council": org("sf-labor-council", "San Francisco Labor Council"),
  "San Francisco Labor Council": org("sf-labor-council", "San Francisco Labor Council"),
  "SF League of Conservation Voters": org(
    "sf-league-of-conservation-voters",
    "San Francisco League of Conservation Voters",
  ),
  "San Francisco League of Conservation Voters": org(
    "sf-league-of-conservation-voters",
    "San Francisco League of Conservation Voters",
  ),
  "SF Policy Action Team / Climate Reality": org(
    "climate-reality-sf-policy-action-team",
    "SF Policy Action Team / Climate Reality Project",
  ),
  "SF Policy Action Team / Climate Reality Project": org(
    "climate-reality-sf-policy-action-team",
    "SF Policy Action Team / Climate Reality Project",
  ),
  "SF Taxpayers Association": org(
    "sf-taxpayers-association",
    "San Francisco Taxpayers Association",
  ),
  "San Francisco Taxpayers Association": org(
    "sf-taxpayers-association",
    "San Francisco Taxpayers Association",
  ),
  "SF Working Families Democratic Club": org(
    "sf-working-families-democratic-club",
    "SF Working Families Democratic Club",
  ),
  "San Francisco Building and Construction Trades Council": org(
    "sf-building-trades",
    "San Francisco Building and Construction Trades Council",
  ),
  "San Francisco Climate Emergency Coalition": org(
    "sf-climate-emergency-coalition",
    "San Francisco Climate Emergency Coalition",
  ),
  "San Francisco Community Land Trust": org(
    "sf-community-land-trust",
    "San Francisco Community Land Trust",
  ),
  "San Francisco Democratic Party": org(
    "sf-democratic-party",
    "San Francisco Democratic Party (DCCC)",
  ),
  "San Francisco League of Pissed Off Voters": org(
    "sf-league-of-pissed-off-voters",
    "SF League of Pissed Off Voters",
  ),
  "San Francisco Public Bank Coalition": org(
    "sf-public-bank-coalition",
    "San Francisco Public Bank Coalition",
  ),
  "San Francisco Rising Action Fund": org("sf-rising-action", "SF Rising Action"),
  "San Francisco Senior & Disability Action": org(
    "senior-and-disability-action",
    "Senior and Disability Action",
  ),
  "San Francisco Senior and Disability Action": org(
    "senior-and-disability-action",
    "Senior and Disability Action",
  ),
  "Senior and Disability Action": org(
    "senior-and-disability-action",
    "Senior and Disability Action",
  ),
  "San Francisco Tenants Union": org("sf-tenants-union", "SF Tenants Union"),
  "San Francisco Women’s Housing Coalition": org(
    "sf-womens-housing-coalition",
    "San Francisco Women’s Housing Coalition",
  ),
  "San Francisco Women’s Political Committee": org(
    "sf-womens-political-committee",
    "San Francisco Women's Political Committee",
  ),
  "Service Employees International Union 1021": org("seiu-1021", "SEIU Local 1021"),
  "Service Employees International Union SEIU 1021": org("seiu-1021", "SEIU Local 1021"),
  "Service Employees International Union 2015": org("seiu-2015", "SEIU Local 2015"),
  "Sierra Club": org("sierra-club-sf-bay", "Sierra Club San Francisco Bay Chapter"),
  "Small Business Forward": org("small-business-forward", "Small Business Forward"),
  "South of Market Community Action Network (SOMCAN)": org(
    "somcan",
    "South of Market Community Action Network (SOMCAN)",
  ),
  "Sunset Merchants Association": org(
    "sunset-merchants-association",
    "Sunset Merchants Association",
  ),
  TODCO: org("todco", "TODCO"),
  "The San Francisco Foundation": org("sf-foundation", "The San Francisco Foundation"),
  "The San Francisco Republican Party": org(
    "sf-republican-party",
    "San Francisco Republican Party",
  ),
  "Transit Workers Union - 250A": org("twu-250a", "Transport Workers Union Local 250A"),
  "Transit Workers Union 250A": org("twu-250a", "Transport Workers Union Local 250A"),
  "United Democratic Club": org("united-democratic-club", "United Democratic Club"),
  "United Educators of San Francisco": org("uesf", "United Educators of San Francisco"),
  "Westside Collective": org("westside-collective", "Westside Collective"),
  "Westside Family Democratic Club": org(
    "westside-family-democratic-club",
    "Westside Family Democratic Club",
  ),
  "Westside Forward": org("westside-forward", "Westside Forward"),
  "Yimby Action": org("sf-yimby", "SF YIMBY (YIMBY Action SF)"),
  // Not organizations' positions: people whose titles the line ran into, fragments of a name
  // broken over lines, and government bodies.
  "CA Democratic Party Vice Chair* David Campos": null,
  "Operating Engineers Local 3 District Representative Charles Lavery*": null,
  "SF State College Democrats President Chase Preston*": null,
  "SF Young Democrats President Andrea Gallardo*": null,
  "Union Activist and Communal Advocate": null,
  "Development Center": null,
  "Research and Improvement Project": null,
  "BART Board Vice": null,
  "San Francisco Board of Supervisors": null,
  "Housing and Community Development Committee": null,

  // Alameda: "s/ League of Women Voters Bay Area" / "by NAME, Title", or "Title, Organization".
  "Accessory Dwelling Unit Task Force": null,
  "Alameda Chamber & Economic Alliance": org(
    "alameda-chamber-economic-alliance",
    "Alameda Chamber & Economic Alliance",
  ),
  "Alameda County Taxpayers’ Association": org(
    "alameda-county-taxpayers-association",
    "Alameda County Taxpayers’ Association",
  ),
  "Alameda County Taxpayer’s Association": org(
    "alameda-county-taxpayers-association",
    "Alameda County Taxpayers’ Association",
  ),
  "Alameda Firefighters": org("alameda-firefighters", "Alameda Firefighters"),
  "Berkeley Chamber of Commerce": org(
    "berkeley-chamber-of-commerce",
    "Berkeley Chamber of Commerce",
  ),
  "Berkeley Property Owners Association": org(
    "berkeley-property-owners-association",
    "Berkeley Property Owners Association",
  ),
  "Berkeley Rent Board": null,
  "Berkeley Symphony": org("berkeley-symphony", "Berkeley Symphony"),
  "Berkeley Tenants Union": org("berkeley-tenants-union", "Berkeley Tenants Union"),
  "Block by Block Organizing Network": org(
    "block-by-block-organizing-network",
    "Block by Block Organizing Network",
  ),
  "Bridge Association of REALTORS®": org(
    "bridge-association-of-realtors",
    "Bridge Association of REALTORS®",
  ),
  "Budget Advisory and Financial Planning Committee": null,
  "City Council": null,
  "Contra Costa Taxpayer’s Association": org(
    "contra-costa-taxpayers-association",
    "Contra Costa Taxpayers Association",
  ),
  "DUSD Parcel Tax Oversight Committee / DUSD Parent": null,
  "District 2 Councilmember, Public Safety": null,
  "Ecology Center": org("ecology-center", "Ecology Center"),
  Freight: org("the-freight", "The Freight"),
  "Greenbelt Alliance": org("greenbelt-alliance", "Greenbelt Alliance"),
  "Hayward Firefighters Local 1909": org(
    "hayward-firefighters-local-1909",
    "Hayward Firefighters Local 1909",
  ),
  "League of Women Voters Bay Area": org("lwv-bay-area", "League of Women Voters Bay Area"),
  "League of Women Voters Berkeley Albany Emeryville": org(
    "lwv-berkeley-albany-emeryville",
    "League of Women Voters of Berkeley, Albany and Emeryville",
  ),
  "League of Women Voters of Berkeley Albany Emeryville": org(
    "lwv-berkeley-albany-emeryville",
    "League of Women Voters of Berkeley, Albany and Emeryville",
  ),
  "League of Women Voters of Oakland": org("lwv-oakland", "League of Women Voters of Oakland"),
  // Brock Grunt, president of a firm and chair of the chamber's board; signed elsewhere as its president.
  "McGuire and Hester and Board Chair, Alameda Chamber": null,
  "Newark Chamber of Commerce": org("newark-chamber-of-commerce", "Newark Chamber of Commerce"),
  "Newark Police Officers Association": org(
    "newark-police-officers-association",
    "Newark Police Officers Association",
  ),
  "Piedmont Board of Education": null,
  "Resources for Community Development": org(
    "resources-for-community-development",
    "Resources for Community Development",
  ),
  "Save the Bay": org("save-the-bay", "Save the Bay"),
  "Sunol Glen Unified": null,
  "Union City Chamber of Commerce": org(
    "union-city-chamber-of-commerce",
    "Union City Chamber of Commerce",
  ),
  "United Seniors of Alameda County": org(
    "united-seniors-of-alameda-county",
    "United Seniors of Alameda County",
  ),
  "United Way Bay Area": org("united-way-bay-area", "United Way Bay Area"),

  // Orange County.
  "Citizen’s Oversight Committee": null,
  "Costa Mesa Firefighters Association": org(
    "costa-mesa-firefighters-association",
    "Costa Mesa Firefighters Association",
  ),
  "Laguna Beach Unified Council of PTAs": org(
    "laguna-beach-council-of-ptas",
    "Laguna Beach Unified Council of PTAs",
  ),
  "Laguna Board of Realtors": org("laguna-board-of-realtors", "Laguna Board of Realtors"),
  "Placentia Chamber of Commerce": org(
    "placentia-chamber-of-commerce",
    "Placentia Chamber of Commerce",
  ),
  "SchoolPower Laguna Beach Education Foundation": org(
    "schoolpower-laguna-beach",
    "SchoolPower Laguna Beach Education Foundation",
  ),
  "Westminster Teachers Association": org(
    "westminster-teachers-association",
    "Westminster Teachers Association",
  ),

  // San Diego.
  "American Federation of Teachers Grossmont-Cuyamaca Community College District": org(
    "aft-grossmont-cuyamaca",
    "American Federation of Teachers, Grossmont-Cuyamaca Community College District",
  ),
  "Condominium Organizations of South Sierra Avenue 20 year resident": org(
    "condominium-organizations-south-sierra-avenue",
    "Condominium Organizations of South Sierra Avenue",
  ),
  "Coronado Republican Club (CRC)": org("coronado-republican-club", "Coronado Republican Club"),
  "Former Independent Oversight Committee": null,
  "Jamul Soccer; JDUSD Parent": org("jamul-soccer", "Jamul Soccer"),
  "La Mesa-Spring Valley Teachers Association": org(
    "la-mesa-spring-valley-teachers-association",
    "La Mesa-Spring Valley Teachers Association",
  ),
  "Parrot Education & Adoption Center": org(
    "parrot-education-adoption-center",
    "Parrot Education & Adoption Center",
  ),
  "Progressive California Voter Guide": org(
    "progressive-california-voter-guide",
    "Progressive California Voter Guide",
  ),
  "San Diego & Imperial Counties Labor Council, AFL-CIO": org(
    "sd-imperial-labor-council",
    "San Diego & Imperial Counties Labor Council",
  ),
  "San Diego Labor Council, AFL-CIO": org(
    "sd-imperial-labor-council",
    "San Diego & Imperial Counties Labor Council",
  ),
  "San Diego County Building & Construction Trades Council": org(
    "sd-building-trades",
    "San Diego County Building & Construction Trades Council",
  ),
  "San Diego County Taxpayers Association": org(
    "sd-county-taxpayers-association",
    "San Diego County Taxpayers Association",
  ),
  "San Diego Taxpayers Association": org(
    "sd-county-taxpayers-association",
    "San Diego County Taxpayers Association",
  ),
  "San Diego Deputy Sheriffs Association": org(
    "sd-deputy-sheriffs-association",
    "San Diego Deputy Sheriffs Association",
  ),
  "San Diego Education Association": org(
    "san-diego-education-association",
    "San Diego Education Association",
  ),
  "San Diego Humane Society": org("san-diego-humane-society", "San Diego Humane Society"),
  "Santee Fire Fighters Association": org(
    "santee-fire-fighters-association",
    "Santee Fire Fighters Association",
  ),
  "Solana Beach Chamber of Commerce Board of Directors 47 year resident": org(
    "solana-beach-chamber-of-commerce",
    "Solana Beach Chamber of Commerce",
  ),
  "Transparency Foundation": org("the-transparency-foundation", "The Transparency Foundation"),
  "Vista Chamber of Commerce": org("vista-chamber-of-commerce", "Vista Chamber of Commerce"),
  "Vista Fire Fighters Association": org(
    "vista-fire-fighters-association",
    "Vista Fire Fighters Association",
  ),
  "Vista Unified Council of PTAs (VUCPTA)": org(
    "vista-unified-council-of-ptas",
    "Vista Unified Council of PTAs",
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
  // A union's business manager or secretary-treasurer leads it.
  return /\b(president|co-president|ceo|chief|executive director|director|chair|chairman|commander|business manager|secretary-treasurer)\b/i.test(
    title,
  );
}
