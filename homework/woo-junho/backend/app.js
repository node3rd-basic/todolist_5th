// express 사용할수 있도록 로드
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')

// 나의 통신가능한 프로그램 (application) 을 정의
const app = express()
const port = 3000
app.use(cors())
app.use(express.json())

const secretKey = "ijklsdf89ufsdjklsdf"
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
        userId: 2,
        title: "할일1",
        doneAt: null,
        createdAt: "2021-08-01",
        updatedAt: "2021-08-01",
    },
]

const users = [
    {
        id: 1,
        email: "noggong@example.com",
        password: "1234",
        name: "우준호",
        role: "tutor",
    }
]

app.get("/todo-items", (req, res) => {
    const token = req.headers.authorization

    try {
        const user = jwt.verify(token, secretKey)
        res.send(
            todoItems.filter(todoItem => todoItem.userId === user.id)
        )
    } catch (e) {
        res.status(401).send({"message": "권한이 없습니다."})
    }
})

app.post("/todo-items", (req, res) => {
    const token = req.headers.authorization
    const {title} = req.body

    try {
        const user = jwt.verify(token, secretKey)
        const newId = (todoItems[todoItems.length - 1]) ? todoItems[todoItems.length - 1].id + 1 : 1
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
    } catch (e) {
        res.status(401).send({"message": "권한이 없습니다."})
    }



})

app.get("/todo-items/:id", (req, res) => {
    const id = Number(req.params.id)
    const todoItem = todoItems.find(todoItem => todoItem.id === id)
    res.send(todoItem)
})

app.put("/todo-items/:id", (req, res) => {
    const id = Number(req.params.id)
    if (isNaN(id)) {
        res.status(400).send({"message": "id 는 숫자여야 합니다."})
        return
    }

    const selectedTodoItem = todoItems.find(todoItem => todoItem.id === id)
    if (!selectedTodoItem) {
        res.status(404).send({"message": "해당 아이디를 가진 todo item 이 없습니다."})
        return
    }

    const todoItemIndex = todoItems.indexOf(selectedTodoItem)
    todoItems.splice(todoItemIndex, 1,
        {
            ...selectedTodoItem,
            doneAt: selectedTodoItem.doneAt == null ? new Date() : null
        })
    res.send({result: true})
})

app.delete("/todo-items/:id", (req, res) => {
    const {id} = req.params
    const idAsNumber = Number(id)
    if (isNaN(idAsNumber)) {
        res.status(400).send({"message": "id 는 숫자여야 합니다."})
        return
    }

    const indexToDelete = todoItems.findIndex(todoItem => todoItem.id === idAsNumber)

    if (indexToDelete === -1) {
        res.status(404).send({"message": "해당 아이디를 가진 todo item 이 없습니다."})
        return
    }

    todoItems.splice(indexToDelete, 1)
    res.send({
        "result": true
    })
})

app.post("/sign-up", (req, res) => {
    const {email, password, rePassword, role, name} = req.body
    if (!email ||
        !password ||
        !rePassword ||
        !role ||
        !name ||
        password !== rePassword) {
        res.status(400).send({"message": "입력 값을 확인 해 보세요"})
        return
    }

    const existingUser = users.find(user => user.email === email)

    if (existingUser) {
        res.status(409).json({"message": "이미 가입된 이메일 입니다."})
    }

    const id = (users.length === 0) ? 1 : users[users.length - 1].id + 1
    const newUser = {id, email, password, role, name}
    users.push(newUser)
    console.log(users)
    res.json(newUser)
})

app.post("/sign-in", (req, res) => {
    const { email, password } = req.body
    const { password: _password, ...user} = users.find(user => user.email === email && user.password === password)

    if (!user) {
        res.status(404).send({"message": "사용자를 찾을 수 없습니다."})
        return
    }

    const token = jwt.sign(user, secretKey)
    res.json({token})
})

app.get("/users/me", (req, res) => {
    const token = req.headers.authorization

    try {
        const user = jwt.verify(token, secretKey)
        res.json(user)
    } catch (e) {
        res.status(401).send({"message": "권한이 없습니다."})
    }
})

const listeningCallback = () => {
    console.log(`Example app listening on port ${port}`)
}
app.listen(port, listeningCallback)
