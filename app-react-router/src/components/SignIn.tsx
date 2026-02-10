import { useState } from 'react';
import useUser from '@app/hooks/useUser';
import API from '@app/services/api';
import QuizzButton from './QuizzButton';

interface SignInProps {
  onSuccess: (user: Record<string, unknown>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGoToSignup: () => void;
  pseudo: string;
  password: string;
}

const SignIn = ({ onSuccess, onChange, onGoToSignup, pseudo, password }: SignInProps) => {
  const { mutate } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const loginRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await API.post({ path: '/user/login', body: { pseudo, password } });
    if (!response?.ok) {
      setIsLoading(false);
      return alert(response.error);
    }
    mutate(response.data);
    setIsLoading(false);
    onSuccess(response.data);
  };

  return (
    <form onSubmit={loginRequest} className="flex w-full flex-col gap-3 rounded-b-lg bg-white p-6">
      <label className="text-sm font-medium">Pseudo</label>
      <input
        type="text" name="pseudo" autoComplete="username" placeholder="Votre pseudo"
        onChange={onChange} value={pseudo}
        className="rounded-md border border-gray-300 px-3 py-2"
      />
      <label className="text-sm font-medium">Mot de passe</label>
      <input
        type="password" name="password" autoComplete="password" placeholder="Votre mot de passe"
        onChange={onChange} value={password}
        className="rounded-md border border-gray-300 px-3 py-2"
      />
      <QuizzButton type="submit" disabled={isLoading}>
        {isLoading ? 'Connexion...' : 'Se connecter'}
      </QuizzButton>
      <button type="button" onClick={onGoToSignup} className="cursor-pointer border-none bg-transparent text-sm underline">
        Pas encore de mot de passe ?
      </button>
    </form>
  );
};

export default SignIn;
