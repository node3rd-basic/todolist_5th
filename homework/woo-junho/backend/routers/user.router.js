import * as userController from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { Router } from "express";
const router = Router()

router.post("/sign-up", userController.postSignUp)
router.post("/sign-in", userController.postSignIn)
router.get("/users/me", authMiddleware, userController.getUserMe)

export default router