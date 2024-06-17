// 코딩 연습 파일
import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();
const port = 3000;
const secretKey = "1a2b3c4d";
app.use(cors());
app.use(express.json());
app.listen(port, () => {
  console.log(`서버오픈 ${port} 포트`);
});

const users = [
  {
    id: 1,
    email: "1111",
    password: "1111",
    name: "1111",
    role: "student",
  },
];
const todoItems = [
  {
    id: 1,
    userId: 1,
    title: "할일1",
    doneAt: null,
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
  {
    id: 2,
    userId: 1,
    title: "할일2",
    doneAt: null,
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
];

// 회원가입 API //
app.post("/sign-up", (req, res) => {
  // api spec 을 통해 req.body 에서 받아야 하는 값을 확인한다.
  // email password rePassword role name
  const { email, password, rePassword, role, name } = req.body;

  // 비어있는 칸이 없는지 확인하는 로직을 작성한다.
  if (!email || !password || !rePassword || !role || !name) {
    res.status(408).send({ message: "비어있는 칸이 있습니다. 확인해주세요." });
    return;
  }

  // 비밀번호가 서로 일치하는지 확인하는 로직을 작성한다.
  if (password !== rePassword) {
    res
      .status(400)
      .send({ message: "비밀번호 확인이 일치하지 않습니다. 확인해주세요." });
    return;
  }

  // 회원가입시 EMAIL이 중복되는지 확인하는 로직을 작성한다.
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    res.status(409).send({ message: "이미 가입된 이메일 입니다." });
    return;
  }

  // 위의 모든 로직을 통과했을 경우, userId의 값을 초기화 또는 증가 시키는 로직을 작성한다.
  // 아직 구현안함, 패쓰
  const id = users.length === 0 ? 1 : users[users.length - 1].id + 1;

  // 회원가입을 완료하고, users = [] 에 넣는다.
  const newUser = { email, password, rePassword, role, name, id };
  users.push(newUser);

  // 위의 모든 로직을 통과했을 경우, 회원가입에 성공했다는 응답을 보낸다.
  res.status(200).send({ message: "회원가입 성공이다" });
  console.log(newUser);
});

app.post("/sign-in", (req, res) => {
  // req.body 에서 email, password 를 받아서 저장한다.
  const { email, password } = req.body;
  // password 를 제외하여 새로운 user 배열에 담는데, 이 값은 users 에서 find 하여 일치한 값이다.
  // users 배열을 순회하여 찾은 값중 email과 password가 일치하는 사용자를user에 담는다.
  const { password: _password, ...user } = users.find(
    (usr) => usr.email === email && usr.password === password
  );
  // token 을 json으로 응답한다.
  res.json({ token: jwt.sign(user, secretKey) });
});

app.get("/users/me", (req, res) => {
  const token = req.headers.authorization;

  try {
    const user = jwt.verify(token, secretKey);
    res.json(user);
  } catch (e) {
    res.status(401).send({ message: "권한이 없습니다." });
  }
});

app.get("/todo-items", (req, res) => {
  const token = req.headers.authorization;

  try {
    const user = jwt.verify(token, secretKey);
    res.send(todoItems.filter((todoItem) => todoItem.userId === user.id));
  } catch (e) {
    res.status(401).send({ message: "권한이 없습니다." });
  }
});

app.put("/todo-items/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).send({ message: "id 는 숫자여야 합니다." });
    return;
  }

  const selectedTodoItem = todoItems.find((todoItem) => todoItem.id === id);
  if (!selectedTodoItem) {
    res
      .status(404)
      .send({ message: "해당 아이디를 가진 todo item 이 없습니다." });
    return;
  }

  const todoItemIndex = todoItems.indexOf(selectedTodoItem);
  todoItems.splice(todoItemIndex, 1, {
    ...selectedTodoItem,
    doneAt: selectedTodoItem.doneAt == null ? new Date() : null,
  });
  res.send({ result: true });
});
