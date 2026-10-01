import { createFileRoute, notFound } from '@tanstack/react-router';
import { getCandidacyBySlug, formatEventDate, type CandidacyEntry } from '@app/utils/candidacies';
import { seoHead } from '@app/utils/seo-head';
import CandidacyPage from '@app/pages/CandidacyPage';

function pageTitle(candidacy: CandidacyEntry): string {
  const name = candidacy.candidate.pseudo;
  const e = candidacy.feminine ? 'e' : '';
  if (candidacy.status === 'declared') return `${name} est candidat${e} à la présidentielle 2027`;
  if (candidacy.status === 'withdrawn') return `${name} ne sera pas candidat${e} à la présidentielle 2027`;
  return `${name} sera-t-${candidacy.feminine ? 'elle' : 'il'} candidat${e} à la présidentielle 2027 ?`;
}

export const Route = createFileRoute('/candidature/$candidateSlug')({
  loader: ({ params }) => {
    const candidacy = getCandidacyBySlug(params.candidateSlug);
    if (!candidacy) throw notFound();
    const dated = candidacy.events.find(
      (e) => e.type === (candidacy.status === 'withdrawn' ? 'withdrawal' : 'declaration'),
    );
    // Formatted here rather than in head(): utils/candidacies stays out of the main bundle.
    return { candidacy, dated, when: dated ? ` (${formatEventDate(dated.date)})` : '' };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { candidacy, dated, when } = loaderData;
    const name = candidacy.candidate.pseudo;
    const title = pageTitle(candidacy);
    return seoHead({
      title: `${title} | Le Quizz du Berger`,
      description: `${candidacy.summary.slice(0, 200)}`,
      canonicalPath: `/candidature/${candidacy.slug}`,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: `${title}${when}`,
          description: candidacy.summary,
          url: `https://www.quizz-du-berger.com/candidature/${candidacy.slug}`,
          ...(dated ? { datePublished: dated.date, dateModified: dated.date } : {}),
          about: {
            '@type': 'Person',
            name,
            url: `https://www.quizz-du-berger.com/candidat/${candidacy.slug}`,
          },
          citation: candidacy.events.flatMap((event) =>
            event.sources.map((source) => ({
              '@type': 'CreativeWork',
              name: source.label,
              url: source.url,
            })),
          ),
        },
      ],
    });
  },
  component: CandidacyPage,
});
