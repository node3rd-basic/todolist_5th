import * as userController from '../controllers/user.controller.js';
import { Router } from 'express';

import authMiddleware from '../middlewares/auth.middleware.js';
import { signUpInputValidator } from '../middlewares/validators/signUpInput.validator.middleware.js';
import { signInInputValidator } from '../middlewares/validators/signInInput.validator.middleware.js';

const router = Router();

//회원가입 api
router.post('/sign-up', signUpInputValidator, userController.postSignUp);
//로그인 api
router.post('/sign-in', signInInputValidator, userController.postSignIn);
//토큰 검증 api
router.get('/users/me', authMiddleware, userController.getUserMe);

export default router;
