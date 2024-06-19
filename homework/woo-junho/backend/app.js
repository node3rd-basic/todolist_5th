// express 사용할수 있도록 로드
import express from 'express'
import cors from 'cors'

// Middleware
import authMiddleware from "./middlewares/auth.middleware.js"
import leaveLogMiddleware from "./middlewares/leaveLog.middleware.js"

// Controller
import * as todoItemController from "./controllers/todoItem.controller.js"
import * as userController from "./controllers/user.controller.js"

// 나의 통신가능한 프로그램 (application) 을 정의
const app = express()
const port = 3000

const errorMiddleware = (err, req,res, next) => {
    res.status(500).json({
        message: "Internal Server Error",
    })
}

app.use(cors())
app.use(express.json())
app.use(leaveLogMiddleware)

app.get("/todo-items", authMiddleware, todoItemController.getTodoItems)
app.post("/todo-items", authMiddleware, todoItemController.postTodoItem)
app.get("/todo-items/:id", authMiddleware, todoItemController.getTodoItem)
app.put("/todo-items/:id", authMiddleware, todoItemController.putTodoItem)
app.delete("/todo-items/:id", authMiddleware, todoItemController.deleteTodoItem)

app.post("/sign-up", userController.postSignUp)
app.post("/sign-in", userController.postSignIn)
app.get("/users/me", authMiddleware, userController.getUserMe)

const listeningCallback = () => {
    console.log(`Example app listening on port ${port}`)
}
app.listen(port, listeningCallback)