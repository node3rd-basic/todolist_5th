import jwt from 'jsonwebtoken';
import * as userRepository from '../repositories/user.repository.js';
import CustomError from '../common/custom.error.js';

export function getUserByEmail(email) {
  return userRepository.findUser(email);
}
export function getUserByPassword(password) {
  return userRepository.findUser(password);
}

export function createUser(email, password, role, name) {
  const extUser = getUserByEmail(email);

  if (extUser) {
    throw new CustomError(409, '이미 가입된 이메일입니다.');
  }
  const newUser = { email, password, role, name };
  userRepository.pushUser(newUser);
  return newUser;
}

export function singUser(email, password) {
  const selectedUser = getUserByEmail(email);
  if (!selectedUser) {
    throw new CustomError(404, '유저 정보가 없습니다.');
  }
  if (selectedUser.password !== password) {
    throw new CustomError(409, '비밀번호가 일치하지 않습니다.');
  }
  const { password: _password, ...user } = selectedUser;
  return jwt.sign(user, process.env.JWT_SECRET_KEY);
}
