import React from 'react';
import { render, screen, userEvent, waitFor } from '@testing-library/react-native';
import * as StoreReview from 'expo-store-review';
import QuestionScreen, { FEEDBACK_HINT_SEEN_KEY } from '~/screens/QuestionScreen';
import storage from '~/utils/storage';
import { REVIEW_REQUESTED_KEY } from '~/utils/appReview';
import useQuizzStore from '~/zustand/quizz';
import useStore from '~/zustand/store';
import { bundledThemes } from '~/utils/quizz';
import API from '~/services/api';
import type { QuizzTheme } from '~/types/quizz';

jest.mock('~/services/api', () => ({
  __esModule: true,
  default: { get: jest.fn(), post: jest.fn() },
}));

type StoredAnswer = { userId: string; themeId: string; questionId: string; answerIndex: number };

const mockNavigation = {
  navigate: jest.fn(),
  setParams: jest.fn(),
  popTo: jest.fn(),
  setOptions: jest.fn(),
};
let mockRoute: { params: { themeId: string; questionId: string } };

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => mockNavigation,
  useRoute: () => mockRoute,
}));

const NEW_QUESTION_ID = 'question-2027-pol-99';

// What the API serves after a question was added post-release.
const serverThemes: QuizzTheme[] = [
  {
    _id: 'theme-2027-police',
    fr: 'Police et sécurité',
    questions: [
      {
        _id: 'question-2027-pol-01',
        fr: 'Faut-il plus de policiers ?',
        answers: ['Oui', 'Non'],
        scores: [
          [5, 0],
          [0, 5],
        ],
      },
      {
        _id: NEW_QUESTION_ID,
        fr: 'Comment répondre aux nuisances du quotidien ?',
        answers: ['Plus de sanctions', 'Plus de prévention', "Ça ne m'intéresse pas"],
        scores: [
          [5, 0, 0],
          [0, 5, 0],
          [0, 0, 0],
        ],
      },
    ],
  },
];

// Answers the API reports for the logged-in user; screens refetch them on mount.
let savedAnswers: StoredAnswer[] = [];

beforeEach(() => {
  jest.clearAllMocks();
  savedAnswers = [];
  (API.get as jest.Mock).mockImplementation(({ path }: { path: string }) =>
    Promise.resolve({ ok: true, data: path === '/answer' ? savedAnswers : [] }),
  );
  (API.post as jest.Mock).mockImplementation(({ path, body }: { path: string; body?: StoredAnswer }) => {
    if (path === '/user/me') return Promise.resolve({ ok: true, user: { _id: 'user-1', pseudo: 'toto' } });
    return Promise.resolve({ ok: true, data: body });
  });
  useStore.setState({ user: { _id: 'user-1', pseudo: 'toto' }, userAnswers: [] });
  useQuizzStore.getState().setQuizz(bundledThemes, null);
  storage.delete(FEEDBACK_HINT_SEEN_KEY);
  storage.delete(REVIEW_REQUESTED_KEY);
  mockRoute = { params: { themeId: 'theme-2027-police', questionId: 'question-2027-pol-01' } };
});

