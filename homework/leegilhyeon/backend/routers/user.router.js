import * as usersController from "../controllers/user.controller.js";
import { Router } from "express";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();
//회원가입
router.post("/sign-up", usersController.SignUp);

//로그인
router.post("/sign-in", usersController.SignIn);

//토큰검증
router.get("/users/me", authMiddleware, usersController.UserMe);

export default router;
