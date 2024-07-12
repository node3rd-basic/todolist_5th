import todoItemsFromDB from '../db/todoItems.js';
import conn from '../common/conn.js'


export async function pushItem(userId, title) {
  const sql = `INSERT INTO todo_items (user_id, title) VALUES (:userId, :title)`;
  const [newTodoItem] = await conn.execute(sql, { userId, title });
  return newTodoItem.insertId;
}

export async function findMany(userId) {
  const [selectItem] = await conn.execute(
    `SELECT * FROM todo_items WHERE user_id = "${userId}"`
  );
  return selectItem;
}
export async function findOneByTodoIdId(id) {
  const sql = `SELECT * FROM todo_items WHERE id = ?`;
  const [selectedTodoItem] = await conn.execute(sql, [id]);
  return selectedTodoItem[0] || null;
}

export async function update(id) {
  await conn.execute(`UPDATE todo_items SET done_at = IF(done_at IS NULL, NOW(), NULL) WHERE id = ?`, [id]);
}

export async function deleteOne(todoItem) {
  const sql = `DELETE FROM todo_items WHERE id = ?`;
  await conn.execute(sql, [todoItem.id]);
}
