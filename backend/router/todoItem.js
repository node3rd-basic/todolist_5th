import authMiddleware from "../middleware/auth.js"
import { Router } from "express"
import {
    getTodoItems,
    getTodoItem,
    getTodoItemsByKeyword,
    postTodoItem,
    putTodoItem, deleteTodoItem,
} from "../controller/todoItemController.js"

const router = Router()
router.use(authMiddleware)
router.get("/", getTodoItems)
router.get("/:id", getTodoItem)
router.get("/search/keyword", getTodoItemsByKeyword)
router.post("/", postTodoItem)
router.put("/:id", putTodoItem)
router.delete("/:id", deleteTodoItem)

export default router