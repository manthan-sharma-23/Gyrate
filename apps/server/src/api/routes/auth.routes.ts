import { Router } from "express";
import { GithubAuthorizePat } from "../controller/auth-controller/github/githubAuthorize.controller";
import { SingupUserWithEmail } from "../controller/auth-controller/email/signup-email";
import { SignInWithEmail } from "../controller/auth-controller/email/signin-email";

const router: Router = Router();

router
  .get("/github/pat", GithubAuthorizePat)
  .post("/signin/github")
  .post("/signup/github")
  .post("/signup/email", SingupUserWithEmail)
  .post("/signin/email", SignInWithEmail);

export default router;
