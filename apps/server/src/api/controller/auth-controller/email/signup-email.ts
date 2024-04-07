import { Request, Response } from "express";
import database from "database";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "src/config/exports";
import { getProfilePicture } from "src/utils/random.image.function";

export const SingupUserWithEmail = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;

    const findUser = await database.user.findUnique({
      where: {
        email,
      },
    });

    if (findUser) {
      if (findUser.provider === "github") {
        return res
          .status(401)
          .json({ message: "User Already Signed up via github" });
      } else {
        return res
          .status(401)
          .json({ message: "User with same email already exists" });
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const image = getProfilePicture();

    const createUser = await database.user.create({
      data: {
        email,
        name,
        password: hash,
        image,
      },
    });

    const token = jwt.sign({ userId: createUser.id }, JWT_SECRET as string);

    return res.status(200).json({ user: createUser, token });
  } catch (error) {
    return res.status(500).send(error);
  }
};
