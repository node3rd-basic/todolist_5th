import todoItemsDB from '../db/todoItems.js';

//투두아이템 아이디, 유저 아이디 생성
export const getIncrementedId = () =>
  todoItemsDB[todoItemsDB.length - 1] ? todoItemsDB[todoItemsDB.length - 1].id + 1 : 1;

//할일 찾기
export const findTodoItemById = (todoItemId) => {
  const selectedTodoItem = todoItemsDB.find((todoItem) => todoItem.id === todoItemId);

  return selectedTodoItem;
};

//할일 목록 조회 (1)
export const findTodoItemByUserId = (userId) => {
  const myTodoItems = todoItemsDB.filter((todoItem) => todoItem.userId === userId);

  return myTodoItems;
};

//할일 등록 (3)
export const postTodoItem = (newTodoItem) => {
  //todoItems 목록에 newTodoItem 추가
  todoItemsDB.push(newTodoItem);
};

//할일 완료 여부 토글 (4)
export const todoItemDoneAt = (selectedTodoItem, doneAt) => {
  //찾은 투두 아이템의 인덱스 찾기
  const selectedTodoItemIndex = todoItemsDB.indexOf(selectedTodoItem);

  //splice로 투두 아이템의 doneAt 수정
  todoItemsDB.splice(selectedTodoItemIndex, 1, {
    ...selectedTodoItem,
    doneAt,
  });
};

//할일 삭제 (5)
export const deleteTodoItem = (selectedTodoItem) => {
  //찾은 투두 아이템의 인덱스 찾기
  const selectedTodoItemIndex = todoItemsDB.indexOf(selectedTodoItem);

  //splice로 투두 아이템 삭제
  todoItemsDB.splice(selectedTodoItemIndex, 1);
};
