import todoItemsFromDB from '../db/todoItems.js';

export function findMany(userId) {
  return todoItemsFromDB.filter((todoItem) => todoItem.userId === Number(userId));
}

export function pushItem(todoItem) {
  return todoItemsFromDB.push(todoItem);
}

export function getNewId() {
  return todoItemsFromDB.length === 0 ? 1 : todoItemsFromDB[todoItemsFromDB.length - 1].id + 1;
}

export function findOneById(id) {
  return todoItemsFromDB.find((todoItem) => todoItem.id === id);
}

export function update(todoItem, doneAt) {
  const todoItemIndex = todoItemsFromDB.indexOf(todoItem);
  todoItemsFromDB.splice(todoItemIndex, 1, { ...todoItem, doneAt });
}

export function deleteOne(todoItem) {
  const deleteItemIndex = todoItemsFromDB.indexOf(todoItem);
  todoItemsFromDB.splice(deleteItemIndex, 1);
}
