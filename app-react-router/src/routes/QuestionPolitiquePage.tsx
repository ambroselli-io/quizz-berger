import { useMemo } from 'react';
import { Link, useParams, Navigate } from 'react-router';
import { getQuestionBySlug, candidateSlugMap, getCandidateAnswerForQuestion, themeSlugMap } from '@app/utils/seo';
import Footer from '@app/components/Footer';

export default function QuestionPolitiquePage() {
  const { questionSlug } = useParams<{ questionSlug: string }>();
  const question = useMemo(() => getQuestionBySlug(questionSlug || ''), [questionSlug]);

  if (!question) return <Navigate to="/" replace />;

  const themeSlug = themeSlugMap.find((t) => t.themeId === question.themeId)?.slug;

  const candidateAnswers = useMemo(() => {
    return candidateSlugMap.map((candidate) => ({
      ...candidate,
      answerText: getCandidateAnswerForQuestion(candidate.answers, question.questionId, question.answers),
      answerIndex: candidate.answers.find((a) => a.questionId === question.questionId)?.answerIndex ?? -1,
    }));
  }, [question]);

  // Group candidates by answer
  const candidatesByAnswer = useMemo(() => {
    const groups: Record<number, typeof candidateAnswers> = {};
    for (const c of candidateAnswers) {
      if (c.answerIndex === -1) continue;
      if (!groups[c.answerIndex]) groups[c.answerIndex] = [];
      groups[c.answerIndex].push(c);
    }
    return groups;
  }, [candidateAnswers]);

  // FAQ structured data
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: question.fr,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Les candidats à la présidentielle 2027 ont des positions variées sur cette question. ${question.answers.slice(0, 3).map((a, i) => `Position ${i + 1} : "${a}"`).join('. ')}.`,
        },
      },
      {
        '@type': 'Question',
        name: `Quels candidats sont pour ou contre sur la question : ${question.fr.toLowerCase()} ?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: candidateAnswers
            .filter((c) => c.answerText)
            .slice(0, 5)
            .map((c) => `${c.pseudo} : "${c.answerText}"`)
            .join('. '),
        },
      },
    ],
  };

  return (
    <>
      <title>{question.seoTitle}</title>
      <meta name="description" content={question.seoDescription} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="flex flex-col items-center bg-white">
        {/* Hero */}
        <section className="w-full bg-quizz-dark px-5 py-16 text-center text-white">
          <div className="mx-auto max-w-3xl">
            {themeSlug && (
              <Link to={`/theme/${themeSlug}`} className="mb-4 inline-block text-sm text-yellow-400 no-underline hover:underline">
                ← {question.themeName}
              </Link>
            )}
            <h1 className="mb-6 font-[Merriweather] text-3xl font-bold leading-tight max-lg:text-2xl">
              {question.seoTitle}
            </h1>
            <p className="text-lg leading-relaxed text-white/80">
              Découvrez ce que pensent les 24 candidats à la présidentielle 2027 sur cette question clé.
            </p>
          </div>
        </section>

        {/* Context */}
        {question.help && (
          <section className="mx-auto w-full max-w-4xl px-5 pt-8">
            <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
              <p className="text-sm text-blue-800">
                Pour mieux comprendre le contexte de cette question :{' '}
                <a href={question.help} target="_blank" rel="noreferrer" className="font-medium underline">
                  Lire l'article Wikipedia
                </a>
              </p>
            </div>
          </section>
        )}

        {/* Answer spectrum */}
        <section className="mx-auto w-full max-w-4xl px-5 py-12">
          <h2 className="mb-6 font-[Merriweather] text-xl font-bold text-quizz-dark">
            Les positions possibles
          </h2>
          <div className="space-y-4">
            {question.answers.map((answer, idx) => {
              const candidatesForAnswer = candidatesByAnswer[idx] || [];
              const isLastAnswer = answer.includes("m'intéresse pas") || answer.includes("pas d'avis");
              if (isLastAnswer && candidatesForAnswer.length === 0) return null;
              return (
                <div key={idx} className={`rounded-lg border p-5 ${isLastAnswer ? 'border-gray-100 bg-gray-50' : 'border-gray-200'}`}>
                  <div className="mb-3 flex items-start gap-3">
                    <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${isLastAnswer ? 'bg-gray-300' : 'bg-quizz-dark'}`}>
                      {idx + 1}
                    </span>
                    <p className={`font-medium ${isLastAnswer ? 'text-gray-400' : 'text-quizz-dark'}`}>{answer}</p>
                  </div>
                  {candidatesForAnswer.length > 0 && (
                    <div className="ml-9 flex flex-wrap gap-2">
                      {candidatesForAnswer.map((c) => (
                        <Link
                          key={c.id}
                          to={`/candidat/${c.slug}`}
                          className="flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1 text-xs text-quizz-dark no-underline hover:bg-gray-50"
                        >
                          <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: c.color }} />
                          {c.pseudo}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Detailed candidate positions */}
        <section className="w-full bg-gray-50 px-5 py-12">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 font-[Merriweather] text-xl font-bold text-quizz-dark">
              Les 24 candidats répondent
            </h2>
            <div className="grid gap-4 lg:grid-cols-2">
              {candidateAnswers
                .filter((c) => c.answerText)
                .map((c) => (
                  <Link
                    key={c.id}
                    to={`/candidat/${c.slug}`}
                    className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4 no-underline hover:shadow-sm"
                  >
                    <span className="mt-1 inline-block h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: c.color }} />
                    <div>
                      <p className="font-semibold text-quizz-dark">{c.pseudo}</p>
                      <p className="mt-1 text-sm italic text-gray-600">« {c.answerText} »</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto w-full max-w-4xl px-5 py-12">
          <h2 className="mb-6 font-[Merriweather] text-xl font-bold text-quizz-dark">
            Questions fréquentes
          </h2>
          <div className="space-y-4">
            <details className="rounded-lg border border-gray-200 p-5">
              <summary className="cursor-pointer font-medium text-quizz-dark">
                Comment les positions des candidats ont-elles été déterminées ?
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Les réponses des candidats sont basées sur l'analyse de leurs programmes officiels, déclarations publiques
                et votes passés. Chaque position est classée sur une échelle de nuances pour refléter au mieux
                la complexité des opinions politiques.
              </p>
            </details>
            <details className="rounded-lg border border-gray-200 p-5">
              <summary className="cursor-pointer font-medium text-quizz-dark">
                Comment fonctionne le Quizz du Berger ?
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Vous répondez aux questions qui vous intéressent, thème par thème. Un algorithme compare vos réponses
                à celles des 24 candidats : une réponse identique vaut 5 points, proche 2-4 points, opposée 0 point.
                Le candidat avec le plus de points est le plus proche de vos idées.
              </p>
            </details>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full bg-quizz-dark px-5 py-16 text-center text-white">
          <h2 className="mb-4 font-[Merriweather] text-2xl font-bold">Et vous, qu'en pensez-vous ?</h2>
          <p className="mb-8 text-white/80">
            Répondez à cette question et à 118 autres pour découvrir quel candidat pense comme vous.
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
