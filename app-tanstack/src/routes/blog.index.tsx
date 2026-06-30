import { createFileRoute } from '@tanstack/react-router';
import { seoHead } from '@app/utils/seo-head';
import BlogIndex from '@app/pages/BlogIndex';

export const Route = createFileRoute('/blog/')({
  head: () =>
    seoHead({
      title: 'Blog — Le Quizz du Berger | Présidentielle 2027',
      description:
        "Articles sur l'élection présidentielle 2027 : candidats, programmes, thèmes politiques, comparatifs et analyses.",
      canonicalPath: '/blog',
    }),
  component: BlogIndex,
});
