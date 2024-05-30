// const express = require('express')
import express from 'express'

const app = express()
const port = 3010

app.get('/', (req, res) => {
    res.send("hello world")
});
//할일 목록 만들기
app.get('/todo-items', (req, res)=>{
    res.send([
        {id:1, content: "알고리즘 풀기"},
        {id:2, content: "TIL 쓰기"},
        {id:3, content: "과제하기"},
        {id:4, content: "운동하기"},
        {id:5, content: "잠자기"},
    ])
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