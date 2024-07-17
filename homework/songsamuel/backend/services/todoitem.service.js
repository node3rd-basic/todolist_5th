import * as todoItemRepository from "../repositories/todoItem.repository.js";

// 조회 API
export async function getTodoItemsById(userId) {
  console.log("userIduserId", userId);

  const todoItems = await todoItemRepository.findMany(userId);
  return todoItems.map((todoItem) => dbModelToObject(todoItem));
}

// 생성 API
export async function saveTodoItem(title, userId) {
  const newItem = {
    userId: userId,
    title: title,
  };

  const newTodoItemId = await todoItemRepository.saveTodoItem(newItem);
  const newTodoItem = await getTodoItemById(newTodoItemId.id);

  return dbModelToObject(newTodoItem);
}

// 상세 조회 API
export async function getTodoItemById(id) {
  const todoItem = await todoItemRepository.findOneById(id);

  if (!todoItem) {
    throw new CustomError("할 일 목록 상세 조회를 실패하였습니다.", 404);
  }

  return dbModelToObject(todoItem);
}

// 수정 API
export async function toggleDoneAtById(id) {
  // :id로 입력 받은 값이 todoItems에 있는지 확인 작업
  // 여기서 이걸 쓰는 이유! const AddtodoItem에서 ...을 쓸 때 뽑아 쓸 {} 전체를 가져와야하니까 찾는 것!
  const checkTodoItem = await getTodoItemById(id);

  console.log("checkTodoItem", checkTodoItem);
  // const doneAt = checkTodoItem.doneAt ? null : new Date();
  await todoItemRepository.update(checkTodoItem);
}

// 삭제 API
export async function deleteTodoItemById(id) {
  const selectedTodoItem = await getTodoItemById(id);

  const todoItemId = selectedTodoItem.id;

  await todoItemRepository.deleteOne(todoItemId);
}

function dbModelToObject(dbModel) {
  return {
    id: dbModel.id,
    title: dbModel.title,
    doneAt: dbModel.done_at,
    userId: dbModel.user_id,
    createdAt: dbModel.created_at,
    updatedAt: dbModel.updated_at,
  };
}
