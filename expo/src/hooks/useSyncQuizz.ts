import { useEffect } from 'react';
import API from '~/services/api';
import useQuizzStore from '~/zustand/quizz';
import { isValidQuizz } from '~/utils/quizz';

const syncQuizz = async () => {
  const { version, setQuizz } = useQuizzStore.getState();

  const versionResponse = await API.get({ path: '/quizz/version' });
  if (!versionResponse?.ok || !versionResponse.version) return;
  if (versionResponse.version === version) return;

  const quizzResponse = await API.get({ path: '/quizz' });
  if (!quizzResponse?.ok || !isValidQuizz(quizzResponse.data)) return;

  setQuizz(quizzResponse.data, quizzResponse.version ?? versionResponse.version);
};

/**
 * Pulls the question set from the API so new questions land in the app without
 * a store release. Runs once the persisted quizz has been rehydrated, otherwise
 * rehydration would overwrite what we just fetched.
 */
const useSyncQuizz = () => {
  useEffect(() => {
    if (useQuizzStore.persist.hasHydrated()) {
      syncQuizz();
      return;
    }
    return useQuizzStore.persist.onFinishHydration(() => {
      syncQuizz();
    });
  }, []);
};

export default useSyncQuizz;
