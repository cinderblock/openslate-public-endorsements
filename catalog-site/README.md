# catalog-site

This branch is generated. Don't edit it.

Each publish run on `master` (`.github/workflows/publish.yml`) signs every
slate, builds the static site, deploys it to GitHub Pages, and then commits the
same files here under `site/`, with `wrangler.jsonc` and `site/_headers` copied
from master's `catalog-site/` folder. Cloudflare Workers Builds deploys this
branch to https://catalog.openslate.us.

Signing happens in GitHub Actions because the project key is a GitHub secret.
Building the branch there keeps any Cloudflare credential out of GitHub.
