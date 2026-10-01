import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import worker from './index.ts';

const previewPaths = ['/social/qopy-demo-v1.mp4', '/social/qopy-share-v2.mp4'];
const modified = 'Thu, 01 Oct 2026 00:00:00 GMT';

for (const path of previewPaths) test(`${path} serves the actual versioned asset`, async (t) => {
  // Read inside each suite so either version can be tested independently. A full
  // test run still fails if a supported asset is missing, empty, or oversized.
  const file = await readFile(new URL(`../public${path}`, import.meta.url));
  assert.ok(file.length > 100, 'preview must contain enough bytes for the range cases');
  assert.ok(file.length < 1_000_000, 'buffered preview must stay below 1 MB');
  const url = `https://qopy.example${path}`;
  const etag = `"${path.slice(path.lastIndexOf('/') + 1)}"`;
  const requests: Request[] = [];
  const env = { ASSETS: { async fetch(request: Request) {
    requests.push(request);
    if (new URL(request.url).pathname !== path) return new Response('Not found', { status: 404 });
    if (!['GET', 'HEAD'].includes(request.method)) return new Response(null, { status: 405 });
    if (request.headers.get('if-none-match') === etag) return new Response(null, { status: 304, headers: { etag } });
    if (request.headers.has('if-match') && request.headers.get('if-match') !== etag) {
      return new Response(null, { status: 412, headers: { etag } });
    }
    return new Response(request.method === 'HEAD' ? null : file, {
      headers: { 'content-type': 'video/mp4', 'content-length': String(file.length), etag, 'last-modified': modified },
    });
  } } };
  const get = (range?: string, extra: HeadersInit = {}, method = 'GET') => {
    const headers = new Headers(extra);
    if (range !== undefined) headers.set('Range', range);
    return worker.fetch(new Request(url, { method, headers }), env);
  };
  const assertFullHeaders = (response: Response) => {
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('accept-ranges'), 'bytes');
    assert.equal(response.headers.get('content-type'), 'video/mp4');
    assert.equal(response.headers.get('content-length'), String(file.length));
    assert.equal(response.headers.get('content-range'), null);
    assert.equal(response.headers.get('etag'), etag);
    assert.equal(response.headers.get('last-modified'), modified);
    assert.equal(response.headers.get('cache-control'), 'public, max-age=31536000, immutable');
  };

  await t.test('full GET preserves file, type, validators, length and immutable cache', async () => {
    const response = await get();
    assertFullHeaders(response);
    assert.deepEqual(Buffer.from(await response.arrayBuffer()), file);
    assert.equal(requests.at(-1)!.headers.get('accept-encoding'), 'identity');
  });

  for (const [range, start, end] of [
    ['bytes=0-1', 0, 1], ['bytes=0-99', 0, 99], ['bytes=100-199', 100, Math.min(199, file.length - 1)],
    [`bytes=${file.length - 100}-`, file.length - 100, file.length - 1],
    [`bytes=${file.length - 1}-`, file.length - 1, file.length - 1],
    ['bytes=-100', file.length - 100, file.length - 1],
    ['bytes=0-9999999999999999999999', 0, file.length - 1],
    ['bytes=-9999999999999999999999', 0, file.length - 1],
  ] as const) await t.test(`correct bytes and headers for ${range}`, async () => {
    const response = await get(range);
    assert.equal(response.status, 206);
    assert.equal(response.headers.get('accept-ranges'), 'bytes');
    assert.equal(response.headers.get('content-type'), 'video/mp4');
    assert.equal(response.headers.get('content-range'), `bytes ${start}-${end}/${file.length}`);
    assert.equal(response.headers.get('content-length'), String(end - start + 1));
    assert.equal(response.headers.get('etag'), etag);
    assert.equal(response.headers.get('last-modified'), modified);
    assert.equal(response.headers.get('cache-control'), 'public, max-age=31536000, immutable');
    assert.deepEqual(Buffer.from(await response.arrayBuffer()), file.subarray(start, end + 1));
    assert.equal(requests.at(-1)!.headers.get('range'), null);
    assert.equal(requests.at(-1)!.headers.get('accept-encoding'), 'identity');
  });

  for (const range of [`bytes=${file.length}-`, 'bytes=-0', 'bytes=9999999999999999999999-']) {
    await t.test(`unsatisfiable range returns 416: ${range}`, async () => {
      const response = await get(range);
      assert.equal(response.status, 416);
      assert.equal(response.headers.get('content-range'), `bytes */${file.length}`);
      assert.equal(response.headers.get('content-length'), '0');
      assert.equal(response.headers.get('cache-control'), 'no-store');
      assert.equal((await response.arrayBuffer()).byteLength, 0);
    });
  }

  for (const range of ['bytes=3-2', 'bytes=-', 'bytes=0-1,3-4', 'items=0-1', 'bytes=nope']) {
    await t.test(`unsupported/malformed range is ignored: ${range}`, async () => {
      const response = await get(range);
      assertFullHeaders(response);
      assert.deepEqual(Buffer.from(await response.arrayBuffer()), file);
    });
  }

  for (const range of [undefined, 'bytes=0-1', `bytes=${file.length}-`]) {
    await t.test(`HEAD returns full headers without a body for Range: ${range ?? '(none)'}`, async () => {
      const response = await get(range, {}, 'HEAD');
      assertFullHeaders(response);
      assert.equal((await response.arrayBuffer()).byteLength, 0);
      assert.equal(requests.at(-1)!.method, 'HEAD');
      assert.equal(requests.at(-1)!.headers.get('range'), null);
    });
  }

  await t.test('If-Range accepts matching strong validators only', async () => {
    for (const validator of [etag, modified]) {
      const response = await get('bytes=0-1', { 'If-Range': validator });
      assert.equal(response.status, 206);
      assert.equal(response.headers.get('content-range'), `bytes 0-1/${file.length}`);
      assert.deepEqual(Buffer.from(await response.arrayBuffer()), file.subarray(0, 2));
      assert.equal(requests.at(-1)!.headers.get('if-range'), null);
    }
    for (const validator of ['"stale"', `W/${etag}`, 'Wed, 30 Sep 2026 00:00:00 GMT', 'invalid']) {
      const response = await get('bytes=0-1', { 'If-Range': validator });
      assertFullHeaders(response);
      assert.deepEqual(Buffer.from(await response.arrayBuffer()), file);
    }
  });

  await t.test('conditional 304 and 412 take precedence over Range', async () => {
    for (const [name, value, status] of [['If-None-Match', etag, 304], ['If-Match', '"stale"', 412]] as const) {
      const response = await get('bytes=0-1', { [name]: value });
      assert.equal(response.status, status);
      assert.equal(response.headers.get('etag'), etag);
      assert.equal(response.headers.get('content-range'), null);
      assert.equal((await response.arrayBuffer()).byteLength, 0);
      assert.equal(requests.at(-1)!.headers.get(name), value);
    }
  });

  await t.test('query strings retain exact asset handling without mutating the original request', async () => {
    const request = new Request(`${url}?preview=1`, {
      headers: { Range: 'bytes=0-1', 'If-Range': etag, 'Accept-Encoding': 'gzip' },
    });
    const response = await worker.fetch(request, env);
    assert.equal(response.status, 206);
    assert.deepEqual(Buffer.from(await response.arrayBuffer()), file.subarray(0, 2));
    assert.equal(request.headers.get('range'), 'bytes=0-1');
    assert.equal(request.headers.get('if-range'), etag);
    assert.equal(request.headers.get('accept-encoding'), 'gzip');
    assert.equal(requests.at(-1)!.url, request.url);
  });

  await t.test('other methods pass through without range manipulation', async () => {
    const request = new Request(url, { method: 'POST', headers: { Range: 'bytes=0-1' } });
    assert.equal((await worker.fetch(request, env)).status, 405);
    assert.equal(requests.at(-1), request);
  });
});

