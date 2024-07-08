import * as userRepository from "../repositories/users.repository.js";
import * as userController from "../controllers/users.controller.js";
import jwt from "jsonwebtoken";

const secretKey = "kljsdfjkl;sdfioijm3";

export const userSignUp = (email, password, name, role) => {
  // 위의 값들이 전부 들어왔는지 확인
  // 필수값이 누락된 경우 400 에러처리

  //email 중복 확인
  if (email === userRepository.findByEmail(email)) {
    throw new Error({ message: "이미 가입된 회원입니다." });
  }

  const newUser = {
    email,
    password,
    name,
    role,
  };

  console.log(newUser);
  return userRepository.saveUser(newUser);
};

export const userSignIn = async (email, password) => {
  // email password 로 users 에서 사용자 찾기
  const findedUser = await userRepository.findByEmailAndPassword(
    email,
    password
  );

  // 사용자가 없을 경우 401 에러처리
  if (!findedUser) {
    throw new Error("비밀번호 혹은 이메일이 일치하지 않습니다.");
  }

  // 사용자가 존재할 경우 jwt token 생성 후 응답

  // user = { ...user, password: _pw };

  // console.log(`findedUser in user service :`, findedUser);
  const { password: undefined, ...user } = findedUser;
  // console.log(`user in user service :`, user);
  const signIn = jwt.sign(user, secretKey);
  // console.log(signIn);
  return signIn;
};
