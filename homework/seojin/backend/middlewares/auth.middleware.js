import jwt from "jsonwebtoken";

export default (req, res, next) => {
    const token = req.headers.authorization
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET_KEY)
  
        next()
    } catch (e) {
        res.status(401).send({"message": "권한이 없습니다."})
    }
}