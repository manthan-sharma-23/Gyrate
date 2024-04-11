import { BASE_URL } from "@/utils/config/config";
import { userForumWithDetails } from "../../types/interfaces/main";

export const bookMarkForum = async ({ forumId }: { forumId: string }) => {
  try {
    const response = await fetch(`${BASE_URL}/api/forum/bookMark`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ forumId }),
    });

    if (!response.ok) throw Error();

    const data: userForumWithDetails = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
