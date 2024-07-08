import conn from "../common/conn.js"

export async function findTodoItemById(id) {
  const [todoItem] = await conn.execute(`SELECT * FROM todo_items WHERE id = ${id}`)

  return todoItem[0] ? todoItem[0] : null 
}

export async function findTodoItems(userId) {
  const sql = `SELECT * FROM todo_items WHERE user_id = ${userId}`
  const [rows]= await conn.execute(sql)
  return rows
}

export async function pushTodoItem(saveTodoItem) {

  const sql = `INSERT INTO todo_items (user_id, title) VALUES (${saveTodoItem.userId}, '${saveTodoItem.title}')`
  const [result] = await conn.execute(sql)
  
  return result.insertId
}

export async function putTodoItem(id) {
  const sql = `update todo_items set done_at = if(done_at is null, now(), null) where id = ${id}`
   await conn.execute(sql)
}

export async function deleteById(id) {
  const sql = `delete from todo_items where id = ${id}`
  await conn.execute(sql)
}
