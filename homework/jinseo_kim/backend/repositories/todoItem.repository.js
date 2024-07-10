import prisma from '../common/prisma.js';
import conn from '../common/conn.js';

export async function pushItem(userId, title) {
  const newTodoItem = await prisma.todoItem.create({
    data: {
      userId: userId,
      title: title,
    },
  });
  return newTodoItem.id;
}
export async function findMany(userId) {
  const selectedItems = await prisma.todoItem.findMany({
    where: {
      userId: userId,
    },
  });
  return selectedItems;
}
export async function findOneByTodoIdId(id) {
  const selectedTodoItem = await prisma.todoItem.findUnique({
    where: { id: Number(id) },
  });
  return selectedTodoItem || null;
}

export async function update(id) {
  const todoItem = await prisma.todoItem.findUnique({ where: { id: id } });
  const updatedDoneAt = todoItem.doneAt === null ? new Date() : null;
  await prisma.todoItem.update({
    where: { id: id },
    data: { doneAt: updatedDoneAt },
  });
}

export async function deleteOne(id) {
  await prisma.todoItem.delete({
    where: {
      id,
    },
  });
}
