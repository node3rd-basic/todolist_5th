import todoItemsDB from "../db/todoitems.js";
import conn from "../common/conn.js";
import todoitems from "../db/todoitems.js";
//목록조회
export async function findMany(user_id) {
  // console.log(user_id);
  const sql = `select * from todo_items where user_id = ${user_id}`;
  const [rows] = await conn.execute(sql);
  // console.log("rows", rows);
  //맵1
  // const result = rows.map((rows) => ({ ...rows, doneAt: rows.done_at }));
  //맵2
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
  //맵3 done_at, ...row : row 에서 done_at "제외하기"
  // const result = rows.map(({ done_at, ...row }) => ({
  // row 풀어서 doneAt: done_at "추가하기"
  //   ...row,
  //   doneAt: done_at,
  // }));

  //기타
  //return {id:, userId, title, doneAt: null}

  // arr.map(e=>e :) done_at -> doneAt(만든시간, 유저아이디, 업뎃시간포함)//////
  // console.log("result==>", result);
  return result;
}

export async function saveTodoItem(todoItem) {
  // console.log(todoItem);
  const sql = `insert into todo_items (user_id, title) values (${todoItem.user_id},'${todoItem.title}')`;
  const [result] = await conn.execute(sql);
  // console.log("result", result);
  return result.insertId;
}
//이거먼저 1개 조회 : 수정이 해당 목록찾는거랑 같으니 써도 되지않으까
export async function oneTodoItem(id) {
  const sql = `select * from todo_items where id = ${id}`;
  const [todoItem] = await conn.execute(sql);
  return todoItem[0] || null;
}

// export async function findById(id) {
//   const sql = `select * from todo_items where id = ${id}`;
//   return await todoItemsDB.find((todoItems) => todoItems.id === id);
// } , updatedTodoItem

export async function update(id) {
  console.log("이건 id", id);
  // const sql = `update todo_items set done_at = NOW() WHERE id = ${todoitems.id}`;

  //**** if 문... sql문법인가? *****
  const sql = `update todo_items set done_at = if(done_at is null, now(), null) where id = ${id}`;
  await conn.execute(sql);
}
// const index = await todoItemsDB.findIndex((todoItems) => todoItems.id === id);
// if (index !== -1) {
//   todoItemsDB[index] = updatedTodoItem;
//   return updatedTodoItem;
// }
// UPDATE table_name
// SET column1 = value1, column2 = value2, ...
// WHERE condition;
//예시 UPDATE users SET age = 21 WHERE id = 1;

// return null;

//삭제
//삭제할 인덱스 : 서비스에서 정의한 아이디
export async function deleteItem(id) {
  console.log("id->", id);
  const sql = `delete from todo_items where id = ${id}`;
  const [rows] = await conn.execute(sql);

  // todoItemsDB.findIndex(
  //   (todoItems) => todoItems.id === delTodoItem
  // );
  // todoItemsDB.splice(index, 1);
}
