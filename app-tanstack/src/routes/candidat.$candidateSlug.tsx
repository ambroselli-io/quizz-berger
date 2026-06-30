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
      title: `${candidate.pseudo} — Positions politiques 2027 | Le Quizz du Berger`,
      description: `Découvrez les positions politiques de ${candidate.pseudo} sur les ${quizzThemesCount} thèmes de l'élection présidentielle 2027. Comparez avec les autres candidats.`,
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
