import { useMemo, useState } from 'react';
import { Link } from '@app/lib/router';
import {
  candidateSlugMap,
  candidatesCount,
  themeSlugMap,
  getQuestionSlugById,
} from '@app/utils/seo';
import { quizzQuestionsCount, quizzThemesCount } from '@app/utils/quizz';
import Footer from '@app/components/Footer';

const MAX_SELECTED = 4;

/** Answer index chosen by each candidate, per question id. */
const answersByCandidate = new Map<string, Map<string, number>>(
  candidateSlugMap.map((candidate) => [
    candidate.slug,
    new Map(candidate.answers.map((a) => [a.questionId, a.answerIndex])),
  ]),
);

function isNoOpinion(answer: string): boolean {
  return answer.includes("m'intéresse pas") || answer.includes("pas d'avis");
}

export default function ComparateurProgrammes() {
  const [selected, setSelected] = useState<string[]>([]);

  const isComparing = selected.length >= 2;

  const selectedCandidates = useMemo(
    () => candidateSlugMap.filter((c) => selected.includes(c.slug)),
    [selected],
  );

  function toggleCandidate(slug: string) {
    setSelected((current) => {
      if (current.includes(slug)) return current.filter((s) => s !== slug);
      if (current.length >= MAX_SELECTED) return current;
      return [...current, slug];
    });
  }

  return (
    <>
      <div className="flex flex-col items-center bg-white">
        {/* Hero */}
        <section className="w-full bg-quizz-dark px-5 py-16 text-center text-white">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 font-[Merriweather] text-3xl font-bold leading-tight max-lg:text-2xl">
              Comparateur des programmes de la présidentielle 2027
            </h1>
            <p className="text-lg leading-relaxed text-white/80">
              Les {candidatesCount} candidats, {quizzQuestionsCount} questions, {quizzThemesCount} thèmes,
              sur une seule page. Choisissez jusqu'à {MAX_SELECTED} candidats pour les comparer côte à côte,
              ou lisez qui défend quoi, question par question.
            </p>
            <Link
              to="/themes"
              className="mt-8 inline-block rounded-full bg-yellow-400 px-8 py-3 font-semibold text-black no-underline hover:bg-yellow-300"
            >
              Comparer avec vos propres idées
            </Link>
          </div>
        </section>

        {/* Candidate picker */}
        <section className="w-full border-b border-gray-200 bg-gray-50 px-5 py-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-2 font-[Merriweather] text-xl font-bold text-quizz-dark">
              Choisissez les candidats à comparer
            </h2>
            <p className="mb-4 text-sm text-gray-600">
              {isComparing
                ? `${selected.length} candidats sélectionnés — les réponses s'affichent côte à côte ci-dessous.`
                : `Sélectionnez au moins 2 candidats (${MAX_SELECTED} au maximum). Sans sélection, la page montre les positions de tous les candidats.`}
            </p>
            <div className="flex flex-wrap gap-2">
              {candidateSlugMap.map((candidate) => {
                const isSelected = selected.includes(candidate.slug);
                const isFull = selected.length >= MAX_SELECTED && !isSelected;
                return (
                  <button
                    key={candidate.id}
                    type="button"
                    onClick={() => toggleCandidate(candidate.slug)}
                    disabled={isFull}
                    aria-pressed={isSelected}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                      isSelected
                        ? 'border-transparent text-white'
                        : isFull
                          ? 'cursor-not-allowed border-gray-200 bg-white text-gray-300'
                          : 'border-gray-200 bg-white text-quizz-dark hover:shadow-sm'
                    }`}
                    style={isSelected ? { backgroundColor: candidate.color } : undefined}
                  >
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: isSelected ? '#fff' : candidate.color }}
                    />
                    {candidate.pseudo}
                  </button>
                );
              })}
            </div>
            {selected.length > 0 && (
              <button
                type="button"
                onClick={() => setSelected([])}
                className="mt-4 text-sm text-blue-600 underline"
              >
                Effacer la sélection
              </button>
            )}
          </div>
        </section>

        {/* The comparison itself, theme by theme */}
        <section className="mx-auto w-full max-w-5xl px-5 py-12">
          <h2 className="mb-6 font-[Merriweather] text-2xl font-bold text-quizz-dark">
            {isComparing
              ? `${selectedCandidates.map((c) => c.pseudo).join(' vs ')} : leurs programmes comparés`
              : `Qui défend quoi, thème par thème`}
          </h2>

          <div className="space-y-4">
            {themeSlugMap.map((theme, themeIdx) => (
              <details
                key={theme.themeId}
                open={themeIdx === 0}
                className="group rounded-lg border border-gray-200"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-semibold text-quizz-dark">
                  <span>
                    {theme.fr}{' '}
                    <span className="text-sm font-normal text-gray-400">
                      ({theme.questions.length} questions)
                    </span>
                  </span>
                  <span className="text-sm text-gray-400 transition-transform group-open:rotate-180">▼</span>
                </summary>

                <div className="space-y-6 border-t border-gray-100 p-5">
                  <p className="text-sm">
                    <Link to={`/theme/${theme.slug}`} className="text-blue-600 no-underline hover:underline">
                      Voir la page complète du thème {theme.fr} →
                    </Link>
                  </p>

                  {theme.questions.map((question) => {
                    const questionSlug = getQuestionSlugById(question._id);

                    // Which candidates picked each answer, in the answer order.
                    const candidatesByAnswer = question.answers.map((_, answerIdx) =>
                      candidateSlugMap.filter(
                        (c) => answersByCandidate.get(c.slug)?.get(question._id) === answerIdx,
                      ),
                    );

                    const selectedAnswers = selectedCandidates.map((c) => ({
                      candidate: c,
                      answerIndex: answersByCandidate.get(c.slug)?.get(question._id) ?? -1,
                    }));
                    const allAgree =
                      isComparing &&
                      selectedAnswers.every(
                        (a) => a.answerIndex !== -1 && a.answerIndex === selectedAnswers[0].answerIndex,
                      );

                    return (
                      <div key={question._id} className="border-t border-gray-100 pt-5 first:border-0 first:pt-0">
                        <h3 className="mb-3 text-sm font-semibold text-quizz-dark">
                          {questionSlug ? (
                            <Link
                              to={`/question-politique/${questionSlug}`}
                              className="text-quizz-dark no-underline hover:text-blue-700 hover:underline"
                            >
                              {question.fr}
                            </Link>
                          ) : (
                            question.fr
                          )}
                        </h3>

                        {isComparing ? (
                          <>
                            {allAgree && (
                              <p className="mb-2 inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                                Tous d'accord
                              </p>
                            )}
                            <ul className="grid gap-2 sm:grid-cols-2">
                              {selectedAnswers.map(({ candidate, answerIndex }) => (
                                <li
                                  key={candidate.id}
                                  className="rounded-lg border border-gray-200 p-3"
                                  style={{ borderLeft: `4px solid ${candidate.color}` }}
                                >
                                  <p className="text-xs font-semibold text-quizz-dark">{candidate.pseudo}</p>
                                  <p className="mt-1 text-sm italic text-gray-600">
                                    {answerIndex === -1
                                      ? '— Pas de position renseignée'
                                      : `« ${question.answers[answerIndex]} »`}
                                  </p>
                                </li>
                              ))}
                            </ul>
                          </>
                        ) : (
                          <ul className="space-y-2">
                            {question.answers.map((answer, answerIdx) => {
                              const holders = candidatesByAnswer[answerIdx];
                              if (holders.length === 0 && isNoOpinion(answer)) return null;
                              return (
                                <li key={answerIdx} className="text-sm">
                                  <p className="text-gray-800">{answer}</p>
                                  <p className="mt-0.5 text-xs text-gray-500">
                                    {holders.length === 0
                                      ? 'Aucun candidat'
                                      : holders.map((c) => c.pseudo).join(', ')}
                                  </p>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Other ways to compare */}
        <section className="w-full bg-gray-50 px-5 py-12">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-6 font-[Merriweather] text-xl font-bold text-quizz-dark">
              D'autres façons de comparer
            </h2>
            <ul className="grid gap-3 lg:grid-cols-3 sm:grid-cols-2">
              <li>
                <Link
                  to="/comparer"
                  className="block h-full rounded-lg border border-gray-200 bg-white p-4 no-underline hover:shadow-sm"
                >
                  <p className="text-sm font-semibold text-quizz-dark">Duels de candidats</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Deux candidats face à face, thème par thème, avec leur pourcentage d'accord.
                  </p>
                </Link>
              </li>
              <li>
                <Link
                  to="/sujets"
                  className="block h-full rounded-lg border border-gray-200 bg-white p-4 no-underline hover:shadow-sm"
                >
                  <p className="text-sm font-semibold text-quizz-dark">Les sujets brûlants</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Une page par grande question de la campagne, avec la position de chaque candidat.
                  </p>
                </Link>
              </li>
              <li>
                <Link
                  to="/candidats"
                  className="block h-full rounded-lg border border-gray-200 bg-white p-4 no-underline hover:shadow-sm"
                >
                  <p className="text-sm font-semibold text-quizz-dark">Les {candidatesCount} candidats</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Le programme de chaque candidat et les candidats les plus proches de lui.
                  </p>
                </Link>
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto w-full max-w-4xl px-5 py-12">
          <h2 className="mb-6 font-[Merriweather] text-xl font-bold text-quizz-dark">Questions fréquentes</h2>
          <div className="space-y-4">
            <details className="rounded-lg border border-gray-200 p-5">
              <summary className="cursor-pointer font-medium text-quizz-dark">
                D'où viennent les positions des candidats ?
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Les candidats n'ont pas rempli le quiz eux-mêmes. Chaque réponse vient de leurs programmes
                officiels, de leurs déclarations publiques et de leurs votes passés. Une position peut donc
                évoluer, et nous mettons les réponses à jour au fil de la campagne.
              </p>
            </details>
            <details className="rounded-lg border border-gray-200 p-5">
              <summary className="cursor-pointer font-medium text-quizz-dark">
                Comment comparer les programmes avec mes propres idées ?
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Répondez aux {quizzQuestionsCount} questions du quiz, ou seulement à celles qui vous
                intéressent. L'algorithme compare vos réponses à celles des {candidatesCount} candidats :
                réponse identique = 5 points, réponse voisine = moins de points, rien en commun = 0.
              </p>
            </details>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full bg-quizz-dark px-5 py-16 text-center text-white">
          <h2 className="mb-4 font-[Merriweather] text-2xl font-bold">Alors vous en pensez quoi ?</h2>
          <p className="mb-8 text-white/80">
            Vous connaissez maintenant les programmes. Découvrez lequel ressemble vraiment au vôtre.
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
