import { Request, Response } from "express";
import database from "database";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "src/config/exports";
import { getProfilePicture } from "src/utils/random.image.function";
import { getGithubPat } from "./githubAuthorize.controller";
import { getGithubUser } from "../getGithubUser";

export const SinginUserWithGithub = async (req: Request, res: Response) => {
  try {
    const { code }: { code: string } = req.body;

    const pat = await getGithubPat(code);
    
        if (pat === null ) {
          return res.status(404).json({ message: "Couldn't Authorize Github" });
        }
    const githubUser = await getGithubUser(pat);
    if (githubUser === null ) {
      return res.status(404).json({ message: "Couldn't Authorize Github" });
    }

    
  } catch (error) {
    return res.status(500).send(error);
  }
};
