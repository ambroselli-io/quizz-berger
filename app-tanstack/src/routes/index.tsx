import { createFileRoute } from '@tanstack/react-router';
import { homeTitle, homeDescription, homeFaqJsonLd } from '@app/utils/seo-light';
import { seoHead } from '@app/utils/seo-head';
import Home from '@app/pages/Home';

export const Route = createFileRoute('/')({
  head: () =>
    seoHead({
      title: homeTitle,
      description: homeDescription,
      canonicalPath: '/',
      jsonLd: homeFaqJsonLd,
    }),
  component: Home,
});
