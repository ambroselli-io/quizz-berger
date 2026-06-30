import { createFileRoute } from '@tanstack/react-router';
import { seoHead } from '@app/utils/seo-head';
import ComparerIndex from '@app/pages/ComparerIndex';

export const Route = createFileRoute('/comparer/')({
  head: () =>
    seoHead({
      title: 'Comparer les candidats à la présidentielle 2027 | Le Quizz du Berger',
      description:
        "Comparez les programmes des candidats à la présidentielle 2027 deux par deux : points d'accord, points de désaccord, thème par thème.",
      canonicalPath: '/comparer',
    }),
  component: ComparerIndex,
});
