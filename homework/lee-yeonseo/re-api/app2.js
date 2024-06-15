import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { getIncrementedId } from './utils.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const users = [];
const tokenSecretKey = '이래서 한번 할 때 잘해야 해';

// 할일 목록들 조회
app.get('/todo-items', (req, res) => {});

//할일 목록 한개 조회
app.get('/todo-items/:id', (req, res) => {});

//할일 목록들 조회 --키워드 검색
app.get('/todo-item/search/:keyword', (req, res) => {});

//할일 등록
app.post('/todo-items', (req, res) => {});

//할일 완료 여부 토글
app.post('/todo-items/:id', (req, res) => {});

//할일 삭제
app.delete('/todo-items/:id', (req, res) => {});

//로그인
app.post('/sign-in', (req, res) => {
  //req.body에서 email, password 받아오기
  const { email, password } = req.body;

  //유저 배열에 해당하는 이메일과 패스워드와 일치하는 유저가 있는지 검색
  const user = users.find((user) => user.email === email && user.password === password);
  //일치하는 유저가 없다면 오류 반환
  if (!user) {
    res.status(401).json({ message: '이메일 혹은 패스워드를 확인해주세요.' });
    return;
  }

  //일치하는 유저가 있다면 패스워드를 제외한 유저 정보를 페이로드로 토큰 발급
  const token = jwt.sign(user, tokenSecretKey);

  res.status(200).json(token);
});

//회원가입
app.post('/sign-up', (req, res) => {
  //req.body에서 email, password, rePassword, role, name 받아오기
  const { email, password, rePassword, role, name } = req.body;

  //받아온 값 중에 빠진 내용이 있다면 에러 띄우기
  if (!email || !password || !rePassword || !role || !name) {
    res.status(400).json({ message: '입력값을 확인해 주세요' });
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
});

//내 정보 가져오기
app.get('/users/me', (req, res) => {});

app.listen(port, () => {
  console.log(`${port}번 포트로 서버가 열렸습니다.`);
});
