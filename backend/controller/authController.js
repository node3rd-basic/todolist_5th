import {findUserByEmail, getToken, registerUserAndGet, validateUserInfoWhenSignUp} from "../service/user.js"

/**
 * 로그인 기능을 담당하는 컨트롤러
 * @param req 요청 object
 * @param res 응답 object
 * @returns {*}
 */
export async function signIn(req, res) {
    const { email, password } = req.body
    try {
        const user = await findUserByEmail(email, password)
        const token = getToken(user)
        return res.send({token})
    } catch (e) {
        console.error(e)
        return res.status(401).send({message: "존재 하지 않는 사용자 입니다."})
    }
}

export async function signUp(req, res) {
    try {
        const userInfo = req.body
        await validateUserInfoWhenSignUp(userInfo)
        const user = await registerUserAndGet(userInfo)
        return res.send(user)
    } catch (e) {
        console.error(e)
        return res.status(401).send({message: e.message})
    }
}