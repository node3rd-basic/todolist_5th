import jwt from "jsonwebtoken";

const secretKey = "BasicClass";

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) throw new Error("토큰이 없습니다.");

  req.user = jwt.verify(token, secretKey);
  next();
};
