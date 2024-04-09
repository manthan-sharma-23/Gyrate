import { Forum, User } from "@prisma/client";
import { BASE_URL } from "@/utils/config/config";

export const createForum = async (forum: {
  title: string;
  description: string;
}) => {
  try {
    const response = await fetch(`${BASE_URL}/api/forum/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(forum),
    });
    const data: Forum = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
