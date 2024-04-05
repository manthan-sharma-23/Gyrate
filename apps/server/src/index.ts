import express from "express";
import database from "database";

const port = 3300;

const app = express();

app.get("/", async (_req, res) => {
  const user = await database.user.create({ data: { email: "manthan" } });
  return res.json(user);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
