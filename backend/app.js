// express framework 를 불러온다.
import express, {response} from "express"
import 'dotenv/config'
// FE 자바스크립트에서 호출시 origin (요청 도메인) 이 달라도 요청 허용 해주는 라이브러리.
import cors from "cors"
import authRouter from "./router/auth.js"
import userRouter from "./router/user.js"
import todoItemRouter from "./router/todoItem.js"
import classRouter from "./router/class.js"
import router from "./router/class.js";
import ResponseDTO from "./dto/responseDto.js";

// express 를 통해 웹 서버(웹 애플리케이션을 할당한다)
const app = express()
// 프로그램의 port : 3000번을 할당한다.
const port = 3000
app.use(cors())
app.use(express.json())

app.use("/", authRouter)
app.use("/class", classRouter)
app.use("/users", userRouter)
app.use("/todo-items", todoItemRouter)
app.use((err, req, res, next) => {
    console.error(err)
    const response = new ResponseDTO(undefined, undefined, false, err.message)
    res.status(err.status).send(response.json())
})

// 프로그램이 3000번을 열고, 요청을 받기 위해 대기 한다.
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})