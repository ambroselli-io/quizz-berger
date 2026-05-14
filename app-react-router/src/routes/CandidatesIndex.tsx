import { Link } from 'react-router';
import { candidateSlugMap, candidatesCount } from '@app/utils/seo';
import { quizzQuestionsCount, quizzThemesCount } from '@app/utils/quizz';
import Footer from '@app/components/Footer';

export default function CandidatesIndex() {
  return (
    <>
      <title>Tous les candidats à la présidentielle 2027 | Le Quizz du Berger</title>
      <meta
        name="description"
        content={`Découvrez les positions politiques des ${candidatesCount} candidats à l'élection présidentielle 2027 : programme, idées, comparaisons.`}
      />

      <div className="flex flex-col items-center bg-white">
        <section className="w-full bg-quizz-dark px-5 py-16 text-center text-white">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-4 font-[Merriweather] text-3xl font-bold leading-tight max-lg:text-2xl">
              Les candidats à la présidentielle 2027
            </h1>
            <p className="text-lg text-white/80">
              Découvrez les positions des {candidatesCount} candidats sur les {quizzThemesCount} thèmes de l'élection.
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-5xl px-5 py-12">
          <ul className="grid gap-3 lg:grid-cols-3 sm:grid-cols-2">
            {candidateSlugMap.map((c) => (
              <li key={c.id}>
                <Link
                  to={`/candidat/${c.slug}`}
                  className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 no-underline transition hover:shadow-sm"
                >
                  <span
                    className="inline-block h-3 w-3 shrink-0 rounded-full"
                    style={{ backgroundColor: c.color }}
                  />
                  <span className="text-sm font-medium text-quizz-dark">{c.pseudo}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="w-full bg-quizz-dark px-5 py-16 text-center text-white">
          <h2 className="mb-4 font-[Merriweather] text-2xl font-bold">
            Quel candidat pense comme vous ?
          </h2>
          <p className="mb-8 text-white/80">{quizzThemesCount} thèmes, {quizzQuestionsCount} questions, {candidatesCount} candidats.</p>
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
