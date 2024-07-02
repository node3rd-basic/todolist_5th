import * as todoItemRepository from "../repositories/todoItem.repository.js"

export async function getTodoItemsByUserId(userId) {
    const todoItems = await todoItemRepository.findMany(userId)
    return todoItems.map(todoItem => dbModelToObject(todoItem))
}

export async function saveTodoItem(title, userId) {
    const todoItemToSave = {
        "userId": userId,
        "title": title,
    }
    const newTodoItemId = await todoItemRepository.saveTodoItem(todoItemToSave)
    const newTodoItem = await getTodoItemById(newTodoItemId)

    return dbModelToObject(newTodoItem)
}

export async function getTodoItemById(id) {
    const todoItem = await todoItemRepository.findOneById(id)
    if (!todoItem) {
        throw new Error("Todo item not found")
    }
    return dbModelToObject(todoItem)
}

export async function toggleDontAtById(id) {
    await todoItemRepository.update(id)
}

export async function deleteTodoItemById(id) {
    await todoItemRepository.deleteOne(id)
}

function dbModelToObject(dbModel) {
    return {
        id: dbModel.id,
        title: dbModel.title,
        doneAt: dbModel.done_at,
        userId: dbModel.user_id,
        createdAt: dbModel.created_at,
        updatedAt: dbModel.updated_at
    }
}