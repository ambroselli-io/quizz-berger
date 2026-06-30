import { createFileRoute } from '@tanstack/react-router';
import { candidatesCount } from '@app/utils/seo';
import { seoHead } from '@app/utils/seo-head';
import CandidatesIndex from '@app/pages/CandidatesIndex';

export const Route = createFileRoute('/candidats')({
  head: () =>
    seoHead({
      title: 'Tous les candidats à la présidentielle 2027 | Le Quizz du Berger',
      description: `Découvrez les positions politiques des ${candidatesCount} candidats à l'élection présidentielle 2027 : programme, idées, comparaisons.`,
      canonicalPath: '/candidats',
    }),
  component: CandidatesIndex,
});
