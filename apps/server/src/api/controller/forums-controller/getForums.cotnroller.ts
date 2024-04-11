import { Response } from "express";
import { ProtectedRequest } from "src/utils/interfaces/express";
import database from "database";
import { forumsOrder } from "types";

export const getForums = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user;
    const orderBy = req.header("orderBy");

    if (!userId) return res.sendStatus(403);

    const forums = await database.forum.findMany({
      where: {
        isActive: true,
      },
      include: {
        User: true,
        Comments: {
          select: {
            _count: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (orderBy === forumsOrder.recent) return res.json(forums);

    return res.json();
  } catch (error) {
    return res.sendStatus(500);
  }
};
