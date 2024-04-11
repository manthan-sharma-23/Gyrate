import { BASE_URL } from "@/utils/config/config";
import { userForumWithDetails } from "../../types/interfaces/main";

export const unDownVoteForum = async ({
  forumId,
  userForumId,
}: {
  forumId: string;
  userForumId: string;
}) => {
  try {
    const response = await fetch(`${BASE_URL}/api/forum/undownvote`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ forumId, userForumId }),
    });

    if (!response.ok) throw Error();

    const data: userForumWithDetails = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
