import * as userRepository from "../repository/user.repository.js";
import jwt from "jsonwebtoken";
import CustomError from "../common/custom.error.js";


export async function signUpUser(email, password, role, name) {
  const existedUser = await userRepository.findUser(email);

  if (existedUser) {
    throw new CustomError("이미 가입된 이메일 입니다.", 409);
  }
  const newUser = { email, password, role, name };
  await userRepository.pushUser(newUser);
  return newUser;
}

export async function signInUser(email, password) {
  const findUser = await userRepository.findUser(email);

  if (!findUser) {
    throw new CustomError("해당하는 사용자가 없습니다.", 404);
  }
  if (findUser.password !== password) {
    throw new CustomError("비밀번호가 일치하지 않습니다.", 401);
  }
  const { password: _password, ...user } = findUser;

  const token = jwt.sign(user, process.env.JWT_SECRET_KEY);
  return token;
}
