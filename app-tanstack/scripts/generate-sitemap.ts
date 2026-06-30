/**
 * Sitemap generator for quizz-du-berger.com
 * Run: tsx scripts/generate-sitemap.ts
 * Imports slug data directly from src/utils/seo.ts and src/content/articles.ts
 * so adding a new theme/candidate/hot-topic/blog article requires no edit here.
 */

import { writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import {
  themeSlugMap,
  candidateSlugMap,
  questionSlugMap,
  hotTopicQuestions,
  comparisonPairs,
  allComparisonPairs,
} from '../src/utils/seo';
import { articles } from '../src/content/articles';

const __dirname = dirname(fileURLToPath(import.meta.url));

const BASE_URL = 'https://www.quizz-du-berger.com';

interface SitemapUrl {
  loc: string;
  priority: string;
  changefreq: string;
}

function buildUrls(): SitemapUrl[] {
  const urls: SitemapUrl[] = [];

  // Static pages
  urls.push({ loc: '/', priority: '1.0', changefreq: 'weekly' });
  urls.push({ loc: '/themes', priority: '0.9', changefreq: 'monthly' });
  urls.push({ loc: '/all-questions', priority: '0.7', changefreq: 'monthly' });
  urls.push({ loc: '/blog', priority: '0.8', changefreq: 'weekly' });
  urls.push({ loc: '/communique/2022-03-26', priority: '0.3', changefreq: 'yearly' });

  // SEO hub pages
  urls.push({ loc: '/candidats', priority: '0.9', changefreq: 'weekly' });
  urls.push({ loc: '/sujets', priority: '0.9', changefreq: 'weekly' });
  urls.push({ loc: '/comparer', priority: '0.9', changefreq: 'weekly' });

  // Theme pages
  for (const theme of themeSlugMap) {
    urls.push({ loc: `/theme/${theme.slug}`, priority: '0.8', changefreq: 'monthly' });
  }

  // Candidate pages
  for (const candidate of candidateSlugMap) {
    urls.push({ loc: `/candidat/${candidate.slug}`, priority: '0.8', changefreq: 'monthly' });
  }

  // Question pages — hot topics get higher priority
  const hotTopicIds = new Set(hotTopicQuestions.map((q) => q.questionId));
  for (const q of questionSlugMap) {
    const priority = hotTopicIds.has(q.questionId) ? '0.7' : '0.5';
    urls.push({ loc: `/question-politique/${q.slug}`, priority, changefreq: 'monthly' });
  }

  // Comparison pages — curated pairs get higher priority
  const curatedSlugs = new Set(comparisonPairs.map((p) => p.slug));
  for (const pair of allComparisonPairs) {
    const priority = curatedSlugs.has(pair.slug) ? '0.7' : '0.5';
    urls.push({ loc: `/comparer/${pair.slug}`, priority, changefreq: 'monthly' });
  }

  // Blog articles
  for (const article of articles) {
    urls.push({ loc: `/blog/${article.slug}`, priority: '0.7', changefreq: 'weekly' });
  }

  return urls;
}

function generateSitemapXml(urls: SitemapUrl[]): string {
  const urlEntries = urls
    .map(
      (u) => `  <url>
    <loc>${BASE_URL}${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
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
