import { create } from 'zustand';
import { persist, createJSONStorage, type StateStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User, Answer } from '~/types/quizz';

// AsyncStorage adapter for Zustand
const asyncStorageAdapter: StateStorage = {
  getItem: async (name: string) => {
    return (await AsyncStorage.getItem(name)) ?? null;
  },
  setItem: async (name: string, value: string) => {
    await AsyncStorage.setItem(name, value);
  },
  removeItem: async (name: string) => {
    await AsyncStorage.removeItem(name);
  },
};

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
