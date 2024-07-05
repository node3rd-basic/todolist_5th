import * as userRepository from "../repositories/user.repository.js";
import jwt from "jsonwebtoken";
import CustomError from "../common/custom.error.js";

// 입력값 유효성 검사
export function validateSignUp(email, password, rePassword, role, name) {
  if (
    !email ||
    !password ||
    !rePassword ||
    !role ||
    !name ||
    password !== rePassword
  ) {
    throw new CustomError("입력값이 올바르지 않습니다.", 400);
  }
}

// email 찾기
export function getUserByEmail(email) {
  return userRepository.findOne(email);
}

// user 저장하기
export function saveUser(email, password, role, name) {
  const existingEmail = getUserByEmail(email);

  if (existingEmail) {
    throw new CustomError("이미 등록 된 이메일입니다.", 400);
  }

  const newUser = {
    email,
    password,
    role,
    name,
  };

  userRepository.save(newUser);
  return newUser;
}

// user 찾기
export function signIn(email, password) {
  const findUser = getUserByEmail(email);

  if (!findUser) {
    throw new CustomError("사용자를 찾을 수 없습니다.", 400);
  }

  if (!email || !password) {
    throw new CustomError("모든 항목을 입력해주세요.", 400);
  }

  if (findUser.password !== password) {
    throw new CustomError("입력 값을 확인해주세요.", 401);
  }

  const { password: _password, ...user } = findUser;
  return jwt.sign(user, process.env.JWT_SECRET_KEY);
}
