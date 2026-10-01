# qopy website

Vite + React landing page for the Mac app. Use this same repository for Cloudflare; no application rewrite or separate repo is needed.

## Live deployment

- Production: https://qopy.combif1am.site/
- Worker preview: https://qopy.srihari22work.workers.dev/
- Worker: `qopy`, serving the local Vite build with Wrangler
- `combif1am.site` belongs to the separate `folio-combif1am` Worker; do not change it
- `qopy.site` remains on Vercel, unchanged
- Cloudflare GitHub auto-deploy is not configured; the migration commits have not been pushed

## Local development

Use Node.js 24 (see `.node-version`) and npm. `package-lock.json` is the single dependency lockfile.

```sh
npm ci
npm run dev
npm run check:cloudflare
npm run preview:cloudflare
```

- `check:cloudflare` runs TypeScript, the video-serving tests, builds `dist/`, and validates a Wrangler dry run. It does not upload or deploy.
- `preview:cloudflare` builds and serves the production files locally at `http://127.0.0.1:8787` using Cloudflare's runtime. No Cloudflare login is needed.
- The site has no API, database, or runtime secrets. A small Worker serves byte ranges for the social-preview video. Do not copy old template API keys into hosting settings.

## Hosting choice

Use **Cloudflare Workers Static Assets**. Cloudflare recommends Workers for new projects; its [Vercel migration guide](https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/) supports serving an existing build directory directly. Pages would also serve this static site, but adds no needed capability here. See [Pages migration guidance](https://developers.cloudflare.com/pages/migrations/).

`wrangler.jsonc` serves `dist/`. Only the versioned social MP4 paths use `worker/index.ts` and the `ASSETS` binding, via [selective Worker-first routing](https://developers.cloudflare.com/workers/static-assets/routing/worker-script/). All other assets retain static serving. All navigation is `/` plus hash anchors; legal content uses dialogs. Unknown paths return 404. If real client-side routes are added later, review the fallback setting.

The Mac buttons still use [GitHub Releases](https://github.com/Srihar1-raman/qopy-releases/releases/latest/download/qopy.dmg). Moving the website does not move or change the app release. The existing `public/qopy.dmg` remains in the repository, but the buttons do not use it.

Vercel's analytics package, injected script, and download-click tracking have been removed. The existing Cloudflare zone injects Cloudflare Web Analytics at the edge; the website disclosure reflects that verified behavior. There is no analytics package in the source. App policy text is otherwise unchanged.

## Deploy later through GitHub

**Optional future setup:** the site is currently deployed directly with Wrangler. Do not push without approval. Vercel still auto-deploys `main`; a future push may also update Vercel while it remains connected.

1. When approved, push this commit to `Srihar1-raman/qopy` on `main`.
2. In Cloudflare's **Workers & Pages**, open the existing `qopy` Worker and connect the existing GitHub repository in its Build settings. Grant access only to this repo. Use the intended Cloudflare account. Git integration and the persistent deployment token it creates require the owner's authorization; never put tokens in this repo.
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

## Deploy directly and preserve the portfolio

With an authorized Cloudflare login in the intended account:

```sh
npm run check:cloudflare
npx wrangler deploy
```

This uploads the local build without a GitHub push. The configuration attaches only `qopy.combif1am.site` as a [Workers Custom Domain](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/). Cloudflare manages that subdomain's DNS record and certificate. No registrar or nameserver change is needed because `combif1am.site` is already an active Cloudflare zone.

After each deployment, verify HTTPS, assets, the demo/pause control, legal dialogs and Mac links on the exact production hostname. Check that the root portfolio still serves normally and remains attached to `folio-combif1am`. Do not change root-zone records, zone-wide analytics, the folio Worker, or `qopy.site` as part of a qopy update.

Cloudflare may [inject Web Analytics at the edge](https://blog.cloudflare.com/the-rum-diaries-enabling-web-analytics-by-default/), independently of source code. Check rendered scripts when changing analytics disclosures. A future analytics exclusion must be scoped to this hostname so the portfolio's settings are preserved.

**Rollback:** use the `qopy` Worker's deployment history to restore its previous version. To remove the new hostname, remove only its Custom Domain association and its matching Wrangler route. The root portfolio and original Vercel website are separate and should remain untouched.

## Search, agents, and link previews

`npm run build` builds Vite, prerenders the real React page into HTML, then runs `scripts/verify-seo.mjs`. The browser hydrates that markup. Product text and links therefore exist without JavaScript; keep the build step intact when changing hosting.

- `/robots.txt` permits crawling and advertises `/sitemap.xml`. The sitemap contains only the canonical homepage. Section anchors and Privacy/Terms dialogs are not separate pages. Do not invent `lastmod` dates or sitemap routes.
- `/llms.txt` is a small optional agent index linked to `/index.md`, a maintained Markdown counterpart. The Markdown page is marked `noindex` to avoid a duplicate search result. These follow the [llms.txt proposal](https://llmstxt.org/); they do not guarantee indexing, AI citations, or rankings. [Google's AI guidance](https://developers.google.com/search/docs/appearance/ai-features) requires no special AI text file.
- JSON-LD describes the website, page, and Mac utility using existing visible facts. No invented offer, price, review, or rating is supplied, so don't claim [Google software-app rich-result eligibility](https://developers.google.com/search/docs/appearance/structured-data/software-app).
- `/social/qopy-share-v2.png` is the static 1200×630 card. Its composition source is `design/share-preview.html` and `design/share-preview-frame.svg`; it matches the video’s first frame. Metadata includes absolute HTTPS URLs, dimensions, media type, and alt text. This aligns with [Open Graph](https://ogp.me/) and [LinkedIn's sharing guidance](https://www.linkedin.com/help/linkedin/answer/a521928/making-your-website-shareable-on-linkedin?lang=en).
- `/social/qopy-share-v2.mp4` is the 1200×630, 12-second simulated walkthrough (H.264, no audio). Its left-hand logo and headline stay fixed while the demo moves on the right; the website hero is unchanged. `og:video` offers it as a progressive enhancement: [Apple Messages documents direct MP4 previews](https://developer.apple.com/documentation/technotes/tn3156-create-rich-previews-for-messages/), but playback depends on the client and settings. X remains a `summary_large_image` card. Do not promise GIF/SVG animation or video playback across all platforms; no X Player Card or native app recording is implied.

Keep versioned media filenames immutable. Publish a new filename when changing a card/video and update the metadata; social platforms can cache old previews. Re-fetch with the platform's official inspector where available. Platform account-based previews and search indexing are not validated merely by a successful deployment.

After deployment, check raw HTML and live crawler files, image/video MIME types and HTTP responses. Cloudflare's zone-level bot controls can override origin crawl rules; a robots allowance is not a firewall bypass. Maintain the explicit legal revision date when policy wording actually changes.

### MP4 byte ranges

The deployed static MP4 endpoint originally ignored `Range` requests. The bounded Worker now returns actual partial bytes with `206`, `Content-Range`, and `Content-Length`; normal GET/HEAD retain `200`, unsatisfiable ranges return `416`, and conditional validators are preserved. [Apple's iOS media guidance](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/CreatingVideoforSafarioniPhone/CreatingVideoforSafarioniPhone.html) requires byte-range support for media hosting. This corrects a hosting requirement, but does not prove an iMessage client will choose or autoplay the video.

The handler buffers only these small versioned previews (the build caps the current media below 1 MB). Do not use it for large media files. `npm run test:worker` covers full, initial, offset, suffix, open-ended, malformed and unsatisfiable ranges, HEAD, validators and unrelated paths. After deploying, verify `Range: bytes=0-99` returns exactly 100 bytes and `Content-Range: bytes 0-99/<file size>` on the current public video endpoint. Check both current and retained v1 routes after changing the allowlist.

The preview video and unmatched paths invoke the Worker; existing pages and other assets keep [free static-asset serving](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/). No storage bucket, paid upgrade, new credential, or zone-wide cache setting is required. Do not enable Worker-wide caching merely for this fix: it would change the billing behavior of otherwise-static requests.
