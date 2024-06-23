import jwt from 'jsonwebtoken';
import * as userRepository from '../repositories/user.repository.js';
import { secretKey } from '../constants/env.constant.js';

export function getUserByEmail(email) {
  return userRepository.findUser(email);
}
export function getUserByPassword(password) {
  return userRepository.findUser(password);
}

export function createUser(email, password, role, name) {
  const extUser = getUserByEmail(email);

  if (extUser) {
    throw new Error('이미 가입된 이메일 입니다.');
  }
  const newUser = { email, password, role, name };
  userRepository.pushUser(newUser);
  return newUser;
}

export function singUser(email, password) {
  const selectedUser = getUserByEmail(email);
  if (!selectedUser) {
    res.status(404).send({ message: '사용자가 존재하지 않습니다' });
    return;
  }
  if (selectedUser.password !== password) {
    res.status(401).send({ message: '비밀번호가 일치하지 않습니다' });
    return;
  }
  const { password: _password, ...user } = selectedUser;
  return jwt.sign(user, secretKey);
}
