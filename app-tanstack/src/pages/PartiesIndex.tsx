import { Link } from '@app/lib/router';
import {
  partyList,
  partiesCount,
  partyColor,
  unaffiliatedCandidates,
  partyThemes,
} from '@app/utils/parties';
import { candidatesCount } from '@app/utils/seo';
import { quizzQuestionsCount, quizzThemesCount } from '@app/utils/quizz';
import Footer from '@app/components/Footer';

export default function PartiesIndex() {
  return (
    <>
      <div className="flex flex-col items-center bg-white">
        {/* Hero */}
        <section className="w-full bg-quizz-dark px-5 py-16 text-center text-white">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 font-[Merriweather] text-3xl font-bold leading-tight max-lg:text-2xl">
              Les programmes des partis politiques pour 2027
            </h1>
            <p className="text-lg leading-relaxed text-white/80">
              {partiesCount} partis, {candidatesCount} personnalités, {quizzQuestionsCount}{' '}
              questions posées à tout le monde dans les mêmes termes. Choisissez un parti pour lire
              son programme thème par thème, ou faites le test pour savoir quel parti politique vous
              correspond.
            </p>
            <Link
              to="/themes"
              className="mt-8 inline-block rounded-full bg-yellow-400 px-8 py-3 font-semibold text-black no-underline hover:bg-yellow-300"
            >
              Faire le test : quel parti me correspond ?
            </Link>
          </div>
        </section>

        {/* Party grid */}
        <section className="mx-auto w-full max-w-5xl px-5 py-12">
          <h2 className="mb-6 font-[Merriweather] text-2xl font-bold text-quizz-dark">
            Les {partiesCount} partis représentés dans le quiz
          </h2>
          <ul className="grid gap-4 lg:grid-cols-2">
            {partyList.map((party) => (
              <li key={party.slug}>
                <Link
                  to={`/parti/${party.slug}`}
                  className="block h-full rounded-lg border border-gray-200 p-5 no-underline transition hover:shadow-sm"
                >
                  <p className="flex items-center gap-2 text-base font-semibold text-quizz-dark">
                    <span
                      className="inline-block h-3 w-3 shrink-0 rounded-full"
                      style={{ backgroundColor: partyColor(party) }}
                    />
                    {party.name}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Parti fondé en {party.foundedYear} ·{' '}
                    {party.candidates.map((c) => c.pseudo).join(', ')}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">{party.intro}</p>
                  <p className="mt-3 text-sm text-blue-600">
                    Le programme {party.ofShort} pour 2027 →
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Party x theme entry points */}
        <section className="w-full bg-gray-50 px-5 py-12">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-2 font-[Merriweather] text-xl font-bold text-quizz-dark">
              Comparer les partis sur un thème précis
            </h2>
            <p className="mb-6 text-sm text-gray-600">
              Retraites, immigration, impôts, santé : ouvrez un thème et lisez ce que chaque grand
              parti propose dessus.
            </p>
            <ul className="grid gap-3 lg:grid-cols-3 sm:grid-cols-2">
              {partyThemes.map((theme) => (
                <li key={theme.slug}>
                  <Link
                    to={`/theme/${theme.slug}`}
                    className="block h-full rounded-lg border border-gray-200 bg-white p-4 no-underline hover:shadow-sm"
                  >
                    <p className="text-sm font-semibold text-quizz-dark">{theme.fr}</p>
                    <p className="mt-1 text-xs text-gray-500">
                      {theme.questions.length} questions ·{' '}
                      {partyList
                        .filter((p) => p.hasThemePages)
                        .map((p) => p.shortName)
                        .join(', ')}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Candidates outside a party */}
        {unaffiliatedCandidates.length > 0 && (
          <section className="mx-auto w-full max-w-5xl px-5 py-12">
            <h2 className="mb-2 font-[Merriweather] text-xl font-bold text-quizz-dark">
              Les candidats sans grand parti
            </h2>
            <p className="mb-6 text-sm text-gray-600">
              Ces personnalités portent leur propre mouvement, ou aucun. Elles répondent au même
              quiz que les autres, et leur programme se compare de la même façon.
            </p>
            <div className="flex flex-wrap gap-3">
              {unaffiliatedCandidates.map((candidate) => (
                <Link
                  key={candidate.id}
                  to={`/candidat/${candidate.slug}`}
                  className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-quizz-dark no-underline hover:bg-gray-50"
                >
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: candidate.color }}
                  />
                  {candidate.pseudo}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Other ways in */}
        <section className="w-full bg-white px-5 pb-12">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-6 font-[Merriweather] text-xl font-bold text-quizz-dark">
              D'autres façons de comparer
            </h2>
            <ul className="grid gap-3 lg:grid-cols-3 sm:grid-cols-2">
              <li>
                <Link
                  to="/comparateur-programmes-2027"
                  className="block h-full rounded-lg border border-gray-200 p-4 no-underline hover:shadow-sm"
                >
                  <p className="text-sm font-semibold text-quizz-dark">
                    Le comparateur de programmes
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Jusqu'à 4 candidats côte à côte, sur les {quizzThemesCount} thèmes.
                  </p>
                </Link>
              </li>
              <li>
                <Link
                  to="/candidats"
                  className="block h-full rounded-lg border border-gray-200 p-4 no-underline hover:shadow-sm"
                >
                  <p className="text-sm font-semibold text-quizz-dark">
                    Les {candidatesCount} candidats
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Le programme de chacun et les candidats les plus proches de lui.
                  </p>
                </Link>
              </li>
              <li>
                <Link
                  to="/sujets"
                  className="block h-full rounded-lg border border-gray-200 p-4 no-underline hover:shadow-sm"
                >
                  <p className="text-sm font-semibold text-quizz-dark">Les sujets brûlants</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Une page par grande question de la campagne.
                  </p>
                </Link>
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto w-full max-w-4xl px-5 pb-12">
          <h2 className="mb-6 font-[Merriweather] text-xl font-bold text-quizz-dark">
            Questions fréquentes
          </h2>
          <div className="space-y-4">
            <details className="rounded-lg border border-gray-200 p-5">
              <summary className="cursor-pointer font-medium text-quizz-dark">
                Comment savoir quel parti politique me correspond ?
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Répondez aux {quizzQuestionsCount} questions du quiz, ou seulement à celles qui vous
                intéressent. Vos réponses sont comparées à celles des {candidatesCount}{' '}
                personnalités, et vous obtenez votre pourcentage d'accord avec chacune, donc avec
                leur parti. Le test est gratuit et ne demande pas de compte.
              </p>
            </details>
            <details className="rounded-lg border border-gray-200 p-5">
              <summary className="cursor-pointer font-medium text-quizz-dark">
                Pourquoi certains partis n'ont-ils pas de page ?
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Un parti a une page quand au moins une des {candidatesCount} personnalités du quiz
                en fait partie. Les mouvements portés par une seule personnalité renvoient
                directement vers sa page candidat, où le programme complet est déjà détaillé.
              </p>
            </details>
            <details className="rounded-lg border border-gray-200 p-5">
              <summary className="cursor-pointer font-medium text-quizz-dark">
                Les partis ont-ils validé ces réponses ?
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Non. Personne n'a rempli le quiz lui-même. Chaque réponse est reconstituée à partir
                des programmes officiels, des déclarations publiques et des votes passés. Nous les
                mettons à jour au fil de la campagne.
              </p>
            </details>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full bg-quizz-dark px-5 py-16 text-center text-white">
          <h2 className="mb-4 font-[Merriweather] text-2xl font-bold">
            Alors, quel parti pense comme vous ?
          </h2>
          <p className="mb-8 text-white/80">
            Vous serez peut-être surpris. C'est un peu le but.
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
