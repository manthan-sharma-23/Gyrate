import { Response } from "express";
import { ProtectedRequest } from "src/utils/interfaces/express";
import database from "database";

export const createCommentForum = async (
  req: ProtectedRequest,
  res: Response
) => {
  try {
    const { forumId, comment, userId } = req.body;

    if (!forumId || !comment || !userId) return res.sendStatus(402);

    const commentCreateQuery = await database.comment.create({
      data: {
        userId,
        comment,
        forumId,
      },
      include: {
        User: true,
      },
    });

    return res.json(commentCreateQuery);
  } catch (error) {
    return res.sendStatus(500);
  }
};
