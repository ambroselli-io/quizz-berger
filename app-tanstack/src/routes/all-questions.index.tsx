import { createFileRoute } from '@tanstack/react-router';
import { quizzQuestionsCount, quizzThemesCount } from '@app/utils/quizz';
import { seoHead } from '@app/utils/seo-head';
import AllQuestions from '@app/pages/AllQuestions';

export const Route = createFileRoute('/all-questions/')({
  head: () =>
    seoHead({
      title: `${quizzQuestionsCount} questions pour 2027 | Le Quizz du Berger`,
      description: `La liste complète des ${quizzQuestionsCount} questions posées aux candidats à la présidentielle 2027, réparties en ${quizzThemesCount} thèmes, avec toutes les réponses possibles.`,
      canonicalPath: '/all-questions',
    }),
  component: AllQuestions,
});