test('unlisted paths pass through unchanged, including similar video names', async () => {
  for (const path of ['/missing', '/social/other.mp4', '/social/qopy-demo-v2.mp4', '/social/qopy-share-v1.mp4', '/social/qopy-share-v2.mp4/extra']) {
    const request = new Request(`https://qopy.example${path}`, { headers: { Range: 'bytes=0-1', 'If-Range': '"original"' } });
    const original = new Response('static binding response', { status: 404 });
    const env = { ASSETS: { async fetch(forwarded: Request) {
      assert.equal(forwarded, request);
      assert.equal(forwarded.headers.get('range'), 'bytes=0-1');
      assert.equal(forwarded.headers.get('if-range'), '"original"');
      return original;
    } } };
    assert.equal(await worker.fetch(request, env), original);
  }
});

test('supported paths preserve non-200 asset responses unchanged', async () => {
  for (const path of previewPaths) {
    for (const status of [301, 304, 404, 412, 500]) {
      const original = new Response(null, { status, headers: { 'x-asset-response': 'original' } });
      const env = { ASSETS: { async fetch() { return original; } } };
      const request = new Request(`https://qopy.example${path}`, { headers: { Range: 'bytes=0-1' } });
      assert.equal(await worker.fetch(request, env), original);
    }
  }
});

test('Worker-first routes list exactly the two supported immutable previews', async () => {
  const config = await readFile(new URL('../wrangler.jsonc', import.meta.url), 'utf8');
  const routes = config.match(/"run_worker_first"\s*:\s*(\[[\s\S]*?\])/);
  assert.ok(routes, 'selective Worker-first routing must be configured');
  assert.deepEqual(JSON.parse(routes[1]), previewPaths);
});
