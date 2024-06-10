// 라이브러리 import 설정
import express from "express";
import jwt from "jsonwebtoken";

// 전역변수 설정
const app = express();
const port = 3000;
const secretKey = "a1b2c3d4";

// CORS 검증 설정
import cors from "cors";
app.use(cors());

// JSON 형식의 요청 본문파싱
app.use(express.json());

// Express 로 웹서버 오픈
app.listen(port, () => {
  console.log(`${port}로 서버가 열렸습니다!`);
});

// 회원목록 전역변수 선언 및 데이터 할당
const users = [
  {
    id: 1,
    email: "test@mail.com",
    password: "001234",
    name: "testuser",
    role: "student",
  },
];

// 할일목록 전역변수 선언 및 데이터 할당
const todoItems = [
  {
    id: 1,
    userId: 1,
    title: "SA 작성",
    doneAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    userId: 2,
    title: "API 명세서 작성 ",
    doneAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    userId: 3,
    title: "와이어프레임 작성",
    doneAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    userId: 4,
    title: "API 할당",
    doneAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    userId: 5,
    title: "기능구현",
    doneAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    userId: 6,
    title: "프로젝트 테스트",
    doneAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 7,
    userId: 7,
    title: "퍼블리싱",
    doneAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// LocalHost:3000 접속시 Hello World 출력
app.get("/", (req, res) => {
  res.send("Hello, World?, i am express");
});


// LocalHost:3000/check 접속시 Server Opserver 실행
app.get("/check", (req, res) => {
  // .send("STATUS: 200, Server is running on http://localhost:3000");
  res.status(200).send(`
      <html>
        <body style="background-color: green;">
          <h1 style="color: red;">Server Opserver</h1>
          <h2 style="color: red;">STATUS: 200</h2>
          <h2 style="color: red;">Server is running on http://localhost:3000</h2>
        </body>
      </html>
    `);
});

app.post("/sign-up", (req, res) => {
  // 일단 req body를 통해 email / name / password / repassword / role 을 받는다
  // 그리고 이 내용을 const 에 담는다. 어떻게? 구조분해 할당으로
  const { email, password, rePassword, role, name } = req.body;

  // 그리고 이 필드 중에 없는게 있는지 검사한다.
  if (!email || !password || !rePassword || !role || !name) {
    res.status(400).send({
      message: "잘못된 입력값이 있습니다. 값을 다시한번 확인인 해보1세요",
    });
    return;
  }

  // 그리고 이 필드 중에 email 필드의 데이터가 중복이 아닌지 검사한다. if가 아니고 cosnt = extinguser 이런걸로
  const existUser = users.find((user) => user.email === email);
  if (existUser) {
    res.status(409).json({ message: "이미 가입된 이메일 입니다." });
  }

  // password 가 repasswrd 랑 맞는지 확인하기.
  if (password !== rePassword) {
    res.status(400).send({
      message: "비밀번호가 일치하지 않아요.",
    });
    return;
  }

  // 그리고 newuser에 담는다.
  const newuser = {
    id: 1,
    email: email,
    password: password,
    rePassword: rePassword,
    role: role,
    name: name,
  };

  // 그리고 users 배열에 newuser를 push 한다.
  users.push(newuser);
  console.log(`지금 가입을 신청한 회원입니다.`);
  console.log(newuser);

  // 그리고 newuser를 res.send로 보낸다.
  res.send(newuser);
});
console.log(`사이트 전체 회원조회 입니다.`);
console.log(users);

app.get("/sign-in", (req, res) => {
  const { email, password } = req.body;

  // 그리고 이 필드 중에 없는게 있는지 검사한다.
  if (!email || !password) {
    res.status(400).send({
      message: "잘못된 입력값이 있습니다. 값을 다시한번 확인인 해보1세요",
    });
    return;
  }

  const { password: _password, ...user } = users.find(
    (users) => users.email === email && users.password === password
  );
  if (!user) {
    res.status(404).send({
      result: true,
      "message:": "사용자를 찾을 수 없습니다.",
    });
    return;
  }
});
=======
// // // // // // 새로운 기능 개발 시작
// // // // // // 2024-06-09


// app.get 할일목록 전체조회
app.get("/todo-items", (req, res) => {
  return res.send(todoItems);
});

// app.post 할일목록 추가
app.post("/todo-items", (req, res) => {
  // 요청받은 body 에서 title 값을 가져온다.
  const { title } = req.body;
  // newTodoId 의 길이를 측정한다, 만약 0일경우 ID를 1로, 0이 아닐경우 마지막  ID에 +1을 한다.
  const newTodoId = todoItems[todoItems.length - 1]
    ? todoItems[todoItems.length - 1].id + 1
    : 1;
  // 새로운 newTodoItem 객체를 생성한다.
  // ID는 위에서 계산한 값을, userID는 1로 고정, title은 위에서 가져온 title값을, dontAt 은 null을, createdAt 과 updatedAt 는 현재시간을 저장한다.
  const newTodoItem = {
    id: newTodoId,
    userId: 1,
    title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // todoItems 변수에 newTodoItem를 추가한다.
  todoItems.push(newTodoItem);
  // 새로 생성된 newTodoItem를 JSON 형식으로 보낸다.
  return res.send(newTodoItem);
});

// app.delete 할일목록 삭제
app.delete("/todo-items/:id", (req, res) => {
  // 요청받은 파라미터에서 id값을 가져온다.
  const { id } = req.params;
  // id값을 숫자로 변환한다.
  const todoItemId = Number(id);

  // todoItemIndex 라는 변수에 todoItems 배열에서 일치하는 값을 찾아 저장한다.
  // 조건은 요청받은 id값이 저장된 todoItemId 와 todoItems 배열에서의 id를 비교하여 동일한 값을 selTodoItem에 저장한다.
  const selTodoItem = todoItems.findIndex((ids) => ids.id === todoItemId);

  // todoItems 배열에 대해 splice를 실행하는데, 조건은 인덱스는 selTodoItem를, 삭제할 카운터는 1개만 이다.
  todoItems.splice(selTodoItem, 1);
  return res.send(todoItems);
});

// app.put 할일목록 수정
app.put("/todo-items/:id", (req, res) => {
  // 요청받은 파라미터에서 id값을 가져온다.
  const todoItemId = Number(req.params.id);

  // selTodoItem 라는 변수에 todoItems 배열에서 일치하는 값을 찾아 저장한다.
  // 조건은 요청받은 id값이 저장된 todoItemI 와 todoItems 배열에서의 id를 비교하여 동일한 값의 객체를 selTodoItem에 저장한다.
  const selTodoItem = todoItems.find((ids) => ids.id === todoItemId);

  // todoItems 배열에 대해 splice를 실행하는데, 조건은 인덱스는 selTodoItem를, 삭제할 카운터는 1개만, 추가할 데이터는 selTodoItem 이다.
  todoItems.splice(selTodoItem, 1, {
    ...selTodoItem,
    doneAt: selTodoItem.doneAt == null ? new Date() : null, // 삼항연산자
  });

  res.send({ result: true });
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
