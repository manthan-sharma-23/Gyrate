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

const router: Router = Router();

router.post("/create", authUser, createForum);
router.post("/comment", authUser, createCommentForum);
router.post("/reply", authUser, replyToComment);
router.get("/", authUser, getForums);
router.get("/replies/:commentId", authUser, getCommentReplies);
router.get("/:forumId", authUser, getForumById);
router.patch("/upvote", authUser, upvoteForum);
router.patch("/downvote", authUser, downvoteForum);
router.patch("/undownvote", authUser, unDownVoteForum);
router.patch("/unupvote", authUser, unUpVoteForum);

export default router;
