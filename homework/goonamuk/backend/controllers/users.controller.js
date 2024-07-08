import * as userService from "../services/users.service.js";

/** 회원가입 API */

export const signUp = (req, res, next) => {
  const { email, password, rePassword, role, name } = req.body;

  try {
    const newUser = userService.userSignUp(
      email,
      password,
      rePassword,
      role,
      name
    );
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

/** 로그인 API */
export const signIn = (req, res) => {
  const { email, password } = req.body;

  const token = userService.userSignIn(email, password);
  res.status(200).json({ token });

  return;
};

/** 내 정보 조회 */
export const myInfo = (req, res) => {
  res.json(req.user);
};
