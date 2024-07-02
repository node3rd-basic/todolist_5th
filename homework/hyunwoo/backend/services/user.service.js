import * as userRepository from "../repositories/user.repository.js";
import jwt from 'jsonwebtoken';

// email 찾기
export function getUserByEmail(email) {
  return userRepository.findOne(email);
}

// user 저장하기
export function saveUser(email, password, role, name) {
  const existingEmail = getUserByEmail(email);

  if (existingEmail) {
    throw new Error("이미 등록 된 이메일입니다.");
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

  if(!findUser) {
    throw new Error('사용자를 찾을 수 없습니다.');
  }

  if (!email || !password) {
    throw new Error("모든 항목을 입력해주세요.");
  }

  if (findUser.password !== password) {
    throw new Error("입력 값을 확인해주세요.");
  }

  const { password: _password, ...user } = findUser;
  return jwt.sign(user, process.env.JWT_SECRET_KEY);
}
