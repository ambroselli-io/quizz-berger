/**
 * Sitemap + llms.txt generator for quizz-du-berger.com
 * Run: tsx scripts/generate-sitemap.ts
 * Imports slug data directly from src/utils/seo.ts and src/content/articles.ts
 * so adding a new theme/candidate/hot-topic/blog article requires no edit here.
 *
 * llms.txt (llmstxt.org) is generated from the same data on purpose: a
 * hand-written copy would keep quoting last season's question and candidate
 * counts, which is exactly what AI answers were doing before it existed.
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
  candidatesCount,
} from '../src/utils/seo';
import { quizzQuestionsCount, quizzThemesCount } from '../src/utils/quizz';
import { partyList, partyThemePages } from '../src/utils/parties';
import { candidacyList } from '../src/utils/candidacies';
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
  urls.push({ loc: '/confidentialite', priority: '0.2', changefreq: 'yearly' });

  // SEO hub pages
  urls.push({ loc: '/candidats', priority: '0.9', changefreq: 'weekly' });
  urls.push({ loc: '/partis', priority: '0.9', changefreq: 'weekly' });
  urls.push({ loc: '/sujets', priority: '0.9', changefreq: 'weekly' });
  urls.push({ loc: '/comparer', priority: '0.9', changefreq: 'weekly' });
  urls.push({ loc: '/comparateur-programmes-2027', priority: '0.9', changefreq: 'weekly' });
  urls.push({ loc: '/sondages-presidentielle-2027', priority: '0.9', changefreq: 'weekly' });
  urls.push({ loc: '/qui-est-candidat-2027', priority: '0.9', changefreq: 'daily' });
  urls.push({ loc: '/pour-qui-voter-2027', priority: '0.9', changefreq: 'monthly' });

  // Theme pages
  for (const theme of themeSlugMap) {
    urls.push({ loc: `/theme/${theme.slug}`, priority: '0.8', changefreq: 'monthly' });
  }

  // Candidate pages
  for (const candidate of candidateSlugMap) {
    urls.push({ loc: `/candidat/${candidate.slug}`, priority: '0.8', changefreq: 'monthly' });
  }

  // One page per candidacy: who declared, who gave up, when, with the press links
  for (const candidacy of candidacyList) {
    urls.push({ loc: `/candidature/${candidacy.slug}`, priority: '0.7', changefreq: 'weekly' });
  }

  // Party pages, and the curated party x theme couples ("programme RN 2027 retraite")
  for (const party of partyList) {
    urls.push({ loc: `/parti/${party.slug}`, priority: '0.8', changefreq: 'monthly' });
  }
  for (const { party, theme } of partyThemePages) {
    urls.push({ loc: `/parti/${party.slug}/${theme.slug}`, priority: '0.7', changefreq: 'monthly' });
  }

  // Question pages — hot topics get higher priority
  const hotTopicIds = new Set(hotTopicQuestions.map((q) => q.questionId));
  for (const q of questionSlugMap) {
    const priority = hotTopicIds.has(q.questionId) ? '0.7' : '0.5';
    urls.push({ loc: `/question-politique/${q.slug}`, priority, changefreq: 'monthly' });
  }

  // Comparison pages — curated pairs only. The full pairwise tail (~300 pages)
  // stays reachable on the site but is deliberately kept out of the sitemap:
  // Google mass-demoted it to "Crawled - currently not indexed" (July 2026).
  for (const pair of comparisonPairs) {
    urls.push({ loc: `/comparer/${pair.slug}`, priority: '0.7', changefreq: 'monthly' });
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

function generateLlmsTxt(): string {
  const link = (path: string, label: string, note: string) =>
    `- [${label}](${BASE_URL}${path}): ${note}`;

  const sections = [
    `# Le Quizz du Berger`,
    '',
    `> Test politique gratuit pour l'élection présidentielle française de 2027. Le visiteur répond aux questions qu'il veut parmi ${quizzQuestionsCount} questions réparties sur ${quizzThemesCount} thèmes ; un algorithme compare ses réponses à celles de ${candidatesCount} candidats et les classe du plus proche au plus éloigné de ses idées.`,
    '',
    `Gratuit, sans inscription obligatoire, code open-source. Chaque question propose 3 à 6 réponses concrètes plutôt qu'un simple pour/contre : une réponse identique vaut 5 points, une réponse proche 2 à 4 points, une réponse opposée 0. Le résultat est donné globalement et thème par thème.`,
    '',
    `Les réponses des candidats sont basées sur l'analyse de leurs programmes officiels, déclarations publiques et votes passés. Les candidats n'ont pas rempli le questionnaire eux-mêmes.`,
    '',
    '## Commencer',
    link('/', `Test politique présidentielle 2027`, `page d'accueil, ${quizzQuestionsCount} questions sur ${quizzThemesCount} thèmes, ${candidatesCount} candidats`),
    link('/pour-qui-voter-2027', 'Pour qui voter en 2027', 'la réponse courte, la méthode du test et les questions fréquentes'),
    link('/themes', 'Choisir un thème', 'répondre thème par thème, dans l\'ordre que l\'on veut'),
    link('/all-questions', `Les ${quizzQuestionsCount} questions`, 'la liste complète des questions et de leurs réponses possibles'),
    link('/comparer', 'Comparer deux candidats', 'accords et désaccords entre deux candidats, thème par thème'),
    link('/comparateur-programmes-2027', 'Comparateur de programmes 2027', 'les positions de tous les candidats sur une même question'),
    link('/qui-est-candidat-2027', 'Qui est candidat en 2027', 'candidatures déclarées, retirées et pressenties, avec leurs dates et leurs sources'),
    link('/sondages-presidentielle-2027', 'Sondages présidentielle 2027', 'moyennes mensuelles du premier tour, données ouvertes MieuxVoter'),
    link('/qui-sommes-nous', 'Qui sommes-nous', 'méthode, auteurs et neutralité du quizz'),
    '',
    `## Les ${candidatesCount} candidats`,
    ...candidateSlugMap.map((c) =>
      link(`/candidat/${c.slug}`, c.pseudo, `positions de ${c.pseudo} sur les ${quizzThemesCount} thèmes, candidats les plus proches, sondages`),
    ),
    '',
    `## Les ${quizzThemesCount} thèmes`,
    ...themeSlugMap.map((t) =>
      link(`/theme/${t.slug}`, t.fr, `les positions des candidats sur ${t.questions.length} question${t.questions.length > 1 ? 's' : ''}`),
    ),
    '',
    '## Sujets brûlants',
    ...hotTopicQuestions.map((q) => link(`/question-politique/${q.slug}`, q.seoTitle, q.seoDescription)),
    '',
    '## Comparaisons les plus consultées',
    ...comparisonPairs.map((p) =>
      link(
        `/comparer/${p.slug}`,
        `${p.candidate1Name} vs ${p.candidate2Name}`,
        `sur quoi ${p.candidate1Name} et ${p.candidate2Name} sont d'accord, et sur quoi ils divergent`,
      ),
    ),
    '',
    '## Articles',
    ...articles.map((a) => link(`/blog/${a.slug}`, a.title, a.excerpt)),
    '',
  ];

  return `${sections.join('\n')}\n`;
}

const urls = buildUrls();
const xml = generateSitemapXml(urls);
const outputPath = resolve(__dirname, '../public/sitemap.xml');
writeFileSync(outputPath, xml);
console.log(`Sitemap generated with ${urls.length} URLs → ${outputPath}`);

const llmsTxt = generateLlmsTxt();
const llmsPath = resolve(__dirname, '../public/llms.txt');
writeFileSync(llmsPath, llmsTxt);
console.log(`llms.txt generated (${llmsTxt.length} chars) → ${llmsPath}`);
