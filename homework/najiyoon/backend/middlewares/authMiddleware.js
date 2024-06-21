import jwt from "jsonwebtoken";

const secretkey = "rqjghakrovfdinvczfw";

export default (req, res, next) => {
  const token = req.headers.authorization;

  try {
    req.user = jwt.verify(token, secretkey);
    next();
  } catch (error) {
    res.status(400).json({ message: "등록실패" });
  }
};
