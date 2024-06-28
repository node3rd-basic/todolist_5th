import express from "express";
import cors from "cors";
import "dotenv/config";

import authMiddleware from "./middlewares/auth.middleware.js";

import * as todoItemController from "./controllers/todoItem.controller.js";
import * as usersController from "./controllers/user.controller.js";

const app = express();
const port = 3000;

const errorMiddleware = (err, req, res, next) => {
  res.status(500).json({
    message: "서버 에러입니다.",
  });
};

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world");
});

//할일 생성
app.post("/todo-items", authMiddleware, todoItemController.postTodoItem);

//할일 목록 api
app.get("/todo-items", authMiddleware, todoItemController.getTodoItems);

//할일 목록중 한개 조회하기
app.get("/todo-items/:id", authMiddleware, todoItemController.getTodoItem);

//할일 수정
app.put("/todo-items/:id", authMiddleware, todoItemController.putTodoItem);

//할일 삭제
app.delete(
  "/todo-items/:id",
  authMiddleware,
  todoItemController.deleteTodoItem
);

//회원가입
app.post("/sign-up", usersController.SignUp);

//로그인
app.post("/sign-in", usersController.SignIn);

//토큰검증
app.get("/users/me", authMiddleware, usersController.UserMe);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`${port}포트 서버가 열렸습니다.`);
});
