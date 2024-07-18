import jwt from "jsonwebtoken";

const secretKey = "kljsdfjkl;sdfioijm3";

/** token 미들웨어 */
const authMiddleware = (req, res, next) => {
  // console.log("authMiddleware!");
  // console.log(req.headers.authorization);
  // console.log(req.user);

  const token = req.headers.authorization;
  // console.log("token in middleware : ", token);
  try {
    const user = jwt.verify(token, secretKey);
    // console.log("user in authMiddleware :", user);
    req.user = user;
    next();
  } catch (e) {
    res.status(401).json({ message: "권한이 없습니다." });
  }
};

export default authMiddleware;
