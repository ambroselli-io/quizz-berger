import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from '@app/lib/router';
import API from '@app/services/api';
import {
  getFromLocalStorage,
  QUIZZ_FEEDBACK_STORAGE_KEY,
  getFromSessionStorage,
  setToLocalStorage,
  setToSessionStorage,
} from '@app/utils/storage';
import getUserThemes from '@app/utils/getUserThemes';
import useUser from '@app/hooks/useUser';
import { quizz, quizzQuestions, quizzQuestionsCount, quizzThemesCount } from '@app/utils/quizz';
import { isInQuickQuizz } from '@app/utils/quick-quizz';
import useCandidates from '@app/hooks/useCandidates';
import useFriends from '@app/hooks/useFriends';
import useUserAnswers from '@app/hooks/useUserAnswers';
import ModalLogin from '@app/components/modals/ModalLogin';
import Loader from '@app/components/Loader';
import VerticalPodium from '@app/components/result/VerticalPodium';
import QuizzFeedback, { type QuizzFeedbackState } from '@app/components/result/QuizzFeedback';
import ShareResults from '@app/components/result/ShareResults';
import QuestionByQuestion, { type QuestionPerson } from '@app/components/result/QuestionByQuestion';
import type { ResultImageRow } from '@app/utils/result-image';
import { chatModes } from '@app/content/chat-modes';
import Filter from '@app/components/Filter';
import type { Answer } from '@app/types/quizz';
import { Users, Save, Star, Download, ChevronDown } from 'lucide-react';

import { getCandidatesScorePerThemes } from '~/shared/utils/score';
import { getPodium } from '~/shared/utils/podium';
import { UserAnswerWithScorePerThemeAndMax } from '@api/src/types/answer';

