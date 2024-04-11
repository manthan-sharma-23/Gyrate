import { Response } from "express";
import { ProtectedRequest } from "src/utils/interfaces/express";
import database from "database";
import { Comment } from "@prisma/client";
import redis from "src/services/Redis/redis";
import { cache_tags } from "src/utils/types";

export const getForumComments = async (
  req: ProtectedRequest,
  res: Response
) => {
  try {
    const userId = req.user;
    const { forumId } = req.params;

    if (!userId || !forumId) return res.sendStatus(403);

    let comments: Comment[] = [];

    const cache = await redis.get(cache_tags.comments + forumId);

    if (cache) {
      comments = JSON.parse(cache) as typeof comments;
      return res.json(comments);
    }

    comments = await database.comment.findMany({
      where: {
        forumId,
      },
      include: {
        User: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });

    await redis.set(cache_tags.comments + forumId, JSON.stringify(comments));

    return res.json(comments);
  } catch (error) {
    return res.sendStatus(500);
  }
};
