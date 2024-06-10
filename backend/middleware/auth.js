import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
    try {
        const token = req.headers.authorization
        const user = jwt.verify(token, process.env.AUTH_SECRET_KEY)
        req.user = {
            id: +user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        }
        next()
    } catch {
        res.status(401).send("Not invalid User")
    }
}