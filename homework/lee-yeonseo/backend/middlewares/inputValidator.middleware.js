export const signUpInputValidator = (req, res, next) => {
  //req.params에서 투두 아이템 아이디 받아오기
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

  next();
};
