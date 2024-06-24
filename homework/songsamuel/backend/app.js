import express from "express";
import cors from "cors";

// middleware
import authMiddleware from "./middlewares/auth.Middleware.js";
import leaveLog from "./middlewares/leaveLogMiddleware.js";

//Controller
import * as todoItemController from "./controllers/todoitem.controller.js";
import * as userController from "./controllers/user.controller.js";

// 나의 통신가능한 프로그램을 정의
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // 브라우져나 express에서 받은 데이터들을 (ex) req.body 데이터들 ) json으로 바꾸기 위해서 사용

app.use(leaveLog); // 모든 요청에 대해서 로그가 찍히게 만든다.
// 이것을 안쓰면 데이터를 읽지 못한다.

// 에러처리 미들웨어!
const errorMiddleware = (err, req, res, next) => {
  res.status(500).json({
    message: "Internal Server Error",
  });
};

// 목록 조회 API 만들기
app.get("/todo-items", authMiddleware, todoItemController.getTodoItems);

// 목록 추가 API
app.post("/todo-items", authMiddleware, todoItemController.postTodoItem);

// 목록 상세 조회 API
app.get("/todo-items/:id", authMiddleware, todoItemController.getTodoItem);

// 목록 수정 APi (7차 강의)
app.put("/todo-items/:id", authMiddleware, todoItemController.putTodoItem);

// 할 일 목록들 중 하나 삭제 API
app.delete(
  "/todo-items/:id",
  authMiddleware,
  todoItemController.deleteTodoItem
);

// 회원가입 api
app.post("/sign-up", userController.postSignUp);

//로그인 APi
app.post("/sign-in", userController.postSignIn);

// 내 정보 조회
app.get("/users/me", authMiddleware, userController.getUserMe);

// 여기에 app.use가 있는 이유 위의 코드들이 에러가 발생했을 때 순차적으로 아래로 향해서 코드가 실행 되어야 쓸모없는 움직임이 덜하기 때문
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
