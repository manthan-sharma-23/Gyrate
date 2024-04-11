import { Response } from "express";
import { ProtectedRequest } from "src/utils/interfaces/express";
import database from "database";

export const bookMarkForum = async (req: ProtectedRequest, res: Response) => {
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
          isBookMarked: true,
        },
        update: {
          isBookMarked: true,
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
    console.error("Error:", error);
    return res.sendStatus(500);
  }
};
