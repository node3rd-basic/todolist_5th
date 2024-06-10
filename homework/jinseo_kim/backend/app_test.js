import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());

app.listen(3000, () => {
  console.log(`3000포트로 서버가 열렸습니다!`);
});

let users = [];
app.post("/sign-up", (req, res) => {
  // 일단 req body를 통해 email / name / password / repassword / role 을 받는다
  // 그리고 이 내용을 const 에 담는다. 어떻게? 구조분해 할당으로
  const { email, password, rePassword, role, name } = req.body;
  // 그리고 이 필드 중에 없는게 있는지 검사한다.
  if (!email || !password || !rePassword || !role || !name) {
    res.status(400).send({ message: "입력값을 확인해주세요" });
    return;
    // 위 코드를 아래와 같이 바꾸면 에러가 나지 않는다.
    // return res.status(400).send({ message: "입력값을 확인해주세요" });
  }
  // 그리고 이 필드 중에 email 필드의 데이터가 중복이 아닌지 검사한다. if가 아니고 cosnt = extinguser 이런걸로
  const existUser = users.find((user) => user.email === email);

  if (existUser) {
    res.status(409).json({ message: "이미 가입된 이메일 입니다." });
    // 위 코드를 아래와 같이 바꾸면 에러가 나지 않는다.
  }

  if (password !== password) {
    // password 가 repasswrd 랑 맞는지 확인하기.
    res.status(400).send({ message: "비밀번호가 일치하지 않습니다" });
    return;
    // 위 코드를 아래와 같이 바꾸면 에러가 나지 않는다.
    // return res.status(400).send({ message: "비밀번호가 일치하지 않습니다" });
  }

  // 그리고 user id를 검사하여 0일 경우 1을, 그렇지 않은 경우 userid의 길이 +1 한다.
  const id = users.length === 0 ? 1 : users[users.length - 1].id + 1;

  // 그리고 newuser에 담는다.
  const newuser = {
    id: id,
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
