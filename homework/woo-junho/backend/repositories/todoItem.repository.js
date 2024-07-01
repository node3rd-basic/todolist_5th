import conn from "../common/conn.js";

export async function findMany(userId) {
    const sql = `SELECT * FROM todo_items WHERE userId = ${userId}`
    const [rows] = await conn.execute(sql)
    return rows
}

export async function saveTodoItem(todoItem) {
    const sql = `INSERT INTO todo_items (user_id, title) VALUES (${todoItem.userId}, '${todoItem.title}')`
    const [result] = await conn.execute(sql)
    return {
        ...todoItem,
        id: result.insertId,
    }
}

export function findOneById(id)  {
    const sql = `SELECT * FROM todo_items WHERE id = ${id}`
    const [rows] = conn.execute(sql)
    return rows[0] ? rows[0] : null
}

export function update(todoItem) {
    const sql = `UPDATE todo_items SET doneAt = NOW() WHERE id = ${todoItem.id}`
    conn.execute(sql)
    todoItem.doneAt = doneAt
}

export function deleteOne(todoItem) {
    const indexToDelete = todoItemsFromDB.indexOf(todoItem)
    todoItemsFromDB.splice(indexToDelete, 1)
}