import todoItemsFromDB from "../db/todoitems.js";

export function findMany(userId) {
  return todoItemsFromDB.filter((todoItem) => todoItem.userId === userId);
}

export function getNewId() {
  return todoItemsFromDB.length === 0
    ? 1
    : todoItemsFromDB[todoItemsFromDB.length - 1].id + 1;
}

export function saveTodoItem(newItem) {
  return todoItemsFromDB.push(newItem);
}

export function findOneById(id) {
  return todoItemsFromDB.find((todoItem) => todoItem.id === id);
}

export function update(checkTodoItem, doneAt) {
  const todoItemsIndex = todoItemsFromDB.indexOf(checkTodoItem);

  todoItemsFromDB.splice(todoItemsIndex, 1, {
    ...checkTodoItem,
    doneAt,
  });
}

export function deleteOne(todoItem) {
  const indexTodoItem = todoItemsFromDB.indexOf(todoItem);

  todoItemsFromDB.splice(indexTodoItem, 1);
}
