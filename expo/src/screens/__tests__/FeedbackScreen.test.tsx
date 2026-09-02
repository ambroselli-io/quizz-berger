import React from 'react';
import { Alert } from 'react-native';
import { render, screen, userEvent } from '@testing-library/react-native';
import FeedbackScreen from '~/screens/FeedbackScreen';
import useQuizzStore from '~/zustand/quizz';
import useStore from '~/zustand/store';
import API from '~/services/api';
import type { QuizzTheme } from '~/types/quizz';
import type { RootStackParamList } from '~/types/navigation';

jest.mock('~/services/api', () => ({
  __esModule: true,
  default: { get: jest.fn(), post: jest.fn() },
}));

const mockNavigation = { navigate: jest.fn(), goBack: jest.fn(), setOptions: jest.fn() };
let mockRoute: { params: RootStackParamList['Feedback'] };

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

const userAnswers = [
  { userId: 'user-1', themeId: 'theme-2027-police', questionId: 'question-2027-pol-01', answerIndex: 1 },
];

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  (API.get as jest.Mock).mockImplementation(({ path }: { path: string }) =>
    Promise.resolve({ ok: true, data: path === '/answer' ? userAnswers : [] }),
  );
  (API.post as jest.Mock).mockImplementation(({ path }: { path: string }) => {
    if (path === '/user/me') return Promise.resolve({ ok: true, user: { _id: 'user-1', pseudo: 'toto' } });
    return Promise.resolve({ ok: true });
  });
  useStore.setState({ user: { _id: 'user-1', pseudo: 'toto' }, userAnswers });
  useQuizzStore.getState().setQuizz(themes, 'abc123');
});

describe('FeedbackScreen', () => {
  it('sends an opinion about a question with the question attached', async () => {
    mockRoute = { params: { kind: 'question', themeId: 'theme-2027-police', questionId: 'question-2027-pol-01' } };
    await render(<FeedbackScreen />);
    expect(screen.getByText('Faut-il plus de policiers ?')).toBeOnTheScreen();
    expect(mockNavigation.setOptions).toHaveBeenCalledWith({ title: 'Votre avis sur la question' });

    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText(/Ce qui ne va pas/), 'Il manque une réponse nuancée');
    await user.press(screen.getByText('Envoyer mon avis'));

    const feedbackCall = (API.post as jest.Mock).mock.calls.find(([args]) => args.path === '/feedback')?.[0];
    expect(feedbackCall.body.subject).toBe('[App] Avis sur la question question-2027-pol-01');
    expect(feedbackCall.body.text).toContain('De: toto');
    expect(feedbackCall.body.text).toContain('Intitulé: Faut-il plus de policiers ?');
    expect(feedbackCall.body.text).toContain("Réponse de l'utilisateur: Non");
    expect(feedbackCall.body.text).toContain('Il manque une réponse nuancée');
    expect(Alert.alert).toHaveBeenCalledWith('Merci !', expect.any(String));
    expect(mockNavigation.goBack).toHaveBeenCalled();
  });

  it('sends a testimony', async () => {
    mockRoute = { params: { kind: 'testimony' } };
    await render(<FeedbackScreen />);
    expect(mockNavigation.setOptions).toHaveBeenCalledWith({ title: 'Votre témoignage' });

    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText(/Deux ou trois phrases/), "J'ai découvert un candidat proche de moi");
    await user.press(screen.getByText('Envoyer mon témoignage'));

    const feedbackCall = (API.post as jest.Mock).mock.calls.find(([args]) => args.path === '/feedback')?.[0];
    expect(feedbackCall.body.subject).toBe('[App] Témoignage de toto');
    expect(feedbackCall.body.text).toContain("J'ai découvert un candidat proche de moi");
    expect(mockNavigation.goBack).toHaveBeenCalled();
  });

  it('does not send an empty message', async () => {
    mockRoute = { params: { kind: 'testimony' } };
    await render(<FeedbackScreen />);

    await userEvent.setup().press(screen.getByText('Envoyer mon témoignage'));

    expect((API.post as jest.Mock).mock.calls.some(([args]) => args.path === '/feedback')).toBe(false);
    expect(mockNavigation.goBack).not.toHaveBeenCalled();
  });

  it('disables the send button after a successful send', async () => {
    mockRoute = { params: { kind: 'testimony' } };
    await render(<FeedbackScreen />);

    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText(/Deux ou trois phrases/), 'Super quizz');
    const button = screen.getByText('Envoyer mon témoignage');
    await user.press(button);

    expect(Alert.alert).toHaveBeenCalledWith('Merci !', expect.any(String));
    expect(button).toBeDisabled();
  });

  it('keeps the form open when the API fails', async () => {
    mockRoute = { params: { kind: 'testimony' } };
    (API.post as jest.Mock).mockImplementation(({ path }: { path: string }) => {
      if (path === '/user/me') return Promise.resolve({ ok: true, user: { _id: 'user-1', pseudo: 'toto' } });
      return Promise.resolve({ ok: false, error: 'Boom' });
    });
    await render(<FeedbackScreen />);

    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText(/Deux ou trois phrases/), 'Bravo');
    await user.press(screen.getByText('Envoyer mon témoignage'));

    expect(Alert.alert).toHaveBeenCalledWith('Erreur', 'Boom');
    expect(mockNavigation.goBack).not.toHaveBeenCalled();
  });
});
