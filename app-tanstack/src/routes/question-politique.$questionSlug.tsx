import { createFileRoute, notFound } from '@tanstack/react-router';
import { getQuestionBySlug, candidateSlugMap, getCandidateAnswerForQuestion } from '@app/utils/seo';
import { seoHead } from '@app/utils/seo-head';
import QuestionPolitiquePage from '@app/pages/QuestionPolitiquePage';

export const Route = createFileRoute('/question-politique/$questionSlug')({
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
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { question, faqSchema } = loaderData;
    return seoHead({
      title: `${question.seoTitle} | Le Quizz du Berger`,
      description: question.seoDescription,
      canonicalPath: `/question-politique/${question.slug}`,
      jsonLd: faqSchema,
    });
  },
  component: QuestionPolitiquePage,
});
