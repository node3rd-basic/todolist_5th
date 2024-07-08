import * as userRepository from "../repositories/users.repository.js";
import * as userController from "../controllers/users.controller.js";
import jwt from "jsonwebtoken";

const secretKey = "kljsdfjkl;sdfioijm3";

export const userSignUp = (email, password, role, name) => {
  // 위의 값들이 전부 들어왔는지 확인
  // 필수값이 누락된 경우 400 에러처리

  //email 중복 확인
  if (email === userRepository.findByEmail(email)) {
    throw new Error({ message: "이미 가입된 회원입니다." });
  }

  const newUser = {
    email,
    password,
    role,
    name,
  };

  return userRepository.saveUser(newUser);
};

export const userSignIn = (email, password) => {
  // email password 로 users 에서 사용자 찾기
  const user = userRepository.findByEmailAndPassword(email, password);

  //   // 사용자가 없을 경우 401 에러처리
  //   if (!user) {
  //     throw new Error( "비밀번호 혹은 이메일이 일치하지 않습니다." );
  //   }

  //   사용자가 존재할 경우 jwt token 생성 후 응답
  //   user = { ...user, password: _pw };

  user.password = undefined;
  console.log(user);

  return jwt.sign(user, secretKey);
};
