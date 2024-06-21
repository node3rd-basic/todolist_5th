import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express()
const port = 3000
const secretKey = "dgglfqweqweg"

app.use(express.json())
app.use(cors())

app.get('/', (req, res)=> {
    res.send({message:"hello"})
})
const todoItems = [
    {
        "id": 1,
        "userId": 1,
        "title" : "수업듣기",
        "doneAt": "2021-08-01",
        "createdAt": "2021-08-01",
        "updatedAt": "2021-08-01"
    },
    {
        "id": 2,
        "userId": 1,
        "title" : "TIL쓰기",
        "doneAt": null,
        "createdAt": "2021-08-01",
        "updatedAt": "2021-08-01"
    }
]
const users = [
    {
        id:1,
        email:"lgh5498@gmail.com",
        password: "1234",
        name: "이길현",
        role: "student"
    }
]
//할일 목록 조회
app.get('/todo-items', (req, res) => {
    res.send(todoItems)
})
//할일 생성
app.post('/todo-items', (req, res) => {
    const { title } = req.body
    const newId = (todoItems[todoItems.length - 1]) ? todoItems[todoItems.length -1].id + 1 : 1
    console.log(newId)
    const newTodoItem ={
        "id" : newId,
        "userId" : 1,
        "title" : title,
        "doneAt": null,
        "createdAt": new Date(),
        "updatedAt": null
    }
    todoItems.push(newTodoItem)

    res.send(newTodoItem)
});
//할일 목록중 하나 조회
app.get('/todo-items/:id', (req, res) => {
    const id = Number(req.params.id)
    if(isNaN(id)) {
        res.status(400).send({message:"id는 숫자여야 합니다."})
        return
    }
    const todoItem = todoItems.find(todoItem => todoItem.id === id)
    res.send(todoItem)
})
// 할일 수정
app.put('/todo-items/:id', (req, res) => {
    const id = Number(req.params.id)
    if(isNaN(id)) {
        res.status(400).send({message:"id는 숫자여야 합니다."})
        return
    }
    const todoItemFind = todoItems.find(todoItem => todoItem.id === id)
    if(!todoItemFind) {
        res.status(404).send({message:"해당 id를 가진 todoItem이 없습니다."})
        return
    }
    const todoItemIndex = todoItems.indexOf(todoItemFind)
    todoItems.splice(todoItemIndex, 1, {...todoItemFind,
         doneAt: todoItemFind.doneAt == null? new Date() : null})
    res.send({message: "수정이 완료되었습니다."})
})
//할일 삭제
app.delete('/todo-items/:id', (req, res) => {
    const id = Number(req.params.id)
    if(isNaN(id)){
        res.status(400).send({message: "id는 숫자여야 합니다."})
        return
    }
    const deleteTodoItem = todoItems.findIndex(todoItem => todoItem.id === id)
    if(deleteTodoItem === -1){
        res.status(404).send({message: "해당 id를 가진 todoItem이 없습니다."})
        return
    }
    todoItems.splice(deleteTodoItem,1)
    res.send({message: "삭제가 완료되었습니다."})
})
//회원가입
app.post('/sign-up', (req, res) => {
    const { email, password, rePassword, role, name } = req.body
    if(!email ||
        !password ||
        !rePassword ||
        !role ||
        !name ||
        password !== rePassword
    ){
        res.status(400).send({message:"입력값을 확인 해 주세요."})
        return
    }
    const existedUser = users.find(user => user.email === email)
    if(existedUser){
        res.status(409).send({message:"이미 존재하는 이메일입니다."})
        return
    }
    const id = (users.length === 0) ? 1 : users[users.length -1].id + 1
    const newUser = { id, email, password, role, name }
    users.push(newUser)

    res.send(newUser)
})
//로그인

app.post('/sign-in', (req, res) => {
    const { email, password } = req.body
    const {password: _password, ...user} = users.find(user => user.email === email 
        && user.password === password )
    if(!user) {
        res.status(404).send({message:"해당하는 사용자가 없습니다."})
        return
    }
    const token = jwt.sign(user,secretKey)

    res.json({token})
})

app.get('/users/me', (req, res) => {
    const token = req.headers.authorization
    try{
        const user = jwt.verify(token, secretKey)
        res.json(user)
    } catch(error) {
        res.status(401).send({message:"인증되지 않았습니다."})
    }

    res.send()
})

app.listen(port, ()=>{
    console.log(`${port}포트 서버가 열렸습니다.`)
})