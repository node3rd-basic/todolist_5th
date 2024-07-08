import * as userController from "../controllers/users.controller.js";
import { Router } from "express";

import authMiddleware from "../middlewares/auth.middleware.js";
import { signUpValidator } from "../middlewares/validator/signUp.validator.middleware.js";
import { signInValidator } from "../middlewares/validator/signIn.validator.middleware.js";

const router = Router();

//회원가입 api
router.post("/sign_up", signUpValidator, userController.signUp);

//로그인 api
router.post("/sign_in", signInValidator, userController.signIn);

//내 정보 조회 api
router.get("/users/me", authMiddleware, userController.myInfo);

export default router;
