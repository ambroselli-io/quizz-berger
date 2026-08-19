import { createFileRoute, notFound } from '@tanstack/react-router';
import {
  getPartyBySlug,
  partyHasThemePage,
  themeSeoLabel,
  themeProseLabel,
} from '@app/utils/parties';
import { getThemeBySlug, candidatesCount } from '@app/utils/seo';
import { seoHead } from '@app/utils/seo-head';
import PartyThemePage from '@app/pages/PartyThemePage';

export const Route = createFileRoute('/parti/$partySlug/$themeSlug')({
  loader: ({ params }) => {
    const party = getPartyBySlug(params.partySlug);
    const theme = getThemeBySlug(params.themeSlug);
    // Only the curated party x theme couples exist: everything else is a 404, not a
    // near-empty page Google would file under "Crawled - currently not indexed".
    if (!party || !theme || !partyHasThemePage(party, theme.slug)) throw notFound();
    return { party, theme };
  },
  head: ({ loaderData }) => {
    const party = loaderData?.party;
    const theme = loaderData?.theme;
    if (!party || !theme) return {};
    const seoLabel = themeSeoLabel(theme);
    const proseLabel = themeProseLabel(theme);
    return seoHead({
      title: `Programme ${party.name} 2027 : ${seoLabel} | Le Quizz du Berger`,
      description: `Ce que ${party.theName} ${party.plural ? 'proposent' : 'propose'} sur ${proseLabel} pour 2027 : ses réponses aux ${theme.questions.length} questions du thème, et qui d'autre répond pareil parmi les ${candidatesCount} personnalités du quiz.`,
      canonicalPath: `/parti/${party.slug}/${theme.slug}`,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Les partis',
            item: 'https://www.quizz-du-berger.com/partis',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: party.name,
            item: `https://www.quizz-du-berger.com/parti/${party.slug}`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: theme.fr,
            item: `https://www.quizz-du-berger.com/parti/${party.slug}/${theme.slug}`,
          },
        ],
      },
    });
  },
  component: PartyThemePage,
});
