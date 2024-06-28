import * as todoItemController from "../controllers/todoItem.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { Router } from "express";

const router = Router();

router.use(authMiddleware);

//할일 생성
router.post("/", todoItemController.postTodoItem);

//할일 목록 api
router.get("/", todoItemController.getTodoItems);

//할일 목록중 한개 조회하기
router.get("/:id", todoItemController.getTodoItem);

//할일 수정
router.put("/:id", todoItemController.putTodoItem);

//할일 삭제
router.delete("/:id", todoItemController.deleteTodoItem);

export default router;
