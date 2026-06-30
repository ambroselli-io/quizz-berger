/**
 * Production server for the TanStack Start build.
 *
 * `vite build` emits:
 *   - dist/client/         static assets (everything from public/ + hashed /assets)
 *   - dist/server/server.js  a Web-fetch handler: `export default { fetch(request) }`
 *
 * This small Express app serves the static assets and adapts Node req/res to the
 * Web Request/Response the SSR handler expects. Start with:
 *   NODE_ENV=production PORT=5178 node server.mjs
 */
import express from 'express';
import compression from 'compression';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import handler from './dist/server/server.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const clientDir = join(__dirname, 'dist', 'client');
const startedAt = Date.now();

const app = express();
app.disable('x-powered-by');
app.use(compression());

app.get('/healthz', (_req, res) => {
  res.json({
    ok: true,
    startedAt: new Date(startedAt).toISOString(),
    uptimeSeconds: Math.round((Date.now() - startedAt) / 1000),
  });
});

// Hashed assets never change → cache forever.
app.use('/assets', express.static(join(clientDir, 'assets'), { immutable: true, maxAge: '1y' }));
// Other static files (favicon, candidate images, pdfs…). index:false so `/` hits SSR, not index.html.
app.use(express.static(clientDir, { index: false }));

// Everything else → SSR handler.
app.use(async (req, res) => {
  try {
    const url = `${req.protocol}://${req.headers.host}${req.originalUrl}`;
    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (Array.isArray(value)) value.forEach((v) => headers.append(key, v));
      else if (value != null) headers.set(key, value);
    }

    const controller = new AbortController();
    res.on('close', () => controller.abort());

    const init = { method: req.method, headers, signal: controller.signal };
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      init.body = req;
      init.duplex = 'half';
    }

    const response = await handler.fetch(new Request(url, init));

    res.statusCode = response.status;
    response.headers.forEach((value, key) => res.setHeader(key, value));

    if (response.body) {
      const reader = response.body.getReader();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
    }
    res.end();
  } catch (err) {
    console.error('SSR error:', err);
    if (!res.headersSent) res.statusCode = 500;
    res.end('Internal Server Error');
  }
});

const port = process.env.PORT || 5178;
app.listen(port, '0.0.0.0', () => console.log(`Server listening at http://localhost:${port}`));
