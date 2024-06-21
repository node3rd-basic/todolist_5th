import todoItems from '../db/todoItems.js';

//투두아이템 아이디, 유저 아이디 생성
const getIncrementedId = (arr) => (arr[arr.length - 1] ? arr[arr.length - 1].id + 1 : 1);

//해당하는 투두 아이템 아이디의 할일 찾기
const findTodoItem = ({ todoItemId, userId }) => {
  //req.params로 받은 아이디의 할일 찾기
  const selectedTodoItem = todoItems.find((todoItem) => todoItem.id === todoItemId);

  //해당 아이디의 할일이 존재하지 않으면 오류 반환
  if (!selectedTodoItem) {
    throw new Error('해당 아이디의 할 일이 존재하지 않습니다.');
  }

  //찾은 할일의 유저 아이디와 req.user로 받은 유저 아이디가 불일치하면 오류 반환
  if (selectedTodoItem.userId !== userId) {
    throw new Error('접근 권한이 없는 할 일입니다.');
  }

  return selectedTodoItem;
};

// 할일 목록 조회 (1)
export const getTodoItemByUserId = (userId) => {
  //해당 유저가 작성한 투두 아이템만 찾기
  const myTodoItems = todoItems.filter((todoItem) => todoItem.userId === userId);

  return myTodoItems;
};

// 할일 목록 상세 조회 (2)
export const getTodoItem = (todoItemId, userId) => {
  //투두아이템 목록에서 req.params에서 받아온 id와 일치하는 아이템 찾기
  const selectedTodoItem = findTodoItem({ todoItemId, userId });

  return selectedTodoItem;
};

// 할일 등록 (3)
export const postTodoItem = (userId, title) => {
  //투두 아이템 아이디 생성하기
  const newTodoItemId = getIncrementedId(todoItems);

  //newTodoItem 생성
  const newTodoItem = {
    id: newTodoItemId,
    userId,
    title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: null,
  };

  //todoItems 목록에 newTodoItem 추가
  todoItems.push(newTodoItem);

  return newTodoItem;
};

// 할일 완료 여부 토글 (4)
export const todoItemDoneAt = (todoItemId, userId) => {
  //해당하는 투두 아이템 아이디의 할일 찾기
  const selectedTodoItem = findTodoItem({ todoItemId, userId });

  //찾은 투두 아이템의 인덱스 찾기
  const selectedTodoItemIndex = todoItems.indexOf(selectedTodoItem);

  //splice로 투두 아이템의 doneAt 수정
  todoItems.splice(selectedTodoItemIndex, 1, {
    ...selectedTodoItem,
    doneAt: selectedTodoItem.doneAt == null ? new Date() : null,
  });
};

// 할일 삭제 (5)
export const deleteTodoItem = (todoItemId, userId) => {
  //해당하는 아이디의 투두아이템 찾기
  const selectedTodoItem = findTodoItem({ todoItemId, userId });

  //찾은 투두 아이템의 인덱스 찾기
  const selectedTodoItemIndex = todoItems.indexOf(selectedTodoItem);

  //splice로 투두 아이템 삭제
  todoItems.splice(selectedTodoItemIndex, 1);
};
