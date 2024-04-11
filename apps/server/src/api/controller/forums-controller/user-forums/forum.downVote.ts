import { Response } from "express";
import { ProtectedRequest } from "src/utils/interfaces/express";
import database from "database";

export const downvoteForum = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user;
    const { forumId } = req.body;

    if (!userId || !forumId) {
      return res.sendStatus(403);
    }

    const userForum = await database.userForum.findFirst({
      where: {
        userId,
        forumId,
      },
    });

    await database.$transaction([
      database.userForum.upsert({
        where: {
          id: userForum?.id,
        },
        create: {
          userId,
          forumId,
          isUpvoted: false,
          isDownvoted: true,
        },
        update: {
          isUpvoted: false,
          isDownvoted: true,
        },
      }),
      database.forum.update({
        where: {
          id: forumId,
        },
        data: userForum?.isUpvoted
          ? {
              downvotes: { increment: 1 },
              upvotes: { decrement: 1 },
            }
          : {
              downvotes: { increment: 1 },
            },
      }),
    ]);

    return res.sendStatus(200);
  } catch (error) {
    console.error("Error:", error);
    return res.sendStatus(500);
  }
};
