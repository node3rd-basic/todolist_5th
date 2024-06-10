import { Router } from "express"
import authMiddleware from "../middleware/auth.js"
import { getUserOfMe } from "../controller/userController.js"

const router = Router()
router.get("/me", authMiddleware, getUserOfMe)

export default router