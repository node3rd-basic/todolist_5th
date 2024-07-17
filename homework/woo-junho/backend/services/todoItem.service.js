import * as todoItemRepository from "../repositories/todoItem.repository.js"

export async function getTodoItemsByUserId(userId) {
    return await todoItemRepository.findMany(userId)
}

export async function saveTodoItem(title, userId) {
    const todoItemToSave = {
        "userId": userId,
        "title": title,
    }
    return await todoItemRepository.saveTodoItem(todoItemToSave)
}

export async function getTodoItemById(id) {
    const todoItem = await todoItemRepository.findOneById(id)
    if (!todoItem) {
        throw new Error("Todo item not found")
    }
    return todoItem
}

export async function toggleDontAtById(id) {
    const todoItem = await todoItemRepository.findOneById(id)
    await todoItemRepository.update(id, todoItem.doneAt ? null : new Date())
}

export async function deleteTodoItemById(id) {
    await todoItemRepository.deleteOne(id)
}