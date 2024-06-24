import * as userRepository from "../repositories/user.repository.js";
import jwt from "jsonwebtoken";

// 회원가입 API
export function SignUp(email, password, rePassword, role, name) {
  if (
    !email ||
    !password ||
    !rePassword ||
    !role ||
    !name ||
    password !== rePassword
  ) {
    throw new Error("입력을 확인해주세요.");
  }

  if (password !== rePassword) {
    throw new Error("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
  }

  const existingUser = userRepository.findUserByEmail(email);

  if (existingUser) {
    throw new Error("이미 존재하는 이메일입니다.");
  }

  // 신규 id 입력하기
  const newId = userRepository.getIncrementedId();

  const newUser = {
    id: newId,
    email,
    password,
    role,
    name,
  };

  userRepository.pushNewUser(newUser);

  return newUser;
}

// 토큰 시크릿 키
const secretKey = "돈 많이 벌고 싶다.";

export function SignIn(email, password) {
  // DB에서 일치하는 녀석을 foundUser라고 한다.
  const foundUser = userRepository.findUser(email, password);

  if (!foundUser) {
    res.send("존재하지 않는 유저입니다.");
    return;
  }

  // userData는 내가 이름 지은 것 foundUser에서 password 뺀 나머지를 넣은 값
  const { password: _password, ...userData } = foundUser;

  // 로그인을 성공하면 토큰을 발급한다.
  const token = jwt.sign(userData, secretKey);

  return token;
}
