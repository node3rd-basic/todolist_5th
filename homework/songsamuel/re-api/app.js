// 1. express -> 서버 띄우기

import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

const port = 3000; // 함부로 바꾸면 안된다. why? FA랑 약속한 값이기 때문에
const app = express();

app.use(cors());
app.use(express.json());

// api 스펙을 보고 api 컨트롤러 작성

const users = [
  {
    id: 1,
    email: "thdtkandpf@naver.com",
    password: "aaaa4321",
    role: "학생",
    name: "송사무엘",
  },
];

const todoItems = [
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
    userId: 2,
    title: "할일2",
    doneAt: "2021-08-01",
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
];

// 목록들 조회
app.get("/todo-items", (req, res) => {
  // 목록을 가져오는데 무슨 목록을 가져오는것인가? 내가 작성한 것만 가져온다.
  // 그럼 로그인 한 것들 가져올 때 같이 가져온다.
  const token = req.headers.authorization;

  const user = jwt.verify(token, secretKey);

  // todoItem에서 내가 작성한 것들만 가져올 것인데 그 구분을 뭐로 하냐? userId로 한다

  // 이거 못 쓰는 이유 api 스펙이서 나온대로 가 안된다. mytodoItem = {} 이런 모습이 나오기 때문에 쓰면 안된다.
  // const mytodoItem = todoItem.filter((item) => item.userId === user.id);

  res.status(200).json(todoItems.filter((item) => item.userId === user.id));
  return;
});

// 할 일 목록 한개 조회
app.get("/todo-items/:id", (req, res) => {
  // 한개를 조회하려면 뭘 써야해? 내가 입력 받은 값을 써야해 그거 뭐다? params
  const { id } = req.params;
  const todoId = Number(id);
  // 할 일 목록 한개를 조회하려면 내 정보를 가져와야한다. = 토큰
  const token = req.headers.authorization;

  try {
    const user = jwt.verify(token, secretKey);
    const findItem = todoItems.find((item) => item.id === todoId);

    if (user.id !== findItem.userId) {
      res.status(401).json({ message: "접근 권한이 없습니다." });
      return;
    }

    res.status(200).json({ ...findItem });
    return;
  } catch (error) {
    res.status(401).json({ message: "접근 권한이 없습니다." });
    return;
  }
});

// 키워드를 통한 할 일 목록들 조회  // 지금은 안하는 것
app.get("/todo-items/search/:keyword", (req, res) => {
  return res.send("키워드를 통한 목록 조회가 완료되었습니다.");
});

// 할 일 등록
app.post("/todo-items", (req, res) => {
  // 1. 할 일을 받을 값을 req로 받는다.
  const { title } = req.body;
  const token = req.headers.authorization;
  // 2. 작성 할 수 있도록 인증을 받은 토큰을 가져온다.
  const user = jwt.verify(token, secretKey);

  const newId = todoItems[todoItems.length - 1]
    ? todoItems[todoItems.length - 1].id + 1
    : 1;

  const newItem = {
    id: newId,
    userId: user.id,
    title: title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: null,
  };

  todoItems.push(newItem);

  res.status(201).json(newItem);
  return;
});

// 할일 완료 여부 토글

app.put("/todo-items/:id", (req, res) => {
  const { id } = req.params;
  const todoId = Number(id);

  const checkTodoItem = todoItems.find((item) => item.id === todoId);
  if (!checkTodoItem) {
    res.status(400).json({ message: "틀린 id 입니다." });
  }

  const todoItemIndex = todoItems.indexOf(checkTodoItem);

  const newDoneAt = checkTodoItem.doneAt === null ? new Date() : null;

  const addtodoItem = todoItems.splice(todoItemIndex, 1, {
    ...checkTodoItem,
    doneAt: newDoneAt,
  });
  res.status(200).json({ result: true, data: addtodoItem });
});

// 할일 삭제
app.delete("/todo-items/:id", (req, res) => {
  const { id } = req.params;
  const delId = Number(id);

  const delItem = todoItems.find((item) => item.id === delId);
  if (!delItem) {
    res.status(400).json({ message: "해당 할 일이 없습니다." });
    return;
  }
  const deleteItemIndex = todoItems.indexOf(delItem);

  const deleteItem = todoItems.splice(deleteItemIndex, 1);

  res.status(200).json({ result: true, data: deleteItem });
});

const secretKey = "코딩 괴물 이연서 화이팅!.";

// 로그인
app.post("/sign-in", (req, res) => {
  // 1. req. body 받기
  const { email, password } = req.body;

  // 2. 받은 email과 password가 내 uers에 존재하는지 찾아서 확인하기
  const foundUser = users.find(
    (user) => user.email === email && user.password === password
  );

  // 내가 까먹은 것!
  const { password: _password, ...user } = foundUser;

  if (!foundUser) {
    res.status(400).json({ message: "존재하지 않는 사용자입니다." });
    return;
  }

  // 3. 내 정보가 들어간 토큰 발행하기
  const token = jwt.sign(user, secretKey);

  res.status(200).json({ message: "로그인이 성공적으로 되었습니다.", token });
  return;
});

// 회원가입
app.post("/sign-up", (req, res) => {
  // 1. 바디 데이터를 받아온다.
  const { email, password, rePassword, role, name } = req.body;

  // 2. 받아온 데이터를 다 입력했는지 확인한다.
  if (
    !email ||
    !password ||
    !rePassword ||
    !role ||
    !name ||
    password !== rePassword
  ) {
    res.status(400).json({ message: "입력값을 확인해주세요" });
  }

  // 3. 이메일이 이미 존재하는지 확인해야한다.
  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    res.status(400).json({ message: "이미 존재하는 email입니다." });
    return;
  }

  // 우리가 users를 지금 정의 안했는데 여기서 써도 되나???

  // 4. 검증 된 정보를 통해 새로운 유저를 발급해야한다.
  const newId = users.length === 0 ? 1 : users[users.length - 1].id + 1;

  // 5. 새로운 유저를 생성
  const newUser = {
    id: newId,
    email,
    password,
    role,
    name,
  };

  // 6.유저를 기존 유저에 push하기
  users.push(newUser);

  res.json({ msg: "회원가입이 완료되었습니다." });
  return;
});

// 내 정보 가져오기
app.get("/users/me", (req, res) => {
  const token = req.headers.authorization;

  //내가 작성한 코드
  // 가져온 토큰을 검증해서 거기서 내 정보를 꺼내야한다.
  const user = jwt.verify(token, secretKey);
  // 만약 잘못된 시크릿 키를 가져왔으면
  if (!user) {
    res.status(400).json({ message: "당신은 권한이 없어!" });
  }

  // 내가 작성한 코드 json({user});로 하면 undefind가 나온다. 왜냐? api 스펙을 보면 user를 풀어 헤친 모습 {}를 하면 감싼 모습!
  res.status(200).json(user);
  return;
});

app.listen(port, () => {
  console.log(`서버가 연결되었습니다.`);
});
