// express 사용할수 있도록 로드//삭제
import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import { errorHandlerMiddleware } from './middlewares/errorHandler.middleware.js';

import userRouter from './routers/user.router.js'
import todoItemRouter from './routers/todoItem.router.js'

const app = express();
const port = 3000;

import leaveLogMiddleware from './middlewares/leaveLog.middleware.js';




app.use(cors());
app.use(express.json());
app.use(leaveLogMiddleware);
app.use(errorHandlerMiddleware);

app.use('/',userRouter)
app.use("/todo-items", todoItemRouter)

app.use(errorHandlerMiddleware);
app.listen(port, () => {
  console.log(`서버오픈, ${port} 포트`);
});
