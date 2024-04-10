import {  CommentReplies, User } from "@prisma/client";
import { BASE_URL } from "@/utils/config/config";

export interface CommentReplyWithUser extends CommentReplies {
  User: User;
}

export const replyToComment = async (reply: {
  comment: string;
  commentId: string;
  userId: string;
}) => {
  try {
    const response = await fetch(`${BASE_URL}/api/forum/reply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(reply),
    });
    const data:CommentReplyWithUser = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
