import todoItems from "../db/todoItems.js";
import * as todoItemService from "../services/todoItem.service.js";

const validateTodoId = (req) => {
  const todoId = Number(req.params.id);
  if (isNaN(todoId)) {
    throw new Error("Id는 숫자여야 합니다.");
  }
  return todoId;
};

//내 할일 목록
export function getTodoItems(req, res) {
  const user = req.user;
  const todoItems = todoItemService.todoItemByUserId(user.id);
  res.send(todoItems);
}

// 할일 조회
export function getTodoItem(req, res) {
  try {
    const id = validateTodoId(req);
    const todoItem = todoItemService.findTodoItemById(id);
    res.send(todoItem);
  } catch (error) {
    res.status(400).send(e.message);
  }
}

// 할일 생성
export function postTodoItem(req, res) {
  const { title } = req.body;
  const user = req.user;

  const newTodoItem = todoItemService.getTodoItem(title, user.id);
  res.send(newTodoItem);
}

// 할일 수정
export function putTodoItem(req, res) {
  const id = validateTodoId(req);
  //해당 id를 가지고 있는 todoitem 찾기
  todoItemService.putTodoItemById(id);
  res.send({ message: "수정되었습니다." });
}

// 할일 삭제
export function deleteTodoItem(req, res) {
  const id = validateTodoId(req);
  todoItemService.deleteTodoItemById(id);
  res.send({ message: "todoItem이 삭제되었습니다." });
}
