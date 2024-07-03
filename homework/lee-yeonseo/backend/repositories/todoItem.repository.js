import conn from '../common/conn.js';

//할일 찾기
export const findTodoItemById = async (todoItemId) => {
  const sql = `SELECT * FROM todo_items WHERE id = ?`;
  const [selectedTodoItem] = await conn.execute(sql, [todoItemId]);

  return selectedTodoItem[0] ?? null;
};

//할일 목록 조회
export const findTodoItemByUserId = async (userId) => {
  const sql = `SELECT * FROM todo_items WHERE user_id = ?`;
  const [myTodoItems] = await conn.execute(sql, [userId]);

  return myTodoItems;
};

//할일 등록
export const postTodoItem = async (userId, title) => {
  const sql = `INSERT INTO todo_items (user_id, title) VALUES (:userId, :title)`;
  const [newTodoItem] = await conn.execute(sql, { userId, title });

  return newTodoItem.insertId;
};

//할일 완료 여부 토글
export const todoItemDoneAt = async (todoItemId) => {
  const sql = `UPDATE todo_items SET done_at = CASE WHEN done_at IS NULL THEN current_timestamp  ELSE NULL END WHERE id = ?`;
  await conn.execute(sql, [todoItemId]);
};

//할일 삭제
export const deleteTodoItem = async (todoItemId) => {
  const sql = `DELETE FROM todo_items WHERE id = ?`;
  await conn.execute(sql, [todoItemId]);
};
