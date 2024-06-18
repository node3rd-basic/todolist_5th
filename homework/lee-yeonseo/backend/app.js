import express from 'express';
import cors from 'cors';

import authMiddleware from '../backend/middlewares/auth.middleware.js';
import { errorHandlingMiddleware } from './middlewares/errorHandling.middleware.js';
import { todoItemIdValidator } from './middlewares/todoItemIdValidator.middleware.js';

import * as userController from './controllers/user.controller.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

//투두 아이템 찾기
const getTodoItemById = (id) => {
  const todoItem = todoItems.find((todoItem) => todoItem.id === id);
  if (!todoItem) {
    throw new Error('해당 아이디의 할 일이 존재하지 않습니다.');
  }
  return todoItem;
};

//투두 아이템 필터링
const filteredTodoItems = (userId) => {
  const filteredtodoItems = todoItems.filter((todoItem) => todoItem.userId === userId);
  return filteredtodoItems;
};

app.get('/', (req, res) => {
  res.send('안녕하세요');
});

//할 일 목록 조회 api
app.get('/todo-items', authMiddleware, (req, res) => {
  const user = req.user;

  return res.send(filteredTodoItems(user.id));
});

//할 일 상세 조회 api
app.get('/todo-items/:id', authMiddleware, todoItemIdValidator, (req, res) => {
  const todoItemId = req.id;
  const user = req.user;

  const selectedTodoItem = getTodoItemById(todoItemId);

  if (selectedTodoItem.userId !== user.id) {
    return res.status(401).json({ message: '접근 권한이 없는 투두 목록입니다.' });
  }

  return res.send(selectedTodoItem);
});

//할 일 등록 api
app.post('/todo-items', authMiddleware, (req, res) => {
  const { title } = req.body;
  const user = req.user;
  const newTodoId = getIncrementedId(todoItems);

  const newTodoItem = {
    id: newTodoId,
    userId: user.id,
    title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: null,
  };

  todoItems.push(newTodoItem);
  return res.send(newTodoItem);
});

//할 일 수정 api
app.put('/todo-items/:id', authMiddleware, todoItemIdValidator, (req, res) => {
  const user = req.user;
  const todoItemId = req.id;

  const selectedTodoItem = getTodoItemById(todoItemId);

  if (selectedTodoItem.userId !== user.id) {
    return res.status(404).json({ message: '수정 권한이 없습니다.' });
  }

  const todoItemIndex = todoItems.indexOf(selectedTodoItem);

  todoItems.splice(todoItemIndex, 1, {
    ...selectedTodoItem,
    doneAt: selectedTodoItem.doneAt == null ? new Date() : null,
  });

  return res.send(filteredTodoItems(user.id));
});

//할 일 삭제 api
app.delete('/todo-items/:id', authMiddleware, todoItemIdValidator, (req, res) => {
  const user = req.user;
  const todoItemId = req.id;

  const selectedTodoItem = getTodoItemById(todoItemId);

  if (selectedTodoItem.userId !== user.id) {
    return res.status(401).json({ message: '삭제 권한이 없습니다.' });
  }

  const todoItemIndex = todoItems.indexOf(selectedTodoItem);

  todoItems.splice(todoItemIndex, 1);

  //삭제하고 남은 리스트 반환
  return res.send(filteredTodoItems(user.id));
});

//회원가입 api
app.post('/sign-up', userController.postSignUp);

//로그인 api
app.post('/sign-in', userController.postSignIn);

//토큰 검증 api
app.get('/users/me', authMiddleware, userController.getUserMe);

app.use(errorHandlingMiddleware);

app.listen(port, () => {
  console.log(`${port}로 서버가 열렸습니다!`);
});
