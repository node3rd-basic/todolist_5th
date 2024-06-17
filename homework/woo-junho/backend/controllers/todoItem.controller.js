import todoItems from "../db/todoItems.js";

const validateTodoItemId = (req) => {
    const idAsNumber = Number(req.params.id)
    if (isNaN(idAsNumber)) {
        throw new Error("ID must be a number")
    }

    return idAsNumber
}

const getTodoItemById = (id) => {
    const todoItem = todoItems.find(todoItem => todoItem.id === id)
    if (!todoItem) {
        throw new Error("Todo item not found")
    }

    return todoItem
}

const getIncrementedId = arr => arr[todoItems.length - 1]
    ? arr[todoItems.length - 1].id + 1
    : 1

export function getTodoItems(req, res) {
    const user = req.user
    res.send(
        todoItems.filter(todoItem => todoItem.userId === user.id)
    )
}

export function postTodoItem(req, res) {
    const {title} = req.body
    const user = req.user
    const newId = getIncrementedId(todoItems)
    const newTodoItem = {
        "id": newId,
        "userId": user.id,
        "title": title,
        "doneAt": null,
        "createdAt": new Date(),
        "updatedAt": null
    }
    todoItems.push(newTodoItem)
    res.send(newTodoItem)
}

export function getTodoItem(req, res) {
    const id = validateTodoItemId(req)
    const todoItem = getTodoItemById(id)
    res.send(todoItem)
}

export function putTodoItem(req, res) {
    const id = validateTodoItemId(req)
    const selectedTodoItem = getTodoItemById(id)
    const todoItemIndex = todoItems.indexOf(selectedTodoItem)
    todoItems.splice(todoItemIndex, 1,
        {
            ...selectedTodoItem,
            doneAt: selectedTodoItem.doneAt == null ? new Date() : null
        })
    res.send({result: true})
}

export function deleteTodoItem(req, res) {
    const id = validateTodoItemId(req)
    const selectedTodoItem = getTodoItemById(id)
    const indexToDelete = todoItems.indexOf(selectedTodoItem)

    todoItems.splice(indexToDelete, 1)
    res.send({
        "result": true
    })
}