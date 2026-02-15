import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import ThemeButton from '@app/components/ThemeButton';
import { quizz, quizzQuestions } from '@app/utils/quizz';
import { colors, temoignages } from '@app/utils/temoignages';
import Podium from '@app/components/Podium';
import Loader from '@app/components/Loader';
import Footer from '@app/components/Footer';
import QuizzButton from '@app/components/QuizzButton';
import API from '@app/services/api';
import type { PodiumStep } from '@app/types/quizz';

export default function Home() {
  const navigate = useNavigate();

  const themes = useMemo(() => [...quizz].sort(() => 0.5 - Math.random()), []);
  const [random, setRandom] = useState(() => Math.round(Math.random() * 15));

  const [onboardingData, setOnboardingData] = useState<{ data: PodiumStep[]; user: { pseudo?: string; color?: string } | null }>({ data: [], user: null });
  const [countUsers, setCountUsers] = useState(207569);
  const [countAnswers, setCountAnswers] = useState(9721827);

  useEffect(() => {
    API.get({ path: '/answer/random/for-onboarding', query: { random: String(random) } }).then((res) => {
      if (res.ok || res.data) setOnboardingData(res);
    });
  }, [random]);

  useEffect(() => {
    API.get({ path: '/public/count' }).then((res) => {
      if (res.data) {
        setCountUsers((res.data.countUsers || 0) + 207569);
        setCountAnswers((res.data.countAnswers || 0) + 9721827);
      }
    });
  }, []);

  return (
    <>
      <title>Le Quizz du Berger | Quel est votre candidat idéal ?</title>
      {/* Hero section - dark */}
      <section className="relative flex min-h-[calc(100vh-80px)] flex-col items-center justify-center bg-quizz-dark px-5 py-10 text-white max-lg:min-h-[calc(100vh-60px-var(--bottom-bar-height))]">
        <div className="flex max-w-[770px] shrink-0 flex-col items-center">
          <h1 className="mb-5 text-center font-[Merriweather] text-[3rem] font-bold leading-[150%] max-lg:text-[34px]">
            QUI est mon candidat&nbsp;idéal&nbsp;?
          </h1>
          <QuizzButton onClick={() => navigate('/themes')} className="h-[65px] w-[240px] text-base font-semibold">
            Répondre au Quizz
          </QuizzButton>
          <h3 className="mt-10 mb-10 max-w-[770px] text-center font-[Merriweather_Sans] text-xl font-light leading-[200%] text-white/80">
            Répondez de façon <strong>anonyme</strong> au Quizz&nbsp;du&nbsp;Berger pour connaître le ou les candidats
            <strong> de l'élection présidentielle de 2027</strong> qui se rapprochent le plus de vos idées, et
            <strong> faites&nbsp;votre&nbsp;choix&nbsp;!</strong>
          </h3>
          <Link to="/login" className="mt-5 text-center font-[Merriweather_Sans] font-light leading-relaxed text-white/80">
            Vous avez enregistré vos résultats&nbsp;? <strong>Connectez&#8209;vous</strong>
          </Link>
        </div>
        <svg
          className="absolute bottom-4 animate-pulse cursor-pointer text-white"
          width="24px"
          height="24px"
          viewBox="0 0 700 700"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          onClick={() => window.scrollBy({ top: 500, behavior: 'smooth' })}
        >
          <path d="m626.44 247.06c-4.7461-4.7461-12.465-4.7734-17.238-0.023438l-259.21 259.24-259.21-259.24c-4.7461-4.7461-12.465-4.7461-17.215 0-4.7461 4.7461-4.7461 12.465 0 17.215l267.83 267.83c2.3633 2.3867 5.4766 3.5781 8.5938 3.5781 3.1172 0 6.2344-1.1914 8.6211-3.5547l267.83-267.83c4.7461-4.7461 4.7461-12.465-0.003906-17.215z" />
          <path d="m626.44 27.926c-4.7461-4.7461-12.465-4.7461-17.215 0l-259.23 259.21-259.21-259.24c-4.7461-4.7461-12.465-4.7461-17.215 0-4.7461 4.7461-4.7461 12.465 0 17.215l267.81 267.86c2.3867 2.3633 5.5039 3.5547 8.6211 3.5547 3.1172 0 6.2344-1.1914 8.6211-3.5547l267.82-267.83c4.75-4.7461 4.75-12.465 0-17.211z" />
        </svg>
      </section>

      {/* How it works - white */}
      <section className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center bg-white px-5 py-10 text-quizz-dark max-lg:min-h-[calc(100vh-60px-var(--bottom-bar-height))]">
        <h2 className="mb-5 text-center font-[Merriweather] text-[3rem] font-bold leading-[150%] max-lg:text-[34px]">
          Comment ça marche&nbsp;?
        </h2>

        {/* Demo 1 */}
        <div className="mt-24 flex w-full items-center justify-evenly max-lg:flex-col max-lg:gap-4">
          <div className="flex shrink-0 basis-[40%] flex-col items-center text-center">
            <h3 className="flex flex-col items-center">
              <span className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-quizz-dark">1</span>
              Répondez aux questions que vous voulez
            </h3>
            <p className="mt-4 text-center">
              <small className="opacity-50">parmi</small>
              <br /><br />
              <b>{themes.length} thèmes </b>
              <br />
              <b>{quizzQuestions.length} questions </b>
            </p>
          </div>
          <div className="flex shrink-0 basis-[40%] cursor-pointer flex-wrap justify-center gap-4" onClick={() => navigate('/themes')}>
            {themes.slice(0, 3).map((theme) => (
              <ThemeButton key={theme._id} theme={theme} onClick={() => navigate('/themes')} />
            ))}
          </div>
        </div>

        {/* Demo 2 */}
        <div className="mt-24 flex w-full flex-row-reverse items-center justify-evenly max-lg:flex-col max-lg:gap-4">
          <div className="flex shrink-0 basis-[40%] flex-col items-center text-center">
            <h3 className="flex flex-col items-center">
              <span className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-quizz-dark">2</span>
              Comparez votre pensée<br />à celle des candidats
            </h3>
            <p className="mt-4 text-center">
              <b>Globalement et par thème</b>
              <br /><br />
              <small className="inline max-w-[50ch] opacity-50">
                Le classement général est une chose, celui thème par thème vous aidera à mieux choisir votre candidat,
                celui ou celle qui sera le plus proche de votre pensée complexe, en fonction de vos thèmes favoris.
              </small>
            </p>
          </div>
          <div
            className="flex shrink-0 basis-[40%] cursor-pointer flex-col overflow-hidden rounded-2xl text-[10px] max-lg:basis-auto max-lg:w-full max-lg:overflow-visible max-lg:rounded-none"
            style={{ borderColor: onboardingData?.user?.color, borderWidth: onboardingData?.user?.color ? 1 : 0 }}
            onClick={() => setRandom(Math.round(Math.random() * 15))}
          >
            <div className="relative h-[50vh] w-full overflow-y-visible max-lg:h-[65vw]">
              {!onboardingData?.user?.pseudo ? (
                <div className="flex h-full w-full items-center justify-center">
                  <Loader size="33px" isLoading />
                </div>
              ) : (
                <Podium podiumised={onboardingData.data} title={`Exemple: ${onboardingData?.user?.pseudo}`} />
              )}
            </div>
          </div>
        </div>

        {/* Demo 3 */}
        <div className="mt-24 flex w-full items-center justify-evenly max-lg:flex-col max-lg:gap-4">
          <div className="flex shrink-0 basis-[40%] flex-col items-center text-center">
            <h3 className="flex flex-col items-center">
              <span className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-quizz-dark">3</span>
              Confrontez vos convictions<br />avec vos amis !
            </h3>
            <p className="mt-4 text-center">
              <br />
              <small className="inline max-w-[50ch] opacity-50">
                Vous pouvez <b>enregistrer vos résultats</b> sous un <b>pseudonyme</b> et ajouter le pseudo de vos amis
                pour comparer vos convictions. Débat assuré, et de qualité !
              </small>
            </p>
          </div>
          <div className="flex shrink-0 basis-[40%] flex-col items-center gap-4">
            <button className="cursor-pointer rounded-full border-none bg-yellow-400 px-6 py-2.5 text-[0.9em] text-black">
              Partager avec mes amis
            </button>
            <button className="cursor-pointer rounded-full border-none bg-yellow-400 px-6 py-2.5 text-[0.9em] text-black">
              Se comparer à mes amis
            </button>
          </div>
        </div>
      </section>

      {/* Stats counter - dark */}
      <section className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center bg-quizz-dark px-5 py-10 text-white max-lg:min-h-[calc(100vh-60px-var(--bottom-bar-height))]">
        <h2 className="mb-5 text-center font-[Merriweather] text-[3rem] font-bold leading-[150%] max-lg:text-[34px]">
          <b>{Intl.NumberFormat('fr').format(countUsers)}</b> quizz effectués
          <br /><br />
          <b>{Intl.NumberFormat('fr').format(countAnswers)}</b> réponses données
        </h2>
      </section>

      {/* Testimonials - white */}
      <section className="flex flex-col items-center bg-white px-5 py-20 text-quizz-dark max-lg:py-12">
        <h2 className="mb-12 text-center font-[Merriweather] text-[3rem] font-bold leading-[150%] max-lg:mb-8 max-lg:text-[34px]">
          Ils ont apprécié
        </h2>
        <div className="w-full max-w-6xl columns-1 gap-6 sm:columns-2 lg:columns-3">
          {temoignages.map(({ blockquote, figcaption }, index) => (
            <figure
              key={index}
              className="mb-6 break-inside-avoid rounded-xl bg-gray-50 p-6 shadow-sm sm:p-8"
            >
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
                  style={{ backgroundColor: colors[index] }}
                >
                  {figcaption.charAt(0)}
                </div>
                <figcaption className="font-medium text-gray-900">{figcaption}</figcaption>
              </div>
              <blockquote
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blockquote }}
              />
            </figure>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
