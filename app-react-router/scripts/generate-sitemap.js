/**
 * Sitemap generator for quizz-du-berger.com
 * Run: node scripts/generate-sitemap.js
 * Reads quizz-2027.json + candidates-answers.json to generate all SEO page URLs.
 */

import { readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const quizz = JSON.parse(readFileSync(resolve(__dirname, '../src/shared/quizz-2027.json'), 'utf-8'));
const candidates = JSON.parse(readFileSync(resolve(__dirname, '../src/shared/candidates-answers.json'), 'utf-8'));

const BASE_URL = 'https://www.quizz-du-berger.com';

function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Hot-topic question slugs (must match seo.ts)
const hotTopicSlugs = {
  'question-2027-ae-01': 'guerre-ukraine-france',
  'question-2027-ae-02': 'france-otan-alliance',
  'question-2027-ae-04': 'construction-europeenne-avenir',
  'question-2027-agri-01': 'pesticides-agriculture-france',
  'question-2027-agri-03': 'agriculture-biologique-france',
  'question-2027-climat-01': 'nucleaire-france-avenir',
  'question-2027-climat-03': 'voiture-electrique-interdiction-thermique',
  'question-2027-immigration-01': 'immigration-france-2027',
  'question-2027-immigration-03': 'droit-du-sol-nationalite',
  'question-2027-depenses-01': 'dette-publique-france',
  'question-2027-fiscal-01': 'impot-sur-le-revenu-reforme',
  'question-2027-gouvernance-01': 'proportionnelle-elections',
  'question-2027-gouvernance-03': 'referendum-initiative-citoyenne-ric',
  'question-2027-sante-03': 'euthanasie-loi-france',
  'question-2027-sante-05': 'deserts-medicaux-france',
  'question-2027-societe-01': 'legalisation-cannabis-france',
  'question-2027-societe-03': 'laicite-religion-france',
  'question-2027-societe-07': 'gpa-pma-france',
  'question-2027-police-01': 'police-securite-france',
  'question-2027-pouvoir-achat-01': 'smic-augmentation-salaires',
  'question-2027-logement-01': 'crise-logement-france',
  'question-2027-education-01': 'ecole-education-reforme',
  'question-2027-numerique-01': 'intelligence-artificielle-regulation',
  'question-2027-economie-01': 'reindustrialisation-france',
};

// Top comparison pairs
const comparisonPairs = [
  ['marine-le-pen', 'edouard-philippe'],
  ['marine-le-pen', 'jean-luc-melenchon'],
  ['marine-le-pen', 'eric-zemmour'],
  ['edouard-philippe', 'gabriel-attal'],
  ['edouard-philippe', 'laurent-wauquiez'],
  ['jean-luc-melenchon', 'francois-ruffin'],
  ['jean-luc-melenchon', 'raphael-glucksmann'],
  ['marine-le-pen', 'bruno-retailleau'],
  ['francois-ruffin', 'marine-tondelier'],
  ['edouard-philippe', 'francois-bayrou'],
  ['gabriel-attal', 'raphael-glucksmann'],
  ['marine-le-pen', 'gerald-darmanin'],
  ['edouard-philippe', 'bernard-cazeneuve'],
  ['jean-luc-melenchon', 'fabien-roussel'],
  ['laurent-wauquiez', 'bruno-retailleau'],
  ['eric-zemmour', 'nicolas-dupont-aignan'],
  ['francois-hollande', 'bernard-cazeneuve'],
  ['raphael-glucksmann', 'marine-tondelier'],
  ['edouard-philippe', 'dominique-de-villepin'],
  ['francois-ruffin', 'raphael-glucksmann'],
  ['marine-le-pen', 'francois-asselineau'],
  ['gabriel-attal', 'laurent-wauquiez'],
  ['jean-luc-melenchon', 'nathalie-arthaud'],
  ['xavier-bertrand', 'edouard-philippe'],
  ['delphine-batho', 'marine-tondelier'],
  ['jerome-guedj', 'raphael-glucksmann'],
  ['clementine-autain', 'jean-luc-melenchon'],
  ['david-lisnard', 'laurent-wauquiez'],
  ['gabriel-attal', 'gerald-darmanin'],
  ['francois-bayrou', 'dominique-de-villepin'],
];

// Blog articles
const blogSlugs = [
  'candidats-presidentielles-2027',
  'comment-fonctionne-le-quizz-du-berger',
  '10-themes-cles-presidentielle-2027',
  'alternative-elyze-2027',
  'comparatif-quiz-politiques-2027',
  'quizz-du-berger-vs-boussole-presidentielle',
];

function buildUrls() {
  const urls = [];

  // Static pages
  urls.push({ loc: '/', priority: '1.0', changefreq: 'weekly' });
  urls.push({ loc: '/themes', priority: '0.9', changefreq: 'monthly' });
  urls.push({ loc: '/all-questions', priority: '0.7', changefreq: 'monthly' });
  urls.push({ loc: '/blog', priority: '0.8', changefreq: 'weekly' });
  urls.push({ loc: '/communique/2022-03-26', priority: '0.3', changefreq: 'yearly' });

  // Theme pages
  for (const theme of quizz) {
    if (theme.questions.length === 0) continue;
    const slug = slugify(theme.fr);
    urls.push({ loc: `/theme/${slug}`, priority: '0.8', changefreq: 'monthly' });
  }

  // Candidate pages
  for (const candidate of candidates) {
    const slug = slugify(candidate.pseudo);
    urls.push({ loc: `/candidat/${slug}`, priority: '0.8', changefreq: 'monthly' });
  }

  // Hot-topic question pages (prioritized)
  for (const [questionId, slug] of Object.entries(hotTopicSlugs)) {
    urls.push({ loc: `/question-politique/${slug}`, priority: '0.7', changefreq: 'monthly' });
  }

  // All other question pages
  for (const theme of quizz) {
    for (const question of theme.questions) {
      if (hotTopicSlugs[question._id]) continue; // already added
      const slug = slugify(question.fr);
      urls.push({ loc: `/question-politique/${slug}`, priority: '0.5', changefreq: 'monthly' });
    }
  }

  // Comparison pages
  for (const [c1, c2] of comparisonPairs) {
    urls.push({ loc: `/comparer/${c1}-vs-${c2}`, priority: '0.6', changefreq: 'monthly' });
  }

  // Blog articles
  for (const slug of blogSlugs) {
    urls.push({ loc: `/blog/${slug}`, priority: '0.7', changefreq: 'weekly' });
  }

  return urls;
}

function generateSitemapXml(urls) {
  const urlEntries = urls
    .map(
      (u) => `  <url>
    <loc>${BASE_URL}${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;
}

const urls = buildUrls();
const xml = generateSitemapXml(urls);
const outputPath = resolve(__dirname, '../public/sitemap.xml');
writeFileSync(outputPath, xml);
console.log(`Sitemap generated with ${urls.length} URLs → ${outputPath}`);
