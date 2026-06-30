import { createFileRoute } from '@tanstack/react-router';
import { themeSlugMap } from '@app/utils/seo';
import { seoHead } from '@app/utils/seo-head';
import SujetsIndex from '@app/pages/SujetsIndex';

export const Route = createFileRoute('/sujets')({
  head: () =>
    seoHead({
      title: 'Tous les sujets de la présidentielle 2027 | Le Quizz du Berger',
      description: `Explorez les ${themeSlugMap.length} thèmes et les sujets clés de l'élection présidentielle 2027 : positions des candidats, programmes, comparatifs.`,
      canonicalPath: '/sujets',
    }),
  component: SujetsIndex,
});
