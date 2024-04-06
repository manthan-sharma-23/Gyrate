import { Request, Response } from "express";
import database from "database";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "src/config/exports";
import { getProfilePicture } from "src/utils/random.image.function";
import { getGithubPat } from "./githubAuthorize.controller";
import { getGithubUser } from "../getGithubUser";

export const SingupUserWithGithub = async (req: Request, res: Response) => {
  try {
    const { code }: { code: string } = req.body;

    const pat = await getGithubPat(code);
    if (pat === null) {
      return res.status(404).json({ message: "Couldn't Authorize Github" });
    }
    const githubUser = await getGithubUser(pat);

    if (githubUser === null) {
      return res.status(404).json({ message: "Couldn't Authorize Github" });
    }

    if (githubUser.login === null || githubUser.login === undefined) {
      return res
        .status(401)
        .json({ message: "Github User Incomplete Credentials" });
    }

    const image = getProfilePicture();

    const fetchUserDatabase = await database.user.findFirst({
      where: {
        username: githubUser.login,
      },
    });

    if (fetchUserDatabase === null) {
      return res.status(404).json({ message: "Couldn't Get Users" });
    } else {
      if (fetchUserDatabase) {
      }
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};
