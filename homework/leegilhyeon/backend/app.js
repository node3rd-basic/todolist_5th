// const express = require('express')
import express from 'express'
import cors from 'cors'

const app = express()
const port = 3000
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send("hello world")
});

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
    },
    {
        "id": 4,
        "userId": 1,
        "title": "운동하기",
        "doneAt": null,
        "createdAt": new Date(),
        "updatedAt": null
    },
    {
        "id": 5,
        "userId": 1,
        "title": "잠자기",
        "doneAt": null,
        "createdAt": new Date(),
        "updatedAt": null
    },
]
 
//할일 생성
app.post('/todo-items', (req, res)=>{
    const {title} = req.body

    const newId = (todoItems[todoItems.length-1]) ? todoItems[todoItems.length -1].id +1 : 1
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

//할일 목록 만들기
app.get('/todo-items', (req, res)=>{
    res.send(todoItems)
})

//할일 목록중 한개 조회하기
app.get('/todo-items/:id', (req, res)=>{
    const id = Number(req.params.id)

    const todoItem =todoItems.find(todoItem => todoItem.id === id)
    res.send(todoItem)
})

//할일 수정
app.put('/todo-items/:id', (req, res)=> {
    const id = Number(req.params.id)
      if(isNaN(id)){
        res.status(400).send({message:"id는 숫자여야 합니다."})
        return
    }
    //해당 id를 가지고 있는 todoitem 찾기
    const todoItemFind = todoItems.find(todoItem => todoItem.id === id)
      if(!todoItemFind){
        res.status(404).send({message:"해당 아이디를 가진 todoItem이 없습니다."})
        return
    }
    const todoItemIndex = todoItems.indexOf(todoItemFind)
    todoItems.splice(todoItemIndex, 1, {...todoItemFind,
        doneAt: todoItemFind.doneAt == null? new Date() : null
    })
    res.send({message:"수정되었습니다."})
})
//할일 삭제 
app.delete('/todo-items/:id', (req, res)=> {
    const { id } = req.params
    const numberId = Number(id)
    if(isNaN(numberId)){
        res.status(400).send({message:"id는 숫자여야 합니다."})
        return
    }
    const deleteTodoItem = todoItems.findIndex(todoItem => todoItem.id === numberId)
    if(deleteTodoItem === -1){
        res.status(404).send({message:"해당 id를 가진 todoItem이 없습니다."})
        return
    }
    todoItems.splice(deleteTodoItem, 1)
    res.send({message:"todoItem이 삭제되었습니다."})
})


app.listen(port, () => {
    console.log(`${port}포트 서버가 열렸습니다.`)
})

//app.get 으로 할일목록 , 할일 목록중 한개 조회 하기 API 생성