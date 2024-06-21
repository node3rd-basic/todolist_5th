import * as userService from "../services/user.service.js";

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

    try {
        const newUser = userService.saveUser(email, password, role, name)
        res.json(newUser)
    } catch (e) {
        console.error(e)
        res.status(400).send({"message": e.message})
    }
}

export function postSignIn(req, res) {
    const { email, password } = req.body
    try {
        const token = userService.signIn(email, password)
        res.json({token})
    } catch (e) {
        console.error(e)
        res.status(401).send({"message": e.message})
    }
}

export function getUserMe(req, res) {
    res.json(req.user)
}