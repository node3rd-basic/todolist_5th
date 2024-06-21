import express from 'express';
import cors from 'cors';
// 미들웨어 (로그, 인증, 에러핸들러)
import leaveLogMiddleware from './middlewares/leaveLog.middleware.js';
import authMiddleware from './middlewares/auth.middleware.js';
import { errorMiddleware } from './middlewares/errorHandler.middleware.js';
// 컨트롤러
import * as userController from './controllers/users.controller.js';
import * as todoItemsController from './controllers/todoItems.controller.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(leaveLogMiddleware);
app.use(errorMiddleware);

// 회원가입
app.post('/sign-up', userController.postUserSignUp);
// 로그인
app.post('/sign-in', userController.postUserSignIn);
// 내정보
app.get('/users/me', authMiddleware, userController.getUserMe);

// 할일 목록들 조회
app.get('/todo-items', authMiddleware, todoItemsController.getTodoItems);
// 할일 등록
app.post('/todo-items', authMiddleware, todoItemsController.postTodoItem);
// 할일 삭제
app.delete('/todo-items/:id', authMiddleware, todoItemsController.deleteTodoItem);
// 할일 완료/미완료
app.put('/todo-items/:id', authMiddleware, todoItemsController.putTodoItem);

app.use(errorMiddleware);
app.listen(port, () => {
  console.log(`서버오픈, ${port} 포트`);
});
