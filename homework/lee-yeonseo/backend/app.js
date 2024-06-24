import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import authMiddleware from '../backend/middlewares/auth.middleware.js';
import { errorHandlingMiddleware } from './middlewares/errorHandling.middleware.js';
import { todoItemIdValidator } from './middlewares/todoItemIdValidator.middleware.js';
import { signUpInputValidator } from './middlewares/inputValidator.middleware.js';

import * as userController from './controllers/user.controller.js';
import * as todoItemController from './controllers/todoItem.controller.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

//할 일 목록 조회 api
app.get('/todo-items', authMiddleware, todoItemController.getTodoItems);
//할 일 상세 조회 api
app.get('/todo-items/:id', authMiddleware, todoItemIdValidator, todoItemController.getTodoItem);
//할 일 등록 api
app.post('/todo-items', authMiddleware, todoItemController.postTodoItem);
//할 일 수정 api
app.put('/todo-items/:id', authMiddleware, todoItemIdValidator, todoItemController.putTodoItem);
//할 일 삭제 api
app.delete('/todo-items/:id', authMiddleware, todoItemIdValidator, todoItemController.deleteTodoItem);

//회원가입 api
app.post('/sign-up', signUpInputValidator, userController.postSignUp);
//로그인 api
app.post('/sign-in', userController.postSignIn);
//토큰 검증 api
app.get('/users/me', authMiddleware, userController.getUserMe);

app.use(errorHandlingMiddleware);

app.listen(port, () => {
  console.log(`${port}로 서버가 열렸습니다!`);
});
