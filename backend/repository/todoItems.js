import prisma from "../conn/prismaClient.js";

export async function findByUserId(userId) {
    return prisma.todoItems.findMany({
        where: {userId}
    })
}

export async function findByKeyword(keyword) {
    return prisma.todoItems.findMany({
        where: {
            title: {
                contains: keyword
            }
        }
    })
}

export async function findOneById(id) {
    return prisma.todoItems.findFirst({
        where: {id: {equals: id}}
    })
}

export async function save(item) {
    const newItem = await prisma.todoItems.create({
        data: {...item}
    })
    return newItem.id
}

export async function update(id, doneAt) {
    const updatedItem = await prisma.todoItems.update({
        data: {doneAt},
        where: {id}
    })
    if (updatedItem === null) {
        throw Error("수정중 문제가 생겼습니다.")
    }
}

export async function deleteItem(id, userId) {
    const deletedItem = await prisma.todoItems.delete({
        where: {id, userId}
    })
    console.log(deletedItem)
    if (deletedItem === null) {
        throw Error("삭제 할 id 가 존재 하지 않습니다.")
    }
}