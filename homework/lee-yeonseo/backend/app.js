import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import { errorHandlingMiddleware } from './middlewares/errorHandling.middleware.js';

import userRouter from './routers/user.router.js';
import todoItemRouter from './routers/todoItem.router.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/', userRouter);
app.use('/todo-items', todoItemRouter);

app.use(errorHandlingMiddleware);

app.listen(port, () => {
  console.log(`${port}로 서버가 열렸습니다!`);
});
