import { useMemo } from 'react';
import { Link } from '@app/lib/router';
import { candidateSlugMap, candidatesCount } from '@app/utils/seo';
import { quizzQuestionsCount } from '@app/utils/quizz';
import sondages from '@app/content/sondages-2027.json';
import Footer from '@app/components/Footer';

/** Candidates polled in one of the last N months are shown in the chart. */
const RECENT_MONTHS = 3;
const MIN_APPEARANCES = 5;
const CHARTED_CANDIDATES = 8;

const CHART_WIDTH = 820;
const CHART_HEIGHT = 380;
const PADDING = { top: 20, right: 16, bottom: 34, left: 38 };

/** Poll candidates the quiz does not cover have no colour of their own. */
const FALLBACK_COLORS = ['#334155', '#7c3aed', '#0891b2', '#b45309', '#be123c', '#15803d'];

const MONTH_LABELS = [
  'janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin',
  'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.',
];

function formatMonth(month: string): string {
  const [year, monthNumber] = month.split('-');
  return `${MONTH_LABELS[Number(monthNumber) - 1]} ${year.slice(2)}`;
}

function formatDate(date: string): string {
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
}

const colorBySlug = new Map(candidateSlugMap.map((c) => [c.slug, c.color]));

export default function SondagesPage() {
  const { months, candidates, notPolled, latestPolls, lastPollDate, pollCount, source } = sondages;

  const lastMonth = months[months.length - 1];
  const recentThreshold = months[Math.max(0, months.length - RECENT_MONTHS)];

  const charted = useMemo(() => {
    return candidates
      .filter(
        (c) =>
          c.appearances >= MIN_APPEARANCES &&
          c.latestMonth !== null &&
          c.latestMonth >= recentThreshold,
      )
      .slice(0, CHARTED_CANDIDATES)
      .map((candidate, idx) => ({
        ...candidate,
        color:
          (candidate.slug ? colorBySlug.get(candidate.slug) : undefined) ||
          FALLBACK_COLORS[idx % FALLBACK_COLORS.length],
      }));
  }, [candidates, recentThreshold]);

  const occasional = useMemo(
    () =>
      candidates.filter(
        (c) => !charted.some((charted) => charted.candidat === c.candidat) && c.latest !== null,
      ),
    [candidates, charted],
  );

  const yMax = useMemo(() => {
    const highest = Math.max(...charted.flatMap((c) => c.series.map((p) => p.value)), 10);
    return Math.ceil(highest / 5) * 5;
  }, [charted]);

  const plotWidth = CHART_WIDTH - PADDING.left - PADDING.right;
  const plotHeight = CHART_HEIGHT - PADDING.top - PADDING.bottom;
  const xOf = (month: string) =>
    PADDING.left + (months.indexOf(month) / Math.max(1, months.length - 1)) * plotWidth;
  const yOf = (value: number) => PADDING.top + (1 - value / yMax) * plotHeight;

  const yTicks = Array.from({ length: yMax / 5 + 1 }, (_, i) => i * 5);

  return (
    <>
      <div className="flex flex-col items-center bg-white">
        {/* Hero */}
        <section className="w-full bg-quizz-dark px-5 py-16 text-center text-white">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 font-[Merriweather] text-3xl font-bold leading-tight max-lg:text-2xl">
              Sondages présidentielle 2027 : l'évolution mois par mois
            </h1>
            <p className="text-lg leading-relaxed text-white/80">
              La moyenne des intentions de vote au premier tour, calculée sur {pollCount} sondages
              publiés depuis {formatMonth(months[0])}. Dernier sondage pris en compte :{' '}
              {formatDate(lastPollDate)}.
            </p>
            <p className="mt-4 text-sm text-white/60">
              Un sondage n'est pas une élection. Il mesure une intention, à un moment, sur une liste de
              noms choisie par l'institut.
            </p>
          </div>
        </section>

        {/* Chart */}
        <section className="mx-auto w-full max-w-5xl px-5 py-12">
          <h2 className="mb-2 font-[Merriweather] text-2xl font-bold text-quizz-dark">
            La courbe des intentions de vote au premier tour
          </h2>
          <p className="mb-6 text-sm text-gray-600">
            Chaque point est la moyenne des sondages du mois. Les mois sans sondage pour un candidat sont
            reliés en ligne droite.
          </p>

          <div className="overflow-x-auto">
            <svg
              viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
              className="h-auto w-full min-w-[640px]"
              role="img"
              aria-label={`Évolution des intentions de vote au premier tour de la présidentielle 2027, de ${formatMonth(months[0])} à ${formatMonth(lastMonth)}`}
            >
              {yTicks.map((tick) => (
                <g key={tick}>
                  <line
                    x1={PADDING.left}
                    x2={CHART_WIDTH - PADDING.right}
                    y1={yOf(tick)}
                    y2={yOf(tick)}
                    stroke="#e5e7eb"
                    strokeWidth={1}
                  />
                  <text x={0} y={yOf(tick) + 4} fontSize={11} fill="#9ca3af">
                    {tick}%
                  </text>
                </g>
              ))}

              {months.map((month, idx) =>
                idx % 2 === 0 || idx === months.length - 1 ? (
                  <text
                    key={month}
                    x={xOf(month)}
                    y={CHART_HEIGHT - 12}
                    fontSize={11}
                    fill="#9ca3af"
                    textAnchor="middle"
                  >
                    {formatMonth(month)}
                  </text>
                ) : null,
              )}

              {charted.map((candidate) => {
                const points = candidate.series.map((p) => `${xOf(p.month)},${yOf(p.value)}`);
                return (
                  <g key={candidate.candidat}>
                    <polyline
                      points={points.join(' ')}
                      fill="none"
                      stroke={candidate.color}
                      strokeWidth={2.5}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                    {candidate.series.map((p) => (
                      <circle
                        key={p.month}
                        cx={xOf(p.month)}
                        cy={yOf(p.value)}
                        r={3}
                        fill={candidate.color}
                      >
                        <title>{`${candidate.candidat} — ${formatMonth(p.month)} : ${p.value}% (${p.polls} sondages)`}</title>
                      </circle>
                    ))}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Legend, doubles as the "who is where today" table */}
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {charted.map((candidate) => (
              <li
                key={candidate.candidat}
                className="flex items-center gap-3 rounded-lg border border-gray-200 p-3"
              >
                <span
                  className="inline-block h-3 w-3 shrink-0 rounded-full"
                  style={{ backgroundColor: candidate.color }}
                />
                <span className="min-w-0 flex-1">
                  {candidate.slug ? (
                    <Link
                      to={`/candidat/${candidate.slug}`}
                      className="text-sm font-semibold text-quizz-dark no-underline hover:underline"
                    >
                      {candidate.candidat}
                    </Link>
                  ) : (
                    <span className="text-sm font-semibold text-quizz-dark">{candidate.candidat}</span>
                  )}
                  {candidate.parti && (
                    <span className="block text-xs text-gray-500">{candidate.parti}</span>
                  )}
                </span>
                <span className="shrink-0 text-lg font-bold" style={{ color: candidate.color }}>
                  {candidate.latest}%
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-xs text-gray-500">
            Source des sondages : {source.name} (licence {source.licence}),{' '}
            <a href={source.url} target="_blank" rel="noreferrer" className="underline">
              jeu de données ouvert
            </a>
            . Compilation des sondages déposés auprès de la Commission des sondages.
          </p>
        </section>

        {/* Candidates absent from the polls */}
        {notPolled.length > 0 && (
          <section className="w-full bg-gray-50 px-5 py-12">
            <div className="mx-auto max-w-5xl">
              <h2 className="mb-2 font-[Merriweather] text-2xl font-bold text-quizz-dark">
                Les candidats qui n'apparaissent dans aucun sondage
              </h2>
              <p className="mb-6 text-sm text-gray-600">
                Un institut ne teste que les noms qu'il choisit de tester. Ces {notPolled.length}{' '}
                personnalités sont dans le quiz, mais aucun sondage du premier tour publié à ce jour ne
                mesure leurs intentions de vote. Leur programme, lui, est comparable comme celui des
                autres.
              </p>
              <ul className="flex flex-wrap gap-3">
                {notPolled.map((candidate) => (
                  <li key={candidate.slug}>
                    <Link
                      to={`/candidat/${candidate.slug}`}
                      className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-quizz-dark no-underline hover:shadow-sm"
                    >
                      <span
                        className="inline-block h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: colorBySlug.get(candidate.slug) || '#94a3b8' }}
                      />
                      {candidate.pseudo}
                    </Link>
                  </li>
                ))}
              </ul>

              {occasional.length > 0 && (
                <>
                  <h3 className="mb-3 mt-8 font-semibold text-quizz-dark">
                    Testés seulement de temps en temps
                  </h3>
                  <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {occasional.map((candidate) => (
                      <li
                        key={candidate.candidat}
                        className="rounded-lg border border-gray-200 bg-white p-3 text-sm"
                      >
                        {candidate.slug ? (
                          <Link
                            to={`/candidat/${candidate.slug}`}
                            className="font-medium text-quizz-dark no-underline hover:underline"
                          >
                            {candidate.candidat}
                          </Link>
                        ) : (
                          <span className="font-medium text-quizz-dark">{candidate.candidat}</span>
                        )}
                        <span className="block text-xs text-gray-500">
                          {candidate.latest}% en {candidate.latestMonth ? formatMonth(candidate.latestMonth) : '—'}
                          {' · '}
                          {candidate.appearances} apparitions
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </section>
        )}

        {/* Latest polls */}
        <section className="mx-auto w-full max-w-5xl px-5 py-12">
          <h2 className="mb-2 font-[Merriweather] text-2xl font-bold text-quizz-dark">
            Les {latestPolls.length} derniers sondages publiés
          </h2>
          <p className="mb-6 text-sm text-gray-600">
            Un institut teste souvent plusieurs hypothèses de candidatures dans la même enquête. Chaque
            ligne ci-dessous est une hypothèse.
          </p>
          <div className="space-y-4">
            {latestPolls.map((poll, idx) => (
              <div key={`${poll.institut}-${poll.fin}-${idx}`} className="rounded-lg border border-gray-200 p-5">
                <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-semibold text-quizz-dark">
                    {poll.institut}
                    {poll.commanditaire && (
                      <span className="font-normal text-gray-500"> pour {poll.commanditaire}</span>
                    )}
                  </p>
                  <p className="text-xs text-gray-500">
                    Terrain du {formatDate(poll.debut)} au {formatDate(poll.fin)}
                    {poll.echantillon ? ` · ${poll.echantillon} personnes` : ''}
                    {poll.hypothese ? ` · hypothèse ${poll.hypothese}` : ''}
                  </p>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {poll.resultats.map((result) => (
                    <li
                      key={result.candidat}
                      className="rounded-full border border-gray-200 px-3 py-1 text-xs text-quizz-dark"
                    >
                      {result.candidat} <span className="font-semibold">{result.intentions}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="w-full bg-gray-50 px-5 py-12">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 font-[Merriweather] text-xl font-bold text-quizz-dark">
              Questions fréquentes sur les sondages 2027
            </h2>
            <div className="space-y-4">
              <details className="rounded-lg border border-gray-200 bg-white p-5">
                <summary className="cursor-pointer font-medium text-quizz-dark">
                  D'où viennent ces chiffres ?
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  Du jeu de données ouvert {source.name}, qui compile les sondages déposés auprès de la
                  Commission des sondages. Nous n'ajoutons rien : nous calculons une moyenne mensuelle
                  par candidat, et nous la mettons à jour chaque semaine.
                </p>
              </details>
              <details className="rounded-lg border border-gray-200 bg-white p-5">
                <summary className="cursor-pointer font-medium text-quizz-dark">
                  Pourquoi un candidat peut-il être absent ?
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  Parce qu'aucun institut ne l'a testé. La liste des noms soumis aux sondés est un choix
                  éditorial de l'institut et de son commanditaire. Être absent des sondages ne veut pas
                  dire ne pas être candidat, ni ne pas avoir de programme.
                </p>
              </details>
              <details className="rounded-lg border border-gray-200 bg-white p-5">
                <summary className="cursor-pointer font-medium text-quizz-dark">
                  Faut-il voter pour celui qui est en tête ?
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  C'est votre choix, pas le nôtre. Mais un sondage vous dit ce que pensent les autres, pas
                  ce que vous pensez. Le quiz, lui, compare vos {quizzQuestionsCount} réponses à celles des{' '}
                  {candidatesCount} candidats, et le résultat surprend souvent.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full bg-quizz-dark px-5 py-16 text-center text-white">
          <h2 className="mb-4 font-[Merriweather] text-2xl font-bold">Alors vous en pensez quoi ?</h2>
          <p className="mb-8 text-white/80">
            Les sondages disent qui est populaire. Le quiz dit qui vous ressemble. Ce n'est pas la même
            chose.
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
