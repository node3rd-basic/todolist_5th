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

// api spec을 보고 api controller 부터 작성한다.

const users = [
  {
    email: "1111",
    password: "1111",
    role: "student",
    name: "1111",
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
    userId: 2,
    title: "할일1",
    doneAt: null,
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
];

// 회원가입 API
app.post("/sign-up", (req, res) => {
  // req.body 를 통해 api spec을 받아서 저장한다.
  const { email, password, rePassword, role, name } = req.body;
  // 입력받은 값에 빈칸이 없는지 검증한다. 필수값이 누락된 경우 400에러 처리
  if (!email || !password || !rePassword || !role || !name) {
    res.status(400).send({ message: "필수값이 누락되었습니다." });
    return;
  }
  // 이메일 중복 없는지 검증한다, 중복 이메일 가입시 409 에러처리
  const extUser = users.find((usr) => usr.email === email);
  if (extUser) {
    res.status(409).send({ message: "중복이다 이녀석아" });
    return;
  }
  // 비밀번호와 비밀번호 확인이 일치하는지 확인, 일치하지 않을경우 400 에러처리
  if (password !== rePassword) {
    res.status(400).send({ message: "비번을 확인하거라" });
    return;
  }
  // id 값을 검증하여 +1, 1 을 준다.
  //users의 길이가 0일때 > id에 1을 넣는다.
  //users의 길이가 0이 아닐때 > id에 users.length의 길이 -1 하고 +1을 넣는다.
  const id = users.length === 0 ? 1 : users[users.length - 1].id + 1;
  // 모든로직 통과하면 newUser에 저장하고
  const newUser = { email, password, role, name };
  // users에 push 한다.
  users.push(newUser);
  // json 으로 newUser를 보여준다.
  res.send({ message: "회원가입이다." });
  console.log(newUser);
});

// 로그인 API
app.post("/sign-in", (req, res) => {
  // req.body 로 email pass 받음
  const { email, password } = req.body;
  // users 에서 email pass 일치하는 user 저장
  const findUser = users.find(
    (usr) => usr.email === email && usr.password === password
  );
  const { password: _pw, ...user } = findUser;
  // 일치하면jwt.sign으로 json 을 전달함
  if (user) {
    const token = jwt.sign(user, secretKey);
    res.send({ token });
  }
});

// 내정보 API
app.get("/users/me", (req, res) => {
  // req headers 에서 authorization 을 받아서 token에 저장한다.
  const token = req.headers.authorization;
  // try catch 를 실행한다.
  try {
    // token 과 secretKey 를 사용하여 jwt.verify를 하고, user에 저장한다.
    const user = jwt.verify(token, secretKey);
    // 그리고 user를 json으로 보낸다.
    res.status(200).json(user);

    // catch 에서 에러가 나면 실행한다.
  } catch {
    res.status(401).send({ message: "권한이 없다 이녀석아" });
  }
});

// 할일 목록들 조회 API
app.get("/todo-items", (req, res) => {
  res.send({ message: "할일 목록들 이다." });
});

// 할일 상세 조회 API
app.get("/todo-items/:id", (req, res) => {
  res.send({ message: "할일 상세조회다." });
});

// 할일 목록들 조회 API
app.get("/todo-items/search/:keyword", (req, res) => {
  res.send({ message: "할일 상세조회다." });
});

// 할일 등록 API
app.post("/todo-items", (req, res) => {
  res.send({ message: "할일 등록이다." });
});

// 할일 완료여부 API
app.put("/todo-items/:id", (req, res) => {
  res.send({ message: "할일 완료여부다." });
});

// 할일 삭제 API
app.delete("/todo-items/:id", (req, res) => {
  res.send({ message: "할일 삭제다." });
});
