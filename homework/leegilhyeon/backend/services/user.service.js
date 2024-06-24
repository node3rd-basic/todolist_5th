import * as userRepository from "../repository/user.repository.js";
import jwt from "jsonwebtoken";

export function signUpUser(email, password, role, name) {
  const existedUser = userRepository.findUser(email);
  if (existedUser) {
    throw new Error("이미 가입된 이메일 입니다.");
  }
  const newUser = { email, password, role, name };
  userRepository.pushUser(newUser);
  return newUser;
}

export function signInUser(email, password) {
  const findUser = userRepository.findUser(email);
  if (!findUser) {
    throw new Error("해당하는 사용자가 없습니다.");
  }
  if (findUser.password !== password) {
    throw new Error("비밀번호가 일치하지 않습니다.");
  }
  const { password: _password, ...user } = findUser;

  const token = jwt.sign(user, process.env.JWT_SECRET_KEY);
  return token;
}
