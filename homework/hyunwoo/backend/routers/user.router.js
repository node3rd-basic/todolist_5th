import { Router } from 'express';
import * as userController from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

/** 회원가입 api 구현 */
router.post("/sign-up", userController.postSignUp);

/** 로그인 api 구현 */
router.post("/sign-in", userController.postSignIn);

/** 토큰 검증 api 구현 */
router.get("/users/me", authMiddleware, userController.getUserMe);

export default router;