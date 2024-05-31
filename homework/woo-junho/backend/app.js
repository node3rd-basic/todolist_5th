// express 사용할수 있도록 로드
const express = require('express')
const cors = require('cors')

// 나의 통신가능한 프로그램 (application) 을 정의
const app = express()
const port = 3000
app.use(cors())


app.get('/', (req, res) => {
    const movieData = [
        {id: 1, name: "아이언맨", 평점:"8"},
        {id: 2, name: "캡틴아메리카", 평점: "7"},
        {id: 3, name: "토르", 평점: "8.5"},
        {id: 4, name: "로키", 평점: "9"},
        {id: 5, name: "어벤져스", 평점: "9.5"},
        {id: 6, name: "스파이더맨", 평점: "8.7"},
    ];
    res.send(movieData)
})

app.get("/todo-items", (req, res) => {
    res.send([
        {
            "id": 1,
            "userId": 1,
            "title": "할일1",
            "doneAt": "2021-08-01",
            "createdAt": "2021-08-01",
            "updatedAt": "2021-08-01"
        },
        {
            "id": 2,
            "userId": 1,
            "title": "할일2",
            "doneAt": "2021-08-01",
            "createdAt": "2021-08-01",
            "updatedAt": "2021-08-01"
        }
    ])
})

app.get("/todo-items/:id", (req, res) => {
    const id = Number(req.params.id)
    const todoItems = [
        {id: 1, name: "일기 쓰기"},
        {id: 2, name: "과제 하기"},
        {id: 3, name: "잠자기"},
        {id: 4, name: "게임하기"},
        {id: 5, name: "운동하기"},
    ];

    const todoItem = todoItems.find(todoItem => todoItem.id === id)
    res.send(todoItem)
})



const listeningCallback = () => {
    console.log(`Example app listening on port ${port}`)
}
app.listen(port, listeningCallback)