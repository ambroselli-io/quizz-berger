import { createFileRoute, notFound } from '@tanstack/react-router';
import { getCandidateBySlug } from '@app/utils/seo';
import { quizzThemesCount } from '@app/utils/quizz';
import { seoHead } from '@app/utils/seo-head';
import CandidatePage from '@app/pages/CandidatePage';

export const Route = createFileRoute('/candidat/$candidateSlug')({
  loader: ({ params }) => {
    const candidate = getCandidateBySlug(params.candidateSlug);
    if (!candidate) throw notFound();
    return { candidate };
  },
  head: ({ loaderData }) => {
    const candidate = loaderData?.candidate;
    if (!candidate) return {};
    return seoHead({
      title: `${candidate.pseudo} : programme et positions 2027 | Le Quizz du Berger`,
      description: `Le programme de ${candidate.pseudo} pour la présidentielle 2027, sur les ${quizzThemesCount} thèmes du quiz, et les candidats les plus proches de ${candidate.pseudo}.`,
      canonicalPath: `/candidat/${candidate.slug}`,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: candidate.pseudo,
        description: `Positions politiques de ${candidate.pseudo} pour l'élection présidentielle 2027`,
        url: `https://www.quizz-du-berger.com/candidat/${candidate.slug}`,
      },
    });
  },
  component: CandidatePage,
});
