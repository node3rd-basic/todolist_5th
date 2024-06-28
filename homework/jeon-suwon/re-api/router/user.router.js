import { authMiddleware } from "../middleware/auth.middleware.js";
import * as userController from "../controllers/user.controller.js";
import express from "express";

const userRouter = express();
//회원가입
userRouter.post("/sign-up", userController.postSignup);
//로그인
userRouter.post("/sign-in", userController.postSignin);
//유저정보조회
userRouter.get("/users/me", authMiddleware, userController.getuser);

export { userRouter };
