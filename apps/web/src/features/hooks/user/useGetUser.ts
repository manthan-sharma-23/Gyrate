import { useState, useEffect } from "react";
import { getUserByToken } from "../../functions/users/getUserByToken";
import { UserAtom } from "../../store/atom/user/user.atom";
import { useRecoilState } from "recoil";

export const useGetUser = () => {
  const [user, setUser] = useRecoilState(UserAtom);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUserByToken()
      .then((data) => {
        console.log(data)
        setLoading(false);
        if (data) setUser(data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return { user, loading };
};
