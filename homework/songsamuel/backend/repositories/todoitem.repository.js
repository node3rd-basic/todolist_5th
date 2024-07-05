import todoItemsFromDB from "../db/todoItems.js";
import conn from "../common/conn.js";

export async function findMany(userId) {
  const sql = `SELECT * FROM todo_items WHERE user_id = ${userId}`;
  const [rows] = await conn.execute(sql);
  return rows.map((row) => {
    return {
      id: row.id,
      userId: row.user_id,
      title: row.title,
      doneAt: row.done_at,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  });
}

export async function saveTodoItem(newItem) {
  console.log();
  const sql = `INSERT INTO todo_items (user_id, title) VALUES (${newItem.userId}, "${newItem.title}")`;
  const [result] = await conn.execute(sql);
  return {
    ...newItem,
    id: result.insertId,
  };
}

export async function findOneById(id) {
  const sql = `SELECT * FROM todo_items WHERE id = ${id}`;
  const [rows] = await conn.execute(sql);
  // rows가 아닌 이유는 한개만 찾을꺼니까 첫번째 요소([0])인것만 찾을 것이니까
  return rows[0] || null;
  //  rows[0] || null; 해석 :  rows[0]가 있으면  rows[0]를 반환하고 아니면 null을 반환해라
}

export async function update(checkTodoItem) {
  const sql = `UPDATE todo_items SET done_at = if(done_at is null, now(), null) WHERE id = ${checkTodoItem.id}`;
  console.log("!@#!$@$!$$@$", sql);
  const [result] = await conn.execute(sql);

  return result;
}

export async function deleteOne(todoItem) {
  const indexTodoItem = await todoItemsFromDB.indexOf(todoItem);

  todoItemsFromDB.splice(indexTodoItem, 1);
}
