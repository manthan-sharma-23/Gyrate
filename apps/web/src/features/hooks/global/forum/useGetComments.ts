import { CommentWithUser } from "@/features/functions/forum/createComment";
import { getForumComments } from "@/features/functions/forum/getForumComments";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const useGetComments = () => {
  const [comments, setComments] = useState<CommentWithUser[]>([]);
  const [loading, setLoading] = useState(false);
  const { forumId } = useParams();

  useEffect(() => {
    if (forumId) {
      setLoading(false);
      getForumComments({ forumId })
        .then((data) => {
          if (data) setComments(data);

          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }

    return () => {
      setComments([]);
    };
  }, [forumId]);

  return { comments, setComments, loading, setLoading };
};
