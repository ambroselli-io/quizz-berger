import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import API from '@app/services/api';
import useUserStore from '@app/zustand/user';
import type { User } from '@app/types/quizz';

interface UseUserOptions {
  redirectOnLoggedOut?: string;
  redirectOnLoggedIn?: string;
}

// Module-level dedup: only one /user/me request in flight at a time
let fetchPromise: Promise<void> | null = null;

const useUser = (options: UseUserOptions = {}) => {
  const { redirectOnLoggedOut, redirectOnLoggedIn } = options;
  const navigate = useNavigate();
  const { user: storedUser, setUser: setStoredUser } = useUserStore();
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
          useUserStore.getState().setUser({ ...data.user, isLoggedIn: true });
        } else {
          useUserStore.getState().setUser({ isLoggedIn: false });
        }
      } catch {
        useUserStore.getState().setUser({ isLoggedIn: false });
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

  useEffect(() => {
    if (isLoading) return;
    if (redirectOnLoggedOut && !user.isLoggedIn) {
      navigate(redirectOnLoggedOut);
    }
    if (redirectOnLoggedIn && user.isLoggedIn) {
      navigate(redirectOnLoggedIn);
    }
  }, [isLoading, user.isLoggedIn, redirectOnLoggedOut, redirectOnLoggedIn, navigate]);

  const mutate = useCallback(
    (newUser?: User) => {
      if (newUser) {
        setStoredUser({ ...newUser, isLoggedIn: true });
      } else {
        fetchPromise = null; // allow a fresh fetch
        fetchUser();
      }
    },
    [setStoredUser, fetchUser],
  );

  const logout = useCallback(async () => {
    await API.post({ path: '/user/logout' });
    setStoredUser(null);
    window?.sessionStorage?.clear();
    navigate('/');
  }, [setStoredUser, navigate]);

  return { user, isLoading, mutate, logout };
};

export default useUser;
