import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = req.headers.authorization;
  console.log("asdasdd");
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET_KEY);

    console.log("req.user!@#!@#!", req.user);
    next();
  } catch (error) {
    res.status(401).send({ message: "권한이 없습니다." });
  }
};
