import { User } from "@prisma/client";
import { BASE_URL } from "@/utils/config/config";

export const getUserByToken = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/user`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    const data: User = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
