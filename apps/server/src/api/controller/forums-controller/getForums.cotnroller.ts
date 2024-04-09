import { Response } from "express";
import { ProtectedRequest } from "src/utils/interfaces/express";
import database from "database";

export const getForums = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user;

    if (!userId) return res.sendStatus(403);

    const forums = await database.forum.findMany({
      where: {
        isActive: true,
      },
      include: {
        User: true,
      },
    });

    return res.json(forums);
  } catch (error) {
    return res.sendStatus(500);
  }
};
