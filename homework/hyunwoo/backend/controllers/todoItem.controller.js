import * as todoItemService from "../services/todoItem.service.js";

// todoItem id 찾기
const validateTodoItemId = (req) => {
  const idAsNumber = Number(req.params.id);
  if (isNaN(idAsNumber)) {
    throw new Error("ID는 숫자여야 합니다.");
  }
  return idAsNumber;
};

// 할일 목록 조회
export async function getTodoItems(req, res) {
  const user = req.user;
  const todoItems = await todoItemService.findTodoItems(user.id);
  res.send(todoItems);
}

// 할일 목록 추가
export async function postTodoItem(req, res) {
  const user = req.user;
  const { title } = req.body;
  const newTodoItem = await todoItemService.postTodoItemById(title, user.id);

  res.send(newTodoItem);
}

// 할일 한가지 조회
export async function getTodoItem(req, res) {
  const id = validateTodoItemId(req);
  const todoItem = await todoItemService.findTodoItemById(id);

  res.send(todoItem);
}

// 할일 수정하기
export async function putTodoItem(req, res) {
  const id = validateTodoItemId(req);
  const existTodoItem = await todoItemService.putTodoItemById(id);

  res.send({ result: true });
}

// 할일 삭제하기
export async function deleteTodoItem(req, res) {
  const id = validateTodoItemId(req);
  const existTodoItem = await todoItemService.deleteTodoItemById(id);

  res.send({ result: true });
}
