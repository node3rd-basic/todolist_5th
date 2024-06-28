import todoItemsDB from "../db/todoItems.js";

export function findTodoItemById(id) {
  const todoItem = todoItemsDB.find((todoItem) => todoItem.id === id);
  return todoItem;
}

export function findTodoItems(userId) {
  return todoItemsDB.filter((todoItem) => todoItem.userId === userId);
}

export function getNewId() {
  return todoItemsDB.length === 0
    ? 1
    : todoItemsDB[todoItemsDB.length - 1].id + 1;
}

export function pushTodoItem(newTodoItem) {
  todoItemsDB.push(newTodoItem);
}

export function putTodoItem(todoItemFind, doneAt) {
  const todoItemIndex = todoItemsDB.indexOf(todoItemFind);
  todoItemsDB.splice(todoItemIndex, 1, {
    ...todoItemFind,
    doneAt,
  });
}

export function deleteById(todoItem) {
  const deleteTodoItem = todoItemsDB.indexOf(todoItem);
  todoItemsDB.splice(deleteTodoItem, 1);
}
