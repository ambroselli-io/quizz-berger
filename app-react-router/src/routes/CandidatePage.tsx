import { useMemo } from 'react';
import { Link, useParams, Navigate } from 'react-router';
import {
  getCandidateBySlug,
  themeSlugMap,
  getCandidateAnswerForQuestion,
  candidateSlugMap,
  getComparisonPairsForCandidate,
  hotTopicQuestions,
  getQuestionSlugById,
} from '@app/utils/seo';
import Footer from '@app/components/Footer';

export default function CandidatePage() {
  const { candidateSlug } = useParams<{ candidateSlug: string }>();
  const candidate = useMemo(() => getCandidateBySlug(candidateSlug || ''), [candidateSlug]);

  if (!candidate) return <Navigate to="/" replace />;

  const positionsByTheme = useMemo(() => {
    return themeSlugMap.map((theme) => {
      const positions = theme.questions.map((q) => ({
        questionFr: q.fr,
        questionSlug: getQuestionSlugById(q._id),
        answer: getCandidateAnswerForQuestion(candidate.answers, q._id, q.answers),
      }));
      return { ...theme, positions };
    });
  }, [candidate]);

  const otherCandidates = candidateSlugMap.filter((c) => c.slug !== candidateSlug).slice(0, 6);

  const candidateComparisons = useMemo(
    () => getComparisonPairsForCandidate(candidate.slug),
    [candidate.slug],
  );

  const candidateHotTopics = useMemo(() => {
    return hotTopicQuestions
      .map((q) => ({
        ...q,
        answerText: getCandidateAnswerForQuestion(candidate.answers, q.questionId, q.answers),
      }))
      .filter((q) => q.answerText)
      .slice(0, 12);
  }, [candidate]);

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
                        {pos.questionSlug ? (
                          <Link
                            to={`/question-politique/${pos.questionSlug}`}
                            className="mb-1 block text-sm font-medium text-gray-800 no-underline hover:text-blue-700 hover:underline"
                          >
                            {pos.questionFr}
                          </Link>
                        ) : (
                          <p className="mb-1 text-sm font-medium text-gray-800">{pos.questionFr}</p>
                        )}
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

        {/* Hot-topic positions */}
        {candidateHotTopics.length > 0 && (
          <section className="w-full bg-white px-5 py-12">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-2 font-[Merriweather] text-xl font-bold text-quizz-dark">
                {candidate.pseudo} sur les sujets sensibles
              </h2>
              <p className="mb-6 text-sm text-gray-600">
                Découvrez la position de {candidate.pseudo} sur les grands sujets de la présidentielle 2027.
              </p>
              <ul className="grid gap-3 lg:grid-cols-2">
                {candidateHotTopics.map((q) => (
                  <li key={q.questionId}>
                    <Link
                      to={`/question-politique/${q.slug}`}
                      className="block rounded-lg border border-gray-200 p-4 no-underline transition hover:shadow-sm"
                    >
                      <p className="text-sm font-semibold text-quizz-dark">{q.fr}</p>
                      <p className="mt-1 text-xs italic" style={{ color: candidate.color }}>
                        → {q.answerText}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Comparer with opponents */}
        {candidateComparisons.length > 0 && (
          <section className="w-full bg-gray-50 px-5 py-12">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-2 font-[Merriweather] text-xl font-bold text-quizz-dark">
                Comparer {candidate.pseudo} avec d'autres candidats
              </h2>
              <p className="mb-6 text-sm text-gray-600">
                Voyez les points d'accord et de désaccord, thème par thème.
              </p>
              <div className="grid gap-3 lg:grid-cols-2">
                {candidateComparisons.map((pair) => {
                  const otherName =
                    pair.candidate1Slug === candidate.slug ? pair.candidate2Name : pair.candidate1Name;
                  return (
                    <Link
                      key={pair.slug}
                      to={`/comparer/${pair.slug}`}
                      className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 no-underline transition hover:shadow-sm"
                    >
                      <span className="text-sm font-medium text-quizz-dark">
                        {candidate.pseudo} <span className="text-gray-400">vs</span> {otherName}
                      </span>
                      <span className="text-sm text-blue-600">→</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Other candidates */}
        <section className="w-full bg-white px-5 py-12">
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
