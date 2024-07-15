import * as todoItemRepository from "../repositories/todoItem.repository.js";

// 할일 목록 조회
export async function findTodoItems(userId) {
  return await todoItemRepository.findMany(userId);
}

// 할일 목록 추가
export async function postTodoItemById(title, userId) {
  const newTodoItem = {
    userId,
    title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: null,
  };
  await todoItemRepository.saveTodoItem(newTodoItem);
  return newTodoItem;
}

// 할일 한가지 조회
export async function findTodoItemById(id) {
  return await todoItemRepository.getTodoItemById(id);
}

// 할일 수정하기
export async function putTodoItemById(id) {
  return await todoItemRepository.update(id);
}

// 할일 삭제하기
export async function deleteTodoItemById(id) {
  return await todoItemRepository.deleteOne(id);
}
