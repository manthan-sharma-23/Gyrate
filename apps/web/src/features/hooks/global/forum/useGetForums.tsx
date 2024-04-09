import {
  ForumWithUser,
  getForums,
} from "@/features/functions/forum/getAllForums";
import { useEffect, useState } from "react";

export const useGetForums = () => {
  const [forums, setForums] = useState<ForumWithUser[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getForums()
      .then((data) => {
        setLoading(false);
        setForums(data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return { forums, loading };
};
