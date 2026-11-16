import { createFileRoute } from '@tanstack/react-router';
import { seoHead } from '@app/utils/seo-head';
import QuickQuizz from '@app/pages/QuickQuizz';

export const Route = createFileRoute('/quiz-rapide')({
  head: () =>
    seoHead({
      title: 'Quiz rapide | Le Quizz du Berger',
      // A redirect into the quiz, not a landing page: the home page is the one that ranks.
      robots: 'noindex, follow',
    }),
  component: QuickQuizz,
});
