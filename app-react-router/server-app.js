import compression from 'compression';
import express from 'express';
import path from 'path';
import fs from 'fs';

const viteDevServer =
  process.env.NODE_ENV === 'production'
    ? undefined
    : await import('vite').then((vite) =>
        vite.createServer({
          server: { middlewareMode: true },
        }),
      );

const app = express();

app.use(compression());

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable('x-powered-by');

if (viteDevServer) {
  app.use(viteDevServer.middlewares);
  app.use((req, res, next) => {
    res.setHeader('Service-Worker-Allowed', '/');
    console.log('Set Service-Worker-Allowed header');
    next();
  });
} else {
  // Vite fingerprints its assets so we can cache forever.
  app.use('/assets', express.static('build/assets', { immutable: true, maxAge: '1y' }));
}

// Serve static files from the build/client directory
app.use(express.static(path.join(process.cwd(), 'build')));

// Bot user-agents for social media crawlers
const BOT_AGENTS = [
  'facebookexternalhit',
  'Facebot',
  'Twitterbot',
  'WhatsApp',
  'LinkedInBot',
  'Slackbot',
  'TelegramBot',
  'Discordbot',
];

const isBot = (userAgent) => BOT_AGENTS.some((bot) => userAgent?.includes(bot));

const OG_CDN = 'https://quizz-du-berger-pictures.cellar-c2.services.clever-cloud.com';

// Cache index.html in memory for production
let cachedIndexHtml = null;
function getIndexHtml() {
  if (cachedIndexHtml) return cachedIndexHtml;
  const indexPath = path.join(process.cwd(), 'build', 'index.html');
  cachedIndexHtml = fs.readFileSync(indexPath, 'utf8');
  return cachedIndexHtml;
}

// Serve result pages with custom OG tags for social media bots
app.get('/result/:pseudo', (req, res, next) => {
  if (!isBot(req.headers['user-agent'])) {
    return res.sendFile(path.join(process.cwd(), 'build', 'index.html'), next);
  }

  const pseudo = decodeURIComponent(req.params.pseudo);
  const pseudoCapitalized = pseudo.charAt(0).toUpperCase() + pseudo.slice(1);

  const ogImage = `${OG_CDN}/og/${encodeURIComponent(pseudo)}.png`;
  const ogTitle = `Résultats de ${pseudoCapitalized} | Le Quizz du Berger`;
  const ogDescription = `Découvrez les affinités politiques de ${pseudoCapitalized} pour la présidentielle 2027.`;
  const ogUrl = `https://www.quizz-du-berger.com/result/${encodeURIComponent(pseudo)}`;

  let html = getIndexHtml();

  html = html
    .replace(/<title>[^<]*<\/title>/, `<title>${ogTitle}</title>`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${ogTitle}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${ogDescription}" />`)
    .replace(/<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${ogImage}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${ogUrl}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${ogTitle}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${ogDescription}" />`)
    .replace(/<meta name="twitter:image" content="[^"]*" \/>/, `<meta name="twitter:image" content="${ogImage}" />`);

  res.setHeader('Content-Type', 'text/html');
  res.send(html);
});

// For any other routes, send the index.html file
app.get('*', (req, res, next) => {
  res.sendFile(path.join(process.cwd(), 'build', 'index.html'), next);
});

const port = process.env.PORT || 5179;
app.listen(port, '0.0.0.0', () => console.log(`Express server listening at http://localhost:${port}`));
