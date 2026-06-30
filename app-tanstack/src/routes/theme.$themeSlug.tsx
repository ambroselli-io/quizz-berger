import { createFileRoute, notFound } from '@tanstack/react-router';
import { getThemeBySlug, candidatesCount } from '@app/utils/seo';
import { seoHead } from '@app/utils/seo-head';
import ThemePage from '@app/pages/ThemePage';

export const Route = createFileRoute('/theme/$themeSlug')({
  loader: ({ params }) => {
    const theme = getThemeBySlug(params.themeSlug);
    if (!theme) throw notFound();
    return { theme };
  },
  head: ({ loaderData }) => {
    const theme = loaderData?.theme;
    if (!theme) return {};
    return seoHead({
      title: `${theme.fr} — Élection présidentielle 2027 | Le Quizz du Berger`,
      description: `Que proposent les ${candidatesCount} candidats à la présidentielle 2027 sur le thème : ${theme.fr} ? Découvrez leurs positions et comparez avec les vôtres.`,
      canonicalPath: `/theme/${theme.slug}`,
    });
  },
  component: ThemePage,
});