describe('QuestionScreen', () => {
  beforeEach(() => {
    useQuizzStore.getState().setQuizz(serverThemes, 'abc123');
  });

  it('shows the question and all of its answers', async () => {
    await render(<QuestionScreen />);

    expect(screen.getByText('Faut-il plus de policiers ?')).toBeOnTheScreen();
    expect(screen.getByText('Oui')).toBeOnTheScreen();
    expect(screen.getByText('Non')).toBeOnTheScreen();
    expect(screen.getByText('Police et sécurité')).toBeOnTheScreen();
  });

  it('renders a question that was added to the API after this build shipped', async () => {
    mockRoute = { params: { themeId: 'theme-2027-police', questionId: NEW_QUESTION_ID } };

    await render(<QuestionScreen />);

    expect(screen.getByText('Comment répondre aux nuisances du quotidien ?')).toBeOnTheScreen();
    expect(screen.getByText('Plus de prévention')).toBeOnTheScreen();
  });

  it('saves the answer and moves to the next question', async () => {
    await render(<QuestionScreen />);

    await userEvent.setup().press(screen.getByText('Non'));

    expect(API.post).toHaveBeenCalledWith({
      path: '/answer',
      body: {
        userId: 'user-1',
        themeId: 'theme-2027-police',
        questionId: 'question-2027-pol-01',
        answerIndex: 1,
      },
    });
    expect(mockNavigation.setParams).toHaveBeenCalledWith({
      themeId: 'theme-2027-police',
      questionId: NEW_QUESTION_ID,
    });
  });

  it('goes back to the themes list after the last question', async () => {
    mockRoute = { params: { themeId: 'theme-2027-police', questionId: NEW_QUESTION_ID } };
    await render(<QuestionScreen />);

    await userEvent.setup().press(screen.getByText('Plus de sanctions'));

    expect(mockNavigation.popTo).toHaveBeenCalledWith('Themes');
  });

  it('pre-selects the answer the user already gave', async () => {
    savedAnswers = [
      {
        userId: 'user-1',
        themeId: 'theme-2027-police',
        questionId: 'question-2027-pol-01',
        answerIndex: 1,
      },
    ];

    await render(<QuestionScreen />);

    expect(await screen.findByText('Non')).toHaveStyle({ color: '#ffffff' });
    expect(screen.getByText('Oui')).toHaveStyle({ color: '#000000' });
  });

  it('renders nothing rather than crashing when the question no longer exists', async () => {
    mockRoute = { params: { themeId: 'theme-2027-police', questionId: 'question-removed' } };

    await render(<QuestionScreen />);

    expect(screen.queryByText('Faut-il plus de policiers ?')).not.toBeOnTheScreen();
  });

  describe('feedback on a question', () => {
    const HINT = /donner votre avis sur chaque question/;

    it('links every question to the feedback form', async () => {
      await render(<QuestionScreen />);

      await userEvent.setup().press(screen.getByText('Un avis sur cette question ?'));

      expect(mockNavigation.navigate).toHaveBeenCalledWith('Feedback', {
        kind: 'question',
        themeId: 'theme-2027-police',
        questionId: 'question-2027-pol-01',
      });
    });

    it('does not explain the feedback link on the first question', async () => {
      await render(<QuestionScreen />);

      expect(screen.queryByText(HINT)).not.toBeOnTheScreen();
    });

    it('explains the feedback link on the second question, once per install', async () => {
      mockRoute = { params: { themeId: 'theme-2027-police', questionId: NEW_QUESTION_ID } };
      const first = await render(<QuestionScreen />);
      expect(screen.getByText(HINT)).toBeOnTheScreen();
      await first.unmount();

      await render(<QuestionScreen />);
      expect(screen.queryByText(HINT)).not.toBeOnTheScreen();
    });
  });

  describe('app store review', () => {
    it('asks for a review once the first theme is fully answered', async () => {
      (StoreReview.hasAction as jest.Mock).mockResolvedValue(true);
      savedAnswers = [
        { userId: 'user-1', themeId: 'theme-2027-police', questionId: 'question-2027-pol-01', answerIndex: 0 },
      ];
      mockRoute = { params: { themeId: 'theme-2027-police', questionId: NEW_QUESTION_ID } };
      await render(<QuestionScreen />);
      await screen.findByText('Plus de sanctions');

      await userEvent.setup().press(screen.getByText('Plus de sanctions'));

      await waitFor(() => expect(StoreReview.requestReview).toHaveBeenCalledTimes(1), { timeout: 3000 });
      expect(storage.getString(REVIEW_REQUESTED_KEY)).toBe('1');
    });

    it('does not ask while the theme still has unanswered questions', async () => {
      (StoreReview.hasAction as jest.Mock).mockResolvedValue(true);
      mockRoute = { params: { themeId: 'theme-2027-police', questionId: NEW_QUESTION_ID } };
      await render(<QuestionScreen />);

      await userEvent.setup().press(screen.getByText('Plus de sanctions'));

      await new Promise((resolve) => setTimeout(resolve, 1000));
      expect(StoreReview.requestReview).not.toHaveBeenCalled();
    });

    it('never asks twice', async () => {
      (StoreReview.hasAction as jest.Mock).mockResolvedValue(true);
      storage.set(REVIEW_REQUESTED_KEY, '1');
      savedAnswers = [
        { userId: 'user-1', themeId: 'theme-2027-police', questionId: 'question-2027-pol-01', answerIndex: 0 },
      ];
      mockRoute = { params: { themeId: 'theme-2027-police', questionId: NEW_QUESTION_ID } };
      await render(<QuestionScreen />);
      await screen.findByText('Plus de sanctions');

      await userEvent.setup().press(screen.getByText('Plus de sanctions'));

      await new Promise((resolve) => setTimeout(resolve, 1000));
      expect(StoreReview.requestReview).not.toHaveBeenCalled();
    });
  });
});
