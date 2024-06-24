import { todoData } from "../db/todoitem.db.js";

export const newId = () => {
  return todoData.length > 0 ? todoData[todoData.length - 1].id + 1 : 1;
};

export const getTodolists = () => {
  const data = todoData;
  return data;
};

export const getTodolist = (id) => {
  const data = todoData.find((el) => el.id === +id);
  if (!data) throw new Error("존재하는 데이터가 없습니다.");
  return data;
};

export const postTodolist = (title, userId) => {
  const todoitem = {
    id: newId(),
    userId,
    title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  todoData.push(todoitem);
  return todoitem;
};

export const findTodoItem = (id) => {
  const data = todoData.find((el) => el.id === +id);
  return data;
};

export const changeTodoItem = (id, userId, findTodoItem) => {
  const changeTodoItem = {
    id,
    userId,
    title: findTodoItem.title,
    doneAt: new Date(),
    createdAt: findTodoItem.createdAt,
    updatedAt: new Date(),
  };
  console.log(changeTodoItem);
  return changeTodoItem;
};

export const findIndexTodoItem = (id) => {
  const data = todoData.findIndex((el) => el.id === +id);

  if (data === -1) throw new Error("존재하지않는 데이터입니다^^");
  return data;
};

export const deleteTodoitem = (findTodoItem) => {
  todoData.splice(findTodoItem, 1);
  return true;
};
