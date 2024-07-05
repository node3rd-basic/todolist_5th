import todoItemsDB from "../db/todoItems.js";

// id 지정하기
export function getIncrementedId() {
  return todoItemsDB.length === 0
    ? 1
    : todoItemsDB[todoItemsDB.length - 1].id + 1;
}

// todoItem index 찾기
function findTodoItemIndex(existTodoItem) {
  const todoItemIndex = todoItemsDB.indexOf(existTodoItem);
  return todoItemIndex;
}

// id에 맞는 todoItem 찾기
export function getTodoItemById(id) {
  const todoItem = todoItemsDB.find((todoItem) => todoItem.id === id);
  if (!todoItem) {
    throw new Error("해당 아이디를 가진 todoItem이 없습니다.");
  }
  return todoItem;
}

// todoItems 찾기
export function findMany(userId) {
  return todoItemsDB.filter((todoItem) => todoItem.userId === userId);
}

// todoItem 추가하기
export function save(todoItem) {
  return todoItemsDB.push(todoItem);
}

// todoItem index 찾아서 수정하기
export function update(existTodoItem, doneAt) {
  const todoItemIndex = findTodoItemIndex(existTodoItem);

  todoItemsDB.splice(todoItemIndex, 1, {
    ...existTodoItem,
    doneAt,
  });
}

// todoItem index 찾아서 삭제하기
export function deleteOne(existTodoItem) {
  const todoItemIndex = findTodoItemIndex(existTodoItem);

  todoItemsDB.splice(todoItemIndex, 1);
}
