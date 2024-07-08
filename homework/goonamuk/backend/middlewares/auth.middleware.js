import jwt from "jsonwebtoken";

const secretKey = "kljsdfjkl;sdfioijm3";

/** token 미들웨어 */
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = jwt.verify(token, secretKey);
    req.user = user;
    next();
  } catch (e) {
    res.status(401).json({ message: "권한이 없습니다." });
  }
};

export default authMiddleware;
