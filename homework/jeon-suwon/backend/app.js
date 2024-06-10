import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

const secretKey = "basic";
const tododata = [
  {
    id: 1,
    userId: 1,
    title: "TIL작성하기",
    doneAt: null,
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
  {
    id: 2,
    userId: 1,
    title: "과제하기",
    doneAt: "2021-08-01",
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
  {
    id: 2,
    userId: 2,
    title: "과제하기",
    doneAt: "2021-08-01",
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
];

const users = [
  {
    userId: 1,
    email: "aaaa1234@naver.com",
    password: "1234",
    name: "전수원",
    role: "student",
  },
];

//id 생성
const makeid = (data) => {
  for (let i = 0; i < data.length; i++) {
    const id = data[i].id;
    if (!id) {
      return 1;
    } else if (id !== i + 1) {
      return i + 1;
    }
    return id + 1;
  }
};

const makeuserid = (data) => {
  for (let i = 0; i < data.length; i++) {
    const id = data[i].userId;
    if (!id) {
      return 1;
    } else if (id !== i + 1) {
      return i + 1;
    }
    return id + 1;
  }
};

// 조회API

app.get("/todo-items", (req, res) => {
  res.send(tododata);
});

// 추가API

app.post("/todo-items", (req, res) => {
  const { title } = req.body;

  const items = {
    id: makeid(tododata),
    userId: 1,
    title: title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  tododata.push(items);
  return res.send(items);
});

//특정todolist/API조회
app.get("/todo-items/:id", (req, res) => {
  const id = Number(req.params.id);

  const selectdata = tododata.find((el) => el.id === id);

  res.send(selectdata);
});

//변경API
app.post("/todo-items/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title } = req.body;

  const selectData = tododata.findIndex((el) => el.id === id);
  if (selectData === -1) {
    return res.json({ message: "없는 Id입니다." });
  }

  const changeData = {
    id: id,
    userId: 1,
    title: title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  tododata.splice(selectData, 1, changeData);

  return res.json({ changeData });
});

//삭제API
app.delete("/todo-items/:id", (req, res) => {
  const id = Number(req.params.id);

  const selectData = tododata.findIndex((el) => el.id === id);
  if (selectData === -1) {
    return res.json({ message: "없는 Id입니다." });
  }

  tododata.splice(selectData, 1);
  return res.json({ massege: "정상적으로 삭제되었습니다." });
});

//회원가입 api
app.post("/sign-up", (req, res) => {
  const { email, name, password, rePassword, role } = req.body;

  if (!email || !name || !password || !rePassword || !role)
    res.status(400).send({ message: "정보를 확인해 주세요." });
  if (password !== rePassword)
    res
      .status(400)
      .send({ message: "password와 re-password가 일치하지않습니다." });

  const existUser = users.find((el) => el.email === email);

  if (existUser)
    res.status(409).send({ message: "이미 존재하는 이메일입니다." });
  const user = {
    userId: makeuserid(users),
    email,
    name,
    password,
    role,
  };
  users.push(user);
  return res
    .status(200)
    .send({ message: "정상적으로 회원가입을 완료했습니다.", data: user });
});

app.post("/sign-in", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    res.status(400).send({ message: "email, password를 입력해주세요" });

  const finduser = users.find((el) => el.email === email);
  if (!finduser)
    res
      .status(409)
      .send({ message: "회원가입되어있는 유저를 찾을수없습니다." });
  if (finduser.password !== password)
    res.status(400).send({ message: "password가 일치하지않습니다." });
  const token = jwt.sign(finduser, secretKey, { expiresIn: "10s" });
  res.json({ token });
});

//인증
app.get("/users/me", (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) res.status(401).send({ message: "토큰이 없습니다." });
  try {
    const user = jwt.verify(token, secretKey);
    console.log(user);
    res.json(user);
  } catch (e) {
    res.status(401).send({ message: "권한이 없습니다." });
  }
});

//user list api 전체 조회
app.get("/todo-items/user/:userId", (req, res) => {
  const userId = Number(req.params.userId);

  const selectdata = tododata.filter((el) => el.userId === userId);

  res.send(selectdata);
});

app.listen(PORT, () => {
  console.log(`${PORT}포트번호에 연결되었습니다.`);
});
