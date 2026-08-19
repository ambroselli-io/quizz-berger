import { createFileRoute } from '@tanstack/react-router';
import { candidatesCount } from '@app/utils/seo';
import { quizzQuestionsCount } from '@app/utils/quizz';
import { partyList, partiesCount } from '@app/utils/parties';
import { seoHead } from '@app/utils/seo-head';
import PartiesIndex from '@app/pages/PartiesIndex';

export const Route = createFileRoute('/partis')({
  head: () =>
    seoHead({
      title: `Programmes des partis politiques 2027 : le comparatif | Le Quizz du Berger`,
      description: `Les programmes des ${partiesCount} partis politiques français pour la présidentielle 2027, comparés sur ${quizzQuestionsCount} questions. RN, LFI, LR, PS, Renaissance : qui propose quoi, et quel parti vous correspond.`,
      canonicalPath: '/partis',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Programmes des partis politiques 2027',
          description: `Les programmes des ${partiesCount} partis politiques français pour la présidentielle 2027, comparés sur ${quizzQuestionsCount} questions posées dans les mêmes termes à ${candidatesCount} personnalités.`,
          url: 'https://www.quizz-du-berger.com/partis',
          hasPart: partyList.map((party) => ({
            '@type': 'Organization',
            name: party.name,
            alternateName: party.shortName,
            foundingDate: String(party.foundedYear),
            url: `https://www.quizz-du-berger.com/parti/${party.slug}`,
            sameAs: party.officialSite,
          })),
        },
      ],
    }),
  component: PartiesIndex,
});
