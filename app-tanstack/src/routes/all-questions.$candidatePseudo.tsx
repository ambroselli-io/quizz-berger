import { createFileRoute } from '@tanstack/react-router';
import { seoHead } from '@app/utils/seo-head';
import AllQuestions from '@app/pages/AllQuestions';

export const Route = createFileRoute('/all-questions/$candidatePseudo')({
  head: ({ params }) => {
    const pseudo = decodeURIComponent(params.candidatePseudo);
    // Same question list as /all-questions, only the highlighted answers differ, and
    // the pseudo can be any user's friend. Keep it out of the index: /all-questions
    // and /candidat/{slug} are the pages meant to rank.
    return seoHead({
      title: `Toutes les questions vues par ${pseudo} | Le Quizz du Berger`,
      description: `Les réponses de ${pseudo} à toutes les questions du Quizz du Berger, question par question.`,
      robots: 'noindex, follow',
    });
  },
  component: AllQuestions,
});
