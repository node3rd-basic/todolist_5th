import authMiddleware from "../middlewares/auth.middleware.js";
import * as todoItemController from "../controllers/todoItem.controller.js";
import { Router } from "express";
import errorMiddleware from "../middlewares/error.middleware.js";

const router = Router()

router.use(authMiddleware)
router.get("", todoItemController.getTodoItems)
router.post("", todoItemController.postTodoItem)
router.get("/:id", todoItemController.getTodoItem)
router.put("/:id", todoItemController.putTodoItem)
router.delete("/:id", todoItemController.deleteTodoItem)

export default router