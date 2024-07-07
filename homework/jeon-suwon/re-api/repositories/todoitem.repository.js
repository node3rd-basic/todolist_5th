import { prisma } from "../untils/prisma.until.js";

export const getTodolists = async (id) => {
  return await prisma.todoItems.findMany({
    where: { userId: id },
  });
};

export const postTodolist = async (title, userId) => {
  const data = await prisma.todoItems.create({
    data: { title, userId },
  });
  return data;
};

export const changeTodoItem = async (id, userId) => {
  const findByItem = getTodolist(id, userId);
  const newData = {
    doneAt: findByItem.doneAt ? null : new Date(),
  };
  console.log(newData);
  const data = await prisma.todoItems.update({
    where: { id: +id, userId },
    data: newData,
  });
  console.log(data);
  return data;
};

export const deleteTodoitem = async (id, userId) => {
  const data = await prisma.todoItems.delete({
    where: { id: +id, userId },
  });
  return data;
};

const getTodolist = async (id, userId) => {
  return await prisma.todoItems.findFirst({
    where: { id: +id, userId },
  });
};
