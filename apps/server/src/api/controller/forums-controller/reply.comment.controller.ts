import { Response } from "express";
import { ProtectedRequest } from "src/utils/interfaces/express";
import database from "database";

export const replyToComment = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user;
    const { comment, commentId } = req.body;

    if (!userId || !comment || !commentId) return res.sendStatus(500);

    const replyCommentQuery = await database.commentReplies.create({
      data: {
        userId,
        comment,
        commentId,
      },
      include: {
        User: true,
      },
   
    });

    return res.json(replyCommentQuery);
  } catch (error) {
    return res.sendStatus(500);
  }
};
