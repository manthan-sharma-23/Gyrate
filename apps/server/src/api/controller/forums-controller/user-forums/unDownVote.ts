import { Response } from "express";
import { ProtectedRequest } from "src/utils/interfaces/express";
import database from "database";

export const unDownVoteForum = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user;
    const { forumId, userForumId } = req.body;

    if (!userId || !forumId) {
      return res.sendStatus(403);
    }

    await database.$transaction([
      database.forum.update({
        where: {
          id: forumId,
        },
        data: {
          downvotes: { decrement: 1 },
        },
      }),
      database.userForum.update({
        where: {
          id: userForumId,
        },
        data: {
          isUpvoted: false,
          isDownvoted: false,
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
