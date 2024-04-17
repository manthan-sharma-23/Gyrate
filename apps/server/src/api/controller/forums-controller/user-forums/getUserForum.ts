import { Response } from "express";
import { ProtectedRequest } from "src/utils/interfaces/express";
import database from "database";

export const getUserForum = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user;
    const { forumId } = req.params;

    console.log(forumId)

    if (!userId || !forumId) {
      return res.sendStatus(403);
    }

    const data = await database.userForum.findFirst({
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

    console.log(data)

    return res.json(data);
  } catch (error) {
    return res.sendStatus(500);
  }
};
