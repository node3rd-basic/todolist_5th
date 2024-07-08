import * as userService from "../services/users.service.js";

/** 회원가입 API */

export const signUp = (req, res, next) => {
  const { email, password, rePassword, name, role } = req.body;
  console.log(req.body);
  try {
    const newUser = userService.userSignUp(
      email,
      password,
      rePassword,
      name,
      role
    );
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

/** 로그인 API */
export const signIn = async (req, res) => {
  const { email, password } = req.body;

  const token = await userService.userSignIn(email, password);
  // console.log("token in user controller : ", token);
  res.status(200).json({ token });

  return;
};

/** 내 정보 조회 */
export const myInfo = (req, res) => {
  const user = req.user;
  // console.log("user in user controller - myInfo : ", req.user);
  res.json(user);
};
