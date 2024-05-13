import jwt from "jsonwebtoken"
import {findByEmail, saveAndId} from "../repository/user.js";
import crypto from "crypto"

export async function findUserByEmail(email, password) {
    const user = await findByEmail(email)
    if (!user) {
        throw Error("Not exists User")
    }

    if (user.password !== hashPassword(password)) {
        throw Error("Not exists User")
    }
    return user
}

export function getToken(user) {
    return jwt.sign({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
    }, process.env.AUTH_SECRET_KEY);
}


export async function checkDuplicatedEmail(email) {
    const user = await findByEmail(email)
    return !!user
}

export async function validateUserInfoWhenSignUp({ email, name, password, rePassword, role }) {
    if (!email || !name || !password || !rePassword || !role) {
        throw Error("Not enough required values For register")
    }
    if (password != rePassword) {
        throw Error("Check your password")
    }

    if (!["student", "tutor"].includes(role)) {
        throw Error("Check your role value. It must be student or tutor")
    }

    if (await checkDuplicatedEmail(email)) {
        throw Error("Duplicated your email. Check your email")
    }
}

export function hashPassword(password) {
    const salt = Buffer.from("thisissale").toString('base64')
    return crypto.createHash('sha512').update(password + salt).digest('hex')
}

export async function registerUserAndGet({ email, name, password, role }) {
    const id = await saveAndId({
        email,
        name,
        password: hashPassword(password),
        role,
    })
    return {
        id,
        email,
        name,
        role,
    }
}