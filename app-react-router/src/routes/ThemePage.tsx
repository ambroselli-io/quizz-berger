import { useMemo } from 'react';
import { Link, useParams, Navigate } from 'react-router';
import { getThemeBySlug, candidateSlugMap, getCandidateAnswerForQuestion } from '@app/utils/seo';
import Footer from '@app/components/Footer';

export default function ThemePage() {
  const { themeSlug } = useParams<{ themeSlug: string }>();
  const theme = useMemo(() => getThemeBySlug(themeSlug || ''), [themeSlug]);

  if (!theme) return <Navigate to="/" replace />;

  const candidatePositions = useMemo(() => {
    return candidateSlugMap.map((candidate) => {
      const positions = theme.questions.map((q) => ({
        questionFr: q.fr,
        answer: getCandidateAnswerForQuestion(candidate.answers, q._id, q.answers),
      }));
      return { ...candidate, positions };
    });
  }, [theme]);

  return (
    <>
      <title>{`${theme.fr} — Élection présidentielle 2027 | Le Quizz du Berger`}</title>
      <meta name="description" content={`Que proposent les 24 candidats à la présidentielle 2027 sur le thème : ${theme.fr} ? Découvrez leurs positions et comparez avec les vôtres.`} />

      <div className="flex flex-col items-center bg-white">
        {/* Hero */}
        <section className="w-full bg-quizz-dark px-5 py-16 text-center text-white">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 font-[Merriweather] text-3xl font-bold leading-tight max-lg:text-2xl">
              Élection 2027 : que proposent les candidats sur {theme.fr.toLowerCase()}&nbsp;?
            </h1>
            <p className="text-lg leading-relaxed text-white/80">
              Découvrez les positions des 24 candidats à l'élection présidentielle 2027 sur le thème <strong>{theme.fr}</strong>.
              {' '}{theme.questions.length} questions pour comprendre les différences entre les candidats.
            </p>
            <Link
              to="/themes"
              className="mt-8 inline-block rounded-full bg-yellow-400 px-8 py-3 font-semibold text-black no-underline hover:bg-yellow-300"
            >
              Découvrez quel candidat pense comme vous
            </Link>
          </div>
        </section>

        {/* Questions list */}
        <section className="mx-auto w-full max-w-4xl px-5 py-12">
          <h2 className="mb-8 font-[Merriweather] text-2xl font-bold text-quizz-dark">
            Les {theme.questions.length} questions sur {theme.fr.toLowerCase()}
          </h2>
          <div className="space-y-8">
            {theme.questions.map((question, idx) => (
              <div key={question._id} className="rounded-lg border border-gray-200 p-6">
                <h3 className="mb-4 text-lg font-semibold text-quizz-dark">
                  {idx + 1}. {question.fr}
                </h3>
                <p className="mb-3 text-sm text-gray-500">Les réponses possibles :</p>
                <ul className="space-y-2">
                  {question.answers.map((answer, ansIdx) => (
                    <li key={ansIdx} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-medium">
                        {ansIdx + 1}
                      </span>
                      {answer}
                    </li>
                  ))}
                </ul>
                {question.help && (
                  <a href={question.help} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm text-blue-600 hover:underline">
                    En savoir plus (Wikipedia)
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Candidate positions summary */}
        <section className="w-full bg-gray-50 px-5 py-12">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 font-[Merriweather] text-2xl font-bold text-quizz-dark">
              Les positions des candidats sur {theme.fr.toLowerCase()}
            </h2>
            <div className="grid gap-6 lg:grid-cols-2">
              {candidatePositions.map((candidate) => (
                <Link
                  key={candidate.id}
                  to={`/candidat/${candidate.slug}`}
                  className="block rounded-lg border border-gray-200 bg-white p-5 no-underline transition hover:shadow-md"
                >
                  <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-quizz-dark">
                    <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: candidate.color }} />
                    {candidate.pseudo}
                  </h3>
                  <ul className="space-y-2">
                    {candidate.positions.slice(0, 3).map((pos, idx) => (
                      <li key={idx} className="text-sm text-gray-600">
                        <span className="font-medium text-gray-800">{pos.questionFr.slice(0, 60)}...</span>
                        <br />
                        <span className="italic">{pos.answer ? `→ ${pos.answer.slice(0, 80)}${pos.answer.length > 80 ? '...' : ''}` : '—'}</span>
                      </li>
                    ))}
                    {candidate.positions.length > 3 && (
                      <li className="text-sm text-blue-600">+ {candidate.positions.length - 3} autres positions →</li>
                    )}
                  </ul>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full bg-quizz-dark px-5 py-16 text-center text-white">
          <h2 className="mb-4 font-[Merriweather] text-2xl font-bold">Et vous, qu'en pensez-vous ?</h2>
          <p className="mb-8 text-white/80">
            Répondez aux questions sur {theme.fr.toLowerCase()} et découvrez quel candidat pense comme vous.
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
