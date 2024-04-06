import e, { Router } from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import authRouter from "./routes/auth.routes";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";

const router: Router = Router();

router
  .use(cors())
  .use(cookieParser("helloworld"))
  .use(e.json())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(
    session({
      secret: "new",
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000 * 60,
      },
    })
  )
  .use(morgan(":method :url :status :res[content-length] - :response-time ms"))
  .use("/auth", authRouter);

export default router;
