import users from '../db/users.js';
import jwt from 'jsonwebtoken';

const tokenSecretKey = 'aksjhdfjkladhfklhjaskl';

//투두아이템 아이디, 유저 아이디 생성
const getIncrementedId = (arr) => (arr[arr.length - 1] ? arr[arr.length - 1].id + 1 : 1);

export const postSignUp = (req, res) => {
  //req.body에서 email, password, rePassword, role, name 받아오기
  const { email, password, rePassword, role, name } = req.body;

  //받아온 값 중에 빠진 내용이 있다면 에러 띄우기
  if (!email || !password || !rePassword || !role || !name) {
    res.status(400).json({ message: '입력값을 확인해 주세요' });
    return;
  }

  //비밀번호와 비밀번호 확인이 불일치하면 에러
  if (password !== rePassword) {
    res.status(400).json({ message: '비밀번호와 비밀번호 확인이 일치하지 않습니다.' });
    return;
  }

  //이메일 중복 확인
  const existedEmail = users.find((user) => user.email === email);
  if (existedEmail) {
    res.status(400).json({ message: '이미 가입된 이메일입니다.' });
    return;
  }

  //유저 아이디 만들어주기
  const newUserId = getIncrementedId(users);

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
  users.push(newUser);

  res.status(201).json(newUser);
};

export const postSignIn = (req, res) => {
  //req.body에서 email, password 받아오기
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: '입력값을 확인해주세요.' });
    return;
  }

  //유저 배열에 해당하는 이메일과 패스워드와 일치하는 유저가 있는지 검색
  const { password: _pw, ...user } = users.find((user) => user.email === email && user.password === password);
  //일치하는 유저가 없다면 오류 반환
  if (!user) {
    res.status(401).json({ message: '이메일 혹은 패스워드를 확인해주세요.' });
    return;
  }

  //일치하는 유저가 있다면 패스워드를 제외한 유저 정보를 페이로드로 토큰 발급
  const token = jwt.sign(user, tokenSecretKey);

  res.status(200).json({ token });
};

export const getUserMe = (req, res) => {
  //사용자 인증 미들웨어가 보내준 req.user를 반환
  res.status(200).json(req.user);
};
