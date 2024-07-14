import jwt from 'jsonwebtoken';

//사용자 인증 미들웨어
export default (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = user;
    console.log(req.user);
    next();
  } catch (error) {
    res.status(401).json({ message: '인증 정보가 유효하지 않습니다.' });
  }
};
