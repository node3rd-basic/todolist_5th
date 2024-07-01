import authMiddleware from "../middlewares/auth.Middleware.js";
import * as todoItemController from "../controllers/todoItem.controller.js";
import { Router } from "express";

const router = Router();

router.use(authMiddleware); // 전부 다 authMiddleware를 사용하니까 지금 여기 파일 안의 라우터에서는 전부 미들웨어를 먼저 걸친다.라는 뜻!

// 모든 todo-items 주소가 똑같으니 밖에서 애초에 들어올 때 todo-items를 통해서 들어 올 수 있도록 app.js파일 속 app.use("/todo-items", todoItemRouter);에 주소값을 넣는다.
// 목록 조회 API 만들기
router.get("/", todoItemController.getTodoItems);

// 목록 추가 API
router.post("/", todoItemController.postTodoItem);

// 목록 상세 조회 API
router.get("/:id", todoItemController.getTodoItem);

// 목록 수정 APi (7차 강의)
router.put("/:id", todoItemController.putTodoItem);

// 할 일 목록들 중 하나 삭제 API
router.delete("/:id", todoItemController.deleteTodoItem);

export default router;
