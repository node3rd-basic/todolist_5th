import jwt from "jsonwebtoken";
import "dotenv/config";

export default (req, res, next) => {
  const token = req.headers.authorization;
  console.log({ token });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(req.user);
    next();
  } catch (error) {
    res.status(400).json({ message: "등록실패" });
  }
};
