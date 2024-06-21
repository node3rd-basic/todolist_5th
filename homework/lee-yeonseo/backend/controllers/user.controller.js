import * as userService from '../services/user.service.js';

//회원가입 (1)
export const postSignUp = (req, res) => {
  //req.body에서 email, password, rePassword, role, name 받아오기
  const { email, password, rePassword, role, name } = req.body;

  //받아온 값 중에 빠진 내용이 있다면 에러 띄우기
  if (!email || !password || !rePassword || !role || !name) {
    res.status(400).json({ message: '입력값을 확인해 주세요' });
    return;
  }

  //비밀번호와 비밀번호 확인이 불일치하면 에러
  if (password !== rePassword) {
    res.status(400).json({ message: '비밀번호와 비밀번호 확인이 일치하지 않습니다.' });
    return;
  }

  const newUser = userService.signUp(email, password, role, name);

  res.status(201).json(newUser);
};

//로그인 (2)
export const postSignIn = (req, res) => {
  //req.body에서 email, password 받아오기
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: '입력값을 확인해주세요.' });
    return;
  }

  const token = userService.signIn(email, password);

  res.status(200).json({ token });
};

//내정보 가져오기 (3)
export const getUserMe = (req, res) => {
  //사용자 인증 미들웨어가 보내준 req.user를 반환
  res.status(200).json(req.user);
};
