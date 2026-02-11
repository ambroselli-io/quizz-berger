import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router';
import API from '@app/services/api';
import { normalizeWord } from '@app/utils/diacritics';
import getUserThemes from '@app/utils/getUserThemes';
import useUser from '@app/hooks/useUser';
import { quizz, quizzForSearch } from '@app/utils/quizz';
import ThemeButton from '@app/components/ThemeButton';
import QuizzButton from '@app/components/QuizzButton';
import ModalFirstThemeSelection from '@app/components/modals/ModalFirstThemeSelection';
import ModalAccessToResults from '@app/components/modals/ModalAccessToResults';
import useUserAnswers from '@app/hooks/useUserAnswers';

const filterBySearch = (search: string, searchIndex: string[]) => (_theme: unknown, index: number) => {
  if (!search) return true;
  return searchIndex[index].includes(normalizeWord(search));
};

const computeButtonCaption = (userThemes: string[]) => {
  if (!userThemes?.length) return 'Choisissez votre 1<sup>er</sup>&nbsp;&nbsp;thème';
  return 'Voir les résultats';
};

const computeTitleCaption = (userThemes: string[]) => {
  if (!userThemes?.length) return 'Choisissez votre premier thème';
  return 'Choisissez un thème';
};

const computeSubtitle = (
  userThemes: string[],
  questionsNumber: number,
  userAnswers: { themeId: string }[],
  allQuizz: typeof quizz,
) => {
  if (!userThemes?.length) {
    return 'Répondez au quiz, thème après thème, en commençant par<strong> celui qui vous tient le plus à coeur.</strong>';
  }
  if (userAnswers.length === questionsNumber) {
    return 'Bravo, vous avez répondu à toutes les questions&nbsp;!';
  }
  if (userThemes.length === allQuizz.length) {
    return "Bravo, vous avez répondu à tous les thèmes&nbsp;!<br />Il reste toutefois <strong> quelques questions non répondues</strong>, si vous voulez aller jusqu'au bout de votre pensée.";
  }
  return 'Vous pouvez <strong> répondre aux autres questions</strong> thème après thème <br /> pour approfondir votre pensée politique ou directement <strong> voir les résultats </strong> pour la comparer aux autres candidats.';
};

export default function ThemeSelect() {
  const { user, mutate } = useUser();
  const { userAnswers } = useUserAnswers();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState<string | null>(null);
  const questionsNumber = quizz.reduce((total, theme) => total + theme.questions.length, 0);

  const [userThemes, setUserThemes] = useState<string[]>([]);
  const [quizzFiltered, setQuizzFiltered] = useState(quizz);

  const buttonCaption = computeButtonCaption(userThemes);
  const titleCaption = computeTitleCaption(userThemes);
  const subtitle = computeSubtitle(userThemes, questionsNumber, userAnswers, quizz);

  const shuffledQuizz = useMemo(() => {
    const hour = new Date().getHours();
    return [...quizzFiltered].sort((t1, t2) => {
      const t1onlyLetter = t1.fr.split(' ').join('');
      const t2onlyLetter = t2.fr.split(' ').join('');
      const letter1 = t1onlyLetter[Math.min(hour, t1onlyLetter.length - 1)];
      const letter2 = t2onlyLetter[Math.min(hour, t2onlyLetter.length - 1)];
      return letter1 > letter2 ? -1 : 1;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizzFiltered.length]);

  const initNewUser = async () => {
    if (user?._id) return;
    const response = await API.post({ path: '/user' });
    if (response.ok) mutate(response.data);
  };

  const showModalRequest = (modalName: string) => {
    setShowModal(modalName);
  };

  const onForceCloseModal = () => {
    setShowModal(null);
  };

  const goToResults = () => navigate('/result');
  const goToQuizz = async (themeId: string) => {
    await initNewUser();
    if (!themeId) return;
    const firstQuestionId = quizz.find((t) => t._id === themeId)?.questions[0]?._id;
    if (firstQuestionId) navigate(`/question/${themeId}/${firstQuestionId}`);
  };

  const alertTimeouts = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (alertTimeouts.current) clearTimeout(alertTimeouts.current);
    if (!userAnswers.length && !window.sessionStorage.getItem('theme-select_first')) {
      alertTimeouts.current = setTimeout(() => {
        showModalRequest('theme-select_first');
        window.sessionStorage.setItem('theme-select_first', 'true');
      }, 1000);
    }
    if (userThemes.length > 0 && !window.sessionStorage.getItem('theme-select_result')) {
      alertTimeouts.current = setTimeout(() => {
        showModalRequest('theme-select_result');
        window.sessionStorage.setItem('theme-select_result', 'true');
      }, 1000);
    }
    return () => {
      if (alertTimeouts.current) clearTimeout(alertTimeouts.current);
    };
  }, [userAnswers.length, userThemes.length]);

  useEffect(() => {
    setUserThemes(getUserThemes(userAnswers));
  }, [userAnswers.length]);

  const timeoutSearch = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (timeoutSearch.current) clearTimeout(timeoutSearch.current);
    timeoutSearch.current = setTimeout(() => {
      setQuizzFiltered(quizz.filter(filterBySearch(search, quizzForSearch)));
    }, 300);
  }, [search]);

  return (
    <>
      <title>{titleCaption} | Le Quizz du Berger</title>
      <div className="px-2.5 py-20 max-lg:px-2.5 max-lg:py-[3vh] lg:h-[calc(100vh-80px)] lg:overflow-y-auto">
        <div className="mx-auto mb-[2vh] flex max-w-[1200px] flex-col items-center justify-center">
          <h2 className="mb-5 text-center font-[Merriweather] text-2xl font-bold text-quizz-dark">
            {titleCaption}
          </h2>
          <h3 className="mb-10 max-w-[90vw] text-center text-base font-normal text-quizz-dark">
            <span dangerouslySetInnerHTML={{ __html: subtitle }} />
            <br />
            <br />
            <small>
              Ce test essaie de représenter l'ensemble d'idées le plus large possible, et contient des
              éléments que vous pourrez trouver choquant.
            </small>
            <br />
            <small>
              Vous pouvez toujours ne pas répondre à une question : vous répondez à ce que vous voulez, si
              vous le voulez. Vos réponses et résultats sont <strong>anonymes</strong>.
            </small>
          </h3>
          <div className="mb-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {shuffledQuizz
              .filter((t) => t._id !== 'theme-6211242a3f15af68d035215d')
              .map((theme) => (
                <ThemeButton
                  key={theme._id}
                  theme={theme}
                  userAnswers={userAnswers}
                  onClick={() => goToQuizz(theme._id)}
                />
              ))}
          </div>
          <input
            className="mb-5 w-[250px] rounded-md border border-gray-300 px-3 py-2 text-base"
            placeholder="Recherchez par mot-clé"
            autoComplete="off"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <QuizzButton disabled={buttonCaption !== 'Voir les résultats'} onClick={goToResults}>
            <span dangerouslySetInnerHTML={{ __html: buttonCaption }} />
          </QuizzButton>
        </div>
      </div>
      <ModalFirstThemeSelection isActive={showModal === 'theme-select_first'} onClose={onForceCloseModal} />
      <ModalAccessToResults isActive={showModal === 'theme-select_result'} onClose={onForceCloseModal} />
    </>
  );
}
