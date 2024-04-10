import { Comment, User } from "@prisma/client";
import { BASE_URL } from "@/utils/config/config";

export interface CommentWithUser extends Comment {
  User: User;
}

export const commentOnForum = async (forum: {
  comment: string;
  forumId: string;
  userId: string;
}) => {
  try {
    const response = await fetch(`${BASE_URL}/api/forum/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(forum),
    });
    const data: CommentWithUser = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
