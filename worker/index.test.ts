import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import worker from './index.ts';

const file = await readFile(new URL('../public/social/qopy-demo-v1.mp4', import.meta.url));
const url = 'https://qopy.example/social/qopy-demo-v1.mp4';
const etag = '"preview-v1"';
const modified = 'Thu, 01 Oct 2026 00:00:00 GMT';
const requests: Request[] = [];
const env = { ASSETS: { async fetch(request: Request) {
  requests.push(request);
  if (new URL(request.url).pathname !== '/social/qopy-demo-v1.mp4') return new Response('Not found', { status: 404 });
  if (!['GET', 'HEAD'].includes(request.method)) return new Response(null, { status: 405 });
  if (request.headers.get('if-none-match') === etag) return new Response(null, { status: 304, headers: { etag } });
  return new Response(request.method === 'HEAD' ? null : file, {
    headers: { 'content-type': 'video/mp4', 'content-length': String(file.length), etag, 'last-modified': modified },
  });
} } };
const get = (range?: string, extra: HeadersInit = {}, method = 'GET') => worker.fetch(new Request(url, {
  method, headers: { ...(range ? { Range: range } : {}), ...extra },
}), env);

test('full GET preserves file, type, validators, length and immutable cache', async () => {
  const response = await get();
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('accept-ranges'), 'bytes');
  assert.equal(response.headers.get('content-type'), 'video/mp4');
  assert.equal(response.headers.get('content-length'), String(file.length));
  assert.equal(response.headers.get('etag'), etag);
  assert.equal(response.headers.get('cache-control'), 'public, max-age=31536000, immutable');
  assert.deepEqual(Buffer.from(await response.arrayBuffer()), file);
});

for (const [range, start, end] of [
  ['bytes=0-1', 0, 1], ['bytes=0-99', 0, 99], ['bytes=100-199', 100, 199],
  ['bytes=159000-', 159000, file.length - 1], ['bytes=-100', file.length - 100, file.length - 1],
  ['bytes=0-9999999999999999999999', 0, file.length - 1],
  ['bytes=-9999999999999999999999', 0, file.length - 1],
] as const) test(`correct bytes and headers for ${range}`, async () => {
  const response = await get(range);
  assert.equal(response.status, 206);
  assert.equal(response.headers.get('content-range'), `bytes ${start}-${end}/${file.length}`);
  assert.equal(response.headers.get('content-length'), String(end - start + 1));
  assert.deepEqual(Buffer.from(await response.arrayBuffer()), file.subarray(start, end + 1));
  assert.equal(requests.at(-1)!.headers.get('range'), null);
  assert.equal(requests.at(-1)!.headers.get('accept-encoding'), 'identity');
});

for (const range of [`bytes=${file.length}-`, 'bytes=-0', 'bytes=9999999999999999999999-']) {
  test(`unsatisfiable range returns 416: ${range}`, async () => {
    const response = await get(range);
    assert.equal(response.status, 416);
    assert.equal(response.headers.get('content-range'), `bytes */${file.length}`);
    assert.equal(response.headers.get('content-length'), '0');
    assert.equal(response.headers.get('cache-control'), 'no-store');
    assert.equal((await response.arrayBuffer()).byteLength, 0);
  });
}

for (const range of ['bytes=3-2', 'bytes=-', 'bytes=0-1,3-4', 'items=0-1', 'bytes=nope']) {
  test(`unsupported/malformed range is ignored: ${range}`, async () => {
    const response = await get(range);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('content-range'), null);
    assert.deepEqual(Buffer.from(await response.arrayBuffer()), file);
  });
}

test('HEAD ignores Range and returns full headers without a body', async () => {
  const response = await get('bytes=0-1', {}, 'HEAD');
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-range'), null);
  assert.equal(response.headers.get('content-length'), String(file.length));
  assert.equal((await response.arrayBuffer()).byteLength, 0);
});

test('If-Range accepts matching strong validators only', async () => {
  for (const validator of [etag, modified]) assert.equal((await get('bytes=0-1', { 'If-Range': validator })).status, 206);
  for (const validator of ['"stale"', `W/${etag}`, 'Wed, 30 Sep 2026 00:00:00 GMT', 'invalid']) {
    const response = await get('bytes=0-1', { 'If-Range': validator });
    assert.equal(response.status, 200);
    assert.deepEqual(Buffer.from(await response.arrayBuffer()), file);
  }
});

test('conditional 304 takes precedence over Range', async () => {
  const response = await get('bytes=0-1', { 'If-None-Match': etag });
  assert.equal(response.status, 304);
  assert.equal((await response.arrayBuffer()).byteLength, 0);
});

test('other paths and methods pass through without range manipulation', async () => {
  const request = new Request('https://qopy.example/missing', { headers: { Range: 'bytes=0-1' } });
  assert.equal((await worker.fetch(request, env)).status, 404);
  assert.equal(requests.at(-1), request);
  assert.equal((await get(undefined, {}, 'POST')).status, 405);
});
