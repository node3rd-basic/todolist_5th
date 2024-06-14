//할일 api 만들기
// # 할일 관리 프로그램 API 명세서
// const express = require('express')
// const cors = require('cors')
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
// const jwt = require("jsonwebtoken")

const app = express();
const port = 3000;
//모든 요청은 cors 함수가 실행된 결과가 함수
app.use(cors());
app.use(express.json());
// app.use((req, res, next) => {
//   console.log(
//     //요청한 메서드, api, 날짜, 주소
//     ` ${req.method} ${req.url} [${new Date().toISOString()}] ${req.headers.referer}`
//   );
//   next();
// });
//위의 코드에 const 넣고 app.use(함수명 넣기)

const leaveLogMiddleware = (req, res, next) => {
  console.log(
    //요청한 메서드, api, 날짜, 주소
    ` ${req.method} ${req.url} [${new Date().toISOString()}] ${req.headers.referer}`
  );
  next();
};
const errorMiddleware = (err, req, res, next) => {
  console.log("에러메세지");
  res.status(500).json({ message: "error 발생" });
};

app.use(leaveLogMiddleware);

const secretKey = "dljbhkiodgse";

//db 대신 변수로 사용중
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
    doneAt: null,
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
];

//새 유저등록 정보
const users = [
  {
    id: 1,
    email: "naji30@naver.com",
    password: "najinaji",
    name: "나지윤",
    role: "학생",
  },
];

const authMiddleware = (req, res, next) => {
  //토큰을 활용하여 인증하기
  //토큰선언 : 토큰받아오는 곳
  const token = req.headers.authorization;
  try {
    //값 전달하려면 요청에 넣어주기
    req.user = jwt.verify(token, secretKey);
    next();
  } catch (err) {
    res.status(401).send({
      message: "권한이 없습니다.",
    });
  }
};

const validateTodoitemId = (req) => {
  const idAsNumber = Number(req.params.id);
  if (isNaN(idAsNumber)) {
    throw new Error("id는 숫자여야합니다");
  }
  return validateTodoitemId;
};

const getTodoItemById = (id) => {
  const todoItem = todoItems.find((todoItem) => todoItem.id === id);
  if (!todoItem) {
    throw new Error("todo item not found");
  }
  return todoItem;
};

const getIncrementedId = (arr) => {
  return arr[todoItems.length - 1] ? arr[todoItems.length - 1].id + 1 : 1;
};

//할일목록조회: 내꺼 목록조회할 수 있도록
app.get(
  "/todo-items",
  authMiddleware,
  //주석처리 된 부분은 자주 사용. 미들웨어는 함수이므로 밖으로 꺼내서 쓰면 됨
  // (req, res, next) => {
  //   //토큰을 활용하여 인증하기
  //   //토큰선언 : 토큰받아오는 곳
  //   const token = req.headers.authorization;
  //   try {
  //     //값 전달하려면 요청에 넣어주기
  //     req.user = jwt.verify(token, secretKey);
  //     next();
  //   } catch (err) {
  //     res.status(401).send({
  //       message: "권한이 없습니다.",
  //     });
  //   }
  // },
  (req, res) => {
    console.log("req.user-->", req.user);
    const user = req.user;
    res.send(todoItems.filter((todoItem) => todoItem.userId === user.id));
  }
);

//내꺼에 등록할 수 있도록
app.post("/todo-items", authMiddleware, (req, res) => {
  //타이틀이라고 지정한 것을 바디에 넣어줌
  //미들웨어로 인증했으므로 const token = req.headers.authorization; 지우고
  //아래의 user를 req.body에 담아주기
  const user = req.user;
  const { title } = req.body;
  // try {
  // 미들웨어로 인증했으므로 지우기const user = jwt.verify(token, secretKey);
  const newId = getIncrementedId(todoItems);
  const newTodoItem = {
    //고유값을 가져야함. 3번이라고 지정하면 3번 수정할 때 여러개가 나오므로
    //마지막 아이디 +1
    id: newId,
    userId: user.id,
    //타이틀: 위에서 선언한 타이틀
    title: title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: "2024-06-01",
  };
  todoItems.push(newTodoItem);
  res.send(newTodoItem);
  //try catch도 필요없음
  // } catch (err) {
  //   res.status(401).send({ message: "권한이 없습니다." });
  // }
});

