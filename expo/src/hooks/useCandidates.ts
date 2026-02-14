import { useEffect, useState } from 'react';
import API from '~/services/api';
import type { Candidate } from '~/types/quizz';

const useCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      const data = await API.get({ path: '/answer/candidates' });
      if (data?.data) setCandidates(data.data);
    };
    fetchCandidates();
  }, []);

  return { candidates };
};

export default useCandidates;
