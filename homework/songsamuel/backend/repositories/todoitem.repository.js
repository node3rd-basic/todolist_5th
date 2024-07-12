import conn from "../common/conn.js";

export async function findMany(userId) {
  const sql = `SELECT * FROM todo_items WHERE user_id = ?`;

  const [rows] = await conn.execute(sql, [userId]);

  console.log("[rows]", [rows]);
  return rows;
}

export async function saveTodoItem(newItem) {
  const sql = `INSERT INTO todo_items (user_id, title) VALUES (?, ?)`;
  const [result] = await conn.execute(sql, [newItem.userId, newItem.title]);
  return {
    ...newItem,
    id: result.insertId,
  };
}

export async function findOneById(id) {
  const sql = `SELECT * FROM todo_items WHERE id = ?`;
  const [rows] = await conn.execute(sql, [id]);
  // rows가 아닌 이유는 한개만 찾을꺼니까 첫번째 요소([0])인것만 찾을 것이니까
  return rows[0] || null;
  //  rows[0] || null; 해석 :  rows[0]가 있으면  rows[0]를 반환하고 아니면 null을 반환해라
}

export async function update(checkTodoItem) {
  const sql = `UPDATE todo_items SET done_at = if(done_at is null, now(), null) WHERE id = ?`;
  const result = await conn.execute(sql, [checkTodoItem.id]);

  return result;
}

export async function deleteOne(id) {
  const sql = `DELETE FROM todo_items WHERE id = ?`;
  const result = await conn.execute(sql, [id]);

  return result;
}
