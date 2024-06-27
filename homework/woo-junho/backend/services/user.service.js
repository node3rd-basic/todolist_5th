import jwt from "jsonwebtoken";

import * as userRepository from "../repositories/user.repository.js";
import CustomError from "../common/custom.error.js";


export function getUserByEmail(email) {
    return userRepository.findOne(email)
}

export function saveUser(email, password, role, name) {
    const existingUser = getUserByEmail(email)

    if (existingUser) {
        throw new CustomError("이미 가입된 이메일 입니다.", 409)
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
        throw new CustomError("사용자를 찾을 수 없습니다.", 401)
    }

    if (selectedUser.password !== password) {
        throw new CustomError("사용자를 찾을 수 없습니다.", 401)
    }

    const { password: _password, ...user} = selectedUser
    return jwt.sign(user, process.env.JWT_SECRET_KEY)
}