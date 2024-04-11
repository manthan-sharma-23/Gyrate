-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "CommentReplies" ADD COLUMN     "tagged" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "Forum" ADD COLUMN     "downvotes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "upvotes" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "UserForum" (
    "id" TEXT NOT NULL,
    "isUpvoted" BOOLEAN NOT NULL DEFAULT false,
    "isDownvoted" BOOLEAN NOT NULL DEFAULT false,
    "isBookMarked" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "forumId" TEXT NOT NULL,

    CONSTRAINT "UserForum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserComment" (
    "id" TEXT NOT NULL,
    "isLiked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserComment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserForum" ADD CONSTRAINT "UserForum_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserForum" ADD CONSTRAINT "UserForum_forumId_fkey" FOREIGN KEY ("forumId") REFERENCES "Forum"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
