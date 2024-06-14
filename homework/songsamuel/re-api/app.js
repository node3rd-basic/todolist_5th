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

const TodoItem = [
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

// 목록들 조회
app.get("/todo-items", (req, res) => {
  return res.send("목록들 조회가 완료되었습니다.");
});

// 할 일 목록 한개 조회
app.get("/todo-items/:id", (req, res) => {
  return res.send("목록들 중 한개가 완료되었습니다.");
});

// 키워드를 통한 할 일 목록들 조회
app.get("/todo-items/search/:keyword", (req, res) => {
  return res.send("키워드를 통한 목록 조회가 완료되었습니다.");
});

// 할 일 등록
app.post("/todo-items", (req, res) => {
  return res.json({ msg: "할일 등록이 완료되었습니다." });
});

// 할일 삭제
app.delete("/todo-items/:id", (req, res) => {
  return res.send("할일 삭제가 완료되었습니다.");
});

const secretKey = "돈 많이 벌고 싶다.";

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

  // 가져온 토큰을 검증해서 거기서 내 정보를 꺼내야한다.
  const user = jwt.verify(token, secretKey);
  // 만약 잘못된 시크릿 키를 가져왔으면
  if (!user) {
    res.status(400).json({ message: "당신은 권한이 없어!" });
  }

  res.status(200).json({ user });
  return;
});

app.listen(port, () => {
  console.log(`서버가 연결되었습니다.`);
});
