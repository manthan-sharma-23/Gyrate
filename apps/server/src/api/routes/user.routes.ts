import { Router } from "express";
import { getUserByToken } from "../controller/user-controller.ts/getUserByToken";
import { authUser } from "../middlewares/authUser";

const router: Router = Router();

router.get("/", authUser, getUserByToken);

export default router;
