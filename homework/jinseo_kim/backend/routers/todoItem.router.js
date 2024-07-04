import authMiddleware from "../middlewares/auth.middleware.js"
import * as todoItemsController from "../controllers/todoItems.controller.js"
import { Router } from "express";

const router = Router()

router.use(authMiddleware)
router.get('/todo-items', todoItemsController.getTodoItems);
router.post('/todo-items', todoItemsController.postTodoItem);
router.delete('/todo-items/:id', todoItemsController.deleteTodoItem);
router.put('/todo-items/:id', todoItemsController.putTodoItem);

export default router