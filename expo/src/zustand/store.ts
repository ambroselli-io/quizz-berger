import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import asyncStorageAdapter from './asyncStorage';
import type { User, Answer } from '~/types/quizz';

interface State {
  user: User | null;
  token: string | null;
  userAnswers: Answer[];
  hiddenCandidates: string[];
}

interface Actions {
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setUserAnswers: (answers: Answer[]) => void;
  upsertAnswer: (answer: Answer) => void;
  toggleHiddenCandidate: (pseudo: string) => void;
  setHiddenCandidates: (pseudos: string[]) => void;
  logout: () => void;
}

const useStore = create<State & Actions>()(
  persist(
    (set): State & Actions => ({
      user: null,
      token: null,
      userAnswers: [],
      hiddenCandidates: [],
      setUser: (user: User | null) => set({ user }),
      setToken: (token: string | null) => set({ token }),
      setUserAnswers: (answers: Answer[]) => set({ userAnswers: answers }),
      upsertAnswer: (answer: Answer) =>
        set((state) => {
          const existing = state.userAnswers.findIndex(
            (a) => a.questionId === answer.questionId,
          );
          if (existing >= 0) {
            const updated = [...state.userAnswers];
            updated[existing] = answer;
            return { userAnswers: updated };
          }
          return { userAnswers: [...state.userAnswers, answer] };
        }),
      toggleHiddenCandidate: (pseudo: string) =>
        set((state) => ({
          hiddenCandidates: state.hiddenCandidates.includes(pseudo)
            ? state.hiddenCandidates.filter((p) => p !== pseudo)
            : [...state.hiddenCandidates, pseudo],
        })),
      setHiddenCandidates: (pseudos: string[]) => set({ hiddenCandidates: pseudos }),
      logout: () => set({ user: null, token: null, userAnswers: [], hiddenCandidates: [] }),
    }),
    {
      name: 'quizz-du-berger-store',
      storage: createJSONStorage(() => asyncStorageAdapter),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    },
  ),
);

export default useStore;
