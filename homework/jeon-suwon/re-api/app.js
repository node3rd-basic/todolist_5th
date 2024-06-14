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

const makeid = (data) => {
  for (let i = 0; i < data.length; i++) {
    const id = data[i].id;
    if (!id) {
      return 1;
    } else if (id !== i + 1) {
      return i + 1;
    }
  }
  return id + 1;
};

const makeUserId = (data) => {
  for (let i = 0; i < data.length; i++) {
    const id = data[i].userid;
    if (!id) {
      return 1;
    } else if (id !== i + 1) {
      return i + 1;
    }
  }
  return id + 1;
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
  res.send({ data: todoData });
  return;
});

//할일 목록 한개 조회 api
app.get("/todo-items/:id", (req, res) => {
  const { id } = req.params;

  const selectData = todoData.find((el) => el.id === +id);

  res.send({ data: selectData });
  return;
});

//할일 목록 등록
app.post("todo-items", (req, res) => {
  const { title } = req.body;
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
