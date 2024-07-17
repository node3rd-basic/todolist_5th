import * as usersController from "../controller/users.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { Router } from "express";

const router = Router();

//**회원가입 : 주소, 필요정보 기입할 것 : email, password, rePassword, role, name
router.post("/sign-up", usersController.postSignUp);
// //**로그인 : 주소, body : email, password
router.post("/sign-in", usersController.postSignIn);

//**인증 토큰으로 인증; 헤더

router.get("/users/me", authMiddleware, usersController.getUserMe);

export default router;
