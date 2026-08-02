import React from 'react';
import { act, render, screen, userEvent } from '@testing-library/react-native';
import ThemesScreen from '~/screens/ThemesScreen';
import useQuizzStore from '~/zustand/quizz';
import useStore from '~/zustand/store';
import API from '~/services/api';
import type { QuizzTheme } from '~/types/quizz';

jest.mock('~/services/api', () => ({
  __esModule: true,
  default: { get: jest.fn(), post: jest.fn() },
}));

const mockNavigation = {
  navigate: jest.fn(),
  setParams: jest.fn(),
  popTo: jest.fn(),
  setOptions: jest.fn(),
};

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => mockNavigation,
  useRoute: () => ({ params: undefined }),
}));

const makeQuestion = (id: string, fr: string) => ({
  _id: id,
  fr,
  answers: ['Oui', 'Non'],
  scores: [
    [5, 0],
    [0, 5],
  ],
});

const serverThemes: QuizzTheme[] = [
  {
    _id: 'theme-2027-police',
    fr: 'Police et sécurité',
    questions: [makeQuestion('question-2027-pol-01', 'Faut-il plus de policiers ?')],
  },
  {
    _id: 'theme-2027-sante',
    fr: 'Santé',
    questions: [makeQuestion('question-2027-san-01', "Faut-il rouvrir des lits d'hôpital ?")],
  },
  {
    _id: 'theme-2027-nouveau',
    fr: 'Écologie',
    questions: [makeQuestion('question-2027-eco-01', 'Faut-il sortir du nucléaire ?')],
  },
];

let savedAnswers: Array<{ userId: string; themeId: string; questionId: string; answerIndex: number }> = [];

beforeEach(() => {
  jest.clearAllMocks();
  savedAnswers = [];
  (API.get as jest.Mock).mockImplementation(({ path }: { path: string }) =>
    Promise.resolve({ ok: true, data: path === '/answer' ? savedAnswers : [] }),
  );
  (API.post as jest.Mock).mockImplementation(({ path }: { path: string }) => {
    if (path === '/user/me') return Promise.resolve({ ok: true, user: { _id: 'user-1', pseudo: 'toto' } });
    return Promise.resolve({ ok: true, data: { _id: 'user-1' } });
  });
  useStore.setState({ user: { _id: 'user-1', pseudo: 'toto' }, userAnswers: [] });
  useQuizzStore.getState().setQuizz(serverThemes, 'abc123');
});

describe('ThemesScreen', () => {
  it('lists every theme served by the API', async () => {
    await render(<ThemesScreen />);

    expect(screen.getByText('Police et sécurité')).toBeOnTheScreen();
    expect(screen.getByText('Santé')).toBeOnTheScreen();
    expect(screen.getByText('Écologie')).toBeOnTheScreen();
  });

  it('picks up a theme added to the API after this build shipped', async () => {
    await render(<ThemesScreen />);
    expect(screen.queryByText('Défense')).not.toBeOnTheScreen();

    await act(() => {
      useQuizzStore.getState().setQuizz(
        [
          ...serverThemes,
          {
            _id: 'theme-2027-defense',
            fr: 'Défense',
            questions: [makeQuestion('question-2027-def-01', 'Faut-il augmenter le budget ?')],
          },
        ],
        'def456',
      );
    });

    expect(await screen.findByText('Défense')).toBeOnTheScreen();
  });

  it('filters themes by keyword, ignoring accents', async () => {
    await render(<ThemesScreen />);

    await userEvent.setup().type(screen.getByPlaceholderText('Recherchez par mot-clé'), 'securite');

    expect(screen.getByText('Police et sécurité')).toBeOnTheScreen();
    expect(screen.queryByText('Santé')).not.toBeOnTheScreen();
  });

  it('finds a theme by the wording of one of its questions', async () => {
    await render(<ThemesScreen />);

    await userEvent.setup().type(screen.getByPlaceholderText('Recherchez par mot-clé'), 'nucleaire');

    expect(screen.getByText('Écologie')).toBeOnTheScreen();
    expect(screen.queryByText('Police et sécurité')).not.toBeOnTheScreen();
  });

  it('opens a theme on its first question', async () => {
    await render(<ThemesScreen />);

    await userEvent.setup().press(screen.getByText('Santé'));

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Question', {
      themeId: 'theme-2027-sante',
      questionId: 'question-2027-san-01',
    });
  });

  it('sends the user to the results once they have answered something', async () => {
    savedAnswers = [
      { userId: 'user-1', themeId: 'theme-2027-sante', questionId: 'question-2027-san-01', answerIndex: 0 },
    ];
    await render(<ThemesScreen />);

    await userEvent.setup().press(await screen.findByText('Voir les résultats'));

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Result', undefined);
  });

  it('does not offer results before any question is answered', async () => {
    await render(<ThemesScreen />);

    await userEvent.setup().press(screen.getByText('Choisissez votre 1er thème'));

    expect(mockNavigation.navigate).not.toHaveBeenCalledWith('Result', undefined);
  });
});
