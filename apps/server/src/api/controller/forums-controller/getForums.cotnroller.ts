import { Response } from "express";
import { ProtectedRequest } from "src/utils/interfaces/express";
import database from "database";
import { forumsOrder } from "types";
import { Forum, Comment, User } from "@prisma/client";

interface ForumsWithCommentsWithUser extends Forum {
  Comments: unknown[];
  User: User;
}

export const getForums = async (req: ProtectedRequest, res: Response) => {
  try {
    const userId = req.user;
    const orderBy = req.header("orderBy");

    if (!userId) return res.sendStatus(403);

    const forums = (await database.forum.findMany({
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
    })) as unknown as ForumsWithCommentsWithUser[];

    if (orderBy === forumsOrder.recent) {
      return res.json(forums);
    }

    if (orderBy === forumsOrder.trending) {
      const currentTimestamp = Date.now();
      const trending_forums = sortByTrending(forums, currentTimestamp, userId);
      return res.json(trending_forums);
    }

    return res.json(forums);
  } catch (error) {
    return res.sendStatus(500);
  }
};

const sortByTrending = (
  forums: ForumsWithCommentsWithUser[],
  currentTimestamp: number,
  userId: string
) => {
  const scoredForums = forums.map((forum) => ({
    forum,
    score: calculateForumScore(
      forum,
      calculateMaxComments(forums),
      calculateMaxUpvotes(forums),
      calculateMaxDownVotes(forums),
      calculateCreatedByWeight(forum, userId),
      currentTimestamp
    ),
  }));

  const sortedForums = scoredForums
    .sort((a, b) => b.score - a.score)
    .map((item) => item.forum);

  return sortedForums;
};

function calculateMaxComments(forums: ForumsWithCommentsWithUser[]): number {
  let maxComments = 0;
  for (const forum of forums) {
    const commentsCount = forum.Comments.length;
    if (commentsCount > maxComments) {
      maxComments = commentsCount;
    }
  }
  return maxComments;
}

function calculateMaxUpvotes(forums: ForumsWithCommentsWithUser[]): number {
  let maxUpvotes = 0;
  for (const forum of forums) {
    const upvotesCount = forum.upvotes; // Assuming you have a property 'upvotes' in your Forum model
    if (upvotesCount > maxUpvotes) {
      maxUpvotes = upvotesCount;
    }
  }
  return maxUpvotes;
}

function calculateMaxDownVotes(forums: ForumsWithCommentsWithUser[]): number {
  let maxDownVotes = 0;
  for (const forum of forums) {
    const downvotesCount = forum.downvotes; // Assuming you have a property 'downvotes' in your Forum model
    if (downvotesCount > maxDownVotes) {
      maxDownVotes = downvotesCount;
    }
  }
  return maxDownVotes;
}

function calculateCreatedByWeight(
  forum: ForumsWithCommentsWithUser,
  currentUserId: string
): number {
  // You can adjust this logic as per your requirements
  return forum.User.id === currentUserId ? 1 : 0.5; // Assign a weight of 1 if the forum is created by the current user, otherwise 0.5
}

function calculateForumScore(
  forum: ForumsWithCommentsWithUser,
  maxComments: number,
  maxUpvotes: number,
  maxDownVotes: number,
  createdByWeight: number,
  currentTimestamp: number
): number {
  const commentsCount = forum.Comments.length;
  const upvotesCount = forum.upvotes; // Assuming you have a property 'upvotes' in your Forum model
  const downvotesCount = forum.downvotes; // Assuming you have a property 'downvotes' in your Forum model

  // Calculate the time difference in milliseconds between current time and forum creation time
  const timeDifference = currentTimestamp - new Date(forum.createdAt).getTime();

  // Normalize each count with respect to the maximum value
  const normalizedComments = commentsCount / maxComments;
  const normalizedUpvotes = upvotesCount / maxUpvotes;
  const normalizedDownvotes = downvotesCount / maxDownVotes;

  // Calculate the time factor based on the time difference
  // The longer the time difference, the smaller the factor (assuming recent activity is more important)
  const timeFactor = 1 / (1 + timeDifference / (1000 * 60 * 60 * 24)); // Convert time difference to days

  // Calculate the weighted sum of normalized values including the time factor
  const score =
    ((normalizedComments * 0.5 +
      normalizedUpvotes * 0.3 -
      normalizedDownvotes * 0.2) *
      createdByWeight +
      timeFactor * 0.2) /
    (createdByWeight + 0.2);

  return score;
}
