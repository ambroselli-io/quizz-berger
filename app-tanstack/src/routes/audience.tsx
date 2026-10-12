import { createFileRoute } from '@tanstack/react-router';
import { seoHead } from '@app/utils/seo-head';
import Audience from '@app/pages/Audience';

export const Route = createFileRoute('/audience')({
  // Admin-only dashboard (the API refuses non-admins): kept out of the index, the sitemap and robots.txt.
  head: () =>
    seoHead({
      title: 'Audience | Le Quizz du Berger',
      description: "Tableau de bord interne du Quizz du Berger : visites, sources de trafic et robots.",
      robots: 'noindex, nofollow',
    }),
  component: Audience,
});
