import * as todoItemRepository from "../repository/todoItem.repository.js";
import CustomError from "../common/custom.error.js";


export async function findTodoItemById(id) {
  const todoItem = await todoItemRepository.findTodoItemById(id);
  if (!todoItem) {
    throw new CustomError("해당 아이디가 가진 todoItem이 없습니다.", 404);
  }
  return todoItem;
}

export async function todoItemByUserId(userId) {
  const todoItems = await todoItemRepository.findTodoItems(userId);
  return todoItems
  
}

export async function getTodoItem(title, userId) {
  
  const saveTodoItem = {
    userId: userId,
    title: title,
  };
  const newTodoId = await todoItemRepository.pushTodoItem(saveTodoItem);
  // const newTodoItem = await findTodoItemById(newTodoId)
  return newTodoId
}

export async function putTodoItemById(id) {
  const todoItemFind = await findTodoItemById(id);
  await todoItemRepository.putTodoItem(id, todoItemFind.doneAt ? null: new Date());
}

export async function deleteTodoItemById(id) {
  todoItemRepository.deleteById(id);
}

// const todoItemChange = (todoModel) => {
//   return {
//     id: todoModel.id,
//     title: todoModel.title,
//     doneAt: todoModel.done_at,
//     userId: todoModel.user_id,
//     createdAt: todoModel.created_at,
//     updatedAt: todoModel.updated_at,
//   };
// }