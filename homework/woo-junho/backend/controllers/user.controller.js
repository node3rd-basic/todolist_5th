import users from "../db/users.js";
import jwt from "jsonwebtoken";
import todoItems from "../db/todoItems.js";

const secretKey = "ijklsdf89ufsdjklsdf"

const getIncrementedId = arr => arr[todoItems.length - 1]
    ? arr[todoItems.length - 1].id + 1
    : 1

export function postSignUp(req, res) {
    const {email, password, rePassword, role, name} = req.body
    if (!email ||
        !password ||
        !rePassword ||
        !role ||
        !name ||
        password !== rePassword) {
        res.status(400).send({"message": "입력 값을 확인 해 보세요"})
        return
    }

    const existingUser = users.find(user => user.email === email)

    if (existingUser) {
        res.status(409).json({"message": "이미 가입된 이메일 입니다."})
        return
    }

    const id = getIncrementedId(users)
    const newUser = {id, email, password, role, name}
    users.push(newUser)
    res.json(newUser)
}

export function postSignIn(req, res) {
    const { email, password } = req.body
    const selectedUser = users.find(user => user.email === email && user.password === password)
    if (!selectedUser) {
        res.status(401).send({"message": "사용자를 찾을 수 없습니다."})
        return
    }
    const { password: _password, ...user} = selectedUser

    if (!user) {
        res.status(404).send({"message": "사용자를 찾을 수 없습니다."})
        return
    }

    const token = jwt.sign(user, secretKey)
    res.json({token})
}

export function getUserMe(req, res) {
    res.json(req.user)
}