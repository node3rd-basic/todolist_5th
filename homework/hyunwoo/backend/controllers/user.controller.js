import users from '../db/users.js';
import jwt from 'jsonwebtoken';

// todoItem id 지정하기
const getIncrementedId = (arr) =>
  arr[arr.length - 1] ? arr[arr.length - 1].id + 1 : 1;

// 회원가입
export function postSignUp (req, res, next) {
    const { email, password, rePassword, role, name } = req.body;

    if (!email || !password || !rePassword || !role || !name) {
      res.status(400).send({
        result: false,
        message: "모든 항목을 입력해주세요.",
      });
      return;
    }
  
    if (password !== rePassword) {
      res.status(400).send({
        result: false,
        message: "입력한 비밀번호가 일치하지 않습니다.",
      });
      return;
    }
  
    const existingEmail = users.find((user) => user.email === email);
  
    if (existingEmail) {
      res.status(409).send({
        result: false,
        message: "이미 등록된 이메일입니다.",
      });
    }
  
    const id = getIncrementedId(users);
  
    const newUser = {
      id,
      email,
      password,
      role,
      name,
    };
    users.push(newUser);
    res.status(200).json(newUser);
}

// 로그인
export function postSignIn (req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send({
      result: false,
      message: "모든 항목을 입력해주세요",
    });
  }

  const { password: _password, ...user } = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    res.status(404).send({
      result: false,
      message: "회원 정보가 존재하지 않습니다",
    });
    return;
  }

  const token = jwt.sign(user, secretKey);
  res.status(200).json({ token });
}

// 토큰 검증
export function getUserMe (req, res, next) {
  res.json(req.user);
}