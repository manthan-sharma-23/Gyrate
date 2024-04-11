import {
  ForumWithComments,
  getForumById,
} from "@/features/functions/forum/getForumById";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const useGetForumById = () => {
  const [forum, setForum] = useState<ForumWithComments | null>(null);
  const [loading, setLoading] = useState(false);
  const { forumId } = useParams();

  useEffect(() => {
    if (forumId) {
      setLoading(true);
      getForumById({ forumId })
        .then((data) => {
          setLoading(false);
          setForum(data);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
    return () => {
      setForum(null);
    };
  }, [forumId]);

  return { forum, loading, setForum };
};
