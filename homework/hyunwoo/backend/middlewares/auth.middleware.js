import jwt from "jsonwebtoken";

// token 인증
export default (req, res, next) => {

  const token = req.headers.authorization;
  console.log(token)
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    next();
  } catch (e) {
    res.status(401).send({ "messagae": "권한이 없습니다." });
  }
};