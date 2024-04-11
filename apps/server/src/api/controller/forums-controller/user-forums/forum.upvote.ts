import { Response } from "express";
import { ProtectedRequest } from "src/utils/interfaces/express";
import database from "database";

export const upvoteForum = async (req: ProtectedRequest, res: Response) => {
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
          id: userForum?.id || "",
        },
        create: {
          userId,
          forumId,
          isUpvoted: true,
          isDownvoted: false,
        },
        update: {
          isUpvoted: true,
          isDownvoted: false,
        },
      }),
      database.forum.update({
        where: {
          id: forumId,
        },
        data: userForum?.isDownvoted
          ? {
              upvotes: { increment: 1 },
              downvotes: { decrement: 1 },
            }
          : {
              upvotes: { increment: 1 },
            },
      }),
    ]);

    const data = await database.userForum.findFirstOrThrow({
      where: {
        userId,
        forumId,
      },
      include: {
        User: true,
        Forum: {
          include: {
            Comments: {
              include: {
                User: true,
              },
            },
            User: true,
          },
        },
      },
    });

    return res.json(data);
  } catch (error) {
    console.error("Error:", error);
    return res.sendStatus(500);
  }
};
