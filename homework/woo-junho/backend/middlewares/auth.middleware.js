import jwt from "jsonwebtoken";

const secretKey = "ijklsdf89ufsdjklsdf"

export default (req, res, next) => {
    const token = req.headers.authorization
    try {
        req.user = jwt.verify(token, secretKey)
        next()
    } catch (e) {
        res.status(401).send({"message": "권한이 없습니다."})
    }
}