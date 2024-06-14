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

const users = [];
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
    res.status(409).send({ messagse: "중복이다 이녀석아" });
    return;
  }
  // 비밀번호와 비밀번호 확인이 일치하는지 확인, 일치하지 않을경우 400 에러처리
  if (password !== rePassword) {
    res.status(400).send({ messagse: "비번을 확인하거라" });
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
  // users 에서 email pass 일치하는 user 저장
  // 일치하면jwt.sign으로 json 을 전달함
  res.send({ message: "로그인이다." });
});

// 내정보 API
app.get("/users/me", (req, res) => {
  res.send({ message: "로그인이다." });
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
