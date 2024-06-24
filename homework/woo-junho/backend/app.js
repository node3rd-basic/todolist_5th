// express 사용할수 있도록 로드
import express from 'express'
import 'dotenv/config'
import cors from 'cors'

import leaveLogMiddleware from "./middlewares/leaveLog.middleware.js"
import errorMiddleware from "./middlewares/error.middleware.js"

import userRouter from "./routers/user.router.js"
import todoItemRouter from "./routers/todoItem.router.js"

// 나의 통신가능한 프로그램 (application) 을 정의
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(leaveLogMiddleware)

app.use("/", userRouter)
app.use("/todo-items", todoItemRouter)

app.use(errorMiddleware)

const listeningCallback = () => {
    console.log(`Example app listening on port ${port}`)
}
app.listen(port, listeningCallback)