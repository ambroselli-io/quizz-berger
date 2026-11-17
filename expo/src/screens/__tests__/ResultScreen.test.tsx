import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import ResultScreen from '~/screens/ResultScreen';
import { QUIZZ_FEEDBACK_STORAGE_KEY } from '~/components/result/QuizzFeedback';
import useQuizzStore from '~/zustand/quizz';
import useStore from '~/zustand/store';
import storage from '~/utils/storage';
import API from '~/services/api';
import type { QuizzTheme } from '~/types/quizz';

jest.mock('~/services/api', () => ({
  __esModule: true,
  default: { get: jest.fn(), post: jest.fn(), put: jest.fn() },
}));

jest.mock('@expo/vector-icons/Ionicons', () => () => null);

const mockNavigation = { navigate: jest.fn(), goBack: jest.fn(), setOptions: jest.fn() };
let mockRoute: { params: { userPseudo?: string } | undefined };

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => mockNavigation,
  useRoute: () => mockRoute,
}));

const themes: QuizzTheme[] = [
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
    ],
  },
];

const answers = [{ userId: 'user-1', themeId: 'theme-2027-police', questionId: 'question-2027-pol-01', answerIndex: 1 }];

const candidates = [
  {
    _id: 'cand-1',
    pseudo: 'Candidat Un',
    picture: '',
    color: '#ff0000',
    answers: [{ userId: 'cand-1', themeId: 'theme-2027-police', questionId: 'question-2027-pol-01', answerIndex: 1 }],
  },
];

const FEEDBACK = 'Ce quiz vous a plu\u00a0?';

beforeEach(() => {
  jest.clearAllMocks();
  storage.delete(QUIZZ_FEEDBACK_STORAGE_KEY);
  mockRoute = { params: undefined };
  (API.get as jest.Mock).mockImplementation(({ path }: { path: string }) => {
    if (path === '/answer') return Promise.resolve({ ok: true, data: answers });
    if (path === '/answer/candidates') return Promise.resolve({ ok: true, data: candidates });
    if (path === '/user/quelqun') return Promise.resolve({ ok: true, data: { pseudo: 'quelqun', isPublic: true } });
    if (path === '/answer/quelqun') return Promise.resolve({ ok: true, data: answers });
    return Promise.resolve({ ok: true, data: [] });
  });
  (API.post as jest.Mock).mockImplementation(({ path }: { path: string }) =>
    Promise.resolve(path === '/quizz-feedback' ? { ok: true, data: { id: 'fb-1' } } : { ok: true }),
  );
  useStore.setState({ user: { _id: 'user-1', pseudo: 'toto' }, userAnswers: answers, hiddenCandidates: [] });
  useQuizzStore.getState().setQuizz(themes, 'abc123');
});

describe('ResultScreen feedback', () => {
  it('saves the rating on the first tap, then offers a donation once sent', async () => {
    await render(<ResultScreen />);
    const user = userEvent.setup();

    expect((await screen.findAllByText(FEEDBACK)).length).toBeGreaterThan(0);
    await user.press(screen.getAllByText('Plutôt oui')[0]);
    expect(API.post).toHaveBeenCalledWith({ path: '/quizz-feedback', body: { rating: 3, answersCount: 1 } });

    await user.press(screen.getAllByText('Envoyer mon avis')[0]);
    expect((await screen.findAllByText('Faire un don')).length).toBeGreaterThan(0);
    expect(JSON.parse(storage.getString(QUIZZ_FEEDBACK_STORAGE_KEY)!)).toMatchObject({ rating: 3, sent: true });
  });

  it('asks for an email before sending a comment', async () => {
    await render(<ResultScreen />);
    const user = userEvent.setup();

    await user.press((await screen.findAllByText('Mitigé'))[0]);
    await user.type(screen.getAllByPlaceholderText('Dites-nous en plus\u00a0!')[0], 'Trop long');
    await user.press(screen.getAllByText('Envoyer mon avis')[0]);

    expect(await screen.findByPlaceholderText('vous@exemple.fr')).toBeOnTheScreen();
  });

  it("does not ask on someone else's public results", async () => {
    mockRoute = { params: { userPseudo: 'quelqun' } };
    await render(<ResultScreen />);
    await screen.findByText('Thème par thème');

    expect(screen.queryByText(FEEDBACK)).not.toBeOnTheScreen();
  });
});

describe('ResultScreen ranking', () => {
  it('lists the candidates with their percentage', async () => {
    await render(<ResultScreen />);

    expect(await screen.findByText('Votre classement général')).toBeOnTheScreen();
    expect(screen.getAllByText('Candidat Un').length).toBeGreaterThan(0);
    expect(screen.getAllByText('100%').length).toBeGreaterThan(0);
  });
});

describe('ResultScreen questions importantes', () => {
  it('explains how to star questions when none is starred', async () => {
    await render(<ResultScreen />);

    expect(await screen.findByText(/Questions importantes pour moi/)).toBeOnTheScreen();
    expect(screen.getByText(/Marquer comme importante pour moi/)).toBeOnTheScreen();
  });

  it('shows a podium over the starred questions only', async () => {
    useStore.setState({ userAnswers: [{ ...answers[0], isImportant: true }] });
    (API.get as jest.Mock).mockImplementation(({ path }: { path: string }) => {
      if (path === '/answer') return Promise.resolve({ ok: true, data: [{ ...answers[0], isImportant: true }] });
      if (path === '/answer/candidates') return Promise.resolve({ ok: true, data: candidates });
      return Promise.resolve({ ok: true, data: [] });
    });

    await render(<ResultScreen />);

    expect(
      await screen.findByText('Résultats calculés uniquement sur la question que vous avez marquée comme importante.'),
    ).toBeOnTheScreen();
  });
});
