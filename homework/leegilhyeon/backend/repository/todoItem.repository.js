import todoItemsDB from "../db/todoItems.js";

export function findTodoItemById(id) {
  const todoItem = todoItemsDB.find((todoItem) => todoItem.id === id);
  return todoItem;
}

export function findTodoItems(userId) {
  return todoItemsDB.filter((todoItem) => todoItem.userId === userId);
}

export function getNewId() {
  const incrementedTodoId = (arr) =>
    arr[todoItemsDB.length - 1] ? arr[todoItemsDB.length - 1].id + 1 : 1;
  return incrementedTodoId;
}

export function pushTodoItem(TodoItem) {
  todoItemsDB.push(TodoItem);
}

export function putTodoItem(todoItem, doneAt) {
  const todoItemIndex = todoItemsDB.indexOf(todoItem);
  todoItemsDB.splice(todoItemIndex, 1, {
    ...todoItem,
    doneAt,
  });
}

export function deleteTodoItem(todoItem) {
  const deleteTodoItem = todoItemsDB.indexOf(todoItem);
  todoItemsDB.splice(deleteTodoItem, 1);
}
