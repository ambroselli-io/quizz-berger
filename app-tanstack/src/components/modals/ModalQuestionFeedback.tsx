import { useState } from 'react';
import API from '@app/services/api';
import useUser from '@app/hooks/useUser';
import QuizzModal from '../QuizzModal';
import QuizzButton from '../QuizzButton';
import type { QuizzQuestion, QuizzTheme } from '@app/types/quizz';

interface ModalQuestionFeedbackProps {
  isActive: boolean;
  onClose: () => void;
  question: QuizzQuestion;
  theme: QuizzTheme;
  userAnswerIndex?: number;
}

const ModalQuestionFeedback = ({ isActive, onClose, question, theme, userAnswerIndex }: ModalQuestionFeedbackProps) => {
  const { user } = useUser();
  const [state, setState] = useState({ pseudo: user?.pseudo || '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const lines = [
      `De: ${state.pseudo || '(anonyme)'}`,
      `Email: ${state.email || '(non renseigné)'}`,
      `Plateforme: web`,
      `Utilisateur: ${user?._id ?? '(inconnu)'}`,
      `Thème: ${theme.fr}`,
      `Question: ${question._id}`,
      `Intitulé: ${question.fr}`,
      `Réponses proposées: ${question.answers.join(' | ')}`,
      `Réponse de l'utilisateur: ${userAnswerIndex !== undefined ? question.answers[userAnswerIndex] : '(pas encore répondu)'}`,
      '',
      state.message.trim(),
    ];
    const response = await API.post({
      path: '/feedback',
      body: {
        text: lines.join('\n'),
        subject: `[Web] Avis sur la question ${question._id}`,
      },
    });
    setIsLoading(false);
    if (!response.ok) {
      alert(response.error || "Le message n'est pas parti, réessayez dans un instant.");
      return;
    }
    alert('Merci ! Votre message est bien envoyé.');
    setState((prev) => ({ ...prev, message: '' }));
    onClose();
  };

  return (
    <QuizzModal title="Votre avis sur la question" isActive={isActive} onClose={onClose}>
      <p className="mb-3 text-sm text-gray-600">
        Ce formulaire sert uniquement à améliorer le quizz : formulation ambiguë, réponse qui manque, position d'un
        candidat mal résumée.
      </p>
      <p className="mb-4 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900">
        Inutile de nous donner votre opinion politique : elle ne compte pas dans votre résultat. Si vous pensez que
        votre opinion n'est pas bien représentée ici, dites-nous ce que vous auriez attendu !
      </p>
      <div className="mb-4 rounded-lg bg-gray-100 px-3 py-2">
        <p className="text-xs text-gray-500">{theme.fr}</p>
        <p className="mt-1 text-sm font-semibold">{question.fr}</p>
      </div>
      <form onSubmit={onFormSubmit} className="flex flex-col gap-3">
        <label className="text-sm font-medium">Votre message *</label>
        <textarea
          name="message"
          autoComplete="off"
          onChange={onChange}
          value={state.message}
          placeholder="Ce qui ne va pas, ce qui manque, ce que vous proposez…"
          required
          className="min-h-[100px] rounded-md border border-gray-300 px-3 py-2"
        />
        <label className="text-sm font-medium">Nom / pseudo</label>
        <input
          type="text"
          name="pseudo"
          autoComplete="name"
          placeholder="Votre nom ou pseudo"
          onChange={onChange}
          value={state.pseudo}
          className="rounded-md border border-gray-300 px-3 py-2"
        />
        <label className="text-sm font-medium">Email (si vous souhaitez une réponse)</label>
        <input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Votre email"
          onChange={onChange}
          value={state.email}
          className="rounded-md border border-gray-300 px-3 py-2"
        />
        <div className="mt-2 flex justify-center">
          <QuizzButton type="submit" disabled={isLoading || !state.message.trim()}>
            {isLoading ? 'Envoi…' : 'Envoyer mon avis'}
          </QuizzButton>
        </div>
      </form>
    </QuizzModal>
  );
};

export default ModalQuestionFeedback;
