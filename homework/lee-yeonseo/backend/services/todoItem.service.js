import * as todoItemRepository from '../repositories/todoItem.repository.js';

//해당하는 투두 아이템 아이디의 할일 찾기 // 할일 목록 상세 조회
const findTodoItem = ({ todoItemId, userId }) => {
  const selectedTodoItem = todoItemRepository.findTodoItemById(todoItemId);

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
  const myTodoItems = todoItemRepository.findTodoItemByUserId(userId);

  return myTodoItems;
};

// 할일 등록 (3)
export const postTodoItem = (userId, title) => {
  //투두 아이템 아이디 생성하기
  const newTodoItemId = todoItemRepository.getIncrementedId();

  //newTodoItem 생성
  const newTodoItem = {
    id: newTodoItemId,
    userId,
    title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: null,
  };

  todoItemRepository.postTodoItem(newTodoItem);

  return newTodoItem;
};

// 할일 완료 여부 토글 (4)
export const todoItemDoneAt = (todoItemId, userId) => {
  //해당하는 투두 아이템 아이디의 할일 찾기
  const selectedTodoItem = findTodoItem({ todoItemId, userId });

  const doneAt = selectedTodoItem.doneAt === null ? new Date() : null;

  todoItemRepository.todoItemDoneAt(selectedTodoItem, doneAt);
};

// 할일 삭제 (5)
export const deleteTodoItem = (todoItemId, userId) => {
  //해당하는 아이디의 투두아이템 찾기
  const selectedTodoItem = findTodoItem({ todoItemId, userId });

  todoItemRepository.deleteTodoItem(selectedTodoItem);
};
