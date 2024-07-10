import conn from '../common/conn.js';

// id에 맞는 todoItem 찾기
export async function getTodoItemById (todoItemId) {
  const [selectedTodoItem] = await conn.execute(`SELECT * FROM todo_items WHERE id = "${todoItemId}"`);
  return selectedTodoItem[0];
}

// todoItems 찾기
export async function findMany(userId) {
    const [item] = await conn.execute(`SELECT * FROM todo_items WHERE user_id = "${userId}"`);
    const findedTodoItems = item.map((item) => {
      return {
      id: item.id,
      userId,
      title: item.title,
      doneAt: item.done_at,
      createdAt: item.created_at,
      updatedAt: item.updated_at
      }
    })
    return findedTodoItems;
}

// todoItem 추가하기
export async function saveTodoItem(todoItem) {
  return await conn.execute(`INSERT INTO todo_items (title, user_id) VALUES ("${todoItem.title}", "${todoItem.userId}")`);
}

// todoItem index 찾아서 수정하기
export async function update(id) {
  return await conn.execute(`UPDATE todo_items SET done_at = IF(done_at is null, current_timestamp, null) WHERE id = ${id}`);
}

// todoItem index 찾아서 삭제하기
export async function deleteOne(id) {
  return await conn.execute(`DELETE FROM todo_items WHERE id = ${id}`);
}