export default function Result() {
  const { userPseudo } = useParams<{ userPseudo?: string }>();
  const { user, mutate } = useUser();
  const { userAnswers } = useUserAnswers();
  const { candidates } = useCandidates();
  const { friends, mutateFriends } = useFriends();

  const [publicUser, setPublicUser] = useState<{
    pseudo?: string;
    isPublic?: boolean;
    friends?: string[];
  } | null>(null);
  const [publicUserAnswers, setPublicUserAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    if (!userPseudo || userPseudo === user?.pseudo) return;
    API.get({ path: `/user/${userPseudo}` }).then((res) => {
      if (res.ok) setPublicUser(res.data);
    });
    API.get({ path: `/answer/${userPseudo}` }).then((res) => {
      if (res.ok) setPublicUserAnswers(res.data);
    });
  }, [userPseudo, user?.pseudo]);

  const publicPage = useMemo(() => {
    if (!userPseudo) return false;
    if (userPseudo === user?.pseudo) return false;
    if (!publicUser?.isPublic) return false;
    return true;
  }, [userPseudo, user, publicUser]);

  const userToShow = useMemo(() => {
    if (!publicPage) return user;
    if (userPseudo === user?.pseudo) return user;
    return publicUser;
  }, [user, publicUser, publicPage, userPseudo]);

  const answersToShow = useMemo(() => {
    if (userPseudo === user?.pseudo) return userAnswers;
    if (publicPage) return publicUserAnswers;
    return userAnswers;
  }, [publicUserAnswers, publicPage, userAnswers, userPseudo, user?.pseudo]);

  const downloadAnswers = () => {
    const answersByQuestion = new Map(answersToShow.map((a) => [a.questionId, a]));
    const text = quizz
      .map((theme) => {
        const lines = theme.questions
          .filter((question) => answersByQuestion.has(question._id))
          .map((question) => {
            const answer = answersByQuestion.get(question._id)!;
            const answerText = question.answers[answer.answerIndex] ?? 'Pas de réponse';
            return `${question.fr}${answer.isImportant ? ' (question importante pour moi)' : ''}\n→ ${answerText}`;
          });
        return lines.length ? `${theme.fr.toUpperCase()}\n\n${lines.join('\n\n')}` : '';
      })
      .filter(Boolean)
      .join('\n\n\n');
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    downloadAnchorNode.setAttribute('download', 'quizz-du-berger_mes-reponses.txt');
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(!!userPseudo && !userToShow?.pseudo);
  }, [userPseudo, userToShow?.pseudo]);

  const userThemes = useMemo(() => getUserThemes(answersToShow), [answersToShow]);
  // The "full version" box shows only while every answer belongs to the quick quiz.
  const onlyQuickQuizzAnswers = useMemo(
    () => !publicPage && answersToShow.length > 0 && answersToShow.every((a) => isInQuickQuizz(a.questionId)),
    [publicPage, answersToShow],
  );

  const [showLoginModal, setShowLoginModal] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showFriends, setShowFriends] = useState(false);

  const showSaveButton = useMemo(() => !publicPage && !userToShow?.pseudo, [publicPage, userToShow]);

  const [newFriend, setNewFriend] = useState('');
  const [loadingFriend, setLoadingFriend] = useState(false);
  const [noFriend, setNoFriend] = useState<string | null>(null);

  // Candidates who left the race keep their answers but are hidden by default; the filter can bring them back.
  const allCandidatesQualified = useMemo(
    () => candidates.filter((c) => !c.withdrawn).map((c) => c.pseudo),
    [candidates],
  );
  const [showCandidates, setShowCandidates] = useState(false);
  const allFriends = useMemo(() => friends.map((c) => c.pseudo), [friends]);

  const isSignedUp = Boolean(user?.pseudo);

  const [selectedCandidates, setSelectedCandidates] = useState<string[]>(() => {
    if (publicPage) return allCandidatesQualified;
    return (getFromLocalStorage('selectedCandidates', null) ??
      getFromSessionStorage('selectedCandidates', allCandidatesQualified)) as string[];
  });
  const [selectedFriends, setSelectedFriends] = useState<string[]>(() => {
    if (publicPage) return [];
    return (getFromLocalStorage('selectedFriends', null) ??
      getFromSessionStorage('selectedFriends', allFriends)) as string[];
  });

  const selectedThemes = useMemo(() => {
    if (publicUser?.pseudo === user?.pseudo) return userThemes;
    if (publicPage) return getUserThemes(publicUserAnswers);
    return userThemes;
  }, [publicUserAnswers, userThemes, publicPage, publicUser?.pseudo, user?.pseudo]);

  const title = useMemo(() => {
    if (!publicPage && !userToShow?.pseudo) return 'Voici vos résultats';
    const name = (userToShow?.pseudo?.charAt(0).toUpperCase() ?? '') + (userToShow?.pseudo?.slice(1) ?? '');
    if (!publicPage) return `${name}, voici vos résultats`;
    if (publicUser?.pseudo === user?.pseudo) return `${name}, voici vos résultats`;
    return `Voici les résultats de ${name}`;
  }, [publicPage, userToShow, publicUser?.pseudo, user?.pseudo]);

  const onSelectCandidates = (e: React.MouseEvent<HTMLButtonElement>) => {
    const pseudo = (e.target as HTMLElement).dataset.pseudo;
    if (!pseudo) return;
    if (!selectedCandidates.includes(pseudo)) {
      setSelectedCandidates([...selectedCandidates, pseudo]);
    } else {
      setSelectedCandidates(selectedCandidates.filter((c) => c !== pseudo));
    }
  };

  const onSelectFriends = (e: React.MouseEvent<HTMLButtonElement>) => {
    const pseudo = (e.target as HTMLElement).dataset.pseudo;
    if (!pseudo) return;
    if (!selectedFriends.includes(pseudo)) {
      setSelectedFriends([...selectedFriends, pseudo]);
    } else {
      setSelectedFriends(selectedFriends.filter((c) => c !== pseudo));
    }
  };

  const newFriendTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const setNewFriendRequest = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setNoFriend(null);
    setNewFriend(newName);
    if (newName?.length < 3 || allFriends.includes(newName) || userToShow?.pseudo === newName) {
      setLoadingFriend(false);
      setNoFriend(null);
      if (newFriendTimeout.current) clearTimeout(newFriendTimeout.current);
      return;
    }
    newFriendTimeout.current = setTimeout(async () => {
      setNoFriend(null);
      setLoadingFriend(true);
      const response = await API.get({ path: `/user/friends/${newName}` });
      if (response.ok) {
        if (window.confirm(`Voulez-vous ajouter ${response.data.pseudo} à vos amis ?`)) {
          setNoFriend(null);
          setLoadingFriend(true);
          await API.put({
            path: '/user',
            body: { friends: [...(userToShow?.friends || []), response.data._id] },
          });
          setSelectedFriends([...selectedFriends, response.data.pseudo]);
          await mutate();
          await mutateFriends();
          setLoadingFriend(false);
          setNewFriend('');
        } else {
          setLoadingFriend(false);
        }
      } else {
        setLoadingFriend(false);
        if (response.code === 'NOT_PUBLIC') {
          alert(`${newName} n'a pas cliqué sur "Partager". Demandez-lui !`);
        } else {
          setNoFriend(newName);
        }
      }
    }, 500);
  };

  const candidatesScorePerThemes = useMemo(
    () =>
      getCandidatesScorePerThemes(
        answersToShow.filter((a) => selectedThemes.includes(a.themeId)) as Parameters<
          typeof getCandidatesScorePerThemes
        >[0],
        candidates.map((c) => ({
          ...c,
          answers: c.answers.filter((a: Answer) => selectedThemes.includes(a.themeId)),
        })) as unknown as Parameters<typeof getCandidatesScorePerThemes>[1],
        quizzQuestions,
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      JSON.stringify(answersToShow),
      JSON.stringify(selectedThemes),
      JSON.stringify(candidates),
      JSON.stringify(quizzQuestions),
    ],
  );

  const friendsScorePerThemes = useMemo(
    () =>
      getCandidatesScorePerThemes(
        answersToShow.filter((a) => selectedThemes.includes(a.themeId)) as Parameters<
          typeof getCandidatesScorePerThemes
        >[0],
        friends.map((f) => ({
          ...f,
          answers: f.answers.filter((a: Answer) => selectedThemes.includes(a.themeId)),
        })) as unknown as Parameters<typeof getCandidatesScorePerThemes>[1],
        quizzQuestions,
      ),
    [answersToShow, selectedThemes, friends],
  );

  const filteredPersons: UserAnswerWithScorePerThemeAndMax[] = useMemo(
    () => [
      ...candidatesScorePerThemes.filter((candidate) => selectedCandidates.includes(candidate?.pseudo)),
      ...friendsScorePerThemes.filter((friend) => selectedFriends.includes(friend?.pseudo)),
    ],
    [candidatesScorePerThemes, friendsScorePerThemes, selectedCandidates, selectedFriends],
  );

  // "Questions importantes pour moi": same scoring, restricted to the questions the user starred.
  const importantAnswers = useMemo(
    () => answersToShow.filter((a) => a.isImportant && selectedThemes.includes(a.themeId)),
    [answersToShow, selectedThemes],
  );
  const importantPersons = useMemo(() => {
    if (!importantAnswers.length) return [];
    const score = (persons: typeof candidates | typeof friends) =>
      getCandidatesScorePerThemes(
        importantAnswers as Parameters<typeof getCandidatesScorePerThemes>[0],
        persons as unknown as Parameters<typeof getCandidatesScorePerThemes>[1],
        quizzQuestions,
      );
    return [
      ...score(candidates).filter((candidate) => selectedCandidates.includes(candidate?.pseudo)),
      ...score(friends).filter((friend) => selectedFriends.includes(friend?.pseudo)),
    ];
  }, [importantAnswers, candidates, friends, selectedCandidates, selectedFriends]);

  const podiumsPerTheme = useMemo(
    () =>
      selectedThemes.map((themeId) => ({
        themeId,
        personsScore: filteredPersons?.map((c) => ({
          id: c.id,
          pseudo: c.pseudo,
          picture: c.picture,
          color: c.color,
          total: c.scorePerThemes?.find((score) => themeId === score.themeId)?.percent ?? 0,
          totalMax: 100,
        })),
      })),
    [selectedThemes, filteredPersons],
  );

  useEffect(() => {
    const save = isSignedUp ? setToLocalStorage : setToSessionStorage;
    const storage = isSignedUp ? 'localStorage' : 'sessionStorage';
    const isDefaultSelection =
      selectedCandidates.length === allCandidatesQualified.length &&
      allCandidatesQualified.every((pseudo) => selectedCandidates.includes(pseudo));
    if (!isDefaultSelection) {
      save('selectedCandidates', selectedCandidates);
    } else {
      window[storage].removeItem('selectedCandidates');
    }
  }, [selectedCandidates, allCandidatesQualified, isSignedUp]);

  useEffect(() => {
    const save = isSignedUp ? setToLocalStorage : setToSessionStorage;
    const storage = isSignedUp ? 'localStorage' : 'sessionStorage';
    if (selectedFriends.length > 0) {
      save('selectedFriends', selectedFriends);
    } else {
      window[storage].removeItem('selectedFriends');
    }
  }, [selectedFriends, isSignedUp]);

  useEffect(() => {
    if (userPseudo || !selectedCandidates.length) setSelectedCandidates(allCandidatesQualified);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidates.length]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // On desktop the page scrolls inside this div. After a signup, /result redirects to /result/{pseudo}:
    // the router's scroll restoration puts the old position back on mount, so reset it once that is done.
    const timeout = setTimeout(() => scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'instant' }), 0);
    return () => clearTimeout(timeout);
  }, [userPseudo]);

  const globalPodium = useMemo(() => getPodium(filteredPersons, true), [filteredPersons]);

  const shareRows: ResultImageRow[] = useMemo(() => {
    let rank = 1;
    return globalPodium.flatMap((step) => {
      const rows = step.pseudos.map((pseudo, i) => ({
        pseudo,
        picture: step.pictures[i],
        color: step.colors[i],
        percent: step.percent,
        rank,
      }));
      rank += step.pseudos.length;
      return rows;
    });
  }, [globalPodium]);

  const questionPersons: QuestionPerson[] = useMemo(
    () => [
      ...candidates.filter((c) => selectedCandidates.includes(c.pseudo)),
      ...friends.filter((f) => selectedFriends.includes(f.pseudo)),
    ],
    [candidates, friends, selectedCandidates, selectedFriends],
  );

  const [feedback, setFeedback] = useState<QuizzFeedbackState>({ rating: null, sent: false });
  useEffect(() => {
    const stored = getFromLocalStorage(QUIZZ_FEEDBACK_STORAGE_KEY, null) as QuizzFeedbackState | null;
    if (stored) setFeedback(stored);
  }, []);

  const [visibleThemes, setVisibleThemes] = useState(1);

  const card = 'rounded-2xl border border-gray-200 bg-white p-6 shadow-sm max-lg:p-4';

  // Nothing left to do (full quiz, results saved): no box at all.
  const fullQuizzCta = (onlyQuickQuizzAnswers || showSaveButton) && (
    <aside className="grid gap-5 rounded-2xl border-2 border-yellow-400 bg-yellow-50 p-5 lg:grid-flow-col lg:auto-cols-fr">
      {onlyQuickQuizzAnswers && (
        <div className="flex flex-col items-start gap-3">
          <h2 className="font-[Merriweather] text-xl font-bold text-[#082d0f]">Vous avez fait le test rapide</h2>
          <p className="text-sm text-gray-700">
            Ce résultat repose sur {answersToShow.length} question{answersToShow.length > 1 ? 's' : ''}. La version
            intégrale en compte {quizzQuestionsCount}, sur {quizzThemesCount} thèmes&nbsp;: répondez à celles que
            vous voulez, votre classement s'affine à chaque réponse.
          </p>
          <Link
            to="/themes"
            className="mt-auto inline-flex items-center rounded-lg border-2 border-gray-800 bg-gray-800 px-4 py-2.5 text-sm font-semibold text-white no-underline"
          >
            Faire la version intégrale
          </Link>
        </div>
      )}
      {showSaveButton && (
        <div
          className={`flex flex-col items-start gap-3 ${onlyQuickQuizzAnswers ? 'border-yellow-300 max-lg:border-t max-lg:pt-5 lg:border-l lg:pl-5' : ''}`}
        >
          <h2 className="font-[Merriweather] text-xl font-bold text-[#082d0f]">Enregistrez vos résultats</h2>
          <p className="text-sm text-gray-700">
            Sans enregistrement, vos résultats seront perdus dans une heure. Enregistrez-les de façon anonyme avec un
            pseudo et un mot de passe, sans email.
          </p>
          <button
            type="button"
            onClick={() => setShowLoginModal(true)}
            className={`mt-auto inline-flex cursor-pointer items-center rounded-lg border-2 border-gray-800 px-4 py-2.5 text-sm font-semibold ${onlyQuickQuizzAnswers ? 'bg-white text-gray-800' : 'bg-gray-800 text-white'}`}
          >
            Enregistrer mes résultats
          </button>
        </div>
      )}
    </aside>
  );

  const feedbackBox = !publicPage && (
    <section className={card}>
      <QuizzFeedback state={feedback} setState={setFeedback} answersCount={answersToShow.length} />
    </section>
  );

  const shareBox = !publicPage && (
    <section className={card}>
      <ShareResults
        rows={shareRows}
        answersCount={answersToShow.length}
        onRequestLogin={() => setShowLoginModal(true)}
        onCompare={() => setShowFriends(true)}
      />
    </section>
  );

  return (
    <>
      <div ref={scrollContainerRef} className="overflow-y-auto px-2.5 pt-20 pb-[5vh] max-lg:pt-[3vh] lg:h-[calc(100vh-80px)]">
        <div className="mx-auto flex max-w-[1024px] flex-col gap-14 max-lg:gap-10">
          <div className="flex flex-col justify-between">
            <h1 className="mb-1 font-[Merriweather] text-[30px] font-bold text-[#082d0f]">{title}</h1>
          </div>

          {fullQuizzCta}

          <section className={card}>
            <h2 className="mb-1 font-[Merriweather] text-2xl font-bold text-quizz-dark">Votre classement général</h2>
            <p className="mb-4 text-sm text-gray-600">Appuyez sur le nom d'un candidat pour voir ses réponses.</p>
            <main>
              <VerticalPodium podiumised={globalPodium} />
            </main>
            <div className="mt-5 flex flex-wrap gap-2 border-t border-gray-100 pt-4">
              {!publicPage && (
                <>
                  {showSaveButton && (
                    <button
                      type="button"
                      onClick={() => setShowLoginModal(true)}
                      className="inline-flex animate-pulse items-center gap-2 rounded-lg border-2 border-yellow-400 bg-yellow-400 px-4 py-2.5 text-sm font-semibold text-black"
                    >
                      <Save size={16} />
                      Enregistrer
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowFriends(true)}
                    className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-800 bg-white px-4 py-2.5 text-sm font-medium text-gray-800"
                  >
                    <Users size={16} />
                    Comparer avec mes amis
                  </button>
                  {answersToShow.length > 0 && (
                    <button
                      type="button"
                      onClick={downloadAnswers}
                      className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-800 bg-white px-4 py-2.5 text-sm font-medium text-gray-800"
                    >
                      <Download size={16} />
                      Télécharger mes réponses
                    </button>
                  )}
                </>
              )}
              <Filter
                toggle={setShowCandidates}
                isActive={showCandidates}
                title="Afficher/masquer des candidats"
                buttonClassName="inline-flex items-center gap-2 rounded-lg border-2 border-gray-800 bg-white px-4 py-2.5 text-sm font-medium text-gray-800"
              >
                {candidatesScorePerThemes.map((candidate) => (
                  <button
                    key={candidate?.pseudo}
                    data-pseudo={candidate?.pseudo}
                    onClick={onSelectCandidates}
                    className="max-h-[55px] cursor-pointer rounded-lg border px-4 py-2 text-sm"
                    style={{
                      backgroundColor: selectedCandidates.includes(candidate?.pseudo) ? '#111827' : 'white',
                      color: selectedCandidates.includes(candidate?.pseudo) ? 'white' : '#111827',
                      borderColor: '#111827',
                    }}
                  >
                    {candidate?.pseudo}
                  </button>
                ))}
              </Filter>
              <Filter toggle={setShowFriends} isActive={showFriends} title="Se comparer à mes amis" hideTitle>
                {friendsScorePerThemes.map((friend) => (
                  <button
                    key={friend?.pseudo}
                    data-pseudo={friend?.pseudo}
                    onClick={onSelectFriends}
                    className="max-h-[55px] cursor-pointer rounded-lg border px-4 py-2 text-sm"
                    style={{
                      backgroundColor: selectedFriends.includes(friend?.pseudo) ? '#111827' : 'white',
                      color: selectedFriends.includes(friend?.pseudo) ? 'white' : '#111827',
                      borderColor: '#111827',
                    }}
                  >
                    {friend?.pseudo}
                  </button>
                ))}
                <div className="flex w-full items-center pr-3">
                  <input
                    className="w-full rounded border border-gray-200 px-3 py-3 text-base font-light placeholder:text-quizz-dark/40"
                    placeholder={loadingFriend ? `Ajout de ${newFriend}...` : "Tapez le pseudo d'un ami"}
                    value={newFriend}
                    onChange={setNewFriendRequest}
                    autoComplete="name"
                  />
                  {loadingFriend && <Loader size="20px" isLoading />}
                </div>
                <span
                  className={`text-xs text-red-500 ${!noFriend || noFriend !== newFriend ? 'opacity-0' : ''}`}
                >
                  Il n'y a pas de pseudo <b>{newFriend}</b> existant. Vérifiez les majuscules&nbsp;?
                </span>
                {!user?.isPublic && (
                  <small className="text-balance">
                    Pour que vos amis puissent aussi se comparer à vous, partagez votre lien (bloc «&nbsp;Partagez vos
                    résultats&nbsp;»).
                  </small>
                )}
              </Filter>
            </div>
          </section>

          {feedbackBox}

          {shareBox}

          <section className="rounded-2xl bg-quizz-dark p-6 text-white max-lg:p-4">
            <h2 className="mb-1 font-[Merriweather] text-2xl font-bold">Et si vous en discutiez avec l'IA&nbsp;?</h2>
            <p className="mb-4 text-sm text-white/80">
              Une IA qui n'a pas le droit de vous dire pour qui voter. Elle est là pour vous aider à réfléchir, pas
              pour penser à votre place.
            </p>
            <ul className="grid gap-3 lg:grid-cols-3">
              {chatModes.map((chatMode) => (
                <li key={chatMode.slug} className="flex">
                  <Link
                    to={`/ia/${chatMode.slug}`}
                    className="block w-full rounded-xl border-2 border-white/20 p-4 text-white no-underline transition-colors hover:border-quizz-yellow"
                  >
                    <span className="mb-1 block font-[Merriweather] text-lg font-bold">{chatMode.title}</span>
                    <span className="block text-sm leading-relaxed text-white/80">{chatMode.descriptionVous}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-[Merriweather] text-2xl font-bold text-quizz-dark">Thème par thème</h2>
            <div className={card}>
              <h3 className="mb-1 font-[Merriweather] text-xl font-bold text-quizz-dark">
                <Star size={20} className="mr-2 inline align-[-2px] text-yellow-400" fill="currentColor" />
                Questions importantes pour moi
              </h3>
              {importantPersons.length > 0 ? (
                <VerticalPodium
                  podiumised={getPodium(importantPersons, true)}
                  linkSearch={publicPage ? undefined : { importantes: 1 }}
                  subtitle={
                    <>
                      Résultats calculés uniquement sur{' '}
                      {importantAnswers.length === 1 ? 'la question' : `les ${importantAnswers.length} questions`}{' '}
                      {publicPage ? 'marquée' : 'que vous avez marquée'}
                      {importantAnswers.length > 1 ? 's' : ''} comme importante
                      {importantAnswers.length > 1 ? 's' : ''}.
                    </>
                  }
                />
              ) : (
                <p className="text-sm text-gray-600">
                  {publicPage
                    ? 'Aucune question marquée comme importante.'
                    : "Sur chaque question, appuyez sur « Marquer comme importante pour moi » : vous verrez ici avec qui vous êtes d'accord sur ce qui compte le plus pour vous."}
                </p>
              )}
            </div>
            {/* Hidden themes stay in the DOM, like the hidden rows of a podium. */}
            {podiumsPerTheme.map(({ personsScore, themeId }, index) => (
              <div key={themeId} className={`${card} ${index >= visibleThemes ? 'hidden' : ''}`}>
                <VerticalPodium
                  podiumised={getPodium(personsScore)}
                  title={quizz.find((t) => t._id === themeId)?.fr}
                  linkSearch={{ theme: themeId }}
                />
              </div>
            ))}
            {podiumsPerTheme.length > visibleThemes && (
              <button
                type="button"
                onClick={() => setVisibleThemes((v) => v + 3)}
                className="mx-auto flex cursor-pointer items-center gap-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Voir plus ({podiumsPerTheme.length - visibleThemes} thème
                {podiumsPerTheme.length - visibleThemes > 1 ? 's' : ''} restant
                {podiumsPerTheme.length - visibleThemes > 1 ? 's' : ''}) <ChevronDown size={16} />
              </button>
            )}
          </section>

          <QuestionByQuestion
            answers={answersToShow.filter((a) => selectedThemes.includes(a.themeId))}
            persons={questionPersons}
          />

          {feedbackBox}

          {shareBox}

          {fullQuizzCta}
        </div>
      </div>
      <Loader withBackground size="15vh" isLoading={isLoading} />
      <ModalLogin
        isActive={showLoginModal}
        onClose={() => {
          setShowLoginModal(false);
          // On desktop the page scrolls inside this div, not the window; on mobile this div does not scroll.
          // Instant and after the re-render: after a signup the blocks above shrink, and Chrome's scroll
          // anchoring cancels a smooth scroll halfway.
          setTimeout(() => scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'instant' }), 0);
        }}
        title="Enregistrez-vous"
      />
    </>
  );
}
