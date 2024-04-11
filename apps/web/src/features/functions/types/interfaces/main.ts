import { User, UserForum } from "@prisma/client";
import { ForumWithComments } from "../../forum/getForumById";

export interface userForumWithDetails extends UserForum {
  User: User;
  Forum: ForumWithComments;
}
