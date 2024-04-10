import { Comment, Forum, User } from "@prisma/client";
import { BASE_URL } from "@/utils/config/config";
import { CommentWithUser } from "./createComment";

export interface ForumWithComments extends Forum {
  User: User;
  Comments: CommentWithUser[];
}

export const getForumById = async ({ forumId }: { forumId: string }) => {
  try {
    const response = await fetch(`${BASE_URL}/api/forum/${forumId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (!response.ok) throw Error();

    const data: ForumWithComments = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
