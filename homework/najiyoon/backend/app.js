//할일 api 만들기 
// # 할일 관리 프로그램 API 명세서

import express from "express";

const app = express();
const port = 3000;


//할일목록조회
app.get('/todo-items', (req, res, next) => {
    const TodoItems = [
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
    ]
    res.send(TodoItems);
})

//할일목록 1개 조회
app.get('/todo-itmes/:id', (req, res, next) => {
    const id = req.params.id
    const TodoItems = [
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

    ];
    const TodoItem = TodoItems.find((TodoItem) =>
        TodoItem.id === +id)
    res.send(TodoItem);
});

app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
});
