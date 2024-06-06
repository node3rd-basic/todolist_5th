// express 사용할수 있도록 로드
const express = require('express')
const cors = require('cors')

// 나의 통신가능한 프로그램 (application) 을 정의
const app = express()
const port = 3000
app.use(cors())
app.use(express.json())

const todoItems = [
    {
        id: 1,
        userId: 1,
        title: "할일1",
        doneAt: null,
        createdAt: "2021-08-01",
        updatedAt: "2021-08-01",
    },
    {
        id: 2,
        userId: 1,
        title: "할일1",
        doneAt: null,
        createdAt: "2021-08-01",
        updatedAt: "2021-08-01",
    },
]

app.get("/todo-items", (req, res) => {
    res.send(todoItems)
})

app.post("/todo-items", (req, res) => {
    const { title } = req.body

    const newId = (todoItems[todoItems.length -1]) ? todoItems[todoItems.length -1].id + 1 : 1
    const newTodoItem = {
        "id": newId,
        "userId": 1,
        "title": title,
        "doneAt": null,
        "createdAt": new Date(),
        "updatedAt": null
    }
    todoItems.push(newTodoItem)
    res.send(newTodoItem)
})

app.get("/todo-items/:id", (req, res) => {
    const id = Number(req.params.id)
    const todoItem = todoItems.find(todoItem => todoItem.id === id)
    res.send(todoItem)
})

app.put("/todo-items/:id", (req, res) => {
    const id = Number(req.params.id)
    if (isNaN(id)) {
        res.status(400).send({
            "result": false,
            "message": "id 는 숫자여야 합니다."
        })
        return
    }

    const selectedTodoItem = todoItems.find(todoItem => todoItem.id === id)
    if (!selectedTodoItem) {
        res.status(404).send({
            "result": false,
            "message": "해당 아이디를 가진 todo item 이 없습니다."
        })
        return
    }

    const todoItemIndex = todoItems.indexOf(selectedTodoItem)
    todoItems.splice(todoItemIndex, 1,
        {
            ...selectedTodoItem,
            doneAt: selectedTodoItem.doneAt == null ? new Date() : null
        })
    res.send({ result: true})
})

app.delete("/todo-items/:id", (req, res) => {
    const { id } = req.params
    const idAsNumber = Number(id)
    if (isNaN(idAsNumber)) {
        res.status(400).send({
            "result": false,
            "message": "id 는 숫자여야 합니다."
        })
        return
    }

    const indexToDelete = todoItems.findIndex(todoItem => todoItem.id === idAsNumber)

    if (indexToDelete === -1) {
        res.status(404).send({
            "result": false,
            "message": "해당 아이디를 가진 todo item 이 없습니다."
        })
        return
    }

    todoItems.splice(indexToDelete, 1)
    res.send({
        "result": true
    })
})


const listeningCallback = () => {
    console.log(`Example app listening on port ${port}`)
}
app.listen(port, listeningCallback)
