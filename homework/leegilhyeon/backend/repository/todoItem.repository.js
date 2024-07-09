import prisma from "../common/prisma.js"

export async function findTodoItemById(id) {
  // const sql = `SELECT * FROM todo_items WHERE id = ?`
  // const [todoItem] = await conn.execute(sql, [id])

  // return todoItem[0] ? todoItem[0] : null 
  return await prisma.todoItem.findUnique({
    where: { id }
  })
}

export async function findTodoItems(userId) {
  // const sql = `SELECT * FROM todo_items WHERE user_id = ?`
  // const [rows]= await conn.execute(sql, [userId])
  // return rows

  return await prisma.todoItem.findMany({
    where:{
      userId
    }
  })
}

export async function pushTodoItem(saveTodoItem) {

  // const sql = `INSERT INTO todo_items (user_id, title) VALUES (?, ?)`
  // const [result] = await conn.execute(sql, [saveTodoItem.userId, saveTodoItem.title])
  
  // return result.insertId

  return await prisma.todoItem.create({
    data: {
      userId: saveTodoItem.userId,
      title: saveTodoItem.title
    }
  })

  // return createTodoItem.id
}

export async function putTodoItem(id, doneAt) {
  // const sql = `update todo_items set done_at = if(done_at is null, now(), null) where id = ?`
  //  await conn.execute(sql, [id])

   await prisma.todoItem.update({
    where: {
      id
    },
    data: {
      doneAt,
    },
  })
}

export async function deleteById(id) {
  // const sql = `delete from todo_items where id = ?`
  // await conn.execute(sql, [id])
    await prisma.todoItem.delete({
    where: {
      id
    },
  })
}
