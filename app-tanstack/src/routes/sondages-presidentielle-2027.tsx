import { createFileRoute } from '@tanstack/react-router';
import { candidatesCount } from '@app/utils/seo';
import { seoHead } from '@app/utils/seo-head';
import sondages from '@app/content/sondages-2027.json';
import SondagesPage from '@app/pages/SondagesPage';

export const Route = createFileRoute('/sondages-presidentielle-2027')({
  head: () =>
    seoHead({
      title: `Sondages présidentielle 2027 : la courbe mois par mois | Le Quizz du Berger`,
      description: `Moyenne des intentions de vote au premier tour de la présidentielle 2027, sur ${sondages.pollCount} sondages. Mise à jour chaque semaine, et la liste des candidats qu'aucun institut ne teste.`,
      canonicalPath: '/sondages-presidentielle-2027',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Dataset',
        name: 'Sondages du premier tour de la présidentielle française de 2027',
        description: `Moyennes mensuelles des intentions de vote au premier tour de l'élection présidentielle française de 2027, agrégées à partir de ${sondages.pollCount} sondages, et couverture des ${candidatesCount} candidats du Quizz du Berger.`,
        url: 'https://www.quizz-du-berger.com/sondages-presidentielle-2027',
        temporalCoverage: `${sondages.months[0]}/${sondages.lastPollDate}`,
        dateModified: sondages.fetchedAt,
        license: 'https://opensource.org/licenses/MIT',
        isBasedOn: sondages.source.url,
        creator: { '@type': 'Organization', name: 'Le Quizz du Berger' },
      },
    }),
  component: SondagesPage,
});
