import { useEffect, useState, useCallback } from 'react';
import API from '@app/services/api';
import type { Candidate } from '@app/types/quizz';

const useFriends = () => {
  const [friends, setFriends] = useState<Candidate[]>([]);

  const fetchFriends = useCallback(async () => {
    const data = await API.get({ path: '/answer/friends' });
    if (data?.data) setFriends(data.data);
  }, []);

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  return { friends, mutateFriends: fetchFriends };
};

export default useFriends;
