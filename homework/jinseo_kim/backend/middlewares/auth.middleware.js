import jwt from 'jsonwebtoken';
const secretKey = '1a2b3c4d';

// 사용자 인증
export default (req, res, next) => {
  try {
    const token = req.headers.authorization;
    req.user = jwt.verify(token, secretKey);
    next();
  } catch (error) {
    res.status(403).send({ message: '당신은 권한이 없습니다.' });
  }
};
