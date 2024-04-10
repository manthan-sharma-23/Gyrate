import { Response } from "express";
import { ProtectedRequest } from "src/utils/interfaces/express";
import database from "database";

export const getCommentReplies = async (
  req: ProtectedRequest,
  res: Response
) => {
  try {
    const { commentId } = req.params;

    if (!commentId) return res.sendStatus(500);

    const replies = await database.commentReplies.findMany({
      where: {
        commentId,
      },
      include: {
        User: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json(replies);
  } catch (error) {
    return res.sendStatus(500);
  }
};
