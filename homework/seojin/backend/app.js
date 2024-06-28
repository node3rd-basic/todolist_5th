import express from 'express';
import 'dotenv/config'
import cors from 'cors';

import authMiddleware from './middlewares/auth.middleware.js';
import leaveLogMiddleware from './middlewares/leaveLog.middleware.js';

import * as todoItemController from "./controllers/todoItem.controller.js"
import * as userController from "./controllers/user.controller.js"

const app = express();
const port = 3000;

const errorMiddleware = (err, req,res, next) => {
    res.status(500).json({
        message: "Internal Server Error",
    })
}


app.use(express.json());
app.use(cors());
app.use(leaveLogMiddleware);



app.get('/todo-items', authMiddleware, todoItemController.getTodoItems);
app.post("/todo-items", authMiddleware, todoItemController.postTodoItem)
app.get("/todo-items/:id", authMiddleware, todoItemController.getTodoItem)
app.put("/todo-items/:id", authMiddleware, todoItemController.putTodoItem)
app.delete("/todo-items/:id", authMiddleware, todoItemController.deleteTodoItem)


app.post("/sign-up", userController.postSignUp)
app.post( "/sign-in",userController.postSignIn);
app.get("/users/me", authMiddleware, userController.getUserMe);




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
