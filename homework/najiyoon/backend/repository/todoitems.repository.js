import conn from "../common/conn.js";

//목록조회
export async function findMany(user_id) {
  // console.log(user_id);
  const sql = `select * from todo_items where user_id = ?`;
  const [rows] = await conn.execute(sql, [user_id]);

  const result = rows.map((row) => {
    return {
      id: row.id,
      userId: row.user_id,
      title: row.title,
      doneAt: row.done_at,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  });
  return result;
}

export async function saveTodoItem(todoItem) {
  console.log(todoItem);
  const sql = `insert into todo_items (user_id, title) values (:user_id, :title)`;
  const [result] = await conn.execute(sql, todoItem);
  // console.log("result", result);
  return result.insertId;
}
//이거먼저 1개 조회 : 수정이 해당 목록찾는거랑 같으니 써도 되지않으까
export async function oneTodoItem(id) {
  const sql = `select * from todo_items where id = ?`;
  const [todoItem] = await conn.execute(sql, [id]);
  return todoItem[0] || null;
}

export async function update(id) {
  console.log("이건 id", id);
  // const sql = `update todo_items set done_at = NOW() WHERE id = ${todoitems.id}`;

  const sql = `update todo_items set done_at = if(done_at is null, now(), null) where id = ?`;
  await conn.execute(sql, [id]);
}

//삭제할 인덱스 : 서비스에서 정의한 아이디
export async function deleteItem(id) {
  console.log("id->", id);
  const sql = `delete from todo_items where id = ?`;
  const [rows] = await conn.execute(sql, [id]);
}
