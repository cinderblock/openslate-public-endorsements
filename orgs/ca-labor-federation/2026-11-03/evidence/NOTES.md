# NOTES — California Federation of Labor Unions, AFL-CIO, Nov 3 2026 general

## Sources

The Federation's "Labor 2026 General Election Endorsements" page
(https://calaborfed.org/labor-2026-primary-election-endorsements/; the slug
still says "primary") has no endorsement text in HTML. It links to:

1. The COPE convention PDF (V2, uploaded 2026-09): the authoritative full list.
   In June the Federation's PDF couldn't be parsed. This one has a text layer;
   I extracted it with pdftotext and also rendered each page to an image and
   read it to confirm the two-column alignment.
2. Two slate-card JPGs dated 2026-09-30 (statewide offices, propositions),
   which agree with the PDF on every statewide office and proposition.
3. The Aug 4 2026 press release (HTML), used as the source for Governor
   (Becerra) and Prop 40, because it states those endorsements in prose.

Because most positions were read from a PDF and images, `mode` is `transcribed`.

## Extracted: 154 positions

- 12 statewide: Governor, Lt. Governor, SoS, AG, Controller, Treasurer,
  Insurance Commissioner, SPI, and BOE districts 1-4.
- 47 US House districts.
- 19 State Senate districts.
- 63 State Assembly districts.
- 13 statewide propositions: Yes on 1, 2, 3, 4, 5, 37, 40, 44; No on 39, 41, 42, 43, 45.

Candidate positions use the PDF as `source` and have no statement (the PDF
gives no justifications). Proposition positions (except 40) use slate card 2
as `source` and quote its one-line tagline as the statement.

## Skipped

- Every "No Recommendation" entry: CD 7, 16, 20, 23, 40; SD 22; AD 1, 3, 5,
  8, 10, 14, 15, 23, 32, 33, 34, 48, 64, 68, 70, 75, 80.
- Prop 38: "No Recommendation" in the PDF, and absent from the slate card.
  Omitted rather than recorded as `neutral`.
- Local endorsements (the "Search by county" and "Search by Labor Council"
  widgets point to local labor councils). These are out of scope for this
  statewide org bundle.

## Judgment calls for the reviewer

- **Top-two check.** The list comes from the "PRE-GENERAL ELECTION COPE
  CONVENTION" held Aug 4 2026, after the June 2 primary. It should therefore
  cover only candidates who advanced to November. I did not verify all 141
  candidates against the SoS certified list. I spot-checked Governor
  (Becerra advanced, per CalMatters and CBS coverage of the primary).
- **Names normalized.** The PDF prints "Sydney Kamlager (D)" for CD 37. To
  match her ballot name, and the name used elsewhere in the repo, the choice
  is recorded as "Sydney Kamlager-Dove", with the PDF's wording kept in the
  statement. Every other name is transcribed exactly as printed.
- **Republicans endorsed.** The PDF endorses some Republicans: Nathan Magsig
  (SD 12), Heath Flora (AD 9), Juan Alanis (AD 22), Phillip Chen (AD 59), and
  Laurie Davies (AD 74). They are transcribed as printed.
- **Names worth a second look.** "Kevin Akin (D)" for AD 63 is verbatim from
  the PDF. A third-party tracker (theballotbrief.com) shows the AD 63 general
  as Natasha Johnson (R) vs. Kevin Akin (Peace and Freedom, who advanced as a
  write-in). So the "(D)" party label in the PDF looks wrong, but the
  candidate is on the ballot and the endorsement is kept. "JJ Galvez (D)"
  for AD 71 is also verbatim and was not confirmed against the certified
  candidate list.
- **The Federation's labels differ from the SoS titles.** Subject titles use
  the official SoS ballot labels. The Federation uses its own: for example,
  Prop 1 is "The Veterans and Affordable Housing Bond Act" and Prop 40 is
  "Billionaire Wealth Tax Initiative". Its labels are preserved in the
  statements and evidence.
- `retrieved_at` is the time of the latest fetch (the press release and
  endorsements page HTML, 2026-10-15T01:09:25Z). The PDF and images were
  downloaded at 01:08:08Z.
