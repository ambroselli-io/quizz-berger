import { Link } from '@app/lib/router';
import {
  timelineByMonth,
  declaredCandidacies,
  withdrawnCandidacies,
  potentialCandidacies,
  declaredCount,
  withdrawnCount,
  potentialCount,
  formatEventDate,
  movementLabel,
} from '@app/utils/candidacies';
import { candidatesCount } from '@app/utils/seo';
import { quizzQuestionsCount } from '@app/utils/quizz';
import CandidacyTag, { STATUS_TAG } from '@app/components/CandidacyTag';
import Footer from '@app/components/Footer';

export default function CandidaciesPage() {
  return (
    <>
      <div className="flex flex-col items-center bg-white">
        {/* Hero */}
        <section className="w-full bg-quizz-dark px-5 py-16 text-center text-white">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 font-[Merriweather] text-3xl font-bold leading-tight max-lg:text-2xl">
              Qui est candidat à la présidentielle 2027 ?
            </h1>
            <p className="text-lg leading-relaxed text-white/80">
              {declaredCount} personnes ont déclaré leur candidature, {withdrawnCount} y ont
              renoncé, {potentialCount} sont citées sans s'être déclarées. Chaque entrée et chaque
              sortie est datée et sourcée ci-dessous, de la plus récente à la plus ancienne.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
                <strong>{declaredCount}</strong> candidats déclarés
              </span>
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
                <strong>{withdrawnCount}</strong> ont renoncé
              </span>
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
                <strong>{potentialCount}</strong> pas encore déclarés
              </span>
            </div>
            <Link
              to="/themes"
              className="mt-8 inline-block rounded-full bg-yellow-400 px-8 py-3 font-semibold text-black no-underline hover:bg-yellow-300"
            >
              Voir lequel pense comme vous
            </Link>
          </div>
        </section>

        {/* Timeline */}
        <section className="mx-auto w-full max-w-4xl px-5 py-12">
          <h2 className="mb-3 font-[Merriweather] text-2xl font-bold text-quizz-dark">
            La chronologie des candidatures
          </h2>
          <p className="mb-10 text-sm text-gray-600">
            Une pastille par entrée et par sortie. Cliquez sur un nom pour lire l'histoire de sa
            candidature, avec les liens vers les articles de presse.
          </p>

          <div className="relative">
            {/* the spine */}
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-[7px] top-0 w-0.5 bg-gray-200 lg:left-[calc(8rem+7px)]"
            />
            <div className="space-y-10">
              {timelineByMonth.map((month) => (
                <div key={month.key}>
                  <h3 className="relative mb-4 flex items-center gap-3 lg:gap-0">
                    <span className="hidden w-32 shrink-0 pr-6 text-right text-sm font-bold uppercase tracking-wide text-gray-400 lg:block">
                      {month.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className="relative z-10 ml-[2px] h-3 w-3 shrink-0 rounded-full bg-gray-300 ring-4 ring-white lg:ml-0"
                    />
                    <span className="pl-4 text-sm font-bold uppercase tracking-wide text-gray-400 lg:hidden">
                      {month.label}
                    </span>
                  </h3>

                  <ul className="space-y-4">
                    {month.items.map((item) => (
                      <li key={`${item.candidacy.slug}-${item.event.date}-${item.tag}`} className="relative flex items-start gap-3 lg:gap-0">
                        <span className="hidden w-32 shrink-0 pr-6 pt-3 text-right text-xs text-gray-500 lg:block">
                          {formatEventDate(item.event.date)}
                        </span>
                        <span
                          aria-hidden="true"
                          className={`relative z-10 mt-4 ml-[3px] h-2.5 w-2.5 shrink-0 rounded-full ring-4 ring-white lg:ml-[1px] ${
                            item.tag === 'OUT' ? 'bg-red-500' : 'bg-emerald-500'
                          }`}
                        />
                        <Link
                          to={`/candidature/${item.candidacy.slug}`}
                          className="ml-3 block flex-1 rounded-lg border border-gray-200 p-4 no-underline transition hover:shadow-sm lg:ml-6"
                        >
                          <span className="flex flex-wrap items-center gap-2">
                            <span
                              className="inline-block h-3 w-3 shrink-0 rounded-full"
                              style={{ backgroundColor: item.candidacy.candidate.color }}
                            />
                            <span className="font-semibold text-quizz-dark">
                              {item.candidacy.candidate.pseudo}
                            </span>
                            <CandidacyTag tag={item.tag} />
                            <span className="text-xs text-gray-500 lg:hidden">
                              {formatEventDate(item.event.date)}
                            </span>
                          </span>
                          <span className="mt-1 block text-sm leading-relaxed text-gray-600">
                            {item.event.label}
                          </span>
                          <span className="mt-2 block text-xs text-gray-400">
                            {movementLabel(item.candidacy)} · lire l'historique →
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Withdrawn */}
        <section className="w-full bg-gray-50 px-5 py-12">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-2 font-[Merriweather] text-2xl font-bold text-quizz-dark">
              Ils ne seront pas candidats
            </h2>
            <p className="mb-6 text-sm text-gray-600">
              Ces {withdrawnCount} personnalités ont quitté la course, ou ont annoncé qu'elles n'y
              entreraient pas. Leurs réponses restent dans le quiz : savoir de qui vous étiez proche
              reste utile, et leur position pèse encore sur la campagne.
            </p>
            <ul className="grid gap-3 lg:grid-cols-2">
              {withdrawnCandidacies.map((candidacy) => (
                <li key={candidacy.slug}>
                  <Link
                    to={`/candidature/${candidacy.slug}`}
                    className="block h-full rounded-lg border border-gray-200 bg-white p-4 no-underline hover:shadow-sm"
                  >
                    <span className="flex flex-wrap items-center gap-2">
                      <span
                        className="inline-block h-3 w-3 shrink-0 rounded-full"
                        style={{ backgroundColor: candidacy.candidate.color }}
                      />
                      <span className="font-semibold text-quizz-dark">
                        {candidacy.candidate.pseudo}
                      </span>
                      <CandidacyTag tag="OUT" />
                    </span>
                    <span className="mt-1 block text-xs text-gray-500">
                      {candidacy.lastEvent ? formatEventDate(candidacy.lastEvent.date) : ''} ·{' '}
                      {movementLabel(candidacy)}
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-gray-600">
                      {candidacy.lastEvent?.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Potential */}
        <section className="mx-auto w-full max-w-4xl px-5 py-12">
          <h2 className="mb-2 font-[Merriweather] text-2xl font-bold text-quizz-dark">
            Cités, mais pas encore déclarés
          </h2>
          <p className="mb-6 text-sm text-gray-600">
            Tout le monde les attend, aucun n'a franchi le pas. Ils répondent quand même au quiz,
            comme les autres.
          </p>
          <ul className="grid gap-3 lg:grid-cols-2">
            {potentialCandidacies.map((candidacy) => (
              <li key={candidacy.slug}>
                <Link
                  to={`/candidature/${candidacy.slug}`}
                  className="block h-full rounded-lg border border-gray-200 p-4 no-underline hover:shadow-sm"
                >
                  <span className="flex flex-wrap items-center gap-2">
                    <span
                      className="inline-block h-3 w-3 shrink-0 rounded-full"
                      style={{ backgroundColor: candidacy.candidate.color }}
                    />
                    <span className="font-semibold text-quizz-dark">
                      {candidacy.candidate.pseudo}
                    </span>
                    <CandidacyTag tag={STATUS_TAG.potential} />
                  </span>
                  <span className="mt-1 block text-xs text-gray-500">{movementLabel(candidacy)}</span>
                  <span className="mt-2 block text-sm leading-relaxed text-gray-600">
                    {candidacy.summary}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Declared, full list */}
        <section className="w-full bg-gray-50 px-5 py-12">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-2 font-[Merriweather] text-2xl font-bold text-quizz-dark">
              Les {declaredCount} candidats déclarés
            </h2>
            <p className="mb-6 text-sm text-gray-600">
              Par ordre de déclaration, du plus ancien au plus récent.
            </p>
            <ul className="grid gap-2 lg:grid-cols-2">
              {[...declaredCandidacies]
                .sort((a, b) => (a.events[0]?.date || '').localeCompare(b.events[0]?.date || ''))
                .map((candidacy) => (
                  <li key={candidacy.slug}>
                    <Link
                      to={`/candidature/${candidacy.slug}`}
                      className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 no-underline hover:shadow-sm"
                    >
                      <span
                        className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: candidacy.candidate.color }}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-quizz-dark">
                          {candidacy.candidate.pseudo}
                        </span>
                        <span className="block text-xs text-gray-500">
                          {movementLabel(candidacy)}
                        </span>
                      </span>
                      <span className="shrink-0 text-xs text-gray-400">
                        {candidacy.events[0] ? formatEventDate(candidacy.events[0].date) : ''}
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
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
                Combien y a-t-il de candidats à la présidentielle 2027 ?
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                À ce jour, {declaredCount} personnes ont annoncé publiquement leur candidature. Ce
                nombre n'est pas définitif : la liste officielle sera arrêtée par le Conseil
                constitutionnel après le dépôt des 500 parrainages, quelques semaines avant le
                premier tour du 18 avril 2027.
              </p>
            </details>
            <details className="rounded-lg border border-gray-200 p-5">
              <summary className="cursor-pointer font-medium text-quizz-dark">
                Pourquoi les candidats qui ont renoncé restent-ils dans le quiz ?
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Parce que leurs positions existent toujours, et qu'elles pèsent sur la campagne
                quand elles se reportent sur quelqu'un d'autre. Vous pouvez donc toujours comparer
                vos réponses aux leurs. Une étiquette « OUT » signale ceux qui ne sont plus dans la
                course.
              </p>
            </details>
            <details className="rounded-lg border border-gray-200 p-5">
              <summary className="cursor-pointer font-medium text-quizz-dark">
                D'où viennent ces dates ?
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                De la presse. Chaque entrée et chaque sortie renvoie vers l'article qui la
                rapporte, sur la page de la candidature. Si une date vous semble fausse, écrivez-nous.
              </p>
            </details>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full bg-quizz-dark px-5 py-16 text-center text-white">
          <h2 className="mb-4 font-[Merriweather] text-2xl font-bold">
            Et vous, lequel pense comme vous ?
          </h2>
          <p className="mb-8 text-white/80">
            {quizzQuestionsCount} questions, {candidatesCount} personnalités, aucune inscription.
            Vous serez peut-être surpris.
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
