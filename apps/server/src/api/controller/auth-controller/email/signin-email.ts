import { Request, Response } from "express";
import database from "database";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "src/config/exports";

export const SignInWithEmail = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const findUser = await database.user.findUnique({
      where: {
        username,
      },
    });

    if (findUser === null) throw Error("User doesn't exists");

    if (findUser.provider === "github") {
      return res.status(401).json({ message: "Please login with github" });
    }

    const compare = await bcrypt.compare(password, findUser.password!);

    if (compare) {
      const token = jwt.sign({ userId: findUser.id }, JWT_SECRET as string);

      return res.status(200).json({ user: findUser, token });
    } else {
      throw Error("Please fill correct credentials");
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};
