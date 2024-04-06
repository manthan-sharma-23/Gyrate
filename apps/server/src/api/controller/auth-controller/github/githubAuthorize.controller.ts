import { Request, Response } from "express";
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "src/config/exports";

export const GithubAuthorizePat = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;

    const personal_access_token = await getGithubPat(code);

    return res.json(personal_access_token);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export async function getGithubPat(code: string) {
  try {
    const response = await fetch(
      `https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${code}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) throw Error;

    const data: { access_token: string } = await response.json();

    return data.access_token;
  } catch (error) {
    return null;
  }
}
