import users from '../db/users.js';
import jwt from 'jsonwebtoken';
import { secretKey } from '../constants/env.constant.js';

const incrementedId = (arr) => (arr[arr.length - 1] ? arr[arr.length - 1].id + 1 : 1);
// 삼항연산자를 다시 알아봐야 겠다...
// const getIncrementedId = (arr) => (arr.length ? 1 : arr[arr.length - 1].id + 1);
// const getIncrementedId = (arr) => (arr[arr.length - 1] ? 1 :arr[arr.length - 1].id + 1);
// const id = users.length === 0 ? 1 : users[users.length - 1].id + 1;

// 회원가입 API
export function postUserSignUp(req, res) {
  const { email, password, rePassword, role, name } = req.body;
  if (!email || !password || !rePassword || !role || !name) {
    res.status(400).send({ message: '입력필드의 필수값이 누락되었습니다.' });
    return;
  }
  const extUser = users.find((usr) => usr.email === email);
  if (extUser) {
    res.status(409).send({ message: 'email이 중복입니다.' });
    return;
  }
  if (password !== rePassword) {
    res.status(400).send({ message: '비밀번호를 확인해주세요.' });
    return;
  }
  const id = incrementedId(users);
  const newUser = { email, password, role, name, id };
  users.push(newUser);
  res.send({ message: '회원가입에 성공했습니다.' });
}

// 로그인 API
export function postUserSignIn(req, res) {
  const { email, password } = req.body;
  const findUser = users.find((findUsr) => findUsr.email === email);
  if (!findUser) {
    res.status(404).send({ message: '사용자가 존재하지 않습니다' });
    return;
  }
  if (findUser.password !== password) {
    res.status(401).send({ message: '비밀번호가 일치하지 않습니다' });
    return;
  }
  const { password: _password, ...user } = findUser;
  const token = jwt.sign(user, secretKey);
  res.status(200).send({ token });
}

// 내정보 API
export function getUserMe(req, res) {
  res.status(200).json(req.user);
}
