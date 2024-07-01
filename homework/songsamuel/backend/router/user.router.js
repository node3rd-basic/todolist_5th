import authMiddleware from "../middlewares/auth.Middleware.js";
import * as userController from "../controllers/user.controller.js";
import { Router } from "express";

const router = Router();

// 회원가입 api
router.post("/sign-up", userController.postSignUp);

//로그인 APi
router.post("/sign-in", userController.postSignIn);

// 내 정보 조회
router.get("/users/me", authMiddleware, userController.getUserMe);

export default router;
