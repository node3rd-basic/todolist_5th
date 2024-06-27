export const signInInputValidator = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: '입력값을 확인해주세요.' });
    return;
  }

  next();
};
