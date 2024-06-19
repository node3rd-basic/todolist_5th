import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import * as todoitemContoller from "./controllers/todoitem.controller.js";
import { authMiddleware } from "./middleware/auth.middleware.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//할일 목록 조회 api
app.get("/todo-items", todoitemContoller.getTodolists);

//할일 목록 한개 조회 api
app.get("/todo-items/:id", todoitemContoller.getTodolist);

//할일 목록 생성 api
app.post("/todo-items", authMiddleware, todoitemContoller.postTodoitem);

//할일 완료 여부
app.put("/todo-items/:id", authMiddleware, todoitemContoller.putTodoitem);
//할일목록삭제
app.delete("/todo-items/:id", authMiddleware, todoitemContoller.deleteTodoitem);

//회원가입
app.post("/sign-up", (req, res) => {
  const { email, password, rePassword, role, name } = req.body;
  const emailExist = user.find((el) => el.email === email);

  if (emailExist) {
    res.status(400).send({ message: "존재하는 이메일입니다." });
    return;
  }
  if (password !== rePassword) {
    res.status(409).send({ message: "두 패스워드가 일치하지 않습니다." });
    return;
  }

  const userInfo = {
    userId: user.length > 0 ? user[user.length - 1].userId + 1 : 1,
    email,
    password,
    name,
    role,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  user.push(userInfo);
  res.status(200).send({ message: "회원가입이 완료되었습니다." });
  return;
});

app.post("/sign-in", (req, res) => {
  const { email, password } = req.body;

  const findUser = user.find((el) => el.email === email);
  if (!findUser) {
    res.status(400).json({ message: "회원유저가 존재하지않습니다." });
    return;
  }
  if (findUser.password !== password) {
    res.status(409).json({ message: "패스워드가 일치하지않습니다." });
  }

  const token = jwt.sign(findUser, secretKey);
  res.status(200).json({ token });
  return;
});

app.get("/users/me", authMiddleware, (req, res) => {
  const userInfo = req.user;

  res.status(200).json(userInfo);
  return;
});

app.listen(PORT, () => {
  console.log(`${PORT}번의 포트가 열렸습니다.`);
});
