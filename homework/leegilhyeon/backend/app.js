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
        "createdAt": new Date(),
        "updatedAt": null
    },
    {
        "id": 2,
        "userId": 1,
        "title": "TIL 쓰기",
        "doneAt": null,
        "createdAt": new Date(),
        "updatedAt": null
    },
    {
        "id": 3,
        "userId": 1,
        "title": "과제하기",
        "doneAt": null,
        "createdAt": new Date(),
        "updatedAt": null
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
    const todoItems = [
        {id:1, content: "알고리즘 풀기"},
        {id:2, content: "TIL 쓰기"},
        {id:3, content: "과제하기"},
        {id:4, content: "운동하기"},
        {id:5, content: "잠자기"},
    ];

    const todoItem =todoItems.find(todoItem => todoItem.id === id)
    res.send(todoItem)
})

app.listen(port, () => {
    console.log(`${port}포트 서버가 열렸습니다.`)
})

//app.get 으로 할일목록 , 할일 목록중 한개 조회 하기 API 생성