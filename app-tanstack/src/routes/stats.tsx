import { createFileRoute } from '@tanstack/react-router';
import { seoHead } from '@app/utils/seo-head';
import Stats from '@app/pages/Stats';

export const Route = createFileRoute('/stats')({
  // Internal dashboard: reachable by URL, but kept out of the index, the sitemap and robots.txt.
  head: () =>
    seoHead({
      title: 'Statistiques | Le Quizz du Berger',
      description: "Tableau de bord interne du Quizz du Berger : nombre d'utilisateurs et de réponses par jour.",
      robots: 'noindex, nofollow',
    }),
  component: Stats,
});
