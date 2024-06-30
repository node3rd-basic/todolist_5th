import * as userRepository from '../repositories/user.repository.js';
import jwt from 'jsonwebtoken';
import CustomError from '../common/custom.error.js';

//해당 이메일의 유저 찾기
export const findUserByEmail = async (email) => {
  return await userRepository.findUserByEmail(email);
};

//회원가입
export const signUp = async (email, password, role, name) => {
  //이메일 중복 확인
  const existingEmail = await findUserByEmail(email);

  if (existingEmail) {
    throw new CustomError(409, '이미 가입된 이메일입니다.');
  }

  //repository에 넘길 userData 정의
  const userData = { email, password, role, name };

  const newUser = await userRepository.createUser(userData);

  return newUser;
};

//로그인
export const signIn = async (email, password) => {
  const existingUser = await findUserByEmail(email);

  if (!existingUser) {
    throw new CustomError(404, '유저 정보가 없습니다.');
  }

  if (existingUser.password !== password) {
    throw new CustomError(404, '유저 정보가 없습니다.');
  }

  const { password: _pw, ...payload } = existingUser;

  //일치하는 유저가 있다면 패스워드를 제외한 유저 정보를 페이로드로 토큰 발급
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

  return token;
};
