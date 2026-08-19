import { useMemo } from 'react';
import { Link, useParams } from '@app/lib/router';
import {
  getPartyBySlug,
  getPartyPositions,
  partyColor,
  partyList,
  partyThemes,
  themeProseLabel,
  capitalize,
} from '@app/utils/parties';
import { getThemeBySlug, candidatesCount } from '@app/utils/seo';
import Footer from '@app/components/Footer';

export default function PartyThemePage() {
  const { partySlug, themeSlug } = useParams<{ partySlug: string; themeSlug: string }>();
  const party = useMemo(() => getPartyBySlug(partySlug || ''), [partySlug]);
  const theme = useMemo(() => getThemeBySlug(themeSlug || ''), [themeSlug]);

  if (!party || !theme) return null; // the loader throws notFound() for unknown couples

  const color = partyColor(party);
  const isSolo = party.candidates.length === 1;

  const positions = useMemo(() => getPartyPositions(party, theme.questions), [party, theme]);
  const disagreements = positions.filter((p) => p.answers.length > 1 && !p.unanimous);

  const otherThemes = partyThemes.filter((t) => t.slug !== theme.slug);
  const otherParties = partyList.filter((p) => p.hasThemePages && p.slug !== party.slug);

  return (
    <>
      <div className="flex flex-col items-center bg-white">
        {/* Hero */}
        <section className="w-full bg-quizz-dark px-5 py-14 text-center text-white">
          <div className="mx-auto max-w-3xl">
            <nav className="mb-4 text-sm text-white/60">
              <Link to="/partis" className="text-white/60 no-underline hover:underline">
                Les partis
              </Link>
              {' › '}
              <Link to={`/parti/${party.slug}`} className="text-white/60 no-underline hover:underline">
                {party.name}
              </Link>
              {' › '}
              <span className="text-white/80">{theme.fr}</span>
            </nav>
            <h1 className="font-[Merriweather] text-3xl font-bold leading-tight max-lg:text-2xl">
              Le programme {party.ofName} sur {themeProseLabel(theme)}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-white/80">
              {theme.questions.length} questions, {isSolo ? 'la réponse' : 'les réponses'}{' '}
              {party.ofShort}, et qui d'autre répond pareil parmi les {candidatesCount}{' '}
              personnalités du quiz.
            </p>
          </div>
        </section>

        {/* The positions */}
        <section className="mx-auto w-full max-w-4xl px-5 py-12">
          <h2 className="mb-6 font-[Merriweather] text-2xl font-bold text-quizz-dark">
            Ce que {party.theShort} {party.plural ? 'répondent' : 'répond'}, question par question
          </h2>
          <ul className="space-y-8">
            {positions.map((position) => (
              <li
                key={position.question._id}
                className="border-t border-gray-100 pt-6 first:border-0 first:pt-0"
              >
                <h3 className="text-base font-semibold text-quizz-dark">
                  {position.questionSlug ? (
                    <Link
                      to={`/question-politique/${position.questionSlug}`}
                      className="text-quizz-dark no-underline hover:text-blue-700 hover:underline"
                    >
                      {position.question.fr}
                    </Link>
                  ) : (
                    position.question.fr
                  )}
                </h3>

                {position.answers.length === 0 ? (
                  <p className="mt-2 text-sm italic text-gray-400">— Pas de position renseignée</p>
                ) : (
                  <ul className="mt-3 space-y-2">
                    {position.answers.map((answer) => (
                      <li
                        key={answer.candidate.id}
                        className="rounded-lg border border-gray-200 p-3"
                        style={{ borderLeft: `4px solid ${color}` }}
                      >
                        <p className="text-xs font-semibold text-quizz-dark">
                          {answer.candidate.pseudo}
                        </p>
                        <p className="mt-1 text-sm italic text-gray-700">« {answer.answerText} »</p>
                      </li>
                    ))}
                  </ul>
                )}

                {position.answers.length > 1 && !position.unanimous && (
                  <p className="mt-2 inline-block rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                    Désaccord interne
                  </p>
                )}

                {position.sharedWith.length > 0 && (
                  <p className="mt-3 text-xs text-gray-500">
                    Même réponse chez :{' '}
                    {position.sharedWith.map((candidate, index) => (
                      <span key={candidate.id}>
                        {index > 0 && ', '}
                        <Link
                          to={`/candidat/${candidate.slug}`}
                          className="text-gray-600 no-underline hover:underline"
                        >
                          {candidate.pseudo}
                        </Link>
                      </span>
                    ))}
                    .
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* Internal disagreements recap */}
        {disagreements.length > 0 && (
          <section className="w-full bg-gray-50 px-5 py-12">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-3 font-[Merriweather] text-xl font-bold text-quizz-dark">
                Sur ce thème, les candidats {party.ofShort} ne répondent pas pareil
              </h2>
              <p className="text-sm leading-relaxed text-gray-600">
                {disagreements.length} question{disagreements.length > 1 ? 's' : ''} sur les{' '}
                {theme.questions.length} de ce thème {disagreements.length > 1 ? 'séparent' : 'sépare'}{' '}
                les candidats {party.ofShort} :{' '}
                {disagreements.map((position, index) => (
                  <span key={position.question._id}>
                    {index > 0 && ' ; '}
                    <em>{position.question.fr}</em>
                  </span>
                ))}
                .
              </p>
            </div>
          </section>
        )}

        {/* Same theme, other parties */}
        {otherParties.length > 0 && (
          <section className="mx-auto w-full max-w-4xl px-5 py-12">
            <h2 className="mb-6 font-[Merriweather] text-xl font-bold text-quizz-dark">
              {capitalize(themeProseLabel(theme))} : ce que proposent les autres partis
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {otherParties.map((other) => (
                <li key={other.slug}>
                  <Link
                    to={`/parti/${other.slug}/${theme.slug}`}
                    className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 no-underline transition hover:shadow-sm"
                  >
                    <span
                      className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: partyColor(other) }}
                    />
                    <span className="text-sm font-medium text-quizz-dark">
                      Le programme {other.ofShort} sur {themeProseLabel(theme)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Same party, other themes */}
        {otherThemes.length > 0 && (
          <section className="w-full bg-white px-5 pb-12">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-6 font-[Merriweather] text-xl font-bold text-quizz-dark">
                Le programme {party.ofShort} sur les autres thèmes
              </h2>
              <div className="flex flex-wrap gap-3">
                {otherThemes.map((other) => (
                  <Link
                    key={other.slug}
                    to={`/parti/${party.slug}/${other.slug}`}
                    className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-quizz-dark no-underline hover:bg-gray-50"
                  >
                    {other.fr}
                  </Link>
                ))}
                <Link
                  to={`/parti/${party.slug}`}
                  className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-blue-600 no-underline hover:bg-gray-50"
                >
                  Tout le programme {party.ofShort} →
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="w-full bg-quizz-dark px-5 py-16 text-center text-white">
          <h2 className="mb-4 font-[Merriweather] text-2xl font-bold">
            Et vous, que répondriez-vous ?
          </h2>
          <p className="mb-8 text-white/80">
            Répondez aux {theme.questions.length} questions de ce thème et voyez qui pense comme
            vous.
          </p>
          <Link
            to={`/theme/${theme.slug}`}
            className="inline-block rounded-full bg-yellow-400 px-8 py-3 font-semibold text-black no-underline hover:bg-yellow-300"
          >
            Répondre sur {themeProseLabel(theme)}
          </Link>
        </section>

        <Footer />
      </div>
    </>
  );
}
