import * as userService from "../services/user.service.js";
import { signUpvalidation } from "../validation/sign-in-validation.js";

//회원가입
export const postSignup = (req, res) => {
  const { email, password, rePassword, role, name } = req.body;
  signUpvalidation(email, password, rePassword, role, name);
  const data = userService.signUp(email, password, rePassword, role, name);

  return res.status(200).send({ message: "회원가입이 완료되었습니다.", data });
};
//로그인
export const postSignin = (req, res) => {
  const { email, password } = req.body;
  const token = userService.token(email, password);
  res.status(200).json({ token });
  return;
};

//고객정보조회
export const getuser = (req, res) => {
  const userInfo = req.user;

  return res.status(200).json(userInfo);
};
