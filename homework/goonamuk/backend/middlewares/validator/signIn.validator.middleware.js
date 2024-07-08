export const signInValidator = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "필수값이 누락되었습니다." });
    return;
  }

  next();
};
