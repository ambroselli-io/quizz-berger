import { useState } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import useUser from '@app/hooks/useUser';

interface LoginContainerProps {
  onSuccess: () => void;
  title?: string;
  showSignup?: boolean;
  forceSignup?: boolean;
}

const LoginContainer = ({ onSuccess, title, showSignup: initialShowSignup = false, forceSignup = false }: LoginContainerProps) => {
  const { mutate } = useUser();

  const [state, setFullState] = useState({
    showSignup: initialShowSignup,
    pseudo: '',
    password: '',
    passwordConfirm: '',
    isPublic: true,
  });

  const setState = (newState: Partial<typeof state>) => setFullState((old) => ({ ...old, ...newState }));

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });
  };

  const onLogin = (user: Record<string, unknown>) => {
    mutate(user as Parameters<typeof mutate>[0]);
    onSuccess();
  };

  return (
    <>
      {title && <h2 className="mb-10 text-center font-[Merriweather] text-2xl font-bold text-white">{title}</h2>}
      <div className="mx-auto flex w-full max-w-[400px] shrink-0 flex-col items-center rounded-lg bg-gray-200">
        {!forceSignup && (
          <div className="flex w-full shrink-0">
            <button
              className={`flex-1 cursor-pointer rounded-t-lg border-none px-4 py-4 text-base ${!state.showSignup ? 'bg-white text-black' : 'bg-gray-200 text-gray-500'}`}
              onClick={() => setState({ showSignup: false })}
            >
              Se connecter
            </button>
            <button
              className={`flex-1 cursor-pointer rounded-t-lg border-none px-4 py-4 text-base ${state.showSignup ? 'bg-white text-black' : 'bg-gray-200 text-gray-500'}`}
              onClick={() => setState({ showSignup: true })}
            >
              S'inscrire
            </button>
          </div>
        )}
        {!state.showSignup && (
          <SignIn
            onSuccess={onLogin}
            onChange={onChange}
            onGoToSignup={() => setState({ showSignup: true })}
            pseudo={state.pseudo}
            password={state.password}
          />
        )}
        {state.showSignup && (
          <SignUp
            onSuccess={onLogin}
            onChange={onChange}
            pseudo={state.pseudo}
            password={state.password}
            passwordConfirm={state.passwordConfirm}
            isPublic={state.isPublic}
          />
        )}
      </div>
    </>
  );
};

export default LoginContainer;
