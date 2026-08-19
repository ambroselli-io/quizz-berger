import { createFileRoute, notFound } from '@tanstack/react-router';
import { getPartyBySlug, deNameList } from '@app/utils/parties';
import { quizzQuestionsCount, quizzThemesCount } from '@app/utils/quizz';
import { seoHead } from '@app/utils/seo-head';
import PartyPage from '@app/pages/PartyPage';

export const Route = createFileRoute('/parti/$partySlug/')({
  loader: ({ params }) => {
    const party = getPartyBySlug(params.partySlug);
    if (!party) throw notFound();
    return { party };
  },
  head: ({ loaderData }) => {
    const party = loaderData?.party;
    if (!party) return {};
    const names = deNameList(party.candidates.map((c) => c.pseudo));
    // "Renaissance (Renaissance)" reads as a bug: only repeat the acronym when it differs.
    const acronym = party.shortName === party.name ? '' : ` (${party.shortName})`;
    return seoHead({
      title: `Programme ${party.name} 2027 : toutes ses positions | Le Quizz du Berger`,
      description: `Le programme ${party.ofName}${acronym} pour la présidentielle 2027 : ses positions sur ${quizzQuestionsCount} questions et ${quizzThemesCount} thèmes, celles ${names}, et les partis les plus proches.`,
      canonicalPath: `/parti/${party.slug}`,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: party.name,
        alternateName: party.shortName,
        foundingDate: String(party.foundedYear),
        description: party.intro,
        url: `https://www.quizz-du-berger.com/parti/${party.slug}`,
        sameAs: party.officialSite,
        member: party.candidates.map((candidate) => ({
          '@type': 'Person',
          name: candidate.pseudo,
          url: `https://www.quizz-du-berger.com/candidat/${candidate.slug}`,
        })),
      },
    });
  },
  component: PartyPage,
});
