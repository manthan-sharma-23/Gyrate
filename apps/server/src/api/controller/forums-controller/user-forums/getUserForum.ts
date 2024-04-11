import { Response } from "express";
import { ProtectedRequest } from "src/utils/interfaces/express";
import database from "database";

export const getUserForum = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user;
    const { forumId } = req.params;

    if (!userId || !forumId) {
      return res.sendStatus(403);
    }

    const data = await database.userForum.findFirstOrThrow({
      where: {
        userId,
        forumId,
      },
      include: {
        User: true,
        Forum: {
          include: {
            User: true,
            Comments: {
              select: {
                _count: true,
              },
            },
          },
        },
      },
    });

    return res.json(data);
  } catch (error) {
    return res.sendStatus(500);
  }
};
