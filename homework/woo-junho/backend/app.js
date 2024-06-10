// express 사용할수 있도록 로드
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')

// 나의 통신가능한 프로그램 (application) 을 정의
const app = express()
const port = 3000

const leaveLogMiddleware = (req, res, next) => {
    console.log(`${req.method} ${req.url} [${ new Date().toISOString()}] ${ req.headers.referer }`)
    next()
}

const errorMiddleware = (err, req,res, next) => {
    res.status(500).json({
        message: "Internal Server Error",
    })
}

app.use(cors())
app.use(express.json())
app.use(leaveLogMiddleware)

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

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization
    try {
        req.user = jwt.verify(token, secretKey)
        next()
    } catch (e) {
        res.status(401).send({"message": "권한이 없습니다."})
    }
}

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

app.get("/todo-items", authMiddleware, (req, res) => {
    const user = req.user
    res.send(
        todoItems.filter(todoItem => todoItem.userId === user.id)
    )
})

app.post("/todo-items", authMiddleware, (req, res) => {
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
})

app.get("/todo-items/:id", authMiddleware, (req, res) => {
    const id = validateTodoItemId(req)
    const todoItem = getTodoItemById(id)
    res.send(todoItem)
})

app.put("/todo-items/:id", authMiddleware, (req, res) => {
    const id = validateTodoItemId(req)
    const selectedTodoItem = getTodoItemById(id)
    const todoItemIndex = todoItems.indexOf(selectedTodoItem)
    todoItems.splice(todoItemIndex, 1,
        {
            ...selectedTodoItem,
            doneAt: selectedTodoItem.doneAt == null ? new Date() : null
        })
    res.send({result: true})
})

app.delete("/todo-items/:id", authMiddleware, (req, res) => {
    const id = validateTodoItemId(req)
    const selectedTodoItem = getTodoItemById(id)
    const indexToDelete = todoItems.indexOf(selectedTodoItem)

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

    const id = getIncrementedId(users)
    const newUser = {id, email, password, role, name}
    users.push(newUser)
    res.json(newUser)
})

app.post("/sign-in", (req, res) => {
    const { email, password } = req.body
    const selectedUser = users.find(user => user.email === email && user.password === password)
    const { password: _password, ...user} = selectedUser

    if (!user) {
        res.status(404).send({"message": "사용자를 찾을 수 없습니다."})
        return
    }

    const token = jwt.sign(user, secretKey)
    res.json({token})
})

app.get("/users/me", authMiddleware, (req, res) => {
    res.json(req.user)
})

app.use(errorMiddleware)

const listeningCallback = () => {
    console.log(`Example app listening on port ${port}`)
}
app.listen(port, listeningCallback)
