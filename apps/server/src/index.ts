import e from "express";
import { PORT } from "./config/exports";
import AppRouter from "./api/index.routes";
import session from "express-session";

const app = e();

app.use("/api", AppRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
