import * as todoItemService from "../services/todoitem.service.js";

const validateTodoItemId = (req) => {
  const idAsNumber = Number(req.params.id);
  if (isNaN(idAsNumber)) {
    throw new Error("Id는 숫자여야합니다.");
  }

  return idAsNumber;
};

// user.id가 어디서 받아 온 것 인지 확인하기
// app.js에서 app.get("/todo-items", authMiddleware, todoItemController.getTodoItems);에서
// 그 중 authMiddleware에서 가져옴.
// 생각해보면 할 일 목록 가져온 것에서 인증한 아이디를 통해 DB에서 검색하는 것이니까 맞음.
export function getTodoItems(req, res) {
  const user = req.user;
  const todoItems = todoItemService.getTodoItemsById(user.id);
  res.send(todoItems);
}

export function postTodoItem(req, res) {
  const { title } = req.body;
  const user = req.user;
  const newItem = todoItemService.saveTodoItem(title, user.id);
  res.send(newItem);
}

export function getTodoItem(req, res) {
  const id = validateTodoItemId(req);
  const todoItem = todoItemService.getTodoItemById(id);
  res.send(todoItem);
}

// 수정 api
export function putTodoItem(req, res) {
  const id = validateTodoItemId(req);

  todoItemService.toggleDontAtById(id);
  res.send({
    result: true,
  });
}

export function deleteTodoItem(req, res) {
  const id = validateTodoItemId(req);
  todoItemService.deleteTodoItemById(id);
  res.send({
    result: true,
  });
}
