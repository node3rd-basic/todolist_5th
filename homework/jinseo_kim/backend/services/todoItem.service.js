import * as todoItemRepository from '../repositories/todoItem.repository.js';
import CustomError from '../common/custom.error.js';

export async function getTodoItemsByUserId(userId) {
  return await todoItemRepository.findMany(userId);
}

export async function getTodoItemById(id) {
  const todoItem = await todoItemRepository.findOneByTodoIdId(id);
  if (!todoItem) {
    throw new CustomError(404, 'Oops! 당신의 할 일이 존재하지 않습니다.');
  }
  return todoItem;
}




export async function createTodoItem(title, userId) {
  const newTodoItem = {
    userId: Number(userId),
    title: title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  await todoItemRepository.pushItem(newTodoItem.userId, newTodoItem.title);
  return newTodoItem;
}

export async function deleteTodoItemById(id) {
  const selectedTodoItem = await getTodoItemById(id);
  await todoItemRepository.deleteOne(selectedTodoItem);
}
export async function toggleDonAtById(id) {
  const selectedTodoItem = await getTodoItemById(id);
  await todoItemRepository.update(selectedTodoItem.id);
}


export async function getTodoItemsById(id) {
  const todoItem = await todoItemRepository.findOneByTodoIdId(id);
  if (!todoItem) {
    throw new CustomError(404, 'Oops! 당신의 할 일이 존재하지 않습니다.');
  }

  return todoItem;
}