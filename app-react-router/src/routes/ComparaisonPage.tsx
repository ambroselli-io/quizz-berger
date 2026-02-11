import { useMemo } from 'react';
import { Link, useParams, Navigate } from 'react-router';
import { getCandidateBySlug, themeSlugMap, getCandidateAnswerForQuestion } from '@app/utils/seo';
import Footer from '@app/components/Footer';

export default function ComparaisonPage() {
  const { pairSlug } = useParams<{ pairSlug: string }>();

  // Parse "marine-le-pen-vs-edouard-philippe" by splitting on "-vs-"
  const [candidate1Slug, candidate2Slug] = useMemo(() => {
    const parts = (pairSlug || '').split('-vs-');
    return [parts[0] || '', parts[1] || ''];
  }, [pairSlug]);

  const candidate1 = useMemo(() => getCandidateBySlug(candidate1Slug), [candidate1Slug]);
  const candidate2 = useMemo(() => getCandidateBySlug(candidate2Slug), [candidate2Slug]);

  if (!candidate1 || !candidate2) return <Navigate to="/" replace />;

  const comparisonByTheme = useMemo(() => {
    return themeSlugMap.map((theme) => {
      const questions = theme.questions.map((q) => {
        const a1 = getCandidateAnswerForQuestion(candidate1.answers, q._id, q.answers);
        const a2 = getCandidateAnswerForQuestion(candidate2.answers, q._id, q.answers);
        const idx1 = candidate1.answers.find((a) => a.questionId === q._id)?.answerIndex ?? -1;
        const idx2 = candidate2.answers.find((a) => a.questionId === q._id)?.answerIndex ?? -1;
        const agree = idx1 !== -1 && idx2 !== -1 && idx1 === idx2;
        return { questionFr: q.fr, answer1: a1, answer2: a2, agree };
      });
      const agreements = questions.filter((q) => q.agree).length;
      const total = questions.filter((q) => q.answer1 && q.answer2).length;
      return { ...theme, questions, agreements, total };
    });
  }, [candidate1, candidate2]);

  const totalAgreements = comparisonByTheme.reduce((sum, t) => sum + t.agreements, 0);
  const totalQuestions = comparisonByTheme.reduce((sum, t) => sum + t.total, 0);
  const agreementPercent = totalQuestions > 0 ? Math.round((totalAgreements / totalQuestions) * 100) : 0;

  return (
    <>
      <title>{`${candidate1.pseudo} vs ${candidate2.pseudo} — Comparaison présidentielle 2027 | Le Quizz du Berger`}</title>
      <meta
        name="description"
        content={`Comparez les positions de ${candidate1.pseudo} et ${candidate2.pseudo} sur les 21 thèmes de la présidentielle 2027. ${agreementPercent}% d'accord.`}
      />

      <div className="flex flex-col items-center bg-white">
        {/* Hero */}
        <section className="w-full bg-quizz-dark px-5 py-16 text-center text-white">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 font-[Merriweather] text-3xl font-bold leading-tight max-lg:text-2xl">
              <span style={{ color: candidate1.color }}>{candidate1.pseudo}</span>
              {' '}vs{' '}
              <span style={{ color: candidate2.color }}>{candidate2.pseudo}</span>
            </h1>
            <p className="text-xl text-white/80">Comparaison des positions — Présidentielle 2027</p>
            <div className="mt-8 inline-block rounded-lg bg-white/10 px-6 py-4">
              <p className="text-3xl font-bold">{agreementPercent}%</p>
              <p className="text-sm text-white/60">d'accord sur {totalQuestions} questions</p>
            </div>
          </div>
        </section>

        {/* Theme-by-theme comparison */}
        <section className="mx-auto w-full max-w-5xl px-5 py-12">
          <h2 className="mb-8 font-[Merriweather] text-2xl font-bold text-quizz-dark">
            Comparaison thème par thème
          </h2>
          {/* Agreement summary */}
          <div className="mb-10 grid gap-3 lg:grid-cols-3">
            {comparisonByTheme.map((theme) => {
              const pct = theme.total > 0 ? Math.round((theme.agreements / theme.total) * 100) : 0;
              return (
                <Link
                  key={theme.themeId}
                  to={`/theme/${theme.slug}`}
                  className="flex items-center justify-between rounded-lg border border-gray-200 p-4 no-underline hover:bg-gray-50"
                >
                  <span className="text-sm font-medium text-quizz-dark">{theme.fr}</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${pct >= 60 ? 'bg-green-100 text-green-700' : pct >= 30 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                    {pct}%
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Detailed positions */}
          <div className="space-y-6">
            {comparisonByTheme.map((theme) => (
              <details key={theme.themeId} className="group rounded-lg border border-gray-200">
                <summary className="flex cursor-pointer items-center justify-between p-5 font-semibold text-quizz-dark">
                  <span>{theme.fr}</span>
                  <span className="text-sm text-gray-400">
                    {theme.agreements}/{theme.total} d'accord
                  </span>
                </summary>
                <div className="border-t border-gray-100 p-5">
                  <div className="space-y-6">
                    {theme.questions.map((q, idx) => (
                      <div key={idx} className={`rounded-lg p-4 ${q.agree ? 'bg-green-50' : 'bg-gray-50'}`}>
                        <p className="mb-3 text-sm font-medium text-quizz-dark">{q.questionFr}</p>
                        <div className="grid gap-3 lg:grid-cols-2">
                          <div className="rounded border-l-4 bg-white p-3" style={{ borderColor: candidate1.color }}>
                            <p className="mb-1 text-xs font-semibold" style={{ color: candidate1.color }}>
                              {candidate1.pseudo}
                            </p>
                            <p className="text-sm text-gray-700">{q.answer1 || '—'}</p>
                          </div>
                          <div className="rounded border-l-4 bg-white p-3" style={{ borderColor: candidate2.color }}>
                            <p className="mb-1 text-xs font-semibold" style={{ color: candidate2.color }}>
                              {candidate2.pseudo}
                            </p>
                            <p className="text-sm text-gray-700">{q.answer2 || '—'}</p>
                          </div>
                        </div>
                        {q.agree && (
                          <p className="mt-2 text-xs font-medium text-green-600">✓ Même position</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="w-full bg-quizz-dark px-5 py-16 text-center text-white">
          <h2 className="mb-4 font-[Merriweather] text-2xl font-bold">Et vous, de quel côté êtes-vous ?</h2>
          <p className="mb-8 text-white/80">
            Répondez au quiz pour découvrir si vous êtes plus proche de {candidate1.pseudo} ou de {candidate2.pseudo}.
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
