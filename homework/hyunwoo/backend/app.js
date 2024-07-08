import express from "express";
import cors from "cors";
import 'dotenv/config';

// middleware 가져오기
import levelLogMiddleware from "./middlewares/levelLog.middleware.js";
import errorMiddleware from "./middlewares/errorHandler.middleware.js";

// Router 가져오기
import userRouter from './routers/user.router.js';
import todoItemRouter from './routers/todoItem.router.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(levelLogMiddleware);

app.use('/', userRouter);
app.use('/todo-items', todoItemRouter);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(port, "포트로 연결되었습니다.");
});
