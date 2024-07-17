import express from "express";
import cors from "cors";
import "dotenv/config";

import { errorMiddleware } from "./middlewares/error.middleware.js";

import todoItemRouter from "./routers/todoItem.router.js";
import userRouter from "./routers/user.router.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use("/todo-items", todoItemRouter);
app.use("/", userRouter);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`${port}포트 서버가 열렸습니다.`);
});
