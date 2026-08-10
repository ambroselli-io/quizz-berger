import { createFileRoute } from '@tanstack/react-router';
import { quizz } from '@app/utils/quizz';
import { questionSlugMap } from '@app/utils/seo';
import { seoHead } from '@app/utils/seo-head';
import Question from '@app/pages/Question';

export const Route = createFileRoute('/question/$themeId/$questionId')({
  head: ({ params }) => {
    const theme = quizz.find((t) => t._id === params.themeId);
    const question = theme?.questions.find((q) => q._id === params.questionId);
    if (!theme || !question) return {};
    // Every question also has a public SEO twin at /question-politique/{slug} with
    // the same content. Canonicalize to it so the two don't compete, and reuse its
    // description instead of falling back to the site-wide default on ~100 pages.
    const seoTwin = questionSlugMap.find((q) => q.questionId === question._id);
    return seoHead({
      title: `${question.fr} - ${theme.fr} | Le Quizz du Berger`,
      description: seoTwin?.seoDescription,
      canonicalPath: seoTwin
        ? `/question-politique/${seoTwin.slug}`
        : `/question/${params.themeId}/${params.questionId}`,
    });
  },
  component: Question,
});
