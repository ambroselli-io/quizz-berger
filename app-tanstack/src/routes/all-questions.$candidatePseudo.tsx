import { createFileRoute } from '@tanstack/react-router';
import { seoHead } from '@app/utils/seo-head';
import AllQuestions from '@app/pages/AllQuestions';

export const Route = createFileRoute('/all-questions/$candidatePseudo')({
  head: () =>
    seoHead({
      title: 'Toutes les questions | Le Quizz du Berger',
    }),
  component: AllQuestions,
});
