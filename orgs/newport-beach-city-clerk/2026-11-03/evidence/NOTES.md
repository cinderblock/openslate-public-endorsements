# NOTES — City of Newport Beach, November 3 2026

## What this was read from

No image or PDF. Both Measure H positions come from the ordinary HTML text of
the city's elections page, the one URL the slate cites. No script builds this
bundle: it was entered by hand. The page says only "consider Measure H" and
"including Measure H". It doesn't print the measure's title or ballot question,
so the title, `subject.ballot` and `choice_id`s are the Orange County
Registrar's, as the update below says. Its bundle cites ocvote.gov's measures
page for them.

`attribution.mode` said `transcribed` until 2026-10-30, and now says `scraped`.
SPEC §3.9 defines `transcribed` by a non-machine-readable source (PDF, video,
in-person notes), and the web app shows voters "transcribed from a
non-machine-readable source". An HTML page isn't one. `scraped` is a looser fit
than it is for a registrar's bundle, because a person entered this and SPEC has
no mode for that, but "scraped from public sources" is true here. No position
changed.

Checked 2026-10-30, about 5:45 PM PDT (2026-10-31 00:45Z), against the page as
saved in capture run `2026-10-31T0003Z`: all five quotes in the update below are
there. The page's one PDF link is a council district map, which gave nothing
here. The saved copies start on 2026-10-30, so the page as read on 2026-10-27
isn't held anywhere: `evidence/` keeps the quotes below, not the page.

## Update, 2026-10-27: Measures P, Q and R called off

The city's elections page, read 2026-10-27 2:00 AM PDT (09:00Z), now says
the Special Municipal Election on Measures P, Q and R won't happen on
Nov 3. Quotes (https://www.newportbeachca.gov/government/elections/general-municipal-election-november-3-2026):

- "The Special Election to consider three citizen-initiated ballot measures
  P, Q, and R will not take place on November 3, 2026."
- Why: "the City's ballot printing vendor has not received the required
  authorization, watermark, and ballot tint from the California Secretary of
  State", and "the City has not received information and assistance needed
  from the Orange County Registrar of Voters to identify and facilitate
  ballot delivery to voters with legally protected addresses."
- "Importantly, the November 3, 2026, consolidated General Municipal
  Election, administered by the Orange County Registrar of Voters, will
  proceed as scheduled, including Measure H."
- "The City will provide additional information regarding the status of the
  special election as it becomes available."

So the bundle no longer lists P, Q and R. It lists Measure H instead, the
one city measure the page says is on Nov 3, under the Orange County
Registrar's subject and choice ids (the registrar's bundle lists the same
race; a second id for the same choice would make the two listings disagree).

Why re-issue rather than delete the bundle: the web app replaces a slate a
voter has imported only when the catalog lists a newer slate of the same
stream (same signer, source, election and place). A deleted bundle would
stay on every Newport Beach voter who imported it, still listing P, Q and R.
The re-issued one replaces it, and with P, Q and R in no listing while the
registrar's covers Newport Beach, they're off the ballot again.

The Southern California News Group's "No" on P, Q and R left its bundle the
same day (the catalog only carries positions on races that are on the
ballot). Its "No" on H stays.

If the city reschedules the special election, P, Q and R come back as a
bundle for that election's date, not this one.

## Before the update (2026-10-23)

### Sources

- **Main:** https://www.newportbeachca.gov/government/elections/general-municipal-election-november-3-2026
  — read 2026-10-23 10:30 AM PDT (17:30Z). Quotes:
  - "the City of Newport Beach will conduct a separate, standalone Special
    Municipal Election for the purpose of considering Measures P, Q, and R."
  - "The City's ballot is separate and distinct from the ballot administered
    by the Orange County Registrar of Voters"
  - Both elections are on "Tuesday, November 3, 2026". The General Municipal
    Election covers "filling seats on the City Council for a four-year term
    for council districts 1, 3, 4, and 6" and Measure H (in the Orange County
    Registrar's bundle).
- Supporting:
  - https://laist.com/brief/news/politics/newport-beach-special-city-election-ballot-measures
    (Oct 5, 2026): the city "missed a county deadline to get them on the
    general election ballot."
  - https://newportbeachcivicledger.org/2026-initiatives (updated Oct 23,
    2026): the Court of Appeal denied the city's petition on Oct 20 ("The
    petition for writ of mandate and request for immediate stay are
    DENIED."); no order stops the election.

### What's in the bundle

Measures P, Q and R, each as neutral Yes and No positions. The city's page
names the measures but doesn't print their ballot questions, so the titles
are the catalog's existing subjects (from the Southern California News
Group's bundle), which match the subjects reported: P, lifetime two-term
council limit; Q, by-district council elections; R, Charter open-government
(sunshine) rules.

### Why this bundle exists

The Orange County Registrar's bundle covers Newport Beach, so the catalog's
ballot check treated P, Q and R as "not on the ballot". They are on a ballot,
the city's own. Found 2026-10-23 by the ballot check; researched against the
sources above.
