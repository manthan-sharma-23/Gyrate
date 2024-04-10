import { Router } from "express";
import { authUser } from "../middlewares/authUser";
import { createForum } from "../controller/forums-controller/create.forum";
import { getForums } from "../controller/forums-controller/getForums.cotnroller";
import { getForumById } from "../controller/forums-controller/get.forum";
import { createCommentForum } from "../controller/forums-controller/createComment.controller";
import { replyToComment } from "../controller/forums-controller/reply.comment.controller";
import { getCommentReplies } from "../controller/forums-controller/getCommentReplies";

const router: Router = Router();

router.post("/create", authUser, createForum);
router.post("/comment", authUser, createCommentForum);
router.post("/reply", authUser, replyToComment);
router.get("/", authUser, getForums);
router.get("/replies/:commentId", authUser, getCommentReplies);
router.get("/:forumId", authUser, getForumById);

export default router;
