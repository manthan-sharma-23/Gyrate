import { BASE_URL } from "@/utils/config/config";
import { userForumWithDetails } from "../../types/interfaces/main";

export const getUserForum = async ({ forumId }: { forumId: string }) => {
  try {
    const response = await fetch(`${BASE_URL}/api/forum/userForum/${forumId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    const data: userForumWithDetails = await response.json();

    return data;
  } catch (error) {
    return null;
  }
};
