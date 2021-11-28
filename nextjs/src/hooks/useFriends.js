import useSWR from "swr";
import API from "../services/api";

const useFriends = () => {
  const { data, mutate } = useSWR(API.getUrl("/answer/friends"));
  const friends = data?.data || [];
  return { friends, mutateFriends: mutate };
};

export default useFriends;
