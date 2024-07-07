import * as userService from "../services/user.service.js";

//회원가입
export async function SignUp(req, res) {
  const { email, password, rePassword, role, name } = req.body;
  if (
    !email ||
    !password ||
    !rePassword ||
    !role ||
    !name ||
    password !== rePassword
  ) {
    res.status(400).send({ message: "입력 값을 확인 해 주세요." });
    return;
  }
  try {
    console.log(email, password, role, name)
    const newUser = await userService.signUpUser(email, password, role, name);
    res.json(newUser);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}

//로그인
export async function SignIn(req, res) {
  const { email, password } = req.body;
  try {
    const token = await userService.signInUser(email, password);
    res.json({ token });
  } catch (error) {
    res.status(401).send({ message: error.message });
}}

//토큰검증
export function UserMe(req, res) {
  res.json(req.user);
}
