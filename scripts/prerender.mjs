import { readFile, writeFile } from 'node:fs/promises';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';

// Render the same component tree used by the browser. No crawler-only copy.
const server = await createServer({
  server: { middlewareMode: true, hmr: false },
  appType: 'custom',
  logLevel: 'error',
});

try {
  const { default: App } = await server.ssrLoadModule('/src/App.tsx');
  const html = await readFile('dist/index.html', 'utf8');
  const placeholder = '<div id="root"></div>';
  if (!html.includes(placeholder)) throw new Error('Missing prerender root');
  const rendered = renderToString(createElement(App));
  await writeFile('dist/index.html', html.replace(placeholder, `<div id="root">${rendered}</div>`));
  console.log('Prerendered the homepage for JavaScript-free reading.');
} finally {
  await server.close();
}
