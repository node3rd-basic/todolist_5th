import todoItems from "../db/todoItems.js";

export function findTodoItemById(id) {
  const todoItem = todoItems.find((todoItem) => todoItem.id === id);
  return todoItem;
}

export function todoItemByUserId(userId) {
  return todoItems.filter((todoItem) => todoItem.userId === userId);
}
