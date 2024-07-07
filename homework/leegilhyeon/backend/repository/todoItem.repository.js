import todoItemsDB from "../db/todoItems.js";
import conn from "../common/conn.js"

export async function findTodoItemById(id) {
  const [todoItem] = await conn.execute(`SELECT * FROM todo_items WHERE id = ${id}`)
  //const todoItem = todoItemsDB.find((todoItem) => todoItem.id === id);
  return todoItem[0] ? todoItem[0] : null 
}

export async function findTodoItems(userId) {
  const sql = `SELECT * FROM todo_items WHERE user_id = ${userId}`
  const [rows]= await conn.execute(sql)
  return rows  //todoItemsDB.filter((todoItem) => todoItem.userId === userId);
}

// export function getNewId() {
//   return todoItemsDB.length === 0
//     ? 1
//     : todoItemsDB[todoItemsDB.length - 1].id + 1;
// }

export async function pushTodoItem(newTodoItem) {
  const sql = `INSERT INTO todo_items (user_id, title) VALUES (${newTodoItem.userId}, '${newTodoItem.title}')`
  const [result] = await conn.execute(sql)
  return {
    ...newTodoItem,
    id: result.insertId
  }
 // todoItemsDB.push(newTodoItem);
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
