import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const secretKey = "BasicClass";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) throw new Error("토큰이 없습니다.");

  req.user = jwt.verify(token, secretKey);
  next();
};

const makeId = (data) => {
  if (!data.length) return 1;

  const sortdata = data.sort((a, b) => a.id - b.id);
  for (let i = 0; i < sortdata.length; i++) {
    const id = sortdata[i].id;
    if (id !== i + 1) {
      return i + 1;
    }
  }
  return sortdata.length + 1;
};

const makeUserId = (data) => {
  if (!data.length) return 1;

  const sortdata = data.sort((a, b) => a.userId - b.userId);
  for (let i = 0; i < sortdata.length; i++) {
    const id = sortdata[i].userId;
    if (id !== i + 1) {
      return i + 1;
    }
  }
  return sortdata.length + 1;
};

const todoData = [
  {
    id: 1,
    userId: 1,
    title: "할일1",
    doneAt: "2021-08-01",
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
  {
    id: 2,
    userId: 1,
    title: "할일2",
    doneAt: "2021-08-01",
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
];

const user = [
  {
    userId: 1,
    email: "aaaa1234@naver.com",
    password: "1234",
    name: "전수원",
    role: "student",
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
];

//할일 목록 조회 api
app.get("/todo-items", (req, res) => {
  res.status(200).send(todoData);
  return;
});

//할일 목록 한개 조회 api
app.get("/todo-items/:id", (req, res) => {
  const { id } = req.params;

  const selectData = todoData.find((el) => el.id === +id);

  res.status.send(selectData);
  return;
});

//할일 목록 생성 api
app.post("/todo-items", authMiddleware, (req, res) => {
  const { title } = req.body;
  const { userId } = req.user;

  const todoitem = {
    id: makeId(todoData),
    userId,
    title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  todoData.push(todoitem);
  res.status(200).json(todoitem);
});

//할일 완료 여부
app.put("/todo-items/:id", authMiddleware, (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  const findTodoItem = todoData.find((el) => el.id === +id);
  console.log(findTodoItem);
  const changeTodoItem = {
    id,
    userId,
    title: findTodoItem.title,
    doneAt: new Date(),
    createdAt: findTodoItem.createdAt,
    updatedAt: new Date(),
  };

  res.status(200).json(changeTodoItem);
});

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
    userId: makeUserId(user),
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
