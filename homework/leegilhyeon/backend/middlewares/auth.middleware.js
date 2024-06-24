import jwt from "jsonwebtoken";

const secretKey = "wewqsfaserafgf";

export default (req, res, next) => {
  const token = req.headers.authorization;
  try {
    req.user = jwt.verify(token, secretKey);
    next();
  } catch (error) {
    res.status(401).send({ message: "권한이 없습니다." });
  }
};
