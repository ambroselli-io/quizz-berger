import { Link } from 'react-router';
import { comparisonPairs } from '@app/utils/seo';
import Footer from '@app/components/Footer';

export default function ComparerIndex() {
  return (
    <>
      <title>Comparer les candidats à la présidentielle 2027 | Le Quizz du Berger</title>
      <meta
        name="description"
        content="Comparez les programmes des candidats à la présidentielle 2027 deux par deux : points d'accord, points de désaccord, thème par thème."
      />

      <div className="flex flex-col items-center bg-white">
        <section className="w-full bg-quizz-dark px-5 py-16 text-center text-white">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-4 font-[Merriweather] text-3xl font-bold leading-tight max-lg:text-2xl">
              Comparer les candidats à la présidentielle 2027
            </h1>
            <p className="text-lg text-white/80">
              {comparisonPairs.length} duels de candidats, thème par thème : où sont-ils d'accord, où s'opposent-ils ?
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-4xl px-5 py-12">
          <ul className="grid gap-3 lg:grid-cols-2">
            {comparisonPairs.map((pair) => (
              <li key={pair.slug}>
                <Link
                  to={`/comparer/${pair.slug}`}
                  className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 no-underline transition hover:shadow-sm"
                >
                  <span className="text-sm font-medium text-quizz-dark">
                    {pair.candidate1Name} <span className="text-gray-400">vs</span> {pair.candidate2Name}
                  </span>
                  <span className="text-sm text-blue-600">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="w-full bg-quizz-dark px-5 py-16 text-center text-white">
          <h2 className="mb-4 font-[Merriweather] text-2xl font-bold">
            Et vous, de quel côté êtes-vous ?
          </h2>
          <p className="mb-8 text-white/80">Répondez au quiz pour vous comparer aux 24 candidats.</p>
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
