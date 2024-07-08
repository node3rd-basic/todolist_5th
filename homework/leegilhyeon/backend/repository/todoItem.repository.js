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

export async function pushTodoItem(saveTodoItem) {
  const sql = `INSERT INTO todo_items (user_id, title) VALUES (${saveTodoItem.userId}, '${saveTodoItem.title}')`
  const [result] = await conn.execute(sql)
  // return {
  //   ...saveTodoItem,
  //   id: result.insertId
  // }
  return result.insertId
 // todoItemsDB.push(newTodoItem);
}

export async function putTodoItem(id) {
  const sql = `update todo_items set done_at = if(done_at is null, now(), null) where id = ${id}`
   await conn.execute(sql)
  // const todoItemIndex = todoItemsDB.indexOf(todoItemFind);
  // todoItemsDB.splice(todoItemIndex, 1, {
  //   ...todoItemFind,
  //   doneAt,
  // });
}

export async function deleteById(id) {
  // const deleteTodoItem = todoItemsDB.indexOf(todoItem);
  const sql = `delete from todo_items where id = ${id}`
  await conn.execute(sql)
  // todoItemsDB.splice(deleteTodoItem, 1);
}
