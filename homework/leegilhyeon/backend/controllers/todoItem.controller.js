import todoItems from "../db/todoItems.js";

const todoItemById = (id) => {
  const todoItem = todoItems.find((todoItem) => todoItem.id === id);
  if (!todoItem) {
    throw new Error("해당 아이디가 가진 todoItem이 없습니다.");
  }
  return todoItem;
};
const validateTodoId = (req) => {
  const todoId = Number(req.params.id);
  if (isNaN(todoId)) {
    throw new Error("Id는 숫자여야 합니다.");
  }
  return todoId;
};

const incrementedTodoId = (arr) =>
  arr[todoItems.length - 1] ? arr[todoItems.length - 1].id + 1 : 1;

//내 할일 목록
export function getTodoItems(req, res) {
  const user = req.user;

  res.send(todoItems.filter((todoItem) => todoItem.userId === user.id));
}

// 할일 조회
export function getTodoItem(req, res) {
  try {
    const id = validateTodoId(req);
    const todoItem = todoItemById(id);
    res.send(todoItem);
  } catch (error) {
    res.status(400).send(e.message);
  }
}

// 할일 생성
export function postTodoItem(req, res) {
  const { title } = req.body;
  const user = req.user;

  const newId = incrementedTodoId(todoItems);
  const newTodoItem = {
    id: newId,
    userId: user.id,
    title: title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: null,
  };
  todoItems.push(newTodoItem);
  res.send(newTodoItem);
}

// 할일 수정
export function putTodoItem(req, res) {
  const id = validateIdMiddleware(req);
  //해당 id를 가지고 있는 todoitem 찾기
  const todoItemFind = todoItemById(id);
  const todoItemIndex = todoItems.indexOf(todoItemFind);
  todoItems.splice(todoItemIndex, 1, {
    ...todoItemFind,
    doneAt: todoItemFind.doneAt == null ? new Date() : null,
  });
  res.send({ message: "수정되었습니다." });
}

// 할일 삭제
export function deleteTodoItem(req, res) {
  const id = validateIdMiddleware(req);
  const deleteTodoItem = todoItemById(id);
  todoItems.splice(deleteTodoItem, 1);
  res.send({ message: "todoItem이 삭제되었습니다." });
}
