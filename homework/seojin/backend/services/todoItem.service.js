import * as todoItemRepository from "../repositories/todoItem.repository.js"

export function getTodoItmesByUserId(userId){
    return todoItemRepository.findMany(userId)
}

export function saveTodoItem(title, userId){
 const newId = todoItemRepository.getNewId();
 const newTodoItem = {
    id: newId,
    userId: userId,
    title: title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: null
 }
 todoItemRepository.saveTodoItem(newTodoItem)
 return newTodoItem
}

export function getTodoItemById(id){
    const todoItem = todoItemRepository.findOneById(id)
    if(!todoItem){
        throw new Error("할 일 목록을 찾을 수 없습니다.")
    }
    return todoItem;
}

export function toggleDoneAtById(id){
    const selectedTodoItem = getTodoItemById(id)
    const doneAt = selectedTodoItem.doneAt ? null : new Date()
    todoItemRepository.update(selectedTodoItem, doneAt)
}

export function deleteTodoItemById(id){
    const selectedTodoItem = getTodoItemById(id)
    todoItemRepository.deleteOne(selectedTodoItem)
}