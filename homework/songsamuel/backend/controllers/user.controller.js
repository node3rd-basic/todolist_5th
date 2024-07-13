import * as userService from "../services/user.service.js";

// 회원가입
export async function postSignUp(req, res) {
  const { email, password, rePassword, role, name } = req.body;
  try {
    const newUser = await userService.SignUp(
      email,
      password,
      rePassword,
      role,
      name
    );

    res.json(newUser);
  } catch (error) {
    console.log(error);
    res.status(error.status).send({ message: error.message });
  }
}

// 로그인
export async function postSignIn(req, res) {
  const { email, password } = req.body;

  try {
    const userToken = await userService.SignIn(email, password);

    res.json({ token: userToken });
  } catch (error) {
    res.status(error.status).send({ message: error.message });
  }
}

export function getUserMe(req, res) {
  // user에 관해서는 이미 authMiddleware에서 확인 및 정의를 함.
  res.send(req.user);
}
