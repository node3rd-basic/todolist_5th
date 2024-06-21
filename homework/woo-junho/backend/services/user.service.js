import * as userRepository from "../repositories/user.repository.js";
import jwt from "jsonwebtoken";

const secretKey = "ijklsdf89ufsdjklsdf"

export function getUserByEmail(email) {
    return userRepository.findOne(email)
}

export function saveUser(email, password, role, name) {
    const existingUser = getUserByEmail(email)

    if (existingUser) {
        throw new Error("이미 가입된 이메일 입니다.")
    }
    const newUser = {
        email,
        password,
        role,
        name
    }
    userRepository.save(newUser)
    return newUser
}

export function signIn(email, password) {
    const selectedUser = getUserByEmail(email)
    if (!selectedUser) {
        throw new Error("사용자를 찾을 수 없습니다.")
    }

    if (selectedUser.password !== password) {
        throw new Error("사용자를 찾을 수 없습니다.")
    }

    const { password: _password, ...user} = selectedUser
    return jwt.sign(user, secretKey)
}