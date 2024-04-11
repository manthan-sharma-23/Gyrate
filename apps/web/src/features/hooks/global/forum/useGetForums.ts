import {
  ForumWithUser,
  getForums,
} from "@/features/functions/forum/getAllForums";
import { forumsOrderAtom } from "@/features/store/atom/global/forumsOrder.atom";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export const useGetForums = () => {
  const [forums, setForums] = useState<ForumWithUser[]>([]);
  const [loading, setLoading] = useState(false);
  const orderBy = useRecoilValue(forumsOrderAtom);

  useEffect(() => {
    setLoading(true);
    getForums({ orderBy })
      .then((data) => {
        setLoading(false);
        setForums(data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [orderBy]);

  return { forums, loading };
};
