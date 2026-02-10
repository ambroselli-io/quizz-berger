import useSWR from "swr";
import API from "../services/api";

const useCandidates = () => {
  const { data, mutate } = useSWR(API.getUrl("/answer/candidates"));
  const candidates = data?.data || [];
  return { candidates };
};

export default useCandidates;
