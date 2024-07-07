import { authMiddleware } from "../middleware/auth.middleware.js";
import * as todoitemController from "../controllers/todoitem.controller.js";
import express from "express";

const todoitemRouter = express();

//할일 목록 조회 api
todoitemRouter.get(
  "/todo-items",
  authMiddleware,
  todoitemController.getTodolists
);

//할일 목록 생성 api
todoitemRouter.post(
  "/todo-items",
  authMiddleware,
  todoitemController.postTodoitem
);

//할일 완료 여부
todoitemRouter.put(
  "/todo-items/:id",
  authMiddleware,
  todoitemController.putTodoitem
);

//할일목록삭제
todoitemRouter.delete(
  "/todo-items/:id",
  authMiddleware,
  todoitemController.deleteTodoitem
);

export { todoitemRouter };
