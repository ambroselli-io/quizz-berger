import { createFileRoute } from '@tanstack/react-router';
import { seoHead } from '@app/utils/seo-head';
import Communique from '@app/pages/Communique';

export const Route = createFileRoute('/communique/2022-03-26')({
  head: () =>
    seoHead({
      title: 'Communiqué du 26 mars 2022 | Le Quizz du Berger',
      description:
        "45 000 tests et 2 millions de réponses : le communiqué du 26 mars 2022 sur l'algorithme du Quizz du Berger, sa construction et ses objectifs.",
      canonicalPath: '/communique/2022-03-26',
    }),
  component: Communique,
});
