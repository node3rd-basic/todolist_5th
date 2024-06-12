import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();
const port = 3000;
const secretKey = "1a2b3c4d";
app.use(cors());
app.use(express.json());
app.listen(port, () => {
  console.log(`서버가 오픈되었습니다.`);
});

app.get("/", (req, res) => {
  res.send("hello World");
});

const users = [];

// 회원가입 API
app.post("/sign-up", (req, res) => {
  // api spec 을 통해 req.body 에서 받아야 하는 값을 확인한다.
  // email password rePassword role name
  const { email, password, rePassword, role, name } = req.body;

  // 비어있는 칸이 없는지 확인하는 로직을 작성한다.
  if (!email || !password || !rePassword || !role || !name) {
    res.status(408).send({ message: "비어있는 칸이 있습니다. 확인해주세요." });
  }

  // 비밀번호가 서로 일치하는지 확인하는 로직을 작성한다.
  if (password !== rePassword) {
    res
      .status(400)
      .send({ message: "비밀번호 확인이 일치하지 않습니다. 확인해주세요." });
  }

  // 회원가입시 EMAIL이 중복되는지 확인하는 로직을 작성한다.
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    res.status(409).send({ message: "이미 가입된 이메일 입니다." });
  }

  // 위의 모든 로직을 통과했을 경우, userId의 값을 초기화 또는 증가 시키는 로직을 작성한다.

  // 회원가입을 완료하고, users = [] 에 넣는다.
  const newUser = { email, password, role, name, password, rePassword };
  users.push(newUser);

  // 위의 모든 로직을 통과했을 경우, 회원가입에 성공했다는 응답을 보낸다.
  res.status(200).send({ message: "회원가입 성공이다" });

  console.log(newUser);
});
