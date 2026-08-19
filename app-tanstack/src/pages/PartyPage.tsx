import { useMemo } from 'react';
import { Link, useParams } from '@app/lib/router';
import {
  getPartyBySlug,
  getPartyProximityRanking,
  getPartyCohesion,
  getPartyPositions,
  partyColor,
  partyList,
  partyThemes,
  themeProseLabel,
  capitalize,
} from '@app/utils/parties';
import { themeSlugMap, candidatesCount } from '@app/utils/seo';
import { quizzQuestionsCount } from '@app/utils/quizz';
import { getPollingForCandidate, formatMonthLong, formatPercent, sondagesData } from '@app/utils/sondages';
import Footer from '@app/components/Footer';

export default function PartyPage() {
  const { partySlug } = useParams<{ partySlug: string }>();
  const party = useMemo(() => getPartyBySlug(partySlug || ''), [partySlug]);

  if (!party) return null; // the loader throws notFound() for unknown slugs

  const color = partyColor(party);
  const isSolo = party.candidates.length === 1;

  const positionsByTheme = useMemo(
    () =>
      themeSlugMap.map((theme) => ({
        ...theme,
        positions: getPartyPositions(party, theme.questions),
        hasOwnPage: Boolean(party.hasThemePages) && partyThemes.some((t) => t.slug === theme.slug),
      })),
    [party],
  );

  const cohesion = useMemo(() => getPartyCohesion(party), [party]);
  const proximity = useMemo(() => getPartyProximityRanking(party.slug), [party.slug]);
  const closestParties = proximity.slice(0, 5);
  const furthestParties = proximity.slice(-3).reverse();

  const polling = useMemo(
    () =>
      party.candidates
        .map((c) => ({ candidate: c, poll: getPollingForCandidate(c.slug) }))
        .filter((p) => p.poll),
    [party],
  );

  // Questions where the party's candidates do not all pick the same answer: the honest
  // way to show that a party is not a single block, which is the point of the site.
  const disagreements = useMemo(
    () =>
      positionsByTheme
        .flatMap((theme) => theme.positions.map((p) => ({ ...p, themeName: theme.fr })))
        .filter((p) => p.answers.length > 1 && !p.unanimous),
    [positionsByTheme],
  );

  const otherParties = partyList.filter((p) => p.slug !== party.slug);

  return (
    <>
      <div className="flex flex-col items-center bg-white">
        {/* Hero */}
        <section className="w-full bg-quizz-dark px-5 py-16 text-center text-white">
          <div className="mx-auto max-w-3xl">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="inline-block h-4 w-4 rounded-full" style={{ backgroundColor: color }} />
              <h1 className="font-[Merriweather] text-3xl font-bold leading-tight max-lg:text-2xl">
                Programme {party.ofName} pour 2027
              </h1>
            </div>
            <p className="text-lg leading-relaxed text-white/80">
              Ce que {isSolo ? 'son candidat répond' : 'ses candidats répondent'} aux{' '}
              {quizzQuestionsCount} questions du quiz, thème par thème, et les partis les plus
              proches {party.ofShort}.
            </p>
            <Link
              to="/themes"
              className="mt-8 inline-block rounded-full bg-yellow-400 px-8 py-3 font-semibold text-black no-underline hover:bg-yellow-300"
            >
              Comparez vos idées avec {party.theShort}
            </Link>
          </div>
        </section>

        {/* Who they are */}
        <section className="mx-auto w-full max-w-4xl px-5 py-12">
          <h2 className="mb-3 font-[Merriweather] text-2xl font-bold text-quizz-dark">
            {capitalize(party.theName)}, c'est qui ?
          </h2>
          <p className="text-sm leading-relaxed text-gray-700">{party.intro}</p>
          <p className="mt-3 text-sm text-gray-600">
            Parti fondé en {party.foundedYear}. Site officiel :{' '}
            <a
              href={party.officialSite}
              target="_blank"
              rel="nofollow noreferrer"
              className="text-blue-600 no-underline hover:underline"
            >
              {party.officialSite.replace(/^https?:\/\//, '')}
            </a>
            .
          </p>

          <h3 className="mb-3 mt-8 font-semibold text-quizz-dark">
            {isSolo
              ? `Le candidat ${party.ofShort} dans le quiz`
              : `Les ${party.candidates.length} candidats ${party.ofShort} dans le quiz`}
          </h3>
          <ul className="grid gap-3 sm:grid-cols-2">
            {party.candidates.map((candidate) => (
              <li key={candidate.id}>
                <Link
                  to={`/candidat/${candidate.slug}`}
                  className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 no-underline transition hover:shadow-sm"
                >
                  {candidate.picture ? (
                    <img
                      src={`/${candidate.picture}`}
                      alt={candidate.pseudo}
                      width={56}
                      height={56}
                      loading="lazy"
                      className="h-14 w-14 shrink-0 rounded-full bg-gray-100 object-cover object-top"
                    />
                  ) : (
                    <span
                      className="inline-block h-3 w-3 shrink-0 rounded-full"
                      style={{ backgroundColor: candidate.color }}
                    />
                  )}
                  <span>
                    <span className="block text-sm font-semibold text-quizz-dark">
                      {candidate.pseudo}
                    </span>
                    <span className="block text-xs text-gray-500">
                      Ses {quizzQuestionsCount} réponses →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Internal cohesion */}
        {cohesion.length > 0 && (
          <section className="w-full bg-gray-50 px-5 py-12">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-2 font-[Merriweather] text-2xl font-bold text-quizz-dark">
                Les candidats {party.ofShort} sont-ils d'accord entre eux ?
              </h2>
              <p className="mb-6 text-sm text-gray-600">
                Un parti n'est pas un bloc. Voici la proximité entre ses candidats, calculée avec
                l'algorithme du quiz sur leurs réponses.
              </p>
              <ul className="space-y-3">
                {cohesion.map((pair) => (
                  <li key={pair.pairSlug}>
                    <Link
                      to={`/comparer/${pair.pairSlug}`}
                      className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 no-underline transition hover:shadow-sm"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-quizz-dark">
                          {pair.candidate1.pseudo} <span className="text-gray-400">vs</span>{' '}
                          {pair.candidate2.pseudo}
                        </span>
                        <span className="block text-xs text-gray-500">
                          {pair.sameAnswers} réponses identiques sur {pair.comparedQuestions}
                        </span>
                        <span className="mt-2 block h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                          <span
                            className="block h-full rounded-full"
                            style={{ width: `${pair.percent}%`, backgroundColor: color }}
                          />
                        </span>
                      </span>
                      <span className="shrink-0 text-lg font-bold" style={{ color }}>
                        {pair.percent}%
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              {disagreements.length > 0 && (
                <>
                  <h3 className="mb-3 mt-8 font-semibold text-quizz-dark">
                    Les {disagreements.length} questions sur lesquelles ils ne répondent pas pareil
                  </h3>
                  <ul className="space-y-4">
                    {disagreements.map((position) => (
                      <li
                        key={position.question._id}
                        className="rounded-lg border border-gray-200 bg-white p-4"
                      >
                        <p className="text-xs uppercase tracking-wide text-gray-400">
                          {position.themeName}
                        </p>
                        {position.questionSlug ? (
                          <Link
                            to={`/question-politique/${position.questionSlug}`}
                            className="mt-1 block text-sm font-semibold text-quizz-dark no-underline hover:text-blue-700 hover:underline"
                          >
                            {position.question.fr}
                          </Link>
                        ) : (
                          <p className="mt-1 text-sm font-semibold text-quizz-dark">
                            {position.question.fr}
                          </p>
                        )}
                        <ul className="mt-2 space-y-1">
                          {position.answers.map((answer) => (
                            <li key={answer.candidate.id} className="text-sm">
                              <span className="font-medium text-gray-700">
                                {answer.candidate.pseudo}
                              </span>
                              <span className="italic text-gray-600"> — {answer.answerText}</span>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </section>
        )}

        {/* Polling */}
        <section className="mx-auto w-full max-w-4xl px-5 pt-12">
          <h2 className="mb-3 font-[Merriweather] text-2xl font-bold text-quizz-dark">
            {capitalize(party.theShort)} dans les sondages de 2027
          </h2>
          {polling.length > 0 ? (
            <>
              <p className="text-sm leading-relaxed text-gray-600">
                Les instituts ne testent pas un parti, ils testent des noms. Voici les dernières
                moyennes mensuelles de premier tour pour {isSolo ? 'le candidat' : 'les candidats'}{' '}
                {party.ofShort}. Ce sont des hypothèses concurrentes : elles ne s'additionnent pas.
              </p>
              <ul className="mt-4 space-y-2">
                {polling.map(({ candidate, poll }) => (
                  <li key={candidate.id} className="text-sm text-gray-700">
                    <Link
                      to={`/candidat/${candidate.slug}`}
                      className="font-medium text-quizz-dark no-underline hover:underline"
                    >
                      {candidate.pseudo}
                    </Link>{' '}
                    — <strong>{formatPercent(poll!.latest as number)} %</strong> en{' '}
                    {poll!.latestMonth ? formatMonthLong(poll!.latestMonth) : '—'}, testé dans{' '}
                    {poll!.appearances} hypothèses.
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm">
                <Link
                  to="/sondages-presidentielle-2027"
                  className="text-blue-600 no-underline hover:underline"
                >
                  Voir la courbe complète des sondages 2027 →
                </Link>
              </p>
            </>
          ) : (
            <p className="text-sm leading-relaxed text-gray-600">
              À ce jour, aucun sondage publié de premier tour ne teste{' '}
              {isSolo ? 'le candidat' : 'les candidats'} {party.ofShort}. La liste des noms soumis
              aux sondés est un choix de l'institut : être absent des sondages ne veut pas dire ne
              pas avoir de programme. Celui {party.ofShort} est ci-dessous, comparable comme celui
              des autres.{' '}
              <Link
                to="/sondages-presidentielle-2027"
                className="text-blue-600 no-underline hover:underline"
              >
                Voir qui les instituts testent, et depuis quand →
              </Link>
            </p>
          )}
          <p className="mt-2 text-xs text-gray-500">
            Sondages mis à jour le {sondagesData.fetchedAt}, source{' '}
            <a href={sondagesData.source.url} target="_blank" rel="noreferrer" className="underline">
              {sondagesData.source.name}
            </a>
            .
          </p>
        </section>

        {/* Programme, theme by theme */}
        <section className="mx-auto w-full max-w-4xl px-5 py-12">
          <h2 className="mb-3 font-[Merriweather] text-2xl font-bold text-quizz-dark">
            Le programme {party.ofName}, thème par thème
          </h2>
          <p className="mb-8 text-sm text-gray-600">
            Les réponses ci-dessous viennent des programmes officiels, des déclarations publiques et
            des votes {isSolo ? 'du candidat' : 'des candidats'} {party.ofShort}. Elles sont posées
            dans les mêmes termes que pour les {candidatesCount} personnalités du quiz, ce qui
            permet de les comparer.
          </p>
          <div className="space-y-8">
            {positionsByTheme.map((theme, themeIdx) => (
              <details
                key={theme.themeId}
                open={themeIdx === 0}
                className="group rounded-lg border border-gray-200"
              >
                <summary className="flex cursor-pointer items-center justify-between p-5 font-semibold text-quizz-dark">
                  <span>
                    {theme.fr}{' '}
                    <span className="text-sm font-normal text-gray-400">
                      ({theme.questions.length} questions)
                    </span>
                  </span>
                  <span className="text-sm text-gray-400 transition-transform group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <div className="border-t border-gray-100 p-5">
                  {theme.hasOwnPage && (
                    <p className="mb-4 text-sm">
                      <Link
                        to={`/parti/${party.slug}/${theme.slug}`}
                        className="text-blue-600 no-underline hover:underline"
                      >
                        Le programme {party.ofShort} sur {themeProseLabel(theme)}, en détail →
                      </Link>
                    </p>
                  )}
                  <ul className="space-y-4">
                    {theme.positions.map((position) => (
                      <li key={position.question._id}>
                        {position.questionSlug ? (
                          <Link
                            to={`/question-politique/${position.questionSlug}`}
                            className="mb-1 block text-sm font-medium text-gray-800 no-underline hover:text-blue-700 hover:underline"
                          >
                            {position.question.fr}
                          </Link>
                        ) : (
                          <p className="mb-1 text-sm font-medium text-gray-800">
                            {position.question.fr}
                          </p>
                        )}
                        {position.answers.length === 0 ? (
                          <p className="text-sm italic text-gray-400">
                            — Pas de position renseignée
                          </p>
                        ) : position.unanimous || isSolo ? (
                          <p className="text-sm italic" style={{ color }}>
                            → {position.answers[0].answerText}
                          </p>
                        ) : (
                          position.answers.map((answer) => (
                            <p key={answer.candidate.id} className="text-sm italic" style={{ color }}>
                              → {answer.candidate.pseudo} : {answer.answerText}
                            </p>
                          ))
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Closest parties */}
        {closestParties.length > 0 && (
          <section className="w-full bg-gray-50 px-5 py-12">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-2 font-[Merriweather] text-2xl font-bold text-quizz-dark">
                Quels partis sont les plus proches {party.ofShort} ?
              </h2>
              <p className="mb-6 text-sm text-gray-600">
                Chaque candidat {party.ofShort} est comparé à chaque candidat des autres partis,
                puis la moyenne est faite. Réponse identique = 5 points, réponse voisine = moins de
                points, rien en commun = 0.
              </p>
              <ol className="space-y-3">
                {closestParties.map((other, rank) => (
                  <li key={other.slug}>
                    <Link
                      to={`/parti/${other.slug}`}
                      className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 no-underline transition hover:shadow-sm"
                    >
                      <span className="w-5 shrink-0 text-lg font-bold text-gray-300">{rank + 1}</span>
                      <span
                        className="inline-block h-3 w-3 shrink-0 rounded-full"
                        style={{ backgroundColor: other.color }}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-quizz-dark">
                          {other.name}
                        </span>
                        <span className="mt-2 block h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                          <span
                            className="block h-full rounded-full"
                            style={{ width: `${other.percent}%`, backgroundColor: other.color }}
                          />
                        </span>
                      </span>
                      <span className="shrink-0 text-lg font-bold" style={{ color: other.color }}>
                        {other.percent}%
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>

              {furthestParties.length > 0 && (
                <>
                  <h3 className="mb-3 mt-8 font-semibold text-quizz-dark">
                    Et les plus éloignés {party.ofShort}
                  </h3>
                  <ul className="flex flex-wrap gap-3">
                    {furthestParties.map((other) => (
                      <li key={other.slug}>
                        <Link
                          to={`/parti/${other.slug}`}
                          className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-quizz-dark no-underline hover:bg-white/60"
                        >
                          <span
                            className="inline-block h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: other.color }}
                          />
                          {other.name}
                          <span className="text-gray-400">{other.percent}%</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="mx-auto w-full max-w-4xl px-5 py-12">
          <h2 className="mb-6 font-[Merriweather] text-xl font-bold text-quizz-dark">
            Questions fréquentes sur le programme {party.ofShort}
          </h2>
          <div className="space-y-4">
            <details className="rounded-lg border border-gray-200 p-5">
              <summary className="cursor-pointer font-medium text-quizz-dark">
                D'où viennent ces positions ?
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                {isSolo ? 'Le candidat' : 'Les candidats'} {party.ofShort}{' '}
                {isSolo ? "n'a" : "n'ont"} pas rempli le quiz {isSolo ? 'lui-même' : 'eux-mêmes'}.
                Chaque réponse vient des programmes officiels, des déclarations publiques et des
                votes passés. Une position peut évoluer, et nous mettons les réponses à jour au fil
                de la campagne.
              </p>
            </details>
            <details className="rounded-lg border border-gray-200 p-5">
              <summary className="cursor-pointer font-medium text-quizz-dark">
                Comment savoir si je suis d'accord avec {party.theShort} ?
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Répondez aux {quizzQuestionsCount} questions du quiz, ou seulement à celles qui vous
                intéressent. L'algorithme compare ensuite vos réponses à celles des{' '}
                {candidatesCount} personnalités, {party.shortName} compris, et vous donne votre
                pourcentage d'accord avec chacune.
              </p>
            </details>
            <details className="rounded-lg border border-gray-200 p-5">
              <summary className="cursor-pointer font-medium text-quizz-dark">
                Un parti pense-t-il vraiment d'un seul bloc ?
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                {cohesion.length > 0
                  ? `Non. Sur les ${quizzQuestionsCount} questions du quiz, les candidats ${party.ofShort} présents ici divergent sur ${disagreements.length} d'entre elles. Le détail est plus haut sur cette page.`
                  : `Le quiz ne contient qu'un seul candidat ${party.ofShort}, donc cette page montre ses réponses à lui, pas une moyenne du parti. Les partis qui comptent plusieurs candidats montrent, eux, leurs désaccords internes.`}
              </p>
            </details>
          </div>
        </section>

        {/* Other parties */}
        <section className="w-full bg-white px-5 pb-12">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 font-[Merriweather] text-xl font-bold text-quizz-dark">
              Les programmes des autres partis
            </h2>
            <div className="flex flex-wrap gap-3">
              {otherParties.map((other) => (
                <Link
                  key={other.slug}
                  to={`/parti/${other.slug}`}
                  className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-quizz-dark no-underline hover:bg-gray-50"
                >
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: partyColor(other) }}
                  />
                  {other.name}
                </Link>
              ))}
              <Link
                to="/partis"
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-blue-600 no-underline hover:bg-gray-50"
              >
                Tous les partis →
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full bg-quizz-dark px-5 py-16 text-center text-white">
          <h2 className="mb-4 font-[Merriweather] text-2xl font-bold">
            Êtes-vous d'accord avec {party.theShort} ?
          </h2>
          <p className="mb-8 text-white/80">
            Répondez au quiz pour découvrir de quel parti vos idées sont les plus proches.
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
