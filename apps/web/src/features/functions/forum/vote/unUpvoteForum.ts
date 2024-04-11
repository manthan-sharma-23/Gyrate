import { BASE_URL } from "@/utils/config/config";

export const unUpVoteForum = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/forum/unupvote`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (!response.ok) throw Error();

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
