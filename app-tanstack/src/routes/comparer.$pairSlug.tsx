import { createFileRoute, notFound } from '@tanstack/react-router';
import { getCandidateBySlug, getCanonicalPairSlug, themeSlugMap } from '@app/utils/seo';
import { quizzThemesCount } from '@app/utils/quizz';
import { seoHead } from '@app/utils/seo-head';
import ComparaisonPage from '@app/pages/ComparaisonPage';

export const Route = createFileRoute('/comparer/$pairSlug')({
  loader: ({ params }) => {
    const [slug1, slug2] = params.pairSlug.split('-vs-');
    const candidate1 = getCandidateBySlug(slug1 || '');
    const candidate2 = getCandidateBySlug(slug2 || '');
    if (!candidate1 || !candidate2) throw notFound();

    // Agreement percentage across all questions (same computation as the page).
    let agreements = 0;
    let total = 0;
    for (const theme of themeSlugMap) {
      for (const q of theme.questions) {
        const idx1 = candidate1.answers.find((a) => a.questionId === q._id)?.answerIndex ?? -1;
        const idx2 = candidate2.answers.find((a) => a.questionId === q._id)?.answerIndex ?? -1;
        if (idx1 !== -1 && idx2 !== -1) {
          total++;
          if (idx1 === idx2) agreements++;
        }
      }
    }
    const agreementPercent = total > 0 ? Math.round((agreements / total) * 100) : 0;
    const canonicalSlug = getCanonicalPairSlug(candidate1.slug, candidate2.slug);

    return {
      pseudo1: candidate1.pseudo,
      pseudo2: candidate2.pseudo,
      agreementPercent,
      canonicalSlug,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { pseudo1, pseudo2, agreementPercent, canonicalSlug } = loaderData;
    return seoHead({
      title: `${pseudo1} vs ${pseudo2} — Comparaison présidentielle 2027 | Le Quizz du Berger`,
      description: `Comparez les positions de ${pseudo1} et ${pseudo2} sur les ${quizzThemesCount} thèmes de la présidentielle 2027. ${agreementPercent}% d'accord.`,
      canonicalPath: `/comparer/${canonicalSlug}`,
    });
  },
  component: ComparaisonPage,
});
