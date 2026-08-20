import { useMemo } from 'react';
import { Link, useParams } from '@app/lib/router';
import {
  getCandidacyBySlug,
  candidacyList,
  formatEventDate,
  movementLabel,
  declaredCount,
} from '@app/utils/candidacies';
import CandidacyTag, { STATUS_TAG } from '@app/components/CandidacyTag';
import type { CandidacyStatus } from '@app/utils/candidacies';
import { getCandidateProximityRanking } from '@app/utils/proximity';
import { getPartyForCandidate, deName } from '@app/utils/parties';
import { quizzQuestionsCount } from '@app/utils/quizz';
import { candidatesCount } from '@app/utils/seo';
import Footer from '@app/components/Footer';

function statusSentence(status: CandidacyStatus, feminine: boolean): string {
  const e = feminine ? 'e' : '';
  if (status === 'declared') return `est candidat${e} à l'élection présidentielle de 2027`;
  if (status === 'withdrawn') return `ne sera pas candidat${e} à l'élection présidentielle de 2027`;
  return `n'a pas déclaré sa candidature à l'élection présidentielle de 2027`;
}

export default function CandidacyPage() {
  const { candidateSlug } = useParams<{ candidateSlug: string }>();
  const candidacy = useMemo(() => getCandidacyBySlug(candidateSlug || ''), [candidateSlug]);

  if (!candidacy) return null; // loader throws notFound() for unknown slugs

  const { candidate } = candidacy;
  const party = useMemo(() => getPartyForCandidate(candidacy.slug), [candidacy.slug]);
  const closest = useMemo(
    () => getCandidateProximityRanking(candidacy.slug).slice(0, 3),
    [candidacy.slug],
  );
  const others = useMemo(
    () =>
      candidacyList
        .filter((c) => c.slug !== candidacy.slug && c.lastEvent && c.lastEvent.type !== 'step')
        .sort((a, b) => (b.lastEvent?.date || '').localeCompare(a.lastEvent?.date || ''))
        .slice(0, 6),
    [candidacy.slug],
  );

  const feminine = Boolean(candidacy.feminine);
  const declaration = candidacy.events.find((e) => e.type === 'declaration');
  const withdrawal = candidacy.events.find((e) => e.type === 'withdrawal');

  return (
    <>
      <div className="flex flex-col items-center bg-white">
        {/* Hero */}
        <section className="w-full bg-quizz-dark px-5 py-16 text-center text-white">
          <div className="mx-auto max-w-3xl">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span
                className="inline-block h-4 w-4 rounded-full"
                style={{ backgroundColor: candidate.color }}
              />
              <h1 className="font-[Merriweather] text-3xl font-bold leading-tight max-lg:text-2xl">
                {candidate.pseudo}, candidat{feminine ? 'e' : ''} en 2027 ?
              </h1>
            </div>
            <p className="mb-4">
              <CandidacyTag tag={STATUS_TAG[candidacy.status]} className="text-xs" />
            </p>
            <p className="text-lg leading-relaxed text-white/80">
              {candidate.pseudo} {statusSentence(candidacy.status, feminine)}
              {candidacy.status === 'declared' && declaration
                ? `, depuis le ${formatEventDate(declaration.date)}`
                : ''}
              {candidacy.status === 'withdrawn' && withdrawal
                ? `. ${feminine ? 'Elle' : 'Il'} a renoncé le ${formatEventDate(withdrawal.date)}`
                : ''}
              . {movementLabel(candidacy)}.
            </p>
            <Link
              to="/qui-est-candidat-2027"
              className="mt-6 inline-block text-sm text-white/80 underline"
            >
              ← Tous les candidats et leurs dates
            </Link>
          </div>
        </section>

        {/* Summary */}
        <section className="mx-auto w-full max-w-3xl px-5 py-12">
          <p className="text-base leading-relaxed text-gray-700">{candidacy.summary}</p>

          {candidacy.quote && (
            <blockquote className="mt-6 border-l-4 border-yellow-400 pl-5">
              <p className="font-[Merriweather] text-lg leading-relaxed text-quizz-dark">
                « {candidacy.quote.text} »
              </p>
              <footer className="mt-2 text-xs text-gray-500">
                {candidate.pseudo},{' '}
                <a
                  href={candidacy.quote.source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  {candidacy.quote.source.label}
                </a>
                {candidacy.quote.source.date ? ` · ${formatEventDate(candidacy.quote.source.date)}` : ''}
              </footer>
            </blockquote>
          )}
        </section>

        {/* History */}
        {candidacy.events.length > 0 && (
          <section className="w-full bg-gray-50 px-5 py-12">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-6 font-[Merriweather] text-2xl font-bold text-quizz-dark">
                L'historique de la candidature {deName(candidate.pseudo)}
              </h2>
              <ol className="relative space-y-6 border-l-2 border-gray-200 pl-6">
                {candidacy.events.map((event) => (
                  <li key={`${event.date}-${event.type}`} className="relative">
                    <span
                      aria-hidden="true"
                      className={`absolute -left-[31px] top-1.5 h-3 w-3 rounded-full ring-4 ring-gray-50 ${
                        event.type === 'withdrawal'
                          ? 'bg-red-500'
                          : event.type === 'declaration'
                            ? 'bg-emerald-500'
                            : 'bg-gray-300'
                      }`}
                    />
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                      {formatEventDate(event.date)}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-gray-700">{event.label}</p>
                    <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">
                      {event.sources.map((source) => (
                        <a
                          key={source.url}
                          href={source.url}
                          target="_blank"
                          rel="noreferrer"
                          className="underline"
                        >
                          {source.label}
                        </a>
                      ))}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {candidacy.events.length === 0 && (
          <section className="w-full bg-gray-50 px-5 py-12">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-3 font-[Merriweather] text-2xl font-bold text-quizz-dark">
                Aucune déclaration à ce jour
              </h2>
              <p className="text-sm leading-relaxed text-gray-600">
                {candidate.pseudo} n'a fait aucune annonce datée de candidature. Cette page sera
                mise à jour le jour où {feminine ? 'elle' : 'il'} se déclare, ou renonce. En
                attendant, ses positions sont dans le quiz, au même format que celles des{' '}
                {declaredCount} candidats déclarés.
              </p>
            </div>
          </section>
        )}

        {/* Positions */}
        <section className="mx-auto w-full max-w-3xl px-5 py-12">
          <h2 className="mb-3 font-[Merriweather] text-2xl font-bold text-quizz-dark">
            Ses positions, comparées à celles des autres
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-gray-600">
            Nous avons reconstitué les réponses de {candidate.pseudo} aux {quizzQuestionsCount}{' '}
            questions du quiz, à partir de ses prises de position publiques. Vous pouvez donc
            comparer les vôtres aux siennes, même {feminine ? 'si elle' : "s'il"} n'est plus dans la
            course.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to={`/candidat/${candidacy.slug}`}
              className="rounded-full bg-quizz-dark px-5 py-2.5 text-sm font-semibold text-white no-underline hover:bg-black"
            >
              Le programme de {candidate.pseudo}
            </Link>
            {party && (
              <Link
                to={`/parti/${party.slug}`}
                className="rounded-full border border-gray-200 px-5 py-2.5 text-sm text-quizz-dark no-underline hover:bg-gray-50"
              >
                Le programme {party.ofShort}
              </Link>
            )}
            <Link
              to="/themes"
              className="rounded-full border border-gray-200 px-5 py-2.5 text-sm text-quizz-dark no-underline hover:bg-gray-50"
            >
              Faire le quiz
            </Link>
          </div>

          {closest.length > 0 && (
            <>
              <h3 className="mb-3 mt-8 font-semibold text-quizz-dark">
                Les plus proches de {candidate.pseudo} sur le fond
              </h3>
              <ul className="space-y-2">
                {closest.map((other) => (
                  <li key={other.slug}>
                    <Link
                      to={`/comparer/${other.pairSlug}`}
                      className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 no-underline hover:shadow-sm"
                    >
                      <span
                        className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: other.color }}
                      />
                      <span className="flex-1 text-sm font-semibold text-quizz-dark">
                        {other.pseudo}
                      </span>
                      <span className="text-sm font-bold" style={{ color: other.color }}>
                        {other.percent}%
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>

        {/* Other movements */}
        <section className="w-full bg-gray-50 px-5 py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 font-[Merriweather] text-xl font-bold text-quizz-dark">
              Les derniers mouvements de la campagne
            </h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link
                    to={`/candidature/${other.slug}`}
                    className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 no-underline hover:shadow-sm"
                  >
                    <span
                      className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: other.candidate.color }}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-quizz-dark">
                        {other.candidate.pseudo}
                      </span>
                      <span className="block text-xs text-gray-500">
                        {other.lastEvent ? formatEventDate(other.lastEvent.date) : ''}
                      </span>
                    </span>
                    <CandidacyTag tag={other.lastEvent?.type === 'withdrawal' ? 'OUT' : 'CANDIDAT'} />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm">
              <Link to="/qui-est-candidat-2027" className="text-blue-600 no-underline hover:underline">
                Voir la chronologie complète des {candidatesCount} candidatures →
              </Link>
            </p>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
