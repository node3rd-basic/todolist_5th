import prisma from "../common/prisma.js";

export async function findMany(userId) {
  console.log("userId@@@@", userId);

  return await prisma.todoItem.findMany({
    where: { userId },
  });
}

export async function saveTodoItem(newItem) {
  return await prisma.todoItem.create({
    data: {
      title: newItem.title,
      userId: newItem.userId,
    },
  });
}

export async function findOneById(id) {
  return await prisma.todoItem.findUnique({
    where: { id },
  });
}

export async function update(id, doneAt) {
  await prisma.todoItem.update({
    where: { id },
    data: {
      doneAt,
    },
  });
}

export async function deleteOne(id) {
  await prisma.todoItem.delete({
    where: {
      id: id,
    },
  });
}
