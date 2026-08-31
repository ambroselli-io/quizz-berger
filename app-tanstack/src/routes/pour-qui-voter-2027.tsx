import { createFileRoute } from '@tanstack/react-router';
import { candidatesCount } from '@app/utils/seo';
import { quizzQuestionsCount, quizzThemesCount } from '@app/utils/quizz';
import { seoHead } from '@app/utils/seo-head';
import PourQuiVoterPage from '@app/pages/PourQuiVoterPage';

export const Route = createFileRoute('/pour-qui-voter-2027')({
  head: () =>
    seoHead({
      title: 'Pour qui voter en 2027 ? Le test politique de la présidentielle',
      description: `Pour qui voter à la présidentielle 2027 ? Faites le test politique : ${quizzQuestionsCount} questions sur ${quizzThemesCount} thèmes, ${candidatesCount} candidats classés selon vos réponses. Gratuit, sans inscription.`,
      canonicalPath: '/pour-qui-voter-2027',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Pour qui voter en 2027 ?',
          url: 'https://www.quizz-du-berger.com/pour-qui-voter-2027',
          description: `Test politique pour la présidentielle 2027 : ${quizzQuestionsCount} questions, ${quizzThemesCount} thèmes, ${candidatesCount} candidats comparés à vos réponses.`,
        },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Comment savoir pour qui voter à la présidentielle 2027 ?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: `Comparez vos idées aux positions des candidats plutôt qu'à leurs slogans. Le Quizz du Berger pose ${quizzQuestionsCount} questions concrètes sur ${quizzThemesCount} thèmes et classe les ${candidatesCount} candidats du plus proche au plus éloigné de vos réponses, globalement et thème par thème.`,
              },
            },
            {
              '@type': 'Question',
              name: 'Le test politique est-il gratuit ?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Oui, gratuit et sans inscription. Le code est open-source. Créer un pseudo est facultatif et sert seulement à retrouver ses résultats ou à les comparer avec ceux de ses amis.',
              },
            },
            {
              '@type': 'Question',
              name: 'Combien de temps prend le test ?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: `Cinq minutes pour un premier classement sur un ou deux thèmes, trente à quarante minutes pour répondre aux ${quizzQuestionsCount} questions.`,
              },
            },
            {
              '@type': 'Question',
              name: 'Les candidats ont-ils répondu eux-mêmes ?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Non. Leurs réponses sont établies à partir de leurs programmes officiels, de leurs déclarations publiques et de leurs votes. Chaque page candidat détaille ses réponses question par question.',
              },
            },
          ],
        },
      ],
    }),
  component: PourQuiVoterPage,
});
