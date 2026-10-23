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
│       ├── meta.yaml                  # display name, uri, kind, logo, logo_source
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
downloaded from. `bun scripts/fetch-logos.ts` fetches them (skipping orgs that
already have one; `--only <slug> [--url <homepage>]`, `--force`), and
`--reject <slug> --reason "..."` drops a bad pick. It also writes a review
contact sheet to `review/logos.html` (gitignored). Orgs without a logo get a
monogram in the app.

`scripts/build-site.ts` adds two fields to each `index.json` / `bundle.json`
entry (`scripts/catalog-extras.ts`):

- `logo`: the logo's site path, from `meta.yaml`.
- `lean`: `{ left, right }`, the subjects where the org took the Democratic
  (`left`) or Republican (`right`) side, counted by OpenSlate core's `leanOf`.
  The sides come from where the parties split: subjects a
  `<place>-democratic-party` / `<place>-republican-party` pair of slates
  disagree on, and Democrat-vs-Republican races in the ballot data
  (`kind: election-authority`). Positions adopted by reference count. It's
  arithmetic on the org's picks, not a judgement about the org; the app hides
  it below five sided subjects.

## Published URLs

After GitHub Pages is enabled for this repo, the published site exposes:

| URL | What it is |
| --- | --- |
| `index.html` | Human-readable list of every slate with copy-import links. |
| `index.json` | Machine-readable catalog of all slates, with each org's `logo` and `lean`. |
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
each signed with its own key; a county's guide (its pamphlet) sits in the same
repo as its own manifest. Each entry gives the guide's election, jurisdiction,
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
`inferred`.

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

Subject titles and jurisdictions must match the endorsement bundles exactly
or the field won't line up with the endorsements; the scripts use the catalog's
conventions (`Governor of California`, `US House of Representatives, California
District 11` at `us/ca/cd-11`, `San Francisco — Proposition A (…)` at
`us/ca/sf`, …). Candidate spellings follow the official list:
`scripts/normalize-choices.ts` treats an election authority's spelling as
canonical and rewrites the endorsement bundles to it.

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

# Run the verify script
bun scripts/verify-positions.ts
```

To sign a single bundle locally with a throwaway key (for end-to-end
testing only — do NOT commit signed slates):

```sh
bun ../openslate/packages/cli/src/index.ts keygen -o /tmp/dev.json
bun ../openslate/packages/cli/src/index.ts sign orgs/<slug>/<election>/positions.json --key /tmp/dev.json
```

## License

[MIT](./LICENSE).
