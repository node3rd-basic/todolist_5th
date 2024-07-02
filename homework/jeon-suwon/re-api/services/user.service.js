import * as userRepository from "../repositories/user.repository.js";
import jwt from "jsonwebtoken";
import { ENV_KEY } from "../constants/env.constants.js";
import { CustomError } from "../common/custom.error.js";

export const signUp = async (email, password, rePassword, role, name) => {
  const emailExist = userRepository.findEmailById(email);
  if (emailExist) throw new CustomError("존재하는 데이터가 없습니다.", 404);
  if (password !== rePassword)
    throw new CustomError("두 패스워드가 일치하지 않습니다.", 409);

  const data = await userRepository.signUp(email, password, role, name);
  return data;
};

export const token = async (email, password) => {
  const findUser = await userRepository.findUser(email);
  if (!findUser) throw new CustomError("존재하는 데이터가 없습니다.", 404);
  if (findUser[0].password !== password)
    throw new CustomError("두 패스워드가 일치하지 않습니다.", 409);
  const token = jwt.sign(findUser[0], ENV_KEY.SECRET_KEY);
  return token;
};
