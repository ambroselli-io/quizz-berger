import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import ResultScreen, { TESTIMONY_ASKED_KEY } from '~/screens/ResultScreen';
import useQuizzStore from '~/zustand/quizz';
import useStore from '~/zustand/store';
import storage from '~/utils/storage';
import API from '~/services/api';
import type { QuizzTheme } from '~/types/quizz';

jest.mock('~/services/api', () => ({
  __esModule: true,
  default: { get: jest.fn(), post: jest.fn(), put: jest.fn() },
}));

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

const TESTIMONY = 'Un mot sur le Quizz ?';

beforeEach(() => {
  jest.clearAllMocks();
  storage.delete(TESTIMONY_ASKED_KEY);
  mockRoute = { params: undefined };
  (API.get as jest.Mock).mockImplementation(({ path }: { path: string }) => {
    if (path === '/answer') return Promise.resolve({ ok: true, data: answers });
    if (path === '/answer/candidates') return Promise.resolve({ ok: true, data: candidates });
    if (path === '/user/quelqun') return Promise.resolve({ ok: true, data: { pseudo: 'quelqun', isPublic: true } });
    if (path === '/answer/quelqun') return Promise.resolve({ ok: true, data: answers });
    return Promise.resolve({ ok: true, data: [] });
  });
  (API.post as jest.Mock).mockResolvedValue({ ok: true, user: { _id: 'user-1', pseudo: 'toto' } });
  useStore.setState({ user: { _id: 'user-1', pseudo: 'toto' }, userAnswers: answers, hiddenCandidates: [] });
  useQuizzStore.getState().setQuizz(themes, 'abc123');
});

describe('ResultScreen testimony', () => {
  it('asks for a testimony on the first visit and opens the form', async () => {
    await render(<ResultScreen />);

    expect(await screen.findByText(TESTIMONY)).toBeOnTheScreen();
    await userEvent.setup().press(screen.getByText('Laisser un témoignage'));

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Feedback', { kind: 'testimony' });
  });

  it('can be dismissed and never comes back', async () => {
    const first = await render(<ResultScreen />);
    await screen.findByText(TESTIMONY);

    await userEvent.setup().press(screen.getByText('Non merci'));
    expect(screen.queryByText(TESTIMONY)).not.toBeOnTheScreen();
    await first.unmount();

    await render(<ResultScreen />);
    await screen.findByText('Thème par thème');
    expect(screen.queryByText(TESTIMONY)).not.toBeOnTheScreen();
  });

  it("does not ask on someone else's public results", async () => {
    mockRoute = { params: { userPseudo: 'quelqun' } };
    await render(<ResultScreen />);
    await screen.findByText('Thème par thème');

    expect(screen.queryByText(TESTIMONY)).not.toBeOnTheScreen();
    expect(storage.getString(TESTIMONY_ASKED_KEY)).toBeUndefined();
  });
});
