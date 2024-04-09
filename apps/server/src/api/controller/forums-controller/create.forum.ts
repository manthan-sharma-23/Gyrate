import { Response } from "express";
import { ProtectedRequest } from "src/utils/interfaces/express";
import database from "database";

export const createForum = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user;

    const { title, description, tags } = req.body;

    if (!userId || !title) {
      return res.sendStatus(402);
    }

    const createForum = await database.forum.create({
      data: {
        userId: userId,
        title: title,
        description: description,
        createdAt: new Date(),
        tags,
      },
    });

    return res.json(createForum);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
