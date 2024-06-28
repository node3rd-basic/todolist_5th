import * as userService from '../services/user.service.js';

// 회원가입 API
export function postUserSignUp(req, res) {
  const { email, password, rePassword, role, name } = req.body;
  if (!email || !password || !rePassword || !role || !name || password !== rePassword) {
    res.status(400).send({ message: '입력필드의 필수값이 누락되었습니다.' });
    return;
  }

  try {
    const newUser = userService.createUser(email, password, role, name);
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: error.message });
  }
}

// 로그인 API
export function postUserSignIn(req, res) {
  const { email, password } = req.body;
  const token = userService.singUser(email, password);
  res.status(200).send({ token });
}

// 내정보 API
export function getUserMe(req, res) {
  res.status(200).json(req.user);
}
