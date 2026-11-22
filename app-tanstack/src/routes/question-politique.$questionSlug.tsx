import { createFileRoute, notFound } from '@tanstack/react-router';
import { getQuestionBySlug, candidateSlugMap, getCandidateAnswerForQuestion } from '@app/utils/seo';
import { questionOgImage, seoHead } from '@app/utils/seo-head';
import QuestionPolitiquePage from '@app/pages/QuestionPolitiquePage';

export const Route = createFileRoute('/question-politique/$questionSlug')({
  // `?reponse=N` (0-based) only changes the link preview: it highlights answer N,
  // for a social post that shares one answer. The canonical URL stays the same.
  validateSearch: (search: Record<string, unknown>): { reponse?: number } => {
    const reponse = Number(search.reponse);
    return Number.isInteger(reponse) && reponse >= 0 ? { reponse } : {};
  },
  loader: ({ params }) => {
    const question = getQuestionBySlug(params.questionSlug);
    if (!question) throw notFound();

    const candidateAnswers = candidateSlugMap
      .map((c) => ({
        pseudo: c.pseudo,
        answerText: getCandidateAnswerForQuestion(c.answers, question.questionId, question.answers),
      }))
      .filter((c) => c.answerText);

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: question.fr,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Les candidats à la présidentielle 2027 ont des positions variées sur cette question. ${question.answers
              .slice(0, 3)
              .map((a, i) => `Position ${i + 1} : "${a}"`)
              .join('. ')}.`,
          },
        },
        {
          '@type': 'Question',
          name: `Quels candidats sont pour ou contre sur la question : ${question.fr.toLowerCase()} ?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: candidateAnswers
              .slice(0, 5)
              .map((c) => `${c.pseudo} : "${c.answerText}"`)
              .join('. '),
          },
        },
      ],
    };

    return { question, faqSchema };
  },
  head: ({ loaderData, match }) => {
    if (!loaderData) return {};
    const { question, faqSchema } = loaderData;
    return seoHead({
      // No brand suffix: Google cuts around 60 characters and " | Le Quizz du Berger"
      // would eat 21 of them without ever being shown.
      title: question.seoTitle,
      description: question.seoDescription,
      canonicalPath: `/question-politique/${question.slug}`,
      ogImage: questionOgImage(question.questionId, match.search.reponse),
      jsonLd: faqSchema,
    });
  },
  component: QuestionPolitiquePage,
});
