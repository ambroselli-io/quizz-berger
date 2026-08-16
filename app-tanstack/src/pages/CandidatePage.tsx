import { useMemo } from 'react';
import { Link, useParams } from '@app/lib/router';
import {
  getCandidateBySlug,
  themeSlugMap,
  getCandidateAnswerForQuestion,
  candidateSlugMap,
  getComparisonPairsForCandidate,
  hotTopicQuestions,
  getQuestionSlugById,
  candidatesCount,
} from '@app/utils/seo';
import { quizzQuestionsCount } from '@app/utils/quizz';
import { getCandidateProximityRanking } from '@app/utils/proximity';
import { getPollingForCandidate, formatMonthLong, sondagesData } from '@app/utils/sondages';
import { articles } from '@app/content/articles';
import Footer from '@app/components/Footer';

export default function CandidatePage() {
  const { candidateSlug } = useParams<{ candidateSlug: string }>();
  const candidate = useMemo(() => getCandidateBySlug(candidateSlug || ''), [candidateSlug]);

  if (!candidate) return null; // loader throws notFound() for unknown slugs

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

  const proximityRanking = useMemo(
    () => getCandidateProximityRanking(candidate.slug),
    [candidate.slug],
  );
  const closestCandidates = proximityRanking.slice(0, 5);
  const furthestCandidates = proximityRanking.slice(-3).reverse();

  const polling = useMemo(() => getPollingForCandidate(candidate.slug), [candidate.slug]);

  const positioningArticle = useMemo(
    () => articles.find((a) => a.slug === `${candidate.slug}-droite-ou-gauche`),
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

        {/* Closest and most distant candidates */}
        {closestCandidates.length > 0 && (
          <section className="w-full bg-gray-50 px-5 py-12">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-2 font-[Merriweather] text-2xl font-bold text-quizz-dark">
                Quels candidats sont les plus proches de {candidate.pseudo} ?
              </h2>
              <p className="mb-6 text-sm text-gray-600">
                Nous avons comparé les réponses de {candidate.pseudo} à celles des{' '}
                {candidatesCount - 1} autres candidats, sur les {closestCandidates[0].comparedQuestions}{' '}
                questions du quiz. Voici les plus proches.
              </p>
              <ol className="space-y-3">
                {closestCandidates.map((other, rank) => (
                  <li key={other.slug}>
                    <Link
                      to={`/comparer/${other.pairSlug}`}
                      className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 no-underline transition hover:shadow-sm"
                    >
                      <span className="w-5 shrink-0 text-lg font-bold text-gray-300">{rank + 1}</span>
                      <span className="inline-block h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: other.color }} />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-quizz-dark">{other.pseudo}</span>
                        <span className="block text-xs text-gray-500">
                          {other.sameAnswers} réponses identiques sur {other.comparedQuestions}
                        </span>
                        <span className="mt-2 block h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                          <span
                            className="block h-full rounded-full"
                            style={{ width: `${other.percent}%`, backgroundColor: other.color }}
                          />
                        </span>
                      </span>
                      <span className="shrink-0 text-lg font-bold" style={{ color: other.color }}>
                        {other.percent}%
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>

              {furthestCandidates.length > 0 && (
                <>
                  <h3 className="mb-3 mt-8 font-semibold text-quizz-dark">
                    Et les plus éloignés de {candidate.pseudo}
                  </h3>
                  <ul className="flex flex-wrap gap-3">
                    {furthestCandidates.map((other) => (
                      <li key={other.slug}>
                        <Link
                          to={`/comparer/${other.pairSlug}`}
                          className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-quizz-dark no-underline hover:bg-white/60"
                        >
                          <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: other.color }} />
                          {other.pseudo}
                          <span className="text-gray-400">{other.percent}%</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {positioningArticle && (
                <p className="mt-6 text-sm">
                  <Link to={`/blog/${positioningArticle.slug}`} className="text-blue-600 no-underline hover:underline">
                    {candidate.pseudo}, droite ou gauche ? Notre analyse détaillée de ses positions →
                  </Link>
                </p>
              )}

              <p className="mt-6 text-xs text-gray-500">
                La proximité est calculée avec l'algorithme du quiz : réponse identique = 5 points,
                réponse voisine = moins de points, rien en commun = 0.
              </p>
            </div>
          </section>
        )}

        {/* Polling */}
        <section className="mx-auto w-full max-w-4xl px-5 pt-12">
          <h2 className="mb-3 font-[Merriweather] text-2xl font-bold text-quizz-dark">
            {candidate.pseudo} dans les sondages de 2027
          </h2>
          {polling ? (
            <p className="text-sm leading-relaxed text-gray-600">
              Les instituts ont testé {candidate.pseudo} dans {polling.appearances} hypothèses de premier
              tour. Sa dernière moyenne mensuelle est de{' '}
              <strong className="text-quizz-dark">{polling.latest}%</strong> en{' '}
              {polling.latestMonth ? formatMonthLong(polling.latestMonth) : '—'}.{' '}
              <Link to="/sondages-presidentielle-2027" className="text-blue-600 no-underline hover:underline">
                Voir la courbe complète des sondages 2027 →
              </Link>
            </p>
          ) : (
            <p className="text-sm leading-relaxed text-gray-600">
              À ce jour, aucun sondage publié du premier tour ne teste {candidate.pseudo}. La liste des
              noms soumis aux sondés est un choix de l'institut : être absent des sondages ne veut pas
              dire ne pas avoir de programme. Le sien est ci-dessous, comparable comme celui des autres.{' '}
              <Link to="/sondages-presidentielle-2027" className="text-blue-600 no-underline hover:underline">
                Voir qui les instituts testent, et depuis quand →
              </Link>
            </p>
          )}
          <p className="mt-2 text-xs text-gray-500">
            Sondages mis à jour le {sondagesData.fetchedAt}, source {sondagesData.source.name}.
          </p>
        </section>

        {/* Programme, theme by theme */}
        <section className="mx-auto w-full max-w-4xl px-5 py-12">
          <h2 className="mb-3 font-[Merriweather] text-2xl font-bold text-quizz-dark">
            Le programme de {candidate.pseudo} pour 2027
          </h2>
          <p className="mb-8 text-sm text-gray-600">
            Thème par thème, ce que défend {candidate.pseudo} sur les {quizzQuestionsCount} questions
            de la présidentielle 2027 : économie, santé, immigration, écologie, sécurité, Europe.
            Cliquez sur un thème pour ouvrir le détail.
          </p>
          <div className="space-y-8">
            {positionsByTheme.map((theme, themeIdx) => (
              <details
                key={theme.themeId}
                open={themeIdx === 0}
                className="group rounded-lg border border-gray-200"
              >
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
