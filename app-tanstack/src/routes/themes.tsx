import { createFileRoute } from '@tanstack/react-router';
import { quizzThemesCount, quizzQuestionsCount } from '@app/utils/quizz';
import { candidatesCount } from '@app/utils/seo';
import { seoHead } from '@app/utils/seo-head';
import Themes from '@app/pages/Themes';

export const Route = createFileRoute('/themes')({
  head: () =>
    seoHead({
      title: 'Répondez au quiz | Le Quizz du Berger',
      description: `Présidentielle 2027 - ${quizzThemesCount} thèmes, ${quizzQuestionsCount} questions, ${candidatesCount} candidats. Répondez au quiz pour découvrir quel candidat pense comme vous.`,
      canonicalPath: '/themes',
    }),
  component: Themes,
});
