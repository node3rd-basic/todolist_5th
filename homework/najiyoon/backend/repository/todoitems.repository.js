import prisma from "../common/prisma.js";
import todoitems from "../db/todoitems.js";
// import conn from "../common/conn.js";

//목록조회
export async function findMany(userId) {
  return await prisma.TodoItem.findMany({ where: { userId: +userId } });
}
export async function saveTodoItem(todoItem) {
  // console.log("TodoItem", TodoItem);
  console.log("todoItem->", todoItem);
  return await prisma.TodoItem.create({
    data: { userId: todoItem.userId, title: todoItem.title },
    select: {
      id: true,
      userId: true,
      title: true,
      doneAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}
//이거먼저 1개 조회 : 수정이 해당 목록찾는거랑 같으니 써도 되지않으까
export async function oneTodoItem(id) {
  console.log("Id---", id);
  return await prisma.TodoItem.findUnique({ where: { id: id } });
}

export async function update(id, doneAt) {
  console.log("이건 id", id);
  console.log("doneAt", doneAt);
  return await prisma.TodoItem.update({ where: { id: +id }, data: { doneAt } });

  // // const sql = `update todo_items set done_at = NOW() WHERE id = ${todoitems.id}`;
  // const sql = `update todo_items set done_at = if(done_at is null, now(), null) where id = ?`;
  // await conn.execute(sql, [id]);
}

//삭제할 인덱스 : 서비스에서 정의한 아이디
export async function deleteItem(id) {
  console.log("id->", id);
  return await prisma.TodoItem.delete({ where: { id: +id } });
  // const sql = `delete from todo_items where id = ?`;
  // const [rows] = await conn.execute(sql, [id]);
}
