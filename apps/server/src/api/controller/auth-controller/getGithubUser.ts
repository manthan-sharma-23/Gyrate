import { User } from "@prisma/client";
import { GitHubProfile } from "src/utils/interfaces/github";

export const getGithubUser = async (pat: string) => {
  try {
    const response = await fetch("https://api.github.com/user", {
      method: "GET",
      headers: {
        Authorization: "token " + pat,
      },
    });

    if (!response.ok) throw Error;

    const data: GitHubProfile = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
