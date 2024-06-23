import jwt from 'jsonwebtoken';

const tokenSecretKey = 'aksjhdfjkladhfklhjaskl';

//사용자 인증 미들웨어
export default (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = jwt.verify(token, tokenSecretKey);

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: '인증 정보가 유효하지 않습니다.' });
  }
};
