import { useMemo } from 'react';
import { Link, useParams, Navigate } from 'react-router';
import { getCandidateBySlug, themeSlugMap, getCandidateAnswerForQuestion, candidateSlugMap } from '@app/utils/seo';
import Footer from '@app/components/Footer';

export default function CandidatePage() {
  const { candidateSlug } = useParams<{ candidateSlug: string }>();
  const candidate = useMemo(() => getCandidateBySlug(candidateSlug || ''), [candidateSlug]);

  if (!candidate) return <Navigate to="/" replace />;

  const positionsByTheme = useMemo(() => {
    return themeSlugMap.map((theme) => {
      const positions = theme.questions.map((q) => ({
        questionFr: q.fr,
        answer: getCandidateAnswerForQuestion(candidate.answers, q._id, q.answers),
      }));
      return { ...theme, positions };
    });
  }, [candidate]);

  const otherCandidates = candidateSlugMap.filter((c) => c.slug !== candidateSlug).slice(0, 6);

  return (
    <>
      <title>{`${candidate.pseudo} — Positions politiques 2027 | Le Quizz du Berger`}</title>
      <meta name="description" content={`Découvrez les positions politiques de ${candidate.pseudo} sur les 21 thèmes de l'élection présidentielle 2027. Comparez avec les autres candidats.`} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: candidate.pseudo,
            description: `Positions politiques de ${candidate.pseudo} pour l'élection présidentielle 2027`,
            url: `https://www.quizz-du-berger.com/candidat/${candidate.slug}`,
          }),
        }}
      />

      <div className="flex flex-col items-center bg-white">
        {/* Hero */}
        <section className="w-full bg-quizz-dark px-5 py-16 text-center text-white">
          <div className="mx-auto max-w-3xl">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="inline-block h-4 w-4 rounded-full" style={{ backgroundColor: candidate.color }} />
              <h1 className="font-[Merriweather] text-3xl font-bold leading-tight max-lg:text-2xl">
                {candidate.pseudo}
              </h1>
            </div>
            <p className="text-xl text-white/80">Positions politiques — Présidentielle 2027</p>
            <Link
              to="/themes"
              className="mt-8 inline-block rounded-full bg-yellow-400 px-8 py-3 font-semibold text-black no-underline hover:bg-yellow-300"
            >
              Comparez vos idées avec {candidate.pseudo}
            </Link>
          </div>
        </section>

        {/* Positions by theme */}
        <section className="mx-auto w-full max-w-4xl px-5 py-12">
          <h2 className="mb-8 font-[Merriweather] text-2xl font-bold text-quizz-dark">
            Positions de {candidate.pseudo} par thème
          </h2>
          <div className="space-y-8">
            {positionsByTheme.map((theme) => (
              <details key={theme.themeId} className="group rounded-lg border border-gray-200">
                <summary className="flex cursor-pointer items-center justify-between p-5 font-semibold text-quizz-dark">
                  <Link to={`/theme/${theme.slug}`} className="text-quizz-dark no-underline hover:underline" onClick={(e) => e.stopPropagation()}>
                    {theme.fr}
                  </Link>
                  <span className="text-sm text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="border-t border-gray-100 p-5">
                  <ul className="space-y-4">
                    {theme.positions.map((pos, idx) => (
                      <li key={idx}>
                        <p className="mb-1 text-sm font-medium text-gray-800">{pos.questionFr}</p>
                        <p className="text-sm italic" style={{ color: candidate.color }}>
                          {pos.answer ? `→ ${pos.answer}` : '— Pas de position renseignée'}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Other candidates */}
        <section className="w-full bg-gray-50 px-5 py-12">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 font-[Merriweather] text-xl font-bold text-quizz-dark">Voir aussi</h2>
            <div className="flex flex-wrap gap-3">
              {otherCandidates.map((c) => (
                <Link
                  key={c.id}
                  to={`/candidat/${c.slug}`}
                  className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-quizz-dark no-underline hover:bg-gray-50"
                >
                  <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                  {c.pseudo}
                </Link>
              ))}
              <Link
                to="/blog/candidats-presidentielles-2027"
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-blue-600 no-underline hover:bg-gray-50"
              >
                Tous les candidats →
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full bg-quizz-dark px-5 py-16 text-center text-white">
          <h2 className="mb-4 font-[Merriweather] text-2xl font-bold">Êtes-vous d'accord avec {candidate.pseudo} ?</h2>
          <p className="mb-8 text-white/80">
            Répondez au quiz pour découvrir si vos idées sont proches.
          </p>
          <Link
            to="/themes"
            className="inline-block rounded-full bg-yellow-400 px-8 py-3 font-semibold text-black no-underline hover:bg-yellow-300"
          >
            Faire le quiz
          </Link>
        </section>

        <Footer />
      </div>
    </>
  );
}
