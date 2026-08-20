import { createFileRoute } from '@tanstack/react-router';
import {
  declaredCandidacies,
  declaredCount,
  withdrawnCount,
  potentialCount,
  latestTimelineItem,
  formatEventDate,
} from '@app/utils/candidacies';
import { seoHead } from '@app/utils/seo-head';
import CandidaciesPage from '@app/pages/CandidaciesPage';

export const Route = createFileRoute('/qui-est-candidat-2027')({
  head: () => {
    const latest = latestTimelineItem;
    const lastMove = latest
      ? ` Dernier mouvement : ${latest.candidacy.candidate.pseudo}, le ${formatEventDate(latest.event.date)}.`
      : '';
    return seoHead({
      title: `Qui est candidat à la présidentielle 2027 ? La liste à jour | Le Quizz du Berger`,
      description: `${declaredCount} candidats déclarés, ${withdrawnCount} qui ont renoncé, ${potentialCount} pas encore déclarés : la chronologie datée et sourcée des candidatures à la présidentielle 2027.${lastMove}`,
      canonicalPath: '/qui-est-candidat-2027',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Qui est candidat à la présidentielle 2027 ?',
          description: `Chronologie des candidatures à l'élection présidentielle française de 2027 : ${declaredCount} candidats déclarés, ${withdrawnCount} retraits, ${potentialCount} candidats pressentis.`,
          url: 'https://www.quizz-du-berger.com/qui-est-candidat-2027',
          hasPart: declaredCandidacies.map((candidacy) => ({
            '@type': 'Person',
            name: candidacy.candidate.pseudo,
            url: `https://www.quizz-du-berger.com/candidature/${candidacy.slug}`,
          })),
        },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Combien y a-t-il de candidats à la présidentielle 2027 ?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: `À ce jour, ${declaredCount} personnes ont annoncé publiquement leur candidature à l'élection présidentielle de 2027. La liste officielle sera arrêtée par le Conseil constitutionnel après le dépôt des 500 parrainages, quelques semaines avant le premier tour du 18 avril 2027.`,
              },
            },
            {
              '@type': 'Question',
              name: 'Qui a renoncé à être candidat en 2027 ?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: `${withdrawnCount} personnalités ont quitté la course ou annoncé qu'elles n'y entreraient pas. Chaque retrait est daté et renvoie vers l'article de presse qui le rapporte.`,
              },
            },
          ],
        },
      ],
    });
  },
  component: CandidaciesPage,
});
