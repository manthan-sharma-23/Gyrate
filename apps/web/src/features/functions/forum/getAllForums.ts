import { Forum, User } from "@prisma/client";
import { BASE_URL } from "@/utils/config/config";

export interface ForumWithUser extends Forum {
  User: User;
  Comments: unknown[];
}

export const getForums = async ({ orderBy }: { orderBy: string }) => {
  try {
    const response = await fetch(`${BASE_URL}/api/forum/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
        orderBy,
      },
    });

    if (!response.ok) throw Error();

    const data: ForumWithUser[] = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
