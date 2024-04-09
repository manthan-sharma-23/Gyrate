import { Router } from "express";
import { authUser } from "../middlewares/authUser";
import { createForum } from "../controller/forums-controller/create.forum";
import { getForums } from "../controller/forums-controller/getForums.cotnroller";

const router: Router = Router();

router.post("/create", authUser, createForum);
router.get("/", authUser, getForums);

export default router;
