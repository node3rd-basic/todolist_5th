
import * as userController from '../controllers/users.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'
import { Router } from "express";
const router = Router()

router.post("/sign-up", userController.postUserSignUp)
router.post("/sign-in", userController.postUserSignIn)
router.get("/users/me", authMiddleware, userController.getUserMe)

export default router
