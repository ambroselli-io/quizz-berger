import { createFileRoute } from '@tanstack/react-router';
import { seoHead } from '@app/utils/seo-head';
import ResultIndex from '@app/pages/ResultIndex';

export const Route = createFileRoute('/result/')({
  head: () =>
    seoHead({
      title: 'Vos résultats | Le Quizz du Berger',
      canonicalPath: '/result',
    }),
  component: ResultIndex,
});
