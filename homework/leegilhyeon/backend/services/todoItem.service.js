import * as todoItemRepository from "../repository/todoItem.repository.js";

export async function getTodoItemsByUserId(userId) {
  return await todoItemRepository.findTodoItems(userId);
}

export async function saveTodoItem(title, userId) {
  const todoItemToSave = {
    userId: userId,
    title: title,
  };
  return await todoItemRepository.pushTodoItem(todoItemToSave);
}

export async function getTodoItemById(id) {
  const todoItem = await todoItemRepository.findTodoItemById(id);
  if (!todoItem) {
    throw new Error("Todo item not found");
  }
  return todoItem;
}

export async function toggleDontAtById(id) {
  const todoItem = await todoItemRepository.findOneById(id);
  await todoItemRepository.putTodoItem(id, todoItem.doneAt ? null : new Date());
}

export async function deleteTodoItemById(id) {
  await todoItemRepository.deleteById(id);
}
