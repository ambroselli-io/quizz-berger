import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useUser from '@app/hooks/useUser';
import Result from './Result';

export default function ResultIndex() {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.pseudo) {
      navigate(`/result/${user.pseudo}`, { replace: true });
    }
  }, [user?.pseudo, navigate]);

  return <Result />;
}
