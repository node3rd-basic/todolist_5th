import * as todoItemService from "../services/todoItem.service.js";

const validateTodoItemId = (req) => {
  const idAsNumber = Number(req.params.id);
  if (isNaN(idAsNumber)) {
    throw new Error("Id는 숫자여야합니다.");
  }

  return idAsNumber;
};

// 목록 조회 api
// user.id가 어디서 받아 온 것 인지 확인하기
// app.js에서 app.get("/todo-items", authMiddleware, todoItemController.getTodoItems);에서
// 그 중 authMiddleware에서 가져옴.
// 생각해보면 할 일 목록 가져온 것에서 인증한 아이디를 통해 DB에서 검색하는 것이니까 맞음.
export async function getTodoItems(req, res) {
  const user = req.user;
  const todoItems = await todoItemService.getTodoItemsById(user.id);
  res.send(todoItems);
}

// 할 일 등록 api
export async function postTodoItem(req, res) {
  const { title } = req.body;
  const user = req.user;
  console.log(user);
  const newItem = await todoItemService.saveTodoItem(title, user.id);
  res.send(newItem);
}

// 목록 상세 조회 api
export async function getTodoItem(req, res) {
  const id = validateTodoItemId(req);
  const todoItem = await todoItemService.getTodoItemById(id);
  res.send(todoItem);
}

// 수정 api
export async function putTodoItem(req, res) {
  const id = validateTodoItemId(req);

  await todoItemService.toggleDoneAtById(id);
  res.send({
    result: true,
  });
}

// 삭제 api
export async function deleteTodoItem(req, res) {
  const id = validateTodoItemId(req);
  await todoItemService.deleteTodoItemById(id);
  res.send({
    result: true,
  });
}
