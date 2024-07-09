import conn from "../common/conn.js"

export async function findTodoItemById(id) {
  const sql = `SELECT * FROM todo_items WHERE id = ?`
  const [todoItem] = await conn.execute(sql, [id])

  return todoItem[0] ? todoItem[0] : null 
}

export async function findTodoItems(userId) {
  const sql = `SELECT * FROM todo_items WHERE user_id = ?`
  const [rows]= await conn.execute(sql, [userId])
  return rows
}

export async function pushTodoItem(saveTodoItem) {

  const sql = `INSERT INTO todo_items (user_id, title) VALUES (?, ?)`
  const [result] = await conn.execute(sql, [saveTodoItem.userId, saveTodoItem.title])
  
  return result.insertId
}

export async function putTodoItem(id) {
  const sql = `update todo_items set done_at = if(done_at is null, now(), null) where id = ?`
   await conn.execute(sql, [id])
}

export async function deleteById(id) {
  const sql = `delete from todo_items where id = ?`
  await conn.execute(sql, [id])
}
