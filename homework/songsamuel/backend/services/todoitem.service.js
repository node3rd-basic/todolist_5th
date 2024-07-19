import * as todoItemRepository from "../repositories/todoItem.repository.js";

// 조회 API
export async function getTodoItemsById(userId) {
  // console.log("todoService.userId", userId);

  return await todoItemRepository.findMany(userId);
}

// 생성 API
export async function saveTodoItem(title, userId) {
  const newItem = {
    userId: userId,
    title: title,
  };

  return await todoItemRepository.saveTodoItem(newItem);
}

// 상세 조회 API
export async function getTodoItemById(id) {
  const todoItem = await todoItemRepository.findOneById(id);

  if (!todoItem) {
    throw new CustomError("할 일 목록 상세 조회를 실패하였습니다.", 404);
  }

  // console.log("상세 조회 API", todoItem);
  return todoItem;
}

// 수정 API
export async function toggleDoneAtById(id) {
  const checkTodoItem = await getTodoItemById(id);

  const doneAt = checkTodoItem.doneAt ? null : new Date();

  await todoItemRepository.update(id, doneAt);
}

// 삭제 API
export async function deleteTodoItemById(id) {
  const selectedTodoItem = await getTodoItemById(id);

  const todoItemId = selectedTodoItem.id;

  await todoItemRepository.deleteOne(todoItemId);
}
