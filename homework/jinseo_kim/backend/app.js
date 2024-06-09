// Express 설정
import express from "express";
import jwt from "jsonwebtoken";
const app = express();
const port = 3000;
const secretKey = "a1b2c3d4";

// CORS 설정
import cors from "cors";
app.use(cors());

// JSON 형식의 요청 본문파싱
app.use(express.json());

// Express 실행
app.listen(port, () => {
  console.log(`${port}로 서버가 열렸습니다!`);
});

// 할일목록 전역변수 선언 및 데이터 할당
const todoItems = [
  {
    id: 1,
    userId: 1,
    title: "SA 작성",
    doneAt: null,
    createdAt: new Date(),
    updatedAt: null,
  },
  {
    id: 2,
    userId: 2,
    title: "API 명세서 작성 ",
    doneAt: null,
    createdAt: new Date(),
    updatedAt: null,
  },
  {
    id: 3,
    userId: 3,
    title: "와이어프레임 작성",
    doneAt: null,
    createdAt: new Date(),
    updatedAt: null,
  },
  {
    id: 4,
    userId: 4,
    title: "API 할당",
    doneAt: null,
    createdAt: new Date(),
    updatedAt: null,
  },
  {
    id: 5,
    userId: 5,
    title: "기능구현",
    doneAt: null,
    createdAt: new Date(),
    updatedAt: null,
  },
  {
    id: 6,
    userId: 6,
    title: "프로젝트 테스트",
    doneAt: null,
    createdAt: new Date(),
    updatedAt: null,
  },
  {
    id: 7,
    userId: 7,
    title: "퍼블리싱",
    doneAt: null,
    createdAt: new Date(),
    updatedAt: null,
  },
];

// LocalHost:3000 접속시 Hello World 출력
app.get("/", (req, res) => {
  res.send("Hello, World?, i am express");
});

// app.get 할일목록 전체조회
app.get("/todo-items", (req, res, next) => {
  return res.send(todoItems);
});

// app.get /todo-items/:id 할일목록 상세조회
app.get("/todo-items/:id", (req, res) => {
  const id = Number(req.params.id);
  // 요청된(/todo-items/:id 로 들어온 값) 값을 Number로 변환 하고 id변수에 담는다
  const todoItem = todoItems.find((todoItem) => todoItem.id === id);
  // 위에서 저장된 id값과 전역변수로 지정된 todoItems배열을 순회하며
  // 일치하는 첫번째 값을 찾고 todoItem 상수에 저장한다.
  res.send(todoItem);
  // todoItem 상수값을 res.send로 보낸다.
});

// app.post 로 할일목록 생성하기
app.post("/todo-items", (req, res) => {
  const { title } = req.body;
  // 클라이언트로 부터 받은 요청에서 title 속성을 구조분해할당을 통해 추출한다.

  const newId = todoItems[todoItems.length - 1]
    ? // todoItems의 길이에서 -1을 한다, 즉 todoItems 배열의 길이, 마지막 항목을 나타낸다.
      todoItems[todoItems.length - 1].id + 1
    : 1;
  // 삼항연산자를 사용하여 배열의 길이가 있다면 +1을, 배열의 길이가 없다면 1을 할당한다.

  const newTodoItem = {
    id: newId,
    userId: 1,
    title: title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: null,
  };
  // 새로운 할일목록 객체를 생성한다.
  todoItems.push(newTodoItem);
  // 전역변수로 지정된 todoItems에 새롭게 생성한 할일객체를 push 한다
  res.send(newTodoItem);
  // 새롭게 생성한 할일객체를 res.send로 보낸다.
});

const users = [
  {
    id: 1,
    email: "test@mail.com",
    password: "001234",
    name: "testuser",
    role: "student",
  },
];

app.post("/sign-up", (req, res) => {
  // 일단 req body를 통해 email / name / password / repassword / role 을 받는다
  // 그리고 이 내용을 const 에 담는다. 어떻게? 구조분해 할당으로
  const { name, email, password, repassword, role } = req.body;

  // 그리고 이 필드 중에 없는게 있는지 검사한다.
  if (!name || !email || !password || !repassword || !role) {
    res.status(400).send({
      message: "잘못된 입력값이 있습니다. 값을 다시한번 확인인 해보세요",
    });
    return;
  }

  // 그리고 이 필드 중에 email 필드의 데이터가 중복이 아닌지 검사한다. if가 아니고 cosnt = extinguser 이런걸로
  const exisUser = users.email;
  if (exisUser === email) {
    res.status(400).send({
      message: "이미 가입된 사용자 입니다.",
    });
    return;
  }

  // password 가 repasswrd 랑 맞는지 확인하기.
  if (password !== repassword) {
    res.status(400).send({
      message: "비밀번호가 일치하지 않아요.",
    });
    return;
  }

  // 그리고 newuser에 담는다.
  const newuser = {
    id: 1,
    name: name,
    email: email,
    password: password,
    repassword: repassword,
    role: role,
  };

  // 그리고 users 배열에 newuser를 push 한다.
  users.push(newuser);
  console.log(users);

  // 그리고 newuser를 res.send로 보낸다.
  res.send(newuser);
});

console.log(users);

// Git Test
