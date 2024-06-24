import * as userRepository from "../repositories/user.repository.js";
import jwt from "jsonwebtoken";
import { ENV_KEY } from "../constants/env.constants.js";

export const signUp = (email, password, rePassword, role, name) => {
  const emailExist = userRepository.findEmailById(email);
  if (emailExist) throw new Error("존재하는 이메일입니다.");
  if (password !== rePassword)
    throw new Error("두 패스워드가 일치하지 않습니다.");

  const data = userRepository.signUp(email, password, role, name);
  return data;
};

export const token = (email, password) => {
  const findUser = userRepository.findUser(email);
  if (!findUser) throw new Error("존재하는 않는 사용자입니다.");
  if (findUser.password !== password)
    throw new Error("일치하지않는 비밀번호입니다.");
  const token = jwt.sign(findUser, ENV_KEY.SECRET_KEY);
  return token;
};
