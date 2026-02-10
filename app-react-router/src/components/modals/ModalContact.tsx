import { useState } from 'react';
import API from '@app/services/api';
import useUser from '@app/hooks/useUser';
import QuizzModal from '../QuizzModal';
import QuizzButton from '../QuizzButton';

interface ModalContactProps {
  isActive: boolean;
  onClose: () => void;
}

const ModalContact = ({ isActive, onClose }: ModalContactProps) => {
  const { user } = useUser();

  const [state, setState] = useState({ pseudo: user?.pseudo || '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const text = `De: ${state.pseudo}\nEmail: ${state.email}\nMessage: ${state.message}\nURL: ${window.location.pathname}\nuser: ${JSON.stringify(user, null, 2)}`;
    const response = await API.post({
      path: '/feedback',
      body: { text, subject: `Une requête du Quizz du Berger par ${state.pseudo}` },
    });
    if (!response.ok) {
      setIsLoading(false);
      return alert(response.error);
    }
    alert('Message envoyé !');
    setIsLoading(false);
    onClose();
  };

  return (
    <QuizzModal title="Nous contacter" isActive={isActive} onClose={onClose}>
      <form onSubmit={onFormSubmit} className="flex flex-col gap-3">
        <label className="text-sm font-medium">Nom/pseudo *</label>
        <input
          type="text" name="pseudo" autoComplete="name" placeholder="Votre nom / pseudo"
          onChange={onChange} value={state.pseudo} required
          className="rounded-md border border-gray-300 px-3 py-2"
        />
        <label className="text-sm font-medium">Email</label>
        <input
          type="email" name="email" autoComplete="email" placeholder="Votre email"
          onChange={onChange} value={state.email}
          className="rounded-md border border-gray-300 px-3 py-2"
        />
        <label className="text-sm font-medium">Votre message *</label>
        <textarea
          name="message" autoComplete="off" onChange={onChange} value={state.message}
          placeholder="Un commentaire ? Une suggestion ?" required
          className="min-h-[100px] rounded-md border border-gray-300 px-3 py-2"
        />
        <div className="flex justify-center">
          <QuizzButton type="submit" disabled={isLoading}>
            {isLoading ? 'Envoi...' : 'Envoyer'}
          </QuizzButton>
        </div>
      </form>
    </QuizzModal>
  );
};

export default ModalContact;
