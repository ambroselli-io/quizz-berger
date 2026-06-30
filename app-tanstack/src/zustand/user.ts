import { create } from 'zustand';
import { devtools, persist, createJSONStorage, type StateStorage } from 'zustand/middleware';
import type { User } from '@app/types/quizz';

// No-op storage on the server (SSR): localStorage doesn't exist there.
const noopStorage: StateStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

const getStorage = (): StateStorage =>
  typeof window !== 'undefined' ? window.localStorage : noopStorage;

interface State {
  user: User | null;
}

interface Action {
  setUser: (user: User | null) => void;
}

const useUserStore = create<State & Action>()(
  devtools(
    persist(
      (set): State & Action => ({
        user: null,
        setUser: (user: User | null) => set({ user }),
      }),
      {
        name: 'quizz-du-berger-user-store',
        version: 1,
        storage: createJSONStorage(getStorage),
        // Don't read localStorage during the initial (server-matching) render;
        // rehydrate explicitly on the client to avoid hydration mismatches.
        skipHydration: true,
      },
    ),
  ),
);

export default useUserStore;
