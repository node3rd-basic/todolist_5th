import users from "../db/users.js";
import jwt from "jsonwebtoken";

const getIncrementedId = (arr) =>
  arr[arr.length - 1] ? arr[arr.length - 1].id + 1 : 1;

export function postSignUp(req, res) {
  const { email, password, rePassword, role, name } = req.body;
  if (
    !email ||
    !password ||
    !rePassword ||
    !role ||
    !name ||
    password !== rePassword
  ) {
    res.send("입력값을 확인해 주세요.");
    return;
  }

  const existingUser = users.find((users) => users.email === email);
  if (existingUser) {
    res.status(409).send("이미 존재하는 이메일입니다.");
    return;
  }

  const id = getIncrementedId(users);

  const newUser = {
    id,
    email,
    password,
    role,
    name,
  };

  users.push(newUser);

  res.json(newUser);
}

const secretKey = "돈 많이 벌고 싶다.";

export function postSignIn(req, res) {
  const { email, password } = req.body;

  // user 얘를 어디서 선언했지? (user)에서 변수로 지정한 것을 넣은 것이다. 순서가 이상한 것은 비구조화할당을 했기 때문에
  // 원래대로면 const user = = users.find 이렇게 갔다가 필요한 값인 {}만 뽑아서 쓸려고 이렇게 된 것!
  const { password: _password, ...user } = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    res.send("존재하지 않는 유저입니다.");
    return;
  }

  // 로그인을 성공하면 토큰을 발급한다.
  const token = jwt.sign(user, secretKey);

  res.json({ token });
}

export function getUserMe(req, res) {
  // user에 관해서는 이미 authMiddleware에서 확인 및 정의를 함.
  res.send(req.user);
}
