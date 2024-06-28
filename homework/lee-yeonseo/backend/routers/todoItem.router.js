import * as todoItemController from '../controllers/todoItem.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import { todoItemIdValidator } from '../middlewares/validators/todoItemId.validator.middleware.js';
import { createPostValidator } from '../middlewares/validators/createPost.validator.middleware.js';
import { Router } from 'express';

const router = Router();

router.use(authMiddleware);
//할 일 목록 조회 api
router.get('/', todoItemController.getTodoItems);
//할 일 상세 조회 api
router.get('/:id', todoItemIdValidator, todoItemController.getTodoItem);
//할 일 등록 api
router.post('/', createPostValidator, todoItemController.postTodoItem);
//할 일 수정 api
router.put('/:id', todoItemIdValidator, todoItemController.putTodoItem);
//할 일 삭제 api
router.delete('/:id', todoItemIdValidator, todoItemController.deleteTodoItem);

export default router;
