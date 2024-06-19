import express from "express";
import cors from "cors";
import * as todoitemController from "./controllers/todoitem.controller.js";
import * as userController from "./controllers/user.controller.js";
import { authMiddleware } from "./middleware/auth.middleware.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//할일 목록 조회 api
app.get("/todo-items", todoitemController.getTodolists);

//할일 목록 한개 조회 api
app.get("/todo-items/:id", todoitemController.getTodolist);

//할일 목록 생성 api
app.post("/todo-items", authMiddleware, todoitemController.postTodoitem);

//할일 완료 여부
app.put("/todo-items/:id", authMiddleware, todoitemController.putTodoitem);

//할일목록삭제
app.delete(
  "/todo-items/:id",
  authMiddleware,
  todoitemController.deleteTodoitem
);

//회원가입
app.post("/sign-up", userController.postSignup);
//로그인
app.post("/sign-in", userController.postSignin);
//유저정보조회
app.get("/users/me", authMiddleware, userController.getuser);

app.listen(PORT, () => {
  console.log(`${PORT}번의 포트가 열렸습니다.`);
});
