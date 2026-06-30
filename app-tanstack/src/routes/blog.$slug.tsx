import { createFileRoute, notFound } from '@tanstack/react-router';
import { articles } from '@app/content/articles';
import { seoHead } from '@app/utils/seo-head';
import BlogArticle from '@app/pages/BlogArticle';

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => {
    const article = articles.find((a) => a.slug === params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    const article = loaderData?.article;
    if (!article) return {};
    return seoHead({
      title: `${article.title} | Le Quizz du Berger`,
      description: article.excerpt,
      canonicalPath: `/blog/${article.slug}`,
      jsonLd: article.schema,
    });
  },
  component: BlogArticle,
});
