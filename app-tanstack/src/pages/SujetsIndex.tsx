import { Link } from '@app/lib/router';
import { themeSlugMap, hotTopicQuestions, candidatesCount } from '@app/utils/seo';
import Footer from '@app/components/Footer';

export default function SujetsIndex() {
  return (
    <>
      <div className="flex flex-col items-center bg-white">
        <section className="w-full bg-quizz-dark px-5 py-16 text-center text-white">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-4 font-[Merriweather] text-3xl font-bold leading-tight max-lg:text-2xl">
              Tous les sujets de la présidentielle 2027
            </h1>
            <p className="text-lg text-white/80">
              {themeSlugMap.length} thèmes politiques, des centaines de questions, {candidatesCount} candidats.
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-5xl px-5 py-12">
          <h2 className="mb-6 font-[Merriweather] text-2xl font-bold text-quizz-dark">
            Explorer par thème
          </h2>
          <ul className="grid gap-3 lg:grid-cols-3 sm:grid-cols-2">
            {themeSlugMap.map((theme) => (
              <li key={theme.themeId}>
                <Link
                  to={`/theme/${theme.slug}`}
                  className="block rounded-lg border border-gray-200 bg-white p-4 no-underline transition hover:shadow-sm"
                >
                  <p className="text-sm font-medium text-quizz-dark">{theme.fr}</p>
                  <p className="mt-1 text-xs text-gray-500">{theme.questions.length} questions</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="w-full bg-gray-50 px-5 py-12">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-2 font-[Merriweather] text-2xl font-bold text-quizz-dark">
              Les sujets brûlants
            </h2>
            <p className="mb-6 text-sm text-gray-600">
              Les questions les plus suivies de la présidentielle 2027.
            </p>
            <ul className="grid gap-3 lg:grid-cols-2">
              {hotTopicQuestions.map((q) => (
                <li key={q.questionId}>
                  <Link
                    to={`/question-politique/${q.slug}`}
                    className="block rounded-lg border border-gray-200 bg-white p-4 text-sm font-medium text-quizz-dark no-underline transition hover:shadow-sm"
                  >
                    {q.fr}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="w-full bg-quizz-dark px-5 py-16 text-center text-white">
          <h2 className="mb-4 font-[Merriweather] text-2xl font-bold">
            Quel candidat pense comme vous ?
          </h2>
          <p className="mb-8 text-white/80">Répondez au quiz, thème par thème.</p>
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
