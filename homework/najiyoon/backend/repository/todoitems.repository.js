import todoitems from "../db/todoitems.js";
import todoItemsDB from "../db/todoitems.js";
//목록조회
export function findMany(userId) {
  return todoItemsDB.filter((todoitems) => (todoitems.userId = userId));
}
//등록
export function getNewId(userId) {
  return todoItemsDB[todoItemsDB.length - 1]
    ? todoItemsDB[todoItemsDB.length - 1].id + 1
    : 1;
}

export function saveTodoItem(todoItem) {
  todoItemsDB.push(todoItem);
}
//1개 조회 : 수정이 해당 목록찾는거랑 같으니 써도 되지않으까
export function oneTodoItem(id) {
  return todoItemsDB.find((todoitems) => todoitems.id === id);
}

//수정:내가 원하는 투두 아이템 번호 찾음
// export function putTodoItem(id) {
//   const reInPutTodoItem = todoItemsDB.indexOf(todoItem);
//   return reInPutTodoItem;

//   //수정입력 : null을 바꾸는 것 : 새 날짜로
//   const indexOfFind = todoItemsDB.indexof((todoItems) => todoItems.id === id);
// }
export function findById(id) {
  return todoItemsDB.find((todoItems) => todoItems.id === id);
}

export function update(id, updatedTodoItem) {
  const index = todoItemsDB.findIndex((todoItems) => todoItems.id === id);
  if (index !== -1) {
    todoItemsDB[index] = updatedTodoItem;
    return updatedTodoItem;
  }
  return null;
}
//삭제

export function spliceIndex(id) {
  const index = todoItemsDB.findIndex(todoitems);
  todoItemsDB.splice(index, 1);
}
