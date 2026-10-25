# OpenSlate Public Endorsements

A community-maintained directory of **publicly-attributed endorsement slates**
in the [OpenSlate](https://github.com/cinderblock/openslate) format.

Every slate in this repository is a **secondhand report**: it is signed by
this project's researcher key, with the `attribution` field naming the
organization whose public stances are being summarized. The named
organization did not sign the slate themselves. Consumers should always
prefer a firsthand slate from an organization if one becomes available.

## Scope

Only positions with a **direct mapping to a specific ballot entry** belong
here:

- Candidate endorsements / opposition for a named race (e.g. "Sierra Club
  endorses Alice for State Senate District 4").
- Stances on a specific named ballot measure or proposition (e.g.
  "Editorial board endorses Yes on Prop 12").

These are NOT in scope for this repo:

- General policy issue stances ("supports voting rights expansion",
  "opposes gerrymandering") that don't map to a named race or measure on a
  ballot.
- Legislative position calls (support/oppose a federal bill).
- Platform planks, mission statements, or principles.

Such content may be valuable elsewhere in the OpenSlate ecosystem, but it
does not help a voter make a decision on a specific ballot entry, so it is
out of scope here. Organizations that publish only policy positions and
explicitly do not endorse candidates or measures (e.g. ACLU, League of
Women Voters) are usually a poor fit for this repo.

## How it works

- Source of truth: human-editable `orgs/<slug>/<election>/positions.json`
  files.
- Signing happens in GitHub Actions on every push to the default branch.
  The private key lives only as an Actions secret — never on a contributor
  machine.
- Signed `.slate` files are published to GitHub Pages, where the main
  OpenSlate web app can import them by URL.

## Repository layout

```
.
├── orgs/
│   └── <slug>/
│       ├── meta.yaml                  # display name, uri, kind, logo, logo_source, logo_background
│       ├── logo.<ext>                 # the org's site icon (png/svg/webp/ico/jpg/gif)
│       └── <election-or-year>/
│           └── positions.json         # source of truth — what we sign
├── keys/
│   └── project-public.json            # the project's public signing key
├── well-known/
│   └── openslate.json                 # served at /well-known/openslate.json
├── scripts/                           # build + verify helpers
├── .github/workflows/                 # PR verify + master publish
└── .openslate-version                 # pinned OpenSlate ref used in CI
```

Signed `.slate` artifacts are **not** committed — they are produced fresh by
CI and exposed via the published site.

Org logos are committed copies of each org's own site icon, so the published
site serves them and a visitor's browser never contacts the org. In
`meta.yaml`, `logo:` names the file and `logo_source:` records the URL it was
downloaded from. `bun scripts/fetch-logos.ts` fetches them from each org's
`uri` (skipping orgs that already have one; `--only <slug> [--url <homepage>]`,
`--force`). When the homepage turns bots away or only has a small icon, it
asks Google's favicon service for the site's icon instead.
`--only <slug> --icon <image url>` takes a hand-picked image, and
`--reject <slug> --reason "..."` drops a bad pick. It also writes a review
contact sheet to `review/logos.html` (gitignored). Orgs without a logo get a
monogram in the app. A logo drawn only in white (for a dark header) vanishes
on the app's white tile: look for a light-background version on the org's
site first (a WordPress site's `/wp-json/wp/v2/media?search=logo` lists its
uploads), and when there isn't one, add `logo_background: dark` under
`logo_source:` by hand so the app draws it on a dark tile.

`scripts/build-site.ts` adds these fields to each `index.json` / `bundle.json`
entry (`scripts/catalog-extras.ts`):

- `logo`: the logo's site path, from `meta.yaml`.
- `logo_background`: `"dark"` when `meta.yaml` says so; absent otherwise.
- `lean`: `{ left, right }`, the subjects where the org took the Democratic
  (`left`) or Republican (`right`) side, counted by OpenSlate core's `leanOf`.
  The sides come from where the parties split: subjects a
  `<place>-democratic-party` / `<place>-republican-party` pair of slates
  disagree on, and Democrat-vs-Republican races in the ballot data
  (`kind: election-authority`). Positions adopted by reference count. It's
  arithmetic on the org's picks, not a judgement about the org; the app hides
  it below five sided subjects.

`openslate sign --batch` itself writes each entry's `scope` (the slate's
`context.jurisdiction`) and `jurisdictions` (races per position jurisdiction),
so the app's setup wizard can match orgs to a voter's area and count their
races there without downloading every slate. `index.json` also names the
bundle: `"bundle": { "path": "bundle.json", "bytes": <uncompressed size> }`,
which the wizard's "download all" fetches in one request (the size drives its
progress bar, since Pages serves the file gzipped).

