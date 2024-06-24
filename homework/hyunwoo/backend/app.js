import express from "express";
import cors from "cors";

// middleware 가져오기
import authMiddleware from "./middlewares/auth.middleware.js";
import levelLogMiddleware from "./middlewares/levelLog.middleware.js";
import errorMiddleware from "./middlewares/errorHandler.middleware.js";

// controller 가져오기
import * as usercontroller from "./controllers/user.controller.js";
import * as todoItemcontroller from "./controllers/todoItem.controller.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(levelLogMiddleware);
app.use(errorMiddleware);

/** 할일 목록들 보여지도록 api 구현 */
app.get("/todo-items", authMiddleware, todoItemcontroller.getTodoItems);

/** 할일 목록 추가되도록 api 구현 */
app.post("/todo-items", authMiddleware, todoItemcontroller.postTodoItem);

/** 할일 한가지 조회되도록 api 구현 */
app.get("/todo-items/:id", authMiddleware, todoItemcontroller.getTodoItem);

/** 할일 수정 api 구현 */
app.put("/todo-items/:id", authMiddleware, todoItemcontroller.putTodoItem);

/** 할일 삭제 api 구현 */
app.delete("/todo-items/:id", authMiddleware, todoItemcontroller.deleteTodoItem);

/** 회원가입 api 구현 */
app.post("/sign-up", usercontroller.postSignUp);

/** 로그인 api 구현 */
app.post("/sign-in", usercontroller.postSignIn);

/** 토큰 검증 api 구현 */
app.get("/users/me", authMiddleware, usercontroller.getUserMe);

app.listen(port, () => {
  console.log(port, "포트로 연결되었습니다.");
});
