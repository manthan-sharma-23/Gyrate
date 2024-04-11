import { Response } from "express";
import { ProtectedRequest } from "src/utils/interfaces/express";
import database from "database";
import redis from "src/services/Redis/redis";
import { cache_tags } from "src/utils/types";

export const createCommentForum = async (
  req: ProtectedRequest,
  res: Response
) => {
  try {
    const { forumId, comment, userId } = req.body;

    if (!forumId || !comment || !userId) return res.sendStatus(402);

    await redis.del(cache_tags.comments + forumId);

    const [createComment, allComments] = await database.$transaction([
      database.comment.create({
        data: {
          userId,
          comment,
          forumId,
        },
        include: {
          User: true,
        },
      }),
      database.comment.findMany({
        where: {
          forumId: forumId,
        },
        include: {
          User: true,
        },
      }),
    ]);

    res.json(createComment);

    await redis.set(cache_tags.comments + forumId, JSON.stringify(allComments));

    return;
  } catch (error) {
    return res.sendStatus(500);
  }
};
