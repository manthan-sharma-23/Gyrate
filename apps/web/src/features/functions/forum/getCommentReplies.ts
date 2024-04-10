import { BASE_URL } from "@/utils/config/config";
import { CommentReplyWithUser } from "./replyToComment";

export const getRepliesToComment = async ({
  commentId,
}: {
  commentId: string;
}) => {
  try {
    const response = await fetch(`${BASE_URL}/api/forum/replies/${commentId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data: CommentReplyWithUser[] = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
