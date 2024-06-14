// 코딩 연습 & 실습 파일
import express from "express";

const app = express();
const port = 3000;
app.use(express.json());

app.listen(port, (req, res) => {
  console.log(`서버오픈 ${port} 포트`);
});

const users = [];

// 회원가입 API
app.post("/sign-up", (req, res) => {
  const { email, password, rePassword, role, name } = req.body;
  if (!email || !password || !rePassword || !role || !name) {
    res.status(408).send({ message: "빈칸확인" });
    return;
  }

  if (password == !rePassword) {
    res.status(408).send({ message: "비밀번호 불일치" });
    return;
  }

  const 중복유저 = users.find((메일) => 메일.email === email);
  if (중복유저) {
    res.send({ message: "중복된 유저" });
    return;
  }

  const id = users.length === 0 ? 1 : users[users.length - 1].id + 1;

  const newUser = { email, password, rePassword, role, name, id };
  users.push(newUser);

  res.status(200).send({ message: "회원가입 성공이다" });
  console.log(newUser);
});

app.get("/sign-in", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.send({ message: "빈칸확인" });
    return;
  }

  const findUser = users.find(
    (usr) => usr.email === email && usr.password === password
  );
  const { passowrd: _pw, ...user } = findUser;

  if (!findUser) {
    res.send({ message: "유저없음" });
    return;
  }

  res.json({ token: jwt.sign(user, secretKey) });
});
