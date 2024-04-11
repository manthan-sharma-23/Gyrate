import { User, UserForum } from "@prisma/client";
import { ForumWithUser } from "../../forum/getAllForums";
export interface userForumWithDetails extends UserForum {
  User: User;
  Forum: ForumWithUser;
}
