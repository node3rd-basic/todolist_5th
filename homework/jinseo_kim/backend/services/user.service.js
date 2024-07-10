import jwt from 'jsonwebtoken';
import * as userRepository from '../repositories/user.repository.js';
import CustomError from '../common/custom.error.js';

export async function getUserByEmail(email) {
  return await userRepository.findUser(email);
}
export async function getUserByPassword(password) {
  return await userRepository.findUser(password);
}

export async function createUser(email, password, role, name) {
  const extUser = await getUserByEmail(email);

  if (extUser) {
    throw new CustomError(409, '이미 가입된 이메일입니다.');
  }
  const newUser = { email, password, role, name };
  await userRepository.pushUser(newUser);
  return newUser;
}

export async function singUser(email, password) {
  const selectedUser = await getUserByEmail(email);
  if (!selectedUser) {
    throw new CustomError(404, '유저 정보가 없습니다.');
  }
  if (selectedUser.password !== password) {
    throw new CustomError(409, '비밀번호가 일치하지 않습니다.');
  }
  const { password: _password, ...user } = selectedUser;
  return jwt.sign(user, process.env.JWT_SECRET_KEY);
}
