import users from "../db/users.js";
import todoItems from "../db/todoItems.js";
import jwt from "jsonwebtoken";

const secretKey = "wewqsfaserafgf";

const incrementedTodoId = (arr) =>
  arr[todoItems.length - 1] ? arr[todoItems.length - 1].id + 1 : 1;

//회원가입
export function SignUp(req, res) {
  const { email, password, rePassword, role, name } = req.body;
  if (
    !email ||
    !password ||
    !rePassword ||
    !role ||
    !name ||
    password !== rePassword
  ) {
    res.status(400).send({ message: "입력 값을 확인 해 주세요." });
    return;
  }
  const existedUser = users.find((user) => user.email === email);
  if (existedUser) {
    res.status(409).json({ message: "이미 가입된 이메일 입니다." });
  }
  const id = incrementedTodoId(users);
  const newUser = { id, email, password, role, name };
  users.push(newUser);
  res.json(newUser);
}

//로그인
export function SignIn(req, res) {
  const { email, password } = req.body;
  const { password: _password, ...user } = users.find(
    (user) => user.email === email && user.password === password
  );
  if (!user) {
    res.status(404).send({ message: "해당하는 사용자가 없습니다." });
    return;
  }
  const token = jwt.sign(user, secretKey);

  res.json({ token });
}

//토큰검증
export function UserMe(req, res) {
  res.json(req.user);
}
