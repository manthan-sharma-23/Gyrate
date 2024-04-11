import { getUserForum } from "@/features/functions/forum/vote/getUserForum";
import { userForumWithDetails } from "@/features/functions/types/interfaces/main";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const useGetUserForum = () => {
  const [userForum, setUserForum] = useState<userForumWithDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const { forumId } = useParams();

  useEffect(() => {
    if (forumId) {
      setLoading(true);
      getUserForum({ forumId })
        .then((data) => {
          if (data) setUserForum(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }

    return () => {
      setUserForum(null);
    };
  }, [forumId]);

  return { userForum, setUserForum, loading, setLoading };
};
