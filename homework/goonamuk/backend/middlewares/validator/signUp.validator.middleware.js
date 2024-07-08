export const signUpValidator = (req, res, next) => {
  const { email, password, rePassword, role, name } = req.body;
  if (!email || !password || !rePassword || !role || !name) {
    res.status(400).json({ message: "필수값이 누락되었습니다." });
    return;
  }

  // 비밀번호와 비밀번호 확인이 일치하는지 확인
  // 일치하지 않을 경우 400 에러처리
  if (password !== rePassword) {
    res.status(400).json({ message: "비밀번호가 일치하지 않습니다." });
    return;
  }

  next();
};
