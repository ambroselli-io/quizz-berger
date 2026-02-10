import { useState } from 'react';
import useUser from '@app/hooks/useUser';
import API from '@app/services/api';
import QuizzButton from './QuizzButton';

interface SignUpProps {
  onSuccess: (user: Record<string, unknown>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  pseudo: string;
  password: string;
  passwordConfirm: string;
  isPublic: boolean;
}

const SignUp = ({ onSuccess, onChange, pseudo, password, passwordConfirm, isPublic }: SignUpProps) => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const signupRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    let response;
    if (user?._id) {
      response = await API.put({ path: '/user', body: { pseudo, password, passwordConfirm, isPublic } });
    } else {
      response = await API.post({ path: '/user/signup', body: { pseudo, password, passwordConfirm, isPublic } });
    }
    if (!response.ok) {
      setIsLoading(false);
      return alert(response.error);
    }
    onSuccess(response.data);
  };

  return (
    <form onSubmit={signupRequest} className="flex w-full flex-col gap-3 rounded-b-lg bg-white p-6">
      <label className="text-sm font-medium">Pseudo</label>
      <input
        type="text" name="pseudo" autoComplete="username" placeholder="Votre pseudo"
        onChange={onChange} value={pseudo}
        className="rounded-md border border-gray-300 px-3 py-2"
      />
      <label className="text-sm font-medium">Mot de passe</label>
      <input
        type="password" name="password" autoComplete="new-password" placeholder="Votre mot de passe"
        onChange={onChange} value={password}
        className="rounded-md border border-gray-300 px-3 py-2"
      />
      <label className="text-sm font-medium">Confirmation du mot de passe</label>
      <input
        type="password" name="passwordConfirm" autoComplete="new-password" placeholder="Confirmez votre mot de passe"
        onChange={onChange} value={passwordConfirm}
        className="rounded-md border border-gray-300 px-3 py-2"
      />
      <div className="mb-2 text-sm">
        <input type="checkbox" id="isPublic" name="isPublic" onChange={onChange} checked={isPublic} />
        <label className="ml-2.5" htmlFor="isPublic">
          Permettre le partage à mes amis, si je leur transmet mon pseudo
        </label>
      </div>
      <QuizzButton type="submit" disabled={isLoading}>
        {isLoading ? 'Inscription...' : "S'inscrire"}
      </QuizzButton>
    </form>
  );
};

export default SignUp;
