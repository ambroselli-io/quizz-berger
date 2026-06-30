import { createFileRoute } from '@tanstack/react-router';
import { quizz } from '@app/utils/quizz';
import { seoHead } from '@app/utils/seo-head';
import Question from '@app/pages/Question';

export const Route = createFileRoute('/question/$themeId/$questionId')({
  head: ({ params }) => {
    const theme = quizz.find((t) => t._id === params.themeId);
    const question = theme?.questions.find((q) => q._id === params.questionId);
    if (!theme || !question) return {};
    return seoHead({
      title: `${question.fr} - ${theme.fr} | Le Quizz du Berger`,
      canonicalPath: `/question/${params.themeId}/${params.questionId}`,
    });
  },
  component: Question,
});
