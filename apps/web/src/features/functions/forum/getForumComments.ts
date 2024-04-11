import { BASE_URL } from "@/utils/config/config";
import { CommentWithUser } from "./createComment";

export const getForumComments = async ({ forumId }: { forumId: string }) => {
  try {

    const response = await fetch(`${BASE_URL}/api/forum/${forumId}/comments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",

        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data: CommentWithUser[] = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
