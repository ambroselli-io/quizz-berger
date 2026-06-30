import { useNavigate } from '@app/lib/router';
import LoginContainer from '@app/components/LoginContainer';
import Footer from '@app/components/Footer';

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex min-h-[calc(100vh-80px)] shrink-0 flex-col items-center justify-center bg-quizz-dark px-5 py-10 max-lg:min-h-[calc(100vh-60px)] max-lg:px-2.5">
        <LoginContainer onSuccess={() => navigate('/themes')} title="Connectez-vous" />
      </div>
      <Footer />
    </>
  );
}
