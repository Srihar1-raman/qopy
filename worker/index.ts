const previewPath = '/social/qopy-demo-v1.mp4';

type Env = { ASSETS: { fetch(request: Request): Promise<Response> } };
type ByteRange = { start: number; end: number } | 'unsatisfiable' | null;

// One range is sufficient for progressive MP4 playback. RFC 9110 permits
// ignoring unsupported multipart ranges and malformed Range fields with a 200.
function parseRange(value: string, size: number): ByteRange {
  const match = /^bytes=(\d*)-(\d*)$/i.exec(value.trim());
  if (!match || (!match[1] && !match[2])) return null;
  const first = match[1] ? BigInt(match[1]) : null;
  const last = match[2] ? BigInt(match[2]) : null;
  const length = BigInt(size);
  if (first === null) {
    if (last === 0n || length === 0n) return 'unsatisfiable';
    return { start: Number(last! >= length ? 0n : length - last!), end: size - 1 };
  }
  if (last !== null && last < first) return null;
  if (first >= length) return 'unsatisfiable';
  return { start: Number(first), end: Number(last === null || last >= length ? length - 1n : last) };
}

function ifRangeMatches(value: string | null, headers: Headers): boolean {
  if (!value) return true;
  // If-Range requires a strong validator; never partially serve a stale entity.
  if (value.startsWith('"')) return value === headers.get('etag');
  if (value.startsWith('W/')) return false;
  const modified = headers.get('last-modified');
  return modified !== null && Number.isFinite(Date.parse(value)) && Date.parse(value) === Date.parse(modified);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (new URL(request.url).pathname !== previewPath || !['GET', 'HEAD'].includes(request.method)) {
      return env.ASSETS.fetch(request);
    }

    // Fetch a full, identity-encoded representation from the static binding.
    // Forward ordinary conditional headers unchanged; preserve any non-200
    // response returned by the asset binding before considering a byte range.
    const assetRequest = new Request(request);
    assetRequest.headers.delete('range');
    assetRequest.headers.delete('if-range');
    assetRequest.headers.set('accept-encoding', 'identity');
    const asset = await env.ASSETS.fetch(assetRequest);
    if (asset.status !== 200) return asset;

    const headers = new Headers(asset.headers);
    headers.set('accept-ranges', 'bytes');
    headers.set('content-type', 'video/mp4');
    headers.set('cache-control', 'public, max-age=31536000, immutable');
    const rangeValue = request.headers.get('range');
    if (request.method === 'HEAD' || !rangeValue || !ifRangeMatches(request.headers.get('if-range'), headers)) {
      return new Response(asset.body, { status: 200, headers });
    }

    // This fixed preview is 159 KB; the build enforces a <1 MB cap. Buffering this
    // one small asset keeps the implementation bounded without a storage service.
    const body = await asset.arrayBuffer();
    const range = parseRange(rangeValue, body.byteLength);
    headers.delete('content-encoding');
    if (range === 'unsatisfiable') {
      headers.set('content-range', `bytes */${body.byteLength}`);
      headers.set('content-length', '0');
      headers.set('cache-control', 'no-store');
      return new Response(null, { status: 416, headers });
    }
    if (!range) {
      headers.set('content-length', String(body.byteLength));
      return new Response(body, { status: 200, headers });
    }
    const partial = body.slice(range.start, range.end + 1);
    headers.set('content-range', `bytes ${range.start}-${range.end}/${body.byteLength}`);
    headers.set('content-length', String(partial.byteLength));
    return new Response(partial, { status: 206, headers });
  },
};
