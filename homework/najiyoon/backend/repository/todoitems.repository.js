import todoItemsDB from "../db/todoitems.js";
//목록조회
export function findMany(userId) {
  return todoItemsDB.filter((todoitems) => (todoitems.userId = userId));
}
//등록
export function getNewId(userId) {
  return todoItemsDB[todoItemsDB.length - 1]
    ? todoItemsDB[todoItemsDB.length - 1].id + 1
    : 1;
}

export function saveTodoItem(todoItem) {
  todoItemsDB.push(todoItem);
}
//1개 조회
export function oneTodoItem(id) {
  return todoItemsDB.find((todoitems) => todoitems.id === id);
}
//수정
export function putTodoItem() {
  const reInPutTodoItem = todoItemsDB.find((todoItems) => todoItems.id === id);
  return reInPutTodoItem;
}
