const express = require('express')
const cors =  require('cors')

const port = 3000
const app = express();

app.use(cors())

app.get("/todo-items", (req, res) => {
    res.send([
        {
            "id": 1,
            "userId": 1,
            "title": "알고리즘 코드카타풀기",
            "doneAt": "2024-08-29",
            "createdAt": "2024-04-29",
            "updatedAt": "2024-05-30"
        },
        {
            "id": 2,
            "userId": 1,
            "title": "밥 먹기",
            "doneAt": "2024-05-30",
            "createdAt": "2024-05-30",
            "updatedAt": "2024-05-30"
        },
        {
            "id":3,
            "userId":1,
            "title": "강의 듣기",
            "doneAt": "2024-05-30",
            "createdAt": "2024-05-30",
            "updatedAt": "2024-05-30"

        }
    ])
});

app.get('/todo-items', (req, res) =>{
    const id = Number(req.params.id)
    const todoItems = [
        {
            "id": 1,
            "userId": 1,
            "title": "알고리즘 코드카타풀기",
            "doneAt": "2024-08-29",
            "createdAt": "2024-04-29",
            "updatedAt": "2024-05-30"
        },
        {
            "id": 2,
            "userId": 1,
            "title": "밥 먹기",
            "doneAt": "2024-05-30",
            "createdAt": "2024-05-30",
            "updatedAt": "2024-05-30"
        },
        {
            "id":3,
            "userId":1,
            "title": "강의 듣기",
            "doneAt": "2024-05-30",
            "createdAt": "2024-05-30",
            "updatedAt": "2024-05-30"

        }
    ];

    const todoItem = todoItems.find(todoItem => todoItem.id === id)
    res.send(todoItem)
});

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})


