import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '@app/types/quizz';

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
        storage: createJSONStorage(() => window.localStorage),
      },
    ),
  ),
);

export default useUserStore;
