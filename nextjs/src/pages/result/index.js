import { useRouter } from "next/router";
import { useEffect } from "react";
import useUser from "../../hooks/useUser";
import Result from "./[userPseudo]";

const AuthResult = () => {
  const { user } = useUser();
  const router = useRouter();

  console.log({ user });

  useEffect(() => {
    if (!!user?.pseudo) {
      router.push(`/result/${user?.pseudo}`);
    }
  }, [user?.pseudo]);

  return <Result />;
};

export default AuthResult;
