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
export async function putTodoItemById(id, userId) {
  const findTodoItem = await findTodoItemById(id, userId)
  await todoItemRepository.updateTodoItem(id, findTodoItem.doneAt === null ? new Date() : null);
}

// 할일 삭제하기
export async function deleteTodoItemById(id, userId) {
  await findTodoItem(id, userId);
  await todoItemRepository.deleteOne(todoItemId);
}
