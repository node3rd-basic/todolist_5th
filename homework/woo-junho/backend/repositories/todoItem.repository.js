import conn from "../common/conn.js";

export async function findMany(userId) {
    const sql = `select * from todo_items where user_id = ?`
    const [rows] = await conn.execute(sql, [userId])
    return rows
}

export async function saveTodoItem(todoItem) {
    const sql = `insert into todo_items (title, user_id) values (?, ?)`
    const [result] = await conn.execute(sql, [todoItem.title, todoItem.userId])
    console.log(result.insertId)
    return result.insertId
}

export async function findOneById(id)  {
    const sql = `SELECT * FROM todo_items WHERE id = ?`
    const [rows] = await conn.execute(sql, [id])
    return rows[0] ? rows[0] : null
}

export async function update(id) {
    const sql = `update todo_items set done_at = if(done_at is null, now(), null) where id = ?`
    await conn.execute(sql, [id])
}

export async function deleteOne(id) {
    const sql = `delete from todo_items where id = ?`
    await conn.execute(sql, [id])
}