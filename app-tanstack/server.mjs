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
import { createExpressAICrawlerMiddleware } from '@datafast/ai-crawl';
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

// IndexNow key verification. Search engines (Bing, Yandex, Seznam, Naver…)
// fetch https://<host>/<key>.txt to confirm we own the key that the IndexNow
// workflow submits URLs with. Served from INDEXNOW_KEY so the key stays out of
// the repo. If the env var is unset the route isn't registered — the request
// falls through to the normal 404 and IndexNow submissions simply go
// unverified. Nothing breaks.
const indexNowKey = process.env.INDEXNOW_KEY;
if (indexNowKey && /^[A-Za-z0-9-]{8,128}$/.test(indexNowKey)) {
  app.get(`/${indexNowKey}.txt`, (_req, res) => {
    res.type('text/plain').send(indexNowKey);
  });
}

// Hashed assets never change → cache forever.
app.use('/assets', express.static(join(clientDir, 'assets'), { immutable: true, maxAge: '1y' }));
// Other static files (favicon, candidate images, pdfs…). index:false so `/` hits SSR, not index.html.
app.use(express.static(clientDir, { index: false }));

// DataFast "Bot traffic": reports AI and search crawler hits (ChatGPT-User,
// ClaudeBot, GPTBot, Googlebot…) to https://datafa.st/api/ai-crawls. It reads the
// user-agent, calls next() straight away and posts on the `finish` event, so it
// never delays a response. Registered after the static handlers, so only page
// requests are counted. nginx terminates TLS, so `req.protocol` is http in here:
// publicOrigin rebuilds the href the crawler really asked for.
app.use(
  createExpressAICrawlerMiddleware({
    websiteId: 'dfid_UHklLXAsoVa6Bef5p8F8N',
    publicOrigin: process.env.PUBLIC_ORIGIN || 'https://www.quizz-du-berger.com',
    // Optional dfbot_… token from the DataFast dashboard. Without it the endpoint
    // still accepts the calls, it just cannot tell them from a spoofed one.
    authToken: process.env.DATAFAST_BOT_TOKEN,
  }),
);

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
