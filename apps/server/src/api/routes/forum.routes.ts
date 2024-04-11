import { Router } from "express";
import { authUser } from "../middlewares/authUser";
import { createForum } from "../controller/forums-controller/create.forum";
import { getForums } from "../controller/forums-controller/getForums.cotnroller";
import { getForumById } from "../controller/forums-controller/get.forum";
import { createCommentForum } from "../controller/forums-controller/createComment.controller";
import { replyToComment } from "../controller/forums-controller/reply.comment.controller";
import { getCommentReplies } from "../controller/forums-controller/getCommentReplies";
import { upvoteForum } from "../controller/forums-controller/user-forums/forum.upvote";
import { downvoteForum } from "../controller/forums-controller/user-forums/forum.downVote";
import { unUpVoteForum } from "../controller/forums-controller/user-forums/unUpVote";
import { unDownVoteForum } from "../controller/forums-controller/user-forums/unDownVote";
import { getUserForum } from "../controller/forums-controller/user-forums/getUserForum";
import { getForumComments } from "../controller/forums-controller/getComments";
import { bookMarkForum } from "../controller/forums-controller/user-forums/bookMark";
import { unBookMarkForum } from "../controller/forums-controller/user-forums/unBookMark";

const router: Router = Router();

router.post("/create", authUser, createForum);
router.post("/comment", authUser, createCommentForum);
router.post("/reply", authUser, replyToComment);
router.get("/:forumId/comments", authUser, getForumComments);
router.get("/", authUser, getForums);
router.get("/replies/:commentId", authUser, getCommentReplies);
router.get("/:forumId", authUser, getForumById);

// voting algo
router.get("/userForum/:forumId", authUser, getUserForum);
router.patch("/upvote", authUser, upvoteForum);
router.patch("/downvote", authUser, downvoteForum);
router.patch("/undownvote", authUser, unDownVoteForum);
router.patch("/unupvote", authUser, unUpVoteForum);
router.patch("/bookMark", authUser, bookMarkForum);
router.patch("/unbookMark", authUser, unBookMarkForum);

export default router;
