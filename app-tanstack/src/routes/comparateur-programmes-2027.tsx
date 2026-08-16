import { createFileRoute } from '@tanstack/react-router';
import { candidatesCount } from '@app/utils/seo';
import { quizzQuestionsCount, quizzThemesCount } from '@app/utils/quizz';
import { seoHead } from '@app/utils/seo-head';
import ComparateurProgrammes from '@app/pages/ComparateurProgrammes';

export const Route = createFileRoute('/comparateur-programmes-2027')({
  head: () =>
    seoHead({
      title: `Comparateur de programmes — Présidentielle 2027 | Le Quizz du Berger`,
      description: `Comparez les programmes des ${candidatesCount} candidats à la présidentielle 2027 sur ${quizzQuestionsCount} questions et ${quizzThemesCount} thèmes. Choisissez vos candidats et voyez leurs réponses côte à côte.`,
      canonicalPath: '/comparateur-programmes-2027',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Comparateur de programmes — Présidentielle 2027',
        applicationCategory: 'ReferenceApplication',
        operatingSystem: 'Web',
        url: 'https://www.quizz-du-berger.com/comparateur-programmes-2027',
        description: `Comparateur des programmes des ${candidatesCount} candidats à l'élection présidentielle française de 2027, sur ${quizzQuestionsCount} questions.`,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
      },
    }),
  component: ComparateurProgrammes,
});
