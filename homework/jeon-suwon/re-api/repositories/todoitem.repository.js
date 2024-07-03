import { CustomError } from "../common/custom.error.js";
import { conn } from "../common/db.js";

export const newId = () => {
  return todoData.length > 0 ? todoData[todoData.length - 1].id + 1 : 1;
};

export const getTodolists = async (id) => {
  const [data] = await conn.execute(
    `select * from todo_items where users_id = ${id}`
  );
  return data;
};

export const getTodolist = (id) => {
  const data = todoData.find((el) => el.id === +id);
  if (!data) throw new CustomError("존재하는 데이터가 없습니다.", 404);
  return data;
};

export const postTodolist = async (title, userId) => {
  console.log(title);
  console.log(userId);
  const data = await conn.execute(
    `INSERT INTO todo_items (users_id, title, dont_at) VALUES (${userId},"${title}", NULL)`
  );
  console.log(data);
  return data;
};

export const changeTodoItem = async (id, userId, findTodoItem) => {
  if (findTodoItem.doneAt === null) {
    const [data] = await conn.execute(
      `UPDATE todo_items SET dont_at = CURRENT_TIMESTAMP,updated_at=CURRENT_TIMESTAMP WHERE users_id= ${userId}`
    );
    return data;
  } else {
    const [data] = await conn.execute(
      `UPDATE todo_items SET dont_at = NULL,updated_at=CURRENT_TIMESTAMP WHERE users_id= ${userId}`
    );
    return data;
  }
};

export const deleteTodoitem = async (id, userId) => {
  const [data] = await conn.execute(
    `delete from todo_items where id=${id} and users_id=${userId}`
  );
  if (!data) throw new CustomError("존재하는 데이터가 없습니다.", 404);
  return data;
};
