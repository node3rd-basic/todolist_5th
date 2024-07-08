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
  return todoItems.map(todoItem => {
    return {
      ...todoItem,
      doneAt: todoItem.done_at,
      userId: todoItem.user_id,
      createdAt: todoItem.created_at,
      updatedAt: null,}
  })
}

export async function getTodoItem(title, userId) {
  //const newId = todoItemRepository.getNewId();
  const saveTodoItem = {
    //id: newId,
    userId: userId,
    title: title,
    // doneAt: null,
    // createdAt: new Date(),
    // updatedAt: null,
  };
  const newTodoId = await todoItemRepository.pushTodoItem(saveTodoItem);
  const newTodoItem = findTodoItemById(newTodoId)
  return {
    ...newTodoItem,
    doneAt: newTodoItem.done_at,
    userId: newTodoItem.user_id,
    createdAt: newTodoItem.created_at,
    updatedAt: null,
  };
}

export async function putTodoItemById(id) {
  const todoItemFind = await findTodoItemById(id);
  // if(todoItemFind.userId !== id){
  //   throw new CustomError("일치하는 할일목록이 없습니다.", 404)
  // }
  //const doneAt = todoItemFind.doneAt == null ? new Date() : null;
  await todoItemRepository.putTodoItem(todoItemFind.id);
}

export async function deleteTodoItemById(id) {
  //const deleteTodoItem = findTodoItemById(id);
  todoItemRepository.deleteById(id);
}
