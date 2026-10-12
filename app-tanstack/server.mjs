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
import { readFileSync } from 'node:fs';
import handler from './dist/server/server.js';
import { classifyBot } from './src/utils/bots.mjs';

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

// Crawler traffic (Googlebot, ChatGPT-User, GPTBot…) for the /audience page. Registered before the static
// handlers so robots.txt, llms.txt and sitemap.xml are counted too; hashed assets and images are not.
// Hits are buffered and posted in batches to the API (POST /visit/bots), never delaying a response.
// ANALYTICS_BOT_TOKEN unset (dev) = nothing is recorded.
const analyticsBotToken = process.env.ANALYTICS_BOT_TOKEN;
if (analyticsBotToken) {
  const apiUrl = process.env.ANALYTICS_API_URL || 'http://localhost:5179';
  let botHits = [];
  const flushBotHits = () => {
    if (!botHits.length) return;
    const hits = botHits;
    botHits = [];
    fetch(`${apiUrl}/visit/bots`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-analytics-token': analyticsBotToken },
      body: JSON.stringify({ hits }),
    }).catch((err) => console.error('bot hits not sent:', err.message));
  };
  setInterval(flushBotHits, 10_000).unref();

  app.use((req, res, next) => {
    if (req.path.startsWith('/assets/') || /\.(png|jpe?g|webp|svg|ico|gif|css|js|woff2?|pdf)$/i.test(req.path)) return next();
    const bot = classifyBot(req.headers['user-agent']);
    if (bot) {
      res.on('finish', () => {
        botHits.push({ at: Date.now(), bot: bot.name, category: bot.category, path: req.path, status: res.statusCode });
        if (botHits.length >= 500) flushBotHits();
      });
    }
    next();
  });
}

// Hashed assets never change → cache forever.
app.use('/assets', express.static(join(clientDir, 'assets'), { immutable: true, maxAge: '1y' }));
// Other static files (favicon, candidate images, pdfs…). index:false so `/` hits SSR, not index.html.
app.use(express.static(clientDir, { index: false }));

// Trust-anchor redirects. AI agents check /about, /contact, /privacy to
// verify legitimacy. /contact already exists as a route; the other two map
// to the French equivalents. 301 so agents (and search engines) learn the
// canonical path.
app.get('/about', (_req, res) => res.redirect(301, '/qui-sommes-nous'));
app.get('/privacy', (_req, res) => res.redirect(301, '/confidentialite'));

// The "Comment réduire le chômage en France ?" question was split into three
// single-axis questions (unemployment benefit, State as employer, employer
// contributions). Its old SEO URL kept impressions, so it points at the article
// that now covers the three angles.
app.get('/question-politique/comment-reduire-le-chomage-en-france', (_req, res) =>
  res.redirect(301, '/blog/hausse-chomage-france-candidats-2027'),
);

// Markdown content negotiation (acceptmarkdown.com). When a client sends
// Accept: text/markdown, serve llms.txt for the homepage instead of HTML.
let llmsTxtContent = '';
try {
  llmsTxtContent = readFileSync(join(clientDir, 'llms.txt'), 'utf-8');
} catch {
  // llms.txt may not exist in dev; fall through to SSR.
}

const NOT_FOUND_MD = `# 404 — Page non trouvée

La page demandée n'existe pas sur le Quizz du Berger.

## Où chercher

- [Page d'accueil](https://www.quizz-du-berger.com/) — commencer le test politique
- [Tous les candidats](https://www.quizz-du-berger.com/candidats) — les 40 candidats et leurs positions
- [Sujets brûlants](https://www.quizz-du-berger.com/sujets) — les questions d'actualité
- [Comparer deux candidats](https://www.quizz-du-berger.com/comparer) — accords et désaccords
- [Blog](https://www.quizz-du-berger.com/blog) — articles d'analyse politique
- [Qui sommes-nous](https://www.quizz-du-berger.com/qui-sommes-nous) — méthode et auteurs
- [Plan du site](https://www.quizz-du-berger.com/sitemap.xml)
- [llms.txt](https://www.quizz-du-berger.com/llms.txt) — index structuré pour agents IA
`;

app.use((req, res, next) => {
  res.vary('Accept');
  const accept = req.headers.accept || '';
  if (accept.includes('text/markdown')) {
    if (req.path === '/' && llmsTxtContent) {
      res.type('text/markdown; charset=utf-8').send(llmsTxtContent);
      return;
    }
  }
  next();
});

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

    // The SSR handler rejects non-HTML Accept headers. When the client sends
    // Accept: text/markdown, tell the SSR handler it's HTML so it renders the
    // page normally — we check the status code afterwards.
    const wantsMarkdown = (req.headers.accept || '').includes('text/markdown');
    if (wantsMarkdown) headers.set('accept', 'text/html');

    const init = { method: req.method, headers, signal: controller.signal };
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      init.body = req;
      init.duplex = 'half';
    }

    const response = await handler.fetch(new Request(url, init));

    // Agent-friendly 404: when the SSR handler returns 404 and the client
    // accepts text/markdown, serve a short markdown body with recovery links
    // instead of the full HTML app shell.
    if (response.status === 404 && wantsMarkdown) {
      res.status(404).type('text/markdown; charset=utf-8').send(NOT_FOUND_MD);
      return;
    }

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