## Published URLs

After GitHub Pages is enabled for this repo, the published site exposes:

| URL | What it is |
| --- | --- |
| `index.html` | Human-readable list of every slate with copy-import links. |
| `index.json` | Machine-readable catalog of all slates, with each org's `logo` and `lean`. |
| `bundle.json` | Every `index.json` entry with its signed slate inline (`token`): the whole catalog in one request. |
| `orgs/<slug>/<election>/signed.slate` | The signed slate token (one line). |
| `orgs/<slug>/<election>/positions.json` | The source positions (for transparency). |
| `orgs/<slug>/meta.yaml` | Per-org metadata. |
| `orgs/<slug>/logo.<ext>` | The org's logo, when `meta.yaml` has a `logo:` key. |
| `keys/project-public.json` | The project's public signing key. |
| `well-known/openslate.json` | Spec-conformant key listing (see OpenSlate SPEC §domain attestation). |
| `guides.json` | Voter guides the app can load beside these slates (see below). |

A consumer (such as the OpenSlate web app) only needs the URL of a single
`signed.slate` to import and offline-verify it.

### Browse from the OpenSlate web app

OpenSlate's web app ships with a **Catalog** tab that fetches this site's
`index.json` and offers one-click import of any listed slate. The default
catalog URL is `https://cinderblock.github.io/openslate-public-endorsements/index.json`;
end-users (or self-hosters) can override it via the in-app URL field, or at
build time via `VITE_PUBLIC_ENDORSEMENTS_CATALOG`.

### Voter guides

