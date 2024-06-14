// 1. express -> 서버 띄우기

const express = require("express");

const app = express();
// const port = 3000;

// api 스펙을 보고 api 컨트롤러 작성

//

const users = {};

// 목록들 조회
app.get("/todo-items", (req, res) => {
  return res.send("조회가 완료되었습니다.");
});

// 할 일 목록 한개 조회
app.get("/todo-items/:id", (req, res) => {
  return res.send("조회가 완료되었습니다.");
});

// 키워드를 통한 할 일 목록들 조회
app.get("/todo-items/search/:keyword", (req, res) => {
  return res.send("조회가 완료되었습니다.");
});

// 할 일 등록
app.post("/todo-items", (req, res) => {
  return res.json({ msg: "조회가 완료되었습니다." });
});

// 할일 삭제
app.delete("/todo-items/:id", (req, res) => {
  return res.send("조회가 완료되었습니다.");
});

// 로그인
app.post("/sign-in", (req, res) => {
  return res.status(201);
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
    res.json({ msg: "입력값을 확인해주세요" });
  }

  // 3. 이메일이 이미 존재하는지 확인해야한다.
  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    res.status(400).json({ msg: "이미 존재하는 email입니다." });
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
  return res.json({ msg: "완료되었습니다." });
});

app.listen(3000, () => {
  console.log(`"서버가 연결되었습니다."`);
});
