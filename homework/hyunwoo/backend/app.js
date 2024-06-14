import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const todoItems = [
  {
    id: 1,
    userId: 1,
    title: "베이직반 과제",
    doneAt: null,
    createdAt: new Date(),
    updatedAt: null,
  },
  {
    id: 2,
    userId: 2,
    title: "팀프로젝트",
    doneAt: null,
    createdAt: new Date(),
    updatedAt: null,
  },
  {
    id: 3,
    userId: 3,
    title: "알고리즘 코드카타",
    doneAt: null,
    createdAt: new Date(),
    updatedAt: null,
  },
  {
    id: 4,
    userId: 4,
    title: "Node.js 공부",
    doneAt: null,
    createdAt: new Date(),
    updatedAt: null,
  },
  {
    id: 5,
    userId: 5,
    title: "청소",
    doneAt: null,
    createdAt: new Date(),
    updatedAt: null,
  },
];

const secretKey = "slkfjslkdfjoie";
const users = [
  {
    id: 1,
    email: "hyunwoo@example.com",
    password: "1234",
    role: "student",
    name: "이현우",
  },
];

// token 인증 미들웨어 함수
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    req.user = jwt.verify(token, secretKey);
    next();
  } catch (error) {
    res.status(401).send({ messagae: "권한이 없습니다." });
  }
};

/** 할일 목록들 보여지도록 api 구현 */
app.get("/todo-items", authMiddleware, (req, res) => {
    const user = req.user;
    res.send(todoItems.filter((todoItem) => todoItem.userId === user.id));
  }
);

/** 할일 목록 추가되도록 api 구현 */
app.post("/todo-items", authMiddleware, (req, res) => {
  const user = req.user;
  const { title } = req.body;

    const newId = todoItems[todoItems.length - 1]
      ? todoItems[todoItems.length - 1].id + 1
      : 1;

    const newTodoItem = {
      id: newId,
      userId: user.id,
      title,
      doneAt: null,
      createdAt: new Date(),
      updatedAt: null,
    };

    todoItems.push(newTodoItem);

    res.send(newTodoItem);
});

/** 할일 한가지 조회되도록 api 구현 */
app.get("/todo-items/:id", authMiddleware, (req, res) => {
  const id = Number(req.params.id);

  const todoItem = todoItems.find((todoItem) => todoItem.id === id);

  res.send(todoItem);
});

/** 할일 수정 api 구현 */
app.put("/todo-items/:id", authMiddleware, (req, res) => {
  // 할일 id 가져오기
  const id = Number(req.params.id);
  // id가 숫자가 아닌 경우
  if (isNaN(id)) {
    res.status(400).send({
      result: false,
      message: "id는 숫자여야 합니다.",
    });
    return;
  }

  // id에 맞는 todoItem 조회
  const existTodoItem = todoItems.find((todoItem) => todoItem.id === id);
  // todoItem이 없는 경우
  if (!existTodoItem) {
    res.status(404).send({
      resule: false,
      message: "해당 아이디를 가진 todoItem이 없습니다.",
    });
    return;
  }

  // id에 해당하는 todoItem의 인덱스를 확인
  const todoItemIndex = todoItems.indexOf(existTodoItem);
  // 해당 todoItem에서 doneAt을 수정
  todoItems.splice(todoItemIndex, 1, {
    ...existTodoItem,
    doneAt: existTodoItem.doneAt == null ? new Date() : null, // 삼항연산자로 표시
  });

  res.send({ result: true });
});

/** 할일 삭제 api 구현 */
app.delete("/todo-items/:id", authMiddleware, (req, res) => {
  // 할일 id 가져오기
  const id = Number(req.params.id);
  // id가 숫자가 아닌 경우
  if (isNaN(id)) {
    res.status(400).send({
      resule: false,
      message: "id는 숫자여야 합니다.",
    });
    return;
  }

  // id에 해당하는 인덱스 찾기
  const indexToDelete = todoItems.findIndex((todoItem) => todoItem.id === id);

  // 해당 인덱스가 없으면 -1로 반환되어 마지막 할일이 지워지는 것 방지
  if (indexToDelete === -1) {
    res.status(404).send({
      result: false,
      message: "해당 아이디를 가진 todoItem이 없습니다.",
    });
    return;
  }

  // 해당 인덱스에 있는 할일 삭제
  todoItems.splice(indexToDelete, 1);

  res.send({ result: true });
});

/** 회원가입 api 구현 */
app.post("/sign-up", (req, res) => {
  const { email, password, rePassword, role, name } = req.body;

  if (!email || !password || !rePassword || !role || !name) {
    res.status(400).send({
      result: false,
      message: "모든 항목을 입력해주세요.",
    });
    return;
  }

  if (password !== rePassword) {
    res.status(400).send({
      resule: false,
      message: "입력한 비밀번호가 일치하지 않습니다.",
    });
    return;
  }

  const existingEmail = users.find((user) => user.email === email);

  if (existingEmail) {
    res.status(409).send({
      result: false,
      message: "이미 등록된 이메일입니다.",
    });
  }

  const id = users.length === 0 ? 1 : users[users.length - 1].id + 1;

  const newUser = {
    id,
    email,
    password,
    role,
    name,
  };
  console.log(newUser);
  users.push(newUser);
  console.log(users);
  res.status(200).json(newUser);
});

/** 로그인 api 구현 */
app.post("/sign-in", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send({
      result: false,
      message: "모든 항목을 입력해주세요",
    });
  }

  const { password: _password, ...user } = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    res.status(404).send({
      result: false,
      message: "회원 정보가 존재하지 않습니다",
    });
    return;
  }

  const token = jwt.sign(user, secretKey);
  res.status(200).json({ token });
});

/** 토큰 검증 api 구현 */
app.get("/users/me", authMiddleware, (req, res) => {
  res.json(req.user);
});

app.listen(port, () => {
  console.log(port, "포트로 연결되었습니다.");
});
