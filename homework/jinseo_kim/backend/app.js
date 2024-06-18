import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

const port = 3000;
const app = express();
const secretKey = "1a2b3c4b";

app.use(cors());
app.use(express.json());
app.listen(port, () => {
  console.log(`서버오픈, ${port} 포트`);
});

const users = [
  {
    id: 1,
    email: "1111",
    password: "1111",
    role: "student",
    name: "1111",
  },
  {
    id: 2,
    email: "2222",
    password: "2222",
    role: "student",
    name: "2222",
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
    title: "할일1",
    doneAt: null,
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
  {
    id: 3,
    userId: 1,
    title: "할일1",
    doneAt: null,
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
  {
    id: 4,
    userId: 1,
    title: "할일1",
    doneAt: null,
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
  {
    id: 5,
    userId: 2,
    title: "할일2",
    doneAt: null,
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
  {
    id: 6,
    userId: 2,
    title: "할일2",
    doneAt: null,
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
  {
    id: 7,
    userId: 2,
    title: "할일2",
    doneAt: null,
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
  {
    id: 8,
    userId: 2,
    title: "할일2",
    doneAt: null,
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
];

// 회원가입 API
app.post("/sign-up", (req, res) => {
  const { email, password, rePassword, role, name } = req.body;
  if (!email || !password || !rePassword || !role || !name) {
    res.status(400).send({ message: "입력필드의 필수값이 누락되었습니다." });
    return;
  }
  const extUser = users.find((usr) => usr.email === email);
  if (extUser) {
    res.status(409).send({ message: "email이 중복입니다." });
    return;
  }
  if (password !== rePassword) {
    res.status(400).send({ message: "비밀번호를 확인해주세요." });
    return;
  }
  const id = users.length === 0 ? 1 : users[users.length - 1].id + 1;
  const newUser = { email, password, role, name, id };
  users.push(newUser);
  res.send({ message: "회원가입에 성공했습니다." });
  console.log(newUser);
});

// 로그인 API
app.post("/sign-in", (req, res) => {
  const { email, password } = req.body;
  const findUser = users.find((findUsr) => findUsr.email === email);
  if (!findUser) {
    res.status(404).send({ message: "사용자가 존재하지 않습니다" });
    return;
  }
  if (findUser.password !== password) {
    res.status(401).send({ message: "비밀번호가 일치하지 않습니다" });
    return;
  }
  const { password: _password, ...user } = findUser;
  const token = jwt.sign(user, secretKey);
  res.status(200).send({ token });
});

// 내정보 API
app.get("/users/me", (req, res) => {
  const token = req.headers.authorization;
  try {
    const user = jwt.verify(token, secretKey);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).send({ message: "당신은 권한이 없습니다." });
  }
});

// 할일 목록들 조회 API
app.get("/todo-items", (req, res) => {
  const token = req.headers.authorization;
  try {
    const user = jwt.verify(token, secretKey);
    res.send(
      todoItems.filter((todoItem) => todoItem.userId === Number(user.id))
    );
  } catch (error) {
    res.status(401).send({ message: "당신은 권한이 없습니다." });
  }
});

// 할일 등록 API
app.post("/todo-items", (req, res) => {
  const token = req.headers.authorization;
  try {
    const user = jwt.verify(token, secretKey);
    const { title } = req.body;
    const newTodoId =
      todoItems.length === 0 ? 1 : todoItems[todoItems.length - 1].id + 1;

    const newTodoItem = {
      id: newTodoId,
      userId: Number(user.id),
      title,
      doneAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    todoItems.push(newTodoItem);

    res.send(newTodoItem);
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "당신은 권한이 없습니다." });
  }
});

// 할일 삭제 API
app.delete("/todo-items/:id", (req, res) => {
  const token = req.headers.authorization;
  try {
    const user = jwt.verify(token, secretKey);
    const { id } = req.params;
    const deleteItem = todoItems.findIndex(
      (todoItem) => todoItem.id === Number(id)
    );
    if (deleteItem === -1) {
      res.status(404).send({ message: "할일을 찾을 수 없습니다." });
      return;
    }
    if (todoItems[deleteItem].userId !== user.id) {
      res.status(401).send({ message: "당신은 권한이 없습니다." });
      return;
    }
    todoItems.splice(deleteItem, 1);
    res.send({ result: "true" });
  } catch (error) {
    res.status(401).send({ message: "에러가 발생했습니다." });
  }
});

// 할일 완료/미완료 API
app.put("/todo-items/:id", (req, res) => {
  const token = req.headers.authorization;
  try {
    const user = jwt.verify(token, secretKey);
    const { id } = req.params;
    const selectItemIndex = todoItems.findIndex((sel) => sel.id === Number(id));
    if (selectItemIndex === -1) {
      res.status(404).send({ message: "할일을 찾을 수 없습니다." });
      return;
    }
    if (todoItems[selectItemIndex].userId !== user.id) {
      res.status(401).send({ message: "당신은 권한이 없습니다." });
      return;
    }
    const selectItem = todoItems.find((sel) => sel.id === Number(id));
    const putItem = {
      ...selectItem,
      doneAt: selectItem.doneAt == null ? new Date() : null,
    };
    console.log(selectItem);
    todoItems.splice(selectItemIndex, 1, putItem);
    res.status(200).send({ result: "true" });
  } catch (error) {
    res.status(401).send({ message: "에러가 발생했습니다." });
  }
});

// 할일 상세 조회 API
app.get("/todo-items/:id", (req, res) => {
  res.send({ message: "할일 상세조회다." });
});

// 할일 목록들 조회 API
app.get("/todo-items/search/:keyword", (req, res) => {
  res.send({ message: "할일 상세조회다." });
});
