import * as todoItemRepository from "../repositories/todoItem.repository.js";

// 조회 API
export function getTodoItemsById(userId) {
  return todoItemRepository.findMany(userId);
}

// 생성 API
export function saveTodoItem(title, userId) {
  const newId = todoItemRepository.getNewId();
  const newItem = {
    id: newId,
    userId: userId,
    title: title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: null,
  };

  todoItemRepository.saveTodoItem(newItem);
  return newItem;
}

// 상세 조회 API
export function getTodoItemById(id) {
  const todoItem = todoItemRepository.findOneById(id);

  if (!todoItem) {
    throw new CustomError("할 일 목록 상세 조회를 실패하였습니다.", 404);
  }

  return todoItem;
}

// 수정 API
export function toggleDontAtById(id) {
  // :id로 입력 받은 값이 todoItems에 있는지 확인 작업
  // 여기서 이걸 쓰는 이유! const AddtodoItem에서 ...을 쓸 때 뽑아 쓸 {} 전체를 가져와야하니까 찾는 것!
  const checkTodoItem = getTodoItemById(id);
  const doneAt = checkTodoItem.doneAt ? null : new Date();
  todoItemRepository.update(checkTodoItem, doneAt);
}

// 삭제 API
export function deleteTodoItemById(id) {
  const selectedTodoItem = getTodoItemById(id);
  todoItemRepository.deleteOne(selectedTodoItem);
}
