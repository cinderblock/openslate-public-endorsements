# Add your organization's own signed slate

This catalog mostly holds **reports**: a volunteer researcher reads an
organization's published endorsements and signs a record of them with this
project's key. If you speak for an organization, you can sign your
endorsements yourself, with your organization's own key, and send that slate
here. Once it's in:

- the catalog lists it as **signed by your organization**,
- the OpenSlate app shows voters your own picks, marked "signed by them",
- and the researcher's report of your organization for that election is
  marked superseded: wherever your slate covers a race, your words replace
  it. Voters who already followed the report keep following you.

It takes about fifteen minutes the first time, and a few minutes for each
update after that.

## What you need

1. **Your organization's OpenSlate identity.** In the
   [OpenSlate app](https://openslate.us), go to Publish → Compose and create
   an identity of kind *Organization*, named as your organization is known.
   Download the backup file when it offers, and keep it somewhere safe: it
   holds your secret key, so never send it to anyone, including us.
2. **Your public key**, the line starting `ed25519:` shown for that identity.
   This one is safe to share: it only lets people check your signature.
3. **A free [GitHub](https://github.com/signup) account.** No GitHub? See
   [the end of this page](#no-github-account).

## Step 1: show us the key is yours

Anyone can make a key and give it your organization's name, so before we list
a slate as yours we check that your organization vouches for the key. Do one
of these and note which in Step 3:

- **Put the public key on your website**, on your endorsements or about page:
  "Our OpenSlate key: `ed25519:…`". This is the easiest.
- **Or publish `https://<your domain>/.well-known/openslate.json`** listing
  the key ([format](https://github.com/cinderblock/openslate/blob/master/SPEC.md#7-trust--real-world-identity-informative)).
  The check on your submission looks for this file by itself.
- **Or post it** from your organization's official social media account.

We only need this once per key.

## Step 2: sign your slate

In the app, build your slate in Compose: copy the researcher's report of your
organization (From another slate → Copy) and correct it, or enter your picks
on My ballot. Then **Sign** it as your organization and **Copy** the signed
slate. It's one long line of text.

## Step 3: send it in

1. Find your organization's folder name in
   [`orgs/`](https://github.com/cinderblock/openslate-public-endorsements/tree/master/orgs)
   (for example `dsa-silicon-valley`). If you aren't there yet, pick a short
   lowercase name with dashes.
2. Open
   [a new file in this repository](https://github.com/cinderblock/openslate-public-endorsements/new/master?filename=orgs/YOUR-FOLDER/ELECTION-DATE/firsthand.slate).
   GitHub asks to make your own copy ("fork") first: say yes.
3. Set the file name to `orgs/<your folder>/<election date>/firsthand.slate`,
   for example `orgs/dsa-silicon-valley/2026-11-03/firsthand.slate`. The
   election date is election day, written `YYYY-MM-DD`.
4. Paste the signed slate as the file's only contents.
5. Click **Commit changes…**, then **Propose changes**, then **Create pull
   request**. In the description, say where we can see your key (Step 1),
   and, if your organization is new here, its full name and website.

The checks on your pull request will show a red ✗ until we add your key to
your organization's `meta.yaml`; that's expected. We'll do that once we've
seen the key on your site, then merge. Your slate is on
[catalog.openslate.us](https://catalog.openslate.us/) a few minutes later.

## Updating it

Sign the new version the same way, open your `firsthand.slate` on GitHub,
click the pencil (✏️) to edit it, replace its contents and propose the
change. With your key already listed, the checks pass on their own.

## No GitHub account?

Use **Send feedback** at the bottom of any page in the OpenSlate app, under
*Send it privately*: say which organization and election, and leave an email
address. We'll arrange
another way to receive the file. Don't paste your backup file anywhere.

## For maintainers

Before merging a pull request that adds or changes a `firsthand.slate`:

1. Read the job summary of the pull request's `verify` run: who signed, with
   which key, whether `meta.yaml` lists it, whether the organization's
   `/.well-known/openslate.json` lists it, and any picks the ballot doesn't
   have (pass those back to the organization; they don't block).
2. For a new key, confirm it out of band (the organization's own site,
   official account, or a reply from an address on its domain), then add it
   to `orgs/<slug>/meta.yaml`, saying how you confirmed it:

   ```yaml
   keys:
     - key: ed25519:…
       added: 2026-11-14
       confirmed: Listed on https://example.org/endorsements (seen 2026-11-14)
   ```

   An organization new to the catalog also needs the rest of `meta.yaml`
   (`name`, `slug`, `uri`, `kind`).
3. Merge. `publish.yml` lists the slate (`scripts/firsthand.ts --index`) and
   marks the report of that organization and election superseded. The
   report's own files stay published at their paths.

To retire a key (lost, or an officer left), remove it from `meta.yaml`; a
`firsthand.slate` signed with it then fails the checks until it's replaced
or removed.
