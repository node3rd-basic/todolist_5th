import { Router } from "express";
import * as todoItemController from "../controllers/todoItem.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();
router.use(authMiddleware);

/** 할일 목록들 보여지도록 api 구현 */
router.get("/", todoItemController.getTodoItems);

/** 할일 목록 추가되도록 api 구현 */
router.post("/", todoItemController.postTodoItem);

/** 할일 한가지 조회되도록 api 구현 */
router.get("/:id", todoItemController.getTodoItem);

/** 할일 수정 api 구현 */
router.put("/:id", todoItemController.putTodoItem);

/** 할일 삭제 api 구현 */
router.delete("/:id", todoItemController.deleteTodoItem);

export default router;