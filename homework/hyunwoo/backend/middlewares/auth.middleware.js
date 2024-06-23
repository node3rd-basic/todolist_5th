import jwt from "jsonwebtoken";

const secretKey = "slkfjslkdfjoie";

// token 인증
export default (req, res, next) => {
  const token = req.headers.authorization;
  try {
    req.user = jwt.verify(token, secretKey);
    next();
  } catch (error) {
    res.status(401).send({ messagae: "권한이 없습니다." });
  }
};
