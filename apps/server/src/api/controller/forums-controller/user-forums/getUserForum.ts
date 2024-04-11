import { Response } from "express";
import { ProtectedRequest } from "src/utils/interfaces/express";
import database from "database";

export const getUserForum = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user;
    const { forumId } = req.body;

    if (!userId || !forumId) {
      return res.sendStatus(403);
    }

    const userForum = await database.userForum.findFirstOrThrow({
      where: {
        userId,
        forumId,
      },
      include: {
        User: true,
        Forum: {
          include: {
            Comments: true,
            User: true,
          },
        },
      },
    });

    

    return res.json(userForum);
  } catch (error) {
    return res.sendStatus(500);
  }
};
