import todoItems from '../db/todoItems.js';

const incrementedId = (arr) => (arr[arr.length - 1] ? arr[arr.length - 1].id + 1 : 1);

// ID값이 숫자인지 검증
const validateTodoItemId = (req) => {
  const idAsNumber = Number(req.params.id);
  if (isNaN(idAsNumber)) {
    throw new Error('Id must be a number');
  }
  return idAsNumber;
};

// 할일 목록들 조회 API
export function getTodoItems(req, res) {
  const user = req.user;
  res.send(todoItems.filter((todoItem) => todoItem.userId === Number(user.id)));
}

// [성일 튜터님] 일관된 컨벤션을 정하자.
// createOne
// deleteOne
// updateOne
// 베이직반은 postItem / getItem 과 같은 컨벤션을 하기로 하였습니다.

// 할일 등록 API
export function postTodoItem(req, res) {
  const { title } = req.body;
  const user = req.user;
  const newTodoId = incrementedId(todoItems);
  const newTodoItem = {
    id: newTodoId,
    userId: Number(user.id),
    title: title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  todoItems.push(newTodoItem);
  res.send(newTodoItem);
}

// 할일 삭제 API
export function deleteTodoItem(req, res) {
  const userId = req.user.id;
  const id = validateTodoItemId(req);
  const deleteItemIndex = todoItems.findIndex((todoItem) => todoItem.id === id);
  const deleteItem = todoItems[deleteItemIndex];
  if (!deleteItem) {
    res.status(404).send({ message: '할일을 찾을 수 없습니다.' });
    return;
  }
  if (deleteItem.userId !== userId) {
    res.status(401).send({ message: '권한이 없습니다.' });
    return;
  }
  todoItems.splice(deleteItemIndex, 1);
  res.send({ result: 'true' });
}

// 할일 완료/미완료 API
export function putTodoItem(req, res) {
  const id = validateTodoItemId(req);
  const selectItemIndex = todoItems.findIndex((sel) => sel.id === id);
  const selectItem2 = todoItems[selectItemIndex];
  if (selectItemIndex === -1) {
    res.status(404).send({ message: '할일을 찾을 수 없습니다.' });
    return;
  }
  if (selectItem2.userId !== req.user.id) {
    res.status(401).send({ message: '권한이 없습니다.' });
  }
  const selectItem = todoItems.find((sel) => sel.id === Number(id));
  const putItem = {
    ...selectItem,
    doneAt: selectItem.doneAt == null ? new Date() : null,
  };
  todoItems.splice(selectItemIndex, 1, putItem);
  res.status(200).send({ result: 'true' });
}

// 할일 상세 조회 API
// app.get('/todo-items/:id', authMiddleware, (req, res) => {
export function getTodoItem(req, res) {
  const id = validateTodoItemId(req);
  const todoItem = todoItems.find((todoItem) => todoItem.id === id);
  res.send(todoItem);
  res.send({ message: '할일 상세조회다.' });
}

// 할일 목록들 조회 API
// app.get('/todo-items/search/:keyword', (req, res) => {
export function getTodoItems3(req, res) {
  res.send({ message: '할일 상세조회다.' });
}
