// import todoitems from "../db/todoitems.js";
import todoItemsDB from "../db/todoitems.js";

export function findMany(userId) {
  return todoItemsDB.filter((todoitems) => (todoitems.userId = userId));
}

export function getNewId() {
  return todoItemsDB[todoItemsDB.length - 1]
    ? todoItemsDB[todoItemsDB.length - 1].id + 1
    : 1;
}
