import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';

const origin = 'https://qopy.combif1am.site';
const download = 'https://github.com/Srihar1-raman/qopy-releases/releases/latest/download/qopy.dmg';
const html = await readFile('dist/index.html', 'utf8');
const meta = new Map([...html.matchAll(/<meta\s+(?:name|property)="([^"]+)"\s+content="([^"]*)"\s*\/?\s*>/g)].map(m => [m[1], m[2]]));

assert(html.includes(`<link rel="canonical" href="${origin}/"`));
assert.equal(meta.get('og:url'), `${origin}/`);
assert.equal(meta.get('twitter:card'), 'summary_large_image');
assert.equal(meta.get('og:image'), `${origin}/social/qopy-share-v1.png`);
assert.equal(meta.get('twitter:image'), meta.get('og:image'));
assert.equal(meta.get('og:image:type'), 'image/png');
assert.equal(meta.get('og:image:width'), '1200');
assert.equal(meta.get('og:image:height'), '630');
assert(meta.get('og:image:alt'));
assert(meta.get('twitter:image:alt'));
assert(!/noindex/.test(meta.get('robots') || ''));
assert(!html.includes('<div id="root"></div>'), 'Homepage must be prerendered');
assert(html.includes('id="hero-title"') && html.includes('Select text in images or videos'));
assert.equal(html.split(`href="${download}"`).length - 1, 2);

const data = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] || 'null');
assert.equal(data['@context'], 'https://schema.org');
const app = data['@graph'].find(n => n['@type'] === 'SoftwareApplication');
assert.equal(app.name, 'qopy');
assert.equal(app.downloadUrl, download);
assert.equal(app.operatingSystem, 'macOS 14 or later');
assert(!('aggregateRating' in app) && !('offers' in app) && !('review' in app), 'Do not invent ratings or pricing');

const robots = await readFile('dist/robots.txt', 'utf8');
assert(robots.includes('User-agent: *') && robots.includes('Allow: /'));
assert(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
assert(sitemap.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'));
assert.deepEqual([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]), [`${origin}/`]);
for (const path of ['llms.txt', 'index.md']) assert((await readFile(`dist/${path}`, 'utf8')).includes(origin));

const image = await readFile('dist/social/qopy-share-v1.png');
assert.equal(image.subarray(1, 4).toString(), 'PNG');
assert.equal(image.readUInt32BE(16), 1200);
assert.equal(image.readUInt32BE(20), 630);
assert(image.length < 1_000_000, 'Keep the shared card below 1 MB');
assert((await stat('dist/social/qopy-demo-v1.mp4')).size < 1_000_000);
assert.equal(meta.get('og:video'), `${origin}/social/qopy-demo-v1.mp4`);
assert.equal(meta.get('og:video:secure_url'), meta.get('og:video'));
assert.equal(meta.get('og:video:type'), 'video/mp4');
assert.equal(meta.get('og:video:width'), '1038');
assert.equal(meta.get('og:video:height'), '776');
console.log('SEO checks passed: prerendered content, metadata, JSON-LD, sitemap, crawler files and share assets.');
