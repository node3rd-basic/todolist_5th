//**기본 세팅 : yarn 설치 : 안했다면

// //**기본세팅1 : import , app
// import express from "express";
// import cors from "cors";
// import jwt from "jsonwebtoken";
// import authMiddleware from "./middlewares/authMiddleware.js";

// //db
// import users from "./db/users.js";
// import todoItems from "./db/todoitems.js";
// //controller
// import * as todoItemsController from "./controller/todoitems.controller.js";
// import * as usersController from "./controller/users.controller.js";

// const app = express();
// const PORT = 3000;

// app.get("/", (req, res) => {
//   res.send("hello");
// });
// console.log(users);
// console.log(todoItems);
// app.use(cors());
// app.use(express.json());
// app.use(authMiddleware);

// const secretkey = "rqjghakrovfdinvczfw";

// //**회원가입 : 주소, 필요정보 기입할 것 : email, password, rePassword, role, name
// app.post("/sign-up", usersController.postSignUp);
// //**로그인 : 주소, body : email, password
// app.post("/sign-in", usersController.postSignIn);

// //**인증 토큰으로 인증; 헤더
// app.get("/users/me", authMiddleware, usersController.getUserMe);

// //**할일목록 - 등록 //함수자체를 보내야함. '실행결과()' 말고
// app.post("/todo-items", authMiddleware, todoItemsController.postTodoItem);
// //**할일목록 - 목록조회: 그런데 내 아잉디를 n가지고 있는 ; 토큰;토큰이 유효하지 않다면?:서버꺼지지않게
// app.get("/todo-items", authMiddleware, todoItemsController.getTodoItems);
// //**할잉ㄹ목록 - 목록1개 조회 : 내 아이디에서 목록번호1개:id
// app.get("/todo-items/:id", authMiddleware, todoItemsController.getTodoItem);
// //** 할일목록- 수정:id/업데이트 메서드 : 내 아이디, 내가 원하는 수정목록1개
// app.put("/todo-items/:id", authMiddleware, todoItemsController.putTodoItem);

// //**할일목록 - 삭제:id/삭제하는 메서드
// app.delete("/todo-items/:id", authMiddleware, todoItemsController.delTodoItem);

// //미들웨어 하나 만들기

// app.listen(PORT, () => {
//   console.log(PORT, "포트열림:)");
// });

//
//**기본 세팅 : yarn 설치 : 안했다면

//**기본세팅1 : import , app
import express from "express";
import "dotenv/config";
import cors from "cors";
import jwt from "jsonwebtoken";
import authMiddleware from "./middlewares/authMiddleware.js";

//db
import users from "./db/users.js";
import todoItems from "./db/todoitems.js";
//controller
import * as todoItemsController from "./controller/todoitems.controller.js";
import * as usersController from "./controller/users.controller.js";
import errorMiddleware from "./middlewares/error.Middleware.js";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("hello");
});

app.use(cors());
app.use(express.json());
app.use(errorMiddleware);

//**회원가입 : 주소, 필요정보 기입할 것 : email, password, rePassword, role, name
app.post("/sign-up", usersController.postSignUp);
// //**로그인 : 주소, body : email, password
app.post("/sign-in", usersController.postSignIn);

//**인증 토큰으로 인증; 헤더

app.get("/users/me", authMiddleware, usersController.getUserMe);
//**할일목록 - 등록
app.post("/todo-items", authMiddleware, todoItemsController.postTodoItem);

//**할일목록 - 목록조회: 그런데 내 아잉디를 가지고 있는 ; 토큰;토큰이 유효하지 않다면?:서버꺼지지않게
app.get("/todo-items", authMiddleware, todoItemsController.getTodoItems);

//**할잉ㄹ목록 - 목록1개 조회 : 내 아이디에서 목록번호1개:id
app.get("/todo-items/:id", authMiddleware, todoItemsController.getTodoItem);
//** 할일목록- 수정:id/업데이트 메서드 : 내 아이디, 내가 원하는 수정목록1개
app.put("/todo-items/:id", authMiddleware, todoItemsController.putTodoItem);

//**할일목록 - 삭제:id/삭제하는 메서드
app.delete("/todo-items/:id", authMiddleware, todoItemsController.delTodoItem);

//미들웨어 하나 만들기

app.listen(PORT, () => {
  console.log(PORT, "포트열림:)");
});
