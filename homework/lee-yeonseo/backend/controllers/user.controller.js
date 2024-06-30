import * as userService from '../services/user.service.js';

//회원가입 (1)
export const postSignUp = (req, res, next) => {
  try {
    //req.body에서 email, password, rePassword, role, name 받아오기
    const { email, password, role, name } = req.body;

    const newUser = userService.signUp(email, password, role, name);

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

//로그인 (2)
export const postSignIn = async (req, res, next) => {
  try {
    //req.body에서 email, password 받아오기
    const { email, password } = req.body;

    const token = await userService.signIn(email, password);

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

//내정보 가져오기 (3)
export const getUserMe = (req, res) => {
  //사용자 인증 미들웨어가 보내준 req.user를 반환
  res.status(200).json(req.user);
};
