import { createFileRoute } from '@tanstack/react-router';
import { seoHead } from '@app/utils/seo-head';
import Stats from '@app/pages/Stats';

export const Route = createFileRoute('/stats')({
  head: () =>
    seoHead({
      title: 'Statistiques | Le Quizz du Berger',
      description: "Les chiffres du Quizz du Berger, sans rien cacher : nombre d'utilisateurs et de réponses par jour.",
      // Public on purpose (linked from the footer), but a page of charts has nothing to rank for.
      // Also disallowed in robots.txt; this noindex only matters to crawlers that ignore it.
      robots: 'noindex, follow',
    }),
  component: Stats,
});
