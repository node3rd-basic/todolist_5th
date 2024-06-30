import conn from '../common/conn.js';

//할일 찾기
export const findTodoItemById = async (todoItemId) => {
  const [selectedTodoItem] = await conn.execute(`SELECT * FROM todo_items WHERE id = ${todoItemId}`);

  return selectedTodoItem[0];
};

//할일 목록 조회
export const findTodoItemByUserId = async (userId) => {
  const [myTodoItems] = await conn.execute(`SELECT * FROM todo_items WHERE user_id = ${userId}`);

  return myTodoItems.map((myTodoItem) => {
    return {
      ...myTodoItem,
      doneAt: myTodoItem.done_at,
    };
  });
};

//할일 등록
export const postTodoItem = async (userId, title) => {
  const [newTodoItem] = await conn.execute(`INSERT INTO todo_items (user_id, title) VALUES ('${userId}','${title}')`);

  return { id: newTodoItem.insertId, userId, title };
};

//할일 완료 여부 토글
export const todoItemDoneAt = async (todoItemId) => {
  await conn.execute(`UPDATE todo_items SET done_at = current_timestamp WHERE id = ${todoItemId}`);
};

//할일 삭제
export const deleteTodoItem = async (todoItemId) => {
  await conn.execute(`DELETE FROM todo_items WHERE id = ${todoItemId}`);
};
