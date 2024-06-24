import todoItems from "../db/todoItems.js";

// id 지정하기
const getIncrementedId = (arr) =>
    arr[arr.length - 1] ? arr[arr.length - 1].id + 1 : 1;

// todoItem id 찾기
const validateTodoItemId = (req) => {
  const idAsNumber = Number(req.params.id);
  if (isNaN(idAsNumber)) {
    throw new Error("ID는 숫자여야 합니다.");
  }
  return idAsNumber;
};

// id에 맞는 todoItem 찾기
const getTodoItemById = (id) => {
  const todoItem = todoItems.find((todoItem) => todoItem.id === id);
  if (!todoItem) {
    throw new Error("해당 아이디를 가진 todoItem이 없습니다.");
  }
  return todoItem;
};

// 할일 목록 조회
export function getTodoItems(req, res, next) {
  const user = req.user;
  res.send(todoItems.filter((todoItem) => todoItem.userId === user.id));
}

// 할일 목록 추가
export function postTodoItem(req, res, next) {
  const user = req.user;
  const { title } = req.body;

  const newId = getIncrementedId(todoItems);

  const newTodoItem = {
    id: newId,
    userId: user.id,
    title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: null,
  };

  todoItems.push(newTodoItem);

  res.send(newTodoItem);
}

// 할일 한가지 조회
export function getTodoItem(req, res, next) {
  const id = validateTodoItemId(req);

  const todoItem = getTodoItemById(id);

  res.send(todoItem);
}

// 할일 수정하기
export function putTodoItem(req, res, next) {
  // 할일 id 가져오기
  const id = validateTodoItemId(req);

  // id에 맞는 todoItem 조회
  const existTodoItem = getTodoItemById(id);

  // id에 해당하는 todoItem의 인덱스를 확인
  const todoItemIndex = todoItems.indexOf(existTodoItem);
  // 해당 todoItem에서 doneAt을 수정
  todoItems.splice(todoItemIndex, 1, {
    ...existTodoItem,
    doneAt: existTodoItem.doneAt == null ? new Date() : null, // 삼항연산자로 표시
  });

  res.send({ result: true });
}

// 할일 삭제하기
export function deleteTodoItem(req, res, next) {
  // 할일 id 가져오기
  const id = validateTodoItemId(req);

  // id에 해당하는 인덱스 찾기
  const existTodoItem = getTodoItemById(id);
  const indexToDelete = todoItems.indexOf(existTodoItem);

  // 해당 인덱스에 있는 할일 삭제
  todoItems.splice(indexToDelete, 1);

  res.send({ result: true });
}