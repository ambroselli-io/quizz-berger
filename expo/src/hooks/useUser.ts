import { useEffect, useState, useCallback } from 'react';
import API from '~/services/api';
import useStore from '~/zustand/store';
import type { User } from '~/types/quizz';

let fetchPromise: Promise<void> | null = null;

const useUser = () => {
  const { user: storedUser, setUser: setStoredUser } = useStore();
  const [isLoading, setIsLoading] = useState(!storedUser);

  const user: User = storedUser ?? { isLoggedIn: false };

  const fetchUser = useCallback(async () => {
    if (fetchPromise) {
      await fetchPromise;
      setIsLoading(false);
      return;
    }
    fetchPromise = (async () => {
      try {
        const data = await API.post({ path: '/user/me' });
        if (data?.ok) {
          useStore.getState().setUser({ ...data.user, isLoggedIn: true });
        } else {
          useStore.getState().setUser({ isLoggedIn: false });
        }
      } catch {
        useStore.getState().setUser({ isLoggedIn: false });
      } finally {
        fetchPromise = null;
      }
    })();
    await fetchPromise;
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const mutate = useCallback(
    (newUser?: User) => {
      if (newUser) {
        setStoredUser({ ...newUser, isLoggedIn: true });
      } else {
        fetchPromise = null;
        fetchUser();
      }
    },
    [setStoredUser, fetchUser],
  );

  const logout = useCallback(async () => {
    await API.post({ path: '/user/logout' });
    setStoredUser(null);
    API.setToken(null);
  }, [setStoredUser]);

  return { user, isLoading, mutate, logout };
};

export default useUser;
