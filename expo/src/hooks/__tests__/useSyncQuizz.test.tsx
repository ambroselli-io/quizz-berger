import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { render, waitFor } from '@testing-library/react-native';
import { Text } from 'react-native';
import API from '~/services/api';
import useSyncQuizz from '~/hooks/useSyncQuizz';
import useQuizzStore from '~/zustand/quizz';
import { bundledThemes, withQuestions } from '~/utils/quizz';
import type { QuizzTheme } from '~/types/quizz';

jest.mock('~/services/api', () => ({
  __esModule: true,
  default: { get: jest.fn() },
}));

const apiGet = API.get as jest.Mock;

// A question added to the API after this build shipped — the exact situation
// that used to require an App Store release.
const NEW_QUESTION_ID = 'question-2027-pol-99';

const serverThemes: QuizzTheme[] = [
  {
    _id: 'theme-2027-police',
    fr: 'Police et sécurité',
    questions: [
      {
        _id: NEW_QUESTION_ID,
        fr: 'Comment répondre aux nuisances du quotidien ?',
        answers: ['Plus de police', 'Plus de prévention'],
        scores: [
          [5, 0],
          [0, 5],
        ],
      },
    ],
  },
];

const Probe = () => {
  useSyncQuizz();
  return <Text>probe</Text>;
};

const mockApi = (responses: Record<string, unknown>) => {
  apiGet.mockImplementation(({ path }: { path: string }) => Promise.resolve(responses[path]));
};

beforeEach(async () => {
  apiGet.mockReset();
  await AsyncStorage.clear();
  useQuizzStore.setState({ version: null });
  useQuizzStore.getState().setQuizz(bundledThemes, null);
});

describe('useSyncQuizz', () => {
  it('replaces the bundled questions with the ones served by the API', async () => {
    mockApi({
      '/quizz/version': { ok: true, version: 'abc123' },
      '/quizz': { ok: true, version: 'abc123', data: serverThemes },
    });

    await render(<Probe />);

    await waitFor(() => {
      expect(useQuizzStore.getState().version).toBe('abc123');
    });
    expect(useQuizzStore.getState().quizz.map((theme) => theme._id)).toEqual(['theme-2027-police']);
  });

  it('makes a question that only exists server-side reachable', async () => {
    expect(
      useQuizzStore.getState().quizzQuestions.find((q) => q._id === NEW_QUESTION_ID),
    ).toBeUndefined();

    mockApi({
      '/quizz/version': { ok: true, version: 'abc123' },
      '/quizz': { ok: true, version: 'abc123', data: serverThemes },
    });

    await render(<Probe />);

    await waitFor(() => {
      expect(
        useQuizzStore.getState().quizzQuestions.find((q) => q._id === NEW_QUESTION_ID),
      ).toBeDefined();
    });
  });

  it('recomputes the search index and the flat question list after a sync', async () => {
    mockApi({
      '/quizz/version': { ok: true, version: 'abc123' },
      '/quizz': { ok: true, version: 'abc123', data: serverThemes },
    });

    await render(<Probe />);

    await waitFor(() => {
      expect(useQuizzStore.getState().quizzQuestions).toHaveLength(1);
    });
    expect(useQuizzStore.getState().quizzForSearch).toHaveLength(1);
    expect(useQuizzStore.getState().quizzForSearch[0]).toContain('securite');
    expect(useQuizzStore.getState().quizz[0].backgroundColor).toBeTruthy();
  });

  it('does not re-download the quizz when the version is unchanged', async () => {
    useQuizzStore.getState().setQuizz(serverThemes, 'abc123');
    mockApi({
      '/quizz/version': { ok: true, version: 'abc123' },
      '/quizz': { ok: true, version: 'abc123', data: serverThemes },
    });

    await render(<Probe />);

    await waitFor(() => {
      expect(apiGet).toHaveBeenCalledWith({ path: '/quizz/version' });
    });
    expect(apiGet).not.toHaveBeenCalledWith({ path: '/quizz' });
  });

  it('keeps the current questions when the API returns an invalid payload', async () => {
    const brokenThemes = [
      {
        ...serverThemes[0],
        questions: [{ ...serverThemes[0].questions[0], scores: [[5, 0]] }],
      },
    ];
    mockApi({
      '/quizz/version': { ok: true, version: 'abc123' },
      '/quizz': { ok: true, version: 'abc123', data: brokenThemes },
    });

    await render(<Probe />);

    await waitFor(() => {
      expect(apiGet).toHaveBeenCalledWith({ path: '/quizz' });
    });
    expect(useQuizzStore.getState().quizz).toHaveLength(withQuestions(bundledThemes).length);
    expect(useQuizzStore.getState().version).toBeNull();
  });

  it('keeps the current questions when the API is unreachable', async () => {
    mockApi({
      '/quizz/version': { ok: false, error: 'network' },
      '/quizz': undefined,
    });

    await render(<Probe />);

    await waitFor(() => {
      expect(apiGet).toHaveBeenCalledWith({ path: '/quizz/version' });
    });
    expect(apiGet).not.toHaveBeenCalledWith({ path: '/quizz' });
    expect(useQuizzStore.getState().quizz).toHaveLength(withQuestions(bundledThemes).length);
  });
});
