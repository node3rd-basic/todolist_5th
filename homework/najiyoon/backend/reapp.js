//**기본 세팅 : yarn 설치 : 안했다면

//**기본세팅1 : import , app
import express from "express";
import "dotenv/config";
import cors from "cors";
import userRouter from "./router/user.router.js";
import todoitemRouter from "./router/todoitem.router.js";

import errorMiddleware from "./middlewares/error.Middleware.js";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("hello");
});

app.use(cors());
app.use(express.json());

app.use("/", userRouter);
app.use("/todo-items", todoitemRouter);
//라우터에서 에러가 나면 뒤늦게 실행되므로 라우터 밑에 넣기
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(PORT, "포트열림:)");
});
