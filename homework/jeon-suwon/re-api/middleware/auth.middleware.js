import jwt from "jsonwebtoken";
import { ENV_KEY } from "../constants/env.constants.js";

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) throw new Error("토큰이 없습니다.");

  req.user = jwt.verify(token, ENV_KEY.SECRET_KEY);
  next();
};
