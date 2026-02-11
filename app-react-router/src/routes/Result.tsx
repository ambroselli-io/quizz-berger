import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router';
import API from '@app/services/api';
import { getFromSessionStorage, setToSessionStorage } from '@app/utils/storage';
import getUserThemes from '@app/utils/getUserThemes';
import useUser from '@app/hooks/useUser';
import { quizz, quizzQuestions } from '@app/utils/quizz';
import useCandidates from '@app/hooks/useCandidates';
import useFriends from '@app/hooks/useFriends';
import useUserAnswers from '@app/hooks/useUserAnswers';
import ModalLogin from '@app/components/modals/ModalLogin';
import ModalShare from '@app/components/modals/ModalShare';
import Loader from '@app/components/Loader';
import Podium from '@app/components/Podium';
import QuizzButton from '@app/components/QuizzButton';
import Filter from '@app/components/Filter';
import type { Answer } from '@app/types/quizz';

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

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(!!userPseudo && !userToShow?.pseudo);
  }, [userPseudo, userToShow?.pseudo]);

  const userThemes = useMemo(() => getUserThemes(answersToShow), [answersToShow]);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showFriends, setShowFriends] = useState(() =>
    Boolean(getFromSessionStorage('selectedFriends', false)),
  );

  const showSaveButton = useMemo(() => !publicPage && !userToShow?.pseudo, [publicPage, userToShow]);
  const [hideSaveTip, setHideSaveTip] = useState(() => getFromSessionStorage('hideSaveTip', false));

  const [newFriend, setNewFriend] = useState('');
  const [loadingFriend, setLoadingFriend] = useState(false);
  const [noFriend, setNoFriend] = useState<string | null>(null);

  const allCandidatesQualified = useMemo(() => candidates.map((c) => c.pseudo), [candidates]);
  const [showCandidates, setShowCandidates] = useState(false);
  const allFriends = useMemo(() => friends.map((c) => c.pseudo), [friends]);

  const [selectedCandidates, setSelectedCandidates] = useState<string[]>(() => {
    if (publicPage) return allCandidatesQualified;
    return getFromSessionStorage('selectedCandidates', allCandidatesQualified) as string[];
  });
  const [selectedFriends, setSelectedFriends] = useState<string[]>(() => {
    if (publicPage) return [];
    return getFromSessionStorage('selectedFriends', allFriends) as string[];
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
        answersToShow.filter((a) => selectedThemes.includes(a.themeId)),
        candidates.map((c) => ({
          ...c,
          answers: c.answers.filter((a: Answer) => selectedThemes.includes(a.themeId)),
        })),
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
        answersToShow.filter((a) => selectedThemes.includes(a.themeId)),
        friends.map((f) => ({
          ...f,
          answers: f.answers.filter((a: Answer) => selectedThemes.includes(a.themeId)),
        })),
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
    if (candidates.map((c) => c.pseudo).length !== selectedCandidates.length) {
      setToSessionStorage('selectedCandidates', selectedCandidates);
    } else {
      window.sessionStorage.removeItem('selectedCandidates');
    }
  }, [selectedCandidates, candidates]);

  useEffect(() => {
    if (userPseudo || !selectedCandidates.length) setSelectedCandidates(allCandidatesQualified);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidates.length]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <title>{title} | Le Quizz du Berger</title>
      <div className="overflow-y-auto px-2.5 pt-20 max-lg:pt-[3vh] lg:h-[calc(100vh-80px)]">
        <div className="mx-auto mb-[2vh] max-w-[1024px]">
          <div className="flex flex-col justify-between">
            <h1 className="mb-1 font-[Merriweather] text-[30px] font-bold text-[#082d0f]">{title}</h1>
            {showSaveButton && !hideSaveTip && (
              <small>
                Enregistrez vos résultats maintenant, sinon dans une heure ils sont perdus !{' - '}
                <button
                  type="button"
                  className="h-4 cursor-pointer rounded-full border-none bg-yellow-400 px-1.5 text-black"
                  onClick={() => setShowLoginModal(true)}
                >
                  Oui !
                </button>
                {' - '}
                <button
                  type="button"
                  className="cursor-pointer border-none bg-transparent"
                  onClick={() => {
                    setHideSaveTip(true);
                    setToSessionStorage('hideSaveTip', true);
                  }}
                >
                  Non merci !
                </button>
              </small>
            )}
          </div>
          <span className="text-[0.65em] italic">
            Vous pouvez cliquer sur le nom d'un candidat pour voir ses réponses
          </span>
        </div>
        <main className="mx-0 mb-[5vh] h-[50vh] overflow-y-visible max-lg:h-[40vh]">
          <Podium podiumised={getPodium(filteredPersons)} />
        </main>
        <div className="mx-auto mb-[5vh] -mt-[5vh] max-w-[1024px]">
          {!publicPage && (
            <div className="flex items-center max-lg:flex-col max-lg:items-start max-lg:gap-2.5">
              {showSaveButton && (
                <QuizzButton
                  onClick={() => setShowLoginModal(true)}
                  animate
                  className="ml-2.5 text-[0.9em] max-lg:ml-0"
                >
                  Enregistrer
                </QuizzButton>
              )}
              <QuizzButton
                onClick={() => {
                  if (!userToShow?.pseudo) setShowLoginModal(true);
                  setShowShareModal(true);
                }}
                animate={!user?.isPublic}
                className="ml-2.5 text-[0.9em] max-lg:ml-0"
              >
                Partager avec mes amis
              </QuizzButton>
              <QuizzButton
                onClick={() => setShowFriends(true)}
                animate={!user?.friends?.length}
                className="ml-2.5 text-[0.9em] max-lg:ml-0"
              >
                Se comparer à mes amis
              </QuizzButton>
            </div>
          )}
        </div>
        <div className="mx-auto mb-[2vh] max-w-[1024px]">
          <h2 className="mb-1 font-[Merriweather] text-[30px] font-bold text-[#082d0f]">Thème par thème</h2>
          <Filter toggle={setShowCandidates} isActive={showCandidates} title="Afficher/masquer des candidats">
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
              Il n'y a pas de pseudo <b>{newFriend}</b> existant. Vérifiez les majuscules ?
            </span>
            {!user?.isPublic && (
              <small>
                N'oubliez pas de cliquer sur le bouton <b>Partager avec mes amis</b> pour leur permettre de
                faire la même chose avec vous !
              </small>
            )}
          </Filter>
        </div>
        <aside className="mx-0">
          {podiumsPerTheme.map(({ personsScore, themeId }) => (
            <div key={themeId} className="h-[max(15vh,400px)] w-full max-lg:h-[max(15vh,300px)]">
              <Podium podiumised={getPodium(personsScore)} title={quizz.find((t) => t._id === themeId)?.fr} />
            </div>
          ))}
        </aside>
      </div>
      <Loader withBackground size="15vh" isLoading={isLoading} />
      <ModalShare isActive={showShareModal} onClose={() => setShowShareModal(false)} />
      <ModalLogin
        isActive={showLoginModal}
        onClose={() => {
          setShowLoginModal(false);
          setShowShareModal(false);
        }}
        title={showShareModal ? "Enregistrez vos résultats d'abord" : 'Enregistrez-vous'}
      />
    </>
  );
}
