import AsyncStorage from '@react-native-async-storage/async-storage';
import useQuizzStore from '~/zustand/quizz';
import { bundledThemes } from '~/utils/quizz';
import type { QuizzTheme } from '~/types/quizz';

const STORAGE_KEY = 'quizz-du-berger-quizz';

const serverThemes: QuizzTheme[] = [
  {
    _id: 'theme-2027-police',
    fr: 'Police et sécurité',
    questions: [
      {
        _id: 'question-2027-pol-99',
        fr: 'Une nouvelle question ?',
        answers: ['Oui', 'Non'],
        scores: [
          [5, 0],
          [0, 5],
        ],
      },
    ],
  },
];

const writePersistedState = async (state: unknown) =>
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ state, version: 0 }));

beforeEach(async () => {
  await AsyncStorage.clear();
  useQuizzStore.getState().setQuizz(bundledThemes, null);
});

describe('quizz store', () => {
  it('starts on the questions bundled with the app', () => {
    expect(useQuizzStore.getState().quizz).toHaveLength(bundledThemes.length);
    expect(useQuizzStore.getState().version).toBeNull();
  });

  it('recomputes derived data when the questions change', () => {
    useQuizzStore.getState().setQuizz(serverThemes, 'abc123');
    const state = useQuizzStore.getState();

    expect(state.quizzQuestions).toHaveLength(1);
    expect(state.quizzForSearch).toHaveLength(1);
    expect(state.quizz[0].backgroundColor).toBeTruthy();
    expect(state.version).toBe('abc123');
  });

  it('writes the questions to storage so they survive a restart', async () => {
    useQuizzStore.getState().setQuizz(serverThemes, 'abc123');

    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    const persisted = JSON.parse(raw!);
    expect(persisted.state.version).toBe('abc123');
    expect(persisted.state.rawThemes).toHaveLength(1);
    // Derived values are recomputed on rehydration rather than stored.
    expect(persisted.state.quizz).toBeUndefined();
  });

  it('restores stored questions and rebuilds derived data on rehydration', async () => {
    await writePersistedState({ rawThemes: serverThemes, version: 'abc123' });

    await useQuizzStore.persist.rehydrate();

    const state = useQuizzStore.getState();
    expect(state.version).toBe('abc123');
    expect(state.quizz.map((t) => t._id)).toEqual(['theme-2027-police']);
    expect(state.quizzQuestions).toHaveLength(1);
    expect(state.quizzForSearch[0]).toContain('securite');
  });

  it('falls back to the bundled questions when the stored payload is invalid', async () => {
    await writePersistedState({
      rawThemes: [{ _id: 't', fr: 'T', questions: [{ _id: 'q', fr: 'Q', answers: ['a'], scores: [] }] }],
      version: 'corrupted',
    });

    await useQuizzStore.persist.rehydrate();

    const state = useQuizzStore.getState();
    expect(state.quizz).toHaveLength(bundledThemes.length);
    expect(state.version).toBeNull();
  });

  it('falls back to the bundled questions when nothing is stored', async () => {
    await useQuizzStore.persist.rehydrate();

    expect(useQuizzStore.getState().quizz).toHaveLength(bundledThemes.length);
  });
});
