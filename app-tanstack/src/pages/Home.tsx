import { useRef } from 'react';
import { Link, useNavigate } from '@app/lib/router';
import { quizz, quizzQuestionsCount, quizzThemesCount } from '@app/utils/quizz';
import { QUICK_QUIZZ_ANSWER_PARAM, quickQuizzCount, quickQuizzFirstQuestion } from '@app/utils/quick-quizz';
import { colors, temoignages } from '@app/utils/temoignages';
import { readableTextColor } from '@app/utils/contrast';
import Footer from '@app/components/Footer';
import { QuizzLink } from '@app/components/QuizzButton';
import { chatModes } from '@app/content/chat-modes';
import {
  candidateSlugMap,
  themeSlugMap,
  comparisonPairs,
  hotTopicQuestions,
  candidatesCount,
  homeFaq,
  type FaqEntry,
} from '@app/utils/seo-light';

export default function Home() {
  const navigate = useNavigate();

  const firstQuestionTheme = quizz.find((t) => t._id === quickQuizzFirstQuestion?.themeId);
  const firstQuestionThemeColor = firstQuestionTheme?.backgroundColor ?? '';

  return (
    <>
      {/* Hero - dark */}
      <section className="flex flex-col items-center bg-quizz-dark px-5 pb-16 pt-16 text-white max-lg:pb-12 max-lg:pt-10">
        <div className="flex w-full max-w-[770px] flex-col items-center">
          <h1 className="mb-5 text-center font-[Merriweather] text-[3rem] font-bold leading-[150%] max-lg:text-[34px]">
            <span className="mb-2 block font-[Merriweather_Sans] text-xl font-light tracking-wide text-white/80 max-lg:text-base">
              Test politique présidentielle&nbsp;2027
            </span>
            Quel candidat pense comme&nbsp;vous&nbsp;?
          </h1>
          <p className="mb-8 max-w-[620px] text-center font-[Merriweather_Sans] font-light leading-relaxed text-white/80">
            Pour qui voter en 2027&nbsp;? Répondez à des questions concrètes, puis comparez vos réponses à celles
            des {candidatesCount} candidats, ou à celles de vos amis. Vous allez être surpris.
          </p>
          <QuickQuizzCta />
          <Link
            to="/themes"
            className="mt-5 text-center font-[Merriweather_Sans] font-light leading-relaxed text-white/80 underline"
          >
            Ou le test complet&nbsp;: {quizzQuestionsCount} questions sur {quizzThemesCount} thèmes
          </Link>
          <TrustLine />
          <Link
            to="/login"
            className="mt-6 text-center font-[Merriweather_Sans] text-xs font-light leading-relaxed text-white/60"
          >
            Vous avez enregistré vos résultats&nbsp;? <strong>Connectez&#8209;vous</strong>
          </Link>
        </div>
      </section>

      <Testimonials />

      {/* One real question, answerable right here, under the same theme banner as the question page */}
      {quickQuizzFirstQuestion && (
        <section className="bg-white text-quizz-dark">
          <div
            className="flex h-20 items-center justify-center px-5 max-lg:h-auto max-lg:min-h-[70px] max-lg:px-3"
            style={{
              backgroundColor: `${firstQuestionThemeColor}CC`,
              color: readableTextColor(firstQuestionThemeColor, 0.8),
            }}
          >
            <p className="text-center font-[Merriweather] text-xl font-bold max-lg:text-base">{firstQuestionTheme?.fr}</p>
          </div>
          <div className="flex flex-col items-center px-5 pb-16 pt-10 max-lg:px-2.5 max-lg:pb-12">
            <h2 className="mb-10 max-w-[620px] text-center text-2xl font-bold">{quickQuizzFirstQuestion.question.fr}</h2>
            <div className="flex w-full max-w-[500px] flex-col items-center gap-4 font-sans">
              {quickQuizzFirstQuestion.question.answers.map((answer, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => navigate({ to: '/quiz-rapide', search: { [QUICK_QUIZZ_ANSWER_PARAM]: index } })}
                  className="min-h-[60px] w-full cursor-pointer rounded-lg border border-gray-200 bg-white px-2.5 py-2.5 text-base tracking-[0.01rem] text-black hover:bg-gray-50"
                >
                  {answer}
                </button>
              ))}
            </div>
            <p className="mt-6 text-center text-sm text-gray-500">
              Vous pouvez passer une question, revenir en arrière, arrêter quand vous voulez.
            </p>
          </div>
        </section>
      )}

      {/* AI modes - dark */}
      <section className="flex flex-col items-center bg-quizz-dark px-5 py-20 text-white max-lg:py-12">
        <h2 className="mb-5 text-center font-[Merriweather] text-[3rem] font-bold leading-[150%] max-lg:text-[34px]">
          Discuter avec l'IA
        </h2>
        <p className="mb-10 max-w-[65ch] text-center font-[Merriweather_Sans] font-light leading-relaxed text-white/80">
          Une IA qui n'a pas le droit de vous dire pour qui voter, ni si vos idées sont bonnes ou mauvaises. Vous
          n'êtes pas un mouton&nbsp;: elle est là pour vous aider à réfléchir, pas pour penser à votre place.
        </p>
        <ul className="grid w-full max-w-6xl gap-4 lg:grid-cols-3">
          {chatModes.map((chatMode) => (
            <li key={chatMode.slug} className="flex">
              <Link
                to={`/ia/${chatMode.slug}`}
                className="block w-full rounded-2xl border-2 border-white/20 p-5 text-white no-underline transition-colors hover:border-quizz-yellow"
              >
                <h3 className="mb-2 font-[Merriweather] text-xl font-bold">{chatMode.title}</h3>
                <p className="leading-relaxed text-white/80">{chatMode.descriptionVous}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* How it works - light grey */}
      <section className="flex flex-col items-center bg-gray-50 px-5 py-20 text-quizz-dark max-lg:py-12">
        <h2 className="mb-5 text-center font-[Merriweather] text-[3rem] font-bold leading-[150%] max-lg:text-[34px]">
          Comment ça marche&nbsp;?
        </h2>

        <div className="mt-10 aspect-video w-full max-w-4xl overflow-hidden rounded-2xl shadow-lg">
          <iframe
            className="h-full w-full"
            src="https://www.youtube-nocookie.com/embed/LrEI6e2ZLfo?playsinline=1&rel=0&modestbranding=1"
            title="Le Quizz du Berger en motion design"
            allow="encrypted-media; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </section>

      {/* Where the candidates' answers come from - white */}
      <section className="flex flex-col items-center bg-white px-5 py-20 text-quizz-dark max-lg:py-12">
        <h2 className="mb-6 text-center font-[Merriweather] text-[3rem] font-bold leading-[150%] max-lg:text-[34px]">
          D'où viennent les réponses des candidats&nbsp;?
        </h2>
        <p className="max-w-3xl text-center text-lg leading-relaxed">
          Les candidats n'ont pas rempli le test eux-mêmes. Leurs réponses sont estimées à partir de leurs
          programmes et de leurs déclarations publiques. Une réponse vous semble fausse&nbsp;? Écrivez-nous, nous
          la corrigeons.
        </p>
        <Link
          to="/contact"
          className="mt-8 inline-block rounded-full bg-quizz-dark px-8 py-3 font-semibold text-white no-underline hover:bg-black"
        >
          Nous écrire
        </Link>
      </section>

      {/* Pour qui voter en 2027 ? — answers the "pour qui voter" intent on the home page itself */}
      <section className="flex flex-col items-center border-t border-gray-100 bg-white px-5 py-20 text-quizz-dark max-lg:py-12">
        <h2 className="mb-12 text-center font-[Merriweather] text-[3rem] font-bold leading-[150%] max-lg:mb-8 max-lg:text-[34px]">
          Pour qui voter en 2027&nbsp;?
        </h2>
        <article className="w-full max-w-3xl leading-relaxed">
          <p className="mb-8 text-lg">
            <strong>Réponse courte&nbsp;:</strong> pour savoir pour qui voter à la présidentielle
            2027, comparez vos idées aux positions des candidats plutôt que leurs slogans. Le Quizz
            du Berger pose {quizzQuestionsCount} questions concrètes sur {quizzThemesCount} thèmes,
            avec 3 à 6 réponses possibles par question. Vous répondez à celles qui vous intéressent,
            l'algorithme classe les {candidatesCount} candidats du plus proche au plus éloigné de
            vos réponses. Le résultat est donné globalement et thème par thème.
          </p>

          <h3 className="mb-4 mt-10 font-[Merriweather] text-2xl font-bold">
            Comment le test vous aide à choisir
          </h3>
          <ol className="mb-8 list-decimal space-y-3 pl-6">
            <li>
              <strong>Vous répondez aux questions que vous voulez.</strong> Retraites, santé, sécurité,
              immigration, écologie, Europe, impôts : {quizzThemesCount} thèmes, dans l'ordre qui vous
              plaît. Cinq questions suffisent pour un premier classement, {quizzQuestionsCount} pour
              un résultat précis.
            </li>
            <li>
              <strong>Chaque réponse est comparée à celle de chaque candidat.</strong> Une réponse
              identique vaut 5 points, une réponse proche 2 à 4 points, une réponse opposée 0.
              Les réponses des candidats viennent de leurs programmes, de leurs déclarations et de
              leurs votes.
            </li>
            <li>
              <strong>Vous lisez le classement thème par thème.</strong> Un candidat peut être votre
              premier choix sur l'économie et le dernier sur l'immigration. C'est là que le test
              devient utile : il montre les accords que vous ne soupçonniez pas.
            </li>
          </ol>

          <h3 className="mb-4 mt-10 font-[Merriweather] text-2xl font-bold">Questions fréquentes</h3>
          {homeFaq.map((entry) => (
            <div key={entry.question}>
              <h4 className="mb-2 mt-6 font-bold">{entry.question}</h4>
              <p className="mb-4">
                <FaqAnswer entry={entry} />
              </p>
            </div>
          ))}

          <div className="mt-10 text-center">
            <Link
              to="/themes"
              className="inline-block rounded-full bg-quizz-dark px-8 py-3 font-semibold text-white no-underline hover:bg-black"
            >
              Faire le test politique 2027
            </Link>
          </div>
        </article>
      </section>

      {/* Explorer — SEO discoverability hub */}
      <section className="flex flex-col items-center border-t border-gray-100 bg-white px-5 py-20 text-quizz-dark max-lg:py-12">
        <h2 className="mb-12 text-center font-[Merriweather] text-[3rem] font-bold leading-[150%] max-lg:mb-8 max-lg:text-[34px]">
          Explorer la présidentielle 2027
        </h2>

        <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-3">
          {/* Candidats */}
          <div className="flex flex-col">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-[Merriweather] text-xl font-bold">Les candidats</h3>
              <Link to="/candidats" className="text-sm text-blue-600 no-underline hover:underline">
                Tous les {candidateSlugMap.length} →
              </Link>
            </div>
            <ul className="flex flex-wrap gap-2">
              {candidateSlugMap.slice(0, 12).map((c) => (
                <li key={c.id}>
                  <Link
                    to={`/candidat/${c.slug}`}
                    className="flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-xs text-quizz-dark no-underline hover:bg-gray-50"
                  >
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ backgroundColor: c.color }}
                    />
                    {c.pseudo}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sujets */}
          <div className="flex flex-col">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-[Merriweather] text-xl font-bold">Les sujets</h3>
              <Link to="/sujets" className="text-sm text-blue-600 no-underline hover:underline">
                Tous les {themeSlugMap.length} →
              </Link>
            </div>
            <ul className="flex flex-wrap gap-2">
              {themeSlugMap.slice(0, 10).map((theme) => (
                <li key={theme.themeId}>
                  <Link
                    to={`/theme/${theme.slug}`}
                    className="rounded-full border border-gray-200 px-3 py-1.5 text-xs text-quizz-dark no-underline hover:bg-gray-50"
                  >
                    {theme.fr}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Comparer */}
          <div className="flex flex-col">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-[Merriweather] text-xl font-bold">Comparer</h3>
              <Link to="/comparer" className="text-sm text-blue-600 no-underline hover:underline">
                Toutes les {comparisonPairs.length} →
              </Link>
            </div>
            <ul className="space-y-2">
              {comparisonPairs.slice(0, 6).map((pair) => (
                <li key={pair.slug}>
                  <Link
                    to={`/comparer/${pair.slug}`}
                    className="block rounded-md border border-gray-200 px-3 py-2 text-xs text-quizz-dark no-underline hover:bg-gray-50"
                  >
                    {pair.candidate1Name} <span className="text-gray-400">vs</span> {pair.candidate2Name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/comparateur-programmes-2027"
              className="mt-4 text-sm text-blue-600 no-underline hover:underline"
            >
              Comparateur de programmes →
            </Link>
          </div>
        </div>

        {/* Hot questions */}
        <div className="mt-12 w-full max-w-6xl">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-[Merriweather] text-xl font-bold">Sujets brûlants</h3>
            <Link to="/sujets" className="text-sm text-blue-600 no-underline hover:underline">
              Voir plus →
            </Link>
          </div>
          <ul className="grid gap-2 lg:grid-cols-2">
            {hotTopicQuestions.slice(0, 8).map((q) => (
              <li key={q.questionId}>
                <Link
                  to={`/question-politique/${q.slug}`}
                  className="block rounded-md border border-gray-200 px-3 py-2 text-sm text-quizz-dark no-underline hover:bg-gray-50"
                >
                  {q.fr}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Final call to action - dark */}
      <section className="flex flex-col items-center bg-quizz-dark px-5 py-16 text-white max-lg:py-12">
        <h2 className="mb-8 text-center font-[Merriweather] text-[3rem] font-bold leading-[150%] max-lg:text-[34px]">
          Faire le test
        </h2>
        <QuickQuizzCta />
        <TrustLine />
      </section>

      <Footer />
    </>
  );
}

const MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

/** '2026-09' → 'septembre 2026', '2022' → '2022'. */
const formatTestimonialDate = (date: string) => {
  const [year, month] = date.split('-');
  return month ? `${MONTHS[Number(month) - 1]} ${year}` : year;
};

function Testimonials() {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (direction: 1 | -1) =>
    track.current?.scrollBy({ left: direction * track.current.clientWidth * 0.8, behavior: 'smooth' });
  const arrow =
    'absolute top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-xl text-quizz-dark shadow-md hover:bg-gray-50 lg:flex';

  return (
    <section className="bg-gray-50 py-10 text-quizz-dark max-lg:py-8">
      <h2 className="mb-6 px-5 text-center font-[Merriweather] text-2xl font-bold max-lg:text-xl">Ils ont apprécié</h2>
      <div className="relative">
        <button type="button" aria-label="Témoignages précédents" onClick={() => scroll(-1)} className={`${arrow} left-3`}>
          ‹
        </button>
        <div
          ref={track}
          className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 lg:scroll-px-16 lg:px-16"
        >
          {temoignages.map(({ blockquote, figcaption, date }, index) => (
            <figure
              key={figcaption}
              className="flex w-[320px] shrink-0 snap-start flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 max-lg:w-[78vw]"
            >
              <blockquote
                className="font-[Merriweather] text-[15px] leading-relaxed text-gray-800"
                dangerouslySetInnerHTML={{ __html: `«&nbsp;${blockquote.trim()}&nbsp;»` }}
              />
              <figcaption className="mt-5 flex items-center gap-3 text-sm font-medium text-gray-900">
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200 text-xs font-semibold"
                  style={{ backgroundColor: colors[index], color: readableTextColor(colors[index]) }}
                >
                  {figcaption.charAt(0)}
                </span>
                <span>
                  {figcaption}
                  <time dateTime={date} className="block text-xs font-normal text-gray-500">
                    {formatTestimonialDate(date)}
                  </time>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <button type="button" aria-label="Témoignages suivants" onClick={() => scroll(1)} className={`${arrow} right-3`}>
          ›
        </button>
      </div>
    </section>
  );
}

function QuickQuizzCta() {
  return (
    <QuizzLink
      to="/quiz-rapide"
      className="min-h-[65px] max-w-full px-8 py-3 text-center text-base font-semibold leading-snug"
    >
      Test rapide&nbsp;: {quickQuizzCount} questions, 3&nbsp;minutes
    </QuizzLink>
  );
}

function TrustLine() {
  return (
    <p className="mt-6 text-center font-[Merriweather_Sans] text-sm font-light text-white/70">
      Gratuit, sans inscription, sans publicité. Vos réponses restent anonymes.
    </p>
  );
}

function FaqAnswer({ entry }: { entry: FaqEntry }) {
  if (!entry.link) return <>{entry.answer}</>;
  const [before, after] = entry.answer.split(entry.link.label);
  return (
    <>
      {before}
      <Link to={entry.link.to}>{entry.link.label}</Link>
      {after}
    </>
  );
}
