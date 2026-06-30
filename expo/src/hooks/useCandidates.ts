import { useEffect, useState } from 'react';
import API from '~/services/api';
import type { Candidate } from '~/types/quizz';

const useCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const fetchCandidates = async () => {
      const data = await API.get({ path: '/answer/candidates' });
      if (active && data?.data) setCandidates(data.data);
      if (active) setIsLoading(false);
    };
    fetchCandidates();
    return () => {
      active = false;
    };
  }, []);

  return { candidates, isLoading };
};

export default useCandidates;
