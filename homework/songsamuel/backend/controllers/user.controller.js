import * as userService from "../services/user.service.js";

// 회원가입
export function postSignUp(req, res) {
  const { email, password, rePassword, role, name } = req.body;

  const newUser = userService.SignUp(email, password, rePassword, role, name);

  res.json(newUser);
}

// 로그인
export function postSignIn(req, res) {
  const { email, password } = req.body;

  const userToken = userService.SignIn(email, password);

  res.json({ token: userToken });
}

export function getUserMe(req, res) {
  // user에 관해서는 이미 authMiddleware에서 확인 및 정의를 함.
  res.send(req.user);
}
