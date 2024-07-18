// 1. express -> 서버 띄운다
import express from "express";
import cors from "cors";
import * as userController from "./controllers/users.controller.js";
import * as todoitemsController from "./controllers/todoitems.controller.js";
import authMiddleware from "./middlewares/auth.middleware.js";
import "dotenv/config";
import { errorHandlerMiddleware } from "./middlewares/errorHandler.middleware.js";
import usersRouter from "./routers/users.router.js";
import todoItemsRouter from "./routers/todoitems.router.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/", usersRouter);
app.use("/todo-items", todoItemsRouter);

app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(port, "연결되었습니다.");
});
