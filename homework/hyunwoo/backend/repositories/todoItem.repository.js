import conn from '../common/conn.js';

// id에 맞는 todoItem 찾기
export async function getTodoItemById (todoItemId) {
  const [selectedTodoItem] = await conn.execute(`SELECT * FROM todo_items WHERE id = ${todoItemId}`);
  return selectedTodoItem[0];
}

// export function getTodoItemById(id) {
//   const todoItem = todoItemsDB.find((todoItem) => todoItem.id === id);
//   if (!todoItem) {
//     throw new Error("해당 아이디를 가진 todoItem이 없습니다.");
//   }
//   return todoItem;
// }

// todoItems 찾기
export function findMany(userId) {
  return todoItemsDB.filter((todoItem) => todoItem.userId === userId);
}

// todoItem 추가하기
export function save(todoItem) {
  return todoItemsDB.push(todoItem);
}

// todoItem index 찾아서 수정하기
export function update(existTodoItem, doneAt) {
  const todoItemIndex = findTodoItemIndex(existTodoItem);

  todoItemsDB.splice(todoItemIndex, 1, {
    ...existTodoItem,
    doneAt,
  });
}

// todoItem index 찾아서 삭제하기
export function deleteOne(existTodoItem) {
  const todoItemIndex = findTodoItemIndex(existTodoItem);

  todoItemsDB.splice(todoItemIndex, 1);
}
