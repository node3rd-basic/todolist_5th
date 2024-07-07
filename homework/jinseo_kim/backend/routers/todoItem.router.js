import authMiddleware from "../middlewares/auth.middleware.js"
import * as todoItemsController from "../controllers/todoItems.controller.js"
import { Router } from "express";

const router = Router()

router.use(authMiddleware)
router.get('/', todoItemsController.getTodoItems);
router.post('/', todoItemsController.postTodoItem);
router.delete('/:id', todoItemsController.deleteTodoItem);
router.put('/:id', todoItemsController.putTodoItem);

export default router