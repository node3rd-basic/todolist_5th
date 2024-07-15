import * as userService from "../services/user.service.js";

// 회원가입
export function postSignUp(req, res) {
  const { email, password, rePassword, role, name } = req.body;
  userService.validateSignUp(email, password, rePassword, role, name);
  const newUser = userService.saveUser(email, password, role, name);
  res.status(200).json(newUser);
}

// 로그인
export function postSignIn(req, res) {
  const { email, password } = req.body;
  const token = userService.signIn(email, password);
  res.json({ token });
}

// 토큰 검증
export function getUserMe(req, res) {
  res.json(req.user);
}
