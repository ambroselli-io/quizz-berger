import { createFileRoute } from '@tanstack/react-router';
import { seoHead } from '@app/utils/seo-head';
import Communique from '@app/pages/Communique';

export const Route = createFileRoute('/communique/2022-03-26')({
  head: () =>
    seoHead({
      title: 'Communiqué du 26 mars 2022 | Le Quizz du Berger',
      canonicalPath: '/communique/2022-03-26',
    }),
  component: Communique,
});
