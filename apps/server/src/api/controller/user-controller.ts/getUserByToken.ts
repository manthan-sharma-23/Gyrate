import { Request, Response } from "express";
import database from "database";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "src/config/exports";
import { ProtectedRequest } from "src/utils/interfaces/express";

export const getUserByToken = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user;

    const User = await database.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });

    return res.json(User);
  } catch (error) {
    return res.status(500).send(error);
  }
};
