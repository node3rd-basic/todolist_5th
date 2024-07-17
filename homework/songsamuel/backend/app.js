import "dotenv/config";
import express from "express";
import cors from "cors"; // 프론트랑 통신 잘하기 위한 용도 / 다른 서버에서 우리 백엔드 서버랑 연결할 수 있도록 해주는 용도

// middleware
import leaveLog from "./middlewares/leaveLogMiddleware.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

// Router import
import userRouter from "./router/user.router.js";
import todoItemRouter from "./router/todoItems.router.js";

// 나의 통신가능한 프로그램을 정의
const app = express();
const port = 3000;

app.use(cors());
// 브라우져나 express에서 받은 데이터들을 (ex) req.body 데이터들 ) json으로 바꾸기 위해서 사용
app.use(express.json());

app.use(leaveLog); // 모든 요청에 대해서 로그가 찍히게 만든다.
// 이것을 안쓰면 데이터를 읽지 못한다.

app.use("/", userRouter);
app.use("/todo-items", todoItemRouter);

// 여기에 app.use가 있는 이유 위의 코드들이 에러가 발생했을 때 순차적으로 아래로 향해서 코드가 실행 되어야 쓸모없는 움직임이 덜하기 때문
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
