import * as userService from "../services/user.service.js";

// 회원가입
export function postSignUp(req, res) {
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

  try {
    const newUser = userService.saveUser(email, password, role, name);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).send({ "message": error.message });
  }
}

// 로그인
export function postSignIn(req, res) {
  const { email, password } = req.body;

  try {
    const token = userService.signIn(email, password);
    res.json({ token });

  } catch (error) {
    console.log(error)
    res.status(400).send({ "message": error.message });
  }
}

// 토큰 검증
export function getUserMe(req, res) {
  res.json(req.user);
}
