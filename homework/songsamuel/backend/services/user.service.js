import * as userRepository from "../repositories/user.repository.js";
import jwt from "jsonwebtoken";
import CustomError from "../common/custom.error.js";

// // 토큰 시크릿 키
// const secretKey = "돈 많이 벌고 싶다.";

// 회원가입 API
export async function SignUp(email, password, rePassword, role, name) {
  if (!email || !password || !rePassword || !role || !name) {
    throw new CustomError("입력을 확인해주세요.", 404);
  }

  if (password !== rePassword) {
    throw new CustomError("비밀번호와 비밀번호 확인이 일치하지 않습니다.", 401);
  }

  // console.log("email", email);

  const existingUser = await userRepository.findUserByEmail(email);

  // console.log("existingUser@@@@@@@@@@@@", existingUser);

  if (existingUser) {
    throw new CustomError("이미 존재하는 이메일입니다.", 409);
  }

  // console.log(existingUser);

  // 신규 id 입력하기
  // const newId = userRepository.getIncrementedId();

  const newUser = {
    email,
    password,
    role,
    name,
  };

  // console.log("newUser@@@@@@@@@@@@", newUser);

  await userRepository.pushNewUser(newUser);

  return newUser;
}

export async function SignIn(email, password) {
  // DB에서 일치하는 녀석을 foundUser라고 한다.
  const foundUser = await userRepository.findUser(email, password);

  console.log("foundUser", foundUser);

  if (!foundUser) {
    throw new CustomError("존재하지 않는 유저입니다.", 404);
  }

  // userData는 내가 이름 지은 것 foundUser에서 password 뺀 나머지를 넣은 값
  const { password: _password, ...userData } = foundUser;

  // 로그인을 성공하면 토큰을 발급한다.
  const token = jwt.sign(userData, process.env.JWT_SECRET_KEY);

  console.log("token", token);
  return token;
}
