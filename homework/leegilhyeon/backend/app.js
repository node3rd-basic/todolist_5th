// const express = require('express')
import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'

const app = express()
const port = 3000

const errorMiddleware = (err, req, res, next) => {
    res.status(500).json({
        message: "서버 에러입니다."
    })
}

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send("hello world")
});

const secretKey = "wewqsfaserafgf"
const todoItems = [
    {
        "id": 1,
        "userId": 1,
        "title": "알고리즘 풀기",
        "doneAt": null,
        "createdAt": "2024-05-24",
        "updatedAt": "2024-05-24",
    },
    {
        "id": 2,
        "userId": 1,
        "title": "TIL 쓰기",
        "doneAt": null,
        "createdAt": "2024-05-24",
        "updatedAt": "2024-05-24",
    },
    {
        "id": 3,
        "userId": 1,
        "title": "과제하기",
        "doneAt": "2024-05-24",
        "createdAt": "2024-05-24",
        "updatedAt": "2024-05-24",
    }
]

const users = [
    {
        id: 1,
        email: "lgh5498@example.com",
        password: "1234",
        name: "이길현",
        role: "student",
    }
]

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization
    try{
        req.user = jwt.verify(token,secretKey)
        next()
    } catch (error) {
        res.status(401).send({"message":"권한이 없습니다."})
    }
}

const validateIdMiddleware = (req) => {
    const todoId = Number(req.params.id)
    if(isNaN(todoId)){
        throw new Error("Id는 숫자여야 합니다.")
    }
    return todoId
}

const todoItemById = (id) => {
    const todoItem =todoItems.find(todoItem => todoItem.id === id)
    if(!todoItem) {
        throw new Error("해당 아이디가 가진 todoItem이 없습니다.")
    }
    return todoItem
}

const incrementedTodoId = arr => arr[todoItems.length - 1]?
    arr[todoItems.length -1].id +1 : 1 ;

//할일 생성
app.post('/todo-items', authMiddleware, (req, res)=>{
    const {title} = req.body
    const user = req.user
  
    const newId = incrementedTodoId(todoItems)
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

//할일 목록 api
app.get('/todo-items', authMiddleware,(req, res)=>{
    const user = req.user
  
    res.send(todoItems.filter(todoItem => todoItem.userId === user.id))
  
})

//할일 목록중 한개 조회하기
app.get('/todo-items/:id', (req, res)=>{
    const id = Number(req.params.id)
    const todoItem =todoItemById(id)
    res.send(todoItem)
})

//할일 수정
app.put('/todo-items/:id',authMiddleware, (req, res)=> {
    const id = validateIdMiddleware(req)
    //해당 id를 가지고 있는 todoitem 찾기
    const todoItemFind = todoItemById(id)
    const todoItemIndex = todoItems.indexOf(todoItemFind)
    todoItems.splice(todoItemIndex, 1, {...todoItemFind,
        doneAt: todoItemFind.doneAt == null? new Date() : null
    })
    res.send({message:"수정되었습니다."})
})

//할일 삭제 
app.delete('/todo-items/:id', authMiddleware, (req, res)=> {
    const id = validateIdMiddleware(req)
    const deleteTodoItem = todoItemById(id)
    todoItems.splice(deleteTodoItem, 1)
    res.send({message:"todoItem이 삭제되었습니다."})
})

//회원가입
app.post('/sign-up', (req, res)=> {
    const {email, password, rePassword, role, name} = req.body
    if(!email ||
        !password ||
        !rePassword ||
        !role ||
        !name ||
        password !== rePassword) {
            res.status(400).send({"message":"입력 값을 확인 해 주세요."})
            return
        }
    const existedUser = users.find(user=> user.email === email)
    if(existedUser) {
        res.status(409).json({"message":"이미 가입된 이메일 입니다."})
    }
    const id = (users.length===0) ? 1 : users[users.length - 1].id + 1
    const newUser = { id, email, password, role, name }
    users.push(newUser)
   
    res.json(newUser)   
})

//로그인
app.post('/sign-in', (req, res)=> {
    const { email, password } = req.body
    const { password: _password,...user } = users.find(user => user.email === email
        && user.password === password)
    if(!user){
        res.status(404).send({"message": "해당하는 사용자가 없습니다."})
        return
    }
    const token = jwt.sign(user, secretKey)
    
    res.json({token})
})

//토큰검증
app.get('/users/me', authMiddleware,(req, res) =>{
        res.json(req.user)
})

app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`${port}포트 서버가 열렸습니다.`)
})

