import useSWR from "swr";
import API from "../services/api";

const useUserAnswers = () => {
  const { data, mutate } = useSWR(API.getUrl("/answer"));
  const userAnswers = data?.data || [];

  const setAnswer = async (newAnswer) => {
    mutate(async (oldData) => {
      const answers = oldData?.data || [];
      const response = await API.postWithCreds({ path: "/answer", body: newAnswer });
      if (response.ok) return { data: [...answers, response.data], ok: true };
      return { data: answers, ok: true };
    });
  };

  return { userAnswers, setAnswer };
};

export default useUserAnswers;
