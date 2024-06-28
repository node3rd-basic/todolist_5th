import * as userRepository from '../repositories/user.repository.js';
import jwt from 'jsonwebtoken';
import CustomError from '../common/custom.error.js';

//회원가입
export const signUp = (email, password, role, name) => {
  //이메일 중복 확인
  const existedEmail = userRepository.findUserByEmail(email);

  if (existedEmail) {
    throw new CustomError(409, '이미 가입된 이메일입니다.');
  }

  //유저 아이디 만들어주기
  const newUserId = userRepository.getIncrementedId();

  //newUser 생성
  const newUser = {
    id: newUserId,
    email,
    password,
    name,
    role,
    createdAt: new Date(),
  };

  //users배열에 newUser 넣어주기
  userRepository.createUser(newUser);

  return newUser;
};

//로그인
export const signIn = (email, password) => {
  //유저 배열에 해당하는 이메일과 패스워드와 일치하는 유저가 있는지 검색
  const findUser = userRepository.findUser(email, password);

  //일치하는 유저가 없다면 오류 반환
  if (!findUser) {
    throw new CustomError(404, '유저 정보가 없습니다.');
  }

  const { password: _pw, ...user } = findUser;

  //일치하는 유저가 있다면 패스워드를 제외한 유저 정보를 페이로드로 토큰 발급
  const token = jwt.sign(user, process.env.JWT_SECRET_KEY);

  return token;
};
