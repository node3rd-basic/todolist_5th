import authMiddleware from "../middlewares/authMiddleware.js";
import * as todoItemsController from "../controller/todoitems.controller.js";
import { Router } from "express";

const router = Router();
router.use(authMiddleware);
//**할일목록 - 등록
router.post("/", todoItemsController.postTodoItem);

//**할일목록 - 목록조회: 그런데 내 아잉디를 가지고 있는 ; 토큰;토큰이 유효하지 않다면?:서버꺼지지않게
router.get("/", todoItemsController.getTodoItems);

//**할잉ㄹ목록 - 목록1개 조회 : 내 아이디에서 목록번호1개:id
router.get("/:id", todoItemsController.getTodoItem);
//** 할일목록- 수정:id/업데이트 메서드 : 내 아이디, 내가 원하는 수정목록1개
router.put("/:id", todoItemsController.putTodoItem);

//**할일목록 - 삭제:id/삭제하는 메서드
router.delete("/:id", todoItemsController.delTodoItem);

export default router;
