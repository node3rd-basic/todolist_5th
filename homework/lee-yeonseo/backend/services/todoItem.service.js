import * as todoItemRepository from '../repositories/todoItem.repository.js';
import CustomError from '../common/custom.error.js';

//해당하는 투두 아이템 아이디의 할일 찾기 // 할일 목록 상세 조회
export const findTodoItem = async (todoItemId, userId) => {
  const selectedTodoItem = await todoItemRepository.findTodoItemById(todoItemId);

  //해당 아이디의 할일이 존재하지 않으면 오류 반환
  if (!selectedTodoItem) {
    throw new CustomError(404, '해당 아이디의 할 일이 존재하지 않습니다.');
  }

  //찾은 할일의 유저 아이디와 req.user로 받은 유저 아이디가 불일치하면 오류 반환
  if (selectedTodoItem.user_id !== userId) {
    throw new CustomError(403, '접근 권한이 없는 할 일입니다.');
  }

  return selectedTodoItem;
};

// 할일 목록 조회 (1)
export const getTodoItemByUserId = async (userId) => {
  const myTodoItems = await todoItemRepository.findTodoItemByUserId(userId);

  return myTodoItems;
};

// 할일 등록 (3)
export const postTodoItem = async (userId, title) => {
  const newTodoItem = await todoItemRepository.postTodoItem(userId, title);

  return newTodoItem;
};

// 할일 완료 여부 토글 (4)
export const todoItemDoneAt = async (todoItemId, userId) => {
  // //해당하는 투두 아이템 아이디의 할일 찾기
  await findTodoItem(todoItemId, userId);

  await todoItemRepository.todoItemDoneAt(todoItemId);
};

// 할일 삭제 (5)
export const deleteTodoItem = async (todoItemId, userId) => {
  //해당하는 아이디의 투두아이템 찾기
  await findTodoItem(todoItemId, userId);

  await todoItemRepository.deleteTodoItem(todoItemId);
};
