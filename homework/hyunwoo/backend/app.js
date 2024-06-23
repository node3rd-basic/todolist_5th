import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

// middleware 가져오기
import authMiddleware from "./middlewares/auth.middleware.js";
import levelLogMiddleware from "./middlewares/levelLog.middleware.js";

// controller 가져오기
import * as usercontroller from './controllers/user.controller.js';
import * as todoItemcontroller from './controllers/todoItem.controller.js';

// users, todoitems 가져오기
import user from './db/users.js'
import todoItems from "./db/todoItems.js";

const app = express();
const port = 3000;

const errorMiddleware = (err, req, res, next) => {
  res.status(500).json({ message: "Internal Server Error" });
};

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// todoItem id 찾기
const validateTodoItemId = (req) => {
  const idAsNumber = Number(req.params.id);
  if (isNaN(idAsNumber)) {
    throw new Error("ID는 숫자여야 합니다.");
  }
  return idAsNumber;
};

// id에 맞는 todoItem 찾기
const getTodoItemById = (id) => {
  const todoItem = todoItems.find((todoItem) => todoItem.id === id);
  if (!todoItem) {
    throw new Error("해당 아이디를 가진 todoItem이 없습니다.");
  }
  return todoItem;
};

/** 할일 목록들 보여지도록 api 구현 */
app.get("/todo-items", authMiddleware, todoItemcontroller.getTodoItem);

/** 할일 목록 추가되도록 api 구현 */
app.post("/todo-items", authMiddleware, todoItemcontroller.postTodoItem);

/** 할일 한가지 조회되도록 api 구현 */
app.get("/todo-items/:id", authMiddleware, (req, res) => {
  const id = validateTodoItemId(req);

  const todoItem = getTodoItemById(id);

  res.send(todoItem);
});

/** 할일 수정 api 구현 */
app.put("/todo-items/:id", authMiddleware, (req, res) => {
  // 할일 id 가져오기
  const id = validateTodoItemId(req);

  // id에 맞는 todoItem 조회
  const existTodoItem = getTodoItemById(id);

  // id에 해당하는 todoItem의 인덱스를 확인
  const todoItemIndex = todoItems.indexOf(existTodoItem);
  // 해당 todoItem에서 doneAt을 수정
  todoItems.splice(todoItemIndex, 1, {
    ...existTodoItem,
    doneAt: existTodoItem.doneAt == null ? new Date() : null, // 삼항연산자로 표시
  });

  res.send({ result: true });
});

/** 할일 삭제 api 구현 */
app.delete("/todo-items/:id", authMiddleware, (req, res) => {
  // 할일 id 가져오기
  const id = validateTodoItemId(req);

  // id에 해당하는 인덱스 찾기
  const existTodoItem = getTodoItemById(id);
  const indexToDelete = todoItems.indexOf(existTodoItem);

  // 해당 인덱스에 있는 할일 삭제
  todoItems.splice(indexToDelete, 1);

  res.send({ result: true });
});

/** 회원가입 api 구현 */
app.post("/sign-up", usercontroller.postSignUp);

/** 로그인 api 구현 */
app.post("/sign-in", authMiddleware, usercontroller.postSignIn);

/** 토큰 검증 api 구현 */
app.get("/users/me", authMiddleware, usercontroller.getUserMe);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(port, "포트로 연결되었습니다.");
});