//할일목록 1개 조회 & 중복 수정하기
app.get("/todo-itmes/:id", authMiddleware, (req, res) => {
  const id = validateTodoitemId(req);
  const todoItem = getTodoItemById(id);
  res.send(todoItem);
});
//수정
app.put("/todo-items/:id", authMiddleware, (req, res) => {
  //파라미터에서 아이디 가져온다
  const id = validateTodoitemId(req);
  //todoItems에서 아이디 찾아서 putdoneat에 넣기
  const selectedTodoItem = getTodoItemById(id);
  const todoItemIndex = todoItems.indexOf(selectedTodoItem);
  todoItems.splice(todoItemIndex, 1, {
    ...selectedTodoItem,
    //할일을 다했는지 아닌지 확인수식 : 삼항연산자로 들어감
    // let newDoneAt
    // if (selectedTodoItem.doneAt == null) {
    //     newDoneAt = new Date()
    // } else {
    //     newDoneAt = null
    // }
    doneAt: selectedTodoItem.doneAt == null ? new Date() : null,
  });
  res.send({ result: true });
});

//삭제
app.delete("/todo-items/:id", authMiddleware, (req, res) => {
  const id = validateTodoitemId(req);
  //매번 +를 쓰는게 더 일을 많이 하는 것이므로.. 숫자라고 지정

  const selectedTodoItem = getTodoItemById(id);
  return (indexToDelete = todoItems.indexOf(selectedTodoItem));

  todoItems.splice(indexToDelete, 1);
  res.send({ result: true });
});

//회원가입
app.post("/sign-up", (req, res) => {
  const { email, name, password, rePassword, role } = req.body;

  if (
    !email ||
    !password ||
    !rePassword ||
    !role ||
    !name ||
    password !== rePassword
  ) {
    res.status(400).send({
      result: false,
      message: "입력값 확인해보세요",
    });
    return;
  }
  //이메일 중복확인

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    //open api에서 사용시 더더욱 status 번호 제대로 보내야함 : 불특정 다수가 쓰는 곳
    res.status(409).json({
      result: false,
      message: "이미 가입된 이메일입니다",
    });
  }
  //id = 0이면 1, 아니면 +1 할 수 있도록
  const id = getIncrementedId(users);
  const newUser = { id, email, password, role, name };

  users.push(newUser);
  res.json(newUser);
  console.log(newUser);

  res.send();
});

//로그인
app.post("/sign-in", (req, res) => {
  const { email, password } = req.body;
  console.log("users--->>", users);
  console.log("req.body--->", req.body);
  console.log("password--->", password);
  //users에서 find한 애를 user에 넣겠다. 패스워드 빼고
  const { password: _password, ...user } = users.find(
    (users) => users.email === email && users.password === password
  );

  console.log("user.email-->", user.email);
  console.log("user.password-->", user.password);

  if (!user) {
    res.status(404).send({
      result: true,
      "message:": "사용자를 찾을 수 없습니다.",
    });
    return;
  }

  //토큰 만들기
  const token = jwt.sign(user, secretKey);
  console.log(token);
  res.json({
    result: true,
    message: "로그인성공",
    token,
  });
});

app.get("/users/me", authMiddleware, (req, res) => {
  // const token = req.headers.authorization;
  // console.log(token);
  // try {
  //   const user = jwt.verify(token, secretKey);
  res.status(200).json(req.user);
  // } catch (err) {
  //   res.status(401).send({ message: "권한이 없습니다." });
  // }
});

//에러처리 미들웨어 : 컨트롤러 뒤에서 실행시켜야 할 애들은 밑에서
app.use(
  errorMiddleware
  // (err, req, res, next) => {
  // console.log("에러메세지");
  // res.status(500).json({ message: "error 발생" });
  // }
);

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});

// - 요청자가 값을 전달 하고 백엔드 프로그램이 값을 받는 3가지 방법 정리
// - frontend/index.html 할일 목록들 보여지도록 api 구현
// - frontend/index.html 할밀 목록 추가되도록 api 구현
//[나지윤/middleware]
