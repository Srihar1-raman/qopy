# qopy website

Vite + React landing page for the Mac app. Use this same repository for Cloudflare; no application rewrite or separate repo is needed.

## Local development

Use Node.js 24 (see `.node-version`) and npm. `package-lock.json` is the single dependency lockfile.

```sh
npm ci
npm run dev
npm run check:cloudflare
npm run preview:cloudflare
```

- `check:cloudflare` runs TypeScript, builds `dist/`, and validates a Wrangler dry run. It does not upload or deploy.
- `preview:cloudflare` builds and serves the production files locally at `http://127.0.0.1:8787` using Cloudflare's runtime. No Cloudflare login is needed.
- The site has no API, database, runtime secrets, or server-side code. Do not copy old template API keys into hosting settings.

## Hosting choice

Use **Cloudflare Workers Static Assets**. Cloudflare recommends Workers for new projects; its [Vercel migration guide](https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/) supports serving an existing build directory directly. Pages would also serve this static site, but adds no needed capability here. See [Pages migration guidance](https://developers.cloudflare.com/pages/migrations/).

`wrangler.jsonc` serves `dist/` without a Worker entrypoint, bindings, or Cloudflare Vite plugin. All navigation is `/` plus hash anchors; legal content uses dialogs. Unknown paths return 404. If real client-side routes are added later, review the fallback setting.

The Mac buttons still use [GitHub Releases](https://github.com/Srihar1-raman/qopy-releases/releases/latest/download/qopy.dmg). Moving the website does not move or change the app release. The existing `public/qopy.dmg` remains in the repository, but the buttons do not use it.

Vercel's analytics package, injected script, and download-click tracking have been removed. No replacement analytics is included. App policy text is otherwise unchanged.

## Deploy later through GitHub

**Local preparation only:** these instructions do not mean a Cloudflare project or domain has been configured. Do not push until deployment is approved. Vercel currently auto-deploys `main`; a future push may also update Vercel while it remains connected.

1. When approved, push this commit to `Srihar1-raman/qopy` on `main`.
2. In Cloudflare's **Workers & Pages**, create an application and connect the existing GitHub repository. Grant access only to this repo. Use the intended Cloudflare account. Git integration and the persistent deployment token it creates require the owner's authorization; never put tokens in this repo.
3. Set these [Workers Builds settings](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/):
   - Worker name: `qopy` (must match `wrangler.jsonc`; if already taken in this account, change both)
   - Production branch: `main`
   - Root directory: repository root
   - Build command: `npm run lint && npm run build`
   - Deploy command: `npx wrangler deploy`
   - Build output: `dist`, already specified by `assets.directory`
   - Keep preview-branch builds disabled for the initial migration
   - No application secrets or account IDs are needed in source
4. Let Cloudflare install npm dependencies from the lockfile. The [build image](https://developers.cloudflare.com/workers/ci-cd/builds/build-image/) reads `.node-version`. If dependency installation is overridden, use `npm ci` and include dev dependencies (Wrangler/Vite are build tools).
5. Wait for a successful deployment, then open the exact `workers.dev` URL shown by Cloudflare. Check desktop/mobile layout, animated demo and pause, reduced motion, both Mac buttons, GitHub, legal dialogs, favicon, and social image before touching DNS.

## Move qopy.site after the preview passes

This is a separate live change. First confirm the domain's current DNS host, registrar, records, DNSSEC status, and Cloudflare account; none are assumed by this config.

1. Export the existing DNS records and record Vercel's working domain settings for rollback. Keep Vercel running during the migration.
2. A [Workers Custom Domain](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/) requires an active Cloudflare zone in the same account. If DNS is elsewhere, add `qopy.site` to Cloudflare, preserve all existing records (especially mail), and follow the approved nameserver/DNSSEC migration. Keep the website pointing at Vercel while the zone becomes active. The registrar does not need to change.
3. In the Worker, choose **Settings → Domains & Routes → Add → Custom Domain** and enter `qopy.site`. Review existing conflicting records before replacing anything. Cloudflare manages the domain's DNS record and certificate. Handle `www` separately only if it is currently used; do not silently drop it.
4. Review **Web Analytics / Manage RUM Settings** and disable automatic JavaScript injection if enabled. Cloudflare can [enable Web Analytics by default](https://blog.cloudflare.com/the-rum-diaries-enabling-web-analytics-by-default/) even though the repository has no analytics. Keep the website disclosure aligned with the actual deployed behavior. Provider-level security/request processing is separate.
5. Verify HTTPS and the new site on `https://qopy.site/`, including its images, animation, dialogs, links, and browser network requests. Confirm no Vercel or Cloudflare analytics beacon is injected. Check email and any other DNS-backed services too.
6. Only after stable live verification, disconnect Vercel's Git auto-deploy. Retain the Vercel project temporarily for rollback; deleting it is optional and separate.

**Rollback:** remove the Worker Custom Domain association, restore the saved Vercel DNS records, and verify Vercel still has the domain and a valid certificate. If nameservers were migrated, keeping Cloudflare DNS and restoring just the website records is usually less disruptive than reversing the entire DNS migration. Do not delete the Vercel project before the rollback window ends.
