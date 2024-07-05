import * as todoItemRepository from "../repositories/todoItem.repository.js";

// 조회 API
export async function getTodoItemsById(userId) {
  return await todoItemRepository.findMany(userId);
}

// 생성 API
export async function saveTodoItem(title, userId) {
  const newItem = {
    userId: userId,
    title: title,
  };

  const result = await todoItemRepository.saveTodoItem(newItem);
  return result;
}

// 상세 조회 API
export async function getTodoItemById(id) {
  const todoItem = await todoItemRepository.findOneById(id);

  if (!todoItem) {
    throw new CustomError("할 일 목록 상세 조회를 실패하였습니다.", 404);
  }

  return todoItem;
}

// 수정 API
export async function toggleDoneAtById(id) {
  // :id로 입력 받은 값이 todoItems에 있는지 확인 작업
  // 여기서 이걸 쓰는 이유! const AddtodoItem에서 ...을 쓸 때 뽑아 쓸 {} 전체를 가져와야하니까 찾는 것!
  const checkTodoItem = await getTodoItemById(id);
  // const doneAt = checkTodoItem.doneAt ? null : new Date();
  await todoItemRepository.update(checkTodoItem);
}

// 삭제 API
export async function deleteTodoItemById(id) {
  const selectedTodoItem = await getTodoItemById(id);
  todoItemRepository.deleteOne(selectedTodoItem);
}
