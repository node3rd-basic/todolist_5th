//**기본 세팅 : yarn 설치 : 안했다면

//**기본세팅1 : import , app
import express from "express";
import "dotenv/config";
import cors from "cors";
import userRouter from "./router/user.router.js";
import todoitemRouter from "./router/todoitem.router.js";
// import jwt from "jsonwebtoken";
// import authMiddleware from "./middlewares/authMiddleware.js";

// //db
// import users from "./db/users.js";
// import todoItems from "./db/todoitems.js";
// //controller
// import * as todoItemsController from "./controller/todoitems.controller.js";
// import * as usersController from "./controller/users.controller.js";
import errorMiddleware from "./middlewares/error.Middleware.js";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("hello");
});

app.use(cors());
app.use(express.json());
app.use(errorMiddleware);

app.use("/", userRouter);
app.use("/todo-items", todoitemRouter);
//미들웨어 하나 만들기

app.listen(PORT, () => {
  console.log(PORT, "포트열림:)");
});
