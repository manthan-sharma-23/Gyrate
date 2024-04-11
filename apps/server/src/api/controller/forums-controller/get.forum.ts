import { Response } from "express";
import { ProtectedRequest } from "src/utils/interfaces/express";
import database from "database";

export const getForumById = async (req: ProtectedRequest, res: Response) => {
  try {
    const { forumId } = req.params;

    const forum = await database.forum.findUniqueOrThrow({
      where: {
        id: forumId,
      },
      include: {
        User: true,
        Comments: {
          select: {
            _count: true,
          },
        },
      },
    });

    return res.json(forum);
  } catch (error) {
    return res.sendStatus(500);
  }
};
