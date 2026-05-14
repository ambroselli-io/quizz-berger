import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { comparisonPairs, candidateSlugMap, candidatesCount, getCanonicalPairSlug } from '@app/utils/seo';
import Footer from '@app/components/Footer';

export default function ComparerIndex() {
  const navigate = useNavigate();
  const [c1, setC1] = useState('');
  const [c2, setC2] = useState('');

  const sortedCandidates = useMemo(
    () => [...candidateSlugMap].sort((a, b) => a.pseudo.localeCompare(b.pseudo, 'fr')),
    [],
  );

  const canCompare = !!c1 && !!c2 && c1 !== c2;

  const onCompare = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canCompare) return;
    navigate(`/comparer/${getCanonicalPairSlug(c1, c2)}`);
  };

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
              Choisissez deux candidats parmi les {candidateSlugMap.length} pour voir où ils s'accordent et où ils s'opposent, thème par thème.
            </p>
          </div>
        </section>

        {/* Picker */}
        <section className="mx-auto w-full max-w-3xl px-5 py-12">
          <h2 className="mb-2 font-[Merriweather] text-2xl font-bold text-quizz-dark">
            Comparer deux candidats au choix
          </h2>
          <p className="mb-6 text-sm text-gray-600">
            Choisissez les deux candidats que vous voulez comparer.
          </p>
          <form onSubmit={onCompare} className="flex flex-col gap-4">
            <div className="flex items-center gap-3 max-lg:flex-col max-lg:items-stretch">
              <label className="flex flex-1 flex-col gap-1 text-sm">
                <span className="font-medium text-gray-700">Candidat 1</span>
                <select
                  value={c1}
                  onChange={(e) => setC1(e.target.value)}
                  className="rounded-md border border-gray-300 bg-white px-3 py-2.5 text-base text-quizz-dark"
                >
                  <option value="">— Choisir un candidat —</option>
                  {sortedCandidates.map((c) => (
                    <option key={c.slug} value={c.slug} disabled={c.slug === c2}>
                      {c.pseudo}
                    </option>
                  ))}
                </select>
              </label>
              <span className="shrink-0 self-end pb-2.5 text-sm font-bold uppercase text-gray-400 max-lg:self-center max-lg:pb-0">
                vs
              </span>
              <label className="flex flex-1 flex-col gap-1 text-sm">
                <span className="font-medium text-gray-700">Candidat 2</span>
                <select
                  value={c2}
                  onChange={(e) => setC2(e.target.value)}
                  className="rounded-md border border-gray-300 bg-white px-3 py-2.5 text-base text-quizz-dark"
                >
                  <option value="">— Choisir un candidat —</option>
                  {sortedCandidates.map((c) => (
                    <option key={c.slug} value={c.slug} disabled={c.slug === c1}>
                      {c.pseudo}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <button
              type="submit"
              disabled={!canCompare}
              className="self-center rounded-full bg-yellow-400 px-8 py-3 font-semibold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Comparer →
            </button>
          </form>
        </section>

        {/* Popular comparisons */}
        <section className="w-full bg-gray-50 px-5 py-12">
          <div className="mx-auto w-full max-w-4xl">
            <h2 className="mb-2 font-[Merriweather] text-2xl font-bold text-quizz-dark">
              Comparaisons populaires
            </h2>
            <p className="mb-6 text-sm text-gray-600">Les duels les plus regardés.</p>
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
          </div>
        </section>

        <section className="w-full bg-quizz-dark px-5 py-16 text-center text-white">
          <h2 className="mb-4 font-[Merriweather] text-2xl font-bold">
            Et vous, de quel côté êtes-vous ?
          </h2>
          <p className="mb-8 text-white/80">Répondez au quiz pour vous comparer aux {candidatesCount} candidats.</p>
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
