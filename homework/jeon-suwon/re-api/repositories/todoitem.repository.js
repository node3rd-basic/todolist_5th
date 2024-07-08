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

export const changeTodoItem = async (id, userId, findByItem) => {
  const data = await prisma.todoItems.update({
    where: { id, userId },
    data: {
      doneAt: findByItem.doneAt ? null : new Date(),
    },
  });
  return data;
};

export const deleteTodoitem = async (id, userId) => {
  const data = await prisma.todoItems.delete({
    where: { id, userId },
  });
  return data;
};

export const getTodolist = async (id, userId) => {
  return await prisma.todoItems.findFirst({
    where: { id, userId },
  });
};
