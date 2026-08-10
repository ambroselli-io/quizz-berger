import { createFileRoute } from '@tanstack/react-router';
import { quizzQuestionsCount, quizzThemesCount } from '@app/utils/quizz';
import { seoHead } from '@app/utils/seo-head';
import AllQuestions from '@app/pages/AllQuestions';

export const Route = createFileRoute('/all-questions/')({
  head: () =>
    seoHead({
      title: 'Toutes les questions | Le Quizz du Berger',
      description: `Les ${quizzQuestionsCount} questions du Quizz du Berger, réparties en ${quizzThemesCount} thèmes de la présidentielle 2027, avec toutes les réponses possibles.`,
      canonicalPath: '/all-questions',
    }),
  component: AllQuestions,
});
