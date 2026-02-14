import { useEffect, useState, useCallback } from 'react';
import API from '~/services/api';
import type { Candidate } from '~/types/quizz';

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
