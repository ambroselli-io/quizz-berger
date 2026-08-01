import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import asyncStorageAdapter from './asyncStorage';
import {
  bundledThemes,
  enrichThemes,
  flattenQuestions,
  formatQuizzForSearch,
  isValidQuizz,
} from '~/utils/quizz';
import type { QuizzTheme, QuizzQuestion } from '~/types/quizz';

interface Derived {
  quizz: QuizzTheme[];
  quizzForSearch: string[];
  quizzQuestions: QuizzQuestion[];
}

interface State extends Derived {
  rawThemes: QuizzTheme[];
  version: string | null;
}

interface Actions {
  setQuizz: (rawThemes: QuizzTheme[], version: string | null) => void;
}

const derive = (rawThemes: QuizzTheme[]): Derived => ({
  quizz: enrichThemes(rawThemes),
  quizzForSearch: formatQuizzForSearch(rawThemes),
  quizzQuestions: flattenQuestions(rawThemes),
});

const useQuizzStore = create<State & Actions>()(
  persist(
    (set): State & Actions => ({
      rawThemes: bundledThemes,
      version: null,
      ...derive(bundledThemes),
      setQuizz: (rawThemes: QuizzTheme[], version: string | null) =>
        set({ rawThemes, version, ...derive(rawThemes) }),
    }),
    {
      name: 'quizz-du-berger-quizz',
      storage: createJSONStorage(() => asyncStorageAdapter),
      partialize: (state) => ({ rawThemes: state.rawThemes, version: state.version }),
      // The derived fields are not persisted, so they have to be recomputed from
      // the stored themes. A stored payload that no longer validates (older app,
      // corrupted write) falls back to the bundled questions.
      merge: (persisted, current) => {
        const stored = persisted as Partial<State> | undefined;
        if (!isValidQuizz(stored?.rawThemes)) return current;
        return {
          ...current,
          rawThemes: stored!.rawThemes!,
          version: stored?.version ?? null,
          ...derive(stored!.rawThemes!),
        };
      },
    },
  ),
);

export default useQuizzStore;