`guides.json` lists *voter guides*: an election authority's official material
about what's on the ballot (candidate statements and photos, a measure's
summary, analysis, arguments and full text). Guides are reference material,
not endorsements, so they live in their own repos, one per state and
election (e.g. [openslate-ballot-ca-2026-11-03](https://github.com/cinderblock/openslate-ballot-ca-2026-11-03)),
each signed with its own key; a county's guide (San Francisco's pamphlet, Los
Angeles County's statements and measures) sits in the same repo as its own
manifest. Each entry gives the guide's election, jurisdiction,
signed manifest URL and expected key, and `covers`: the jurisdictions it has
items for. A county guide covers its congressional and legislative districts
(`us/ca/cd-11`, `us/ca/ad-17`), which its own jurisdiction doesn't contain, so
list them all (each item's `subject.jurisdiction`). The web app reads this file
from beside the catalog's `index.json`, tries every guide covering a race's
jurisdiction, and shows the first one's material on the race page. To add a
guide, add an entry here.

A guide's ballot arguments are signed by named people, often an
organization's president or director. `scripts/ca-ballot-arguments.ts` turns
those signatures into the organizations' positions (Yes or No on the
proposition), counting only signers who speak for their organization;
organizations not otherwise in this catalog get bundles attributed as
`inferred`. `scripts/county-ballot-arguments.ts` does the same for the county
guides' measures. There, an organization also signs as itself (San
Francisco's "San Francisco Labor Council") or as Alameda's "s/ League of Women
Voters Bay Area, by NAME, Title"; a title marked "*" is for identification only
and doesn't count. Both scripts share one hand-reviewed table of the
organizations as printed (`scripts/lib/argument-signers.ts`), so an
organization is one source whichever guide it signs in. A new signature stops
the run until it's reviewed.

## Relationship to OpenSlate `research-bot/`

OpenSlate ships a [`research-bot/`](https://github.com/cinderblock/openslate/tree/master/research-bot)
workspace and an [`endorsement-scraper`](https://github.com/cinderblock/openslate/tree/master/.claude/skills/endorsement-scraper)
Claude skill that produce bundles in the same
`orgs/<slug>/<election>/positions.json` shape this repository expects.
The skill walks through fetching source pages, saving them under an
`evidence/` subdirectory, extracting positions, and stopping for human review
before signing. Bundles authored that way drop into this repo unchanged.

The key difference: `research-bot/` is researcher-agnostic (anyone signs with
their own identity). **This** repo standardizes on a single project key so
slates can be discovered and verified under one consistent issuer.

## Ballot sources: the field, not an opinion

Endorsements only name who someone backed, so a ballot built from them shows
one or two names per race and hides the rest of the field. An **election
authority's** bundle fixes that: the Secretary of State's certified list of
candidates and a county election office's list of qualified local candidates
and measures, as `neutral` positions (one per candidate, `Yes`/`No` per
measure) with `attribution.of.kind: "election-authority"`. The OpenSlate web
app treats such a bundle as *ballot data*: it supplies each race's whole field
in ballot order (the `statement` carries party and ballot designation) and is
never a source to follow or count.

| Bundle | Covers | Built by |
| --- | --- | --- |
| `orgs/ca-secretary-of-state/<election>/` | statewide offices, Congress, State Senate, Assembly, Board of Equalization, judicial retention, statewide propositions | `bun scripts/ca-sos-ballot.ts <election> --apply` from the certified list PDF's text and the qualified-measures page saved under `evidence/` |
| `orgs/sf-department-of-elections/<election>/` | San Francisco local offices and measures, BART | `bun scripts/sf-elections-ballot.ts <election> --apply` from the candidates and qualified-measures pages transcribed under `evidence/` |
| `orgs/la-county-registrar/<election>/` | Los Angeles County local offices (Sheriff, Superior Court, LA City, every city, school, college, water and library district) and local measures | `bun scripts/la-rrcc-ballot.ts <election> --fetch` saves LA's candidate statements API contest list and each measure's sample-ballot record (English only) under `evidence/`, paced for LA's bot wall; `--apply` builds from them. It reuses an existing subject whenever a bundle already names the same body and seat (or measure letter), and a candidate's existing spelling; it lists catalog subjects LA doesn't have. It also writes `contest-subjects.json` (LA contest ID → subject) for the LA voter guide. Candidates are in the order LA's API lists them, which may not be ballot order. |
| `orgs/oc-registrar-of-voters/<election>/` | Orange County local offices (Board of Supervisors, every city, school, college, water and special district) and local measures | `bun scripts/oc-rov-ballot.ts <election> --fetch` saves OC's contests-qualified page, its candidate filing log (only candidates marked qualified count) and its measures under `evidence/`; `--apply` builds from them. The filing log truncates names ("Rcho Santiago Coll Dist"), so each contest is matched to its full name on the qualified page. Same subject reuse as LA (`scripts/lib/ballot-subjects.ts`), and a `contest-subjects.json` for the OC guide. |
| `orgs/sd-registrar-of-voters/<election>/` | San Diego County local offices (Board of Supervisors, every city, school, college, water, fire and special district, community planning groups) and local measures | `bun scripts/sd-rov-ballot.ts <election> --fetch` saves the text of San Diego's Candidate List PDF (with positions: its columns say whether a contest is held and whether each candidate qualified) and the local measures named in the bookmarks of its pamphlets, indexed by the ballot repo's `scripts/sd-index.ts` (`--index <path>` reads a local copy), with the short titles its `scrape-sd.ts` records; `--apply` builds from them. The list abbreviates names ("GROSSMNT-CUY COM COLLEGE"), which are expanded. Same subject reuse as LA, and a `contest-subjects.json` for the SD guide. |
| `orgs/alameda-registrar-of-voters/<election>/` | Alameda County local offices (every city, school, college, transit, water, park and special district) and local measures | `bun scripts/alameda-rov-ballot.ts <election> --fetch` saves Alameda's candidate list (races on the ballot, candidates whose filing is complete) and the measure headings of its Voter Information Guide under `evidence/`; `--apply` builds from them. Same subject reuse as LA, and a `contest-subjects.json` (Alameda's race title or measure heading → subject) for the Alameda guide. |
| `orgs/santa-clara-registrar-of-voters/<election>/` | Santa Clara County local offices (every city and town, school, college, water, open space and special district) and local measures | `bun scripts/scc-rov-ballot.ts <election> --fetch` saves Santa Clara's Final Qualified List of Local Eligible Candidates (read from its PDF: each contest, whether it's on the ballot, each qualified candidate and ballot designation) and the measures its online Voter Information Guide lists (Democracy Live's OmniBallot publishes the index, `lookups.json`, with no session) under `evidence/`; `--apply` builds from them. The list abbreviates names ("Alum Rock Union SD, TA 3"), which are expanded. Same subject reuse as LA, and a `contest-subjects.json` for the Santa Clara guide. When the county's Cloudflare refuses the script (403), `--pdf <file>` takes a saved copy. |
| `orgs/san-mateo-county-elections/<election>/` | San Mateo County local offices (Board of Supervisors, every city and town, school, college, water, fire and special district) and local measures | `bun scripts/smc-elections-ballot.ts <election> --fetch` saves San Mateo's Roster of Candidates (the same report as Santa Clara's, read by `scripts/lib/qualified-list.ts`) and the list of measure documents on its current-election page under `evidence/`; `--apply` builds from them. San Mateo publishes no list of measures, so the script holds one, reviewed from the documents' titles, and stops if a measure's impartial analysis is missing or the documents have a letter the list doesn't. Same subject reuse as LA. |

Subject titles and jurisdictions must match the endorsement bundles exactly
or the field won't line up with the endorsements; the scripts use the catalog's
conventions (`Governor of California`, `US House of Representatives, California
District 11` at `us/ca/cd-11`, `San Francisco — Proposition A (…)` at
`us/ca/sf`, …). Candidate spellings follow the official list.

A county's contests are filed under `us/ca/<name>-county`, a city's under
`us/ca/<name>` (or `us/ca/city-of-<name>`), and San Francisco, one city and
county, under `us/ca/sf`. A county's bare name is a city's path when a city
shares the name (`us/ca/orange` is the City of Orange, `us/ca/san-diego` the
City of San Diego) and no one's when none does, so a county contest must never
sit there: the web app would show it to that city's voters, or to no one.
`scripts/lib/localities.ts` has the rule; `bun scripts/refile-localities.ts
--apply` moves any such contest to its county in every bundle at once (a
re-filed race is a new subject, so they have to move together).

A school district that crosses a county line (Fullerton Joint Union High,
in Orange and Los Angeles Counties) is on both counties' ballots and in both
registrars' listings, but it's one race: filed once, under its county of
record (`homeCounty` in `scripts/lib/districts.ts`: the Census district's
county, with the CDE's where they differ), with its `district` as usual. The
listing scripts, `refile-localities` and the verify check all apply that, and
the web app shows the race to a voter its lookup puts in the school district
whichever county they live in.

Every choice in an authority bundle carries a `choice_id` (OpenSlate SPEC
§3.11), `<org slug>:<election>/<race slug>/<choice slug>`, e.g.
`ca-secretary-of-state:2026-11-03/california-secretary-of-state/donald-p-don-wagner`.
An id is minted once and never changes, even when a spelling is corrected.
After building or regenerating an authority bundle, run
`bun scripts/assign-choice-ids.ts <election> --apply`: it carries ids over
from the last committed version (same race, same person) and mints the rest.

A county files its school boards, water districts and supervisorial seats under
the county, though only part of it votes on each. So each authority bundle's
contests also say who does, in `subject.district` (OpenSlate SPEC §3.3):
`us/ca/elsd-18030/ta-4` (trustee area 4 of the Census school district with LEA
code 18030), `us/ca/orange-county/sup-4`, `us/ca/anaheim/council-3`,
`us/ca/irvine-ranch-water-district/div-5`. The web app shows a race to the
voters it can place in that district (it finds school districts from an
address), and lists the rest as *Might be on your ballot*. After building an
authority bundle, run `bun scripts/assign-districts.ts <election> --apply`; the
rules are in `scripts/lib/districts.ts`. School boards are matched to the
Census Bureau's districts in `scripts/data/ca-school-districts.json`
(`bun scripts/fetch-school-districts.ts` rebuilds it from TIGERweb), and
college boards to the Chancellor's Office district codes in
`scripts/data/ca-community-college-districts.json` (`us/ca/ccd-830/ta-1`;
`bun scripts/fetch-college-districts.ts`, from the CCC GIS Collaborative's
boundaries, the ones the app looks up).

CI enforces all of it. In any election and jurisdiction an authority bundle
covers, `scripts/verify-positions.ts` fails a position whose race isn't on the
authority's list, or whose `choice` isn't one of that race's ballot names,
spelled exactly as the ballot spells it and carrying its `choice_id`, and an
authority bundle whose `district`s aren't the ones `assign-districts` gives,
and any bundle with a county contest under a county's bare name. A
candidate who isn't printed on the ballot needs `"write_in": true` (§3.12);
one the authority doesn't list as a certified write-in passes with a warning.
The web app matches endorsements to the ballot by `choice_id` (and, for
slates without one, by name, the same rules as below), so "Don Wagner" next
to the ballot's "Donald P. (Don) Wagner" is one candidate, and anything it
can't place is shown as *Not on the ballot*. Races in jurisdictions no
authority covers yet aren't checked; the verify output counts them.

To fix a failure, run `bun scripts/normalize-choices.ts <election>`. For a
choice that is the same person as a ballot name (a nickname in the ballot's
parentheses or quotes, a middle initial, accents, common short forms like
Danny / Daniel), `--apply` writes the ballot spelling and its `choice_id`. A
choice that only *resembles* a ballot name (a typo, an unusual short form like
"Mano" for "Manohar"), or a listed candidate under the wrong race (Area 2 for
Area 7, a council seat without its district), is listed as a suggestion: check
each against its source and the race's other names, then rerun with
`--apply --suggested`. The org's own wording stays in `statement`. On races no
authority covers, the script groups variant spellings of the same person
across orgs and uses the most common one. Both scripts edit only files git
tracks: an untracked bundle is someone's work in progress.

## Contributing a new endorsement

1. Pick or create an org slug (kebab-case): `orgs/<slug>/`.
2. Write `orgs/<slug>/meta.yaml` with the org's display name, URL, and kind.
3. Pick the election the endorsements are for and use its date as the folder
   name: `orgs/<slug>/<YYYY-MM-DD>/` (e.g. `2026-11-03`). One folder per
   election the org has weighed in on.
4. Write `orgs/<slug>/<YYYY-MM-DD>/positions.json`. Saving source pages under
   `orgs/<slug>/<YYYY-MM-DD>/evidence/*.md` is recommended (mirrors the
   research-bot convention).

   Each Position's `subject` MUST identify a specific ballot entry. Prefer
   `subject.id` in the `vip:contest-XXX` form when a VIP/Google Civic contest
   ID is known, and always set `choice` to the candidate name (for races) or
   `"Yes"` / `"No"` (for measures). The file is the shape that
   `openslate sign` accepts — an object with `positions`, `attribution`, and
   optionally `context` / `endorsed_by`:

   ```json
   {
     "context": {
       "title": "Example Org — 2026 general election endorsements",
       "jurisdiction": "us/ca/sf",
       "election": "2026-11-03"
     },
     "attribution": {
       "of": {
         "name": "Example Organization",
         "uri": "https://example.org/",
         "kind": "organization"
       },
       "mode": "scraped",
       "retrieved_at": "2026-09-15T00:00:00Z",
       "sources": ["https://example.org/endorsements/2026-general"]
     },
     "positions": [
       {
         "subject": {
           "title": "State Senate District 4",
           "id": "vip:contest-12345",
           "kind": "race",
           "jurisdiction": "us/ca",
           "election": "2026-11-03"
         },
         "stance": "endorse",
         "choice": "Alice Example",
         "statement": "Quoted reasoning from the source page.",
         "source": "https://example.org/endorsements/2026-general#sd-4"
       },
       {
         "subject": {
           "title": "Proposition 12 — Parks Bond",
           "id": "vip:measure-77",
           "kind": "measure",
           "jurisdiction": "us/ca",
           "election": "2026-11-03"
         },
         "stance": "endorse",
         "choice": "Yes",
         "statement": "Quoted reasoning from the source page.",
         "source": "https://example.org/endorsements/2026-general#prop-12"
       }
     ]
   }
   ```

5. Open a pull request. CI schema-validates every `positions.json`.
6. On merge to the default branch, CI signs all slates with the project
   key and re-publishes the Pages site.

## Attribution requirements

- `attribution.mode`:
  - `scraped` — automated extraction from a public source.
  - `transcribed` — manually recorded from speech, video, or written
    material.
  - `inferred` — researcher's interpretation of the entity's general
    positions; the most subjective option, and the one to flag clearly.
- `attribution.sources` — at least one URL per position should be cited.
- `attribution.retrieved_at` — the date the source was observed (RFC 3339
  with timezone).
- Every `position.statement` should be a faithful paraphrase or a direct
  quote, not a researcher opinion.

When an organization publishes their own firsthand slate, the slate here
should be marked superseded (or removed) — a firsthand slate signed by the
entity's own key always beats a secondhand attribution.

## Republished picks: adopt, don't copy

Organizations often republish another organization's list: a county party
reposting the state party's statewide picks, a state affiliate reposting its
national union's House picks, a joint statement. Don't copy those positions
into a second bundle. Adopt them by reference instead ([SPEC §3.10](https://github.com/cinderblock/openslate/blob/master/SPEC.md)):
the bundle gets an `adopts` entry pointing at the other bundle's published
`signed.slate`, listing exactly the subjects the source page republished.

```sh
bun scripts/adopt.ts <adopting-slug> <adopted-slug> 2026-11-03 \
  --source <the republishing page> \
  --pick "Governor of California=Xavier Becerra" \
  --pick "California — Proposition 1 (Authorizes Bonds for Housing Affordability Programs)=Yes" \
  --apply
```

Each `--pick` is a subject title and the choice the republishing page printed
(`--picks file.txt` takes one per line). The script refuses picks that don't
match the adopted bundle, so a bundle can't adopt more, or different, picks
than its source shows. Without `--apply` it prints the adoption.

If the other organization has no bundle yet, list the picks in the adopting
bundle's `evidence/NOTES.md` under `## Republished from <org>` until it does.

## Local development

You don't need to sign locally to contribute — CI handles signing. But to
schema-check your edits before opening a PR:

```sh
# Clone OpenSlate as a sibling, at the pinned ref
git clone https://github.com/cinderblock/openslate.git ../openslate
git -C ../openslate checkout "$(cat .openslate-version)"
( cd ../openslate && bun install --frozen-lockfile )

# Run the verify script (schema, then the ballot check)
bun scripts/verify-positions.ts

# Give an authority bundle's choices their ids (dry run; add --apply)
bun scripts/assign-choice-ids.ts <election>

# Snap candidate spellings and ids to the ballot (dry run; add --apply)
bun scripts/normalize-choices.ts <election>

# Say who votes on each authority bundle's contests (dry run; add --apply)
bun scripts/assign-districts.ts <election>

# Move county contests filed under a county's bare name to the county (dry run; add --apply)
bun scripts/refile-localities.ts

# Unit tests for the ballot check and the text edits
# (the name matcher's are in OpenSlate core)
bun run test
```

To sign a single bundle locally with a throwaway key (for end-to-end
testing only — do NOT commit signed slates):

```sh
bun ../openslate/packages/cli/src/index.ts keygen -o /tmp/dev.json
bun ../openslate/packages/cli/src/index.ts sign orgs/<slug>/<election>/positions.json --key /tmp/dev.json
```

## License

[MIT](./LICENSE).
