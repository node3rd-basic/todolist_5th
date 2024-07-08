import * as todoitemsController from "../controllers/todoitems.controller.js";
import { Router } from "express";

import { postValidator } from "../middlewares/validator/post.validator.middleware.js";
import { postIdValidator } from "../middlewares/validator/postId.validator.middleware.js";
import { keywordValidator } from "../middlewares/validator/keyword.validator.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();
router.use(authMiddleware);
//내 글 찾기 api
router.get("/", todoitemsController.myPost);

//할 일 상세 보기 api
router.get("/:id", todoitemsController.myPostById);

//할 일 검색 api
router.get(
  "/search/:keyword",
  keywordValidator,
  todoitemsController.searchByKeyword
);

//할 일 등록 api
router.post("/", postValidator, todoitemsController.createNewTodoItem);

//할 일 종료 api
router.put("/:id", postIdValidator, todoitemsController.toggleTodoItem);

//할 일 삭제 api
router.delete(
  "/:id",
  postIdValidator,
  todoitemsController.deleteMyPostByPostId
);

export default router;
