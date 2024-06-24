import todoData from "../db/todoitem.db";

export const newId = () => {
  todoData.length > 0 ? todoData[todoData.length - 1].id + 1 : 1;
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
