// 1. express -> 서버 띄운다
const express = require('express')
const cors = require('cors')
const jsonwebtoken = require('jsonwebtoken')
const app = express()

app.use(cors())
app.use(express.json())

// 2. API Spec 보고 api controller 작성

const users = [
    {
        id: 1,
        email: "noggong@example.com",
        password: "1234",
        role: "admin",
        name: "우준호"
    }
]

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

const secretKey = "kljsdfjkl;sdfioijm3"

const authMiddleware = (req, res, next) => {
    try {
        const { authorization } = req.headers
        if (!authorization) {
            res.status(401).json({message: "권한이 없습니다."})
            return
        }
        const user = jsonwebtoken.verify(authorization, secretKey)
        req.user = user
        next()
    } catch (e) {
        res.status(401).json({message: "권한이 없습니다."})
    }
}
app.get("/todo-items", authMiddleware, (req, res) => {
    // 사용자의 id 에 해당하는 todo-items 를 조회
    res.json(todoItems.filter(todoItem => todoItem.userId === req.user.id))
})

app.get("/todo-items/:id", authMiddleware, (req, res) => {
    // id 값이 숫자인지 확인
    const id = Number(req.params.id)
    if (isNaN(id)) {
        res.status(400).json({message: "ID must be a number"})
        return
    }
    // id 값으로 todo-items 를 조회
    const todoItem = todoItems.find(todoItem => todoItem.id === id)

    // todo-items 가 없을 경우 404 에러처리
    if (!todoItem) {
        res.status(404).json({message: "Todo item not found"})
        return
    }

    // 가져온 todo-item 의 userId 와 현재 사용자의 id 가 같은지 확인
    // 같지 않을 경우 403 에러처리
    if (todoItem.userId !== req.user.id) {
        res.status(403).json({message: "권한이 없습니다."})
        return
    }

    res.json(todoItem)
})

app.get("/todo-items/search/:keyword", (req, res) => {
    const { keyword } = req.params
    if (keyword.trim() === "") {
        res.status(400).json({message: "검색어를 입력해주세요."})
        return
    }

    res.json(todoItems.filter(todoItem =>
        todoItem.title.includes(keyword)
        && todoItem.userId === req.user.id
    ))
})

app.post("/todo-items", authMiddleware, (req, res) => {
    const { title } = req.body
    // title 값이 들어왔는지 확인
    if (!title || title.trim() === "") {
        res.status(400).json({message: "title 을 입력해주세요."})
        return
    }

    // todo-items 에서 id 값 생성
    const id = todoItems.length > 0 ? todoItems[todoItems.length - 1].id + 1 : 1

    // todo-items 에 새로운 todo-item 추가
    const newTodoItem = {
        id,
        userId: req.user.id,
        title,
        doneAt: null,
        createdAt: new Date(),
        updatedAt: null
    }
    todoItems.push(newTodoItem)
    res.json(newTodoItem)
})

app.put("/todo-items/:id", (req, res) => {
    // id 값이 숫자인지 확인
    const id = Number(req.params.id)
    if (isNaN(id)) {
        res.status(400).json({message: "ID must be a number"})
        return
    }

    // todo-items 에서 id 값으로 todo-item 찾기
    const todoItem = todoItems.find(todoItem => todoItem.id === id)
    // todoItem 의 doneAt 을 toggle 처리
    const toggledTodoItem = {
        ...todoItem,
        doneAt: todoItem.doneAt ? null : new Date()
    }

    // 선택된 toggleItem 의 index 값 찾기
    const index = todoItems.findIndex(todoItem => todoItem.id === id)

    if (todoItems[index].userId !== req.user.id) {
        res.status(403).json({message: "권한이 없습니다."})
        return
    }

    todoItems.splice(index, 1, toggledTodoItem)

    res.json({ result: true })
})

app.delete("/todo-items/:id", (req, res) => {
    // id 값이 숫자인지 확인
    const { id } = req.params
    if (isNaN(id)) {
        res.status(400).json({message: "ID must be a number"})
        return
    }
    const index = todoItems.findIndex(todoItem => todoItem.id === id)
    if (todoItems[index].userId !== req.user.id) {
        res.status(403).json({message: "권한이 없습니다."})
        return
    }
    todoItems.splice(index, 1)

    res.json({ result: true })
})

app.post("/sign-in", (req, res) => {
    const { email, password } = req.body
    // email, password 값이 들어왔는지 확인
    // email, password 값이 없을 경우 400 에러처리
    if (!email || !password) {
        res.status(400).json({message: "필수값이 누락되었습니다."})
        return
    }

    // email password 로 users 에서 사용자 찾기
    const user = users.find(user => user.email === email && user.password === password)

    // 사용자가 없을 경우 401 에러처리
    if (!user) {
        res.status(401).json({message: "사용자를 찾지 못했습니다."})
        return
    }

    // 사용자가 존재할 경우 jwt token 생성 후 응답
    const { password: _pw, ...userInfoToBeToken} = user
    const token = jsonwebtoken.sign(userInfoToBeToken, secretKey)

    res.json({ token })
})

app.post("/sign-up", (req, res) => {
    const { email, password, rePassword, role, name } = req.body
    // 위의 값들이 전부 들어왔는지 확인
    // 필수값이 누락된 경우 400 에러처리
    if (!email || !password || !rePassword || !role || !name) {
        res.status(400).json({message: "필수값이 누락되었습니다."})
        return
    }

    // 이미 가입된 이메일 존재하는지 확인
    // 중복 이메일 가입시 409 에러처리
    if (users.find(user => user.email === email)) {
        res.status(409).json({message: "이미 가입된 이메일입니다."})
        return
    }

    // 비밀번호와 비밀번호 확인이 일치하는지 확인
    // 일치하지 않을 경우 400 에러처리
    if (password !== rePassword) {
        res.status(400).json({message: "비밀번호가 일치하지 않습니다."})
        return
    }

    // user id 생성
    const id = users.length > 0 ? users[users.length - 1].id + 1 : 1

    // users 배열에 회원정보 추가 하기
    users.push({
        id,
        email,
        password,
        role,
        name
    })

    res.status(201).json({ id })
})

app.get("/users/me", authMiddleware, (req, res) => res.json(req.user))

app.listen(3000, () => {
    console.log("Server Start : 3000")
})

const 공주머니 = [
    {id: 1, 공_색상: "빨강" }, // 0
    {id: 2, 공_색상: "노랑" }, // 1
    {id: 3, 공_색상: "파랑" }, // 2
    {id: 4, 공_색상: "초록" }, // 3
    {id: 5, 공_색상: "검정" }, // 4
]
const id = 1
const 내가_찾는_공 = 공주머니.find(공 => 공.id === id)
// {id: 1, 공_색상: "빨강" }
// 내가_찾는_공.공_색상

const 내가_찾는_공_index = 공주머니.findIndex(공 => 공.id === id)
// 0

공주머니[id].공_색상
공주머니[내가_찾는_공_index].공_색상





